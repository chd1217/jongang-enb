import type { Metadata } from "next";
import Link from "next/link";
import { listInquiries } from "@/lib/db";
import type { Status } from "@/lib/inquiry-status";
import LogoutButton from "./LogoutButton";

export const metadata: Metadata = {
  title: "관리자 · 견적 문의 목록",
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

const STATUS_STYLE: Record<Status, string> = {
  접수완료: "border-hairline text-mute",
  상담중: "border-primary text-ink bg-soft",
  처리완료: "border-primary bg-primary text-black",
};

export default async function AdminPage() {
  const items = await listInquiries().catch(() => []);

  return (
    <main className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="d3 text-ink">견적 문의 목록</h1>
          <p className="p-sm mt-2 text-mute">총 {items.length}건</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="/api/admin/export" className="btn btn-outline btn-sm">
            엑셀(CSV) 다운로드
          </a>
          <LogoutButton />
        </div>
      </div>

      {items.length === 0 ? (
        <p className="p-md mt-10 text-mute">아직 접수된 문의가 없습니다.</p>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse text-left">
            <thead>
              <tr className="border-y border-hairline">
                <th className="cap-xs py-3 pr-4 text-mute">접수일시</th>
                <th className="cap-xs py-3 pr-4 text-mute">담당자</th>
                <th className="cap-xs py-3 pr-4 text-mute">회사명</th>
                <th className="cap-xs py-3 pr-4 text-mute">연락처</th>
                <th className="cap-xs py-3 pr-4 text-mute">현장 주소</th>
                <th className="cap-xs py-3 pr-4 text-mute">품목</th>
                <th className="cap-xs py-3 pr-4 text-mute">상태</th>
                <th className="cap-xs py-3 text-mute" />
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} className="border-b border-hairline align-top">
                  <td className="py-3 pr-4 text-[13px] whitespace-nowrap text-mute">
                    {fmt(it.created_at)}
                  </td>
                  <td className="py-3 pr-4 text-[14px] font-bold text-ink">{it.name}</td>
                  <td className="py-3 pr-4 text-[14px] text-body">{it.company || "-"}</td>
                  <td className="py-3 pr-4 text-[14px] whitespace-nowrap text-body">{it.tel}</td>
                  <td className="py-3 pr-4 max-w-[220px] truncate text-[14px] text-body">
                    {it.site}
                  </td>
                  <td className="py-3 pr-4 text-[14px] whitespace-nowrap text-body">{it.waste}</td>
                  <td className="py-3 pr-4">
                    <span
                      className={`inline-block rounded-xs border px-2.5 py-1 text-[12.5px] font-bold whitespace-nowrap ${STATUS_STYLE[it.status]}`}
                    >
                      {it.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <Link href={`/admin/${it.id}`} className="p-sm font-bold accent hover:underline">
                      상세보기
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
