import { NextRequest, NextResponse } from "next/server";
import { sendInquiryEmail } from "@/lib/email";
import { insertInquiry } from "@/lib/db";
import { validatePhotos, type InquiryPhoto } from "@/lib/inquiry-photos";
import { MAX_CONTACT_BYTES } from "@/lib/photo-limits";

export const runtime = "nodejs";
export const maxDuration = 60;

// Enforce the cap even when Content-Length is absent or forged.
async function readBody(req: NextRequest) {
  if (Number(req.headers.get("content-length")) > MAX_CONTACT_BYTES) throw new RangeError();
  const reader = req.body?.getReader();
  if (!reader) throw new Error("empty body");
  const chunks: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > MAX_CONTACT_BYTES) { await reader.cancel(); throw new RangeError(); }
    chunks.push(value);
  }
  return new Response(Buffer.concat(chunks), { headers: { "Content-Type": req.headers.get("content-type") || "application/json" } });
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  let files: File[] = [];
  try {
    const requestBody = await readBody(req);
    if (req.headers.get("content-type")?.startsWith("multipart/form-data")) {
      const data = await requestBody.formData();
      body = Object.fromEntries(Array.from(data.entries()).filter(([, value]) => typeof value === "string"));
      body.agree = body.agree === "true";
      const entries = data.getAll("photos");
      if (entries.some((value) => typeof value === "string")) throw new Error("invalid photos");
      files = entries as File[];
    } else {
      body = await requestBody.json();
    }
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("invalid body");
  } catch (error) {
    if (error instanceof RangeError) return NextResponse.json({ ok: false, error: "첨부 용량이 너무 큽니다. 사진을 다시 선택해 주십시오." }, { status: 413 });
    return NextResponse.json({ ok: false, error: "잘못된 요청입니다." }, { status: 400 });
  }

  if (Object.values(body).some((value) => typeof value === "string" && value.length > 5000)) {
    return NextResponse.json({ ok: false, error: "입력 내용이 너무 깁니다. 항목별 5,000자 이내로 작성해 주십시오." }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  const tel = String(body.tel || "").trim();
  const site = String(body.site || "").trim();
  const waste = String(body.waste || "").trim();
  const agree = body.agree === true;

  if (!name || !tel || !site) {
    return NextResponse.json(
      { ok: false, error: "이름, 연락처, 현장 주소는 필수 항목입니다." },
      { status: 400 },
    );
  }

  // 클라이언트 검증을 우회해 직접 API를 호출하는 경우까지 방어한다.
  if (!agree) {
    return NextResponse.json(
      { ok: false, error: "개인정보 수집 및 이용에 동의하셔야 접수가 가능합니다." },
      { status: 400 },
    );
  }

  let photos: InquiryPhoto[];
  try {
    photos = await validatePhotos(files);
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "사진을 확인해 주십시오." }, { status: 400 });
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
    agree,
    photos,
  };

  const results = await Promise.allSettled([insertInquiry(input), sendInquiryEmail(input)]);
  const dbFailed = results[0].status === "rejected";
  const mailFailed = results[1].status === "rejected";

  if (dbFailed) console.error("[contact] DB insert failed:", results[0]);
  if (mailFailed) console.error("[contact] Email send failed:", results[1]);

  if (dbFailed && mailFailed) {
    return NextResponse.json(
      { ok: false, error: "문의 접수 중 오류가 발생했습니다. 전화로 문의해 주십시오." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
