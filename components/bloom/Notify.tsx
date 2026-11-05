"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useBloom } from "./BloomContext";
import { BellIcon, Eyebrow, PrimaryButton } from "./parts";
import { ui } from "@/lib/bloom/content";
import VisitPanel from "./Visit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** 콜라보 섹션과 같은 글로우 그래픽 (가장자리 장식) */
const GLOWS = [
  { src: "/bloom/collab/aqua-flower.png", w: 348, h: 341, cls: "top-4 right-4 w-10 lg:top-10 lg:right-[6%] lg:w-16", delay: 0 },
  { src: "/bloom/collab/pink-flower.png", w: 358, h: 355, cls: "bottom-4 left-3 w-9 lg:bottom-12 lg:left-[4%] lg:w-14", delay: 1.4 },
  { src: "/bloom/collab/seed.png", w: 323, h: 324, cls: "right-6 bottom-6 hidden w-12 lg:block lg:right-[8%] lg:bottom-14", delay: 0.8 },
] as const;

/** 콜라보 굿즈 출시 알림 신청 (프로토타입: 이메일 저장·발송 없음) */
export default function Notify() {
  const { lang } = useBloom();
  const n = ui.notify;
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [done, setDone] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  function validate(value: string): string | undefined {
    const v = value.trim();
    if (!v) return n.errEmpty[lang];
    if (!EMAIL_RE.test(v)) return n.errFormat[lang];
    return undefined;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate(email);
    setError(err);
    if (err) {
      emailRef.current?.focus();
      return;
    }
    // 프로토타입: 이메일을 저장하거나 전송하지 않는다.
    setDone(true);
    requestAnimationFrame(() => {
      document.getElementById("notify")?.scrollIntoView({ block: "start" });
      doneRef.current?.focus({ preventScroll: true });
    });
  }

  function reset() {
    setDone(false);
    setEmail("");
    setError(undefined);
  }

  return (
    <section
      id="notify"
      aria-labelledby={done ? "notify-done" : "notify-title"}
      className="relative overflow-hidden bg-forest px-5 py-14 text-cream-head md:px-10 md:py-24"
    >
      {/* 콜라보 섹션과 같은 동백나무숲 배경 */}
      <Image src="/bloom/collab/forest.jpg" alt="" fill sizes="100vw" className="object-cover" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-forest/75 via-forest/35 to-forest/85" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-forest/70 via-forest/25 to-transparent" />
      {GLOWS.map((g) => (
        <Image
          key={g.src}
          src={g.src}
          alt=""
          aria-hidden
          width={g.w}
          height={g.h}
          sizes="64px"
          className={`glow-float pointer-events-none absolute h-auto ${g.cls}`}
          style={{ animationDelay: `${g.delay}s` }}
        />
      ))}

      {/*
        알림받기(메인, 넓은 칸) + 찾아오는 방법(보조, 좁은 칸).
        lg(1024px) 이상 나란히, 그 아래는 알림받기 → 찾아오는 방법 순서로 쌓는다.
      */}
      <div className="relative mx-auto max-w-6xl lg:grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start lg:gap-12">
        <div>
        {done ? (
          <div className="flex flex-col items-center text-center">
            <div className="relative w-full rounded-[32px] bg-cream px-5 pt-8 pb-7 text-ink">
              <Image
                src="/bloom/chars/together-welcome.png"
                alt={n.doneAlt[lang]}
                width={707}
                height={404}
                sizes="300px"
                className="mx-auto h-auto w-[78%]"
              />
              <h2
                id="notify-done"
                ref={doneRef}
                tabIndex={-1}
                className="mt-4 font-display text-[26px] leading-tight text-pink-deep outline-none"
              >
                {n.doneTitle[lang]}
              </h2>
              <p className="mt-4 text-xs font-bold tracking-wider text-ink/50">{n.doneBody[lang]}</p>
              <p className="mt-2 inline-flex rounded-full bg-cream-light px-3.5 py-1.5 text-sm font-bold text-ink ring-1 ring-pink/30">
                ✓ {n.goods[lang]}
              </p>
              <p className="mt-5 rounded-2xl bg-limited/50 px-4 py-3 text-[13px] leading-5 text-ink/80">
                {n.doneProto[lang]}
              </p>
            </div>
            <div className="mt-6 grid w-full grid-cols-2 gap-3">
              <button
                type="button"
                onClick={reset}
                className="min-h-12 rounded-full border-2 border-cream-head/40 text-sm font-bold text-cream-head transition-colors hover:border-cream-head"
              >
                {n.again[lang]}
              </button>
              <a
                href="#top"
                className="flex min-h-12 items-center justify-center rounded-full bg-cream-head text-sm font-bold text-ink transition-colors hover:bg-white"
              >
                {n.top[lang]}
              </a>
            </div>
          </div>
        ) : (
          <div>
            <Eyebrow tone="light">{n.eyebrow[lang]}</Eyebrow>
            <h2 id="notify-title" className="neon-text mt-3 font-display text-[28px] leading-tight text-cream-head md:text-4xl lg:text-5xl">
              {n.title[lang]}
            </h2>

            <form
              onSubmit={onSubmit}
              noValidate
              className="mt-7 rounded-[28px] bg-cream-light p-5 text-ink shadow-xl md:mt-8 md:rounded-[32px] md:p-8"
            >
              <p className="text-sm font-bold text-ink/80">{n.pick[lang]}</p>
              {/* 알림은 콜라보 굿즈 출시 소식 한 가지 */}
              <div className="mt-3 flex min-h-16 items-center gap-3 rounded-2xl bg-pink/10 px-4 py-3 ring-2 ring-pink">
                <span aria-hidden className="grid size-6 shrink-0 place-items-center rounded-md border-2 border-pink bg-pink text-sm font-bold text-white">
                  ✓
                </span>
                <span>
                  <span className="block font-bold text-ink">{n.goods[lang]}</span>
                  <span className="mt-0.5 block text-[12px] text-ink/55">{n.goodsDesc[lang]}</span>
                </span>
              </div>

              <label htmlFor="notify-email" className="mt-6 block text-sm font-bold text-ink/80">
                {n.email[lang]}
              </label>
              <input
                ref={emailRef}
                id="notify-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder={n.placeholder[lang]}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(validate(e.target.value));
                }}
                onBlur={() => email && setError(validate(email))}
                aria-invalid={!!error}
                aria-describedby={error ? "err-email" : "notify-proto"}
                className={`mt-2 block min-h-13 w-full rounded-2xl bg-white px-4 text-base text-ink ring-2 outline-none placeholder:text-ink/35 focus:ring-aqua ${
                  error ? "ring-pink-deep" : "ring-ink/10"
                }`}
              />
              {error && (
                <p id="err-email" role="alert" className="mt-2 text-[13px] font-medium text-pink-deep">
                  {error}
                </p>
              )}

              <PrimaryButton type="submit" className="mt-7">
                <BellIcon />
                {n.submit[lang]}
              </PrimaryButton>

              <p id="notify-proto" className="mt-4 flex gap-2 rounded-2xl bg-cream px-4 py-3 text-[12px] leading-5 text-ink/70">
                <span aria-hidden>ⓘ</span>
                {n.proto[lang]}
              </p>
            </form>
          </div>
        )}
        </div>

        {/* 보조: 동백마을 찾아오는 방법 */}
        <div className="mt-10 lg:mt-32">
          <VisitPanel />
        </div>
      </div>
    </section>
  );
}
