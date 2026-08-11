"use client";

import { useState } from "react";
import { company, wasteTypes } from "@/lib/site";
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

/**
 * 견적 문의 폼.
 * ⚠️ 현재는 메일 클라이언트로 내용을 전달합니다.
 *    실제 운영 시 /api/contact 라우트나 폼 서비스(Formspree 등) 연동이 필요합니다.
 */
export default function ContactForm() {
  const [f, setF] = useState<Form>(EMPTY);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((v) => ({ ...v, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name.trim() || !f.tel.trim() || !f.site.trim()) {
      setErr("이름, 연락처, 현장 주소는 필수 항목입니다.");
      return;
    }
    setErr(null);

    const body = [
      `[견적 문의]`,
      ``,
      `담당자   : ${f.name}`,
      `회사명   : ${f.company || "-"}`,
      `연락처   : ${f.tel}`,
      `이메일   : ${f.email || "-"}`,
      ``,
      `현장 주소 : ${f.site}`,
      `폐기물 품목: ${f.waste}`,
      `예상 물량 : ${f.volume || "-"}`,
      `반출 희망일: ${f.date || "-"}`,
      ``,
      `문의 내용`,
      f.message || "-",
    ].join("\n");

    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
      `[견적문의] ${f.company || f.name} - ${f.waste}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const Field = ({
    label,
    required,
    children,
  }: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
  }) => (
    <label className="block">
      <span className="cap-xs text-mute">
        {label}
        {required && <span className="ml-1 accent">*</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );

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
              placeholder="경기도 화성시 ○○동 000-0"
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
          메일 작성 창이 열렸습니다. 전송이 되지 않으면{" "}
          <a href={`tel:${company.tel.replace(/-/g, "")}`} className="font-bold accent">
            {company.tel}
          </a>{" "}
          로 연락 주세요.
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-hairline pt-7">
        <button type="submit" className="btn btn-primary">
          문의 보내기
          <Arrow />
        </button>
        <p className="p-sm text-mute">영업일 기준 24시간 이내에 회신드립니다.</p>
      </div>
    </form>
  );
}
