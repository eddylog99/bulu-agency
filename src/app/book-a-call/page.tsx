"use client";

import { useMemo, useState, FormEvent } from "react";
import { Section, FadeUp } from "@/components/Section";
import { CustomSelect } from "@/components/CustomSelect";

const AREA_PROGETTO_OPTIONS = [
  { value: "brand", label: "Brand strategy & posizionamento" },
  { value: "web", label: "Web design & development" },
  { value: "content", label: "Content, social e storytelling" },
  { value: "adv", label: "Digital advertising & performance" },
  { value: "mix", label: "Un mix di questi ambiti" },
  { value: "altro", label: "Altro" },
];
const BUDGET_OPTIONS = [
  { value: "<5k", label: "Fino a 5.000 €" },
  { value: "5-10k", label: "5.000 – 10.000 €" },
  { value: "10-20k", label: "10.000 – 20.000 €" },
  { value: ">20k", label: "Oltre 20.000 €" },
  { value: "da-definire", label: "Da definire insieme" },
];
const DIMENSIONE_OPTIONS = [
  { value: "1-10", label: "Da 1 a 10 dipendenti" },
  { value: "11-50", label: "Da 11 a 50 dipendenti" },
  { value: "51-200", label: "Da 51 a 200 dipendenti" },
  { value: "200+", label: "Oltre 200 dipendenti" },
];

const SLOT_DURATION_MINUTES = 30;

function buildAvailableDates(days = 30) {
  const today = new Date();
  const list: Date[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    list.push(d);
  }
  return list;
}

const availableDates = buildAvailableDates(14);

