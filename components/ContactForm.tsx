"use client";

import { useRef, useState } from "react";
import { company, telDial, wasteTypes } from "@/lib/site";
import { Arrow } from "./ui";

type Form = {
  name: string;
  company: string;
  tel: string;
  email: string;
  site: string;
  waste: string;
  volume: string;
  date: string;
  message: string;
};

const EMPTY: Form = {
  name: "",
  company: "",
  tel: "",
  email: "",
  site: "",
  waste: wasteTypes[0],
  volume: "",
  date: "",
  message: "",
};

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="cap-xs text-mute">
        {label}
        {required && <span className="ml-1 accent">*</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

/** 견적 문의 폼. 제출 시 서버(/api/contact)가 이메일 발송과 DB 저장을 모두 처리한다. */
export default function ContactForm() {
  const [f, setF] = useState<Form>(EMPTY);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [agree, setAgree] = useState(false);
  const [agreeError, setAgreeError] = useState(false);
  const agreeRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((v) => ({ ...v, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name.trim() || !f.tel.trim() || !f.site.trim()) {
      setErr("이름, 연락처, 현장 주소는 필수 항목입니다.");
      return;
    }
    if (!agree) {
      setErr("개인정보 수집 및 이용에 동의하셔야 견적 문의 제출이 가능합니다.");
      setAgreeError(true);
      agreeRef.current?.focus();
      agreeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setAgreeError(false);
    setErr(null);
    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErr(data.error || "문의 접수 중 오류가 발생했습니다. 전화로 문의해 주세요.");
        setSending(false);
        return;
      }
      setSent(true);
      setF(EMPTY);
      setAgree(false);
    } catch {
      setErr("네트워크 오류로 접수하지 못했습니다. 전화로 문의해 주세요.");
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={submit} className="corner card p-7 md:p-9">
      <div className="grid gap-5 pt-4 sm:grid-cols-2">
        <Field label="담당자 성함" required>
          <input className="field" value={f.name} onChange={set("name")} placeholder="홍길동" />
        </Field>
        <Field label="회사명">
          <input
            className="field"
            value={f.company}
            onChange={set("company")}
            placeholder="○○종합건설"
          />
        </Field>
        <Field label="연락처" required>
          <input
            className="field"
            value={f.tel}
            onChange={set("tel")}
            placeholder="010-0000-0000"
            inputMode="tel"
          />
        </Field>
        <Field label="이메일">
          <input
            className="field"
            value={f.email}
            onChange={set("email")}
            placeholder="name@company.co.kr"
            type="email"
          />
        </Field>

        <div className="sm:col-span-2">
          <Field label="현장 주소" required>
            <input
              className="field"
              value={f.site}
              onChange={set("site")}
              placeholder="충청남도 공주시 ○○면 000-0"
            />
          </Field>
        </div>

        <Field label="폐기물 품목">
          <select className="field" value={f.waste} onChange={set("waste")}>
            {wasteTypes.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
            <option value="기타 / 확인 필요">기타 / 확인 필요</option>
          </select>
        </Field>
        <Field label="예상 물량">
          <input
            className="field"
            value={f.volume}
            onChange={set("volume")}
            placeholder="예: 25톤 덤프 10대 / 약 200톤"
          />
        </Field>

        <div className="sm:col-span-2">
          <Field label="반출 희망일">
            <input className="field" value={f.date} onChange={set("date")} type="date" />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="문의 내용">
            <textarea
              className="field min-h-36 resize-y"
              value={f.message}
              onChange={set("message")}
              placeholder="현장 상황이나 요청사항을 자유롭게 적어주세요."
            />
          </Field>
        </div>
      </div>

      {err && (
        <p className="mt-6 border-l-2 border-primary bg-soft px-4 py-3 text-[14px] font-bold text-ink">
          {err}
        </p>
      )}

      {sent && (
        <p className="mt-6 border-l-2 border-primary bg-soft px-4 py-3 text-[14px] text-body">
          문의가 정상적으로 접수됐습니다. 확인이 늦어지면{" "}
          <a href={`tel:${telDial}`} className="font-bold accent">
            {company.tel}
          </a>{" "}
          로 연락 주세요.
        </p>
      )}

      <div className="mt-8 border-t border-hairline pt-7">
        <div className="corner max-h-36 overflow-y-auto border border-hairline bg-soft p-4 text-[12.5px] leading-relaxed text-mute">
          <p className="font-bold text-ink">개인정보 수집 및 이용 안내</p>
          <ul className="mt-2 list-disc space-y-1 pl-4">
            <li>수집 항목: 이름/담당자명, 연락처, 이메일, 현장 위치, 물량 정보</li>
            <li>수집·이용 목적: 견적 산출, 반입 일정 협의, 상담 응대</li>
            <li>보유 기간: 문의 처리 후 1년간 보관 후 파기</li>
          </ul>
          <p className="mt-2">
            동의를 거부할 권리가 있으나, 미동의 시 온라인 견적 제출이 불가합니다.
          </p>
        </div>

        <label
          className={`mt-4 flex items-start gap-2.5 rounded-xs p-2 text-[13.5px] text-body transition-colors ${
            agreeError ? "border-2 border-red-500 bg-red-50" : "border-2 border-transparent"
          }`}
        >
          <input
            ref={agreeRef}
            type="checkbox"
            checked={agree}
            onChange={(e) => {
              setAgree(e.target.checked);
              if (e.target.checked) setAgreeError(false);
            }}
            className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
          />
          <span>
            <span className="font-bold accent">[필수]</span> 개인정보 수집 및 이용에 동의합니다.
          </span>
        </label>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button type="submit" disabled={sending} className="btn btn-primary">
            {sending ? "접수 중..." : "문의 보내기"}
            <Arrow />
          </button>
          <p className="p-sm text-mute">영업일 기준 24시간 이내에 회신드립니다.</p>
        </div>
      </div>
    </form>
  );
}
