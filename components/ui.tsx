import Link from "next/link";
import type { ReactNode } from "react";

/** 섹션 eyebrow — 그린 코너 스퀘어 + 대문자 캡션. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rv flex items-center gap-3 ${className}`}>
      <span className="block h-3 w-3 shrink-0 bg-primary" />
      <span className="cap accent">{children}</span>
    </div>
  );
}

/** 마스크 리빌 헤드라인. */
export function MaskHeading({
  lines,
  className = "",
  as: Tag = "h2",
  stagger = 90,
}: {
  lines: ReactNode[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  stagger?: number;
}) {
  return (
    <Tag className={className}>
      {lines.map((l, i) => (
        <span key={i} className="mask-line" data-d={i * stagger}>
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}

export function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
    </svg>
  );
}

export function ArrowNE({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path
        d="M3 13 13 3M13 3H5.5M13 3v7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="square"
      />
    </svg>
  );
}

/** 고스트 링크 — "자세히 보기 →" */
export function GhostLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`btn-ghost ${className}`}>
      {children}
      <Arrow className="h-4 w-4" />
    </Link>
  );
}

/** 다크 CTA 스트립 — 섹션 사이 브리지. */
export function CtaStrip({
  eyebrow,
  title,
  href,
  cta = "바로가기",
  secondary,
}: {
  eyebrow: string;
  title: string;
  href: string;
  cta?: string;
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="dark-ch px-[var(--pad)] py-14 md:py-16">
      <div className="mx-auto flex max-w-[var(--maxw)] flex-col gap-7 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="block h-3 w-3 bg-primary" />
            <span className="cap accent">{eyebrow}</span>
          </div>
          <p className="d3 mt-4 max-w-2xl text-white">{title}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Link href={href} className="btn btn-primary">
            {cta}
            <Arrow />
          </Link>
          {secondary && (
            <Link href={secondary.href} className="btn btn-on-dark">
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

/** 다음 페이지 유도 (푸터 직전). */
export function NextLink({ href, label, title }: { href: string; label: string; title: string }) {
  return (
    <Link
      href={href}
      className="group block border-t border-hairline bg-white px-[var(--pad)] py-14 transition-colors hover:bg-soft md:py-20"
    >
      <div className="mx-auto flex max-w-[var(--maxw)] flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="cap text-mute">{label}</span>
          <p className="d2 mt-4 text-ink">{title}</p>
        </div>
        <span className="isq !h-12 !w-12 border-hairline text-ink transition-colors group-hover:border-primary group-hover:bg-primary">
          <ArrowNE className="h-5 w-5" />
        </span>
      </div>
    </Link>
  );
}

/** 통계 셀 — 큰 숫자 + 캡션. */
export function Stat({
  value,
  suffix,
  label,
  desc,
  className = "",
}: {
  value: ReactNode;
  suffix?: string;
  label: string;
  desc?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="num text-[clamp(2.75rem,6vw,4.5rem)] text-ink">
        {value}
        {suffix && <span className="text-[0.42em] font-bold text-accent">{suffix}</span>}
      </p>
      <p className="h4 mt-4 text-ink">{label}</p>
      {desc && <p className="p-sm mt-2 text-mute">{desc}</p>}
    </div>
  );
}
