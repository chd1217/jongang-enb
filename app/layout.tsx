import type { Metadata, Viewport } from "next";
import "./globals.css";

import { company } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://jungangenb.com"),
  title: {
    default: `${company.nameKo} | 폐기물 수집·운반 · 중간재활용`,
    template: `%s | ${company.nameKo}`,
  },
  description:
    "중앙이엔비는 폐기물 수집·운반·중간재활용 전문기업입니다. 가연성·재활용 폐기물을 파쇄·선별해 맞춤형 파쇄품으로 공급합니다.",
  keywords: [
    "중앙이엔비",
    "폐기물 수집운반",
    "폐기물 중간재활용",
    "폐합성수지류",
    "건설폐기물",
    "파쇄품",
    "자원순환",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: company.nameKo,
    title: `${company.nameKo} | 폐기물 수집·운반 · 중간재활용`,
    description: "수집·운반부터 파쇄·선별, 맞춤형 파쇄품 출하까지. 1999년부터 이어온 폐기물 중간재활용 전문기업.",
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
      <body>{children}</body>
    </html>
  );
}
