import Link from "next/link";
import { company, nav, serviceAreas, wasteTypes } from "@/lib/site";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="dark-ch">
      <div className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-14 md:py-16">
        {/* 상단: 회사 + 연락처 */}
        <div className="grid gap-10 border-b border-hairline-strong pb-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="flex items-center gap-3.5">
              <Logo size={48} className="h-12 w-12" />
              <div>
                <p className="h4 text-white">{company.nameKoFull}</p>
                <p className="cap-xs mt-1.5 text-white/60">{company.nameEn}</p>
              </div>
            </div>
            <p className="p-md mt-6 max-w-lg text-white/70">
              폐기물 수집·운반 · 중간재활용 · 맞춤형 파쇄품 공급.
              <br />
              반입 검수부터 출하까지 한 회사에서 처리합니다.
            </p>
            <Link href="/contact" className="btn btn-primary mt-7">
              견적 문의하기
            </Link>
          </div>

          <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="cap-xs text-white/50">Tel</dt>
              <dd className="num mt-2 text-2xl text-white">
                <a href={`tel:${company.tel.replace(/-/g, "")}`} className="hover:text-primary">
                  {company.tel}
                </a>
              </dd>
            </div>
            <div>
              <dt className="cap-xs text-white/50">E-mail</dt>
              <dd className="mt-2 text-[15px] text-white/80">
                <a href={`mailto:${company.email}`} className="hover:text-primary">
                  {company.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="cap-xs text-white/50">Address</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-white/80">{company.address}</dd>
            </div>
            <div>
              <dt className="cap-xs text-white/50">Business hours</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-white/80">{company.hours}</dd>
            </div>
          </dl>
        </div>

        {/* 링크 그리드 */}
        <div className="grid gap-8 border-b border-hairline-strong py-12 sm:grid-cols-2 lg:grid-cols-5">
          {nav.map((item) => (
            <div key={item.href}>
              <p className="text-[16px] font-bold text-white">{item.label}</p>
              <ul className="mt-4 space-y-2.5">
                {(item.children ?? [{ label: item.label, href: item.href }]).map((c) => (
                  <li key={c.href}>
                    <Link href={c.href} className="text-[14px] text-white/70 hover:text-primary">
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 처리 품목 · 지역 (내부 SEO) */}
        <div className="grid gap-8 border-b border-hairline-strong py-10 md:grid-cols-2">
          <div>
            <p className="cap-xs text-white/50">처리 품목</p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {wasteTypes.map((w) => (
                <li key={w} className="text-[13px] text-white/60">
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="cap-xs text-white/50">서비스 지역</p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {serviceAreas.map((a) => (
                <li key={a} className="text-[13px] text-white/60">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 법적 표기 */}
        <div className="flex flex-col-reverse gap-4 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="cap-xs text-white/45">
            © {year} {company.nameKoFull}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1 text-[12px] text-white/60">
            <li>대표 {company.ceo}</li>
            <li>사업자등록번호 {company.bizNo}</li>
            <li>{company.permitNo} 정식 허가업체</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
