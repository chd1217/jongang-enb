"use client";

import { useEffect, useState } from "react";

/**
 * 히어로 좌우 여백을 채우는 추상 "성장" 라인 그래픽.
 * 폭을 실제 콘텐츠 좌우 패딩(--pad)에 맞춰 화면 크기와 무관하게 노출된다.
 */
export default function GrowthLines({ side }: { side: "left" | "right" }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const t = setTimeout(() => setOn(true), 300);
    return () => clearTimeout(t);
  }, []);

  const flip = side === "right" ? " scale-x-[-1]" : "";
  const ease = "cubic-bezier(0.16,1,0.3,1)";

  const paths = [
    {
      d: "M7,620 L7,430 L19,380 L19,250 L10,200 L10,70 M19,340 L31,290 L31,150 M10,160 L2,120 M19,260 L8,210",
      stroke: "#6cc44f",
      len: 900,
      delay: 0.1,
    },
    { d: "M31,190 L40,150 L40,40", stroke: "#1f7fd6", len: 180, delay: 0.5 },
  ];

  const nodes = [
    { x: 6, y: 63, c: "#6cc44f", d: 0.55 },
    { x: 27, y: 143, c: "#6cc44f", d: 0.8 },
    { x: 36, y: 33, c: "#1f7fd6", d: 1.05 },
    { x: -2, y: 113, c: "#6cc44f", d: 0.7 },
  ];

  return (
    <svg
      aria-hidden
      viewBox="0 0 48 620"
      preserveAspectRatio="xMinYMax meet"
      className={
        "pointer-events-none absolute bottom-0 z-[1] block h-full" +
        (side === "right" ? " right-0" : " left-0") +
        flip
      }
      style={{ width: "calc(var(--pad) * 1.3)" }}
    >
      <g fill="none" strokeWidth="3" strokeLinecap="square">
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            stroke={p.stroke}
            style={{
              opacity: 1,
              strokeDasharray: p.len,
              strokeDashoffset: on ? 0 : p.len,
              transition: `stroke-dashoffset 1.8s ${ease} ${p.delay}s`,
            }}
          />
        ))}
      </g>

      {nodes.map((n, i) => (
        <rect
          key={i}
          x={n.x}
          y={n.y}
          width="9"
          height="9"
          fill={n.c}
          style={{
            opacity: on ? 1 : 0,
            transform: on ? "scale(1)" : "scale(0.3)",
            transformOrigin: "center",
            transformBox: "fill-box",
            transition: `opacity 0.5s ${ease} ${n.d}s, transform 0.5s ${ease} ${n.d}s`,
          }}
        />
      ))}
    </svg>
  );
}
