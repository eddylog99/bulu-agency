"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Section,
  FadeUp,
  FadeUpStagger,
  fadeUpItem,
} from "@/components/Section";
import { CustomSelect } from "@/components/CustomSelect";
import LogoMarquee from "@/components/LogoMarquee";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { CountUp } from "@/components/ui/count-up";

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

const services = [
  {
    title: "Brand Strategy",
    description:
      "Posizionamento, identità e messaggi chiari per far risaltare il tuo brand nel mercato.",
    icon: "◆",
  },
  {
    title: "Web Development",
    description:
      "Siti e web app performanti, ottimizzati per conversione e user experience.",
    icon: "◇",
  },
  {
    title: "Content & Social Media",
    description:
      "Contenuti e gestione social che raccontano il tuo brand in modo strategico.",
    icon: "◈",
  },
  {
    title: "Digital Advertising",
    description:
      "Campagne ADV data-driven per lead, vendite e crescita misurabile.",
    icon: "◎",
  },
];

export default function Home() {
  const [contactStatus, setContactStatus] = useState<
    "idle" | "submitting" | "success"
  >("idle");
  const [formKey, setFormKey] = useState(0);

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setContactStatus("submitting");
    const formData = new FormData(event.currentTarget);
    console.log("Richiesta contatto BULU AGENCY (home)", Object.fromEntries(formData));
    setTimeout(() => {
      setContactStatus("success");
      event.currentTarget.reset();
      setFormKey((k) => k + 1);
    }, 700);
  }

  return (
    <>
      {/* Hero */}
      <Section spacing={false}>
        <div className="hero-glow absolute left-0 right-0 top-0 h-[80vh] max-h-[700px] pointer-events-none" />
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="starfield" />
          <ShootingStars
            starColor="#5CA9E9"
            trailColor="#38BDF8"
            minSpeed={12}
            maxSpeed={30}
            minDelay={1600}
            maxDelay={4200}
            maxStars={14}
            starWidth={22}
            starHeight={3}
            className="opacity-90"
          />
        </div>
        <div className="relative pt-8 pb-20 md:pt-12 md:pb-28">
          <FadeUp>
            <div className="mb-6 flex justify-center">
              <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--card-bg)] px-4 py-1.5 text-xs font-medium text-[var(--text-secondary)]">
                Scelto da brand moderni
              </span>
            </div>
            <h1 className="text-display text-center font-bold text-[var(--text-primary)]">
              <span className="bg-gradient-to-r from-[#5CA9E9] via-[#38BDF8] to-[#FFFFFF] bg-clip-text text-transparent">
                Esperienze digitali che fanno crescere il tuo business
              </span>
          </h1>
            <p className="text-hero-sub mx-auto mt-6 max-w-2xl text-center">
              Un unico partner per strategia, web, contenuti e advertising.
              Risultati concreti e misurabili.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/contattaci">
                <InteractiveHoverButton text="Inizia un progetto" />
              </Link>
              <Link
                href="/servizi"
                className="inline-flex items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--card-bg)] px-6 py-3 text-sm font-semibold text-white transition hover:border-[#5CA9E9]/70 hover:bg-[#0B2944]"
              >
                Scopri i servizi
              </Link>
            </div>
            <div className="mt-16">
              <p className="text-center text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                I nostri partner tecnologici
              </p>
              <LogoMarquee />
            </div>
          </FadeUp>
        </div>
      </Section>

      {/* Services preview */}
      <Section>
        <FadeUp>
          <h2 className="text-section-title max-w-3xl text-[var(--text-primary)]">
            Come possiamo <span className="faq-heading">aiutarti</span>
          </h2>
        </FadeUp>
        <FadeUpStagger className="mt-12 grid gap-6 sm:grid-cols-2">
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={fadeUpItem}
              className="glass-card hover-lift group flex flex-col rounded-[var(--radius-card)] p-6"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#5CA9E9]/25 to-[#38BDF8]/25 text-xl text-[#5CA9E9]">
                {s.icon}
              </div>
              <h3 className="text-card-title text-[var(--text-primary)]">
                {s.title}
              </h3>
              <p className="mt-2 text-body flex-1">{s.description}</p>
              <Link
                href="/servizi"
                className="mt-4 text-sm font-semibold text-[#5CA9E9] transition hover:text-[#38BDF8]"
              >
                Scopri di più →
              </Link>
            </motion.div>
          ))}
        </FadeUpStagger>
      </Section>

      {/* Value / Punti chiave split */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: 40, label: "Progetti completati", suffix: "+" },
              { value: 2, label: "Milioni di utenti raggiunti", suffix: "M+" },
              { value: 3, label: "Anni di esperienza", suffix: "+" },
              { value: 25, label: "Brand supportati", suffix: "+" },
            ].map((item) => (
              <FadeUp
                key={item.label}
                className="glass-card flex flex-col justify-center rounded-[var(--radius-card)] p-6 min-h-[120px]"
              >
                <span className="text-3xl font-bold tabular-nums text-[#5CA9E9] md:text-4xl">
                  <CountUp to={item.value} duration={1.6} />
                  {item.suffix && <span>{item.suffix}</span>}
                </span>
                <p className="mt-2 text-sm font-medium text-[var(--text-primary)]">
                  {item.label}
                </p>
              </FadeUp>
            ))}
          </div>
          <FadeUp>
            <h2 className="text-section-title text-[var(--text-primary)]">
              Strategia, creatività e dati al servizio del tuo{" "}
              <span className="faq-heading">obiettivo</span>
            </h2>
            <p className="text-body mt-4">
              Uniamo analisi del mercato, posizionamento di brand e
              esecuzione operativa. Ogni progetto parte da obiettivi chiari e
              KPI misurabili, così puoi vedere l&apos;impatto reale delle
              nostre attività.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { label: "Analisi e reporting", desc: "Dashboard e report chiari sui risultati" },
                { label: "Performance marketing", desc: "Campagne ottimizzate sui dati" },
              ].map((card) => (
                <div
                  key={card.label}
                  className="glass-card rounded-xl p-4"
                >
                  <h4 className="font-semibold text-[var(--text-primary)]">
                    {card.label}
                  </h4>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </Section>

      {/* Case study */}
      <Section>
        <FadeUp>
          <div className="glass-card overflow-hidden rounded-[var(--radius-card)] border-[var(--border-subtle)] md:flex">
            <div className="img-zoom relative h-64 flex-1 md:h-80">
            <Image
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop"
                alt="Progetto digitale"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center p-8 md:p-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#5CA9E9]">
                Progetto di successo
              </span>
              <h2 className="mt-2 text-2xl font-bold leading-tight text-[var(--text-primary)]">
                Come abbiamo aiutato una PMI italiana a scalare con una
                strategia efficace
              </h2>
              <p className="text-body mt-4">
                Un percorso integrato per portare il brand online con
                risultati concreti e misurabili.
              </p>
              <Link href="/servizi">
                <InteractiveHoverButton
                  text="Vedi il progetto"
                  className="mt-6"
                />
              </Link>
            </div>
          </div>
        </FadeUp>
      </Section>

      {/* FAQ */}
      <Section className="mx-auto max-w-2xl">
        <FadeUp>
          <h2 className="text-section-title text-center text-[var(--text-primary)]">
            <span className="faq-heading">Domande frequenti</span>
          </h2>
          <p className="text-body mt-2 text-center">
            Risposte rapide alle domande più comuni su come lavoriamo.
          </p>
        </FadeUp>
        <FadeUpStagger className="mt-10 space-y-3">
          {faqs.map((item, index) => (
            <FAQItem key={item.question} index={index} {...item} />
          ))}
        </FadeUpStagger>
      </Section>

      {/* Contattaci / Form */}
      <Section>
        <FadeUp className="mx-auto max-w-2xl text-center">
          <h2 className="text-section-title text-[var(--text-primary)]">
            Parliamo del tuo{" "}
            <span className="text-[#5CA9E9]">progetto</span>
          </h2>
          <p className="text-body mt-2">
            Compila il form qui sotto per fissare una call conoscitiva.
          </p>
        </FadeUp>
        <FadeUp className="mx-auto mt-10 max-w-2xl">
          <form
            onSubmit={handleContactSubmit}
            className="glass-card rounded-[var(--radius-card)] p-6 md:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="home-name" className="text-xs font-medium text-[var(--text-secondary)]">Nome e cognome *</label>
                <input id="home-name" name="name" required className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#5CA9E9]/60 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/25" placeholder="Mario Rossi" />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="home-email" className="text-xs font-medium text-[var(--text-secondary)]">Email *</label>
                <input id="home-email" name="email" type="email" required className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#5CA9E9]/60 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/25" placeholder="nome@azienda.it" />
              </div>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="home-telefono" className="text-xs font-medium text-[var(--text-secondary)]">Telefono *</label>
                <input id="home-telefono" name="telefono" type="tel" required className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#5CA9E9]/60 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/25" placeholder="+39 ..." />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="home-company" className="text-xs font-medium text-[var(--text-secondary)]">Azienda (opzionale)</label>
                <input id="home-company" name="company" className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#5CA9E9]/60 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/25" placeholder="Nome azienda" />
              </div>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="home-budget" className="text-xs font-medium text-[var(--text-secondary)]">Budget indicativo per il progetto</label>
                <CustomSelect key={`budget-${formKey}`} id="home-budget" name="budget" options={BUDGET_OPTIONS} placeholder="Seleziona una fascia" />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="home-servizio" className="text-xs font-medium text-[var(--text-secondary)]">Servizio interessato</label>
                <CustomSelect key={`servizio-${formKey}`} id="home-servizio" name="servizio" options={SERVIZIO_OPTIONS} placeholder="Seleziona un'opzione" />
              </div>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="home-ruolo" className="text-xs font-medium text-[var(--text-secondary)]">Ruolo nell&apos;azienda</label>
                <input id="home-ruolo" name="ruolo" className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#5CA9E9]/60 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/25" placeholder="Es. CEO, Marketing Manager" />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="home-sito" className="text-xs font-medium text-[var(--text-secondary)]">Sito web aziendale</label>
                <input id="home-sito" name="sitoWeb" type="url" className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#5CA9E9]/60 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/25" placeholder="https://..." />
              </div>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="home-dimensione" className="text-xs font-medium text-[var(--text-secondary)]">Dimensione dell&apos;azienda</label>
                <CustomSelect key={`dim-${formKey}`} id="home-dimensione" name="dimensioneAzienda" options={DIMENSIONE_OPTIONS} placeholder="Seleziona" />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="home-come" className="text-xs font-medium text-[var(--text-secondary)]">Come hai sentito parlare di noi</label>
                <CustomSelect key={`come-${formKey}`} id="home-come" name="comeConosciuto" options={COME_CONOSCIUTO_OPTIONS} placeholder="Seleziona" />
              </div>
            </div>
            <div className="mt-4 space-y-1.5">
              <label htmlFor="home-progetto" className="text-xs font-medium text-[var(--text-secondary)]">Descrivi in modo specifico il progetto *</label>
              <textarea id="home-progetto" name="progetto" required rows={5} className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#5CA9E9]/60 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/25" placeholder="Obiettivi, tempistiche, contesto..." />
            </div>
            <InteractiveHoverButton
              type="submit"
              disabled={contactStatus === "submitting"}
              text={
                contactStatus === "submitting"
                  ? "Invio in corso..."
                  : "Invia messaggio"
              }
              className="mt-6 w-full justify-center"
            />
            {contactStatus === "success" && (
              <p className="mt-4 text-sm text-emerald-400">Grazie! La tua richiesta è stata inviata. Ti ricontatteremo al più presto.</p>
            )}
            <p className="mt-4 text-[11px] leading-relaxed text-[var(--text-muted)]">Inviando il form accetti che BULU AGENCY utilizzi i dati per ricontattarti. Puoi chiedere in qualsiasi momento modifica o cancellazione.</p>
          </form>
        </FadeUp>
      </Section>
    </>
  );
}

