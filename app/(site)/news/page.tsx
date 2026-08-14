import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Eyebrow, MaskHeading, CtaStrip, ArrowNE } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { news } from "@/lib/site";

export const metadata: Metadata = {
  title: "회사소식",
  description:
    "중앙이엔비의 공지사항과 회사 소식을 확인하세요.",
};

export default function NewsPage() {
  const [featured, ...rest] = news;

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "회사소식", href: "/news" }]} />

      <PageHero
        eyebrow="News"
        title="회사소식"
        desc="현장 운영 일정, 설비 가동 현황 등 거래처 필수 안내 사항을 신속하게 공유합니다."
        crumbs={[{ label: "회사소식", href: "/news" }]}
        bgImage="/about/hero-news.jpg"
      />

      {/* 최신 글 */}
      <section className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-20">
        <Link href={`/news/${featured.id}`} className="corner card group block p-8 md:p-12">
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <span className="badge">{featured.category}</span>
            <span className="text-[13px] font-bold text-mute">
              {featured.date.replace(/-/g, ".")}
            </span>
          </div>
          <h2 className="d2 mt-6 max-w-4xl text-ink">{featured.title}</h2>
          <p className="p-lg mt-5 max-w-3xl text-body">{featured.excerpt}</p>
          <span className="btn-ghost mt-8">
            자세히 보기
            <ArrowNE />
          </span>
        </Link>
      </section>

      {/* 목록 */}
      <section className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] pb-16 md:pb-24">
        <Eyebrow>Archive</Eyebrow>
        <MaskHeading className="d3 mt-5 text-ink" lines={[<>지난 소식</>]} />

        <ul className="mt-10 border-t border-hairline">
          {rest.map((n, i) => (
            <li key={n.id} className="rv" data-d={i * 60}>
              <Link
                href={`/news/${n.id}`}
                className="group grid gap-3 border-b border-hairline py-7 md:grid-cols-[7rem_8rem_1fr_auto] md:items-center md:gap-8"
              >
                <span className="text-[13px] font-bold text-mute">
                  {n.date.replace(/-/g, ".")}
                </span>
                <span className="badge w-fit">{n.category}</span>
                <div className="min-w-0">
                  <p className="h4 text-ink">{n.title}</p>
                  <p className="p-sm mt-2 line-clamp-2 text-body">{n.excerpt}</p>
                </div>
                <span className="isq hidden border-hairline text-ink group-hover:border-primary group-hover:bg-primary md:inline-flex">
                  <ArrowNE className="h-4 w-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaStrip
        eyebrow="Contact"
        title="현장 상황에 맞는 최적의 반입 및 파쇄·처리 솔루션을 안내해 드립니다. 자세한 문의는 대표번호로 연락해 주시기 바랍니다."
        href="/contact"
        cta="문의하기"
      />
    </>
  );
}
