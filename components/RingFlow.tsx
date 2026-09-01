"use client";

import { useEffect, useState } from "react";

/**
 * HeroRing(ALLBARO SYNC) 바로 아래에서 아래로 흘러내리는 장식 그래픽.
 * "처리 공정(링) → 그 결과(탄소 절감 지표)"를 시각적으로 이어준다.
 * 얇은 곡선 + 끝점의 은은한 글로우로 각진 사이트 톤과는 다른,
 * 부드럽고 정교한 느낌을 의도적으로 준다.
 */
export default function RingFlow() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const t = setTimeout(() => setOn(true), 900);
    return () => clearTimeout(t);
  }, []);

  const ease = "cubic-bezier(0.16,1,0.3,1)";

  const strands = [
    {
      d: "M150,0 C143,46 118,64 100,100 C90,120 84,150 80,196",
      stroke: "#6cc44f",
      len: 260,
      delay: 0,
      dot: { x: 80, y: 196 },
    },
    {
      d: "M150,0 C150,54 150,96 150,132 C150,168 150,200 150,232",
      stroke: "#1f7fd6",
      len: 260,
      delay: 0.18,
      dot: { x: 150, y: 232 },
    },
    {
      d: "M150,0 C157,46 182,64 200,100 C210,120 217,148 222,190",
      stroke: "#6cc44f",
      len: 260,
      delay: 0.36,
      dot: { x: 222, y: 190 },
    },
  ];

  return (
    <svg
      aria-hidden
      viewBox="0 0 300 240"
      className="pointer-events-none absolute top-full right-0 hidden h-[220px] w-[300px] lg:block"
      style={{ opacity: on ? 1 : 0, transition: `opacity 1.2s ${ease}` }}
    >
      <defs>
        {strands.map((s, i) => (
          <radialGradient key={i} id={`glow-${i}`}>
            <stop offset="0%" stopColor={s.stroke} stopOpacity="0.9" />
            <stop offset="100%" stopColor={s.stroke} stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>

      <g fill="none" strokeWidth="1.1" strokeLinecap="round" opacity="0.65">
        {strands.map((s, i) => (
          <path
            key={i}
            d={s.d}
            stroke={s.stroke}
            style={{
              strokeDasharray: s.len,
              strokeDashoffset: on ? 0 : s.len,
              transition: `stroke-dashoffset 2.4s ${ease} ${s.delay}s`,
            }}
          />
        ))}
      </g>

      {strands.map((s, i) => (
        <g key={i}>
          <circle
            cx={s.dot.x}
            cy={s.dot.y}
            r="9"
            fill={`url(#glow-${i})`}
            style={{
              opacity: on ? 1 : 0,
              transition: `opacity 0.8s ${ease} ${s.delay + 1.9}s`,
            }}
          />
          <circle
            cx={s.dot.x}
            cy={s.dot.y}
            r="2"
            fill={s.stroke}
            style={{
              opacity: on ? 0.9 : 0,
              transform: on ? "scale(1)" : "scale(0.2)",
              transformOrigin: `${s.dot.x}px ${s.dot.y}px`,
              transition: `opacity 0.5s ${ease} ${s.delay + 1.9}s, transform 0.5s ${ease} ${s.delay + 1.9}s`,
            }}
          />
        </g>
      ))}
    </svg>
  );
}
