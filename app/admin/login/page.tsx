"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErr(data.error || "로그인에 실패했습니다.");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
      // 정상적으로 이동하면 이 페이지는 언마운트된다. 몇 초 뒤에도 여전히 이 화면에
      // 남아있다면(서버 설정 문제 등으로 이동이 막힌 경우) 멈춘 것처럼 보이지 않도록 알린다.
      setTimeout(() => {
        setErr("페이지 이동이 지연되고 있습니다. 서버 설정 문제일 수 있습니다. 잠시 후 다시 시도해 주세요.");
        setLoading(false);
      }, 4000);
    } catch {
      setErr("네트워크 오류가 발생했습니다.");
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-[var(--pad)]">
      <h1 className="d3 text-ink">관리자 로그인</h1>
      <form onSubmit={submit} className="mt-8 space-y-4">
        <input
          type="password"
          className="field w-full"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
        {err && <p className="text-[14px] font-bold accent">{err}</p>}
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? "확인 중..." : "로그인"}
        </button>
      </form>
    </main>
  );
}
