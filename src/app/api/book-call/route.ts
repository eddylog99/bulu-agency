import { NextResponse } from "next/server";
import { sendEmail, formatFieldsAsHtml } from "@/lib/email";
import {
  getClientIp,
  checkRateLimit,
  parseJsonBody,
  validateBookCallBody,
} from "@/lib/security";

const LABELS: Record<string, string> = {
  date: "Data",
  time: "Ora",
  durationMinutes: "Durata (min)",
  nome: "Nome",
  cognome: "Cognome",
  azienda: "Azienda",
  telefono: "Telefono",
  email: "Email",
  ruolo: "Ruolo",
  sitoWeb: "Sito web",
  dimensioneAzienda: "Dimensione azienda",
  areaProgetto: "Area progetto",
  budget: "Budget",
  aspettative: "Aspettative",
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

  const validation = validateBookCallBody(body);
  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, error: validation.error },
      { status: 400 }
    );
  }

  const data = validation.data;
  const labeled: Record<string, string> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value != null && String(value).trim() !== "") {
      labeled[LABELS[key] ?? key] = String(value);
    }
  }

  try {
    const html = `
      <h2 style="margin:0 0 16px 0;">Prenotazione call – buluagency.it</h2>
      <p style="color:#64748b;margin-bottom:16px;">Nuova richiesta di prenotazione dalla pagina Book a call.</p>
      ${formatFieldsAsHtml(labeled)}
      <p style="margin-top:24px;font-size:12px;color:#94a3b8;">BULU Agency – buluagency.it</p>
    `;

    const result = await sendEmail({
      subject: "Prenotazione call – buluagency.it",
      html,
      replyTo: data.email || undefined,
    });

    if (!result.ok) {
      console.error("Invio email prenotazione fallito:", result.error);
      return NextResponse.json(
        { ok: false, error: result.error ?? "Invio fallito" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("API book-call error:", e);
    return NextResponse.json(
      { ok: false, error: "Errore server" },
      { status: 500 }
    );
  }
}
