"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useBloom } from "./BloomContext";
import { BellIcon, Eyebrow, PrimaryButton } from "./parts";
import { ui, type Topic } from "@/lib/bloom/content";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Errors = { topic?: string; email?: string };

export default function Notify() {
  const { lang, topics, setTopics } = useBloom();
  const n = ui.notify;
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<Topic[] | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  function toggle(t: Topic) {
    const next = new Set(topics);
    if (next.has(t)) next.delete(t);
    else next.add(t);
    setTopics(next);
    if (next.size) setErrors((e) => ({ ...e, topic: undefined }));
  }

  function validate(value: string): string | undefined {
    const v = value.trim();
    if (!v) return n.errEmpty[lang];
    if (!EMAIL_RE.test(v)) return n.errFormat[lang];
    return undefined;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {
      topic: topics.size ? undefined : n.errTopic[lang],
      email: validate(email),
    };
    setErrors(next);
    if (next.topic || next.email) {
      if (next.email && !next.topic) emailRef.current?.focus();
      return;
    }
    // 프로토타입: 이메일을 저장하거나 전송하지 않는다.
    setDone((["goods", "experience"] as Topic[]).filter((t) => topics.has(t)));
    requestAnimationFrame(() => {
      document.getElementById("notify")?.scrollIntoView({ block: "start" });
      doneRef.current?.focus({ preventScroll: true });
    });
  }

  function reset() {
    setDone(null);
    setEmail("");
    setErrors({});
    setTopics(new Set());
  }

  const options: { id: Topic; label: string; desc: string }[] = [
    { id: "goods", label: n.goods[lang], desc: n.goodsDesc[lang] },
    { id: "experience", label: n.experience[lang], desc: n.experienceDesc[lang] },
  ];

  return (
    <section id="notify" aria-labelledby={done ? "notify-done" : "notify-title"} className="bg-cream-light px-5 py-14">
      {done ? (
        <div className="flex flex-col items-center text-center">
          <div className="relative w-full rounded-[32px] bg-cream px-5 pt-8 pb-7">
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
            <ul className="mt-2 flex flex-wrap justify-center gap-2">
              {done.map((t) => (
                <li key={t} className="rounded-full bg-cream-light px-3.5 py-1.5 text-sm font-bold text-ink ring-1 ring-pink/30">
                  ✓ {t === "goods" ? n.goods[lang] : n.experience[lang]}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-2xl bg-limited/50 px-4 py-3 text-[13px] leading-5 text-ink/80">
              {n.doneProto[lang]}
            </p>
          </div>
          <div className="mt-6 grid w-full grid-cols-2 gap-3">
            <button
              type="button"
              onClick={reset}
              className="min-h-12 rounded-full border-2 border-ink/15 text-sm font-bold text-ink"
            >
              {n.again[lang]}
            </button>
            <a
              href="#top"
              className="flex min-h-12 items-center justify-center rounded-full bg-ink text-sm font-bold text-cream-head"
            >
              {n.top[lang]}
            </a>
          </div>
        </div>
      ) : (
        <>
          <Eyebrow>{n.eyebrow[lang]}</Eyebrow>
          <h2 id="notify-title" className="mt-3 font-display text-[28px] leading-tight text-ink">
            {n.title[lang]}
          </h2>

          <form onSubmit={onSubmit} noValidate className="mt-7">
            <fieldset aria-describedby={errors.topic ? "err-topic" : undefined}>
              <legend className="text-sm font-bold text-ink/80">{n.pick[lang]}</legend>
              <div className="mt-3 grid gap-2.5">
                {options.map((o) => {
                  const on = topics.has(o.id);
                  return (
                    <label
                      key={o.id}
                      className={`flex min-h-16 cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 ring-2 transition-colors ${
                        on ? "bg-pink/10 ring-pink" : "bg-cream ring-transparent"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() => toggle(o.id)}
                        className="peer sr-only"
                      />
                      <span
                        aria-hidden
                        className={`grid size-6 shrink-0 place-items-center rounded-md border-2 text-sm font-bold text-white peer-focus-visible:ring-2 peer-focus-visible:ring-aqua peer-focus-visible:ring-offset-2 ${
                          on ? "border-pink bg-pink" : "border-ink/25 bg-white"
                        }`}
                      >
                        {on ? "✓" : ""}
                      </span>
                      <span>
                        <span className="block font-bold text-ink">{o.label}</span>
                        <span className="mt-0.5 block text-[12px] text-ink/55">{o.desc}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
              {errors.topic && (
                <p id="err-topic" role="alert" className="mt-2 text-[13px] font-medium text-pink-deep">
                  {errors.topic}
                </p>
              )}
            </fieldset>

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
                if (errors.email) setErrors((er) => ({ ...er, email: validate(e.target.value) }));
              }}
              onBlur={() => email && setErrors((er) => ({ ...er, email: validate(email) }))}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "err-email" : "notify-proto"}
              className={`mt-2 block min-h-13 w-full rounded-2xl bg-white px-4 text-base text-ink ring-2 outline-none placeholder:text-ink/35 focus:ring-aqua ${
                errors.email ? "ring-pink-deep" : "ring-ink/10"
              }`}
            />
            {errors.email && (
              <p id="err-email" role="alert" className="mt-2 text-[13px] font-medium text-pink-deep">
                {errors.email}
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
        </>
      )}
    </section>
  );
}
