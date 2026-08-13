import { NextResponse } from "next/server";
import { listInquiries } from "@/lib/db";

function csvCell(v: unknown) {
  const s = String(v ?? "").replace(/"/g, '""');
  return `"${s}"`;
}

export async function GET() {
  let items;
  try {
    items = await listInquiries();
  } catch (e) {
    console.error("[admin/export] error:", e);
    const msg = e instanceof Error ? e.message : "알 수 없는 오류";
    return NextResponse.json({ ok: false, error: `서버 오류: ${msg}` }, { status: 500 });
  }

  const header = [
    "접수일시",
    "담당자",
    "회사명",
    "연락처",
    "이메일",
    "현장 주소",
    "품목",
    "물량",
    "희망일",
    "상태",
    "문의 내용",
  ];

  const lines = [
    header.map(csvCell).join(","),
    ...items.map((it) =>
      [
        new Date(it.created_at).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }),
        it.name,
        it.company || "",
        it.tel,
        it.email || "",
        it.site,
        it.waste,
        it.volume || "",
        it.date || "",
        it.status,
        it.message || "",
      ]
        .map(csvCell)
        .join(","),
    ),
  ];

  // UTF-8 BOM을 붙여야 윈도우 엑셀에서 한글이 깨지지 않는다.
  const csv = "﻿" + lines.join("\r\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="inquiries_${Date.now()}.csv"`,
    },
  });
}
