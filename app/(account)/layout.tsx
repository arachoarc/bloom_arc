import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import AuthMenu, { AuthMenuFallback } from "@/components/auth/AuthMenu";

/** 회원 화면(/login, /signup, /mypage) 공통 틀. 랜딩과 같은 모바일 프레임을 쓴다. */
export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-cream-light shadow-2xl">
      <header className="sticky top-0 z-40 border-b border-ink/5 bg-cream-head/95 backdrop-blur">
        <Suspense fallback={<AuthMenuFallback />}>
          <AuthMenu />
        </Suspense>
        <div className="flex h-14 items-center px-4">
          <Link href="/" className="flex items-center" aria-label="bl🌸om! 메인으로">
            {/* 메인 헤더(모바일)와 같은 로고 크기 */}
            <Image
              src="/bloom/logo/color.png"
              alt="bl🌸om!"
              width={2172}
              height={724}
              sizes="120px"
              className="h-10 w-auto"
              preload
            />
          </Link>
        </div>
      </header>
      <main className="flex-1 px-5 pt-10 pb-16">{children}</main>
    </div>
  );
}
