import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Faq from "@/components/Faq";
import { Eyebrow, MaskHeading } from "@/components/ui";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/JsonLd";
import { company, serviceAreas, telDial } from "@/lib/site";

export const metadata: Metadata = {
  title: "문의하기",
  description: `폐기물 반입 단가, 배차 일정, 맞춤형 파쇄품 공급 문의. 대표전화 ${company.tel}. 현장 주소·품목·물량·희망일만 알려주시면 회신드립니다.`,
};

const steps = [
  { no: "01", t: "문의 접수", d: "전화 또는 온라인 양식으로 현장 정보를 알려주세요." },
  { no: "02", t: "단가 · 일정 회신", d: "영업일 기준 24시간 이내에 반입 단가와 배차 가능일을 회신합니다." },
  { no: "03", t: "배차 · 반입", d: "확정된 일정에 차량을 배차하고 계량·검수 후 처리합니다." },
  { no: "04", t: "서류 발송", d: "계량증명서와 재활용확인서를 발급해 담당자께 전달합니다." },
];

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "문의하기", href: "/contact" }]} />
      <FaqJsonLd />

      <PageHero
        eyebrow="Contact"
        title="물량과 품목만 알려주시면 됩니다"
        desc="현장 주소 · 폐기물 품목 · 예상 물량 · 반출 희망일. 이 네 가지면 영업일 기준 24시간 이내에 단가와 배차 일정을 회신드립니다."
        crumbs={[{ label: "문의하기", href: "/contact" }]}
        bgImage="/about/hero-contact.jpg"
      />

      {/* 연락처 + 폼 */}
      <section className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[20rem_1fr] lg:gap-14">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>Direct</Eyebrow>
            <p className="cap-xs mt-6 text-mute">대표전화</p>
            <a
              href={`tel:${telDial}`}
              className="num mt-2 block text-[clamp(1.75rem,3.4vw,2.5rem)] text-ink hover:text-accent"
            >
              {company.tel}
            </a>

            <dl className="mt-8 border-t border-hairline">
              {[
                { k: "이메일", v: company.email, href: `mailto:${company.email}` },
                { k: "팩스", v: company.fax },
                { k: "주소", v: company.address },
                { k: "운영시간", v: company.hours },
              ].map((r) => (
                <div key={r.k} className="border-b border-hairline py-4">
                  <dt className="cap-xs text-mute">{r.k}</dt>
                  <dd className="mt-1.5 text-[15px] text-body">
                    {r.href ? (
                      <a href={r.href} className="hover:text-accent">
                        {r.v}
                      </a>
                    ) : (
                      r.v
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <p className="cap-xs text-mute">배차 가능 지역</p>
              <p className="p-sm mt-3 text-body">{serviceAreas.join(" · ")}</p>
            </div>
          </div>

          <div>
            <Eyebrow>Request a quote</Eyebrow>
            <MaskHeading className="d3 mt-6 mb-8 text-ink" lines={[<>온라인 견적 문의</>]} />
            <ContactForm />
          </div>
        </div>
      </section>

      {/* 진행 절차 */}
      <section className="soft-ch border-y border-hairline">
        <div className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-20">
          <Eyebrow>How it works</Eyebrow>
          <MaskHeading className="d2 mt-6 text-ink" lines={[<>문의부터 처리까지</>]} />

          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.no} className="corner card rv p-7" data-d={i * 70}>
                <span className="num mt-4 block text-[1.75rem] text-hairline">{s.no}</span>
                <h3 className="h4 mt-5 text-ink">{s.t}</h3>
                <p className="p-sm mt-3 text-body">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[20rem_1fr] lg:gap-14">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>FAQ</Eyebrow>
            <MaskHeading className="d2 mt-6 text-ink" lines={[<>자주 묻는 질문</>]} />
          </div>
          <Faq />
        </div>
      </section>
    </>
  );
}
