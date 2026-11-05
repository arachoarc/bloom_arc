import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { connection } from "next/server";

/** 서버 컴포넌트·서버 액션용 수파베이스 클라이언트. 요청마다 새로 만든다. */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // 서버 컴포넌트에서는 쿠키를 쓸 수 없다.
            // 세션 갱신은 proxy.ts가 맡으므로 무시해도 된다.
          }
        },
      },
    },
  );
}

/** 로그인한 사용자의 id·이메일·닉네임. 로그인하지 않았으면 null. */
export async function getCurrentUser() {
  // 토큰 만료 확인에 현재 시각(Date.now)을 쓰므로, 미리 렌더링하지 않고 요청 시점에만 실행한다.
  await connection();
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (!claims?.sub) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("nickname")
    .eq("id", claims.sub)
    .maybeSingle();

  return {
    id: claims.sub,
    email: typeof claims.email === "string" ? claims.email : "",
    nickname: profile?.nickname ?? "",
  };
}
