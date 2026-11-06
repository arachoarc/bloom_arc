/**
 * 돌담 피오·토리 그림(한 장짜리)을 움직일 수 있게 레이어로 나눈다.
 *  - 움직일 부분(팔, 손 흔드는 선, 떠 있는 그래픽)을 다각형/타원으로 잘라 투명 PNG로 저장
 *  - 잘라 낸 자리는 주변 배경으로 메워(확산 채우기) 배경판으로 저장
 * 실행: node scripts/build-stonewall-layers.mjs
 * 결과: public/bloom/chars/stonewall/ (plate.jpg, 레이어 webp) + lib/bloom/stonewall-layers.json
 */
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";

const SRC = "public/bloom/chars/friends-stonewall-v3.jpg";
const OUT = "public/bloom/chars/stonewall";
const W = 1670;
const H = 942;

/**
 * shape: poly(점 목록) 또는 ellipse(cx, cy, rx, ry). 좌표는 원본 픽셀.
 * noSource: 채우기 때 색을 가져오지 않을 영역(팔 뒤 몸통). 팔이 움직이며 드러나는 곳은 배경 쪽이라 초록으로 메운다.
 * pivot: 회전 중심(원본 픽셀)
 */
const LAYERS = [
  {
    id: "pio-arm",
    poly: [[380,352],[398,336],[440,333],[468,340],[482,351],[488,393],[505,428],[541,466],[522,503],[493,503],[462,481],[428,452],[392,424],[374,396]],
    noSource: [[472,300],[600,300],[600,540],[500,540],[470,420]],
    pivot: [515, 485],
  },
  {
    id: "pio-marks",
    poly: [[333,298],[416,298],[416,334],[396,349],[390,382],[333,386]],
    pivot: [400, 370],
  },
  {
    id: "tori-arm",
    poly: [[1156,422],[1186,414],[1212,418],[1236,436],[1246,460],[1236,480],[1222,494],[1198,514],[1178,538],[1160,560],[1143,552],[1143,500],[1148,460]],
    noSource: [[1060,380],[1150,380],[1146,470],[1146,600],[1060,600]],
    pivot: [1150, 545],
  },
  {
    id: "tori-marks",
    poly: [[1198,348],[1314,348],[1314,464],[1248,464],[1238,444],[1224,428],[1198,428]],
    pivot: [1225, 450],
  },
  {
    id: "leaf-left",
    poly: [[182,190],[218,188],[268,220],[304,270],[307,309],[268,310],[222,284],[186,244]],
    pivot: [245, 250],
  },
  { id: "flower-big", ellipse: [1274, 227, 104, 102], pivot: [1274, 227] },
  { id: "flower-small", ellipse: [309, 535, 53, 55], pivot: [309, 535] },
  {
    id: "leaf-right",
    poly: [[1462,524],[1468,488],[1506,450],[1558,431],[1598,432],[1592,468],[1558,500],[1516,521]],
    pivot: [1530, 478],
  },
  { id: "seeds", ellipse: [1377, 534, 53, 45], pivot: [1377, 534] },
];

const FEATHER = 2.5; // 레이어 가장자리 흐림(px)

