import { NextRequest, NextResponse } from "next/server";
import { sendInquiryEmail } from "@/lib/email";
import { insertInquiry } from "@/lib/db";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "잘못된 요청입니다." }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  const tel = String(body.tel || "").trim();
  const site = String(body.site || "").trim();
  const waste = String(body.waste || "").trim();

  if (!name || !tel || !site) {
    return NextResponse.json(
      { ok: false, error: "이름, 연락처, 현장 주소는 필수 항목입니다." },
      { status: 400 },
    );
  }

  const input = {
    name,
    tel,
    site,
    waste: waste || "-",
    company: body.company ? String(body.company) : undefined,
    email: body.email ? String(body.email) : undefined,
    volume: body.volume ? String(body.volume) : undefined,
    date: body.date ? String(body.date) : undefined,
    message: body.message ? String(body.message) : undefined,
  };

  const results = await Promise.allSettled([insertInquiry(input), sendInquiryEmail(input)]);
  const dbFailed = results[0].status === "rejected";
  const mailFailed = results[1].status === "rejected";

  if (dbFailed) console.error("[contact] DB insert failed:", results[0]);
  if (mailFailed) console.error("[contact] Email send failed:", results[1]);

  if (dbFailed && mailFailed) {
    return NextResponse.json(
      { ok: false, error: "문의 접수 중 오류가 발생했습니다. 전화로 문의해 주세요." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
