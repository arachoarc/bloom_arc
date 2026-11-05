import type { Metadata, Viewport } from "next";
import { Jua, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const jua = Jua({
  variable: "--font-jua",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const noto = Noto_Sans_KR({
  variable: "--font-noto",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const TITLE = "bloom! — BLOOM YOUR WAY | 동백마을 X A2O LITE";
const DESCRIPTION =
  "너의 방식대로 피어나. 제주 동백마을 X A2O LITE 한정판 굿즈와 마을 체험 프로그램을 만나 보세요. (교육용 가상 캠페인 프로토타입)";

export const metadata: Metadata = {
  // 링크 미리보기 이미지(app/opengraph-image.jpg)를 절대 주소로 만들기 위한 기준 URL
  metadataBase: new URL("https://bloom-arc.vercel.app"),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "bloom!",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1c2e1c",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${jua.variable} ${noto.variable} antialiased`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
