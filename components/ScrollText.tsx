"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  className?: string;
  /** 강조할 단어 (해당 단어는 시그널 컬러) */
  highlight?: string[];
};

/**
 * 스크롤 진행도에 따라 단어가 순차적으로 밝아지는 문단.
 * 요소가 뷰포트 하단 → 상단으로 지나는 동안 0 → 1 로 진행.
 */
export default function ScrollText({ text, className = "", highlight = [] }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [p, setP] = useState(0);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(1);
      return;
    }

    let raf = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 요소 상단이 화면 85% 지점에 올 때 시작, 35% 지점에서 완료
      const raw = (vh * 0.85 - r.top) / (vh * 0.5 + r.height * 0.4);
      setP(Math.max(0, Math.min(1, raw)));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        const local = Math.max(0, Math.min(1, (p - start) * words.length * 0.55 + 0.15));
        const isHi = highlight.some((h) => w.includes(h));
        return (
          <span
            key={i}
            style={{
              opacity: 0.16 + local * 0.84,
              color: isHi && local > 0.6 ? "var(--color-signal)" : undefined,
              transition: "color 400ms ease",
            }}
          >
            {w}{" "}
          </span>
        );
      })}
    </p>
  );
}
