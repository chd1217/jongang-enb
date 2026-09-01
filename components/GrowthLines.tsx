"use client";

import { useEffect, useState } from "react";

/**
 * 히어로 좌우 여백을 채우는 추상 "성장" 라인 그래픽.
 * HeroRing과 같은 톤(각진 스퀘어 노드, 그린/블루 라인)으로 그려서
 * 순환 자원 · 탄소 절감이라는 주제를 은은하게 암시한다.
 *
 * 폭을 실제 콘텐츠 좌우 패딩(--pad, 1.25rem~3rem)에 정확히 맞춰서
 * 화면 크기와 무관하게 항상 패딩 여백 안쪽에만 그려진다.
 *
 * 리빌 애니메이션은 data-* 속성 + CSS 선택자 방식 대신, React 상태값을
 * 인라인 스타일로 직접 계산해 넣는다 (CSS 특이도/커스텀 프로퍼티 조합에
 * 따라 속성 선택자 오버라이드가 먹지 않는 경우가 있어 더 확실한 방식 사용).
 */
export default function GrowthLines({ side }: { side: "left" | "right" }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const t = setTimeout(() => setOn(true), 500);
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
    { x: 7, y: 64, c: "#6cc44f", d: 0.55 },
    { x: 28, y: 144, c: "#6cc44f", d: 0.8 },
    { x: 37, y: 34, c: "#1f7fd6", d: 1.05 },
    { x: -1, y: 114, c: "#6cc44f", d: 0.7 },
  ];

  return (
    <svg
      aria-hidden
      viewBox="0 0 48 620"
      preserveAspectRatio="xMinYMax meet"
      className={
        "pointer-events-none absolute bottom-0 -z-10 block h-full" +
        (side === "right" ? " right-0" : " left-0") +
        flip
      }
      style={{ width: "var(--pad)" }}
    >
      <g fill="none" strokeWidth="2.2" strokeLinecap="square">
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            stroke={p.stroke}
            style={{
              opacity: 0.68,
              strokeDasharray: p.len,
              strokeDashoffset: on ? 0 : p.len,
              transition: `stroke-dashoffset 2.2s ${ease} ${p.delay}s`,
            }}
          />
        ))}
      </g>

      {nodes.map((n, i) => (
        <rect
          key={i}
          x={n.x}
          y={n.y}
          width="7"
          height="7"
          fill={n.c}
          style={{
            opacity: on ? 0.78 : 0,
            transform: on ? "scale(1)" : "scale(0.3)",
            transformOrigin: "center",
            transformBox: "fill-box",
            transition: `opacity 0.6s ${ease} ${n.d}s, transform 0.6s ${ease} ${n.d}s`,
          }}
        />
      ))}
    </svg>
  );
}
