"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  to: number;
  duration?: number;
  className?: string;
  decimals?: number;
  /** 마지막 숫자 직전(to-1)에서 멈췄다가(ms) 최종값으로 넘어가게 한다. 예: 99에서 잠깐 멈췄다가 100. */
  pauseBeforeEnd?: number;
};

/** 뷰포트 진입 시 0 → to 로 카운트업. */
export default function Counter({
  to,
  duration = 2600,
  className = "",
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

  return (
    <span ref={ref} className={className}>
      {val.toLocaleString("ko-KR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  );
}
