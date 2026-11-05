"use client";

import Image from "next/image";
import { useBloom } from "./BloomContext";
import { BellIcon, Eyebrow } from "./parts";
import { COLLAB, ui } from "@/lib/bloom/content";

// 콜라보 글로우 그래픽 원본 (모두 투명 PNG, 빛 번짐 포함)
const G = {
  aqua: { src: "/bloom/collab/aqua.png", w: 245, h: 374 },
  aquaFlower: { src: "/bloom/collab/aqua-flower.png", w: 348, h: 341 },
  flower: { src: "/bloom/collab/flower.png", w: 282, h: 276 },
  leaf: { src: "/bloom/collab/leaf.png", w: 305, h: 295 },
  pink: { src: "/bloom/collab/pink-flower.png", w: 358, h: 355 },
  seed: { src: "/bloom/collab/seed.png", w: 323, h: 324 },
} as const;
type Gfx = (typeof G)[keyof typeof G];

/** [그래픽, left, top, 크기 클래스, 애니메이션 시차(초)] — left/top은 담는 상자 기준 % */
type Spot = [Gfx, string, string, string, number];

/*
 * lg(1024px) 이상: 왼쪽 글씨 끝에서 오른쪽으로 퍼지는 배치. 글씨 가까이는 작게, 멀어질수록 크게.
 * 글씨 영역: 제목 줄(위 0~26%)은 왼쪽 700px까지, 본문·굿즈 줄은 480px까지 → 그 바깥에만 둔다.
 * 위치: left는 글씨 시작점 기준 px, right는 오른쪽 끝 기준 %
 */
type Place = { left?: string; right?: string; top: string };
const SPRAY: [Gfx, Place, string, number][] = [
  // 제목 줄 옆
  [G.pink, { left: "720px", top: "-2%" }, "w-24", 2.0],
  [G.seed, { right: "3%", top: "0%" }, "w-14", 3.1],
  [G.aquaFlower, { right: "14%", top: "13%" }, "w-20", 0.5],
  // 본문 줄 옆 (가까이 작게 → 멀리 크게)
  [G.flower, { left: "500px", top: "34%" }, "w-8", 0.3],
  [G.aqua, { left: "560px", top: "29%" }, "w-6", 2.9],
  // 큰 아쿠아 선 꽃: 오른쪽 큰 꽃(right 12%) 바로 왼쪽 빈 곳. 1280px 미만은 자리가 좁아 숨김
  [G.aquaFlower, { right: "calc(12% + 160px)", top: "42%" }, "hidden w-36 xl:block", 1.7],
  [G.aqua, { right: "2%", top: "28%" }, "w-8", 2.6],
  [G.flower, { right: "12%", top: "29%" }, "w-36", 1.9],
  [G.leaf, { right: "1%", top: "46%" }, "w-24", 1.2],
  // 굿즈 줄 옆
  [G.pink, { left: "500px", top: "66%" }, "w-10", 2.4],
  [G.seed, { left: "400px", top: "90%" }, "w-8", 1.1],
  [G.seed, { left: "560px", top: "78%" }, "w-16", 0.1],
  [G.pink, { right: "2%", top: "76%" }, "w-20", 0.7],
];

/* 모바일·태블릿: 글씨가 화면 폭을 거의 다 쓰므로 글씨 사이사이 띠에서 옆으로 퍼지게 */
const BAND_TOP: Spot[] = [
  [G.aqua, "2%", "55%", "w-4 md:w-6", 0.2],
  [G.flower, "12%", "28%", "w-9 md:w-12", 1.6],
  [G.seed, "28%", "50%", "w-7 md:w-10", 2.5],
  [G.pink, "44%", "6%", "w-16 md:w-20", 0.9],
  [G.aquaFlower, "66%", "40%", "w-11 md:w-16", 2.1],
];
const BAND_MID: Spot[] = [
  [G.leaf, "0%", "6%", "w-8 md:w-10", 0.4],
  [G.aquaFlower, "14%", "40%", "w-12 md:w-16", 1.8],
  [G.flower, "34%", "8%", "w-6 md:w-9", 2.7],
  [G.aqua, "70%", "4%", "w-5 md:w-7", 2.2],
  [G.pink, "80%", "38%", "w-14 md:w-20", 1.0],
];
const BAND_BOTTOM: Spot[] = [
  [G.seed, "4%", "22%", "w-12 md:w-16", 1.5],
  [G.pink, "24%", "56%", "w-7 md:w-9", 0.3],
  [G.leaf, "40%", "16%", "w-14 md:w-20", 2.4],
  [G.aquaFlower, "62%", "46%", "w-8 md:w-10", 1.1],
  [G.flower, "78%", "16%", "w-16 md:w-24", 2.8],
];

function Glow({ spot, sizes }: { spot: Spot; sizes: string }) {
  const [g, left, top, size, delay] = spot;
  return (
    <Image
      src={g.src}
      alt=""
      aria-hidden
      width={g.w}
      height={g.h}
      sizes={sizes}
      className={`glow-float pointer-events-none absolute h-auto ${size}`}
      style={{ left, top, animationDelay: `${delay}s` }}
    />
  );
}

/** 모바일·태블릿 전용 그래픽 띠 */
function GlowBand({ spots, className }: { spots: Spot[]; className: string }) {
  return (
    <div aria-hidden className={`relative lg:hidden ${className}`}>
      {spots.map((s, i) => (
        <Glow key={i} spot={s} sizes="(min-width: 768px) 112px, 80px" />
      ))}
    </div>
  );
}

