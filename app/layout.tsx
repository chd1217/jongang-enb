import type { Metadata, Viewport } from "next";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import RevealProvider from "@/components/RevealProvider";
import Cursor from "@/components/Cursor";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://jungangenb.co.kr"),
  title: {
    default: `${company.nameKo} | 건설폐기물 종합처리 · 순환골재`,
    template: `%s | ${company.nameKo}`,
  },
  description:
    "중앙이앤비는 건설폐기물 중간처리와 순환골재 생산을 전문으로 하는 자원순환 기업입니다. 수집·운반부터 파쇄·선별, 품질시험, 출하까지 한 회사에서 일괄 처리합니다.",
  keywords: [
    "중앙이앤비",
    "건설폐기물",
    "건설폐기물 중간처리",
    "순환골재",
    "폐콘크리트",
    "폐아스콘",
    "폐기물 수집운반",
    "자원순환",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: company.nameKo,
    title: `${company.nameKo} | 건설폐기물 종합처리 · 순환골재`,
    description:
      "수집·운반부터 파쇄·선별, 순환골재 출하까지. 일일 1,200톤 처리 능력의 자원순환 전문기업.",
    images: [{ url: "/logo-square.png", width: 1024, height: 1024, alt: company.nameKoFull }],
  },
  robots: { index: true, follow: true },
  applicationName: company.nameEnTitle,
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
      </head>
      <body>
        <SmoothScroll />
        <RevealProvider />
        <Cursor />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:rounded-xs focus:bg-primary focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-black"
        >
          본문 바로가기
        </a>

        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
