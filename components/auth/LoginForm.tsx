"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PrimaryButton } from "@/components/bloom/parts";
import { createClient } from "@/utils/supabase/client";
import { Field, FormError } from "./fields";

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

    const { error } = await createClient().auth.signInWithPassword({ email, password });

    if (error) {
      setPending(false);
      setError(LOGIN_FAILED);
      return;
    }

    router.push("/");
    router.refresh();
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
