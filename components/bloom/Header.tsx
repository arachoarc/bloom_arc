"use client";

import Image from "next/image";
import { useBloom } from "./BloomContext";
import { ui } from "@/lib/bloom/content";

const NAV = ["collab", "story", "experiences", "goods", "visit", "notify"] as const;

export default function Header({ authMenu }: { authMenu?: React.ReactNode }) {
  const { lang, setLang } = useBloom();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-cream-head/95 backdrop-blur">
      <div className="mx-auto max-w-6xl lg:px-6">{authMenu}</div>
      {/* 모바일·태블릿: 로고·언어 한 줄 + 섹션 메뉴 한 줄 / lg(1024px) 이상: 로고·메뉴·언어 한 줄 */}
      <div className="mx-auto flex max-w-6xl flex-wrap items-center lg:h-16 lg:flex-nowrap lg:gap-6 lg:px-6">
        <a
          href="#top"
          className="flex h-14 items-center pl-4 lg:h-auto lg:shrink-0"
          aria-label="bl✿om! — BLOOM YOUR WAY"
        >
          <Image
            src="/bloom/logo/color.png"
            alt="bl✿om!"
            width={2172}
            height={724}
            sizes="(min-width: 1024px) 132px, 120px"
            className="h-10 w-auto lg:h-11"
            preload
          />
        </a>

        <div
          role="group"
          aria-label="Language"
          className="mr-4 ml-auto flex rounded-full bg-cream p-0.5 text-xs font-bold lg:order-3 lg:ml-0"
        >
          {(["ko", "en"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              className={`min-h-9 min-w-11 rounded-full px-2.5 transition-colors ${
                lang === l ? "bg-pink text-white shadow-sm" : "text-ink/60 hover:text-ink"
              }`}
            >
              {l === "ko" ? "KO" : "EN"}
            </button>
          ))}
        </div>

        <nav
          aria-label={lang === "ko" ? "섹션 이동" : "Sections"}
          className="w-full lg:order-2 lg:ml-auto lg:w-auto"
        >
          <ul className="no-scrollbar flex gap-1.5 overflow-x-auto px-4 pb-2.5 lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0">
            {NAV.map((id) => (
              <li key={id} className="shrink-0">
                <a
                  href={`#${id}`}
                  className={`inline-flex min-h-8 items-center rounded-full px-3.5 text-[13px] font-bold transition-colors lg:min-h-10 lg:px-4 lg:text-sm ${
                    id === "notify"
                      ? "bg-pink text-white hover:bg-pink-deep"
                      : "border border-ink/10 bg-cream-light text-ink/80 hover:border-pink/40 hover:text-pink-deep lg:border-transparent lg:bg-transparent"
                  }`}
                >
                  {ui.nav[id][lang]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
