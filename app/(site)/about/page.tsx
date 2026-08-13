import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Eyebrow, MaskHeading, CtaStrip, NextLink } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { teamMessage, values, overview, definition } from "@/lib/site";

export const metadata: Metadata = {
  title: "회사소개 · 인사말",
  description:
    "중앙이엔비는 1999년 설립 이후 폐기물 수집·운반과 중간재활용 한 분야에 집중해 온 자원순환 기업입니다. 인사말과 회사 개요를 확인하세요.",
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "회사소개", href: "/about" }]} />

      <PageHero
        eyebrow="About us"
        title="26년, 한 가지만 해왔습니다"
        desc={definition}
        crumbs={[{ label: "회사소개", href: "/about" }]}
      />

      {/* 인사말 — 임직원 일동, 배경 배너형 */}
      <section className="relative isolate overflow-hidden bg-ink">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url(/about/team-hero.jpg)" }}
          aria-hidden
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-black/75 via-black/65 to-black/85"
          aria-hidden
        />

        <div className="mx-auto max-w-3xl px-[var(--pad)] py-24 text-center md:py-32">
          <Eyebrow className="justify-center">Our promise</Eyebrow>
          <MaskHeading className="d2 mt-6 text-white" lines={[<>{teamMessage.headline}</>]} />
          <div className="mt-8 space-y-5">
            {teamMessage.paragraphs.map((p, i) => (
              <p key={i} className="rv p-lg text-white/80" data-d={i * 90}>
                {p}
              </p>
            ))}
          </div>
          <p className="rv mt-10 text-[15px] font-bold tracking-wide text-white" data-d="360">
            {teamMessage.sign}
          </p>
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

      <NextLink href="/about/certificates" label="Next" title="인증·허가 보기" />
    </>
  );
}
