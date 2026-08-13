/** DB 클라이언트(pg)와 분리된 상태값 정의. 브라우저(클라이언트 컴포넌트)에서도 안전하게 import할 수 있다. */
export const STATUSES = ["접수완료", "상담중", "처리완료"] as const;
export type Status = (typeof STATUSES)[number];
