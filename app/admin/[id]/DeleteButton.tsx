"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const remove = async () => {
    if (!confirm("이 문의를 삭제하시겠습니까? 되돌릴 수 없습니다.")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        alert(data.error || "삭제에 실패했습니다.");
        setBusy(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      alert("네트워크 오류가 발생했습니다.");
      setBusy(false);
    }
  };

  return (
    <button onClick={remove} disabled={busy} className="btn btn-outline btn-sm">
      {busy ? "삭제 중..." : "삭제"}
    </button>
  );
}
