import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import DeleteAccountButton from "@/components/auth/DeleteAccountButton";
import NicknameForm from "@/components/auth/NicknameForm";
import { getCurrentUser } from "@/utils/supabase/server";

export const metadata: Metadata = { title: "마이페이지 | bloom!" };

export default function MyPage() {
  return (
    <>
      <h1 className="font-display text-[28px] leading-tight text-ink">마이페이지</h1>
      <Suspense fallback={<p className="mt-7 text-sm text-ink/50">불러오는 중…</p>}>
        <MyPageContent />
      </Suspense>
    </>
  );
}

async function MyPageContent() {
  // proxy.ts가 먼저 막지만, 데이터 가까이에서 한 번 더 확인한다.
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <>
      <section aria-labelledby="account-info" className="mt-7 rounded-[32px] bg-cream px-5 py-6">
        <h2 id="account-info" className="sr-only">
          내 정보
        </h2>
        <p className="text-sm font-bold text-ink/80">이메일</p>
        <p className="mt-2 break-all text-base text-ink">{user.email}</p>
        <div className="mt-6">
          <NicknameForm userId={user.id} nickname={user.nickname} />
        </div>
      </section>

      <div className="mt-12 border-t border-ink/10 pt-6">
        <DeleteAccountButton />
      </div>
    </>
  );
}
