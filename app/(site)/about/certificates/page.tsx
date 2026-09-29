import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { Eyebrow, MaskHeading, CtaStrip, NextLink } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { certificates } from "@/lib/site";

export const metadata: Metadata = {
  title: "인증 · 허가",
  description: "폐기물 수집·운반업 허가, 폐기물 중간재활용업 허가 등 중앙이엔비의 인증·허가 현황입니다.",
};

export default function CertificatesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "회사소개", href: "/about" },
          { name: "인증·허가", href: "/about/certificates" },
        ]}
      />

      <PageHero
        eyebrow="Certificates"
        title="허가와 인증은 상시 유효합니다"
        desc="배출자의 법적 책임은 처리업체의 허가 상태에 따라 달라집니다. 저희는 허가·인증을 상시 유효하게 유지하고, 요청 시 사본을 즉시 제공합니다."
        crumbs={[
          { label: "회사소개", href: "/about" },
          { label: "인증·허가", href: "/about/certificates" },
        ]}
        bgImage="/about/documents-detail.jpg"
      />

      <section className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
        <Eyebrow>Licenses</Eyebrow>
        <MaskHeading className="d2 mt-6 text-ink" lines={[<>보유 허가 및 인증</>]} />

        <ul className="mt-12 grid gap-5 sm:grid-cols-[repeat(2,minmax(0,280px))]">
          {certificates.map((c, i) => (
            <li key={c.name} className="corner card rv flex max-w-[280px] flex-col p-4" data-d={i * 60}>
              <Image
                src={i === 0 ? "/permits/transport.png" : "/permits/recycling.png"}
                alt={`${c.name} 공개용 사본 — 시설·장비 및 일부 인력 정보 비공개`}
                width={i === 0 ? 636 : 610}
                height={i === 0 ? 891 : 854}
                className="h-auto w-full object-contain"
                sizes="(max-width: 320px) 80vw, 248px"
              />
              <h3 className="h4 mt-6 text-ink">{c.name}</h3>
            </li>
          ))}
        </ul>

        <div className="mt-12 border-t border-hairline pt-8">
          <p className="p-sm max-w-3xl text-mute">
            ※ 허가증 사본이 필요하신 경우 담당자에게 요청해 주시면 이메일로 발송해 드립니다.
          </p>
          <p className="p-sm mt-2 max-w-3xl text-mute">
            ※ 게시된 허가증은 홈페이지 공개용 사본으로, 시설·장비 및 일부 인력 정보를 비공개 처리하였습니다.
          </p>
        </div>
      </section>

      <CtaStrip
        eyebrow="Documents"
        title="허가증·인증서 사본이 필요하시면 요청해 주십시오. 당일 발송해 드립니다."
        href="/contact"
        cta="서류 요청하기"
      />

      <NextLink href="/about/location" label="Next" title="오시는 길" />
    </>
  );
}
