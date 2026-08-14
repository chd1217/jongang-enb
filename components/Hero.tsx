import Link from "next/link";
import HeroRing from "./HeroRing";
import Marquee from "./Marquee";
import { Arrow } from "./ui";
import { company, impactStats, news } from "@/lib/site";

/** 히어로 — 블랙 챕터. 좌: 클레임 카피 / 우: 공정 링 그래픽. */
export default function Hero() {
  return (
    <section className="dark-ch relative overflow-hidden pt-8 md:pt-24">
      {/* 뉴스 티커 */}
      <div className="border-y border-hairline-strong/60 bg-elevated py-2.5">
        <Marquee
          duration={38}
          items={news.slice(0, 3).map((n) => (
            <Link
              key={n.id}
              href={`/news/${n.id}`}
              className="cap-xs text-white/70 hover:text-primary"
            >
              <span className="accent">{n.category}</span>
              <span className="mx-2 text-white/30">|</span>
              {n.title}
            </Link>
          ))}
          sep={<span className="block h-1.5 w-1.5 bg-primary" />}
        />
      </div>

      <div className="mx-auto grid max-w-[var(--maxw)] gap-12 px-[var(--pad)] py-12 md:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        {/* 카피 */}
        <div>
          <div className="rv flex items-center gap-3" data-d="60">
            <span className="block h-3 w-3 bg-primary" />
            <span className="cap accent">
              폐기물 수집·운반 · 중간재활용 · EST. {company.founded}
            </span>
          </div>

          <h1 className="d1 mt-7 text-white">
            <span className="mask-line" data-d="120">
              <span className="block text-white/35">정식 허가,</span>
            </span>
            <span className="mask-line" data-d="240">
              <span className="block">투명한 기록,</span>
            </span>
            <span className="mask-line" data-d="340">
              <span className="block">확실한 처리</span>
            </span>
          </h1>

          <ul className="rv mt-8 flex flex-wrap gap-x-8 gap-y-3" data-d="420">
            {["정식 허가 2종 보유", "올바로시스템 연동", "수요처 맞춤 규격 파·분쇄"].map((t) => (
              <li key={t} className="flex items-center gap-2 text-[13.5px] text-white/60">
                <span className="block h-1.5 w-1.5 bg-primary" />
                {t}
              </li>
            ))}
          </ul>

          <p className="rv p-lg mt-6 max-w-xl text-white/70" data-d="480">
            수집·운반업·중간재활용업 허가를 모두 보유했습니다.{" "}
            <strong className="font-bold text-white">
              반입부터 출하까지 올바로시스템으로 전 과정을 기록합니다.
            </strong>
          </p>

          <div className="rv mt-9 flex flex-wrap gap-3" data-d="560">
            <Link href="/contact" className="btn btn-primary">
              간편 반입·견적 문의
              <Arrow />
            </Link>
            <Link href="/business" className="btn btn-on-dark">
              사업영역 보기
            </Link>
          </div>
        </div>

        {/* 그래픽 */}
        <div className="rv flex justify-center lg:justify-end" data-d="400">
          <HeroRing />
        </div>
      </div>

      {/* 지표 밴드 — 환경 기여 추정치 */}
      <div className="border-t border-hairline-strong/60">
        <div className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-7 md:py-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
            <p className="cap-xs shrink-0 text-white/45">
              CARBON IMPACT
              <br />
              (추정)
            </p>
            <ul className="grid flex-1 grid-cols-2 gap-6 sm:gap-10">
              {impactStats.map((s, i) => (
                <li
                  key={s.label}
                  className={`rv ${i > 0 ? "border-l border-hairline-strong/60 pl-6 sm:pl-10" : ""}`}
                  data-d={i * 70}
                >
                  <p className="num text-[clamp(1.75rem,3.4vw,2.75rem)] text-white">
                    {s.value.toLocaleString("ko-KR")}
                    <span className="text-[0.45em] accent">{s.suffix}</span>
                  </p>
                  <p className="cap-xs mt-3 text-white/55">{s.label}</p>
                </li>
              ))}
            </ul>
          </div>
          <p className="rv mt-6 text-[12px] text-white/35" data-d="140">
            ※ 허가 기준 처리능력에 재활용 시 매립·소각 대비 온실가스 절감 참고계수(약
            1.5tCO₂e/톤)를 적용한 추정치입니다. 실제 절감량은 처리 품목과 가동률에 따라 달라질
            수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
