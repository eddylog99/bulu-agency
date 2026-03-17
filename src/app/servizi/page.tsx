"use client";

import Link from "next/link";
import { Section, FadeUp } from "@/components/Section";

const services = [
  {
    title: "Brand Strategy",
    subtitle: "Posizionamento, identità e messaggi chiari",
    description:
      "Analizziamo il mercato, la concorrenza e il tuo brand per definire una strategia distintiva. Dalla piattaforma di marca al tone of voice, creiamo le fondamenta per una comunicazione coerente su tutti i canali.",
    bullets: [
      "Audit del brand e del contesto competitivo",
      "Definizione di valori, promessa e posizionamento",
      "Linee guida di comunicazione e tone of voice",
      "Roadmap strategica per la presenza digitale",
    ],
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
    imageLeft: true,
  },
  {
    title: "Web Development",
    subtitle: "Siti e web app ad alte prestazioni",
    description:
      "Progettiamo e sviluppiamo esperienze digitali su misura, ottimizzate per conversioni, SEO e performance. Ogni interfaccia è pensata per essere chiara, veloce e orientata ai risultati.",
    bullets: [
      "Siti vetrina, landing page e mini siti di campagna",
      "Sviluppo front-end moderno (Next.js, React)",
      "Performance, sicurezza e ottimizzazione SEO tecnica",
      "Integrazioni con strumenti di marketing e automazioni",
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    imageLeft: false,
  },
  {
    title: "Content & Social Media",
    subtitle: "Contenuti che raccontano il tuo brand",
    description:
      "Costruiamo piani editoriali strutturati e contenuti pensati per il tuo pubblico, in linea con il posizionamento del brand. Diamo continuità alla tua presenza sui social con una regia strategica.",
    bullets: [
      "Strategia editoriale per social e blog",
      "Copywriting, visual e creatività in linea con il brand",
      "Gestione operativa dei canali social",
      "Reportistica periodica e ottimizzazione continua",
    ],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    imageLeft: true,
  },
  {
    title: "Digital Advertising",
    subtitle: "Campagne data-driven orientate alla crescita",
    description:
      "Progettiamo funnel e campagne ADV multi-canale per generare lead, vendite e opportunità commerciali. Le decisioni sono guidate dai dati, non dalle impressioni.",
    bullets: [
      "Campagne su Meta, Google, LinkedIn e altre piattaforme",
      "Setup di tracciamenti e conversioni",
      "Test A/B su creatività, audience e landing",
      "Report chiari e azionabili sui risultati",
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    imageLeft: false,
  },
];

export default function ServiziPage() {
  return (
    <>
      <Section spacing={false}>
        <div className="hero-glow absolute left-0 right-0 top-0 h-[50vh] max-h-[400px] pointer-events-none" />
        <div className="relative pb-16 pt-4 md:pb-24">
          <FadeUp>
            <h1 className="text-display font-bold text-[var(--text-primary)]">
              I nostri servizi
            </h1>
            <p className="text-hero-sub mt-6 max-w-2xl">
              Dalla strategia di brand allo sviluppo web, dai contenuti alle
              campagne ADV: un percorso integrato per trasformare le idee in
              risultati misurabili.
            </p>
          </FadeUp>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          {services.map((service, i) => (
            <FadeUp key={service.title}>
              <div className="glass-card flex h-full flex-col rounded-[var(--radius-card)] p-6">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#5CA9E9]/20 to-[#38BDF8]/20 text-xs font-semibold text-[#5CA9E9]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-secondary)] text-right">
                    {service.subtitle}
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-[var(--text-primary)]">
                  {service.title}
                </h2>
                <p className="text-body mt-3">{service.description}</p>
                <ul className="mt-5 space-y-2">
                  {service.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-[var(--text-secondary)]"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[#5CA9E9]" />
                      <span className="text-sm">{b}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/prenota-una-call"
                  className="btn-glow mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#5CA9E9] to-[#38BDF8] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Richiedi consulenza
                </Link>
              </div>
            </FadeUp>
          ))}
        </div>
      </Section>

      <Section>
        <FadeUp className="mx-auto max-w-2xl">
          <div className="glass-card rounded-[var(--radius-card)] border border-[#5CA9E9]/30 bg-gradient-to-br from-[#0B2944] via-transparent to-transparent p-6 text-center md:p-8">
            <h2 className="text-section-title text-[var(--text-primary)]">
              <span className="faq-heading">Test comunicazione per PMI</span>
            </h2>
            <p className="text-body mx-auto mt-3 max-w-xl">
              Un piccolo check-up gratuito per capire se messaggi, canali e
              numeri stanno davvero lavorando nella stessa direzione del tuo
              business.
            </p>
            <Link
              href="/servizi/test-comunicazione"
              className="btn-glow mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#5CA9E9] to-[#38BDF8] px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Fai ora il test
            </Link>
          </div>
        </FadeUp>
      </Section>

      <Section>
        <FadeUp className="text-center">
          <h2 className="text-section-title text-[var(--text-primary)]">
            Vuoi un percorso su <span className="faq-heading">misura</span>?
          </h2>
          <p className="text-body mx-auto mt-4 max-w-xl">
            Ogni progetto parte da un confronto sugli obiettivi. Scrivici e
            ti proponiamo una call di allineamento.
          </p>
          <Link
            href="/prenota-una-call"
            className="btn-glow mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#5CA9E9] to-[#38BDF8] px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Prenota una call
          </Link>
        </FadeUp>
      </Section>
    </>
  );
}
