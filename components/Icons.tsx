type P = { className?: string };
const base = "h-6 w-6";
const s = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
};

/** 파쇄 — 크러셔 조 */
export function IconCrusher({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M3 3h6l2 6H5L3 3Z" {...s} />
      <path d="M21 3h-6l-2 6h6l2-6Z" {...s} />
      <path d="M8 13h8l-1.5 8h-5L8 13Z" {...s} />
    </svg>
  );
}

/** 선별 — 진동 스크린 */
export function IconScreen({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M3 6h18M3 12h18M3 18h18" {...s} />
      <path d="M7 3v3M13 3v3M10 9v3M17 9v3M6 15v3M15 15v3" {...s} />
    </svg>
  );
}

/** 운반 — 암롤 트럭 */
export function IconTruck({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M2 7h10v9H2V7Z" {...s} />
      <path d="M12 10h5l4 4v2h-9v-6Z" {...s} />
      <circle cx="6" cy="19" r="2" {...s} />
      <circle cx="17" cy="19" r="2" {...s} />
    </svg>
  );
}

/** 파쇄품 — 규격별 파쇄품 더미 */
export function IconAggregate({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 3 20 17H4L12 3Z" {...s} />
      <path d="M8.5 11h7" {...s} />
      <path d="M2 21h20" {...s} />
    </svg>
  );
}

/** 계량 — 트럭 스케일 */
export function IconScale({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 3v18" {...s} />
      <path d="M4 7h16" {...s} />
      <path d="M7 7 4 14h6L7 7Z" {...s} />
      <path d="M17 7l-3 7h6l-3-7Z" {...s} />
    </svg>
  );
}

/** 서류 — 처리확인서 */
export function IconDoc({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M5 2h9l5 5v15H5V2Z" {...s} />
      <path d="M14 2v5h5" {...s} />
      <path d="M8.5 12h7M8.5 16h7" {...s} />
    </svg>
  );
}

/** 인증 — 품질 인증 */
export function IconCert({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 2 20 5v7c0 5-3.5 8.3-8 10-4.5-1.7-8-5-8-10V5l8-3Z" {...s} />
      <path d="m8.5 11.5 2.5 2.5 4.5-4.5" {...s} />
    </svg>
  );
}

/** 환경 — 비산먼지 저감 */
export function IconEnv({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 21c5-3 8-7 8-11V4l-8 2-8-2v6c0 4 3 8 8 11Z" {...s} />
      <path d="M12 21V8" {...s} />
    </svg>
  );
}

/** 순환 — 자원순환 */
export function IconCycle({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 3 15 8H9l3-5Z" {...s} />
      <path d="M4 18l3-5 3 5H4Z" {...s} />
      <path d="M20 18h-6l3-5 3 5Z" {...s} />
      <path d="M9 8 6 13M15 8l3 5M8 18h8" {...s} />
    </svg>
  );
}
