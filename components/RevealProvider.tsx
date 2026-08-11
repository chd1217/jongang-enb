"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = ".rv, .rv-clip, .rv-rule, .rv-curtain, .mask-line, [data-rv]";

/**
 * 전역 스크롤 리빌. 서버 컴포넌트에서 클래스만 붙이면 동작한다.
 *  - .rv / .rv-clip / .rv-rule / .rv-curtain / .mask-line
 *  - data-d="120" 로 개별 딜레이(ms) 지정
 *  - 부모에 data-stagger="80" 이면 자식 .mask-line 을 순차 지연
 */
export default function RevealProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 부모 data-stagger → 자식 딜레이 계산
    document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((parent) => {
      const step = Number(parent.dataset.stagger) || 80;
      parent.querySelectorAll<HTMLElement>(".mask-line, .rv").forEach((child, i) => {
        if (!child.style.getPropertyValue("--d")) {
          child.style.setProperty("--d", `${i * step}ms`);
        }
      });
    });

    const nodes = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));

    nodes.forEach((el) => {
      if (el.dataset.d) el.style.setProperty("--d", `${el.dataset.d}ms`);
    });

    if (reduce) {
      nodes.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    nodes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
