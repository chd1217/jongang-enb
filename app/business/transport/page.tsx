import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Eyebrow, MaskHeading, CtaStrip, NextLink } from "@/components/ui";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/JsonLd";
import { IconTruck } from "@/components/Icons";
import { serviceAreas } from "@/lib/site";

export const metadata: Metadata = {
  title: "폐기물 수집 · 운반",
  description:
    "암롤·덤프 차량을 직접 운영해 배출 현장에서 처리시설까지 적법하게 수집·운반합니다. 수도권 평균 4시간 내 배차, 올바로시스템 인계서 처리 포함.",
};

const fleet = [
  { name: "암롤 트럭 8톤", spec: "암롤박스 5·8㎥", use: "소량 다빈도 현장, 인테리어 철거" },
  { name: "암롤 트럭 15톤", spec: "암롤박스 12·15㎥", use: "일반 해체 현장" },
  { name: "덤프 트럭 15톤", spec: "적재 약 9㎥", use: "폐토석·순환토사 운반" },
  { name: "덤프 트럭 25톤", spec: "적재 약 15㎥", use: "대량 반입 및 골재 출하" },
];

const flow = [
  { no: "01", t: "배차 요청", d: "현장 주소·품목·물량·희망일을 전화 또는 온라인으로 접수합니다." },
  { no: "02", t: "일정 확정", d: "차종과 도착 시간을 확정해 담당자에게 회신합니다." },
  { no: "03", t: "현장 상차", d: "암롤박스 교체 또는 직접 상차 후 계량 대상 물량을 확인합니다." },
  { no: "04", t: "운반 · 반입", d: "처리시설로 운반해 계량대에서 검수·계량을 진행합니다." },
  { no: "05", t: "인계서 처리", d: "올바로시스템에 인계·인수 내역을 등록하고 서류를 발송합니다." },
];

export default function TransportPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "사업영역", href: "/business" },
          { name: "폐기물 수집·운반", href: "/business/transport" },
        ]}
      />
      <ServiceJsonLd
        name="폐기물 수집 및 운반"
        description="암롤·덤프 차량을 직접 운영해 배출 현장에서 처리시설까지 건설폐기물을 적법하게 수집·운반하는 서비스."
        href="/business/transport"
      />

      <PageHero
        eyebrow="Collection & transport"
        title="차가 없어서 공사가 멈추는 일은 없습니다"
        desc="암롤과 덤프를 직접 운영합니다. 수도권 기준 배차 요청 후 평균 4시간 이내 현장 도착, 긴급 철거나 일정 변경에도 당일 대응합니다."
        crumbs={[
          { label: "사업영역", href: "/business" },
          { label: "폐기물 수집·운반", href: "/business/transport" },
        ]}
      />

      {/* 보유 차량 */}
      <section className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Fleet</Eyebrow>
            <MaskHeading className="d2 mt-6 text-ink" lines={[<>보유 차량</>]} />
          </div>
          <p className="rv p-md max-w-md text-body" data-d="160">
            외주 배차에 의존하지 않습니다. 자사 차량을 운영하기 때문에 일정 변경에 바로 대응할 수
            있습니다.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {fleet.map((f, i) => (
            <li key={f.name} className="corner card rv p-7" data-d={i * 70}>
              <IconTruck className="mt-3 h-8 w-8 text-primary" />
              <h3 className="h4 mt-7 text-ink">{f.name}</h3>
              <p className="p-sm mt-2 accent">{f.spec}</p>
              <p className="p-sm mt-4 border-t border-hairline pt-4 text-body">{f.use}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 배차 프로세스 */}
      <section className="soft-ch border-y border-hairline">
        <div className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
          <Eyebrow>Flow</Eyebrow>
          <MaskHeading className="d2 mt-6 text-ink" lines={[<>배차 절차</>]} />

          <ol className="mt-12 border-t border-hairline">
            {flow.map((f, i) => (
              <li
                key={f.no}
                className="rv grid gap-3 border-b border-hairline py-7 md:grid-cols-[5rem_14rem_1fr] md:gap-8"
                data-d={i * 70}
              >
                <span className="num text-[1.75rem] text-hairline">{f.no}</span>
                <h3 className="h4 pt-1 text-ink">{f.t}</h3>
                <p className="p-md text-body">{f.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 지역 */}
      <section className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
        <Eyebrow>Service area</Eyebrow>
        <MaskHeading className="d2 mt-6 text-ink" lines={[<>배차 가능 지역</>]} />
        <p className="rv p-md mt-6 max-w-2xl text-body" data-d="160">
          경기 남부와 서울 전역을 주 권역으로 하며, 충남 북부까지 배차합니다. 그 외 지역도 물량
          규모에 따라 협의 가능합니다.
        </p>

        <ul className="mt-10 flex flex-wrap gap-2">
          {serviceAreas.map((a) => (
            <li
              key={a}
              className="rounded-xs border border-hairline px-4 py-2.5 text-[14px] font-bold text-ink"
            >
              {a}
            </li>
          ))}
        </ul>
      </section>

      <CtaStrip
        eyebrow="Dispatch"
        title="오늘 상차가 필요하시면 전화 주세요. 가능한 차량부터 확인해 드립니다."
        href="/contact"
        cta="배차 요청"
      />

      <NextLink href="/process" label="Next" title="처리 공정 보기" />
    </>
  );
}