export default function BookACallPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(
    formatDateKey(availableDates[0])
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );
  const [showAllDates, setShowAllDates] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedDate || !selectedTime) return;

    const formData = new FormData(event.currentTarget);
    const payload = {
      date: selectedDate,
      time: selectedTime,
      durationMinutes: SLOT_DURATION_MINUTES,
      nome: `${formData.get("nome") ?? ""}`,
      cognome: `${formData.get("cognome") ?? ""}`,
      azienda: `${formData.get("azienda") ?? ""}`,
      telefono: `${formData.get("telefono") ?? ""}`,
      email: `${formData.get("email") ?? ""}`,
      ruolo: `${formData.get("ruolo") ?? ""}`,
      sitoWeb: `${formData.get("sitoWeb") ?? ""}`,
      dimensioneAzienda: `${formData.get("dimensioneAzienda") ?? ""}`,
      areaProgetto: `${formData.get("areaProgetto") ?? ""}`,
      budget: `${formData.get("budget") ?? ""}`,
      aspettative: `${formData.get("aspettative") ?? ""}`,
    };

    setStatus("submitting");

    try {
      await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setBookedSlots((prev) => {
        const current = prev[selectedDate] ?? [];
        return {
          ...prev,
          [selectedDate]: [...current, selectedTime],
        };
      });

      setStatus("success");
      event.currentTarget.reset();
      setSelectedTime(null);
      setFormKey((k) => k + 1);
    } catch (error) {
      console.error("Errore nella prenotazione della call", error);
      setStatus("idle");
    }
  };

  const slotsForSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    const dateObj =
      availableDates.find((d) => formatDateKey(d) === selectedDate) ?? null;
    if (!dateObj) return [];

    const allSlots = createSlotsForDate(dateObj);
    const booked = bookedSlots[selectedDate] ?? [];
    return allSlots.filter((time) => !booked.includes(time));
  }, [selectedDate, bookedSlots]);

  return (
    <>
      <Section spacing={false}>
        <div className="hero-glow absolute left-0 right-0 top-0 h-[40vh] max-h-[320px] pointer-events-none" />
        <div className="relative pb-12 pt-6 md:pb-16">
          <FadeUp>
            <h1 className="text-display font-bold text-[var(--text-primary)]">
              Prenota una call
            </h1>
            <p className="text-hero-sub mt-6 max-w-xl">
              Scegli giorno e orario per una call di 30 minuti per parlarci del
              tuo progetto digitale.
            </p>
          </FadeUp>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1.3fr] lg:items-start">
          {/* Calendario + orari */}
          <FadeUp>
            <div className="glass-card rounded-[var(--radius-card)] p-6 md:p-7">
              <h2 className="text-card-title text-[var(--text-primary)]">
                Scegli data e orario
              </h2>
              <p className="text-body mt-2 text-sm">
                Le call durano circa 30 minuti. Dopo la conferma riceverai un
                riepilogo all&apos;indirizzo email inserito.
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    Data
                  </p>
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {(showAllDates
                      ? availableDates
                      : availableDates.slice(0, 8)
                    ).map((date) => {
                      const key = formatDateKey(date);
                      const isSelected = key === selectedDate;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => {
                            setSelectedDate(key);
                            setSelectedTime(null);
                          }}
                          className={`flex flex-col items-center rounded-xl border px-2 py-2 text-xs md:text-sm ${
                            isSelected
                              ? "border-[#5CA9E9] bg-[#0B2944] text-[var(--text-primary)]"
                              : "border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:border-[#5CA9E9]/60"
                          }`}
                        >
                          <span>{formatWeekdayShort(date)}</span>
                          <span className="mt-0.5 font-semibold">
                            {date.getDate()}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {!showAllDates && availableDates.length > 8 && (
                    <button
                      type="button"
                      onClick={() => setShowAllDates(true)}
                      className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#5CA9E9] hover:text-[#38BDF8]"
                    >
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#5CA9E9] text-[11px]">
                        +
                      </span>
                      Mostra tutti i giorni (fino a 30)
                    </button>
                  )}
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    Orario (30 min)
                  </p>
                  <div className="mt-2 grid grid-cols-3 gap-2 md:grid-cols-4">
                    {slotsForSelectedDate.length === 0 ? (
                      <p className="col-span-3 text-sm text-[var(--text-secondary)]">
                        Nessun orario disponibile per questa data.
                      </p>
                    ) : (
                      slotsForSelectedDate.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`rounded-xl border px-2 py-2 text-xs md:text-sm ${
                            selectedTime === time
                              ? "border-[#5CA9E9] bg-[#0B2944] text-[var(--text-primary)]"
                              : "border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:border-[#5CA9E9]/60"
                          }`}
                        >
                          {time}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Form dettagli progetto */}
          <FadeUp>
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-[var(--radius-card)] p-6 md:p-7 space-y-4"
            >
              <h2 className="text-card-title text-[var(--text-primary)]">
                Raccontaci qualcosa in più
              </h2>
              <p className="text-body text-sm">
                Queste informazioni ci aiutano a prepararci alla call e
                proporti un percorso adatto al tuo brand.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="nome"
                    className="text-xs font-medium text-[var(--text-secondary)]"
                  >
                    Nome *
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    required
                    className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#5CA9E9]/60 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/25"
                    placeholder="Mario"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="cognome"
                    className="text-xs font-medium text-[var(--text-secondary)]"
                  >
                    Cognome *
                  </label>
                  <input
                    id="cognome"
                    name="cognome"
                    required
                    className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#5CA9E9]/60 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/25"
                    placeholder="Rossi"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="azienda"
                    className="text-xs font-medium text-[var(--text-secondary)]"
                  >
                    Nome azienda *
                  </label>
                  <input
                    id="azienda"
                    name="azienda"
                    required
                    className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#5CA9E9]/60 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/25"
                    placeholder="Nome brand o società"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="telefono"
                    className="text-xs font-medium text-[var(--text-secondary)]"
                  >
                    Numero di telefono *
                  </label>
                  <input
                    id="telefono"
                    name="telefono"
                    required
                    className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#5CA9E9]/60 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/25"
                    placeholder="+39 ..."
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-medium text-[var(--text-secondary)]"
                >
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#5CA9E9]/60 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/25"
                  placeholder="nome@azienda.it"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="ruolo"
                    className="text-xs font-medium text-[var(--text-secondary)]"
                  >
                    Ruolo nell&apos;azienda
                  </label>
                  <input
                    id="ruolo"
                    name="ruolo"
                    className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#5CA9E9]/60 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/25"
                    placeholder="Es. CEO, Marketing Manager"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="sitoWeb"
                    className="text-xs font-medium text-[var(--text-secondary)]"
                  >
                    Sito web aziendale
                  </label>
                  <input
                    id="sitoWeb"
                    name="sitoWeb"
                    type="url"
                    className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#5CA9E9]/60 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/25"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="dimensioneAzienda"
                  className="text-xs font-medium text-[var(--text-secondary)]"
                >
                  Dimensione dell&apos;azienda
                </label>
                <CustomSelect
                  key={`dim-${formKey}`}
                  id="dimensioneAzienda"
                  name="dimensioneAzienda"
                  options={DIMENSIONE_OPTIONS}
                  placeholder="Seleziona"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="areaProgetto"
                    className="text-xs font-medium text-[var(--text-secondary)]"
                  >
                    Area principale del progetto
                  </label>
                  <CustomSelect
                    key={`area-${formKey}`}
                    id="areaProgetto"
                    name="areaProgetto"
                    options={AREA_PROGETTO_OPTIONS}
                    placeholder="Seleziona un'opzione"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="budget"
                    className="text-xs font-medium text-[var(--text-secondary)]"
                  >
                    Budget indicativo per il progetto
                  </label>
                  <CustomSelect
                    key={`budget-${formKey}`}
                    id="budget"
                    name="budget"
                    options={BUDGET_OPTIONS}
                    placeholder="Seleziona una fascia"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="aspettative"
                  className="text-xs font-medium text-[var(--text-secondary)]"
                >
                  Cosa ti aspetti da questo progetto? *
                </label>
                <textarea
                  id="aspettative"
                  name="aspettative"
                  required
                  rows={4}
                  className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#5CA9E9]/60 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/25"
                  placeholder="Es. nuovo sito, campagne ADV e supporto strategico per il lancio di un prodotto..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting" || !selectedDate || !selectedTime}
                className="btn-glow mt-4 w-full rounded-full bg-gradient-to-r from-[#5CA9E9] to-[#38BDF8] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "submitting"
                  ? "Conferma in corso..."
                  : "Conferma la call"}
              </button>

              {status === "success" && (
                <p className="mt-3 text-sm text-emerald-400">
                  Grazie! La tua call è stata registrata. Riceverai un
                  riepilogo via email.
                </p>
              )}

              <p className="mt-3 text-[11px] leading-relaxed text-[var(--text-muted)]">
                Cliccando &quot;Conferma la call&quot; accetti che i tuoi dati
                vengano trattati da BULU AGENCY per gestire la richiesta di
                prenotazione e i successivi contatti, nel rispetto del
                Regolamento UE 2016/679 (GDPR) e della nostra{" "}
                <a href="/privacy" className="underline hover:text-[#5CA9E9]">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          </FadeUp>
        </div>
      </Section>
    </>
  );
}

function formatDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function formatWeekdayShort(date: Date) {
  return date.toLocaleDateString("it-IT", { weekday: "short" });
}

function createSlotsForDate(date: Date): string[] {
  const day = date.getDay(); // 0 domenica, 1 lunedì, ... 6 sabato

  if (day >= 1 && day <= 5) {
    // Lunedì - Venerdì: 17:30 - 22:00 (ultimo slot prenotabile 21:30)
    return buildSlotsBetween(17, 30, 22, 0);
  }

  if (day === 6) {
    // Sabato: 9:00 - 20:00
    return buildSlotsBetween(9, 0, 20, 0);
  }

  if (day === 0) {
    // Domenica: 15:00 - 22:00
    return buildSlotsBetween(15, 0, 22, 0);
  }

  return [];
}

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
    const h = Math.floor(current / 60)
      .toString()
      .padStart(2, "0");
    const m = (current % 60).toString().padStart(2, "0");
    slots.push(`${h}:${m}`);
    current += SLOT_DURATION_MINUTES;
  }

  return slots;
}


