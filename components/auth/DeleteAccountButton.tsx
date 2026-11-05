"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { FormError } from "./fields";

export default function DeleteAccountButton() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onClick() {
    if (!window.confirm("정말 탈퇴하시겠습니까?\n계정과 프로필이 삭제되며 되돌릴 수 없습니다.")) {
      return;
    }

    setPending(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.rpc("delete_own_account");

    if (error) {
      setPending(false);
      setError("탈퇴하지 못했습니다. 잠시 후 다시 시도해 주세요.");
      return;
    }

    // 계정이 지워져도 브라우저에 남은 토큰은 바로 무효가 되지 않으므로 반드시 로그아웃한다.
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        disabled={pending}
        className="min-h-12 w-full rounded-full border-2 border-pink-deep/40 text-sm font-bold text-pink-deep disabled:opacity-60"
      >
        {pending ? "탈퇴하는 중…" : "회원 탈퇴"}
      </button>
      {error && <FormError id="delete-error">{error}</FormError>}
    </div>
  );
}
