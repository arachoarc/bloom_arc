"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PrimaryButton } from "@/components/bloom/parts";
import { createClient } from "@/utils/supabase/client";
import { Field, FormError, withTimeout } from "./fields";

const LOGIN_FAILED = "이메일 또는 비밀번호가 틀렸습니다";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    setPending(true);
    setError(null);

    try {
      const { error } = await withTimeout(
        createClient().auth.signInWithPassword({ email, password }),
      );

      if (error) {
        setPending(false);
        setError(LOGIN_FAILED);
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      // 응답이 없을 때 버튼이 "로그인하는 중"에 멈추지 않게 되돌린다.
      setPending(false);
      setError("로그인하지 못했습니다. 페이지를 새로고침한 뒤 다시 시도해 주세요.");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={error ? "login-error" : undefined}>
      <Field id="email" label="이메일" type="email" inputMode="email" autoComplete="email" error={!!error} required />
      <Field
        id="password"
        label="비밀번호"
        type="password"
        autoComplete="current-password"
        error={!!error}
        required
      />
      {error && <FormError id="login-error">{error}</FormError>}
      <PrimaryButton type="submit" disabled={pending} className="mt-7">
        {pending ? "로그인하는 중…" : "로그인"}
      </PrimaryButton>
    </form>
  );
}
