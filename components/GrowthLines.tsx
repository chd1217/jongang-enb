"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 히어로 좌우 여백을 채우는 추상 "성장" 라인 그래픽.
 * HeroRing과 같은 톤(각진 스퀘어 노드, 그린/블루 라인)으로 그려서
 * 순환 자원 · 탄소 절감이라는 주제를 은은하게 암시한다.
 *
 * 폭을 실제 콘텐츠 좌우 패딩(--pad, 1.25rem~3rem)에 정확히 맞춰서
 * 화면 크기와 무관하게 항상 패딩 여백 안쪽에만 그려지므로, 브레이크포인트로
 * 숨길 필요 없이 어떤 화면에서도 텍스트를 가리지 않고 항상 노출된다.
 */
export default function GrowthLines({ side }: { side: "left" | "right" }) {
  const ref = useRef<SVGSVGElement>(null);
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

  return (
    <svg
      ref={ref}
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
      <g fill="none" strokeWidth="1.5" strokeLinecap="square">
        <path
          d="M7,620 L7,430 L19,380 L19,250 L10,200 L10,70
             M19,340 L31,290 L31,150
             M10,160 L2,120
             M19,260 L8,210"
          stroke="#6cc44f"
          className="growth-draw"
          style={{ transitionDelay: "0.1s", ["--len" as string]: 900 } as React.CSSProperties}
          data-on={on || undefined}
        />
        <path
          d="M31,190 L40,150 L40,40"
          stroke="#1f7fd6"
          className="growth-draw"
          style={{ transitionDelay: "0.5s", ["--len" as string]: 180 } as React.CSSProperties}
          data-on={on || undefined}
        />
      </g>

      {[
        { x: 7, y: 64, c: "#6cc44f", d: 0.55 },
        { x: 28, y: 144, c: "#6cc44f", d: 0.8 },
        { x: 37, y: 34, c: "#1f7fd6", d: 1.05 },
        { x: -1, y: 114, c: "#6cc44f", d: 0.7 },
      ].map((n, i) => (
        <rect
          key={i}
          x={n.x}
          y={n.y}
          width="7"
          height="7"
          fill={n.c}
          className="growth-node"
          style={{ transitionDelay: `${n.d}s` }}
          data-on={on || undefined}
        />
      ))}
    </svg>
  );
}
