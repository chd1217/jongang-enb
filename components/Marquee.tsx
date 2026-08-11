import type { ReactNode } from "react";

type Props = {
  items: ReactNode[];
  duration?: number;
  reverse?: boolean;
  className?: string;
  sep?: ReactNode;
};

/** 무한 가로 흐름 티커. items 를 2번 렌더해 -50% 로 이동시킨다. */
export default function Marquee({
  items,
  duration = 34,
  reverse = false,
  className = "",
  sep,
}: Props) {
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === "b"}>
      {items.map((it, i) => (
        <span key={i} className="flex shrink-0 items-center">
          <span className="px-6 md:px-9">{it}</span>
          <span className="shrink-0 opacity-40">
            {sep ?? <span className="block h-2 w-2 bg-primary" />}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`mq-pause flex overflow-hidden ${className}`}>
      <div
        className={`mq flex min-w-max ${reverse ? "mq-rev" : ""}`}
        style={{ ["--dur" as string]: `${duration}s` }}
      >
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
