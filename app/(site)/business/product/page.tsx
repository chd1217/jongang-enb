import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Eyebrow, MaskHeading, CtaStrip, NextLink } from "@/components/ui";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/JsonLd";
import { IconScreen } from "@/components/Icons";
import { offtakes } from "@/lib/site";

export const metadata: Metadata = {
  title: "맞춤형 파쇄품 생산 · 공급",
  description:
    "수요처 규격에 맞춘 고품질 파쇄품을 생산해 시멘트 소성로 대체연료, 종합재활용업체 원료 등으로 공급합니다. 반입 1차 선별, 파쇄 후 2차 정밀 불순물 검출.",
};

const qcSteps = [
  { no: "01", title: "반입 1차 선별", note: "중장비와 육안 정밀 선별로 금속·비가연물·불순물을 사전 배제합니다." },
  { no: "02", title: "고효율 파·분쇄", note: "현장 물량과 규격에 맞춘 최적의 파·분쇄 프로세스로 1차·2차 공정을 진행합니다." },
  { no: "03", title: "2차 정밀 검수", note: "파쇄물을 대상으로 불순물을 재검출해 품질을 안정화합니다." },
  { no: "04", title: "정량 상차 · 출하", note: "수요처별 맞춤 스펙으로 정량 상차해 출하합니다." },
];

export default function ProductPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "사업영역", href: "/business" },
          { name: "맞춤형 파쇄품 생산·공급", href: "/business/product" },
        ]}
      />
      <ServiceJsonLd
        name="맞춤형 파쇄품 생산 및 공급"
        description="수요처 규격에 맞춘 고품질 파쇄품을 생산해 시멘트 소성로 대체연료, 종합재활용업체 원료, 소각 열에너지 회수시설 등으로 공급합니다."
        href="/business/product"
      />

      <PageHero
        eyebrow="Shredded material"
        title="규격 없는 파쇄품은 출하하지 않습니다"
        desc="반입 시 1차 선별, 파·분쇄 후 2차 정밀 불순물 검출을 거칩니다. 원료 재활용 및 규격화를 위한 파·분쇄 솔루션으로 파쇄품을 생산·공급합니다."
        crumbs={[
          { label: "사업영역", href: "/business" },
          { label: "맞춤형 파쇄품 생산·공급", href: "/business/product" },
        ]}
      />

      {/* 수요처 */}
      <section className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
        <Eyebrow>Offtakes</Eyebrow>
        <MaskHeading className="d2 mt-6 text-ink" lines={[<>공급처</>]} />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {offtakes.map((p, i) => (
            <li key={p.grade} className="corner card rv flex flex-col p-7" data-d={i * 70}>
              <div className="flex items-baseline justify-between pt-3">
                <span className="num text-[1.5rem] text-ink">{p.grade}</span>
                <IconScreen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="h4 mt-6 text-ink">{p.name}</h3>
              <p className="p-sm mt-2 flex-1 text-mute">{p.use}</p>
              <p className="p-sm mt-5 border-t border-hairline pt-4 text-body">{p.spec}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 품질 관리 */}
      <section className="soft-ch border-y border-hairline">
        <div className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
            <div>
              <Eyebrow>Quality</Eyebrow>
              <MaskHeading className="d2 mt-6 text-ink" lines={[<>2단계로</>, <>검수합니다</>]} />
              <p className="rv p-md mt-7 max-w-md text-body" data-d="220">
                반입 시 1차 선별로 큰 이물질을 걸러내고, 파쇄 이후 2차 정밀 검수로 불순물을 다시
                한번 제거합니다. 수요처가 요구하는 스펙에서 벗어난 파쇄품은 출하하지 않습니다.
              </p>
            </div>

            <ol className="border-t border-hairline">
              {qcSteps.map((q, i) => (
                <li
                  key={q.no}
                  className="rv grid gap-2 border-b border-hairline py-6 md:grid-cols-[4rem_10rem_1fr] md:gap-6"
                  data-d={i * 70}
                >
                  <span className="num text-[1.5rem] text-hairline">{q.no}</span>
                  <h3 className="h4 pt-1 text-ink">{q.title}</h3>
                  <p className="p-sm text-body">{q.note}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <CtaStrip
        eyebrow="Order"
        title="필요한 규격과 물량을 알려주시면 공급 단가와 일정을 회신드립니다."
        href="/contact"
        cta="공급 문의"
      />

      <NextLink href="/business/transport" label="Next" title="폐기물 수집·운반" />
    </>
  );
}
