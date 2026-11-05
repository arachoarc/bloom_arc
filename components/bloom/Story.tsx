"use client";

import Image from "next/image";
import { useBloom } from "./BloomContext";
import { COLLAB, ui } from "@/lib/bloom/content";
import { Duo, Eyebrow } from "./parts";

export default function Story() {
  const { lang } = useBloom();
  const s = ui.story;

  return (
    <section id="story" aria-labelledby="story-title" className="relative overflow-hidden bg-forest">
      {/* 숲 분위기 영역 */}
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
            <p className="mt-3 text-sm font-bold tracking-wide text-cream-head md:text-base">{COLLAB}</p>
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

          <div className="mt-8 flex items-end gap-3 rounded-3xl bg-cream-light p-4 md:mx-auto md:mt-12 md:max-w-2xl md:gap-6 md:p-6">
            <Duo
              pio={{ src: "/bloom/chars/pio-welcome.png", w: 421, h: 401, alt: s.pioAlt[lang] }}
              tori={{ src: "/bloom/chars/tori-smile.png", w: 300, h: 354, alt: s.toriAlt[lang] }}
              height={104}
            />
            <p className="relative mb-6 flex-1 rounded-2xl rounded-bl-sm bg-white px-3.5 py-3 text-[13px] leading-5 font-medium text-ink shadow-sm md:px-5 md:py-4 md:text-base md:leading-7">
              {s.guide[lang]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
