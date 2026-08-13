import type { ReactNode } from "react";

type Props = {
  items: ReactNode[];
  duration?: number;
  reverse?: boolean;
  className?: string;
  sep?: ReactNode;
};

/**
 * 무한 가로 흐름 티커. items 를 2번 렌더해 -50% 로 이동시킨다.
 * items 가 적으면 한 벌의 폭이 화면보다 좁아져 오른쪽이 비고 왼쪽에 쏠려 보이므로,
 * 최소 슬롯 수(MIN_SLOTS)를 채우도록 items 를 반복하고, 속도가 빨라지지 않게
 * duration 도 반복 배수만큼 함께 늘린다.
 */
const MIN_SLOTS = 8;

export default function Marquee({
  items,
  duration = 34,
  reverse = false,
  className = "",
  sep,
}: Props) {
  const repeat = Math.max(1, Math.ceil(MIN_SLOTS / items.length));
  const filled = Array.from({ length: repeat }, () => items).flat();
  const effectiveDuration = duration * repeat;

  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === "b"}>
      {filled.map((it, i) => (
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
        style={{ ["--dur" as string]: `${effectiveDuration}s` }}
      >
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
