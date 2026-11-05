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
      <div className="relative px-5 pt-14 pb-28 text-cream-head">
        <Image
          src="/bloom/gfx/aqua-line-flower.png"
          alt=""
          width={318}
          height={338}
          className="pointer-events-none absolute -top-2 -right-6 w-28 opacity-80"
        />
        <Image
          src="/bloom/gfx/textured-leaf.png"
          alt=""
          width={311}
          height={315}
          className="pointer-events-none absolute bottom-10 -left-6 w-24 opacity-70"
        />
        <Eyebrow tone="light">{s.eyebrow[lang]}</Eyebrow>
        <p className="mt-3 text-sm font-bold tracking-wide text-lime">{COLLAB}</p>
        <h2 id="story-title" className="mt-2 font-display text-[40px] leading-[1.05] text-pink">
          {s.title[lang]}
        </h2>
        <p className="mt-3 font-display text-xl text-cream-head/90">{s.lead[lang]}</p>
        <p className="relative mt-5 text-[15px] leading-7 text-cream-head/80">{s.body[lang]}</p>
      </div>

      {/* 크림색 정보 영역 */}
      <div className="relative -mt-16 rounded-t-[32px] bg-cream px-5 pt-8 pb-12">
        <h3 className="font-display text-2xl text-ink">{s.meaningTitle[lang]}</h3>
        <ul className="mt-5 grid gap-3">
          {s.meanings.map((m) => (
            <li key={m.key} className="flex items-center gap-4 rounded-3xl bg-cream-light p-4">
              <div className="grid size-20 shrink-0 place-items-center rounded-2xl bg-cream">
                <Image
                  src={m.img}
                  alt=""
                  width={m.w}
                  height={m.h}
                  sizes="64px"
                  className="max-h-16 w-auto max-w-16 object-contain"
                />
              </div>
              <div>
                <p className="font-display text-lg text-pink-deep">{m.name[lang]}</p>
                <p className="mt-1 text-[13px] leading-5 text-ink/75">{m.desc[lang]}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-end gap-3 rounded-3xl bg-cream-light p-4">
          <Duo
            pio={{ src: "/bloom/chars/pio-welcome.png", w: 421, h: 401, alt: s.pioAlt[lang] }}
            tori={{ src: "/bloom/chars/tori-smile.png", w: 300, h: 354, alt: s.toriAlt[lang] }}
            height={104}
          />
          <p className="relative mb-6 flex-1 rounded-2xl rounded-bl-sm bg-white px-3.5 py-3 text-[13px] leading-5 font-medium text-ink shadow-sm">
            {s.guide[lang]}
          </p>
        </div>
      </div>
    </section>
  );
}
