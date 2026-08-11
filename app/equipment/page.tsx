import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Eyebrow, MaskHeading, CtaStrip, NextLink } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { equipment } from "@/lib/site";

export const metadata: Metadata = {
  title: "보유 시설 · 장비",
  description:
    "죠크러셔·콘크러셔·진동스크린·자력선별기 등 파쇄·선별 설비와 굴착기·휠로더·암롤·덤프 등 중앙이앤비의 보유 장비 현황입니다.",
};

const groups = [
  { label: "파쇄 설비", match: ["파쇄", "입형"] },
  { label: "선별 설비", match: ["분리", "회수", "제거"] },
  { label: "중장비 · 차량", match: ["야적", "이송", "운반", "출하"] },
  { label: "부대 설비", match: ["저감", "계량"] },
];

export default function EquipmentPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "보유 시설·장비", href: "/equipment" }]} />

      <PageHero
        eyebrow="Facility"
        title="설비 규모가 곧 납기입니다"
        desc="파쇄·선별 설비와 수집운반 차량을 합쳐 40여 대를 운영합니다. 대량 반입에도 라인이 밀리지 않는 이유입니다."
        crumbs={[{ label: "보유 시설·장비", href: "/equipment" }]}
      />

      {/* 요약 지표 */}
      <section className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-20">
        <ul className="grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {[
            { v: "1,200", u: "톤/일", l: "일일 처리 능력" },
            { v: "40", u: "대", l: "보유 장비" },
            { v: "80", u: "톤", l: "트럭 스케일 용량" },
            { v: "12,000", u: "㎡", l: "부지 면적" },
          ].map((s, i) => (
            <li key={s.l} className="rv bg-white p-7" data-d={i * 70}>
              <p className="num text-[clamp(2rem,4vw,3rem)] text-ink">
                {s.v}
                <span className="text-[0.4em] font-bold accent">{s.u}</span>
              </p>
              <p className="cap-xs mt-4 text-mute">{s.l}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 장비 목록 */}
      <section className="soft-ch border-y border-hairline">
        <div className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
          <Eyebrow>Equipment list</Eyebrow>
          <MaskHeading className="d2 mt-6 text-ink" lines={[<>보유 장비 현황</>]} />

          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-y border-hairline">
                  <th className="cap-xs py-4 pr-6 text-mute">장비명</th>
                  <th className="cap-xs py-4 pr-6 text-mute">규격</th>
                  <th className="cap-xs py-4 pr-6 text-mute">보유</th>
                  <th className="cap-xs py-4 text-mute">용도</th>
                </tr>
              </thead>
              <tbody>
                {equipment.map((e) => (
                  <tr key={e.name} className="border-b border-hairline">
                    <td className="py-5 pr-6 text-[15.5px] font-bold text-ink">{e.name}</td>
                    <td className="py-5 pr-6 text-[14.5px] text-body">{e.spec}</td>
                    <td className="py-5 pr-6 text-[14.5px] font-bold whitespace-nowrap accent">
                      {e.qty}
                    </td>
                    <td className="py-5 text-[14.5px] text-body">{e.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="p-sm mt-6 text-mute">
            ※ 장비 규격과 보유 대수는 실제 현황으로 교체가 필요합니다.
          </p>
        </div>
      </section>

      {/* 구분 */}
      <section className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-16 md:py-24">
        <Eyebrow>Categories</Eyebrow>
        <MaskHeading className="d2 mt-6 text-ink" lines={[<>설비 구성</>]} />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g, gi) => {
            const items = equipment.filter((e) => g.match.some((m) => e.role.includes(m)));
            return (
              <li key={g.label} className="corner card rv p-7" data-d={gi * 80}>
                <span className="cap-xs mt-4 block text-mute">{String(gi + 1).padStart(2, "0")}</span>
                <h3 className="h4 mt-3 text-ink">{g.label}</h3>
                <ul className="mt-5 space-y-2 border-t border-hairline pt-4">
                  {items.map((e) => (
                    <li key={e.name} className="flex items-start gap-2.5 text-[14px] text-body">
                      <span className="mt-[7px] block h-1.5 w-1.5 shrink-0 bg-primary" />
                      {e.name}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </section>

      <CtaStrip
        eyebrow="Capacity"
        title="대량 물량이 예상되시면 미리 알려주세요. 라인을 비워 두겠습니다."
        href="/contact"
        cta="처리 일정 협의"
      />

      <NextLink href="/news" label="Next" title="회사소식 보기" />
    </>
  );
}
