import type { Metadata } from "next";
import Link from "next/link";
import SignupForm from "@/components/auth/SignupForm";

export const metadata: Metadata = { title: "회원가입 | bloom!" };

export default function SignupPage() {
  return (
    <>
      <h1 className="font-display text-[28px] leading-tight text-ink">회원가입</h1>
      <div className="mt-7">
        <SignupForm />
      </div>
      <p className="mt-6 text-center text-sm text-ink/60">
        이미 계정이 있나요?{" "}
        <Link href="/login" className="font-bold text-pink-deep">
          로그인
        </Link>
      </p>
    </>
  );
}
