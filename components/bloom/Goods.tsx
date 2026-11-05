"use client";

import Image from "next/image";
import { useState } from "react";
import { useBloom } from "./BloomContext";
import { Lightbox, Sheet } from "./Sheet";
import { BellIcon, Eyebrow, PrimaryButton } from "./parts";
import { COLLAB, goods, ui, type Goods as GoodsItem } from "@/lib/bloom/content";

export default function Goods() {
  const { lang, goNotify } = useBloom();
  const [openId, setOpenId] = useState<string | null>(null);
  const [zoom, setZoom] = useState<GoodsItem | null>(null);
  const g = ui.goods;
  const item = goods.find((x) => x.id === openId) ?? null;

  return (
    <section id="goods" aria-labelledby="goods-title" className="relative overflow-hidden bg-cream-light py-14">
      <div className="pr-20 pl-5">
        <Eyebrow>{g.eyebrow[lang]}</Eyebrow>
        <h2 id="goods-title" className="mt-3 font-display text-[28px] leading-tight text-ink">
          {g.title[lang]}
        </h2>
        <p className="mt-2 text-sm text-ink/65">{g.sub[lang]}</p>
      </div>

      {/* 가장자리에서 안내하는 피오·토리 (제품을 가리지 않도록 헤더 옆에 배치) */}
      <Image
        src="/bloom/chars/pio-surprise.png"
        alt=""
        width={307}
        height={386}
        className="pointer-events-none absolute top-4 -right-5 h-[92px] w-auto rotate-[-8deg]"
      />

      <ul className="no-scrollbar mt-7 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-5 pb-3">
        {goods.map((p) => (
          <li key={p.id} className="w-[76%] shrink-0 snap-center">
            <button
              type="button"
              onClick={() => setOpenId(p.id)}
              className="group flex w-full flex-col overflow-hidden rounded-[28px] bg-cream text-left shadow-[0_2px_0_rgba(0,0,0,0.04)] ring-1 ring-ink/5"
            >
              <div className="relative aspect-[4/5] w-full bg-cream">
                <Image
                  src={p.img}
                  alt={p.alt[lang]}
                  fill
                  sizes="(max-width: 430px) 76vw, 330px"
                  className="object-contain p-3 transition-transform group-active:scale-[0.98]"
                />
                <span className="absolute top-3 left-3 rounded-full bg-limited px-2.5 py-1 text-[10px] font-bold tracking-wider text-ink">
                  LIMITED
                </span>
              </div>
              <div className="px-5 pt-1 pb-5">
                <p className="font-display text-[22px] tracking-wide text-ink">{p.name}</p>
                <p className="mt-0.5 text-[11px] font-bold text-ink/50">{COLLAB}</p>
                <p className="mt-2 text-sm text-ink/75">{p.short[lang]}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-pink">
                  {g.more[lang]}
                  <span aria-hidden>→</span>
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <Image
        src="/bloom/chars/tori-shy.png"
        alt=""
        width={297}
        height={341}
        className="pointer-events-none absolute -bottom-2 -left-3 h-[64px] w-auto"
      />

      <Sheet open={!!item} onClose={() => setOpenId(null)} labelledBy="goods-sheet-title">
        {item && (
          <article className="px-5 pb-8">
            <button
              type="button"
              onClick={() => setZoom(item)}
              className="relative block aspect-square w-full cursor-zoom-in overflow-hidden rounded-3xl bg-cream"
              aria-label={`${item.name} — ${g.zoomHint[lang]}`}
            >
              <Image
                src={item.img}
                alt={item.alt[lang]}
                fill
                sizes="(max-width: 430px) 100vw, 430px"
                className="object-contain p-2"
              />
              <span className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-full bg-ink/70 px-3 py-1.5 text-[11px] font-bold text-white">
                <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="m16 16 4 4M11 8.5v5M8.5 11h5" strokeLinecap="round" />
                </svg>
                {g.zoomHint[lang]}
              </span>
            </button>

            <h3 id="goods-sheet-title" className="mt-5 font-display text-[30px] leading-none text-ink">
              {item.name}
            </h3>
            <p className="mt-1.5 text-xs font-bold text-ink/50">{COLLAB}</p>
            <p className="mt-3 text-[15px] font-medium text-ink/80">{item.short[lang]}</p>

            <dl className="mt-6 space-y-5">
              <div>
                <dt className="text-xs font-bold tracking-wider text-pink">{g.motif[lang]}</dt>
                <dd className="mt-1.5 text-sm leading-6 text-ink/80">{item.motif[lang]}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold tracking-wider text-pink">{g.features[lang]}</dt>
                <dd className="mt-1.5">
                  <ul className="space-y-1.5 text-sm leading-6 text-ink/80">
                    {item.features.map((f) => (
                      <li key={f.en} className="flex gap-2">
                        <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-aqua" />
                        {f[lang]}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold tracking-wider text-pink">{g.collab[lang]}</dt>
                <dd className="mt-1.5 text-sm leading-6 text-ink/80">{item.story[lang]}</dd>
              </div>
            </dl>

            <p className="mt-6 rounded-2xl bg-limited/40 px-4 py-3 text-[13px] leading-5 text-ink/80">
              {g.soldAt[lang]}
            </p>

            <PrimaryButton
              className="mt-6"
              onClick={() => {
                setOpenId(null);
                goNotify("goods");
              }}
            >
              <BellIcon />
              {g.notifyCta[lang]}
            </PrimaryButton>
          </article>
        )}
      </Sheet>

      <Lightbox
        src={zoom?.img ?? null}
        alt={zoom?.alt[lang] ?? ""}
        w={zoom?.w ?? 1}
        h={zoom?.h ?? 1}
        onClose={() => setZoom(null)}
      />
    </section>
  );
}
