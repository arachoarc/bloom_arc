import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        // CSS Modules(*.module.css)는 Next.js 기본 처리에 맡긴다.
        // 이 조건이 없으면 module.css도 일반 CSS로 바뀌어 클래스 이름이 사라진다.
        condition: { not: { path: /\.module\.css$/ } },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
