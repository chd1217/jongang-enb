"use client";

import { useEffect, useRef } from "react";

const LIGHT = "var(--color-cursor-light)"; // 밝은 배경 → 브랜드 그린
const DARK = "var(--color-cursor-dark)"; // 어두운 배경 → 심볼 블루

/** 커서 아래에서 처음 만나는 불투명 배경색을 찾는다. */
function backdropOf(el: Element | null): [number, number, number] {
  let node: Element | null = el;
  while (node && node !== document.documentElement) {
    const bg = getComputedStyle(node).backgroundColor;
    const m = bg.match(/rgba?\(([^)]+)\)/);
    if (m) {
      const parts = m[1].split(",").map((v) => parseFloat(v));
      const alpha = parts.length > 3 ? parts[3] : 1;
      if (alpha > 0.5) return [parts[0], parts[1], parts[2]];
    }
    node = node.parentElement;
  }
  return [255, 255, 255];
}

/** WCAG 상대 휘도. 임계값 아래면 '어두운 배경'으로 본다. */
function isDark([r, g, b]: [number, number, number]) {
  const lin = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  // 0.45 기준이면 블랙 챕터(0)뿐 아니라 그린 CTA(0.26) 위에서도 블루로 전환돼
  // 커서가 배경에 묻히지 않는다.
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b) < 0.45;
}

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    document.documentElement.classList.add("hide-cursor");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let scale = 1;
    let scaleTarget = 1;
    let raf = 0;
    let frame = 0;
    let dark: boolean | null = null;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const el = e.target as HTMLElement | null;
      scaleTarget = el?.closest?.(
        'a, button, input, textarea, select, [role="button"], [data-cursor]',
      )
        ? 3
        : 1;
    };

    const paint = (next: boolean) => {
      if (next === dark) return;
      dark = next;
      const color = next ? DARK : LIGHT;
      dot.current?.style.setProperty("--c", color);
      ring.current?.style.setProperty("--c", color);
    };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.17;
      pos.y += (target.y - pos.y) * 0.17;
      scale += (scaleTarget - scale) * 0.14;

      if (dot.current) {
        dot.current.style.transform = `translate3d(${target.x - 3}px, ${target.y - 3}px, 0)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${pos.x - 14}px, ${pos.y - 14}px, 0) scale(${scale.toFixed(3)})`;
      }

      // 배경 판정은 6프레임(약 10회/초)마다 — elementFromPoint 비용 절감
      if (++frame % 6 === 0) {
        paint(isDark(backdropOf(document.elementFromPoint(target.x, target.y))));
      }

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("hide-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot hidden h-1.5 w-1.5 md:block" aria-hidden />
      <div ref={ring} className="cursor-dot cursor-ring hidden h-7 w-7 md:block" aria-hidden />
    </>
  );
}
