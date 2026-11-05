"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function LogoutButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function onClick() {
    setPending(true);
    await createClient().auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button type="button" onClick={onClick} disabled={pending} className={className}>
      로그아웃
    </button>
  );
}
