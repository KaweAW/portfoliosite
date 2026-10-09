/**
 * Runs on every Netlify Forms submission (Netlify calls a function with this
 * exact name automatically). Sends a formatted email through Resend.
 *
 * Needs the environment variable RESEND_API_KEY (Netlify: Project
 * configuration -> Environment variables). Optional: BRIEF_TO_EMAIL, BRIEF_FROM_EMAIL.
 */

interface NetlifyEvent {
  body: string | null
}

interface Submission {
  form_name?: string
  data?: Record<string, string>
}

const TO = process.env.BRIEF_TO_EMAIL ?? "kawe.longon@gmail.com"
// Until a domain is verified in Resend, only this sender works, and it can only write to your own Resend account email.
const FROM = process.env.BRIEF_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>"

const LABELS: [key: string, label: string][] = [
  ["company", "Company"],
  ["projectType", "Project type"],
  ["budget", "Budget"],
  ["priority", "Priority"],
  ["deadline", "Deadline"],
  ["features", "Features"],
  ["technologies", "Technologies"],
  ["assets", "Assets"],
  ["audience", "Target audience"],
  ["hosting", "Hosting"],
  ["support", "Support and maintenance"],
  ["legal", "Legal considerations"],
]

const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br>")

const row = (label: string, value: string) =>
  `<tr><td style="padding:10px 16px 10px 0;color:#777;font-size:12px;letter-spacing:.08em;text-transform:uppercase;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td>` +
  `<td style="padding:10px 0;font-size:15px;color:#111;vertical-align:top">${escapeHtml(value)}</td></tr>`

const render = (data: Record<string, string>) => {
  const details = LABELS.filter(([key]) => data[key]?.trim())
    .map(([key, label]) => row(label, data[key] as string))
    .join("")
  const name = data.name?.trim() || "Someone"
  const email = data.email?.trim() ?? ""

  return `<!doctype html><html><body style="margin:0;background:#f3f0e8;font-family:ui-monospace,Menlo,Consolas,monospace">
<div style="max-width:620px;margin:0 auto;padding:32px 20px">
  <p style="margin:0 0 6px;font-size:11px;letter-spacing:.14em;color:#777">&#9670; NEW PROJECT BRIEF</p>
  <h1 style="margin:0 0 4px;font-size:28px;line-height:1.1;color:#111">${escapeHtml(name)}</h1>
  <p style="margin:0 0 24px;font-size:14px"><a href="mailto:${escapeHtml(email)}" style="color:#047857">${escapeHtml(email)}</a></p>
  <div style="background:#fff;border:1px solid #ddd;padding:20px;margin-bottom:20px">
    <p style="margin:0 0 8px;font-size:11px;letter-spacing:.14em;color:#777">MESSAGE</p>
    <p style="margin:0;font-size:15px;line-height:1.6;color:#111">${escapeHtml(data.message ?? "")}</p>
  </div>
  ${details ? `<table style="border-collapse:collapse;width:100%;background:#fff;border:1px solid #ddd;padding:12px 20px;display:table"><tbody>${details}</tbody></table>` : ""}
  <p style="margin:28px 0 0"><a href="mailto:${escapeHtml(email)}?subject=${encodeURIComponent("Re: your project")}" style="display:inline-block;background:#111;color:#f3f0e8;padding:12px 18px;text-decoration:none;font-size:12px;letter-spacing:.1em">REPLY &rarr;</a></p>
  <p style="margin:24px 0 0;font-size:11px;color:#999">Sent from the contact form of your portfolio.</p>
</div></body></html>`
}

export const handler = async (event: NetlifyEvent) => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set: no email sent.")
    return { statusCode: 500, body: "Missing RESEND_API_KEY" }
  }

  const { payload } = JSON.parse(event.body ?? "{}") as { payload?: Submission }
  const data = payload?.data ?? {}
  if (payload?.form_name !== "brief") return { statusCode: 200, body: "Not the brief form" }

  const subject = `New brief from ${data.name?.trim() || "the portfolio"}${data.company?.trim() ? ` (${data.company.trim()})` : ""}`

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: data.email?.trim() || undefined,
      subject,
      html: render(data),
    }),
  })

  if (!response.ok) {
    console.error("Resend error", response.status, await response.text())
    return { statusCode: 502, body: "Email failed" }
  }
  return { statusCode: 200, body: "Email sent" }
}
