"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/servizi", label: "Servizi" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/insight", label: "Blog" },
  { href: "/contattaci", label: "Contattaci" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed left-0 right-0 top-8 z-40 flex justify-center transition-all duration-300 ${
        scrolled ? "translate-y-0" : ""
      }`}
    >
      <div className="mx-auto flex w-full max-w-[var(--content-max)] justify-center px-4">
        <div className="relative flex h-[64px] w-full max-w-4xl items-center justify-between rounded-full border border-white/8 bg-white/5 px-7 shadow-[0_24px_70px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
          <Link href="/" className="flex items-center bg-transparent pl-1">
            <Image
              src="/logo.png"
              alt="BULU AGENCY"
              width={40}
              height={40}
              className="h-10 w-10 object-contain [background:transparent]"
              unoptimized
            />
          </Link>

          <nav className="hidden items-center gap-6 text-sm md:flex">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`transition-colors ${
                  pathname === href
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <Link
            href="/book-a-call"
            className="btn-glow hidden items-center justify-center rounded-full bg-gradient-to-r from-[#5CA9E9] to-[#38BDF8] px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90 md:inline-flex md:px-5 md:text-sm"
          >
            Prenota una call
          </Link>

          {/* Hamburger menu (solo mobile) */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex flex-col justify-center gap-1.5 rounded-lg p-2 text-[var(--text-primary)] transition hover:bg-white/5 md:hidden"
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span className="block h-0.5 w-6 rounded-full bg-current" />
            <span className="block h-0.5 w-6 rounded-full bg-current" />
            <span className="block h-0.5 w-6 rounded-full bg-current" />
          </button>

          {/* Menu a cascata (solo mobile) */}
          {menuOpen && (
            <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-white/15 bg-[var(--bg-secondary)] py-3 shadow-2xl md:hidden">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`block px-5 py-3.5 text-base font-medium transition ${
                    pathname === href
                      ? "bg-[#5CA9E9]/15 text-[var(--text-primary)]"
                      : "text-[var(--text-primary)] hover:bg-white/10"
                  }`}
                >
                  {label}
                </Link>
              ))}
              <div className="mt-2 border-t border-white/10 px-3 pt-3">
                <Link
                  href="/book-a-call"
                  className="btn-glow flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#5CA9E9] to-[#38BDF8] px-4 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Prenota una call
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
