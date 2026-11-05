import type { NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/proxy";

// Next.js 16부터 middleware.ts는 proxy.ts로 이름이 바뀌었다. 하는 일은 같다.
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // 정적 파일(이미지·영상·폰트 등)은 건너뛴다.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|woff2?)$).*)",
  ],
};
