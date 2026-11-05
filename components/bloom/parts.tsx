import Image from "next/image";

type Img = { src: string; w: number; h: number; alt: string };

/**
 * 피오(메인)와 토리(서브)를 나란히 배치한다.
 * 가이드 기준: 토리의 몸 높이는 피오의 약 70%.
 */
export function Duo({
  pio,
  tori,
  height,
  className = "",
}: {
  pio: Img;
  tori: Img;
  height: number;
  className?: string;
}) {
  return (
    <div className={`flex shrink-0 items-end ${className}`}>
      <Image
        src={pio.src}
        alt={pio.alt}
        width={pio.w}
        height={pio.h}
        sizes={`${Math.round((height * pio.w) / pio.h)}px`}
        style={{ height, width: "auto" }}
      />
      <Image
        src={tori.src}
        alt={tori.alt}
        width={tori.w}
        height={tori.h}
        sizes={`${Math.round((height * 0.7 * tori.w) / tori.h)}px`}
        style={{ height: Math.round(height * 0.7), width: "auto" }}
        className="-ml-1"
      />
    </div>
  );
}

export function Eyebrow({
  children,
  tone = "dark",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <p
      className={`inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.18em] ${
        tone === "light" ? "text-aqua" : "text-pink"
      }`}
    >
      <span aria-hidden className="inline-block size-1.5 rounded-full bg-current" />
      {children}
    </p>
  );
}

export function PrimaryButton({
  children,
  onClick,
  type = "button",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-pink px-6 text-base font-bold text-white shadow-[0_6px_0_0_var(--color-pink-deep)] transition-transform active:translate-y-1 active:shadow-[0_2px_0_0_var(--color-pink-deep)] ${className}`}
    >
      {children}
    </button>
  );
}

export function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15L6 16Z" strokeLinejoin="round" />
      <path d="M10 20.5a2 2 0 0 0 4 0" strokeLinecap="round" />
    </svg>
  );
}
