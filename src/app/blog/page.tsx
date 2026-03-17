"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Section, FadeUp } from "@/components/Section";
import { articles, getReadingTimeMinutes } from "./articles";

function normalizeForSearch(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, " ");
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    const q = normalizeForSearch(searchQuery.trim());
    if (!q) return articles;
    return articles.filter((article) => {
      const title = normalizeForSearch(article.title);
      const excerpt = normalizeForSearch(article.excerpt);
      const tema = normalizeForSearch(article.tema);
      const body = normalizeForSearch(article.body);
      return (
        title.includes(q) ||
        excerpt.includes(q) ||
        tema.includes(q) ||
        body.includes(q)
      );
    });
  }, [searchQuery]);

  return (
    <>
      <Section spacing={false}>
        <div className="hero-glow absolute left-0 right-0 top-0 h-[40vh] max-h-[320px] pointer-events-none" />
        <div className="relative pb-12 pt-4 md:pb-16">
          <FadeUp className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#5CA9E9]">
              Blog
            </p>
            <h1 className="text-display mt-3 font-bold text-[var(--text-primary)]">
              Idee e pratiche per far{" "}
              <span className="faq-heading">crescere</span> il tuo brand online
            </h1>
            <p className="text-hero-sub mx-auto mt-5 max-w-xl">
              Guide pratiche e aggiornamenti sulle novità digitali per portare
              la tua azienda al livello successivo.
            </p>
          </FadeUp>
          <FadeUp className="mx-auto mt-10 max-w-xl">
            <div className="glass-card flex items-center gap-3 rounded-full px-4 py-2.5">
              <input
                type="search"
                placeholder="Cerca articoli..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
                aria-label="Cerca articoli"
              />
            </div>
          </FadeUp>
        </div>
      </Section>

      <Section>
        {filteredArticles.length === 0 ? (
          <FadeUp>
            <p className="text-center text-[var(--text-secondary)]">
              Nessun articolo trovato per &quot;{searchQuery}&quot;. Prova con altre parole.
            </p>
          </FadeUp>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <FadeUp key={article.slug}>
                <Link
                  href={`/blog/${article.slug}`}
                  className="group block rounded-[var(--radius-card)]"
                >
                  <div className="glass-card hover-lift p-6">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#5CA9E9]">
                        {article.tema}
                      </span>
                      <span className="inline-flex items-center justify-center rounded-full border border-[var(--border-subtle)] px-2.5 py-1 text-[10px] font-medium text-[var(--text-secondary)]">
                        {getReadingTimeMinutes(article)} min
                      </span>
                    </div>
                    <h2 className="mt-2 font-semibold leading-snug text-[var(--text-primary)] transition group-hover:text-[#5CA9E9]">
                      {article.title}
                    </h2>
                    <p className="mt-2 text-sm text-[var(--text-secondary)] line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
