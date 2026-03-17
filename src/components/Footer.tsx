"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin } from "lucide-react";

const pages = [
  { href: "/", label: "Home" },
  { href: "/servizi", label: "Servizi" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/blog", label: "Blog" },
  { href: "/contattaci", label: "Contattaci" },
];

const services = [
  { label: "Brand Strategy" },
  { label: "Web Development" },
  { label: "Content & Social" },
  { label: "Digital Advertising" },
];

const legal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/termini-condizioni", label: "Termini e condizioni" },
  { href: "/cookie-policy", label: "Cookie policy" },
  { href: "/disclaimer", label: "Disclaimer" },
];

export default function Footer() {
  return (
    <footer className="relative mt-[var(--section-spacing)] flex-shrink-0 overflow-hidden border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
      <div className="footer-glow absolute inset-0 pointer-events-none" />

      <div className="relative mx-auto max-w-[var(--content-max)] px-6 pt-16 pb-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-32 xl:gap-48">
          {/* Logo + titolo e descrizione + social */}
          <div className="flex-shrink-0 max-w-[280px] space-y-3">
            <Link
              href="/"
              className="inline-flex flex-col gap-3 bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--glow-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-secondary)]"
            >
              <Image
                src="/logo.png"
                alt="BULU AGENCY"
                width={56}
                height={56}
                className="h-14 w-14 object-contain [background:transparent]"
                unoptimized
              />
              <p className="font-bold text-sm uppercase tracking-wider text-white">
                BULU AGENCY
              </p>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                Dal sogno alla strategia.
                <br />
                Partner per un marketing che evolve.
              </p>
            </Link>

            <div className="mt-3 flex items-center gap-3">
              <a
                href="https://www.instagram.com/buluagency/"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-subtle)] text-[var(--text-secondary)] transition hover:border-[var(--glow-blue)] hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/bulu-agency"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-subtle)] text-[var(--text-secondary)] transition hover:border-[var(--glow-blue)] hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Colonne Pagine, Servizi, Legale sulla stessa riga, distribuite in modo omogeneo */}
          <div className="flex min-w-0 flex-1 flex-nowrap gap-8 lg:gap-12 xl:gap-16">
            <div className="min-w-0 flex-1">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Pagine
              </h3>
              <ul className="space-y-2">
                {pages.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-[var(--text-secondary)] transition hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Servizi
              </h3>
              <ul className="space-y-2">
                {services.map(({ label }) => (
                  <li key={label}>
                    <Link
                      href="/servizi"
                      className="text-sm text-[var(--text-secondary)] transition hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Legale
              </h3>
              <ul className="space-y-2">
                {legal.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-[var(--text-secondary)] transition hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-8 md:flex-row">
          <p className="text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} BULU AGENCY. Tutti i diritti riservati.
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Partita IVA: 18324971003
          </p>
        </div>
      </div>
    </footer>
  );
}
