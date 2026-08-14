import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, isValidSessionToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  let valid = false;
  try {
    valid = await isValidSessionToken(token);
  } catch (e) {
    // ADMIN_PASSWORD가 이 실행 환경(Edge)에서 읽히지 않는 등 설정 문제가 있어도
    // 화면이 멈추지 않고 로그인 화면으로 깔끔하게 돌아가도록 한다.
    console.error("[middleware] session check failed:", e);
  }

  if (!valid) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ ok: false, error: "인증이 필요합니다." }, { status: 401 });
    }
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
