import { Resend } from "resend";
import { company } from "./site";

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY 환경변수가 설정되지 않았습니다.");
  }
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendInquiryEmail(input: {
  name: string;
  company?: string;
  tel: string;
  email?: string;
  site: string;
  waste: string;
  volume?: string;
  date?: string;
  message?: string;
}) {
  const resend = getResend();

  const rows = [
    ["담당자", input.name],
    ["회사명", input.company || "-"],
    ["연락처", input.tel],
    ["이메일", input.email || "-"],
    ["현장 주소", input.site],
    ["폐기물 품목", input.waste],
    ["예상 물량", input.volume || "-"],
    ["반출 희망일", input.date || "-"],
  ];

  const html = `
    <h2>온라인 견적 문의</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="color:#666;white-space:nowrap">${k}</td><td><b>${v}</b></td></tr>`,
        )
        .join("")}
    </table>
    <p><b>문의 내용</b></p>
    <p>${(input.message || "-").replace(/\n/g, "<br/>")}</p>
  `;

  const { error } = await resend.emails.send({
    from: "중앙이엔비 웹문의 <no-reply@jungangenb.com>",
    to: company.email,
    replyTo: input.email || undefined,
    subject: `[견적문의] ${input.company || input.name} - ${input.waste}`,
    html,
  });

  // Resend SDK는 API가 발송을 거부해도 throw하지 않고 error 필드로만 알려주므로,
  // 직접 확인해서 던지지 않으면 실패가 조용히 성공 처리되어 버린다.
  if (error) {
    throw new Error(`Resend 발송 실패: ${error.name} - ${error.message}`);
  }
}
