import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import RevealProvider from "@/components/RevealProvider";
import Cursor from "@/components/Cursor";

/** 공개 마케팅 사이트 전용 레이아웃 — 헤더/푸터/부드러운 스크롤/커스텀 커서. 관리자 페이지에는 적용되지 않는다. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
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
    </>
  );
}
