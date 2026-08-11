import Link from "next/link";
import Hero from "@/components/Hero";
import HorizontalProcess from "@/components/HorizontalProcess";
import Counter from "@/components/Counter";
import Marquee from "@/components/Marquee";
import Faq from "@/components/Faq";
import { OrganizationJsonLd, FaqJsonLd } from "@/components/JsonLd";
import { Eyebrow, MaskHeading, GhostLink, Arrow, ArrowNE, CtaStrip } from "@/components/ui";
import { IconTruck, IconDoc, IconCert, IconCrusher, IconAggregate, IconScreen } from "@/components/Icons";
import {
  services,
  aggregateProducts,
  certificates,
  news,
  company,
  whyUs,
  capabilities,
  industries,
  serviceAreas,
  testimonials,
  wasteTypes,
  definition,
} from "@/lib/site";

const ICONS = { truck: IconTruck, doc: IconDoc, cert: IconCert } as const;
const SERVICE_ICONS = [IconCrusher, IconAggregate, IconTruck];

export default function Home() {
  return (
    <>
      <OrganizationJsonLd />
      <FaqJsonLd />

      <Hero />

      {/* ═══ 01. 선언 — 화이트 캔버스 ═══ */}
      <section className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div>
            <Eyebrow>About us</Eyebrow>
            <MaskHeading
              className="d2 mt-7 text-ink"
              lines={[
                <>
                  <span className="text-stone">누구나 치웁니다.</span>
                </>,
                <>저희는 되돌립니다.</>,
              ]}
            />
          </div>

          <div className="lg:pt-16">
            <p className="p-lg text-body">
              계량대를 지난 폐콘크리트는 파쇄기로 들어갑니다. 철근은 자석이 걷어내고, 목재와
              비닐은 바람이 골라냅니다. 남은 골재는 입도별로 나뉘어 다시 도로가 되고 기초가
              됩니다.
            </p>
            <p className="p-lg mt-5 text-body">
              <strong className="font-bold text-ink">
                반입된 물량의 98.2%가 순환골재로 현장에 되돌아갑니다.
              </strong>{" "}
              {company.founded}년 허가 취득 이후 21년, 이 한 가지만 해왔습니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <GhostLink href="/about">회사소개</GhostLink>
              <GhostLink href="/process">처리공정</GhostLink>
            </div>
          </div>
        </div>

        {/* 처리 규모 — 큰 숫자 2열 */}
        <div className="mt-16 grid gap-px border border-hairline bg-hairline md:grid-cols-3">
          {[
            { v: 1050, unit: "만 톤", label: "누적 처리량", desc: "2004년 설립 이후 반입·처리한 건설폐기물 총량" },
            { v: 40, unit: "대", label: "보유 장비", desc: "파쇄·선별 설비와 수집운반 차량 보유 대수" },
            { v: 24, unit: "시간", label: "견적 회신", desc: "영업일 기준 문의 접수부터 단가 회신까지" },
          ].map((s, i) => (
            <div key={s.label} className="rv bg-white p-7 md:p-9" data-d={i * 80}>
              <p className="num text-[clamp(2.5rem,5vw,3.75rem)] text-ink">
                <Counter to={s.v} />
                <span className="text-[0.36em] font-bold accent">{s.unit}</span>
              </p>
              <p className="h4 mt-5 text-ink">{s.label}</p>
              <p className="p-sm mt-2 text-mute">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 02. 사업영역 ═══ */}
      <section className="soft-ch border-y border-hairline">
        <div className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Business</Eyebrow>
              <MaskHeading
                className="d2 mt-6 text-ink"
                lines={[<>현장에 필요한 전부를,</>, <>한 회사에서.</>]}
              />
            </div>
            <p className="rv p-md max-w-sm text-body" data-d="200">
              배차업체 따로, 처리업체 따로 부를 필요가 없습니다. 계약 하나로 수집·운반부터
              순환골재 공급까지 끝납니다.
            </p>
          </div>

          <ul className="mt-12 grid gap-5 lg:grid-cols-3">
            {services.map((s, i) => {
              const Icon = SERVICE_ICONS[i] ?? IconCrusher;
              return (
                <li key={s.slug} className="rv" data-d={i * 90}>
                  <Link href={s.href} className="corner card group flex h-full flex-col p-7 md:p-8">
                    <div className="flex items-start justify-between pt-3">
                      <Icon className="h-8 w-8 text-primary" />
                      <span className="cap-xs text-mute">{s.no}</span>
                    </div>

                    <h3 className="d3 mt-8 text-ink">{s.title}</h3>
                    <p className="p-md mt-4 text-body">{s.summary}</p>

                    <ul className="mt-6 space-y-2 border-t border-hairline pt-5">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-[14px] text-body">
                          <span className="mt-[7px] block h-1.5 w-1.5 shrink-0 bg-primary" />
                          {p}
                        </li>
                      ))}
                    </ul>

                    <span className="btn-ghost mt-7 pt-1">
                      자세히 보기
                      <Arrow />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ═══ 03. 운영 역량 3종 ═══ */}
      <section className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Reliability</Eyebrow>
            <MaskHeading className="d2 mt-6 text-ink" lines={[<>모든 단계에서 같은 기준</>]} />
          </div>
          <p className="rv p-md max-w-sm text-body" data-d="180">
            현장이 바뀌어도, 물량이 늘어도 처리 방식과 서류 발급 시점은 동일합니다.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {capabilities.map((c, i) => {
            const Icon = ICONS[c.icon as keyof typeof ICONS];
            return (
              <li key={c.title} className="corner card rv p-7 md:p-8" data-d={i * 90}>
                <Icon className="mt-3 h-8 w-8 text-primary" />
                <h3 className="h4 mt-7 text-ink">{c.title}</h3>
                <p className="p-md mt-3 text-body">{c.body}</p>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ═══ 04. 처리 공정 (가로 스크롤) ═══ */}
      <section className="border-t border-hairline pt-16 md:pt-24">
        <div className="mx-auto flex max-w-[var(--maxw)] flex-col gap-6 px-[var(--pad)] md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Process</Eyebrow>
            <MaskHeading
              className="d2 mt-6 text-ink"
              lines={[
                <>
                  6단계 <span className="accent">일괄 처리</span> 라인
                </>,
              ]}
            />
          </div>
          <p className="rv p-md max-w-sm text-body" data-d="180">
            계량 · 선별 · 1차 파쇄 · 2차 파쇄 · 입도 분리 · 품질시험. 모든 단계의 기록이
            처리확인서로 남습니다.
          </p>
        </div>

        <div className="mt-12">
          <HorizontalProcess />
        </div>

        <div className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] pt-8 pb-16 md:pb-20">
          <GhostLink href="/process">공정 상세보기</GhostLink>
        </div>
      </section>

      {/* ═══ 05. 왜 중앙이앤비인가 — 블랙 챕터 ═══ */}
      <section className="dark-ch">
        <div className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[24rem_1fr] lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <div className="rv flex items-center gap-3">
                <span className="block h-3 w-3 bg-primary" />
                <span className="cap accent">Why us</span>
              </div>
              <MaskHeading
                className="d2 mt-6 text-white"
                lines={[<>업체를 바꾸는</>, <>이유는 대개 같습니다</>]}
              />
              <p className="rv p-md mt-7 text-white/70" data-d="240">
                서류가 늦고, 배차가 밀리고, 문제가 생기면 서로를 가리킵니다. 저희는 그 세 가지를
                없애는 데 21년을 썼습니다.
              </p>
              <Link href="/contact" className="btn btn-primary mt-8">
                견적 문의하기
                <Arrow />
              </Link>
            </div>

            <ul className="border-t border-hairline-strong">
              {whyUs.map((w, i) => (
                <li
                  key={w.no}
                  className="rv grid gap-3 border-b border-hairline-strong py-7 md:grid-cols-[4rem_1fr] md:gap-8 md:py-8"
                  data-d={i * 80}
                >
                  <span className="num text-[1.75rem] text-white/25">{w.no}</span>
                  <div>
                    <h3 className="h4 text-white">{w.title}</h3>
                    <p className="p-md mt-3 max-w-2xl text-white/70">{w.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ 06. 순환골재 ═══ */}
      <section className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
          <div>
            <Eyebrow>Recycled aggregate</Eyebrow>
            <MaskHeading
              className="d2 mt-6 text-ink"
              lines={[<>성적서 없는 골재는</>, <>출하하지 않습니다</>]}
            />
            <p className="rv p-md mt-7 max-w-md text-body" data-d="240">
              생산 로트마다 입도·마모감량·이물질 함유량을 시험합니다. 도로 보조기층부터
              되메우기까지, 용도에 맞는 입도로 25톤 덤프 1대 분량부터 현장 직송합니다.
            </p>
            <div className="rv mt-8" data-d="320">
              <Link href="/business/aggregate" className="btn btn-outline">
                제품 및 단가 문의
              </Link>
            </div>
          </div>

          <ul className="grid gap-5 sm:grid-cols-2">
            {aggregateProducts.map((p, i) => (
              <li key={p.grade} className="corner card rv p-7" data-d={i * 80}>
                <div className="flex items-baseline justify-between pt-3">
                  <span className="num text-[2.5rem] text-ink">{p.grade}</span>
                  <IconScreen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="h4 mt-6 text-ink">{p.name}</h3>
                <p className="p-sm mt-2 text-mute">{p.use}</p>
                <p className="p-sm mt-5 border-t border-hairline pt-4 text-body">{p.spec}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ 07. 인증 ═══ */}
      <section className="soft-ch border-y border-hairline py-14 md:py-16">
        <div className="mx-auto max-w-[var(--maxw)] px-[var(--pad)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Eyebrow>Certified</Eyebrow>
            <GhostLink href="/about/certificates">인증·허가 현황 전체보기</GhostLink>
          </div>
        </div>

        <div className="mt-9">
          <Marquee
            duration={44}
            items={certificates.map((c) => (
              <span key={c.name} className="flex items-baseline gap-3">
                <span className="text-[clamp(1rem,1.9vw,1.4rem)] font-bold text-ink">{c.name}</span>
                <span className="text-[13px] font-bold accent">{c.year}</span>
              </span>
            ))}
          />
        </div>
      </section>

      {/* ═══ 08. 고객 후기 ═══ */}
      <section className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
        <Eyebrow>Clients</Eyebrow>
        <MaskHeading className="d2 mt-6 max-w-3xl text-ink" lines={[<>현장 담당자들이 남긴 말</>]} />

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <li key={t.name} className="corner card rv flex flex-col p-7 md:p-8" data-d={i * 90}>
              <p className="p-md mt-4 flex-1 text-body">“{t.quote}”</p>
              <footer className="mt-7 border-t border-hairline pt-5">
                <p className="text-[15px] font-bold text-ink">{t.name}</p>
                <p className="p-sm mt-1 text-mute">{t.role}</p>
              </footer>
            </li>
          ))}
        </ul>
      </section>

      {/* ═══ 09. 고객 유형 ═══ */}
      <section className="soft-ch border-y border-hairline">
        <div className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Industries</Eyebrow>
              <MaskHeading className="d2 mt-6 text-ink" lines={[<>어떤 현장이든</>]} />
            </div>
            <p className="rv p-md max-w-md text-body" data-d="160">
              소량 다빈도 인테리어 철거부터 단지 단위 재건축까지, 현장 성격에 맞춰 배차와 반입
              스케줄을 설계합니다.
            </p>
          </div>

          <ul className="mt-12 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <li key={ind.name} className="rv bg-white p-7" data-d={i * 70}>
                <div className="flex items-start gap-3">
                  <span className="mt-2 block h-2.5 w-2.5 shrink-0 bg-primary" />
                  <div>
                    <h3 className="h4 text-ink">{ind.name}</h3>
                    <p className="p-sm mt-2.5 text-body">{ind.desc}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ 10. FAQ ═══ */}
      <section className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[22rem_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>FAQ</Eyebrow>
            <MaskHeading className="d2 mt-6 text-ink" lines={[<>자주 묻는 질문</>]} />
            <p className="rv p-md mt-6 text-body" data-d="220">
              여기에 없는 질문은 전화 주시면 바로 답해 드립니다.
            </p>
            <a
              href={`tel:${company.tel.replace(/-/g, "")}`}
              className="num mt-5 block text-2xl text-ink hover:text-accent"
            >
              {company.tel}
            </a>
          </div>

          <Faq />
        </div>
      </section>

      {/* ═══ 11. 소식 ═══ */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>News</Eyebrow>
              <MaskHeading className="d2 mt-6 text-ink" lines={[<>회사소식</>]} />
            </div>
            <GhostLink href="/news">전체보기</GhostLink>
          </div>

          <ul className="mt-12 border-t border-hairline">
            {news.slice(0, 4).map((n, i) => (
              <li key={n.id} className="rv" data-d={i * 70}>
                <Link
                  href={`/news/${n.id}`}
                  className="group grid gap-3 border-b border-hairline py-6 md:grid-cols-[7rem_1fr_auto] md:items-center md:gap-10"
                >
                  <span className="text-[13px] font-bold text-mute">
                    {n.date.replace(/-/g, ".")}
                  </span>
                  <div className="min-w-0">
                    <span className="badge">{n.category}</span>
                    <p className="d3 mt-3 truncate text-ink">{n.title}</p>
                  </div>
                  <span className="isq hidden border-hairline text-ink group-hover:border-primary group-hover:bg-primary md:inline-flex">
                    <ArrowNE className="h-4 w-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ 12. CTA ═══ */}
      <CtaStrip
        eyebrow="Contact"
        title="물량과 품목만 알려주시면, 24시간 내에 단가와 배차 일정을 회신드립니다."
        href="/contact"
        cta="온라인 견적 문의"
        secondary={{ label: company.tel, href: `tel:${company.tel.replace(/-/g, "")}` }}
      />

      {/* ═══ SEO / 요약 ═══ */}
      <section className="border-t border-hairline bg-white">
        <div className="mx-auto grid max-w-[var(--maxw)] gap-10 px-[var(--pad)] py-12 lg:grid-cols-2">
          <div>
            <h2 className="cap-xs text-mute">중앙이앤비 안내</h2>
            <p className="p-sm mt-4 max-w-2xl text-body">{definition}</p>
            <p className="p-sm mt-4 max-w-2xl text-body">
              처리 가능 품목은 {wasteTypes.slice(0, 6).join(", ")} 등이며, 생산 품목은{" "}
              {aggregateProducts.map((p) => p.grade).join(" · ")} 순환골재입니다. 반입 즉시
              계량증명서를, 처리 완료 후 처리확인서를 발급하며 올바로시스템 인계서 처리도 함께
              진행합니다.
            </p>
          </div>

          <div>
            <h2 className="cap-xs text-mute">서비스 지역</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {serviceAreas.map((a) => (
                <li
                  key={a}
                  className="rounded-xs border border-hairline px-3 py-1.5 text-[12.5px] text-body"
                >
                  {a} 건설폐기물 처리
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
