import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getInquiry } from "@/lib/db";
import StatusForm from "./StatusForm";
import DeleteButton from "./DeleteButton";

export const metadata: Metadata = {
  title: "관리자 · 견적 문의 상세",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function fmt(d: string) {
  return new Date(d).toLocaleString("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Seoul",
  });
}

export default async function AdminInquiryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isInteger(numId)) notFound();

  const item = await getInquiry(numId);
  if (!item) notFound();

  const rows: [string, string][] = [
    ["접수일시", fmt(item.created_at)],
    ["담당자", item.name],
    ["회사명", item.company || "-"],
    ["연락처", item.tel],
    ["이메일", item.email || "-"],
    ["현장 주소", item.site],
    ["폐기물 품목", item.waste],
    ["예상 물량", item.volume || "-"],
    ["반출 희망일", item.date || "-"],
  ];

  return (
    <main className="mx-auto max-w-2xl px-[var(--pad)] py-12">
      <Link href="/admin" className="p-sm text-mute hover:text-accent">
        ← 목록으로
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="d3 text-ink">문의 상세</h1>
        <DeleteButton id={item.id} />
      </div>

      <div className="mt-6">
        <p className="cap-xs text-mute">현재 상태</p>
        <div className="mt-2">
          <StatusForm id={item.id} status={item.status} />
        </div>
      </div>

      <dl className="mt-10 border-t border-hairline">
        {rows.map(([k, v]) => (
          <div key={k} className="grid gap-1 border-b border-hairline py-4 sm:grid-cols-[8rem_1fr]">
            <dt className="cap-xs pt-0.5 text-mute">{k}</dt>
            <dd className="text-[15px] text-body">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6">
        <p className="cap-xs text-mute">문의 내용</p>
        <p className="p-md mt-2 whitespace-pre-wrap text-body">{item.message || "-"}</p>
      </div>
    </main>
  );
}
