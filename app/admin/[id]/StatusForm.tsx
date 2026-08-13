"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { STATUSES, type Status } from "@/lib/inquiry-status";

export default function StatusForm({ id, status }: { id: number; status: Status }) {
  const router = useRouter();
  const [value, setValue] = useState<Status>(status);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const save = async () => {
    setSaving(true);
    setErr(null);
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: value }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErr(data.error || "저장에 실패했습니다.");
        return;
      }
      router.refresh();
    } catch {
      setErr("네트워크 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        className="field w-auto"
        value={value}
        onChange={(e) => setValue(e.target.value as Status)}
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <button onClick={save} disabled={saving || value === status} className="btn btn-primary btn-sm">
        {saving ? "저장 중..." : "상태 저장"}
      </button>
      {err && <p className="text-[13px] font-bold accent">{err}</p>}
    </div>
  );
}
