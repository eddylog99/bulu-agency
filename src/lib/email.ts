import nodemailer from "nodemailer";

const TO_EMAIL = "info@buluagency.it";

function getTransporter() {
  const host = process.env.SMTP_HOST ?? "smtp.aruba.it";
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER ?? TO_EMAIL;
  const pass = process.env.SMTP_PASS;

  if (!pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendEmail(options: {
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const transporter = getTransporter();
  if (!transporter) {
    console.error("SMTP non configurato (manca SMTP_PASS): email non inviata.", options.subject);
    return { ok: false, error: "Email non configurata" };
  }

  try {
    const from = process.env.SMTP_FROM ?? `BULU Agency <${TO_EMAIL}>`;
    await transporter.sendMail({
      from,
      to: TO_EMAIL,
      replyTo: options.replyTo,
      subject: options.subject,
      html: options.html,
    });
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Invio email fallito:", message);
    return { ok: false, error: message };
  }
}

/** Formatta i campi di un oggetto in HTML per il corpo email */
export function formatFieldsAsHtml(data: Record<string, string | undefined>): string {
  const rows = Object.entries(data)
    .filter(([, v]) => v != null && String(v).trim() !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;vertical-align:top;font-weight:600;color:#64748b;">${escapeHtml(k)}</td><td style="padding:6px 0;">${escapeHtml(String(v))}</td></tr>`
    )
    .join("");
  return `<table style="border-collapse:collapse;">${rows}</table>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
