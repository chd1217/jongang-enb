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
  offtakes,
  certificates,
  news,
  company,
  whyUs,
  capabilities,
  industries,
  serviceAreas,
  serviceNationwide,
  coreStrengths,
  wasteTypes,
  definition,
  telDial,
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
        <Eyebrow>About us</Eyebrow>
        <div className="mt-7 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-20">
          <MaskHeading
            className="d2 text-ink"
            lines={[
              <>
                <span className="accent">말</span>
                <span className="text-stone">보다 </span>
                <span className="accent">공정</span>
                <span className="text-stone">으로,</span>
              </>,
              <>현장에서 다져온 확실한 처리의 정석.</>,
            ]}
          />

          <div
            className="border-l-2 pl-6"
            style={{ borderLeftColor: "var(--color-primary)" }}
          >
            <p className="rv p-lg text-body" data-d="0">
              반입 계근대 진입부터 최종 규격 출하까지, 중앙이엔비의 모든 라인은 타협 없는
              원칙으로 움직입니다.
            </p>
            <p className="rv p-lg mt-5 text-body" data-d="140">
              철저한 2단계 불순물 선별과 고성능 파쇄 시스템,{" "}
              <strong className="font-bold text-ink">
                올바로 100% 실시간 전산 연동으로 배출처의 법적 리스크를 완벽히 해결
              </strong>
              하고 수요처가 신뢰하는 고순도 순환 자원을 완성합니다. 오랜 시간 현장을 지켜온
              묵직한 책임감으로 끝까지 함께합니다.
            </p>
            <div className="rv mt-8 flex flex-wrap gap-x-8 gap-y-3" data-d="260">
              <GhostLink href="/about">회사소개</GhostLink>
              <GhostLink href="/process">처리공정</GhostLink>
            </div>
          </div>
        </div>

        {/* 처리 규모 — 큰 숫자 2열 */}
        <div className="mt-16 grid gap-px border border-hairline bg-hairline md:grid-cols-3">
          {[
            { v: 26, unit: "년", label: "업력", desc: "1999년 설립 이후 수집·운반 및 원료재생업 운영", pause: 0, dur: 2600 },
            {
              v: 100,
              unit: "%",
              label: "올바로 적법 연동율",
              desc: "반입부터 출하까지 전 처리 이력을 실시간 등록",
              pause: 450,
              dur: 2200,
            },
            { v: 24, unit: "시간", label: "견적 회신", desc: "문의 접수부터 단가 회신까지", pause: 0, dur: 2600 },
          ].map((s, i) => (
            <div key={s.label} className="rv bg-white p-7 md:p-9" data-d={i * 80}>
              <p className="num text-[clamp(2.5rem,5vw,3.75rem)]">
                <Counter
                  to={s.v}
                  duration={s.dur}
                  pauseBeforeEnd={s.pause}
                  className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent"
                />
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
          <Eyebrow>Business</Eyebrow>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <MaskHeading
              className="d2 text-ink"
              lines={[
                <>현장에 필요한 전부를,</>,
                <>
                  <span className="accent">한 회사</span>에서.
                </>,
              ]}
            />
            <p
              className="rv p-md mt-1 max-w-md border-l-2 pl-4 text-body"
              style={{ borderLeftColor: "var(--color-primary)" }}
              data-d="200"
            >
              수집·운반업과 중간재활용업 허가를 함께 보유해, 반입 상담부터 중간재활용,
              맞춤형 파쇄품 공급까지 한 창구에서 조율합니다.
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
        <Eyebrow>Reliability</Eyebrow>
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <MaskHeading
            className="d2 text-ink"
            lines={[
              <>
                모든 단계에서 <span className="accent">같은 기준</span>
              </>,
            ]}
          />
          <p
            className="rv p-md mt-1 max-w-md border-l-2 pl-4 text-body"
            style={{ borderLeftColor: "var(--color-primary)" }}
            data-d="180"
          >
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
        <div className="mx-auto max-w-[var(--maxw)] px-[var(--pad)]">
          <Eyebrow>Process</Eyebrow>
        </div>
        <div className="mx-auto mt-6 flex max-w-[var(--maxw)] flex-col gap-6 px-[var(--pad)] md:flex-row md:items-center md:justify-between">
          <MaskHeading
            className="d2 text-ink"
            lines={[
              <>
                5단계 <span className="accent">일괄 처리</span> 라인
              </>,
            ]}
          />
          <p
            className="rv p-md mt-1 max-w-md border-l-2 pl-4 text-body"
            style={{ borderLeftColor: "var(--color-primary)" }}
            data-d="180"
          >
            수집·운반 · 반입 선별 · 파쇄 · 정밀 검수 · 출하. 모든 단계의 기록이 재활용확인서로
            남습니다.
          </p>
        </div>

        <div className="mt-12">
          <HorizontalProcess />
        </div>

        <div className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] pt-8 pb-16 md:pb-20">
          <GhostLink href="/process" className="rv" data-d="80">
            공정 상세보기
          </GhostLink>
        </div>
      </section>

      {/* ═══ 05. 왜 중앙이엔비인가 — 블랙 챕터 ═══ */}
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
                lines={[
                  <>업체를 바꾸는</>,
                  <>
                    <span className="accent">이유</span>는 대개 같습니다
                  </>,
                ]}
              />
              <p
                className="rv p-md mt-7 border-l-2 pl-4 text-white/70"
                style={{ borderLeftColor: "var(--color-primary)" }}
                data-d="240"
              >
                서류가 늦고, 배차가 밀리고, 문제가 생기면 서로를 가리킵니다. 저희는 그 세 가지를
                없애는 데 집중해 왔습니다.
              </p>
              <Link href="/contact" className="rv btn btn-primary mt-8" data-d="320">
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

      {/* ═══ 06. 맞춤형 파쇄품 ═══ */}
      <section className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
          <div>
            <Eyebrow>Shredded material</Eyebrow>
            <MaskHeading
              className="d2 mt-6 text-ink"
              lines={[
                <>
                  <span className="accent">규격 없는 파쇄품</span>은
                </>,
                <>출하하지 않습니다</>,
              ]}
            />
            <p
              className="rv p-md mt-7 max-w-md border-l-2 pl-4 text-body"
              style={{ borderLeftColor: "var(--color-primary)" }}
              data-d="240"
            >
              반입 시 1차 선별, 파쇄 후 2차 정밀 불순물 검출을 거칩니다. 시멘트 소성로부터
              재생원료 가공까지, 수요처 규격에 맞춰 공급합니다.
            </p>
            <div className="rv mt-8" data-d="320">
              <Link href="/business/product" className="btn btn-outline">
                제품 및 단가 문의
              </Link>
            </div>
          </div>

          <ul className="grid gap-5 sm:grid-cols-2">
            {offtakes.map((p, i) => (
              <li key={p.grade} className="corner card rv p-7" data-d={i * 80}>
                <div className="flex items-baseline justify-between pt-3">
                  <span className="num text-[1.75rem] text-ink">{p.grade}</span>
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
            <GhostLink href="/about/certificates" className="rv" data-d="80">
              인증·허가 현황 전체보기
            </GhostLink>
          </div>
        </div>

        <div className="mt-9">
          <Marquee
            duration={44}
            items={certificates.map((c) => (
              <span key={c.name} className="flex items-baseline gap-3">
                <span className="text-[clamp(1rem,1.9vw,1.4rem)] font-bold text-ink">{c.name}</span>
              </span>
            ))}
          />
        </div>
      </section>

      {/* ═══ 08. 핵심 강점 ═══ */}
      <section className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
        <Eyebrow>Why us</Eyebrow>
        <MaskHeading
          className="d2 mt-6 max-w-3xl text-ink"
          lines={[
            <>
              <span className="accent">세 가지</span>만 지킵니다
            </>,
          ]}
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {coreStrengths.map((t, i) => (
            <li key={t.no} className="corner card rv flex flex-col p-7 md:p-8" data-d={i * 90}>
              <span className="num text-[1.5rem] text-hairline">{t.no}</span>
              <h3 className="h4 mt-6 text-ink">{t.title}</h3>
              <p className="p-md mt-3 flex-1 text-body">{t.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ═══ 09. 고객 유형 ═══ */}
      <section className="soft-ch border-y border-hairline">
        <div className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
          <Eyebrow>Industries</Eyebrow>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <MaskHeading className="d2 text-ink" lines={[<>어떤 현장이든</>]} />
            <p
              className="rv p-md mt-1 max-w-lg border-l-2 pl-4 text-body"
              style={{ borderLeftColor: "var(--color-primary)" }}
              data-d="160"
            >
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
            <p
              className="rv p-md mt-6 border-l-2 pl-4 text-body"
              style={{ borderLeftColor: "var(--color-primary)" }}
              data-d="220"
            >
              추가 문의 사항은 전화 상담을 통해 언제든 친절하게 안내받으실 수 있습니다.
            </p>
            <a href={`tel:${telDial}`} className="rv btn btn-outline mt-6" data-d="260">
              전화 연결
              <Arrow />
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
            <GhostLink href="/news" className="rv" data-d="80">
              전체보기
            </GhostLink>
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
        title={
          <>
            물량과 품목만 알려주시면, <span className="accent">24시간</span> 내에 단가와 배차
            일정을 회신드립니다.
          </>
        }
        href="/contact"
        cta="온라인 견적 문의"
        secondary={{ label: company.tel, href: `tel:${telDial}` }}
      />

      {/* ═══ SEO / 요약 ═══ */}
      <section className="border-t border-hairline bg-white">
        <div className="mx-auto grid max-w-[var(--maxw)] gap-10 px-[var(--pad)] py-12 lg:grid-cols-2">
          <div>
            <h2 className="cap-xs text-mute">중앙이엔비 안내</h2>
            <p className="p-sm mt-4 max-w-2xl text-body">{definition}</p>
            <p className="p-sm mt-4 max-w-2xl text-body">
              처리 가능 품목은 {wasteTypes.slice(0, 6).join(", ")} 등이며, 수요처 규격에 맞춘
              맞춤형 파쇄품을 생산·공급합니다. 반입 즉시 계량증명서를, 처리 완료 후
              재활용확인서를 발급하며 올바로시스템 인계서 처리도 함께 진행합니다.
            </p>
          </div>

          <div>
            <h2 className="cap-xs text-mute">서비스 지역</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {serviceAreas.slice(0, -1).map((a) => (
                <li
                  key={a}
                  className="rounded-xs border border-hairline px-3 py-1.5 text-[12.5px] text-body"
                >
                  {a} 폐기물 수집·운반
                </li>
              ))}
            </ul>
            <p className="mt-3 inline-block rounded-xs bg-primary px-3 py-1.5 text-[12.5px] font-bold text-black">
              {serviceNationwide}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
