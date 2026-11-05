"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Lang } from "@/lib/bloom/content";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** 굿즈 상세보기 등에서 알림받기 영역으로 이동한다 */
  goNotify: () => void;
};

const BloomCtx = createContext<Ctx | null>(null);

const LANG_KEY = "bloom-lang";

export function BloomProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ko");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- 저장된 언어 복원(하이드레이션 이후)
      if (saved === "ko" || saved === "en") setLangState(saved);
    } catch {
      /* 저장소 사용 불가 시 기본값 유지 */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(LANG_KEY, l);
    } catch {
      /* noop */
    }
  }, []);

  const goNotify = useCallback(() => {
    // 시트(dialog)가 닫히면서 원래 버튼으로 포커스가 돌아가 스크롤이 되돌아가지 않도록,
    // 닫힘 처리가 끝난 뒤에 이동한다.
    setTimeout(() => {
      document.getElementById("notify-email")?.focus({ preventScroll: true });
      document.getElementById("notify")?.scrollIntoView({ block: "start" });
    }, 80);
  }, []);

  return (
    <BloomCtx.Provider value={{ lang, setLang, goNotify }}>
      {children}
    </BloomCtx.Provider>
  );
}

export function useBloom() {
  const ctx = useContext(BloomCtx);
  if (!ctx) throw new Error("useBloom must be used inside BloomProvider");
  return ctx;
}
