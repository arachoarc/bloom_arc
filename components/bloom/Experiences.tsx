"use client";

import Image from "next/image";
import { useState } from "react";
import { useBloom } from "./BloomContext";
import { Sheet } from "./Sheet";
import { Duo, Eyebrow } from "./parts";
import { INSTAGRAM, experiences, ui } from "@/lib/bloom/content";

export default function Experiences() {
  const { lang } = useBloom();
  const [openId, setOpenId] = useState<string | null>(null);
  const e = ui.exp;
  const item = experiences.find((x) => x.id === openId) ?? null;

  return (
    <section id="experiences" aria-labelledby="exp-title" className="bg-cream px-5 py-14 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
      <Eyebrow>{e.eyebrow[lang]}</Eyebrow>
      <h2 id="exp-title" className="mt-3 font-display text-[28px] leading-tight text-ink md:text-4xl">
        {e.title[lang]}
      </h2>
      <p className="mt-2 text-sm text-ink/65 md:mt-3 md:text-base">
        {e.sub[lang]}
      </p>

      <ul className="mt-7 space-y-4 md:mt-12 md:grid md:grid-cols-3 md:gap-6 md:space-y-0">
        {experiences.map((x, i) => (
          <li key={x.id}>
            <button
              type="button"
              onClick={() => setOpenId(x.id)}
              className="group block w-full overflow-hidden rounded-[28px] bg-cream-light text-left ring-1 ring-ink/5 transition md:flex md:h-full md:flex-col md:hover:-translate-y-1 md:hover:shadow-xl md:hover:ring-pink/30"
            >
              <div className="relative aspect-[1670/941] w-full">
                <Image
                  src={x.img}
                  alt={x.alt[lang]}
                  fill
                  sizes="(max-width: 767px) 100vw, 380px"
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 grid size-8 place-items-center rounded-full bg-cream-head font-display text-base text-pink-deep">
                  {i + 1}
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 md:flex-1 md:items-end md:p-5">
                <div className="flex-1">
                  <p className="font-display text-xl leading-snug text-ink">{x.name[lang]}</p>
                  <p className="mt-1 text-[13px] leading-5 text-ink/70">{x.short[lang]}</p>
                </div>
                <span
                  aria-hidden
                  className="grid size-10 shrink-0 place-items-center rounded-full bg-pink text-white transition-transform group-active:scale-95"
                >
                  →
                </span>
                <span className="sr-only">{e.more[lang]}</span>
              </div>
            </button>
          </li>
        ))}
      </ul>
      </div>

      <Sheet open={!!item} onClose={() => setOpenId(null)} labelledBy="exp-sheet-title">
        {item && (
          <article className="px-5 pb-8 md:px-8 md:pb-10">
            <div className="relative aspect-[1670/941] w-full overflow-hidden rounded-3xl">
              <Image
                src={item.img}
                alt={item.alt[lang]}
                fill
                sizes="(max-width: 767px) 100vw, 640px"
                className="object-cover"
              />
            </div>

            <h3 id="exp-sheet-title" className="mt-5 font-display text-[26px] leading-tight text-ink">
              {item.name[lang]}
            </h3>
            <p className="mt-2 text-[15px] leading-6 text-ink/80">{item.short[lang]}</p>

            <div className="mt-6 flex items-end gap-4 rounded-3xl bg-cream p-4">
              <Duo pio={{ ...item.pio, alt: item.pio.alt[lang] }} tori={{ ...item.tori, alt: item.tori.alt[lang] }} height={96} />
              <div className="flex-1 pb-1">
                <p className="text-xs font-bold tracking-wider text-pink">{e.process[lang]}</p>
                <ol className="mt-2 space-y-1.5">
                  {item.steps.map((s, i) => (
                    <li key={s.en} className="flex gap-2 text-[13px] leading-5 text-ink/80">
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-aqua text-[11px] font-bold text-white">
                        {i + 1}
                      </span>
                      {s[lang]}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <h4 className="mt-6 text-xs font-bold tracking-wider text-pink">{e.info[lang]}</h4>
            <dl className="mt-2 divide-y divide-ink/10 rounded-2xl bg-cream-head text-sm">
              <div className="flex gap-3 px-4 py-3">
                <dt className="w-16 shrink-0 font-bold text-ink/60">{e.duration[lang]}</dt>
                <dd className="text-ink/80">{item.duration[lang]}</dd>
              </div>
              <div className="flex gap-3 px-4 py-3">
                <dt className="w-16 shrink-0 font-bold text-ink/60">{e.place[lang]}</dt>
                <dd className="text-ink/80">{item.place[lang]}</dd>
              </div>
              <div className="flex gap-3 px-4 py-3">
                <dt className="w-16 shrink-0 font-bold text-ink/60">{e.join[lang]}</dt>
                <dd className="text-ink/80">
                  {e.joinBefore[lang]}
                  <a
                    href={INSTAGRAM.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-pink underline underline-offset-2"
                  >
                    {INSTAGRAM.handle}
                  </a>
                  {e.joinAfter[lang]}
                </dd>
              </div>
            </dl>

          </article>
        )}
      </Sheet>
    </section>
  );
}
