"use client";

import Image from "next/image";
import { BloomProvider, useBloom } from "./BloomContext";
import Header from "./Header";
import Hero from "./Hero";
import Collab from "./Collab";
import Story from "./Story";
import Goods from "./Goods";
import Experiences from "./Experiences";
import Notify from "./Notify";
import { COLLAB, ui } from "@/lib/bloom/content";

export default function BloomLanding({ authMenu }: { authMenu?: React.ReactNode }) {
  return (
    <BloomProvider>
      {/* 390px 모바일 기준으로 만들고, md(768px) 이상에서는 섹션마다 데스크톱 배치로 펼친다 */}
      <div className="min-h-dvh w-full bg-cream-light">
        <Header authMenu={authMenu} />
        <main>
          <Hero />
          <Collab />
          <Story />
          <Experiences />
          <Goods />
          <Notify />
        </main>
        <Footer />
      </div>
    </BloomProvider>
  );
}

function Footer() {
  const { lang } = useBloom();
  return (
    <footer className="bg-forest px-5 pt-10 pb-12 text-cream-head/80 md:px-10 md:pt-14 md:pb-16">
      <div className="mx-auto max-w-6xl md:flex md:items-end md:justify-between md:gap-10">
        <div>
          <Image src="/bloom/logo/white.png" alt="bl✿om!" width={2048} height={682} className="h-9 w-auto md:h-11" />
          <p className="mt-3 font-display text-lg text-cream-head md:text-xl">{ui.footer.slogan[lang]}</p>
          <p className="mt-1 text-xs font-bold">{COLLAB}</p>
        </div>
        <p className="mt-6 text-[11px] leading-5 text-cream-head/60 md:mt-0 md:max-w-sm md:text-right">
          {ui.footer.disclaimer[lang]}
        </p>
      </div>
    </footer>
  );
}
