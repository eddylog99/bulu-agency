import { NextResponse } from "next/server";
import { sendEmail, formatFieldsAsHtml } from "@/lib/email";

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
  try {
    const body = await request.json();
    const data = body as Record<string, string | undefined>;
    const source = data.source === "Contattaci" ? "pagina Contattaci" : "Home";
    const { source: _s, ...rest } = data;
    const labeled: Record<string, string> = {};
    for (const [key, value] of Object.entries(rest)) {
      if (value != null && String(value).trim() !== "") {
        labeled[LABELS[key] ?? key] = String(value);
      }
    }

    const subject = `Richiesta di contatto (${source}) – buluagency.it`;
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
