"use client";

import Image from "next/image";
import { useBloom } from "./BloomContext";
import { COLLAB, ui } from "@/lib/bloom/content";

const NAV = ["story", "goods", "experiences", "visit", "notify"] as const;

export default function Header({ authMenu }: { authMenu?: React.ReactNode }) {
  const { lang, setLang } = useBloom();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-cream-head/95 backdrop-blur">
      {authMenu}
      <div className="flex h-14 items-center justify-between px-4">
        <a href="#top" className="flex items-center gap-2" aria-label="bl✿om! — BLOOM YOUR WAY">
          <Image
            src="/bloom/logo/color.png"
            alt="bl✿om!"
            width={2172}
            height={724}
            className="h-7 w-auto"
            preload
          />
          <span className="text-[10px] font-bold tracking-tight text-ink/60">{COLLAB}</span>
        </a>
        <div
          role="group"
          aria-label="Language"
          className="flex rounded-full bg-cream p-0.5 text-xs font-bold"
        >
          {(["ko", "en"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              className={`min-h-9 min-w-11 rounded-full px-2.5 transition-colors ${
                lang === l ? "bg-pink text-white shadow-sm" : "text-ink/60"
              }`}
            >
              {l === "ko" ? "KO" : "EN"}
            </button>
          ))}
        </div>
      </div>
      <nav aria-label={lang === "ko" ? "섹션 이동" : "Sections"}>
        <ul className="no-scrollbar flex gap-1.5 overflow-x-auto px-4 pb-2.5">
          {NAV.map((id) => (
            <li key={id} className="shrink-0">
              <a
                href={`#${id}`}
                className={`inline-flex min-h-8 items-center rounded-full px-3.5 text-[13px] font-bold ${
                  id === "notify"
                    ? "bg-pink text-white"
                    : "border border-ink/10 bg-cream-light text-ink/80"
                }`}
              >
                {ui.nav[id][lang]}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
