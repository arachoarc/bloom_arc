"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useBloom } from "./BloomContext";
import { ui } from "@/lib/bloom/content";

// 모바일: 세로(9:16) KV / md(768px) 이상: 가로(16:9) KV
const KV = {
  portrait: { video: "/bloom/video/kv-v2.mp4", poster: "/bloom/kv-poster.png" },
  landscape: { video: "/bloom/video/kv-horizontal-1080.mp4", poster: "/bloom/kv-poster-horizontal.jpg" },
};

const WIDE = "(min-width: 48rem)";
function subscribeWide(onChange: () => void) {
  const m = window.matchMedia(WIDE);
  m.addEventListener("change", onChange);
  return () => m.removeEventListener("change", onChange);
}
function useWide() {
  return useSyncExternalStore(
    subscribeWide,
    () => window.matchMedia(WIDE).matches,
    () => false,
  );
}

export default function Hero() {
  const { lang } = useBloom();
  const video = useRef<HTMLVideoElement>(null);
  const wide = useWide();
  const kv = wide ? KV.landscape : KV.portrait;
  const [playing, setPlaying] = useState(false);
  const [fallback, setFallback] = useState(false);
  const [muted, setMuted] = useState(true);

  // 화면 폭이 바뀌어 영상이 교체될 때마다 음소거 자동 재생을 다시 시도한다
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    // 움직임 줄이기 설정 사용자는 자동 재생하지 않고 대표 이미지 위에서 직접 재생
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    v.muted = true;
    v.play()
      .then(() => setFallback(false))
      .catch(() => setFallback(true));
  }, [wide]);

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

  // 자동 재생은 음소거로 시작하고, 사용자가 직접 누를 때만 소리를 켠다 (브라우저 자동 재생 정책).
  function toggleSound() {
    const v = video.current;
    if (!v) return;
    v.muted = !v.muted;
    if (!v.muted && v.paused) {
      v.play()
        .then(() => setFallback(false))
        .catch(() => setFallback(true));
    }
  }

  return (
    <section id="top" aria-label={ui.hero.videoLabel[lang]} className="bg-forest">
      {/*
        모바일: 9:16 세로 영상 전체 폭
        md 이상: 16:9 가로 영상을 화면 폭에 꽉 채운다. 화면이 아주 납작해도
        1.85:1보다 더 자르지 않아 로고와 피오·토리가 잘리지 않는다.
      */}
      <div className="relative aspect-[1080/1916] w-full overflow-hidden bg-forest md:aspect-auto md:h-[min(56.25vw,max(calc(100dvh-131px),54vw))] lg:h-[min(56.25vw,max(calc(100dvh-96px),54vw))]">
        <video
          key={kv.video}
          ref={video}
          className="absolute inset-0 size-full object-cover"
          src={kv.video}
          poster={kv.poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={ui.hero.videoLabel[lang]}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
          onError={() => setFallback(true)}
        />
        {fallback && (
          <Image
            src={kv.poster}
            alt={ui.hero.posterAlt[lang]}
            fill
            sizes="100vw"
            className="object-cover"
            preload
          />
        )}

        <div className="absolute right-3 bottom-3 z-10 flex gap-2 md:right-6 md:bottom-6">
          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? ui.hero.soundOn[lang] : ui.hero.soundOff[lang]}
            aria-pressed={!muted}
            className="grid size-12 place-items-center rounded-full bg-ink/45 text-cream-head ring-1 ring-cream-head/40 backdrop-blur-sm transition-colors hover:bg-ink/60"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" />
              {muted ? (
                <path d="m16 9.5 5 5m0-5-5 5" />
              ) : (
                <>
                  <path d="M15.5 9a4 4 0 0 1 0 6" />
                  <path d="M18 6.5a7.5 7.5 0 0 1 0 11" />
                </>
              )}
            </svg>
          </button>

          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? ui.hero.pause[lang] : ui.hero.play[lang]}
            className="grid size-12 place-items-center rounded-full bg-ink/45 text-cream-head ring-1 ring-cream-head/40 backdrop-blur-sm transition-colors hover:bg-ink/60"
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
        </div>

        {fallback && (
          <p className="absolute bottom-3 left-3 z-10 max-w-[58%] rounded-full bg-ink/45 px-3 py-1.5 text-[11px] text-cream-head backdrop-blur-sm md:bottom-6 md:left-6 md:max-w-sm md:text-xs">
            {ui.hero.fallback[lang]}
          </p>
        )}
      </div>

      <a
        href="#collab"
        className="flex flex-col items-center gap-1 py-5 text-cream-head/90 md:hidden"
      >
        <span className="text-xs font-medium">{ui.hero.scroll[lang]}</span>
        <svg viewBox="0 0 24 24" className="animate-bob size-6" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
