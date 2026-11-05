"use client";

import Image from "next/image";
import { useBloom } from "./BloomContext";
import { ui } from "@/lib/bloom/content";
import { Eyebrow } from "./parts";

export default function Story() {
  const { lang } = useBloom();
  const s = ui.story;
  const f = s.friends;

  const friends = [
    { key: "pio", data: f.pio },
    { key: "tori", data: f.tori },
  ] as const;

  return (
    <section id="story" aria-labelledby="story-title" className="relative overflow-hidden bg-forest">
      {/* 숲 분위기 영역: 동백마을 소개 */}
      <div className="relative px-5 pt-14 pb-28 text-cream-head md:px-10 md:pt-24 md:pb-40">
        <Image
          src="/bloom/gfx/aqua-line-flower.png"
          alt=""
          width={318}
          height={338}
          className="pointer-events-none absolute -top-2 -right-6 w-28 opacity-80 md:top-10 md:right-[6%] md:w-40"
        />
        <Image
          src="/bloom/gfx/textured-leaf.png"
          alt=""
          width={311}
          height={315}
          className="pointer-events-none absolute bottom-10 -left-6 w-24 opacity-70 md:bottom-24 md:left-[3%] md:w-32"
        />
        <div className="relative mx-auto max-w-6xl md:grid md:grid-cols-2 md:items-end md:gap-16">
          <div>
            <Eyebrow tone="light">{s.eyebrow[lang]}</Eyebrow>
            <p className="mt-3 text-sm font-bold tracking-wide text-cream-head md:text-base">{s.place[lang]}</p>
            <h2 id="story-title" className="mt-2 font-display text-[40px] leading-[1.05] text-pink md:text-7xl">
              {s.title[lang]}
            </h2>
          </div>
          <div>
            <p className="mt-3 font-display text-xl text-cream-head/90 md:mt-0 md:text-2xl">{s.lead[lang]}</p>
            <p className="relative mt-5 text-[15px] leading-7 text-cream-head/80 md:text-base md:leading-8">
              {s.body[lang]}
            </p>
          </div>
        </div>
      </div>

      {/* 크림색 정보 영역 */}
      <div className="relative -mt-16 rounded-t-[32px] bg-cream px-5 pt-8 pb-12 md:-mt-24 md:rounded-t-[48px] md:px-10 md:pt-14 md:pb-20">
        <div className="mx-auto max-w-6xl">
          {/* 피오·토리 소개 */}
          <div className="rounded-[32px] bg-cream-light px-4 pt-8 pb-6 md:px-10 md:pt-12 md:pb-10">
            <h3 className="text-center font-display text-2xl text-ink md:text-3xl">{f.title[lang]}</h3>
            <p className="mt-2 text-center text-[13px] text-ink/65 md:text-base">{f.sub[lang]}</p>

            {/* 피오·토리가 함께 있는 원본 일러스트 (토리 몸 높이 ≈ 피오의 70%) */}
            <Image
              src="/bloom/chars/together-friends.png"
              alt={f.alt[lang]}
              width={960}
              height={619}
              sizes="(min-width: 768px) 560px, 90vw"
              className="mx-auto mt-6 h-auto w-full max-w-[560px] md:mt-10"
            />

            {/* 이름·소개: 그림 속 왼쪽 피오, 오른쪽 토리 순서 */}
            <div className="mx-auto mt-5 grid max-w-[560px] grid-cols-2 gap-3 md:mt-8 md:gap-8">
              {friends.map(({ key, data }) => (
                <article key={key} className="flex flex-col px-1.5">
                  <h4 className="font-display text-lg leading-tight break-keep text-ink md:text-3xl">{data.name[lang]}</h4>
                  <p className="mt-1 text-[13px] leading-5 font-bold text-ink/80 md:mt-2 md:text-base">{data.tagline[lang]}</p>
                  <p className="mt-2 text-[12px] leading-5 text-ink/70 md:text-sm md:leading-6">{data.intro[lang]}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
