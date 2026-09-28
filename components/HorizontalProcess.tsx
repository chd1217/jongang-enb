"use client";

import { useEffect, useRef, useState } from "react";
import { processSteps } from "@/lib/site";
import { IconTruck, IconScreen, IconCrusher, IconCert, IconScale } from "./Icons";

const STEP_ICONS = [IconTruck, IconScreen, IconCrusher, IconCert, IconScale];

/** PC 스크롤 진행 및 모바일 스냅 이동에 연동되는 5단계 공정. */
export default function HorizontalProcess() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const [p, setP] = useState(0);
  const [mobile, setMobile] = useState(true);
  const [mobileActive, setMobileActive] = useState(0);
  const [hasSwiped, setHasSwiped] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px), (prefers-reduced-motion: reduce)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (mobile) return;
    const el = wrap.current;
    const tr = track.current;
    if (!el || !tr) return;

    let raf = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const r = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      const prog = Math.max(0, Math.min(1, -r.top / Math.max(scrollable, 1)));
      const distance = Math.max(tr.scrollWidth - window.innerWidth + 48, 0);
      setP(prog);
      setX(-prog * distance);
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
  }, [mobile]);

  const active = mobile ? mobileActive : Math.min(processSteps.length - 1, Math.floor(p * processSteps.length));

  const cards = processSteps.map((s, i) => {
    const Icon = STEP_ICONS[i] ?? IconCrusher;
    return (
      <article
        key={s.no}
        className="corner card process-card flex h-full w-[82vw] shrink-0 flex-col p-7 sm:w-[400px] md:p-9 lg:w-[26vw] lg:min-w-[320px]"
        data-active={i === active}
        aria-current={i === active ? "step" : undefined}
      >
        <div className="flex items-start justify-between pt-3">
          <span className="process-number num text-[3.5rem] text-hairline">{s.no}</span>
          <span className="cap-xs text-mute">STEP</span>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <Icon className="process-icon h-16 w-16 text-primary/15 md:h-20 md:w-20" />
        </div>
        <div>
          <h3 className="d3 text-ink">{s.title}</h3>
          <p className="p-md mt-4 text-body">{s.desc}</p>
          <div className="mt-7 h-[3px] w-full bg-soft">
            <div
              className="h-[3px] bg-primary"
              style={{ width: `${((i + 1) / processSteps.length) * 100}%` }}
            />
          </div>
        </div>
      </article>
    );
  });

  if (mobile) {
    return (
      <div>
      <p className={`process-swipe-hint mb-4 px-[var(--pad)] text-[12px] text-mute ${hasSwiped ? "opacity-0" : "opacity-100"}`} aria-hidden={hasSwiped}>
        옆으로 넘겨 확인하세요 <span aria-hidden>→</span>
      </p>
      <div
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--pad)] pb-6"
        role="region"
        style={{ scrollPaddingInline: "var(--pad)" }}
        aria-label="5단계 처리 공정. 좌우 방향키로 이동할 수 있습니다."
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
          event.preventDefault();
          const el = event.currentTarget;
          const stride = (el.firstElementChild?.getBoundingClientRect().width ?? 320) + 16;
          el.scrollBy({ left: event.key === "ArrowRight" ? stride : -stride, behavior: "auto" });
        }}
        onScroll={(event) => {
          const el = event.currentTarget;
          const stride = (el.firstElementChild?.getBoundingClientRect().width ?? 320) + 16;
          const last = el.scrollLeft >= el.scrollWidth - el.clientWidth - 2;
          setMobileActive(last ? processSteps.length - 1 : Math.max(0, Math.min(processSteps.length - 1, Math.round(el.scrollLeft / stride))));
          if (el.scrollLeft > 24) setHasSwiped(true);
        }}
      >
        {cards.map((c, i) => (
          <div key={i} className="shrink-0 snap-start">
            {c}
          </div>
        ))}
      </div>
      <p className="px-[var(--pad)] pb-6 text-right text-[12px] text-mute" aria-live="polite" aria-atomic="true">
        <span className="font-bold accent">{String(active + 1).padStart(2, "0")}</span> / {String(processSteps.length).padStart(2, "0")}
      </p>
      </div>
    );
  }

  return (
    <div ref={wrap} style={{ height: `${processSteps.length * 56}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* 5단계 연결 타임라인 */}
        <div className="mx-auto mb-10 hidden w-full max-w-[var(--maxw)] px-[var(--pad)] lg:block">
          <div className="relative flex items-start justify-between">
            <div className="absolute inset-x-0 top-[6px] h-px bg-hairline" aria-hidden />
            <div
              className="absolute inset-y-0 top-[6px] left-0 h-px bg-primary transition-[width] duration-500 ease-out"
              style={{ width: `${(active / (processSteps.length - 1)) * 100}%` }}
              aria-hidden
            />
            {processSteps.map((s, i) => {
              const on = i <= active;
              return (
                <div
                  key={s.no}
                  className="relative flex flex-col items-center gap-3 px-2 text-center"
                  style={{ width: `${100 / processSteps.length}%` }}
                >
                  <span
                    className={`block h-3.5 w-3.5 shrink-0 border transition-colors duration-300 ${
                      on ? "border-primary bg-primary" : "border-hairline bg-white"
                    }`}
                  />
                  <span
                    className={`text-[15px] leading-snug font-bold transition-colors duration-300 ${on ? "text-ink" : "text-mute"}`}
                  >
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div
          ref={track}
          className="flex gap-5 pl-[max(var(--pad),calc((100vw-var(--maxw))/2+var(--pad)))]"
          style={{ transform: `translate3d(${x}px,0,0)`, height: "clamp(360px, 52vh, 440px)" }}
        >
          {cards}
        </div>

        <div className="mx-auto mt-10 flex w-full max-w-[var(--maxw)] items-center gap-5 px-[var(--pad)]">
          <span className="text-[13px] font-bold accent">01</span>
          <div className="h-[3px] flex-1 bg-soft">
            <div className="h-[3px] bg-primary" style={{ width: `${p * 100}%` }} />
          </div>
          <span className="text-[13px] font-bold text-mute">
            {String(processSteps.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
