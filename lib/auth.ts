export const ADMIN_COOKIE = "admin_session";

function secret() {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) throw new Error("ADMIN_PASSWORD 환경변수가 설정되지 않았습니다.");
  return pw;
}

function toHex(buf: ArrayBuffer) {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Web Crypto 기반 HMAC — Edge(middleware)와 Node(API route) 양쪽에서 동작한다. */
async function hmacSha256(key: string, message: string) {
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(message));
  return toHex(sig);
}

function timingSafeStringEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** 고정 페이로드를 ADMIN_PASSWORD로 서명한 토큰. 비밀번호가 바뀌면 기존 세션은 자동 무효화된다. */
export async function createSessionToken() {
  return hmacSha256(secret(), "admin-session");
}

export async function isValidSessionToken(token: string | undefined | null) {
  if (!token) return false;
  const expected = await createSessionToken();
  return timingSafeStringEqual(token, expected);
}

export function checkPassword(input: string) {
  return timingSafeStringEqual(input, secret());
}
