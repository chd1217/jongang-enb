import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import HorizontalProcess from "@/components/HorizontalProcess";
import { Eyebrow, MaskHeading, CtaStrip, NextLink } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { IconEnv } from "@/components/Icons";
import { processSteps } from "@/lib/site";

export const metadata: Metadata = {
  title: "처리 공정",
  description:
    "반입·계량부터 선별, 1차·2차 파쇄, 입도 분리, 품질시험·출하까지 중앙이앤비의 건설폐기물 6단계 처리 공정을 안내합니다.",
};

const env = [
  {
    t: "비산먼지 저감",
    d: "고정식·이동식 살수 설비를 상시 가동하고, 하절기에는 살수 주기를 단축합니다. 야적장 둘레에는 방진벽을 설치했습니다.",
  },
  {
    t: "세륜 · 세척",
    d: "출차 전 모든 차량이 세륜시설을 통과합니다. 도로 오염과 인근 민원을 사전에 차단합니다.",
  },
  {
    t: "소음 관리",
    d: "파쇄 설비 주변에 방음벽을 설치하고, 작업 시간을 법정 기준 내로 운영합니다.",
  },
  {
    t: "이물질 분리 처리",
    d: "선별된 폐목재·폐합성수지 등은 성상별로 분리해 적법한 최종 처리 경로로 위탁합니다.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "처리 공정", href: "/process" }]} />

      <PageHero
        eyebrow="Process"
        title="6단계 일괄 처리 라인"
        desc="계량 · 선별 · 1차 파쇄 · 2차 파쇄 · 입도 분리 · 품질시험. 모든 단계의 기록이 처리확인서로 남습니다."
        crumbs={[{ label: "처리 공정", href: "/process" }]}
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

      {/* 환경 관리 */}
      <section className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Environment</Eyebrow>
            <MaskHeading className="d2 mt-6 text-ink" lines={[<>환경 관리</>]} />
          </div>
          <p className="rv p-md max-w-md text-body" data-d="160">
            2021년 환경부 녹색기업으로 지정되었으며, 법정 기준을 초과한 사례가 없습니다.
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
        eyebrow="Visit"
        title="공정을 직접 보고 싶으시면 방문 일정을 잡아 드립니다."
        href="/contact"
        cta="시설 견학 문의"
      />

      <NextLink href="/equipment" label="Next" title="보유 시설·장비" />
    </>
  );
}
