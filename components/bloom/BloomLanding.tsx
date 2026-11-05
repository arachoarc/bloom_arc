"use client";

import Image from "next/image";
import { BloomProvider, useBloom } from "./BloomContext";
import Header from "./Header";
import Hero from "./Hero";
import Story from "./Story";
import Goods from "./Goods";
import Experiences from "./Experiences";
import Visit from "./Visit";
import Notify from "./Notify";
import { COLLAB, ui } from "@/lib/bloom/content";

export default function BloomLanding() {
  return (
    <BloomProvider>
      {/* 390px 기준 모바일 프레임. 데스크톱에서는 가운데 정렬 */}
      <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-cream-light shadow-2xl">
        <Header />
        <main>
          <Hero />
          <Story />
          <Goods />
          <Experiences />
          <Visit />
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
    <footer className="bg-forest px-5 pt-10 pb-12 text-cream-head/80">
      <Image src="/bloom/logo/white.png" alt="bl✿om!" width={2048} height={682} className="h-9 w-auto" />
      <p className="mt-3 font-display text-lg text-cream-head">{ui.footer.slogan[lang]}</p>
      <p className="mt-1 text-xs font-bold">{COLLAB}</p>
      <p className="mt-6 text-[11px] leading-5 text-cream-head/60">{ui.footer.disclaimer[lang]}</p>
    </footer>
  );
}
