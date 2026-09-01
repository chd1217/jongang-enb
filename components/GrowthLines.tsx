"use client";

/**
 * [진단 테스트용 임시 버전]
 * 원래의 성장 라인 그래픽 대신, 이 위치에 뭐라도 보이는지 확인하기 위한
 * 새빨간 불투명 블록. 이게 안 보이면 그래픽 디자인 문제가 아니라
 * 배포/캐시/환경 문제라는 뜻이다.
 */
export default function GrowthLines({ side }: { side: "left" | "right" }) {
  return (
    <div
      aria-hidden
      className={
        "pointer-events-none absolute top-0 bottom-0 w-[60px]" +
        (side === "right" ? " right-0" : " left-0")
      }
      style={{
        backgroundColor: "#ff00ff",
        zIndex: 999,
      }}
    />
  );
}