const faqs = [
  {
    question: "In cosa è specializzata BULU AGENCY?",
    answer:
      "Siamo un’agenzia digitale verticale su brand strategy, sviluppo web, content & social e digital advertising. Lavoriamo con un approccio integrato: strategia, creatività e performance in un unico partner.",
  },
  {
    question: "Con che tipo di clienti lavorate?",
    answer:
      "Collaboriamo con PMI, professionisti e brand in crescita che vogliono posizionarsi in modo chiaro e usare il digitale come leva di business, non solo come vetrina.",
  },
  {
    question: "Qual è il vostro processo di lavoro?",
    answer:
      "Partiamo sempre da una call conoscitiva e da un’analisi degli obiettivi. Definiamo una proposta di percorso, calendarizziamo le attività e condividiamo KPI chiari, con report periodici e momenti di allineamento.",
  },
  {
    question: "È possibile iniziare da un singolo progetto?",
    answer:
      "Sì. Possiamo partire da un singolo progetto (es. nuovo sito o lancio campagne ADV) e poi estendere la collaborazione su più ambiti se c’è allineamento di visione e risultati.",
  },
  {
    question: "Come gestite reporting e risultati?",
    answer:
      "Creiamo dashboard e report sintetici, focalizzati sui numeri che contano per il tuo business: lead, vendite, costo per risultato, crescita della community, traffico qualificato.",
  },
];

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = React.useState(index === 0);

  return (
    <motion.div
      variants={fadeUpItem}
      className="overflow-hidden rounded-[var(--radius-card)] bg-[var(--bg-secondary)]"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-4"
      >
        <span className="text-sm font-medium text-[var(--text-primary)] md:text-base">
          {question}
        </span>
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-xs text-[var(--text-secondary)] transition-transform ${
            open ? "rotate-180 text-[var(--text-primary)]" : ""
          }`}
        >
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-[var(--text-secondary)] md:px-6">
          {answer}
        </div>
      )}
    </motion.div>
  );
}
