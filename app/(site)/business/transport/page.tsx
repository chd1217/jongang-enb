import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Eyebrow, MaskHeading, CtaStrip, NextLink } from "@/components/ui";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/JsonLd";
import { IconTruck } from "@/components/Icons";
import { serviceAreas, serviceHub, serviceNationwide } from "@/lib/site";

export const metadata: Metadata = {
  title: "폐기물 수집 · 운반",
  description:
    "폐기물 수집·운반업 정식 허가를 보유하고, 협력 공장 정기 노선 운행과 협력 운송사 연계를 함께 운영합니다. 전용 계근대 정량 측정, 올바로시스템 인계서 처리 포함.",
};

const modes = [
  { t: "직접 반입", d: "소형 배출업체는 계근대로 직접 방문해 반입하실 수 있습니다." },
  { t: "정기 노선 수거", d: "협력 공장을 대상으로 자체 차량이 정해진 노선을 정기 운행합니다." },
  { t: "협력 운송 연계", d: "반출·출하 물량은 협력 운송사와 연계해 처리합니다." },
];

const flow = [
  { no: "01", t: "문의 접수", d: "현장 주소·품목·물량을 전화 또는 온라인으로 접수합니다." },
  { no: "02", t: "반입 방식 확인", d: "직접 반입이 가능한지, 수거가 필요한지 확인 후 저희 차량 또는 협력 운송사로 조율합니다." },
  { no: "03", t: "계근 · 검수", d: "반입 시 전용 계근대에서 정량 측정과 검수를 진행합니다." },
  { no: "04", t: "인계서 처리", d: "올바로시스템에 인계·인수 내역을 등록하고 서류를 발송합니다." },
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
        description="폐기물 수집·운반업 허가를 보유하고, 협력 공장 정기 노선 운행과 협력 운송사 연계를 통해 폐기물을 적법하게 수집·운반하는 서비스."
        href="/business/transport"
      />

      <PageHero
        eyebrow="Collection & transport"
        title="현장 상황에 맞는 수집·운반"
        desc="폐기물 수집·운반업 정식 허가로 협력 공장 정기 노선을 직접 운행합니다. 반입은 직접 방문과 협력 운송사 연계를 함께 활용해 유연하게 대응합니다."
        crumbs={[
          { label: "사업영역", href: "/business" },
          { label: "폐기물 수집·운반", href: "/business/transport" },
        ]}
      />

      {/* 운영 방식 */}
      <section className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>How we operate</Eyebrow>
            <MaskHeading className="d2 mt-6 text-ink" lines={[<>운영 방식</>]} />
          </div>
          <p className="rv p-md max-w-md text-body" data-d="160">
            자체 차량과 협력 운송 네트워크를 함께 운영합니다. 어떤 경로든 반입부터 출하까지 이력은
            저희가 관리합니다.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-3">
          {modes.map((m, i) => (
            <li key={m.t} className="corner card rv p-7" data-d={i * 70}>
              <IconTruck className="mt-3 h-8 w-8 text-primary" />
              <h3 className="h4 mt-7 text-ink">{m.t}</h3>
              <p className="p-sm mt-4 border-t border-hairline pt-4 text-body">{m.d}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 진행 절차 */}
      <section className="soft-ch border-y border-hairline">
        <div className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
          <Eyebrow>Flow</Eyebrow>
          <MaskHeading className="d2 mt-6 text-ink" lines={[<>진행 절차</>]} />

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
        <MaskHeading className="d2 mt-6 text-ink" lines={[<>서비스 지역</>]} />
        <p className="rv p-md mt-6 max-w-2xl text-body" data-d="160">
          충청남도 공주시를 거점으로 폭넓은 권역에서 반입·수거 상담이 가능합니다. 지역에
          관계없이 우선 문의해 주세요.
        </p>

        <p className="rv mt-8 inline-block rounded-xs border-2 border-primary px-4 py-2.5 text-[14px] font-bold text-ink" data-d="200">
          {serviceHub}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {serviceAreas.slice(0, -1).map((a) => (
            <li
              key={a}
              className="rounded-xs border border-hairline px-4 py-2.5 text-[14px] font-bold text-ink"
            >
              {a}
            </li>
          ))}
        </ul>

        <p className="mt-4 inline-block rounded-xs bg-primary px-4 py-2.5 text-[14px] font-bold text-black">
          {serviceNationwide}
        </p>
      </section>

      <CtaStrip
        eyebrow="Contact"
        title="반입 및 처리 절차가 궁금하시면 언제든 문의해 주십시오. 현장 상황에 맞는 최적의 반입·처리 솔루션을 안내해 드립니다."
        href="/contact"
        cta="수거 문의"
      />

      <NextLink href="/process" label="Next" title="처리 공정 보기" />
    </>
  );
}
