import Link from "next/link";

type Props = {
  eyebrow: string;
  title: string;
  desc?: string;
  crumbs?: { label: string; href: string }[];
  /** 지정 시 히어로 배경에 사진을 깔고 70~80% 블랙 오버레이를 덧씌운다. */
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
              className="absolute inset-0 -z-20 bg-cover bg-center"
              style={{ backgroundImage: `url(${bgImage})` }}
              aria-hidden
            />
            <div className="absolute inset-0 -z-10 bg-black/75" aria-hidden />
            <p
              className="absolute right-3 bottom-2 text-[9px] tracking-wide text-white/20 select-none"
              aria-hidden
            >
              본 이미지는 AI로 연출된 시안입니다.
            </p>
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
