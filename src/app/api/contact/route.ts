import { NextResponse } from "next/server";
import { sendEmail, formatFieldsAsHtml } from "@/lib/email";
import {
  getClientIp,
  checkRateLimit,
  parseJsonBody,
  validateContactBody,
} from "@/lib/security";

const LABELS: Record<string, string> = {
  name: "Nome e cognome",
  email: "Email",
  telefono: "Telefono",
  company: "Azienda",
  budget: "Budget",
  servizio: "Servizio interessato",
  ruolo: "Ruolo",
  sitoWeb: "Sito web",
  dimensioneAzienda: "Dimensione azienda",
  comeConosciuto: "Come ci ha conosciuto",
  progetto: "Descrizione progetto",
};

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(ip);
  if (!rate.ok) {
    return NextResponse.json(
      { ok: false, error: "Troppe richieste. Riprova tra qualche minuto." },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfter) },
      }
    );
  }

  const body = await parseJsonBody(request);
  if (body === null) {
    return NextResponse.json(
      { ok: false, error: "Richiesta non valida (body JSON mancante o troppo grande)." },
      { status: 400 }
    );
  }

  const validation = validateContactBody(body);
  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, error: validation.error },
      { status: 400 }
    );
  }

  const data = validation.data;
  const sourceLabel =
    data.source === "Contattaci" ? "pagina Contattaci" : data.source === "Chat" ? "Chat assistenza" : "Home";
  const { source: _s, ...rest } = data;
  const labeled: Record<string, string> = {};
  for (const [key, value] of Object.entries(rest)) {
    if (value != null && String(value).trim() !== "") {
      labeled[LABELS[key] ?? key] = String(value);
    }
  }

  try {
    const subject = `Richiesta di contatto (${sourceLabel}) – buluagency.it`;
    const html = `
      <h2 style="margin:0 0 16px 0;">Richiesta di contatto</h2>
      <p style="color:#64748b;margin-bottom:16px;">Dati inviati dal form sul sito.</p>
      ${formatFieldsAsHtml(labeled)}
      <p style="margin-top:24px;font-size:12px;color:#94a3b8;">BULU Agency – buluagency.it</p>
    `;

    const replyTo = rest.email;

    const result = await sendEmail({
      subject,
      html,
      replyTo: replyTo || undefined,
    });

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error ?? "Invio fallito" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("API contact error:", e);
    return NextResponse.json(
      { ok: false, error: "Errore server" },
      { status: 500 }
    );
  }
}
