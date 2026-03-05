"use client";

import Image from "next/image";
import Link from "next/link";
import { Section, FadeUp, FadeUpStagger, fadeUpItem } from "@/components/Section";
import { motion } from "framer-motion";

const metrics = [
  { value: "40+", label: "Progetti completati" },
  { value: "3+", label: "Anni di esperienza" },
  { value: "25+", label: "Brand supportati" },
];

export default function ChiSiamoPage() {
  return (
    <>
      <Section spacing={false}>
        <div className="hero-glow absolute left-0 right-0 top-0 h-[50vh] max-h-[400px] pointer-events-none" />
        <div className="relative pb-16 pt-4 md:pb-24">
          <FadeUp>
            <h1 className="text-display font-bold text-[var(--text-primary)]">
              La nostra agenzia
            </h1>
            <p className="text-hero-sub mt-6 max-w-2xl">
              Un team che unisce strategia, creatività e tecnologia per
              accompagnare i brand nella crescita digitale. Missione, visione e
              metodo al servizio dei tuoi obiettivi.
            </p>
          </FadeUp>
        </div>
      </Section>

      {/* Agency story */}
      <Section>
        <FadeUp>
          <div className="glass-card overflow-hidden rounded-[var(--radius-card)] md:flex">
            <div className="img-zoom relative h-72 flex-1 md:h-auto md:min-h-[400px]">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
                alt="Team BULU Agency"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center p-8 md:p-12">
              <h2 className="text-2xl font-bold leading-tight text-[var(--text-primary)] md:text-3xl">
                Aiutiamo i brand a sviluppare prodotti e servizi pronti per il
                mercato che scalano.
              </h2>
              <p className="text-body mt-4">
                BULU AGENCY nasce per affiancare aziende e professionisti nella
                costruzione di una presenza digitale solida. Dal posizionamento
                alla messa a terra operativa, uniamo analisi, creatività e
                esecuzione in un unico partner.
              </p>
              <div className="mt-10 grid grid-cols-2 gap-6 sm:flex sm:flex-wrap sm:gap-8">
                {metrics.map((m) => (
                  <div key={m.label}>
                    <p className="text-3xl font-bold tabular-nums text-[#5CA9E9] md:text-4xl">
                      {m.value}
                    </p>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </Section>

      {/* Mission & Vision */}
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <FadeUp>
            <div className="glass-card hover-lift flex flex-col rounded-[var(--radius-card)] p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5CA9E9]/20 to-[#38BDF8]/20">
                <span className="text-2xl">◇</span>
              </div>
              <h3 className="text-card-title text-[var(--text-primary)]">
                La nostra missione
              </h3>
              <p className="text-body mt-3 flex-1">
                Offrire strategia e esecuzione digitale di livello premium,
                con un linguaggio chiaro e risultati misurabili. Vogliamo
                essere il partner di fiducia per chi vuole crescere online
                senza perdere tempo e budget in progetti dispersivi.
              </p>
            </div>
          </FadeUp>
          <FadeUp>
            <div className="glass-card hover-lift flex flex-col rounded-[var(--radius-card)] p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5CA9E9]/20 to-[#38BDF8]/20">
                <span className="text-2xl">◆</span>
              </div>
              <h3 className="text-card-title text-[var(--text-primary)]">
                La nostra visione
              </h3>
              <p className="text-body mt-3 flex-1">
                Un digitale in cui strategia, creatività e dati lavorano
                insieme. Crediamo nell&apos;evoluzione del marketing grazie
                all&apos;AI e all&apos;automazione intelligente, sempre
                con obiettivi concreti e trasparenza verso il cliente.
              </p>
            </div>
          </FadeUp>
        </div>
      </Section>

      {/* I nostri valori */}
      <Section>
        <FadeUp className="text-center">
          <h2 className="text-section-title text-[var(--text-primary)]">
            I nostri valori
          </h2>
          <p className="text-body mt-2 text-[var(--text-secondary)]">
            I principi che guidano il nostro lavoro ogni giorno.
          </p>
        </FadeUp>
        <FadeUpStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Trasparenza", desc: "Obiettivi chiari, report periodici e comunicazione diretta con il cliente." },
            { title: "Risultati misurabili", desc: "KPI definiti insieme e focus su dati e performance concrete." },
            { title: "Approccio integrato", desc: "Strategia, creatività e esecuzione in un unico partner." },
            { title: "Flessibilità", desc: "Partiamo da un singolo progetto e ci adattiamo alla tua crescita." },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUpItem}
              className="glass-card hover-lift rounded-[var(--radius-card)] p-6"
            >
              <h3 className="font-semibold text-[var(--text-primary)]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </FadeUpStagger>
      </Section>

      <Section>
        <FadeUp className="text-center">
          <h2 className="text-section-title text-[var(--text-primary)]">
            Pronto a far crescere il tuo brand?
          </h2>
          <Link
            href="/book-a-call"
            className="btn-glow mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#5CA9E9] to-[#38BDF8] px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Prenota una call
          </Link>
        </FadeUp>
      </Section>
    </>
  );
}
