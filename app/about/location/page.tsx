import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Eyebrow, MaskHeading, CtaStrip, NextLink, Arrow } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { company, directions, serviceAreas } from "@/lib/site";

export const metadata: Metadata = {
  title: "오시는 길",
  description: `중앙이엔비 오시는 길 안내. ${company.address}. 덤프·암롤 차량 진출입이 가능하며, 정문 계근대에서 반입 검수를 진행합니다.`,
};

export default function LocationPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "회사소개", href: "/about" },
          { name: "오시는 길", href: "/about/location" },
        ]}
      />

      <PageHero
        eyebrow="Location"
        title="오시는 길"
        desc="대형 차량 진출입이 가능한 부지입니다. 정문 진입 후 계량대에서 검수를 거쳐 야적장으로 안내됩니다."
        crumbs={[
          { label: "회사소개", href: "/about" },
          { label: "오시는 길", href: "/about/location" },
        ]}
      />

      <section className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
        {/* 지도 자리 */}
        <div className="rv relative flex aspect-[16/8] w-full items-center justify-center border border-hairline bg-soft">
          <div className="text-center">
            <span className="mx-auto block h-3 w-3 bg-primary" />
            <p className="h4 mt-5 text-ink">{company.nameKoFull}</p>
            <p className="p-md mt-2 text-body">{company.address}</p>
            <p className="cap-xs mt-6 text-mute">
              ※ 이 영역에 카카오맵 / 네이버지도 임베드를 삽입하세요
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <Eyebrow>Address</Eyebrow>
            <dl className="mt-8 border-t border-hairline">
              {[
                { k: "주소", v: company.address },
                { k: "대표전화", v: company.tel },
                { k: "팩스", v: company.fax },
                { k: "이메일", v: company.email },
                { k: "운영시간", v: company.hours },
              ].map((r) => (
                <div key={r.k} className="grid gap-1 border-b border-hairline py-4 md:grid-cols-[7rem_1fr]">
                  <dt className="cap-xs pt-1 text-mute">{r.k}</dt>
                  <dd className="text-[15.5px] text-body">{r.v}</dd>
                </div>
              ))}
            </dl>

            <a
              href={`tel:${company.tel.replace(/-/g, "")}`}
              className="btn btn-outline mt-8"
            >
              전화 연결
              <Arrow />
            </a>
          </div>

          <div>
            <Eyebrow>Directions</Eyebrow>
            <MaskHeading className="d3 mt-6 text-ink" lines={[<>찾아오시는 방법</>]} />

            <ul className="mt-8">
              {directions.map((d, i) => (
                <li
                  key={d.type}
                  className="rv grid gap-2 border-b border-hairline py-6 md:grid-cols-[8rem_1fr] md:gap-6"
                  data-d={i * 80}
                >
                  <span className="badge h-fit">{d.type}</span>
                  <p className="p-md text-body">{d.body}</p>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <p className="cap-xs text-mute">서비스 지역</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {serviceAreas.map((a) => (
                  <li
                    key={a}
                    className="rounded-xs border border-hairline px-3 py-1.5 text-[13px] text-body"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaStrip
        eyebrow="Visit"
        title="방문 예정이시면 미리 연락 주세요. 담당자가 안내해 드립니다."
        href="/contact"
        cta="방문 문의"
      />

      <NextLink href="/business" label="Next" title="사업영역 보기" />
    </>
  );
}
