import Link from "next/link";

export default function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl py-12">
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-[var(--text-muted)] transition hover:text-white"
      >
        ← Torna alla Home
      </Link>
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Ultimo aggiornamento: {lastUpdated}
        </p>
      </header>
      <div className="prose prose-invert prose-sm max-w-none space-y-6 text-[var(--text-secondary)] [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-white [&_ul]:list-disc [&_ul]:pl-6">
        {children}
      </div>
    </article>
  );
}
