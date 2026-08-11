import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Eyebrow, MaskHeading, CtaStrip, NextLink } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { ceoMessage, values, overview, company, definition } from "@/lib/site";

export const metadata: Metadata = {
  title: "회사소개 · CEO 인사말",
  description:
    "중앙이앤비는 2004년 설립 이후 건설폐기물 중간처리 한 분야에 집중해 온 자원순환 기업입니다. 대표 인사말과 회사 개요를 확인하세요.",
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "회사소개", href: "/about" }]} />

      <PageHero
        eyebrow="About us"
        title="21년, 한 가지만 해왔습니다"
        desc={definition}
        crumbs={[{ label: "회사소개", href: "/about" }]}
      />

      {/* CEO 인사말 */}
      <section className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[20rem_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>CEO message</Eyebrow>
            <MaskHeading className="d3 mt-6 text-ink" lines={[<>대표 인사말</>]} />
            <div className="mt-8 border-t border-hairline pt-6">
              <p className="p-sm text-mute">{ceoMessage.sign}</p>
              <p className="h4 mt-1 text-ink">{company.ceo}</p>
            </div>
          </div>

          <div>
            <p className="rv d3 text-ink">{ceoMessage.lead}</p>
            <div className="mt-8 space-y-5">
              {ceoMessage.paragraphs.map((p, i) => (
                <p key={i} className="rv p-lg text-body" data-d={i * 90}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 핵심 원칙 */}
      <section className="soft-ch border-y border-hairline">
        <div className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
          <Eyebrow>Principles</Eyebrow>
          <MaskHeading className="d2 mt-6 text-ink" lines={[<>일하는 방식</>]} />

          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map((v, i) => (
              <li key={v.no} className="corner card rv p-7 md:p-8" data-d={i * 90}>
                <span className="num mt-3 block text-[2rem] text-hairline">{v.no}</span>
                <h3 className="h4 mt-6 text-ink">{v.title}</h3>
                <p className="p-md mt-3 text-body">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 회사 개요 */}
      <section className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
        <Eyebrow>Overview</Eyebrow>
        <MaskHeading className="d2 mt-6 text-ink" lines={[<>회사 개요</>]} />

        <dl className="mt-10 border-t border-hairline">
          {overview.map((row, i) => (
            <div
              key={row.k}
              className="rv grid gap-1 border-b border-hairline py-5 md:grid-cols-[14rem_1fr] md:gap-8"
              data-d={i * 50}
            >
              <dt className="cap-xs pt-1 text-mute">{row.k}</dt>
              <dd className="text-[15.5px] text-body">{row.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <CtaStrip
        eyebrow="Contact"
        title="반입 단가나 배차 일정이 궁금하시면 바로 연락 주세요."
        href="/contact"
        cta="견적 문의하기"
      />

      <NextLink href="/about/history" label="Next" title="연혁 보기" />
    </>
  );
}
