"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Lang, Topic } from "@/lib/bloom/content";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  topics: Set<Topic>;
  setTopics: (t: Set<Topic>) => void;
  /** 상세보기 등에서 알림받기 영역으로 이동하며 해당 알림을 미리 선택한다 */
  goNotify: (topic?: Topic) => void;
};

const BloomCtx = createContext<Ctx | null>(null);

const LANG_KEY = "bloom-lang";

export function BloomProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ko");
  const [topics, setTopics] = useState<Set<Topic>>(new Set());

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

  const goNotify = useCallback((topic?: Topic) => {
    if (topic) {
      setTopics((prev) => new Set(prev).add(topic));
    }
    // 시트(dialog)가 닫힌 뒤 스크롤되도록 다음 프레임에 이동
    requestAnimationFrame(() => {
      const el = document.getElementById("notify");
      el?.scrollIntoView({ block: "start" });
      document.getElementById("notify-email")?.focus({ preventScroll: true });
    });
  }, []);

  return (
    <BloomCtx.Provider value={{ lang, setLang, topics, setTopics, goNotify }}>
      {children}
    </BloomCtx.Provider>
  );
}

export function useBloom() {
  const ctx = useContext(BloomCtx);
  if (!ctx) throw new Error("useBloom must be used inside BloomProvider");
  return ctx;
}
