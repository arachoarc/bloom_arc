"use client";

import { useEffect, useRef } from "react";
import { useBloom } from "./BloomContext";
import { ui } from "@/lib/bloom/content";

/**
 * 상세정보 모달 (네이티브 dialog 사용).
 * 모바일: 화면 아래에서 올라오는 시트 / md 이상: 화면 가운데 팝업.
 * size="lg"는 이미지와 정보를 좌우로 나누는 넓은 팝업.
 */
export function Sheet({
  open,
  onClose,
  labelledBy,
  size = "md",
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  size?: "md" | "lg";
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const { lang } = useBloom();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className={`sheet m-0 mt-auto max-h-[92dvh] w-full max-w-[430px] overflow-hidden rounded-t-[28px] bg-cream-light p-0 text-ink shadow-2xl [margin-inline:auto] backdrop:backdrop-blur-[2px] md:my-auto md:max-h-[88dvh] md:rounded-[28px] ${
        size === "lg" ? "md:max-w-4xl" : "md:max-w-2xl"
      }`}
    >
      <div className="max-h-[92dvh] overflow-y-auto overscroll-contain md:max-h-[88dvh]">
        <div className="sticky top-0 z-10 flex items-center justify-between bg-cream-light/95 px-4 pt-3 pb-2 backdrop-blur md:h-14 md:pt-0 md:pb-0">
          <span aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-ink/15 md:hidden" />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-2 right-3 grid size-11 place-items-center rounded-full text-2xl leading-none text-ink/70 hover:bg-ink/5"
            aria-label={ui.close[lang]}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}

/** 전체 화면 이미지 확대 보기. 탭하면 2.5배 확대/축소, 확대 시 손가락으로 이동 */
export function Lightbox({
  src,
  alt,
  w,
  h,
  onClose,
}: {
  src: string | null;
  alt: string;
  w: number;
  h: number;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const zoomRef = useRef(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const { lang } = useBloom();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (src && !d.open) {
      zoomRef.current = false;
      if (imgRef.current) imgRef.current.style.width = "100%";
      d.showModal();
    }
    if (!src && d.open) d.close();
  }, [src]);

  function toggleZoom(e: React.MouseEvent<HTMLImageElement>) {
    const img = imgRef.current;
    const box = scroller.current;
    if (!img || !box) return;
    const rect = img.getBoundingClientRect();
    const rx = (e.clientX - rect.left) / rect.width;
    const ry = (e.clientY - rect.top) / rect.height;
    zoomRef.current = !zoomRef.current;
    img.style.width = zoomRef.current ? "250%" : "100%";
    if (zoomRef.current) {
      requestAnimationFrame(() => {
        box.scrollLeft = img.offsetWidth * rx - box.clientWidth / 2;
        box.scrollTop = img.offsetTop + img.offsetHeight * ry - box.clientHeight / 2;
      });
    }
  }

  return (
    <dialog
      ref={ref}
      aria-label={alt}
      onClose={onClose}
      className="m-0 h-dvh max-h-none w-full max-w-none bg-ink/95 p-0 backdrop:bg-ink/90"
    >
      <div ref={scroller} className="flex h-full w-full overflow-auto overscroll-contain">
        {src && (
          // eslint-disable-next-line @next/next/no-img-element -- 확대 시 원본 해상도가 필요해 img 사용
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            width={w}
            height={h}
            onClick={toggleZoom}
            className="m-auto h-auto max-w-none shrink-0 cursor-zoom-in"
            style={{ width: "100%" }}
          />
        )}
      </div>
      <button
        type="button"
        onClick={onClose}
        className="fixed top-3 right-3 grid size-12 place-items-center rounded-full bg-cream-head text-2xl text-ink shadow-lg"
        aria-label={ui.closeZoom[lang]}
      >
        ×
      </button>
    </dialog>
  );
}
