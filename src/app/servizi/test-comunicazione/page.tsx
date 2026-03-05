'use client';

import { useState } from 'react';
import { Section, FadeUp } from '@/components/Section';
import Link from 'next/link';

type Option = { value: string; label: string; score: number };
type Question = { id: string; title: string; description?: string; options: Option[] };

const questions: Question[] = [
  {
    id: 'obiettivi',
    title: 'Come definite gli obiettivi della vostra comunicazione digitale?',
    options: [
      { value: 'scritti-chiari', label: 'Sono scritti, chiari e condivisi con il team', score: 0 },
      { value: 'abbastanza-chiari', label: 'Sono abbastanza chiari ma non sempre condivisi', score: 1 },
      { value: 'non-chiari', label: 'Non sono scritti o cambiano spesso', score: 2 },
    ],
  },
  {
    id: 'target',
    title: 'Quanto è definito il vostro pubblico di riferimento?',
    options: [
      { value: 'personas', label: 'Abbiamo personas e segmenti ben definiti', score: 0 },
      { value: 'idea-generica', label: 'Abbiamo un’idea generale ma non dettagliata', score: 1 },
      { value: 'tutti', label: 'Parliamo “a tutti” senza un target preciso', score: 2 },
    ],
  },
  {
    id: 'messaggi',
    title: 'I messaggi chiave del brand sono…',
    options: [
      { value: 'coerenti', label: 'Coerenti su sito, social e materiali', score: 0 },
      { value: 'a-macchia', label: 'Abbastanza coerenti ma con differenze tra canali', score: 1 },
      { value: 'dispersivi', label: 'Molto diversi a seconda di chi comunica', score: 2 },
    ],
  },
  {
    id: 'piano-editoriale',
    title: 'Come gestite la pubblicazione di contenuti?',
    options: [
      { value: 'piano-stabile', label: 'Con un piano editoriale stabile e calendarizzato', score: 0 },
      { value: 'quando-riusciamo', label: 'Pubblicando quando riusciamo, senza calendario fisso', score: 1 },
      { value: 'rare-volte', label: 'Solo in occasione di lanci o fiere', score: 2 },
    ],
  },
  {
    id: 'kpi',
    title: 'Che tipo di numeri guardate per valutare i risultati?',
    options: [
      { value: 'kpi-business', label: 'KPI legati al business (lead, opportunità, vendite)', score: 0 },
      { value: 'vanity-and-kpi', label: 'Un mix di KPI di business e vanity metrics', score: 1 },
      { value: 'solo-vanity', label: 'Principalmente like, follower, visualizzazioni', score: 2 },
    ],
  },
  {
    id: 'report',
    title: 'Con che frequenza analizzate i risultati?',
    options: [
      { value: 'mensile', label: 'Almeno una volta al mese con un report strutturato', score: 0 },
      { value: 'saltuario', label: 'Ogni tanto, quando c’è tempo', score: 1 },
      { value: 'quasi-mai', label: 'Quasi mai o solo a fine anno', score: 2 },
    ],
  },
  {
    id: 'coordinamento',
    title: 'Come viene coordinato il lavoro tra chi gestisce sito, social e ADV?',
    options: [
      { value: 'coordinato', label: 'Da una regia unica che coordina tutti i canali', score: 0 },
      { value: 'parziale', label: 'Ogni canale ha un referente, ci coordiniamo ma non sempre', score: 1 },
      { value: 'silos', label: 'Ognuno lavora per conto suo, senza un allineamento costante', score: 2 },
    ],
  },
];

function buildResult(totalScore: number) {
  if (totalScore <= 4) {
    return {
      title: 'La tua comunicazione è su buone basi ✨',
      body:
        'Avete già una struttura solida: obiettivi, pubblico e messaggi sono abbastanza chiari. ' +
        'Il prossimo passo è raffinare i dettagli (piano editoriale, reporting e coordinamento tra i canali) per scalare i risultati.',
    };
  }
  if (totalScore <= 9) {
    return {
      title: 'C’è margine per migliorare 💡',
      body:
        'Alcuni elementi della comunicazione funzionano, altri sono più deboli. ' +
        'In particolare, vale la pena lavorare su obiettivi, allineamento dei messaggi e KPI, così ogni attività ha un ruolo chiaro nel percorso del cliente.',
    };
  }
  return {
    title: 'La comunicazione sta frenando la crescita 🚧',
    body:
      'Mancano basi strutturate (obiettivi, target, messaggi e misurazione): il rischio è investire tempo e budget senza vedere risultati chiari. ' +
      'Un percorso guidato può aiutarvi a rimettere ordine, definire una strategia e costruire azioni coordinate sui diversi canali.',
  };
}

