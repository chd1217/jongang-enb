import Link from "next/link";
import HeroRing from "./HeroRing";
import Marquee from "./Marquee";
import { Arrow } from "./ui";
import { company, stats, news } from "@/lib/site";

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
              건설폐기물 중간처리 · 순환골재 · EST. {company.founded}
            </span>
          </div>

          <h1 className="d1 mt-7 text-white">
            <span className="mask-line" data-d="120">
              <span className="block text-white/35">폐기물을 옮깁니다.</span>
            </span>
            <span className="mask-line" data-d="240">
              <span className="block">자원으로</span>
            </span>
            <span className="mask-line" data-d="340">
              <span className="block">되돌립니다.</span>
            </span>
          </h1>

          <p className="rv p-lg mt-8 max-w-xl text-white/70" data-d="480">
            수집·운반부터 파쇄·선별, 순환골재 출하까지 저희 시설에서 끝냅니다.{" "}
            <strong className="font-bold text-white">
              중간에 다른 업체가 끼지 않으니, 떠넘길 책임도 없습니다.
            </strong>
          </p>

          <div className="rv mt-9 flex flex-wrap gap-3" data-d="560">
            <Link href="/contact" className="btn btn-primary">
              견적 문의하기
              <Arrow />
            </Link>
            <Link href="/business" className="btn btn-on-dark">
              사업영역 보기
            </Link>
          </div>

          <ul className="rv mt-10 flex flex-wrap gap-x-8 gap-y-3" data-d="640">
            {["허가 " + company.permitNo, "ISO 9001 / 14001", "KS F 2573 순환골재"].map((t) => (
              <li key={t} className="flex items-center gap-2 text-[13.5px] text-white/60">
                <span className="block h-1.5 w-1.5 bg-primary" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* 그래픽 */}
        <div className="rv flex justify-center lg:justify-end" data-d="400">
          <HeroRing />
        </div>
      </div>

      {/* 지표 밴드 */}
      <div className="border-t border-hairline-strong/60">
        <ul className="mx-auto grid max-w-[var(--maxw)] grid-cols-2 px-[var(--pad)] md:grid-cols-4">
          {stats.map((s, i) => (
            <li
              key={s.label}
              className={`rv py-6 md:py-7 ${i > 0 ? "border-l border-hairline-strong/60 pl-5 md:pl-7" : ""} ${
                i === 2 ? "border-l-0 pl-0 md:border-l md:pl-7" : ""
              }`}
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
    </section>
  );
}
