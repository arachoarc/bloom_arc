"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Field, FormError } from "./fields";

export default function NicknameForm({ userId, nickname }: { userId: string; nickname: string }) {
  const router = useRouter();
  const [value, setValue] = useState(nickname);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = value.trim();
    setSaved(false);

    if (!next) {
      setError("닉네임을 입력해 주세요.");
      return;
    }

    setPending(true);
    setError(null);

    // RLS가 자기 행만 허용한다. 실제로 바뀐 행이 있는지 select로 확인한다.
    const { data, error } = await createClient()
      .from("profiles")
      .update({ nickname: next })
      .eq("id", userId)
      .select("nickname")
      .maybeSingle();

    setPending(false);

    if (error || !data) {
      setError("닉네임을 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.");
      return;
    }

    setValue(data.nickname);
    setSaved(true);
    router.refresh(); // 헤더의 "닉네임님"도 갱신
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <Field
        id="nickname"
        label="닉네임"
        type="text"
        autoComplete="nickname"
        maxLength={20}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setSaved(false);
        }}
        error={!!error}
        aria-describedby={error ? "nickname-error" : saved ? "nickname-saved" : undefined}
        required
      />
      {error && <FormError id="nickname-error">{error}</FormError>}
      {saved && (
        <p id="nickname-saved" role="status" className="mt-3 text-[13px] font-medium text-grass">
          ✓ 닉네임을 저장했습니다.
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="mt-4 min-h-12 w-full rounded-full bg-ink text-sm font-bold text-cream-head disabled:opacity-60"
      >
        {pending ? "저장하는 중…" : "닉네임 저장"}
      </button>
    </form>
  );
}
