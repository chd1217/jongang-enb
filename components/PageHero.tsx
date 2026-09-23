import Link from "next/link";

type Props = {
  eyebrow: string;
  title: string;
  desc?: string;
  crumbs?: { label: string; href: string }[];
  /** 공통 슬레이트 톤 및 글자 영역의 그라데이션을 적용할 배경. */
  bgImage?: string;
};

/** 서브페이지 히어로(블랙 챕터) + 브레드크럼 스트립(soft). */
export default function PageHero({ eyebrow, title, desc, crumbs = [], bgImage }: Props) {
  return (
    <>
      <section
        className={`dark-ch pt-8 md:pt-24 ${bgImage ? "relative isolate overflow-hidden" : ""}`}
      >
        {bgImage && (
          <>
            <div
              className="photo-hero-image absolute inset-0 -z-20 bg-cover bg-center"
              style={{ backgroundImage: `url(${bgImage})`, filter: `saturate(0.3) brightness(${bgImage.includes('-detail') ? 1 : bgImage.includes('transport') || bgImage.includes('process') ? 1.8 : 1.6})` }}
              aria-hidden
            />
            <div
              className="photo-hero-overlay absolute inset-0 -z-10"
              aria-hidden
            />
          </>
        )}
        <div className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-14 md:py-20">
          <div className="flex items-center gap-3">
            <span className="block h-3 w-3 bg-primary" />
            <span className="cap accent">{eyebrow}</span>
          </div>

          <h1 className="mask-line mt-6" data-d="80">
            <span className="d1 block text-white">{title}</span>
          </h1>

          {desc && (
            <p className="rv p-lg mt-7 max-w-2xl text-white/70" data-d="260">
              {desc}
            </p>
          )}
        </div>
      </section>

      {crumbs.length > 0 && (
        <nav aria-label="breadcrumb" className="border-b border-hairline bg-soft">
          <ol className="mx-auto flex h-12 max-w-[var(--maxw)] flex-wrap items-center gap-2 px-[var(--pad)]">
            <li>
              <Link href="/" className="cap-xs text-body hover:text-accent">
                Home
              </Link>
            </li>
            {crumbs.map((c, i) => (
              <li key={c.href} className="flex items-center gap-2">
                <span className="text-mute">›</span>
                <Link
                  href={c.href}
                  className={`cap-xs hover:text-accent ${i === crumbs.length - 1 ? "text-ink" : "text-body"}`}
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </>
  );
}
