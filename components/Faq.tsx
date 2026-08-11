"use client";

import { useState } from "react";
import { faqs } from "@/lib/site";

/** 아코디언 FAQ. 답변은 항상 DOM 에 존재해 검색·AI 요약에 노출된다. */
export default function Faq({ limit }: { limit?: number }) {
  const [open, setOpen] = useState<number | null>(0);
  const list = limit ? faqs.slice(0, limit) : faqs;

  return (
    <div className="border-t border-hairline">
      {list.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-b border-hairline">
            <h3>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="group flex w-full items-start gap-4 py-6 text-left md:gap-8"
              >
                <span className={`mt-1 shrink-0 text-[13px] font-bold ${isOpen ? "accent" : "text-mute"}`}>
                  Q{String(i + 1).padStart(2, "0")}
                </span>

                <span
                  className={`h4 flex-1 transition-colors ${isOpen ? "text-ink" : "text-body group-hover:text-ink"}`}
                >
                  {f.q}
                </span>

                <span
                  className={`relative mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xs border transition-colors ${
                    isOpen ? "border-primary bg-primary text-black" : "border-hairline text-ink"
                  }`}
                >
                  <span className="absolute h-[2px] w-3 bg-current" />
                  <span
                    className={`absolute h-3 w-[2px] bg-current transition-transform duration-300 ${
                      isOpen ? "scale-y-0" : "scale-y-100"
                    }`}
                  />
                </span>
              </button>
            </h3>

            <div
              className={`grid transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="p-md max-w-3xl pb-7 text-body md:pl-[calc(2.5rem+2rem)]">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
