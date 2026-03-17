import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, FadeUp } from "@/components/Section";
import { articles, getArticleBySlug, getReadingTimeMinutes } from "../articles";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <Section spacing={false}>
        <div className="hero-glow absolute left-0 right-0 top-0 h-[40vh] max-h-[320px] pointer-events-none" />
        <div className="relative pb-12 pt-4 md:pb-16">
          <FadeUp>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] transition hover:border-[#5CA9E9]/60 hover:bg-white/5 hover:text-[#5CA9E9]"
            >
              <span aria-hidden>←</span>
              Blog
            </Link>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider">
              <span className="text-[#5CA9E9]">{article.tema}</span>
              <span className="inline-flex items-center justify-center rounded-full border border-[var(--border-subtle)] px-2.5 py-1 text-[10px] font-medium text-[var(--text-secondary)]">
                {getReadingTimeMinutes(article)} min
              </span>
            </div>
            <h1 className="text-display mt-2 font-bold text-[var(--text-primary)]">
              {article.title}
            </h1>
            <p className="text-hero-sub mt-4 max-w-2xl">
              {article.excerpt}
            </p>
          </FadeUp>
        </div>
      </Section>

      <Section>
        <FadeUp className="mx-auto max-w-3xl">
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="whitespace-pre-line text-[var(--text-secondary)] leading-relaxed">
              {article.body}
            </div>
          </div>
        </FadeUp>
      </Section>
    </>
  );
}
