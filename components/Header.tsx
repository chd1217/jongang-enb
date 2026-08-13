"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company, nav, telDial } from "@/lib/site";
import Logo from "./Logo";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("/").slice(0, 2).join("/"));

  const openItem = nav.find((n) => n.en === hovered && n.children);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-100">
        {/* 유틸리티 바 — 32px 블랙 */}
        <div className="hidden h-8 bg-black md:block">
          <div className="mx-auto flex h-full max-w-[var(--maxw)] items-center justify-between px-[var(--pad)] text-[12px] text-white/70">
            <p>{company.hours}</p>
            <div className="flex items-center gap-6">
              <span>{company.permitNo} 정식 허가업체</span>
              <a href={`mailto:${company.headerEmail}`} className="hover:text-primary">
                {company.headerEmail}
              </a>
              <a
                href={`tel:${telDial}`}
                className="flex items-center gap-2 font-bold text-white hover:text-primary"
              >
                <span className="h-1.5 w-1.5 bg-primary blink" />
                {company.tel}
              </a>
            </div>
          </div>
        </div>

        {/* 메인 내비 — 64px 화이트 */}
        <header
          onMouseLeave={() => setHovered(null)}
          className={`border-b border-hairline bg-white ${
            scrolled ? "shadow-[0_0_5px_0_rgba(0,0,0,0.3)]" : ""
          }`}
        >
          <div className="mx-auto flex h-16 max-w-[var(--maxw)] items-center justify-between px-[var(--pad)]">
            <Link href="/" className="flex items-center gap-2.5" aria-label={company.nameKo}>
              <Logo size={36} priority className="h-9 w-9" />
              <span className="flex flex-col leading-none">
                <span className="text-[17px] font-bold tracking-[-0.045em] text-ink">
                  중앙이엔비
                </span>
                <span className="cap-xs mt-1 text-[8.5px] tracking-[0.1em] text-mute">
                  {company.nameEnShort}
                </span>
              </span>
            </Link>

            <nav className="hidden h-full items-stretch lg:flex">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHovered(item.en)}
                  className="relative flex items-center px-5 text-[16px] font-bold text-body transition-colors hover:text-ink"
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-4 bottom-0 h-[3px] bg-primary transition-transform duration-300 ${
                      isActive(item.href) || hovered === item.en ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/contact" className="btn btn-primary btn-sm hidden md:inline-flex">
                견적 문의
              </Link>

              <button
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
                aria-expanded={open}
                className="relative z-110 flex h-11 w-11 flex-col items-center justify-center gap-[6px] rounded-xs border border-hairline lg:hidden"
              >
                <span
                  className={`block h-[2px] w-4 bg-ink transition-transform duration-300 ${
                    open ? "translate-y-[4px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-[2px] w-4 bg-ink transition-transform duration-300 ${
                    open ? "-translate-y-[4px] -rotate-45" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* 데스크톱 드롭다운 — soft 서페이스 */}
          <div
            className={`hidden overflow-hidden bg-soft transition-[max-height] duration-300 lg:block ${
              openItem ? "max-h-60 border-t border-hairline" : "max-h-0"
            }`}
          >
            <div className="mx-auto flex max-w-[var(--maxw)] gap-14 px-[var(--pad)] py-8">
              <div className="w-52 shrink-0">
                <p className="cap text-mute">{openItem?.en}</p>
                <p className="h4 mt-2 text-ink">{openItem?.label}</p>
              </div>
              <ul className="flex flex-wrap gap-x-10 gap-y-4">
                {openItem?.children?.map((c) => (
                  <li key={c.href}>
                    <Link
                      href={c.href}
                      className="group flex items-center gap-2.5 text-[16px] font-bold text-body hover:text-ink"
                    >
                      <span className="h-2.5 w-0 bg-primary transition-all duration-300 group-hover:w-2.5" />
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </header>
      </div>

      {/* 모바일 드로어 */}
      <div
        className={`fixed inset-0 z-90 bg-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto px-[var(--pad)] pt-20 pb-10">
          <nav className="flex-1">
            {nav.map((item, i) => (
              <div key={item.href} className="border-b border-hairline py-4">
                <Link href={item.href} className="flex items-baseline justify-between">
                  <span
                    className={`d3 ${isActive(item.href) ? "text-accent" : "text-ink"}`}
                  >
                    {item.label}
                  </span>
                  <span className="cap-xs text-mute">{String(i + 1).padStart(2, "0")}</span>
                </Link>
                {item.children && (
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} className="p-sm text-mute hover:text-accent">
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-8 space-y-4">
            <a href={`tel:${telDial}`} className="block">
              <span className="cap text-mute">TEL</span>
              <p className="num mt-2 text-3xl text-ink">{company.tel}</p>
            </a>
            <p className="p-sm text-mute">{company.address}</p>
            <Link href="/contact" className="btn btn-primary w-full">
              견적 문의하기
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
