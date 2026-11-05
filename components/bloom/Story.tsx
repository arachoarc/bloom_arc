"use client";

import Image from "next/image";
import { useBloom } from "./BloomContext";
import { ui } from "@/lib/bloom/content";
import { Eyebrow } from "./parts";

// 피오(메인) 몸 높이 기준. 토리는 가이드대로 피오의 약 70%.
const PIO_H = { base: "h-[150px]", md: "md:h-[220px]" };
const TORI_H = { base: "h-[105px]", md: "md:h-[154px]" };

export default function Story() {
  const { lang } = useBloom();
  const s = ui.story;
  const f = s.friends;

  const friends = [
    {
      key: "pio",
      data: f.pio,
      img: { src: "/bloom/chars/pio-smell.png", w: 368, h: 374, cls: `${PIO_H.base} ${PIO_H.md}` },
      dot: "bg-pink",
    },
    {
      key: "tori",
      data: f.tori,
      img: { src: "/bloom/chars/tori-smile.png", w: 300, h: 354, cls: `${TORI_H.base} ${TORI_H.md}` },
      dot: "bg-seed",
    },
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
          <h3 className="font-display text-2xl text-ink md:text-3xl">{s.meaningTitle[lang]}</h3>
          <ul className="mt-5 grid gap-3 md:mt-8 md:grid-cols-3 md:gap-5">
            {s.meanings.map((m) => (
              <li
                key={m.key}
                className="flex items-center gap-4 rounded-3xl bg-cream-light p-4 md:flex-col md:items-start md:gap-5 md:p-6"
              >
                <div className="grid size-20 shrink-0 place-items-center rounded-2xl bg-cream md:size-24">
                  <Image
                    src={m.img}
                    alt=""
                    width={m.w}
                    height={m.h}
                    sizes="80px"
                    className="max-h-16 w-auto max-w-16 object-contain md:max-h-20 md:max-w-20"
                  />
                </div>
                <div>
                  <p className="font-display text-lg text-pink-deep md:text-xl">{m.name[lang]}</p>
                  <p className="mt-1 text-[13px] leading-5 text-ink/75 md:mt-2 md:text-sm md:leading-6">{m.desc[lang]}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* 피오·토리 소개 */}
          <div className="mt-12 rounded-[32px] bg-cream-light px-4 pt-8 pb-6 md:mt-16 md:px-10 md:pt-12 md:pb-10">
            <h3 className="text-center font-display text-2xl text-ink md:text-3xl">{f.title[lang]}</h3>
            <p className="mt-2 text-center text-[13px] text-ink/65 md:text-base">{f.sub[lang]}</p>

            <div className="mx-auto mt-6 grid max-w-3xl grid-cols-2 md:mt-10">
              {friends.map(({ key, data, img, dot }) => (
                <article key={key} className="flex flex-col px-1.5 md:px-6">
                  {/* 같은 바닥선 위에 서도록 피오 높이로 칸을 맞추고 아래 정렬 */}
                  <div className={`flex items-end justify-center border-b-2 border-dashed border-ink/25 pb-1 ${PIO_H.base} ${PIO_H.md}`}>
                    <Image
                      src={img.src}
                      alt={data.alt[lang]}
                      width={img.w}
                      height={img.h}
                      sizes="(min-width: 768px) 240px, 160px"
                      className={`w-auto ${img.cls}`}
                    />
                  </div>
                  <h4 className="mt-4 md:mt-6 font-display text-lg leading-tight break-keep text-ink md:text-3xl">{data.name[lang]}</h4>
                  <p className="mt-1 text-[13px] leading-5 font-bold text-ink/80 md:mt-2 md:text-base">{data.tagline[lang]}</p>
                  <p className="mt-2 text-[12px] leading-5 text-ink/70 md:text-sm md:leading-6">{data.intro[lang]}</p>
                  <p className="mt-4 text-[11px] font-bold tracking-wider text-ink/45 md:text-xs">{f.traitsLabel[lang]}</p>
                  <ul className="mt-1.5 space-y-1">
                    {data.traits.map((t) => (
                      <li key={t.en} className="flex gap-1.5 text-[12px] leading-5 text-ink/75 md:text-sm md:leading-6">
                        <span aria-hidden className={`mt-[7px] size-1.5 shrink-0 rounded-full md:mt-2.5 ${dot}`} />
                        {t[lang]}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
