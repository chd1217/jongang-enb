import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import HorizontalProcess from "@/components/HorizontalProcess";
import { Eyebrow, MaskHeading, CtaStrip, NextLink } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { IconEnv, IconTruck, IconScreen, IconCrusher, IconCert, IconScale } from "@/components/Icons";
import { processSteps } from "@/lib/site";

export const metadata: Metadata = {
  title: "처리 공정",
  description: "수집·운반부터 반입 선별, 1차·2차 파쇄, 정밀 검수, 출하까지 중앙이엔비의 5단계 처리 공정을 안내합니다.",
};

const STEP_ICONS = [IconTruck, IconScreen, IconCrusher, IconCert, IconScale];

const env = [
  {
    t: "비산먼지 저감",
    d: "야적·파쇄 구간에 살수 설비를 운영해 비산먼지 발생을 관리합니다.",
  },
  {
    t: "소음 관리",
    d: "파쇄 설비 운영 시간을 법정 기준 내로 관리합니다.",
  },
  {
    t: "적법 처리",
    d: "지정폐기물은 취급하지 않으며, 지정 외 폐기물만 정식 허가 범위 안에서 처리합니다.",
  },
  {
    t: "이력 관리",
    d: "반입부터 출하까지 전 단계를 올바로시스템으로 기록해 감사·실사에 즉시 대응합니다.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "처리 공정", href: "/process" }]} />

      <PageHero
        eyebrow="Process"
        title="5단계 일괄 처리 라인"
        desc="수집·운반 · 반입 선별 · 파쇄 · 정밀 검수 · 출하. 모든 단계의 기록이 재활용확인서로 남습니다."
        crumbs={[{ label: "처리 공정", href: "/process" }]}
        bgImage="/about/hero-process.jpg"
      />

      {/* 가로 스크롤 공정 */}
      <section className="pt-16 md:pt-20">
        <div className="mx-auto max-w-[var(--maxw)] px-[var(--pad)]">
          <Eyebrow>Line</Eyebrow>
          <MaskHeading className="d2 mt-6 text-ink" lines={[<>공정 흐름</>]} />
        </div>

        <div className="mt-12">
          <HorizontalProcess />
        </div>
      </section>

      {/* 상세 표 */}
      <section className="soft-ch border-y border-hairline">
        <div className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
          <Eyebrow>Detail</Eyebrow>
          <MaskHeading className="d2 mt-6 text-ink" lines={[<>단계별 상세</>]} />

          <ol className="relative mt-12 border-t border-hairline">
            <div
              className="absolute top-12 bottom-12 left-6 hidden w-px bg-hairline-strong md:block"
              aria-hidden
            />
            {processSteps.map((s, i) => {
              const Icon = STEP_ICONS[i] ?? IconCrusher;
              return (
                <li
                  key={s.no}
                  className="rv grid gap-3 border-b border-hairline py-7 md:grid-cols-[5rem_16rem_1fr] md:items-center md:gap-8"
                  data-d={i * 60}
                >
                  <div className="flex items-center gap-3">
                    <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center border-2 border-primary bg-white">
                      <Icon className="h-5 w-5 text-primary" />
                    </span>
                    <span className="num text-[1.1rem] text-hairline md:hidden">{s.no}</span>
                  </div>
                  <h3 className="h4 text-ink">{s.title}</h3>
                  <p className="p-md text-body">{s.detail}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* 환경 관리 */}
      <section className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
        <Eyebrow>Environment</Eyebrow>
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <MaskHeading className="d2 text-ink" lines={[<>환경 관리</>]} />
          <p
            className="rv p-md mt-1 max-w-lg border-l-2 pl-4 text-body"
            style={{ borderLeftColor: "var(--color-primary)" }}
            data-d="160"
          >
            정식 허가 범위 안에서 법정 기준을 지키며 운영합니다.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {env.map((e, i) => (
            <li key={e.t} className="corner card rv p-7 md:p-8" data-d={i * 80}>
              <IconEnv className="mt-3 h-8 w-8 text-primary" />
              <h3 className="h4 mt-7 text-ink">{e.t}</h3>
              <p className="p-md mt-3 text-body">{e.d}</p>
            </li>
          ))}
        </ul>
      </section>

      <CtaStrip
        eyebrow="Contact"
        title="사업장 폐기물 반입 및 처리 절차가 궁금하시면 언제든 문의해 주십시오. 현장 상황에 맞는 최적의 반입·처리 솔루션을 안내해 드립니다."
        href="/contact"
        cta="온라인 문의하기"
      />

      <NextLink href="/equipment" label="Next" title="보유 시설·장비" />
    </>
  );
}
