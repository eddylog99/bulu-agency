export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  tema: string;
  body: string;
};

export function getReadingTimeMinutes(article: Article): number {
  const words = article.body.trim().split(/\s+/).length;
  const wordsPerMinute = 200;
  return Math.max(1, Math.round(words / wordsPerMinute));
}

export const articles: Article[] = [
  {
    slug: "strategia-brand-pmi",
    title: "Come definire una strategia di brand efficace per la PMI",
    excerpt:
      "Passi pratici per posizionare il tuo brand e comunicarlo in modo coerente sui canali digitali.",
    tema: "Brand strategy",
    body: `Per una PMI, avere una strategia di brand chiara non è un optional: è la base da cui partono comunicazione, marketing e percezione del mercato. Senza posizionamento definito, il rischio è disperdere messaggi e budget.

Il primo passo è l’audit: dove si posiziona oggi il tuo brand rispetto ai competitor? Quali sono i punti di forza e le aree da rafforzare? Da qui si definiscono valori, promessa di marca e tone of voice, da declinare in modo coerente su sito, social e materiali.

Una volta fissate le fondamenta, la strategia si traduce in linee guida operative: come parli, come ti presenti, quali priorità comunichi. Così ogni touchpoint con clienti e prospect rinforza la stessa identità e il brand diventa riconoscibile e credibile.`,
  },
  {
    slug: "seo-e-contenuti",
    title: "SEO e contenuti: perché servono entrambi per crescere online",
    excerpt:
      "Come combinare ottimizzazione tecnica e contenuti di valore per attirare il pubblico giusto.",
    tema: "Digital marketing",
    body: `SEO e contenuti sono due facce della stessa medaglia: la prima fa in modo che i motori di ricerca capiscano e valorizzino le tue pagine, i secondi offrono valore reale a chi le legge. Senza contenuti utili, la SEO resta un esercizio vuoto; senza SEO, anche i migliori contenuti faticano a essere scoperti.

L’approccio efficace parte dagli intenti di ricerca del tuo pubblico: quali domande ha? Quali problemi vuole risolvere? Su quelle keyword e topic si costruiscono pagine e articoli chiari, ben strutturati e ottimizzati (titoli, meta, intestazioni, link interni). I contenuti devono rispondere davvero alla domanda, non solo “riempire” la pagina.

Nel tempo, questo lavoro genera traffico qualificato, autorità di dominio e opportunità di conversione. SEO e contenuti insieme creano un volano: più visibilità, più lettori, più segnali positivi per i motori, più visibilità.`,
  },
  {
    slug: "dati-e-decisioni-campagne",
    title: "Dati e decisioni: usare i numeri per ottimizzare le campagne",
    excerpt:
      "KPI, report e metriche che contano per prendere decisioni informate sul marketing.",
    tema: "Performance",
    body: `Le campagne di advertising e marketing possono essere migliorate in modo continuo solo se si guardano i dati giusti e si agisce di conseguenza. Non tutti i numeri sono uguali: ciò che conta è allineare le metriche agli obiettivi di business (lead, vendite, awareness) e leggere i report con una logica di ottimizzazione.

I KPI da monitorare dipendono dalla fase del funnel: dalla reach e dalle impression in alto, al costo per lead e al tasso di conversione in basso. Dashboard sintetiche e report periodici aiutano a capire cosa funziona e cosa no, senza perdersi in decine di grafici inutili.

La chiave è usare i dati per decidere: dove aumentare il budget, dove fermare un canale, quali creatività o audience testare. Decisioni guidate dai numeri riducono gli sprechi e aumentano il ROI, trasformando il marketing da spesa a investimento misurabile.`,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
