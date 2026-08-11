import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Eyebrow, MaskHeading, CtaStrip, NextLink, Arrow } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { IconCrusher, IconAggregate, IconTruck } from "@/components/Icons";
import { services, wasteTypes, industries } from "@/lib/site";

export const metadata: Metadata = {
  title: "사업영역",
  description:
    "건설폐기물 중간처리, 순환골재 생산·판매, 폐기물 수집·운반. 계약 하나로 반입부터 출하까지 처리합니다.",
};

const ICONS = [IconCrusher, IconAggregate, IconTruck];

export default function BusinessPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "사업영역", href: "/business" }]} />

      <PageHero
        eyebrow="Business"
        title="현장에 필요한 전부를, 한 회사에서"
        desc="배차업체 따로, 처리업체 따로 부를 필요가 없습니다. 수집·운반부터 중간처리, 순환골재 공급까지 하나의 계약으로 처리합니다."
        crumbs={[{ label: "사업영역", href: "/business" }]}
      />

      <section className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
        <ul className="grid gap-5 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = ICONS[i] ?? IconCrusher;
            return (
              <li key={s.slug} className="rv" data-d={i * 90}>
                <Link href={s.href} className="corner card group flex h-full flex-col p-7 md:p-9">
                  <div className="flex items-start justify-between pt-3">
                    <Icon className="h-9 w-9 text-primary" />
                    <span className="cap-xs text-mute">{s.no}</span>
                  </div>
                  <h2 className="d3 mt-8 text-ink">{s.title}</h2>
                  <p className="p-md mt-4 flex-1 text-body">{s.summary}</p>
                  <ul className="mt-6 space-y-2 border-t border-hairline pt-5">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-[14px] text-body">
                        <span className="mt-[7px] block h-1.5 w-1.5 shrink-0 bg-primary" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <span className="btn-ghost mt-7">
                    자세히 보기
                    <Arrow />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* 처리 가능 품목 */}
      <section className="soft-ch border-y border-hairline">
        <div className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Accepted waste</Eyebrow>
              <MaskHeading className="d2 mt-6 text-ink" lines={[<>처리 가능 품목</>]} />
            </div>
            <p className="rv p-md max-w-md text-body" data-d="160">
              석면 함유 폐기물과 지정폐기물은 취급하지 않습니다. 해당 품목은 문의 주시면 처리
              가능한 전문업체를 안내해 드립니다.
            </p>
          </div>

          <ul className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {wasteTypes.map((w, i) => (
              <li key={w} className="rv flex items-center gap-3 bg-white px-6 py-5" data-d={i * 45}>
                <span className="block h-2.5 w-2.5 shrink-0 bg-primary" />
                <span className="text-[15.5px] font-bold text-ink">{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 고객 유형 */}
      <section className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
        <Eyebrow>Industries</Eyebrow>
        <MaskHeading className="d2 mt-6 text-ink" lines={[<>이런 현장에서 찾습니다</>]} />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <li key={ind.name} className="corner card rv p-7" data-d={i * 70}>
              <h3 className="h4 mt-4 text-ink">{ind.name}</h3>
              <p className="p-md mt-3 text-body">{ind.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <CtaStrip
        eyebrow="Contact"
        title="현장 주소와 품목, 예상 물량만 알려주시면 24시간 내 회신드립니다."
        href="/contact"
        cta="견적 문의하기"
      />

      <NextLink href="/business/waste" label="Next" title="건설폐기물 중간처리" />
    </>
  );
}
