"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { telDial } from "@/lib/site";

/** Public mobile pages only. Keep the quote form and soft keyboard unobstructed. */
export default function MobileContactBar() {
  const pathname = usePathname();
  const [formVisible, setFormVisible] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const target = document.getElementById("quote-form");
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting));
    observer.observe(target);
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;
    const update = () => {
      const editing = document.activeElement?.matches("input, textarea, select, [contenteditable=true]");
      setKeyboardOpen(Boolean(editing && window.innerHeight - viewport.height > 120));
    };
    viewport.addEventListener("resize", update);
    document.addEventListener("focusin", update);
    document.addEventListener("focusout", update);
    return () => {
      viewport.removeEventListener("resize", update);
      document.removeEventListener("focusin", update);
      document.removeEventListener("focusout", update);
    };
  }, []);

  const hidden = keyboardOpen || (pathname === "/contact" && formVisible);
  return (
    <>
      <div className="mobile-contact-space" aria-hidden="true" />
      <nav className="mobile-contact-bar" aria-label="빠른 상담" hidden={hidden}>
        <a href={`tel:${telDial}`} className="mobile-contact-call" aria-label="전화 상담: 대표번호 041-858-9701">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m8 3 3 5-3 2a14 14 0 0 0 6 6l2-3 5 3-1 4c-9 2-19-8-17-17Z" strokeLinejoin="round" /></svg>
          전화 상담
        </a>
        <Link href={pathname === "/contact" ? "#quote-form" : "/contact#quote-form"} className="mobile-contact-quote">
          견적 문의
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6" /></svg>
        </Link>
      </nav>
    </>
  );
}
