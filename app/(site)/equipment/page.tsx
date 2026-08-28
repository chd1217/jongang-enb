import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Eyebrow, MaskHeading, CtaStrip, NextLink } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { IconCrusher, IconScreen, IconScale, IconTruck } from "@/components/Icons";
import { equipment } from "@/lib/site";

export const metadata: Metadata = {
  title: "보유 시설 · 장비",
  description: "대형 산업용 파쇄기, 정밀 선별 설비, 트럭 계근대 등 중앙이엔비의 처리 라인을 구성하는 핵심 설비를 소개합니다.",
};

const ROLE_ICONS: Record<string, typeof IconCrusher> = {
  "1차·2차 파쇄": IconCrusher,
  "품질 검수": IconScreen,
  "반입·출하 계량": IconScale,
  "수집·운반": IconTruck,
};

export default function EquipmentPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "보유 시설·장비", href: "/equipment" }]} />

      <PageHero
        eyebrow="Facility"
        title="안정적 처리를 뒷받침하는 자체 설비"
        desc="대형 산업용 파쇄기와 정밀 선별 설비를 운영합니다. 반입부터 출하까지 자체 시설에서 처리합니다."
        crumbs={[{ label: "보유 시설·장비", href: "/equipment" }]}
        bgImage="/about/hero-equipment.jpg"
      />

      {/* 장비 목록 */}
      <section className="soft-ch border-y border-hairline">
        <div className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
          <Eyebrow>Core equipment</Eyebrow>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <MaskHeading className="d2 text-ink" lines={[<>핵심 처리 설비</>]} />
            <p
              className="rv p-md mt-1 max-w-lg border-l-2 pl-4 text-body"
              style={{ borderLeftColor: "var(--color-primary)" }}
              data-d="140"
            >
              계근 · 선별 · 파쇄 · 검수 · 출하로 이어지는 처리 라인을 구성하는 핵심 설비입니다.
            </p>
          </div>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {equipment.map((e, i) => {
              const Icon = ROLE_ICONS[e.role] ?? IconCrusher;
              return (
                <li key={e.name} className="corner card rv flex flex-col p-7" data-d={i * 70}>
                  <div className="flex items-start justify-between pt-3">
                    <Icon className="h-8 w-8 text-primary" />
                    <span className="badge">{e.role}</span>
                  </div>
                  <h3 className="h4 mt-7 text-ink">{e.name}</h3>
                  <p className="p-sm mt-3 flex-1 text-body">{e.desc}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CtaStrip
        eyebrow="Capacity"
        title="현장 물량과 반입 주기에 맞춘 최적의 파쇄·처리 프로세스를 제공합니다."
        href="/contact"
        cta="맞춤 견적 신청하기"
      />

      <NextLink href="/news" label="Next" title="회사소식 보기" />
    </>
  );
}
