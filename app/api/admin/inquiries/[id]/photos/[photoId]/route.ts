import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, isValidSessionToken } from "@/lib/auth";
import { getInquiryPhoto } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string; photoId: string }> }) {
  // Keep authorization here as well as middleware: files must never be public.
  if (!(await isValidSessionToken(req.cookies.get(ADMIN_COOKIE)?.value))) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }
  const { id, photoId } = await params;
  if (!/^\d+$/.test(id) || !/^\d+$/.test(photoId) || !Number.isSafeInteger(Number(id)) || !Number.isSafeInteger(Number(photoId))) {
    return new NextResponse(null, { status: 404 });
  }
  const photo = await getInquiryPhoto(Number(id), Number(photoId));
  if (!photo) return new NextResponse(null, { status: 404 });
  return new NextResponse(new Uint8Array(photo.content), {
    headers: {
      "Content-Type": "image/jpeg",
      "Content-Length": String(photo.content.length),
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
      "Content-Disposition": `${req.nextUrl.searchParams.get("download") === "1" ? "attachment" : "inline"}; filename="photo-${photoId}.jpg"`,
    },
  });
}