function polySvg(pts, fill = "#fff") {
  return `<polygon points="${pts.map((p) => p.join(",")).join(" ")}" fill="${fill}"/>`;
}
function shapeSvg(l) {
  if (l.poly) return polySvg(l.poly);
  const [cx, cy, rx, ry] = l.ellipse;
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#fff"/>`;
}
async function rasterize(inner, blur = 0, grow = 0) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="100%" height="100%" fill="#000"/><g stroke="#fff" stroke-width="${grow * 2}" stroke-linejoin="round">${inner}</g></svg>`;
  let img = sharp(Buffer.from(svg)).removeAlpha().extractChannel(0);
  if (blur) img = img.blur(blur);
  const out = await img.raw().toBuffer();
  if (out.length !== W * H) throw new Error(`mask size ${out.length}`);
  return out;
}
function bboxOf(l, pad) {
  const pts = l.poly ?? (() => {
    const [cx, cy, rx, ry] = l.ellipse;
    return [[cx - rx, cy - ry], [cx + rx, cy + ry]];
  })();
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const left = Math.max(0, Math.floor(Math.min(...xs) - pad));
  const top = Math.max(0, Math.floor(Math.min(...ys) - pad));
  const right = Math.min(W, Math.ceil(Math.max(...xs) + pad));
  const bottom = Math.min(H, Math.ceil(Math.max(...ys) + pad));
  return { left, top, width: right - left, height: bottom - top };
}

mkdirSync(OUT, { recursive: true });
const { data: src } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });

// 1) 메울 영역: 모든 레이어를 조금 넓힌 것 + 색을 가져오지 않을 몸통 영역
const fillMask = await rasterize(LAYERS.map(shapeSvg).join(""), 0, 4);
const noSrc = await rasterize(LAYERS.filter((l) => l.noSource).map((l) => polySvg(l.noSource)).join(""));
const unknown = new Uint8Array(W * H);
for (let i = 0; i < W * H; i++) unknown[i] = fillMask[i] > 127 || noSrc[i] > 127 ? 1 : 0;

// 2) 확산 채우기(라플라스): 거친 해상도부터 풀어서 빨리 수렴시킨다
const plate = new Float32Array(W * H * 3);
for (let i = 0; i < W * H * 3; i++) plate[i] = src[i];
const idx = [];
for (let i = 0; i < W * H; i++) if (unknown[i]) idx.push(i);
// 초기값: 같은 줄에서 가장 가까운 알려진 픽셀
for (const i of idx) {
  const y = Math.floor(i / W);
  const x = i % W;
  let best = -1;
  for (let d = 1; d < W && best < 0; d++) {
    for (const nx of [x - d, x + d]) if (nx >= 0 && nx < W && !unknown[y * W + nx]) { best = y * W + nx; break; }
  }
  for (let c = 0; c < 3; c++) plate[i * 3 + c] = src[best * 3 + c];
}
for (let it = 0; it < 4000; it++) {
  for (const i of idx) {
    const x = i % W;
    const y = (i - x) / W;
    let n = 0, r = 0, g = 0, b = 0;
    for (const j of [x > 0 ? i - 1 : -1, x < W - 1 ? i + 1 : -1, y > 0 ? i - W : -1, y < H - 1 ? i + W : -1]) {
      if (j < 0) continue;
      r += plate[j * 3]; g += plate[j * 3 + 1]; b += plate[j * 3 + 2]; n++;
    }
    plate[i * 3] = r / n; plate[i * 3 + 1] = g / n; plate[i * 3 + 2] = b / n;
  }
}
// 몸통 영역은 원래 그림으로 되돌리고, 배경 질감처럼 아주 약한 노이즈를 더한다
const plateBuf = Buffer.alloc(W * H * 3);
for (let i = 0; i < W * H; i++) {
  const keep = noSrc[i] > 127 && fillMask[i] <= 127;
  const noise = unknown[i] && !keep ? (Math.random() - 0.5) * 6 : 0;
  for (let c = 0; c < 3; c++) {
    const v = keep ? src[i * 3 + c] : plate[i * 3 + c] + noise;
    plateBuf[i * 3 + c] = Math.max(0, Math.min(255, Math.round(v)));
  }
}
// 메운 자리만 살짝 흐려서 배경 보케와 어울리게
const blurred = await sharp(plateBuf, { raw: { width: W, height: H, channels: 3 } }).blur(3).raw().toBuffer();
for (let i = 0; i < W * H; i++) {
  if (fillMask[i] > 127) for (let c = 0; c < 3; c++) plateBuf[i * 3 + c] = blurred[i * 3 + c];
}
await sharp(plateBuf, { raw: { width: W, height: H, channels: 3 } }).jpeg({ quality: 86, mozjpeg: true }).toFile(`${OUT}/plate.jpg`);

// 3) 레이어: 원본 픽셀 + 부드러운 가장자리 알파
const meta = [];
for (const l of LAYERS) {
  const alpha = await rasterize(shapeSvg(l), FEATHER);
  const box = bboxOf(l, 8);
  const rgba = Buffer.alloc(box.width * box.height * 4);
  for (let y = 0; y < box.height; y++) {
    for (let x = 0; x < box.width; x++) {
      const si = (box.top + y) * W + box.left + x;
      const di = (y * box.width + x) * 4;
      rgba[di] = src[si * 3]; rgba[di + 1] = src[si * 3 + 1]; rgba[di + 2] = src[si * 3 + 2];
      rgba[di + 3] = alpha[si];
    }
  }
  await sharp(rgba, { raw: { width: box.width, height: box.height, channels: 4 } })
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(`${OUT}/${l.id}.webp`);
  meta.push({
    id: l.id,
    ...box,
    originX: +(((l.pivot[0] - box.left) / box.width) * 100).toFixed(2),
    originY: +(((l.pivot[1] - box.top) / box.height) * 100).toFixed(2),
  });
}
writeFileSync("lib/bloom/stonewall-layers.json", JSON.stringify({ width: W, height: H, layers: meta }, null, 2) + "\n");
console.log("done", meta.length, "layers");
