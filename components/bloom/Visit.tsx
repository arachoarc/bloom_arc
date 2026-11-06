"use client";

import { useEffect, useRef, useState } from "react";
import { useBloom } from "./BloomContext";
import { MAP_LINKS, ui } from "@/lib/bloom/content";

/**
 * 동백마을 찾아오는 방법. 알림받기 섹션(Notify) 안에서 보조 칸으로 쓴다.
 * id="visit"은 헤더 "방문 안내" 메뉴의 이동 위치.
 */
export default function VisitPanel({ className = "" }: { className?: string }) {
  const { lang } = useBloom();
  const v = ui.visit;
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  /** 주소만 클립보드에 넣고 잠깐 "복사됨"으로 바꾼다 (지도 앱에 바로 붙여 넣기 좋게) */
  async function copyAddress() {
    const text = v.address[lang];
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // http 환경 등 clipboard API를 못 쓸 때
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      id="visit"
      aria-labelledby="visit-title"
      role="region"
      className={`flex flex-col rounded-[28px] bg-forest/70 p-5 ring-1 ring-cream-head/15 backdrop-blur-sm md:p-7 ${className}`}
    >
      <h2 id="visit-title" className="font-display text-2xl leading-tight md:text-3xl">
        {v.title[lang]}
      </h2>

      <h3 className="mt-5 text-sm font-bold text-cream-head/90">{v.howTitle[lang]}</h3>
      <p className="mt-1.5 text-[13px] leading-5 text-cream-head/75 md:text-sm md:leading-6">{v.howBody[lang]}</p>
      <div className="mt-3 flex items-center gap-3 rounded-2xl bg-cream-head/10 px-4 py-3 ring-1 ring-cream-head/15">
        <address className="min-w-0 flex-1 not-italic">
          <span className="block text-sm font-bold text-cream-head">{v.place[lang]}</span>
          <span className="mt-0.5 block text-[13px] leading-5 text-cream-head/75 md:text-sm md:leading-6">{v.address[lang]}</span>
        </address>
        <button
          type="button"
          onClick={copyAddress}
          className="flex min-h-10 shrink-0 items-center gap-1.5 rounded-full bg-cream-head/15 px-3.5 text-xs font-bold text-cream-head ring-1 ring-cream-head/25 transition-colors hover:bg-cream-head/25"
        >
          {copied ? (
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
              <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <rect x="9" y="9" width="11" height="11" rx="2.5" />
              <path d="M15 9V6.5A2.5 2.5 0 0 0 12.5 4h-6A2.5 2.5 0 0 0 4 6.5v6A2.5 2.5 0 0 0 6.5 15H9" />
            </svg>
          )}
          <span aria-live="polite">{copied ? v.copied[lang] : v.copy[lang]}</span>
        </button>
      </div>
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
