"use client";

import { useEffect, useRef, useState } from "react";
import { processSteps } from "@/lib/site";

/** 세로 스크롤로 구동되는 가로 핀 섹션 (처리 공정 6단계). */
export default function HorizontalProcess() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const [p, setP] = useState(0);
  const [mobile, setMobile] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
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

  const cards = processSteps.map((s, i) => (
    <article
      key={s.no}
      className="corner card flex h-full w-[82vw] shrink-0 flex-col justify-between p-7 sm:w-[400px] md:p-9 lg:w-[26vw] lg:min-w-[320px]"
    >
      <div className="flex items-start justify-between pt-3">
        <span className="num text-[3.5rem] text-hairline">{s.no}</span>
        <span className="cap-xs text-mute">STEP</span>
      </div>
      <div className="mt-10">
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
  ));

  if (mobile) {
    return (
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--pad)] pb-6">
        {cards.map((c, i) => (
          <div key={i} className="snap-start">
            {c}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={wrap} style={{ height: `${processSteps.length * 56}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
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
