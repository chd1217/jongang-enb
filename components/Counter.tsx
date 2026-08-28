"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  to: number;
  duration?: number;
  className?: string;
  /** 카운트업 중 아직 채워지지 않은 부분의 스타일 (기본: 옅은 헤어라인 톤 고스트) */
  mutedClassName?: string;
  decimals?: number;
  /** 마지막 숫자 직전(to-1)에서 멈췄다가(ms) 최종값으로 넘어가게 한다. 예: 99에서 잠깐 멈췄다가 100. */
  pauseBeforeEnd?: number;
};

/**
 * 뷰포트 진입 시 0 → to 로 카운트업.
 * 숫자가 올라가는 진행률만큼 아래에서 위로 컬러가 차오르며,
 * 진행률이 낮을 땐 옅은 고스트 상태로 보이다가 값이 커질수록 진해져
 * 마지막에 최종 색상으로 자리잡는다.
 */
export default function Counter({
  to,
  duration = 2600,
  className = "",
  mutedClassName = "text-hairline",
  decimals = 0,
  pauseBeforeEnd = 0,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(to);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || done.current) return;
        done.current = true;
        io.disconnect();

        const target = pauseBeforeEnd > 0 ? to - 1 : to;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 4);
          setVal(target * eased);
          if (p < 1) {
            requestAnimationFrame(tick);
          } else if (pauseBeforeEnd > 0) {
            setTimeout(() => setVal(to), pauseBeforeEnd);
          }
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [to, duration, pauseBeforeEnd]);

  const fmt = (n: number) =>
    n.toLocaleString("ko-KR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  const text = fmt(val);
  const progress = to !== 0 ? Math.min(1, Math.max(0, val / to)) : 1;

  return (
    <>
      <span ref={ref} aria-hidden="true" className="relative inline-block">
        {/* 고스트 레이어 — 항상 표시되어 숫자 자릿수 자리를 잡아준다 */}
        <span className={mutedClassName}>{text}</span>
        {/* 컬러 레이어 — 진행률만큼 아래에서 위로 드러난다 */}
        <span
          className={`absolute inset-0 ${className}`}
          style={{ clipPath: `inset(${(1 - progress) * 100}% 0 0 0)` }}
        >
          {text}
        </span>
      </span>
      <span className="sr-only">{fmt(to)}</span>
    </>
  );
}
