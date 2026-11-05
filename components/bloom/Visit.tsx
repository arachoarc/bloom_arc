"use client";

import Image from "next/image";
import { useBloom } from "./BloomContext";
import { Eyebrow } from "./parts";
import { MAP_LINKS, ui } from "@/lib/bloom/content";

export default function Visit() {
  const { lang } = useBloom();
  const v = ui.visit;

  const rows = [
    [v.period, v.periodValue],
    [v.hours, v.hoursValue],
    [v.venue, v.venueValue],
    [v.goodsAt, v.goodsAtValue],
    [v.programs, v.programsValue],
  ] as const;

  return (
    <section id="visit" aria-labelledby="visit-title" className="relative overflow-hidden bg-grass px-5 py-14 text-cream-head">
      <Image
        src="/bloom/gfx/main-flower.png"
        alt=""
        width={698}
        height={748}
        className="pointer-events-none absolute -top-10 -right-14 w-44 opacity-90"
      />
      <Eyebrow tone="light">{v.eyebrow[lang]}</Eyebrow>
      <h2 id="visit-title" className="relative mt-3 font-display text-[30px] leading-tight">
        {v.title[lang]}
      </h2>

      <div className="relative mt-7 rounded-[28px] bg-cream-light p-5 text-ink">
        <div className="flex items-start justify-between gap-3">
          <p className="font-display text-xl leading-tight text-pink-deep">{v.popupName[lang]}</p>
          <span className="shrink-0 rounded-full bg-limited px-2.5 py-1 text-[11px] font-bold">
            {v.badge[lang]}
          </span>
        </div>
        <p className="mt-2 text-[12px] leading-5 text-ink/60">{v.notice[lang]}</p>

        <dl className="mt-4 divide-y divide-ink/10 border-t border-ink/10 text-sm">
          {rows.map(([k, val]) => (
            <div key={k.en} className="flex gap-3 py-3">
              <dt className="w-20 shrink-0 font-bold text-ink/60">{k[lang]}</dt>
              <dd className="text-ink/85">{val[lang]}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative mt-4 rounded-[28px] bg-forest/60 p-5 ring-1 ring-cream-head/15">
        <h3 className="font-display text-lg">{v.howTitle[lang]}</h3>
        <p className="mt-1.5 text-[13px] leading-5 text-cream-head/80">{v.howBody[lang]}</p>
        <div className="mt-4 grid gap-2.5">
          {(
            [
              ["google", v.google],
              ["naver", v.naver],
            ] as const
          ).map(([key, label]) => (
            <a
              key={key}
              href={MAP_LINKS[key]}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center justify-between rounded-full bg-cream-head px-5 text-sm font-bold text-ink"
            >
              <span className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="size-5 text-pink" fill="currentColor" aria-hidden>
                  <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
                </svg>
                {label[lang]}
              </span>
              <span aria-hidden>↗</span>
              <span className="sr-only">{v.newTab[lang]}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
