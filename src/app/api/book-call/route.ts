import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();

  // Qui potremo in futuro:
  // - salvare la prenotazione in un database
  // - creare un evento su Google Calendar
  // - inviare una email di notifica a te e al cliente
  console.log("Nuova richiesta di prenotazione call BULU AGENCY:", data);

  return NextResponse.json({ ok: true });
}

