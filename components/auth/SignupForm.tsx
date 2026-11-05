"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PrimaryButton } from "@/components/bloom/parts";
import { createClient } from "@/utils/supabase/client";
import { Field, FormError } from "./fields";

function signupErrorMessage(code: string | undefined) {
  switch (code) {
    case "user_already_exists":
    case "email_exists":
      return "이미 가입된 이메일입니다.";
    case "weak_password":
      return "비밀번호는 6자 이상으로 입력해 주세요.";
    case "email_address_invalid":
      return "이메일 형식을 확인해 주세요.";
    default:
      return "회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.";
  }
}

export default function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const nickname = String(form.get("nickname") ?? "").trim();

    if (!email || !password || !nickname) {
      setError("이메일, 비밀번호, 닉네임을 모두 입력해 주세요.");
      return;
    }

    setPending(true);
    setError(null);

    // 닉네임은 user metadata로 보내고, DB 트리거가 profiles에 넣는다.
    const { data, error } = await createClient().auth.signUp({
      email,
      password,
      options: { data: { nickname } },
    });

    if (error || !data.session) {
      setPending(false);
      setError(error ? signupErrorMessage(error.code) : "회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={error ? "signup-error" : undefined}>
      <Field id="email" label="이메일" type="email" inputMode="email" autoComplete="email" required />
      <Field
        id="password"
        label="비밀번호"
        type="password"
        autoComplete="new-password"
        minLength={6}
        placeholder="6자 이상"
        required
      />
      <Field id="nickname" label="닉네임" type="text" autoComplete="nickname" maxLength={20} required />
      {error && <FormError id="signup-error">{error}</FormError>}
      <PrimaryButton type="submit" disabled={pending} className="mt-7">
        {pending ? "가입하는 중…" : "회원가입"}
      </PrimaryButton>
    </form>
  );
}
