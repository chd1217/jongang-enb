import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Eyebrow, MaskHeading, NextLink } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { history } from "@/lib/site";

export const metadata: Metadata = {
  title: "연혁",
  description:
    "2004년 건설폐기물 중간처리업 허가 취득부터 순환골재 품질인증, ISO 인증, 녹색기업 지정까지 중앙이앤비의 발자취입니다.",
};

export default function HistoryPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "회사소개", href: "/about" },
          { name: "연혁", href: "/about/history" },
        ]}
      />

      <PageHero
        eyebrow="History"
        title="설비를 늘린 21년"
        desc="파쇄 라인 하나로 시작해 일일 1,200톤 처리 능력과 품질 인증 체계를 갖추기까지의 기록입니다."
        crumbs={[
          { label: "회사소개", href: "/about" },
          { label: "연혁", href: "/about/history" },
        ]}
      />

      <section className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
        {history.map((era, ei) => (
          <div
            key={era.era}
            className="grid gap-8 border-t border-hairline py-12 first:border-t-0 first:pt-0 lg:grid-cols-[20rem_1fr] lg:gap-16"
          >
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Eyebrow>{era.era}</Eyebrow>
              <MaskHeading className="d3 mt-5 text-ink" lines={[<>{era.title}</>]} />
            </div>

            <ul>
              {era.items.map((item, i) => (
                <li
                  key={item.year + item.text}
                  className="rv grid gap-2 border-b border-hairline py-6 md:grid-cols-[7rem_1fr] md:gap-8"
                  data-d={i * 70}
                >
                  <span className="num text-[1.5rem] accent">{item.year}</span>
                  <p className="p-lg pt-0.5 text-body">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p className="p-sm mt-10 text-mute">
          ※ 연혁의 세부 연도와 내용은 실제 이력으로 교체가 필요합니다.
        </p>
      </section>

      <NextLink href="/about/certificates" label="Next" title="인증·허가 현황" />
    </>
  );
}
