"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 히어로 좌우 여백을 채우는 추상 "성장" 라인 그래픽.
 * HeroRing과 같은 톤(각진 스퀘어 노드, 그린/블루 라인)으로 그려서
 * 순환 자원 · 탄소 절감이라는 주제를 은은하게 암시한다.
 * 콘텐츠 폭(1280px) 바깥 여백에 배치되며 xl(1280px) 이상 화면에서 노출된다.
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
      viewBox="0 0 90 620"
      preserveAspectRatio="xMinYMax meet"
      className={
        "pointer-events-none absolute bottom-0 -z-10 hidden h-full w-[90px] xl:block" +
        (side === "right" ? " right-0" : " left-0") +
        flip
      }
    >
      <g fill="none" strokeWidth="2" strokeLinecap="square">
        <path
          d="M13,620 L13,430 L35,380 L35,250 L18,200 L18,70
             M35,340 L59,290 L59,150
             M18,160 L3,120
             M35,260 L15,210"
          stroke="#6cc44f"
          className="growth-draw"
          style={{ transitionDelay: "0.1s", ["--len" as string]: 900 } as React.CSSProperties}
          data-on={on || undefined}
        />
        <path
          d="M59,190 L75,150 L75,40"
          stroke="#1f7fd6"
          className="growth-draw"
          style={{ transitionDelay: "0.5s", ["--len" as string]: 180 } as React.CSSProperties}
          data-on={on || undefined}
        />
      </g>

      {[
        { x: 13, y: 64, c: "#6cc44f", d: 0.55 },
        { x: 53, y: 144, c: "#6cc44f", d: 0.8 },
        { x: 70, y: 34, c: "#1f7fd6", d: 1.05 },
        { x: -2, y: 114, c: "#6cc44f", d: 0.7 },
      ].map((n, i) => (
        <rect
          key={i}
          x={n.x}
          y={n.y}
          width="11"
          height="11"
          fill={n.c}
          className="growth-node"
          style={{ transitionDelay: `${n.d}s` }}
          data-on={on || undefined}
        />
      ))}
    </svg>
  );
}
