import { company, faqs, services, serviceAreas, definition } from "@/lib/site";

const SITE = "https://jungangenb.co.kr";

function Ld({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** 조직 · 지역 사업장 · 사이트 검색 — 전 페이지 공통 */
export function OrganizationJsonLd() {
  return (
    <>
      <Ld
        data={{
          "@context": "https://schema.org",
          "@type": ["Organization", "LocalBusiness"],
          "@id": `${SITE}/#organization`,
          name: company.nameKoFull,
          alternateName: [company.nameKo, company.nameEn, company.nameEnTitle],
          legalName: company.nameEnTitle,
          logo: `${SITE}/logo-square.png`,
          image: `${SITE}/logo-square.png`,
          description: definition,
          url: SITE,
          telephone: company.tel,
          faxNumber: company.fax,
          email: company.email,
          foundingDate: company.founded,
          address: {
            "@type": "PostalAddress",
            streetAddress: company.address,
            addressCountry: "KR",
          },
          areaServed: serviceAreas.map((a) => ({ "@type": "Place", name: a })),
          openingHours: ["Mo-Fr 08:00-18:00", "Sa 08:00-13:00"],
          knowsAbout: [
            "폐기물 수집·운반",
            "폐기물 중간재활용",
            "폐합성수지류 파쇄·선별",
            "맞춤형 파쇄품 생산",
          ],
          makesOffer: services.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.title,
              description: s.summary,
              url: `${SITE}${s.href}`,
            },
          })),
        }}
      />
      <Ld
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${SITE}/#website`,
          url: SITE,
          name: company.nameKo,
          inLanguage: "ko-KR",
          publisher: { "@id": `${SITE}/#organization` },
        }}
      />
    </>
  );
}

/** FAQPage — 답변 엔진/AI 요약 대응 */
export function FaqJsonLd() {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }}
    />
  );
}

/** 서브페이지 브레드크럼 */
export function BreadcrumbJsonLd({ items }: { items: { name: string; href: string }[] }) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [{ name: "홈", href: "/" }, ...items].map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          item: `${SITE}${it.href}`,
        })),
      }}
    />
  );
}

/** 개별 서비스 페이지 */
export function ServiceJsonLd({
  name,
  description,
  href,
}: {
  name: string;
  description: string;
  href: string;
}) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        serviceType: name,
        url: `${SITE}${href}`,
        provider: { "@id": `${SITE}/#organization` },
        areaServed: serviceAreas.map((a) => ({ "@type": "Place", name: a })),
      }}
    />
  );
}