/** 글씨 줄 끝에 붙는 글로우 그래픽 (장식용) */
function InlineGlow({
  g,
  size,
  delay,
  desktopOnly = false,
}: {
  g: Gfx;
  size: string;
  delay: number;
  desktopOnly?: boolean;
}) {
  return (
    <Image
      src={g.src}
      alt=""
      aria-hidden
      width={g.w}
      height={g.h}
      sizes="64px"
      className={`glow-float pointer-events-none h-auto align-middle ${desktopOnly ? "hidden md:inline-block" : "inline-block"} ${size}`}
      style={{ animationDelay: `${delay}s` }}
    />
  );
}

/** 문장 속 "A2O LITE"만 브랜드 핑크 + 네온 빛 */
function highlightA2O(text: string) {
  return text.split(/(A2O LITE)/).map((part, i) =>
    part === "A2O LITE" ? (
      <span key={i} className="neon-text-pink text-pink">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

/** 동백마을 X A2O LITE 콜라보 소개: 동백숲 배경 + 글로우 그래픽 + 이야기 + 굿즈 연결 */
export default function Collab() {
  const { lang } = useBloom();
  const c = ui.collab;
  const lastLine = c.lines.length - 1;

  return (
    <section
      id="collab"
      aria-labelledby="collab-title"
      className="relative overflow-hidden bg-forest px-5 py-6 text-cream-head md:px-10 md:py-10 lg:py-24"
    >
      {/* 동백나무숲 배경 */}
      <Image
        src="/bloom/collab/forest.jpg"
        alt={c.forestAlt[lang]}
        fill
        sizes="100vw"
        className="object-cover"
      />
      {/* 왼쪽 글씨가 잘 읽히도록 왼쪽·위아래를 더 어둡게 */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-forest/75 via-forest/35 to-forest/85" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-forest/70 via-forest/25 to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        {/* lg 이상: 글씨에서 오른쪽으로 퍼지는 그래픽 */}
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
          {SPRAY.map(([g, place, size, delay], i) => (
            <Image
              key={i}
              src={g.src}
              alt=""
              width={g.w}
              height={g.h}
              sizes="144px"
              className={`glow-float absolute h-auto ${size}`}
              style={{ ...place, animationDelay: `${delay}s` }}
            />
          ))}
        </div>

        <GlowBand spots={BAND_TOP} className="h-24 md:h-32" />

        <div className="relative max-w-xl md:max-w-2xl">
          <Eyebrow tone="light">{c.eyebrow[lang]}</Eyebrow>
          <p className="mt-3 flex items-center gap-2 text-sm font-bold tracking-wide md:text-base">
            {COLLAB}
            <InlineGlow g={G.aquaFlower} size="w-7 md:w-9" delay={0.4} />
          </p>
          <h2 id="collab-title" className="neon-text mt-3 font-display text-[34px] leading-tight text-cream-head md:text-6xl">
            {c.title[lang]}
            {/* 모바일은 제목이 한 줄을 다 써서 줄바꿈되므로 md 이상에서만 */}
            <InlineGlow g={G.pink} size="ml-3 w-14" delay={1.4} desktopOnly />
          </h2>
          <p className="mt-6 space-y-1 font-display text-lg leading-relaxed md:mt-8 md:text-2xl md:leading-relaxed lg:max-w-[30rem]">
            {c.lines.map((l, i) => (
              <span key={l.en} className={`block ${i === lastLine ? "neon-text text-white" : "text-cream-head/90"}`}>
                {highlightA2O(l[lang])}
                {i === 0 && <InlineGlow g={G.aqua} size="ml-2 w-3 md:w-4" delay={2.2} />}
                {i === lastLine && (
                  <>
                    <InlineGlow g={G.seed} size="ml-2 w-9 md:w-12" delay={0.9} />
                    <InlineGlow g={G.leaf} size="ml-1 w-5 md:w-7" delay={1.9} />
                  </>
                )}
              </span>
            ))}
          </p>
        </div>

        <GlowBand spots={BAND_MID} className="h-28 md:h-36" />

        <div className="max-w-xl lg:mt-20 lg:max-w-[30rem]">
          <h3 className="flex items-center gap-2 font-display text-base text-pink md:text-xl">
            {c.goodsTitle[lang]}
            <InlineGlow g={G.flower} size="w-7 md:w-10" delay={0.6} />
          </h3>
          <p className="mt-1.5 text-[13px] leading-5 text-cream-head/80 md:text-base md:leading-7">{c.goodsSub[lang]}</p>
          <div className="mt-6 flex flex-wrap gap-3 md:mt-8">
            <a
              href="#goods"
              className="inline-flex min-h-12 items-center gap-1.5 rounded-full bg-white px-6 text-sm font-bold text-ink transition-colors hover:bg-cream-head"
            >
              {ui.hero.sideGoods[lang]}
              <span aria-hidden>→</span>
            </a>
            <a
              href="#notify"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-pink px-6 text-sm font-bold text-white transition-colors hover:bg-pink-deep"
            >
              <BellIcon />
              {ui.nav.notify[lang]}
            </a>
          </div>
        </div>

        <GlowBand spots={BAND_BOTTOM} className="h-24 md:h-32" />
      </div>
    </section>
  );
}
