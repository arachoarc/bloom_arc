"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useBloom } from "./BloomContext";
import { ui } from "@/lib/bloom/content";
import stonewall from "@/lib/bloom/stonewall-layers.json";
import { Eyebrow } from "./parts";

/** 동백마을 소개 + 피오·토리 소개를 한 덩어리로 보여 준다 */
export default function Story() {
  const { lang } = useBloom();
  const s = ui.story;
  const f = s.friends;

  const friends = [
    { key: "pio", data: f.pio },
    { key: "tori", data: f.tori },
  ] as const;

  return (
    <section
      id="story"
      aria-labelledby="story-title"
      className="relative overflow-hidden bg-forest px-5 py-14 text-cream-head md:px-10 md:py-24"
    >
      <Image
        src="/bloom/gfx/aqua-line-flower.png"
        alt=""
        width={318}
        height={338}
        className="pointer-events-none absolute -top-2 -right-6 w-28 opacity-80 md:top-10 md:right-[6%] md:w-40"
      />

      <div className="relative mx-auto max-w-6xl">
        <Eyebrow tone="light">{s.eyebrow[lang]}</Eyebrow>
        <p className="mt-3 text-sm font-bold tracking-wide text-cream-head md:text-base">{s.place[lang]}</p>
        <h2 id="story-title" className="mt-2 font-display text-[40px] leading-[1.05] text-pink md:text-7xl">
          {s.title[lang]}
        </h2>

        <div className="mt-6 md:mt-12 md:grid md:grid-cols-2 md:items-center md:gap-12 lg:gap-16">
          {/* 왼쪽: 마을 이야기 + 짧은 캐릭터 소개 */}
          <div>
            <p className="font-display text-xl text-cream-head/90 md:text-2xl">{s.lead[lang]}</p>
            <p className="mt-5 text-[15px] leading-7 text-cream-head/80 md:text-base md:leading-8">{s.body[lang]}</p>

            <div className="mt-4 md:mt-5">
              <p className="text-[13px] font-bold text-cream-head/90 md:text-sm">{f.sub[lang]}</p>
              <ul className="mt-3 space-y-2">
                {friends.map(({ key, data }) => (
                  <li key={key} className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                    <span className="font-display text-sm text-pink">{data.name[lang]}</span>
                    <span className="text-xs text-cream-head/80">{data.tagline[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 오른쪽(모바일은 아래): 피오·토리 그림 */}
          <FriendsImage alt={f.alt[lang]} className="mt-6 md:mt-0" />
        </div>
      </div>
    </section>
  );
}

/**
 * 레이어별 움직임. 팔은 손 흔들기, 선은 깜빡임, 그래픽은 저마다 다른 박자로 떠다닌다.
 * (레이어는 scripts/build-stonewall-layers.mjs 로 원본 그림에서 잘라 냄)
 */
const MOTION: Record<string, { className: string; style?: CSSProperties }> = {
  "pio-arm": { className: "sw-wave-pio" },
  "tori-arm": { className: "sw-wave-tori" },
  "pio-marks": { className: "sw-marks" },
  "tori-marks": { className: "sw-marks", style: { "--d": "0.35s" } as CSSProperties },
  "leaf-left": { className: "sw-float", style: { "--t": "5.2s", "--y": "-7px", "--x": "3px", "--r": "-7deg" } as CSSProperties },
  "flower-big": { className: "sw-float", style: { "--t": "6.4s", "--d": "-1.6s", "--y": "-6px", "--r": "8deg" } as CSSProperties },
  "flower-small": { className: "sw-float", style: { "--t": "4.6s", "--d": "-2.4s", "--y": "-5px", "--r": "-10deg" } as CSSProperties },
  "leaf-right": { className: "sw-float", style: { "--t": "5.6s", "--d": "-3s", "--y": "-6px", "--x": "-3px", "--r": "6deg" } as CSSProperties },
  seeds: { className: "sw-float", style: { "--t": "4.2s", "--d": "-0.8s", "--y": "-5px", "--r": "-5deg" } as CSSProperties },
};

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

/** 제주 돌담 위 피오·토리 일러스트: 배경판 위에 움직이는 레이어를 겹친다 */
function FriendsImage({ alt, className }: { alt: string; className: string }) {
  const { width: W, height: H, layers } = stonewall;
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative aspect-[1670/942] overflow-hidden rounded-[28px] md:rounded-[36px] ${className}`}
    >
      <Image
        src="/bloom/chars/stonewall/plate.jpg"
        alt=""
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />
      {layers.map((l) => {
        const m = MOTION[l.id];
        return (
          <Image
            key={l.id}
            src={`/bloom/chars/stonewall/${l.id}.webp`}
            alt=""
            width={l.width}
            height={l.height}
            unoptimized
            className={`sw-layer pointer-events-none absolute max-w-none ${m?.className ?? ""}`}
            style={{
              left: pct(l.left, W),
              top: pct(l.top, H),
              width: pct(l.width, W),
              height: pct(l.height, H),
              transformOrigin: `${l.originX}% ${l.originY}%`,
              ...m?.style,
            }}
          />
        );
      })}
    </div>
  );
}
