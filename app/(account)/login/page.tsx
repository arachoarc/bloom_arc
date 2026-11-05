import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = { title: "로그인 | bloom!" };

export default function LoginPage() {
  return (
    <>
      <h1 className="font-display text-[28px] leading-tight text-ink">로그인</h1>
      <div className="mt-7">
        <LoginForm />
      </div>
      <p className="mt-6 text-center text-sm text-ink/60">
        아직 회원이 아닌가요?{" "}
        <Link href="/signup" className="font-bold text-pink-deep">
          회원가입
        </Link>
      </p>
    </>
  );
}
