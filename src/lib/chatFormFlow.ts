/**
 * Flussi "Contattaci in chat" e "Prenota call in chat": passi, campi obbligatori/facoltativi,
 * e generazione slot orari (allineata alla pagina Book a call).
 */

const SLOT_DURATION_MINUTES = 30;

export type FlowMode = "contact" | "book" | null;

// --- Contattaci: obbligatori e facoltativi (allineati al form Contattaci) ---
export const CONTACT_REQUIRED_STEPS: { key: string; question: string }[] = [
  { key: "name", question: "Come ti chiami? (Nome e cognome)" },
  { key: "email", question: "Qual è la tua email?" },
  { key: "telefono", question: "Qual è il tuo numero di telefono?" },
  { key: "progetto", question: "Descrivi il tuo progetto in breve: obiettivi, tempistiche, contesto." },
];

export const CONTACT_OPTIONAL_FIELDS: { key: string; label: string }[] = [
  { key: "company", label: "Azienda" },
  { key: "budget", label: "Budget indicativo" },
  { key: "servizio", label: "Servizio interessato" },
  { key: "ruolo", label: "Ruolo in azienda" },
  { key: "sitoWeb", label: "Sito web aziendale" },
  { key: "dimensioneAzienda", label: "Dimensione azienda" },
  { key: "comeConosciuto", label: "Come ci hai conosciuto" },
];

export const CONTACT_BUDGET_OPTIONS = [
  { value: "<5k", label: "Fino a 5.000 €" },
  { value: "5-10k", label: "5.000 – 10.000 €" },
  { value: "10-20k", label: "10.000 – 20.000 €" },
  { value: ">20k", label: "Oltre 20.000 €" },
  { value: "da-definire", label: "Da definire insieme" },
];
export const CONTACT_SERVIZIO_OPTIONS = [
  { value: "brand", label: "Brand strategy" },
  { value: "web", label: "Web design & development" },
  { value: "content", label: "Content e social" },
  { value: "adv", label: "Digital advertising" },
  { value: "mix", label: "Mix di ambiti" },
  { value: "altro", label: "Altro" },
];
export const CONTACT_DIMENSIONE_OPTIONS = [
  { value: "1-10", label: "1-10 dipendenti" },
  { value: "11-50", label: "11-50 dipendenti" },
  { value: "51-200", label: "51-200 dipendenti" },
  { value: "200+", label: "Oltre 200" },
];
export const CONTACT_COME_CONOSCIUTO_OPTIONS = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "youtube", label: "YouTube" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "passaparola", label: "Passa parola / altro" },
];

// --- Book call: obbligatori e facoltativi (allineati al form Book a call) ---
export const BOOK_REQUIRED_AFTER_SLOT: { key: string; question: string }[] = [
  { key: "nome", question: "Qual è il tuo nome?" },
  { key: "cognome", question: "Qual è il tuo cognome?" },
  { key: "azienda", question: "Nome azienda (o brand)" },
  { key: "telefono", question: "Numero di telefono" },
  { key: "email", question: "Email" },
  { key: "aspettative", question: "Cosa ti aspetti da questo progetto? (in breve)" },
];

export const BOOK_OPTIONAL_FIELDS: { key: string; label: string }[] = [
  { key: "ruolo", label: "Ruolo in azienda" },
  { key: "sitoWeb", label: "Sito web" },
  { key: "dimensioneAzienda", label: "Dimensione azienda" },
  { key: "areaProgetto", label: "Area progetto" },
  { key: "budget", label: "Budget indicativo" },
];

export const BOOK_AREA_OPTIONS = [
  { value: "brand", label: "Brand strategy" },
  { value: "web", label: "Web design & development" },
  { value: "content", label: "Content e social" },
  { value: "adv", label: "Digital advertising" },
  { value: "mix", label: "Mix" },
  { value: "altro", label: "Altro" },
];
export const BOOK_BUDGET_OPTIONS = CONTACT_BUDGET_OPTIONS;
export const BOOK_DIMENSIONE_OPTIONS = CONTACT_DIMENSIONE_OPTIONS;

// --- Slot orari (stessa logica della pagina Book a call) ---
function buildSlotsBetween(
  startHour: number,
  startMinute: number,
  endHour: number,
  endMinute: number
): string[] {
  const slots: string[] = [];
  let current = startHour * 60 + startMinute;
  const end = endHour * 60 + endMinute;
  while (current + SLOT_DURATION_MINUTES <= end) {
    const h = Math.floor(current / 60).toString().padStart(2, "0");
    const m = (current % 60).toString().padStart(2, "0");
    slots.push(`${h}:${m}`);
    current += SLOT_DURATION_MINUTES;
  }
  return slots;
}

function createSlotsForDate(date: Date): string[] {
  const day = date.getDay();
  if (day >= 1 && day <= 5) return buildSlotsBetween(17, 30, 22, 0);
  if (day === 6) return buildSlotsBetween(9, 0, 20, 0);
  if (day === 0) return buildSlotsBetween(15, 0, 22, 0);
  return [];
}

export function buildAvailableDates(days: number = 14): Date[] {
  const today = new Date();
  const list: Date[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    list.push(d);
  }
  return list;
}

export function formatDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function formatDateLabel(date: Date): string {
  return date.toLocaleDateString("it-IT", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function getSlotsForDate(date: Date): string[] {
  return createSlotsForDate(date);
}
