import type { Metadata } from "next";
import { listInquiries } from "@/lib/db";
import LogoutButton from "./LogoutButton";

export const metadata: Metadata = {
  title: "관리자 · 견적 문의 목록",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function fmt(d: string) {
  return new Date(d).toLocaleString("ko-KR", { dateStyle: "medium", timeStyle: "short" });
}

export default async function AdminPage() {
  const items = await listInquiries().catch(() => []);

  return (
    <main className="mx-auto max-w-[var(--maxw)] px-[var(--pad)] py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="d3 text-ink">견적 문의 목록</h1>
        <LogoutButton />
      </div>

      {items.length === 0 ? (
        <p className="p-md mt-10 text-mute">아직 접수된 문의가 없습니다.</p>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse text-left">
            <thead>
              <tr className="border-y border-hairline">
                <th className="cap-xs py-3 pr-4 text-mute">접수일시</th>
                <th className="cap-xs py-3 pr-4 text-mute">담당자</th>
                <th className="cap-xs py-3 pr-4 text-mute">회사명</th>
                <th className="cap-xs py-3 pr-4 text-mute">연락처</th>
                <th className="cap-xs py-3 pr-4 text-mute">이메일</th>
                <th className="cap-xs py-3 pr-4 text-mute">현장 주소</th>
                <th className="cap-xs py-3 pr-4 text-mute">품목</th>
                <th className="cap-xs py-3 pr-4 text-mute">물량</th>
                <th className="cap-xs py-3 pr-4 text-mute">희망일</th>
                <th className="cap-xs py-3 text-mute">문의 내용</th>
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
                  <td className="py-3 pr-4 text-[14px] text-body">{it.email || "-"}</td>
                  <td className="py-3 pr-4 text-[14px] text-body">{it.site}</td>
                  <td className="py-3 pr-4 text-[14px] whitespace-nowrap text-body">{it.waste}</td>
                  <td className="py-3 pr-4 text-[14px] text-body">{it.volume || "-"}</td>
                  <td className="py-3 pr-4 text-[14px] whitespace-nowrap text-body">
                    {it.date || "-"}
                  </td>
                  <td className="py-3 max-w-[280px] text-[14px] text-body">
                    {it.message || "-"}
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
