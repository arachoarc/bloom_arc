"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useBloom } from "./BloomContext";
import { ui } from "@/lib/bloom/content";

const POSTER = "/bloom/kv-poster.png";

export default function Hero() {
  const { lang } = useBloom();
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    // 움직임 줄이기 설정 사용자는 자동 재생하지 않고 대표 이미지 위에서 직접 재생
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    v.muted = true;
    const p = v.play();
    if (p) {
      p.catch(() => setFallback(true));
    }
  }, []);

  function toggle() {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      v.play()
        .then(() => setFallback(false))
        .catch(() => setFallback(true));
    } else {
      v.pause();
    }
  }

  return (
    <section id="top" aria-label={ui.hero.videoLabel[lang]} className="bg-forest">
      <div className="relative aspect-[1080/1916] w-full overflow-hidden bg-forest">
        <video
          ref={video}
          className="absolute inset-0 size-full object-cover"
          src="/bloom/video/kv.mp4"
          poster={POSTER}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={ui.hero.videoLabel[lang]}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setFallback(true)}
        />
        {fallback && (
          <Image
            src={POSTER}
            alt={ui.hero.posterAlt[lang]}
            fill
            sizes="(max-width: 430px) 100vw, 430px"
            className="object-cover"
            preload
          />
        )}

        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? ui.hero.pause[lang] : ui.hero.play[lang]}
          className="absolute right-3 bottom-3 z-10 grid size-12 place-items-center rounded-full bg-ink/45 text-cream-head ring-1 ring-cream-head/40 backdrop-blur-sm"
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="ml-0.5 size-5" fill="currentColor" aria-hidden>
              <path d="M7 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L8.5 4.64A1 1 0 0 0 7 5.5Z" />
            </svg>
          )}
        </button>

        {fallback && (
          <p className="absolute bottom-3 left-3 z-10 max-w-[70%] rounded-full bg-ink/45 px-3 py-1.5 text-[11px] text-cream-head backdrop-blur-sm">
            {ui.hero.fallback[lang]}
          </p>
        )}
      </div>

      <a
        href="#story"
        className="flex flex-col items-center gap-1 py-5 text-cream-head/90"
      >
        <span className="text-xs font-medium">{ui.hero.scroll[lang]}</span>
        <svg viewBox="0 0 24 24" className="animate-bob size-6" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