export default function TestComunicazionePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const question = questions[currentIndex];
  const hasAnswer = Boolean(answers[question.id]);

  const goNext = () => {
    if (!hasAnswer) return;
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setShowResult(true);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const totalScore = questions.reduce((sum, q) => {
    const value = answers[q.id];
    const opt = q.options.find((o) => o.value === value);
    return sum + (opt?.score ?? 0);
  }, 0);

  const result = showResult ? buildResult(totalScore) : null;

  return (
    <>
      <Section spacing={false}>
        <div className="hero-glow absolute left-0 right-0 top-0 h-[40vh] max-h-[320px] pointer-events-none" />
        <div className="relative pb-12 pt-4 md:pb-16">
          <FadeUp>
            <Link
              href="/servizi"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] transition hover:border-[#5CA9E9]/60 hover:bg-white/5 hover:text-[#5CA9E9]"
            >
              <span aria-hidden>←</span>
              Torna ai servizi
            </Link>
            <h1 className="text-display mt-6 font-bold text-[var(--text-primary)]">
              Test comunicazione per PMI
            </h1>
            <p className="text-hero-sub mt-4 max-w-xl">
              Rispondi a poche domande per capire quanto è allineata la tua
              comunicazione digitale ai tuoi obiettivi di business.
            </p>
          </FadeUp>
        </div>
      </Section>

      <Section>
        <FadeUp className="mx-auto max-w-2xl">
          {!showResult ? (
            <div className="glass-card rounded-[var(--radius-card)] p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Domanda {currentIndex + 1} di {questions.length}
              </p>
              <h2 className="mt-3 text-lg font-semibold text-[var(--text-primary)] md:text-xl">
                {question.title}
              </h2>
              {question.description && (
                <p className="text-body mt-2 text-sm text-[var(--text-secondary)]">
                  {question.description}
                </p>
              )}
              <div className="mt-6 space-y-3">
                {question.options.map((opt) => {
                  const selected = answers[question.id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() =>
                        setAnswers((prev) => ({
                          ...prev,
                          [question.id]: opt.value,
                        }))
                      }
                      className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition ${
                        selected
                          ? 'border-[#5CA9E9] bg-[#5CA9E9]/15 text-[var(--text-primary)]'
                          : 'border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:border-[#5CA9E9]/60 hover:bg-white/5'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={currentIndex === 0}
                  className="rounded-full border border-[var(--border-subtle)] px-4 py-2 text-xs font-medium text-[var(--text-secondary)] transition hover:border-[#5CA9E9]/60 hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Indietro
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!hasAnswer}
                  className="btn-glow rounded-full bg-gradient-to-r from-[#5CA9E9] to-[#38BDF8] px-6 py-2.5 text-xs font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {currentIndex === questions.length - 1 ? 'Vedi il risultato' : 'Avanti'}
                </button>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-[var(--radius-card)] p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Risultato del test
              </p>
              <h2 className="mt-3 text-lg font-semibold text-[var(--text-primary)] md:text-xl">
                {result?.title}
              </h2>
              <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                {result?.body}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowResult(false);
                    setCurrentIndex(0);
                  }}
                  className="rounded-full border border-[var(--border-subtle)] px-4 py-2 text-xs font-medium text-[var(--text-secondary)] transition hover:border-[#5CA9E9]/60 hover:text-[var(--text-primary)]"
                >
                  Rifai il test
                </button>
                <Link
                  href="/book-a-call"
                  className="btn-glow inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#5CA9E9] to-[#38BDF8] px-6 py-2.5 text-xs font-semibold text-white transition hover:opacity-90"
                >
                  Parliamo della tua comunicazione
                </Link>
              </div>
            </div>
          )}
        </FadeUp>
      </Section>
    </>
  );
}

