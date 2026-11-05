import Link from "next/link";
import { getCurrentUser } from "@/utils/supabase/server";
import LogoutButton from "./LogoutButton";

const STRIP = "flex h-8 items-center justify-end gap-2 px-4 text-xs font-bold text-ink/70";
const LINK = "inline-flex min-h-8 items-center hover:text-pink-deep";

function Divider() {
  return (
    <span aria-hidden className="text-ink/25">
      /
    </span>
  );
}

/** 헤더 맨 위 회원 메뉴. 세션(쿠키)을 읽으므로 반드시 <Suspense> 안에서 렌더링한다. */
export default async function AuthMenu() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <nav aria-label="회원 메뉴" className={STRIP}>
        <Link href="/login" className={LINK}>
          로그인
        </Link>
        <Divider />
        <Link href="/signup" className={LINK}>
          회원가입
        </Link>
      </nav>
    );
  }

  return (
    <nav aria-label="회원 메뉴" className={STRIP}>
      <span className="max-w-[10rem] truncate text-ink">{user.nickname}님</span>
      <Divider />
      <Link href="/mypage" className={LINK}>
        마이페이지
      </Link>
      <Divider />
      <LogoutButton className={LINK} />
    </nav>
  );
}

/** 세션을 읽는 동안 보여 줄 빈 자리 (높이를 맞춰 화면이 흔들리지 않게 한다) */
export function AuthMenuFallback() {
  return <div aria-hidden className="h-8" />;
}
