"use client";

import { useBloom } from "./BloomContext";
import { Eyebrow } from "./parts";
import { MAP_LINKS, ui } from "@/lib/bloom/content";

/**
 * 동백마을 찾아오는 방법. 알림받기 섹션(Notify) 안에서 보조 칸으로 쓴다.
 * id="visit"은 헤더 "방문 안내" 메뉴의 이동 위치.
 */
export default function VisitPanel({ className = "" }: { className?: string }) {
  const { lang } = useBloom();
  const v = ui.visit;

  return (
    <div
      id="visit"
      aria-labelledby="visit-title"
      role="region"
      className={`flex flex-col rounded-[28px] bg-forest/70 p-5 ring-1 ring-cream-head/15 backdrop-blur-sm md:p-7 ${className}`}
    >
      <Eyebrow tone="light">{v.eyebrow[lang]}</Eyebrow>
      <h2 id="visit-title" className="mt-2 font-display text-2xl leading-tight md:text-3xl">
        {v.title[lang]}
      </h2>

      <h3 className="mt-5 text-sm font-bold text-cream-head/90">{v.howTitle[lang]}</h3>
      <p className="mt-1.5 text-[13px] leading-5 text-cream-head/75 md:text-sm md:leading-6">{v.howBody[lang]}</p>
      {/* 높이가 늘어나면 지도 버튼은 카드 아래쪽에 붙는다 */}
      <div className="mt-4 grid gap-2.5 lg:mt-auto lg:pt-6">
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
            className="flex min-h-12 items-center justify-between rounded-full bg-cream-head px-5 text-sm font-bold text-ink transition-colors hover:bg-white"
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
  );
}
