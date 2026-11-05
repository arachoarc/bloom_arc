"use client";

import Image from "next/image";
import { useBloom } from "./BloomContext";
import { ui } from "@/lib/bloom/content";
import { Eyebrow } from "./parts";

/** 동백마을 소개 + 피오·토리 소개를 한 덩어리로 보여 준다 */
export default function Story() {
  const { lang } = useBloom();
  const s = ui.story;
  const f = s.friends;

  const friends = [
    { key: "pio", data: f.pio },
    { key: "tori", data: f.tori },
  ] as const;

  return (
    <section
      id="story"
      aria-labelledby="story-title"
      className="relative overflow-hidden bg-forest px-5 py-14 text-cream-head md:px-10 md:py-24"
    >
      <Image
        src="/bloom/gfx/aqua-line-flower.png"
        alt=""
        width={318}
        height={338}
        className="pointer-events-none absolute -top-2 -right-6 w-28 opacity-80 md:top-10 md:right-[6%] md:w-40"
      />

      <div className="relative mx-auto max-w-6xl">
        <Eyebrow tone="light">{s.eyebrow[lang]}</Eyebrow>
        <p className="mt-3 text-sm font-bold tracking-wide text-cream-head md:text-base">{s.place[lang]}</p>
        <h2 id="story-title" className="mt-2 font-display text-[40px] leading-[1.05] text-pink md:text-7xl">
          {s.title[lang]}
        </h2>

        <div className="mt-6 md:mt-12 md:grid md:grid-cols-2 md:items-center md:gap-12 lg:gap-16">
          {/* 왼쪽: 마을 이야기 + 짧은 캐릭터 소개 */}
          <div>
            <p className="font-display text-xl text-cream-head/90 md:text-2xl">{s.lead[lang]}</p>
            <p className="mt-5 text-[15px] leading-7 text-cream-head/80 md:text-base md:leading-8">{s.body[lang]}</p>

            <div className="mt-4 md:mt-5">
              <p className="text-[13px] text-cream-head/70 md:text-sm">{f.sub[lang]}</p>
              <ul className="mt-3 space-y-2">
                {friends.map(({ key, data }) => (
                  <li key={key} className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                    <span className="font-display text-sm text-cream-head">{data.name[lang]}</span>
                    <span className="text-xs font-bold text-pink">{data.tagline[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 오른쪽(모바일은 아래): 피오·토리 그림 */}
          <FriendsImage alt={f.alt[lang]} className="mt-6 md:mt-0" />
        </div>
      </div>
    </section>
  );
}

/** 제주 돌담 위에 앉아 인사하는 피오·토리 일러스트 */
function FriendsImage({ alt, className }: { alt: string; className: string }) {
  return (
    <div
      className={`relative aspect-[1670/942] overflow-hidden rounded-[28px] ring-1 ring-cream-head/10 md:rounded-[36px] ${className}`}
    >
      <Image
        src="/bloom/chars/friends-stonewall-v2.jpg"
        alt={alt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}
