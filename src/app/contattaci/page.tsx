"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Section, FadeUp } from "@/components/Section";
import { CustomSelect } from "@/components/CustomSelect";

const BUDGET_OPTIONS = [
  { value: "<5k", label: "Fino a 5.000 €" },
  { value: "5-10k", label: "5.000 – 10.000 €" },
  { value: "10-20k", label: "10.000 – 20.000 €" },
  { value: ">20k", label: "Oltre 20.000 €" },
  { value: "da-definire", label: "Da definire insieme" },
];
const SERVIZIO_OPTIONS = [
  { value: "brand", label: "Brand strategy & posizionamento" },
  { value: "web", label: "Web design & development" },
  { value: "content", label: "Content, social e storytelling" },
  { value: "adv", label: "Digital advertising & performance" },
  { value: "mix", label: "Un mix di questi ambiti" },
  { value: "altro", label: "Altro" },
];
const DIMENSIONE_OPTIONS = [
  { value: "1-10", label: "Da 1 a 10 dipendenti" },
  { value: "11-50", label: "Da 11 a 50 dipendenti" },
  { value: "51-200", label: "Da 51 a 200 dipendenti" },
  { value: "200+", label: "Oltre 200 dipendenti" },
];
const COME_CONOSCIUTO_OPTIONS = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "youtube", label: "YouTube" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "passaparola", label: "Passa parola o altro" },
];

const contactInfo = [
  { label: "Email", value: "info@buluagency.it", href: "mailto:info@buluagency.it" },
  { label: "Sede", value: "Roma, Italia" },
];

export default function ContattaciPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formKey, setFormKey] = useState(0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload: Record<string, string> = { source: "Contattaci" };
    formData.forEach((value, key) => {
      payload[key] = String(value);
    });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Invio fallito");
      setStatus("success");
      form.reset();
      setFormKey((k) => k + 1);
    } catch {
      setStatus("idle");
    }
  }

  return (
    <>
      <Section spacing={false}>
        <div className="hero-glow absolute left-0 right-0 top-0 h-[40vh] max-h-[320px] pointer-events-none" />
        <div className="relative pb-12 pt-4 md:pb-16">
          <FadeUp>
            <h1 className="text-display font-bold text-[var(--text-primary)]">
              Lavoriamo insieme
            </h1>
            <p className="text-hero-sub mt-6 max-w-xl">
              Raccontaci il tuo progetto. Ti rispondiamo entro 1–2 giorni
              lavorativi con una proposta di confronto.
            </p>
          </FadeUp>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          {/* Contact info */}
          <FadeUp className="space-y-8">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">
              Contatti
            </h2>
            <ul className="space-y-6">
              {contactInfo.map((item) => (
                <li key={item.label}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-1 block text-[var(--text-primary)] transition hover:text-[#5CA9E9]"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-[var(--text-primary)]">
                      {item.value}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </FadeUp>

          {/* Form */}
          <FadeUp>
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-[var(--radius-card)] p-6 md:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-medium text-[var(--text-secondary)]">Nome e cognome *</label>
                  <input id="name" name="name" required className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#5CA9E9]/60 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/25" placeholder="Mario Rossi" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-medium text-[var(--text-secondary)]">Email *</label>
                  <input id="email" name="email" type="email" required className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#5CA9E9]/60 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/25" placeholder="nome@azienda.it" />
                </div>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="telefono" className="text-xs font-medium text-[var(--text-secondary)]">Telefono *</label>
                  <input id="telefono" name="telefono" type="tel" required className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#5CA9E9]/60 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/25" placeholder="+39 ..." />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="company" className="text-xs font-medium text-[var(--text-secondary)]">Azienda (opzionale)</label>
                  <input id="company" name="company" className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#5CA9E9]/60 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/25" placeholder="Nome azienda" />
                </div>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="budget" className="text-xs font-medium text-[var(--text-secondary)]">Budget indicativo per il progetto</label>
                  <CustomSelect key={`b-${formKey}`} id="budget" name="budget" options={BUDGET_OPTIONS} placeholder="Seleziona una fascia" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="servizio" className="text-xs font-medium text-[var(--text-secondary)]">Servizio interessato</label>
                  <CustomSelect key={`s-${formKey}`} id="servizio" name="servizio" options={SERVIZIO_OPTIONS} placeholder="Seleziona un'opzione" />
                </div>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="ruolo" className="text-xs font-medium text-[var(--text-secondary)]">Ruolo nell&apos;azienda</label>
                  <input id="ruolo" name="ruolo" className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#5CA9E9]/60 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/25" placeholder="Es. CEO, Marketing Manager" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="sitoWeb" className="text-xs font-medium text-[var(--text-secondary)]">Sito web aziendale</label>
                  <input id="sitoWeb" name="sitoWeb" type="url" className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#5CA9E9]/60 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/25" placeholder="https://..." />
                </div>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="dimensioneAzienda" className="text-xs font-medium text-[var(--text-secondary)]">Dimensione dell&apos;azienda</label>
                  <CustomSelect key={`d-${formKey}`} id="dimensioneAzienda" name="dimensioneAzienda" options={DIMENSIONE_OPTIONS} placeholder="Seleziona" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="comeConosciuto" className="text-xs font-medium text-[var(--text-secondary)]">Come hai sentito parlare di noi</label>
                  <CustomSelect key={`c-${formKey}`} id="comeConosciuto" name="comeConosciuto" options={COME_CONOSCIUTO_OPTIONS} placeholder="Seleziona" />
                </div>
              </div>
              <div className="mt-4 space-y-1.5">
                <label htmlFor="progetto" className="text-xs font-medium text-[var(--text-secondary)]">Descrivi in modo specifico il progetto *</label>
                <textarea id="progetto" name="progetto" required rows={5} className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#5CA9E9]/60 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/25" placeholder="Obiettivi, tempistiche, contesto..." />
              </div>
              <button type="submit" disabled={status === "submitting"} className="btn-glow mt-6 w-full rounded-full bg-gradient-to-r from-[#5CA9E9] to-[#38BDF8] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70">
                {status === "submitting" ? "Invio in corso..." : "Invia messaggio"}
              </button>
              {status === "success" && (
                <p className="mt-4 text-sm text-emerald-400">Grazie! La tua richiesta è stata inviata. Ti ricontatteremo al più presto.</p>
              )}
              <p className="mt-4 text-[11px] leading-relaxed text-[var(--text-muted)]">Inviando il form accetti che BULU AGENCY utilizzi i dati per ricontattarti. Puoi chiedere in qualsiasi momento modifica o cancellazione.</p>
            </form>
          </FadeUp>
        </div>
      </Section>

      {/* Final CTA */}
      <Section>
        <FadeUp>
          <div className="glass-card rounded-[var(--radius-card)] border-[#5CA9E9]/25 bg-gradient-to-br from-[#0B2944] via-transparent to-transparent p-12 text-center md:p-16">
            <h2 className="text-section-title text-[var(--text-primary)]">
              Pronto a far crescere il tuo brand?
            </h2>
            <p className="text-body mx-auto mt-4 max-w-md">
              Prenota una call senza impegno. Parliamo del tuo progetto e di
              come possiamo aiutarti a raggiungere i tuoi obiettivi.
            </p>
            <Link
              href="/prenota-una-call"
              className="btn-glow mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#5CA9E9] to-[#38BDF8] px-8 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Prenota una call
            </Link>
          </div>
        </FadeUp>
      </Section>
    </>
  );
}
