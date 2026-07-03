import { Resend } from 'resend'

const NOTIFY_TO = 'lsh@mikeng.co.kr'
const FROM = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'

export async function sendInquiryNotification(inquiry: {
  company: string
  name: string
  phone: string
  email: string | null
  category: string
  message: string
}) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return

  const resend = new Resend(apiKey)
  await resend.emails.send({
    from: `MIK 홈페이지 <${FROM}>`,
    to: NOTIFY_TO,
    subject: `[문의 접수] ${inquiry.company} - ${inquiry.category}`,
    text: `회사명: ${inquiry.company}
담당자: ${inquiry.name}
연락처: ${inquiry.phone}
이메일: ${inquiry.email ?? '-'}
문의 분야: ${inquiry.category}

문의 내용:
${inquiry.message}`,
  })
}
