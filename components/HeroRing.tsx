"use client";

import { useEffect, useState } from "react";

const NODES = [
  { label: "반입 · 계량", short: "01" },
  { label: "선별 야적", short: "02" },
  { label: "1차 파쇄", short: "03" },
  { label: "2차 파쇄", short: "04" },
  { label: "입도 분리", short: "05" },
  { label: "품질 · 출하", short: "06" },
];

/** 히어로 그래픽 — 자원순환 공정 링. 노드가 순차적으로 점등된다. */
export default function HeroRing() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((v) => (v + 1) % NODES.length), 1600);
    return () => clearInterval(id);
  }, []);

  const R = 128;
  const cx = 180;
  const cy = 180;

  return (
    <div className="relative aspect-square w-full max-w-[420px]">
      <svg viewBox="0 0 360 360" className="h-full w-full overflow-visible">
        {/* 외곽 회전 대시 링 — 심볼 블루 */}
        <circle
          cx={cx}
          cy={cy}
          r={168}
          fill="none"
          stroke="#1f7fd6"
          strokeWidth="1.5"
          strokeDasharray="2 8"
          style={{ transformOrigin: "180px 180px", animation: "spin-ring 40s linear infinite" }}
        />
        <circle cx={cx} cy={cy} r={152} fill="none" stroke="#333" strokeWidth="1" />
        <circle
          cx={cx}
          cy={cy}
          r={R}
          fill="none"
          stroke="#5e5e5e"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <circle cx={cx} cy={cy} r={72} fill="none" stroke="#333" strokeWidth="1" />

        {/* 진행 호 */}
        <circle
          cx={cx}
          cy={cy}
          r={R}
          fill="none"
          stroke="#6cc44f"
          strokeWidth="2"
          strokeDasharray={`${(2 * Math.PI * R) / NODES.length - 14} ${2 * Math.PI * R}`}
          strokeDashoffset={-((2 * Math.PI * R) / NODES.length) * active + 7}
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ transition: "stroke-dashoffset 700ms cubic-bezier(0.16,1,0.3,1)" }}
        />

        {/* 노드 */}
        {NODES.map((n, i) => {
          const a = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
          const x = cx + Math.cos(a) * R;
          const y = cy + Math.sin(a) * R;
          const on = i === active;
          return (
            <g key={n.short}>
              <line
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke={on ? "#6cc44f" : "#2b2b2b"}
                strokeWidth="1"
                style={{ transition: "stroke 500ms ease" }}
              />
              <rect
                x={x - 7}
                y={y - 7}
                width="14"
                height="14"
                fill={on ? "#6cc44f" : "#000"}
                stroke={on ? "#6cc44f" : "#5e5e5e"}
                strokeWidth="1.5"
                style={{ transition: "all 500ms ease" }}
              />
              <text
                x={x + (Math.cos(a) > 0.1 ? 18 : Math.cos(a) < -0.1 ? -18 : 0)}
                y={y + (Math.abs(Math.cos(a)) < 0.1 ? (Math.sin(a) > 0 ? 28 : -18) : 4)}
                textAnchor={Math.cos(a) > 0.1 ? "start" : Math.cos(a) < -0.1 ? "end" : "middle"}
                fill={on ? "#ffffff" : "#898989"}
                style={{ transition: "fill 500ms ease" }}
                fontSize="11.5"
                fontWeight="700"
                letterSpacing="0.02em"
              >
                {n.label}
              </text>
            </g>
          );
        })}

        {/* 중앙 */}
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          fill="#ffffff"
          fontSize="34"
          fontWeight="800"
          letterSpacing="-0.04em"
        >
          98.2%
        </text>
        <text
          x={cx}
          y={cy + 18}
          textAnchor="middle"
          fill="#898989"
          fontSize="11"
          fontWeight="700"
          letterSpacing="0.14em"
        >
          RECOVERY RATE
        </text>
      </svg>

      <style>{`@keyframes spin-ring { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
