import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Eyebrow, MaskHeading, CtaStrip, NextLink } from "@/components/ui";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/JsonLd";
import { IconDoc } from "@/components/Icons";
import { wasteTypes, processSteps } from "@/lib/site";

export const metadata: Metadata = {
  title: "건설폐기물 중간처리",
  description:
    "폐콘크리트·폐아스콘·혼합건설폐기물 등 건설폐기물을 반입 검수부터 파쇄·선별, 이물질 제거까지 일괄 처리합니다. 일일 1,200톤 처리 능력.",
};

const documents = [
  { name: "계량증명서", when: "반입 즉시", desc: "차량별 총중량·공차중량·순중량을 기록해 발행합니다." },
  { name: "폐기물 인계서", when: "반입 당일", desc: "올바로시스템에 인계·인수 내역을 등록합니다." },
  { name: "처리확인서", when: "처리 완료 후", desc: "발주처·감독기관 제출용으로 사용하실 수 있습니다." },
  { name: "정산 명세서", when: "월 마감 시", desc: "현장별·품목별 반입 내역을 정리해 발송합니다." },
];

export default function WastePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "사업영역", href: "/business" },
          { name: "건설폐기물 중간처리", href: "/business/waste" },
        ]}
      />
      <ServiceJsonLd
        name="건설폐기물 중간처리"
        description="폐콘크리트, 폐아스팔트콘크리트, 혼합건설폐기물 등을 반입 검수부터 파쇄·선별까지 일괄 처리하는 건설폐기물 중간처리 서비스."
        href="/business/waste"
      />

      <PageHero
        eyebrow="Waste treatment"
        title="건설폐기물 중간처리"
        desc="반입 검수부터 파쇄·선별, 이물질 제거까지 자체 시설에서 처리합니다. 일일 처리 능력 1,200톤 규모의 라인을 상시 가동합니다."
        crumbs={[
          { label: "사업영역", href: "/business" },
          { label: "건설폐기물 중간처리", href: "/business/waste" },
        ]}
      />

      {/* 개요 */}
      <section className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <Eyebrow>Overview</Eyebrow>
            <MaskHeading
              className="d2 mt-6 text-ink"
              lines={[<>대기 없이 받고,</>, <>기록으로 돌려드립니다</>]}
            />
          </div>
          <div>
            <p className="p-lg text-body">
              건설폐기물 처리에서 현장이 겪는 문제는 대개 두 가지입니다. 차가 도착했는데 반입이
              밀리는 것, 그리고 정산 시점에 서류가 없는 것입니다.
            </p>
            <p className="p-lg mt-5 text-body">
              <strong className="font-bold text-ink">
                저희는 일일 1,200톤 라인을 상시 가동해 대기 시간을 없앴고, 계량증명서부터
                처리확인서까지 요청 전에 준비합니다.
              </strong>{" "}
              반입된 물량은 성상별로 분리되어 파쇄·선별 라인을 거치고, 회수된 골재는 품질시험 후
              순환골재로 출하됩니다.
            </p>
          </div>
        </div>

        <ul className="mt-14 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {wasteTypes.map((w, i) => (
            <li key={w} className="rv flex items-center gap-3 bg-white px-6 py-5" data-d={i * 45}>
              <span className="block h-2.5 w-2.5 shrink-0 bg-primary" />
              <span className="text-[15.5px] font-bold text-ink">{w}</span>
            </li>
          ))}
        </ul>
        <p className="p-sm mt-5 text-mute">
          ※ 석면 함유 폐기물, 지정폐기물은 취급하지 않습니다.
        </p>
      </section>

      {/* 처리 절차 */}
      <section className="soft-ch border-y border-hairline">
        <div className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
          <Eyebrow>Steps</Eyebrow>
          <MaskHeading className="d2 mt-6 text-ink" lines={[<>처리 절차</>]} />

          <ol className="mt-12 border-t border-hairline">
            {processSteps.map((s, i) => (
              <li
                key={s.no}
                className="rv grid gap-3 border-b border-hairline py-7 md:grid-cols-[5rem_16rem_1fr] md:gap-8"
                data-d={i * 60}
              >
                <span className="num text-[1.75rem] text-hairline">{s.no}</span>
                <h3 className="h4 pt-1 text-ink">{s.title}</h3>
                <p className="p-md text-body">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 발급 서류 */}
      <section className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Documents</Eyebrow>
            <MaskHeading className="d2 mt-6 text-ink" lines={[<>발급 서류</>]} />
          </div>
          <p className="rv p-md max-w-md text-body" data-d="160">
            배출자께서 따로 챙기실 서류는 없습니다. 발급 시점에 맞춰 담당자가 먼저 발송합니다.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {documents.map((d, i) => (
            <li key={d.name} className="corner card rv p-7" data-d={i * 70}>
              <div className="flex items-start justify-between pt-3">
                <IconDoc className="h-7 w-7 text-primary" />
                <span className="badge">{d.when}</span>
              </div>
              <h3 className="h4 mt-7 text-ink">{d.name}</h3>
              <p className="p-sm mt-3 text-body">{d.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <CtaStrip
        eyebrow="Contact"
        title="품목과 예상 물량을 알려주시면 반입 단가와 배차 일정을 회신드립니다."
        href="/contact"
        cta="반입 문의"
      />

      <NextLink href="/business/aggregate" label="Next" title="순환골재 생산·판매" />
    </>
  );
}
