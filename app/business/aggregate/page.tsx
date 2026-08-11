import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Eyebrow, MaskHeading, CtaStrip, NextLink } from "@/components/ui";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/JsonLd";
import { IconScreen } from "@/components/Icons";
import { aggregateProducts } from "@/lib/site";

export const metadata: Metadata = {
  title: "순환골재 생산 · 판매",
  description:
    "KS F 2573 품질기준을 충족하는 순환골재 40mm·25mm·13mm 및 순환토사를 생산·공급합니다. 로트별 품질시험 성적서 제공, 25톤 덤프 1대부터 현장 직송.",
};

const qualityTests = [
  { item: "입도", std: "KS F 2502", note: "체가름 시험으로 입도 분포를 확인합니다." },
  { item: "마모감량", std: "KS F 2508", note: "로스앤젤레스 시험기로 내마모성을 측정합니다." },
  { item: "이물질 함유량", std: "KS F 2576", note: "유기물·플라스틱 등 이물질 비율을 관리합니다." },
  { item: "밀도 및 흡수율", std: "KS F 2503", note: "골재의 밀도와 흡수율을 확인합니다." },
];

export default function AggregatePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "사업영역", href: "/business" },
          { name: "순환골재 생산·판매", href: "/business/aggregate" },
        ]}
      />
      <ServiceJsonLd
        name="순환골재 생산 및 판매"
        description="KS F 2573 기준을 충족하는 순환골재 40mm, 25mm, 13mm 및 순환토사를 생산해 도로 보조기층, 성토, 되메우기용으로 공급합니다."
        href="/business/aggregate"
      />

      <PageHero
        eyebrow="Recycled aggregate"
        title="성적서 없는 골재는 출하하지 않습니다"
        desc="생산 로트마다 입도·마모감량·이물질 함유량을 시험하고, 성적서를 함께 전달합니다. 25톤 덤프 1대 분량부터 현장 직송이 가능합니다."
        crumbs={[
          { label: "사업영역", href: "/business" },
          { label: "순환골재 생산·판매", href: "/business/aggregate" },
        ]}
      />

      {/* 제품 */}
      <section className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
        <Eyebrow>Products</Eyebrow>
        <MaskHeading className="d2 mt-6 text-ink" lines={[<>생산 품목</>]} />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {aggregateProducts.map((p, i) => (
            <li key={p.grade} className="corner card rv flex flex-col p-7" data-d={i * 70}>
              <div className="flex items-baseline justify-between pt-3">
                <span className="num text-[2.5rem] text-ink">{p.grade}</span>
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
              <MaskHeading
                className="d2 mt-6 text-ink"
                lines={[<>로트마다</>, <>시험합니다</>]}
              />
              <p className="rv p-md mt-7 max-w-md text-body" data-d="220">
                감리 검측에서 반려되는 대부분의 원인은 성적서 누락과 입도 불량입니다. 저희는 생산
                로트 단위로 시험을 진행하고, 출하 시 해당 로트의 성적서를 함께 전달합니다.
              </p>
            </div>

            <div>
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-y border-hairline">
                    <th className="cap-xs py-4 pr-4 text-mute">시험 항목</th>
                    <th className="cap-xs py-4 pr-4 text-mute">기준</th>
                    <th className="cap-xs py-4 text-mute">내용</th>
                  </tr>
                </thead>
                <tbody>
                  {qualityTests.map((q) => (
                    <tr key={q.item} className="border-b border-hairline">
                      <td className="py-5 pr-4 align-top text-[15px] font-bold text-ink">
                        {q.item}
                      </td>
                      <td className="py-5 pr-4 align-top text-[14px] whitespace-nowrap accent">
                        {q.std}
                      </td>
                      <td className="p-sm py-5 align-top text-body">{q.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="p-sm mt-5 text-mute">
                ※ 적용 시험 규격은 실제 품질관리 기준에 맞춰 확인이 필요합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 용도 */}
      <section className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
        <Eyebrow>Applications</Eyebrow>
        <MaskHeading className="d2 mt-6 text-ink" lines={[<>이런 곳에 씁니다</>]} />

        <ul className="mt-12 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: "도로 보조기층 · 하부기층", d: "40mm 순환골재를 다짐 시공용으로 공급합니다." },
            { t: "성토 · 복토", d: "25mm 순환골재와 순환토사를 대량 공급합니다." },
            { t: "되메우기 · 뒤채움", d: "구조물 배면 뒤채움재로 사용합니다." },
            { t: "관 기초 · 모래 대체", d: "13mm 골재로 상하수도관 기초를 시공합니다." },
            { t: "주차장 · 야적장 포장", d: "다짐 후 표층 시공 전 기층재로 사용합니다." },
            { t: "임시도로 · 가설도로", d: "현장 진입로 조성에 즉시 투입 가능합니다." },
          ].map((u, i) => (
            <li key={u.t} className="rv bg-white p-7" data-d={i * 60}>
              <div className="flex items-start gap-3">
                <span className="mt-2 block h-2.5 w-2.5 shrink-0 bg-primary" />
                <div>
                  <h3 className="h4 text-ink">{u.t}</h3>
                  <p className="p-sm mt-2.5 text-body">{u.d}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <CtaStrip
        eyebrow="Order"
        title="필요한 입도와 물량, 현장 주소를 알려주시면 단가와 배송 일정을 회신드립니다."
        href="/contact"
        cta="골재 구매 문의"
      />

      <NextLink href="/business/transport" label="Next" title="폐기물 수집·운반" />
    </>
  );
}
