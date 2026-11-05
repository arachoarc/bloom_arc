import { Suspense } from "react";
import AuthMenu, { AuthMenuFallback } from "@/components/auth/AuthMenu";
import BloomLanding from "@/components/bloom/BloomLanding";

export default function Home() {
  return (
    <BloomLanding
      authMenu={
        <Suspense fallback={<AuthMenuFallback />}>
          <AuthMenu />
        </Suspense>
      }
    />
  );
}
