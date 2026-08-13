import { NextRequest, NextResponse } from "next/server";
import { deleteInquiry, updateInquiryStatus } from "@/lib/db";
import { STATUSES } from "@/lib/inquiry-status";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isInteger(numId)) {
    return NextResponse.json({ ok: false, error: "잘못된 요청입니다." }, { status: 400 });
  }

  let body: { status?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "잘못된 요청입니다." }, { status: 400 });
  }

  if (!body.status || !(STATUSES as readonly string[]).includes(body.status)) {
    return NextResponse.json({ ok: false, error: "올바르지 않은 상태 값입니다." }, { status: 400 });
  }

  try {
    await updateInquiryStatus(numId, body.status as (typeof STATUSES)[number]);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[admin/inquiries] update failed:", e);
    return NextResponse.json({ ok: false, error: "상태 변경에 실패했습니다." }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isInteger(numId)) {
    return NextResponse.json({ ok: false, error: "잘못된 요청입니다." }, { status: 400 });
  }

  try {
    await deleteInquiry(numId);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[admin/inquiries] delete failed:", e);
    return NextResponse.json({ ok: false, error: "삭제에 실패했습니다." }, { status: 500 });
  }
}
