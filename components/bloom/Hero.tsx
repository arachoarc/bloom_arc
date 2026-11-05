"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useBloom } from "./BloomContext";
import { COLLAB, ui } from "@/lib/bloom/content";
import { BellIcon } from "./parts";

const POSTER = "/bloom/kv-poster.png";
const VIDEO = "/bloom/video/kv-v2.mp4";

// md(768px) 이상에서만 배경 영상을 만든다 (모바일은 영상을 한 번만 받도록)
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
  const backdrop = useRef<HTMLVideoElement>(null);
  const wide = useWide();
  const [playing, setPlaying] = useState(false);
  const [fallback, setFallback] = useState(false);
  const [muted, setMuted] = useState(true);

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
    <section
      id="top"
      aria-label={ui.hero.videoLabel[lang]}
      className="relative overflow-hidden bg-forest md:flex md:min-h-[calc(100dvh-131px)] md:items-center md:px-10 md:py-8 lg:min-h-[calc(100dvh-96px)]"
    >
      {/* md 이상: 같은 KV를 화면 전체에 흐리게 깔아 몰입감을 준다 (세로 영상은 자르지 않음) */}
      {wide && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {fallback ? (
            <Image src={POSTER} alt="" fill sizes="100vw" className="scale-110 object-cover blur-2xl brightness-[0.55] saturate-125" />
          ) : (
            <video
              ref={backdrop}
              className="size-full scale-110 object-cover blur-2xl brightness-[0.55] saturate-125"
              src={VIDEO}
              muted
              loop
              playsInline
              autoPlay
              preload="auto"
              tabIndex={-1}
              onLoadedData={(e) => {
                const main = video.current;
                if (main?.paused) e.currentTarget.pause();
                else if (main) e.currentTarget.currentTime = main.currentTime;
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-forest/60 via-forest/10 to-forest/70" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-forest" />
        </div>
      )}

      {/* md 이상: 세로 영상(왼쪽) + 안내 패널(오른쪽) */}
      <div className="md:relative md:z-10 md:mx-auto md:flex md:w-full md:max-w-6xl md:items-center md:justify-center md:gap-10 lg:gap-20">
      <div className="relative aspect-[1080/1916] w-full overflow-hidden bg-forest md:h-[clamp(460px,calc(100dvh-195px),700px)] lg:h-[clamp(520px,calc(100dvh-160px),920px)] md:w-auto md:shrink-0 md:rounded-[32px] md:shadow-2xl md:ring-1 md:ring-cream-head/10">
        <video
          ref={video}
          className="absolute inset-0 size-full object-cover"
          src={VIDEO}
          poster={POSTER}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={ui.hero.videoLabel[lang]}
          onPlay={() => {
            setPlaying(true);
            backdrop.current?.play().catch(() => {});
          }}
          onPause={() => {
            setPlaying(false);
            backdrop.current?.pause();
          }}
          onTimeUpdate={(e) => {
            // 배경 영상이 앞 영상과 0.5초 넘게 어긋나면 맞춘다
            const b = backdrop.current;
            const t = e.currentTarget.currentTime;
            if (b && Math.abs(b.currentTime - t) > 0.5) b.currentTime = t;
          }}
          onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
          onError={() => setFallback(true)}
        />
        {fallback && (
          <Image
            src={POSTER}
            alt={ui.hero.posterAlt[lang]}
            fill
            sizes="(max-width: 767px) 100vw, 480px"
            className="object-cover"
            preload
          />
        )}

        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? ui.hero.soundOn[lang] : ui.hero.soundOff[lang]}
          aria-pressed={!muted}
          className="absolute right-17 bottom-3 z-10 grid size-12 place-items-center rounded-full bg-ink/45 text-cream-head ring-1 ring-cream-head/40 backdrop-blur-sm"
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
          <p className="absolute bottom-3 left-3 z-10 max-w-[58%] rounded-full bg-ink/45 px-3 py-1.5 text-[11px] text-cream-head backdrop-blur-sm">
            {ui.hero.fallback[lang]}
          </p>
        )}
      </div>

      <div className="hidden max-w-md flex-col text-cream-head md:flex">
        <Image
          src="/bloom/chars/together-welcome.png"
          alt=""
          width={707}
          height={404}
          sizes="240px"
          className="h-auto w-56 lg:w-60"
        />
        <p className="mt-8 text-xs font-bold tracking-[0.2em] text-aqua">{ui.visit.popupName[lang]}</p>
        <p className="mt-3 font-display text-4xl leading-tight break-keep lg:text-5xl">{COLLAB}</p>
        <p className="mt-5 text-base leading-7 text-cream-head/80 lg:text-lg">{ui.hero.sideBody[lang]}</p>
        <p className="mt-6 flex flex-wrap items-center gap-2 text-sm text-cream-head/80">
          <span className="font-bold text-cream-head">{ui.visit.periodValue[lang]}</span>
          <span className="rounded-full bg-limited px-2.5 py-0.5 text-[11px] font-bold text-ink">
            {ui.visit.badge[lang]}
          </span>
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#goods"
            className="inline-flex min-h-12 items-center rounded-full border-2 border-cream-head/40 px-6 text-sm font-bold text-cream-head transition-colors hover:border-cream-head hover:bg-cream-head/10"
          >
            {ui.hero.sideGoods[lang]}
          </a>
          <a
            href="#notify"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-pink px-6 text-sm font-bold text-white transition-colors hover:bg-pink-deep"
          >
            <BellIcon />
            {ui.nav.notify[lang]}
          </a>
        </div>
        <a href="#story" className="mt-12 inline-flex items-center gap-2 text-sm text-cream-head/70 hover:text-cream-head">
          <svg viewBox="0 0 24 24" className="animate-bob size-5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {ui.hero.scroll[lang]}
        </a>
      </div>
      </div>

      <a
        href="#story"
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
