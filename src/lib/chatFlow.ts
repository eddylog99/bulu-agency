/**
 * Flusso assistenza: risposte + opzioni per guidare il cliente.
 * Risposte basate su contenuti del sito e sul blog; fallback: email o form Contattaci.
 */

import { getArticleBySlug } from "@/lib/articles";

export type ChatOption = { label: string; payload: string };

export type BotReply = {
  text: string;
  options?: ChatOption[];
  /** link da mostrare in linea (testo, href) */
  link?: { label: string; href: string };
};

const EMAIL = "info@buluagency.it";
const CONTATTACI = "/contattaci";
const SERVIZI = "/servizi";
const CHI_SIAMO = "/chi-siamo";
const BOOK_CALL = "/prenota-una-call";
const INSIGHT = "/blog";

const MONTHS_IT = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];

function formatArticleDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!d || !m) return iso;
  return `${d} ${MONTHS_IT[m - 1]} ${y}`;
}

function buildArticleReply(slug: string): BotReply | null {
  const article = getArticleBySlug(slug);
  if (!article) return null;
  const dateStr = article.publishedAt ? formatArticleDate(article.publishedAt) : "";
  const citation = dateStr
    ? `\n\nLa risposta è tratta dall'articolo «${article.title}», pubblicato il ${dateStr}.`
    : `\n\nLa risposta è tratta dall'articolo «${article.title}».`;
  return {
    text: article.excerpt + citation,
    link: { label: `Leggi l'articolo: ${article.title} →`, href: `${INSIGHT}/${article.slug}` },
    options: [
      { label: "Altro dal blog", payload: "blog" },
      { label: "Contattaci", payload: "contattaci" },
      { label: "← Torna al menu", payload: "menu" },
    ],
  };
}

/** Opzioni principali dopo welcome o "torna al menu" */
const MAIN_OPTIONS: ChatOption[] = [
  { label: "Servizi offerti", payload: "servizi" },
  { label: "Contattarci / Preventivo", payload: "contattaci" },
  { label: "Blog / Articoli", payload: "blog" },
  { label: "Chi siamo", payload: "chi siamo" },
  { label: "Altro", payload: "altro" },
];

/** Risposte per payload / messaggio utente */
const REPLIES: Record<string, BotReply> = {
  welcome: {
    text: "Ciao! Sono l'assistenza BULU AGENCY. Puoi contattarci quando vuoi: se preferisci possiamo farlo direttamente qui in chat, senza form né email. Oppure scegli un'opzione qui sotto o scrivi la tua domanda: ti aiuto a trovare informazioni sul sito e sul blog o a metterti in contatto con noi.",
    options: MAIN_OPTIONS,
  },
  servizi: {
    text: "Offriamo quattro aree principali: Brand Strategy (posizionamento e identità), Web Development (siti e web app), Content & Social (contenuti e social media), Digital Advertising (campagne ADV). Tutti i dettagli sono nella pagina Servizi.",
    link: { label: "Vai alla pagina Servizi →", href: SERVIZI },
    options: [
      { label: "Brand Strategy", payload: "brand strategy" },
      { label: "Web Development", payload: "web development" },
      { label: "Content & Social", payload: "content social" },
      { label: "Digital Advertising", payload: "digital advertising" },
      { label: "Contattaci per un preventivo", payload: "contattaci" },
      { label: "← Torna al menu", payload: "menu" },
    ],
  },
  "brand strategy": {
    text: "Brand Strategy: posizionamento, identità e messaggi chiari. Includiamo audit del brand, definizione di valori e posizionamento, linee guida di comunicazione e tone of voice, roadmap per la presenza digitale. Per prezzi e progetti su misura contattaci.",
    options: [
      { label: "Contattaci", payload: "contattaci" },
      { label: "Altri servizi", payload: "servizi" },
      { label: "← Torna al menu", payload: "menu" },
    ],
  },
  "web development": {
    text: "Web Development: siti e web app ad alte prestazioni. Siti vetrina, landing page, sviluppo front-end (Next.js, React), SEO tecnica e integrazioni con strumenti di marketing. Per un preventivo personalizzato contattaci.",
    options: [
      { label: "Contattaci", payload: "contattaci" },
      { label: "Altri servizi", payload: "servizi" },
      { label: "← Torna al menu", payload: "menu" },
    ],
  },
  "content social": {
    text: "Content & Social: contenuti che raccontano il tuo brand. Strategia editoriale, copy e visual, gestione canali social e reportistica. Per dettagli e preventivi contattaci.",
    options: [
      { label: "Contattaci", payload: "contattaci" },
      { label: "Altri servizi", payload: "servizi" },
      { label: "← Torna al menu", payload: "menu" },
    ],
  },
  "digital advertising": {
    text: "Digital Advertising: campagne data-driven su Meta, Google, LinkedIn e altre piattaforme. Setup tracciamenti e conversioni, test A/B, report sui risultati. Per una consulenza contattaci.",
    options: [
      { label: "Contattaci", payload: "contattaci" },
      { label: "Altri servizi", payload: "servizi" },
      { label: "← Torna al menu", payload: "menu" },
    ],
  },
  contattaci: {
    text: "Puoi contattarci quando vuoi. La cosa più semplice è farlo qui in chat: raccogliamo le informazioni insieme e ti rispondiamo senza che tu debba compilare form o inviare email. Se preferisci, puoi anche compilare il form nella pagina Contattaci o prenotare una call (anche quella in chat).",
    link: { label: "Pagina Contattaci →", href: CONTATTACI },
    options: [
      { label: "Compila richiesta in chat", payload: "contattaci_in_chat" },
      { label: "Prenota una call (in chat)", payload: "prenota_in_chat" },
      { label: "Inviare email", payload: "email" },
      { label: "← Torna al menu", payload: "menu" },
    ],
  },
  contattaci_in_chat: {
    text: "Perfetto! Raccolgo le informazioni qui in chat, senza form. Ti chiederò prima i dati obbligatori, poi potrai aggiungere (se vuoi) informazioni facoltative che ci aiutano a profilare meglio la tua richiesta.",
    options: [{ label: "Sì, procediamo", payload: "__start_contact_flow__" }],
  },
  "prenota call": {
    text: "Puoi prenotare una call qui in chat scegliendo data e orario, oppure dalla pagina dedicata.",
    link: { label: "Pagina Prenota call →", href: BOOK_CALL },
    options: [
      { label: "Prenota in chat", payload: "prenota_in_chat" },
      { label: "Contattaci (richiesta in chat)", payload: "contattaci_in_chat" },
      { label: "← Torna al menu", payload: "menu" },
    ],
  },
  prenota_in_chat: {
    text: "Ottimo! Ti chiederò data e orario (slot disponibili), poi i dati obbligatori e, se vuoi, alcune informazioni facoltative che ci aiutano a prepararci alla call.",
    options: [{ label: "Sì, prenoto in chat", payload: "__start_book_flow__" }],
  },
  email: {
    text: `Scrivici a ${EMAIL} per richieste, preventivi o domande. Ti risponderemo al più presto.`,
    options: [
      { label: "Form Contattaci", payload: "contattaci" },
      { label: "← Torna al menu", payload: "menu" },
    ],
  },
  "chi siamo": {
    text: "Siamo un'agenzia digitale che unisce strategia, creatività e tecnologia. Lavoriamo su brand strategy, web development, content & social e digital advertising. Scopri di più nella pagina Chi siamo.",
    link: { label: "Chi siamo →", href: CHI_SIAMO },
    options: [
      { label: "Servizi", payload: "servizi" },
      { label: "Contattaci", payload: "contattaci" },
      { label: "← Torna al menu", payload: "menu" },
    ],
  },
  blog: {
    text: "Nel nostro blog parliamo di brand strategy, web development, content & social, digital advertising e casi studio. Scegli un articolo qui sotto o scrivi una domanda: se trovo la risposta in un articolo te la indico con titolo e data.",
    link: { label: "Vai al Blog →", href: INSIGHT },
    options: [
      { label: "Strategia brand PMI", payload: "blog_article_strategia-brand-pmi" },
      { label: "SEO e contenuti", payload: "blog_article_seo-e-contenuti" },
      { label: "Dati e campagne", payload: "blog_article_dati-e-decisioni-campagne" },
      { label: "Case study PMI Roma Nord", payload: "blog_article_pmi-roma-nord-seo-geo" },
      { label: "Core Web Vitals 2025", payload: "blog_article_core-web-vitals-2025" },
      { label: "Piano editoriale", payload: "blog_article_piano-editoriale-converte" },
      { label: "Lead generation LinkedIn", payload: "blog_article_lead-generation-linkedin-b2b" },
      { label: "Valori e storytelling", payload: "blog_article_valori-marca-storytelling" },
      { label: "Siti vetrina che vendono", payload: "blog_article_siti-vetrina-che-vendono" },
      { label: "Integrazione brand web ADV", payload: "blog_article_integrazione-brand-web-adv" },
      { label: "Contattaci", payload: "contattaci" },
      { label: "← Torna al menu", payload: "menu" },
    ],
  },
  menu: {
    text: "Ecco di nuovo il menu principale. Cosa ti serve?",
    options: MAIN_OPTIONS,
  },
  altro: {
    text: "Per richieste specifiche o domande che non trovi sul sito puoi scriverci a info@buluagency.it oppure compilare il form nella pagina Contattaci: un nostro operatore ti risponderà.",
    link: { label: "Vai a Contattaci →", href: CONTATTACI },
    options: [
      { label: "Prenota una call", payload: "prenota call" },
      { label: "Servizi", payload: "servizi" },
      { label: "← Torna al menu", payload: "menu" },
    ],
  },
  fallback: {
    text: "Per questa richiesta ti consiglio di scriverci direttamente: invia una mail a info@buluagency.it oppure compila il form nella pagina Contattaci con i dettagli. Così un operatore potrà risponderti in modo preciso.",
    link: { label: "Pagina Contattaci →", href: CONTATTACI },
    options: MAIN_OPTIONS,
  },
};

/** Normalizza testo per confronto (minuscolo, trim, senza punteggiatura eccessiva) */
function normalize(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

/** Keyword → payload per messaggi liberi (ordine conta: più specifici prima) */
const KEYWORD_MAP: { keywords: string[]; payload: string }[] = [
  { keywords: ["strategia brand", "brand pmi", "posizionamento brand", "audit brand"], payload: "blog_article_strategia-brand-pmi" },
  { keywords: ["seo e contenuti", "seo contenuti", "crescere online", "keyword", "ricerche"], payload: "blog_article_seo-e-contenuti" },
  { keywords: ["dati campagne", "kpi", "report campagne", "ottimizzare campagne", "numeri marketing"], payload: "blog_article_dati-e-decisioni-campagne" },
  { keywords: ["pmi roma nord", "case study pmi", "scalare pmi", "roma nord", "seo geo", "primi risultati", "centro italia"], payload: "blog_article_pmi-roma-nord-seo-geo" },
  { keywords: ["core web vitals", "lcp", "velocità sito", "performance sito", "2025"], payload: "blog_article_core-web-vitals-2025" },
  { keywords: ["piano editoriale", "editoriale", "contenuti social", "post social"], payload: "blog_article_piano-editoriale-converte" },
  { keywords: ["linkedin", "lead generation", "b2b", "lead", "linkedin campagne"], payload: "blog_article_lead-generation-linkedin-b2b" },
  { keywords: ["valori marca", "storytelling", "valori brand", "narrazione"], payload: "blog_article_valori-marca-storytelling" },
  { keywords: ["sito vetrina", "vetrina che vendono", "sito converte", "conversione sito"], payload: "blog_article_siti-vetrina-che-vendono" },
  { keywords: ["integrazione", "brand web adv", "percorso integrato", "allineamento"], payload: "blog_article_integrazione-brand-web-adv" },
  { keywords: ["blog", "articoli", "articolo", "insight"], payload: "blog" },
  { keywords: ["servizi", "servizio", "offerta", "offerte", "cosa fate", "cosa fai", "brand strategy", "web", "sito", "content", "social", "advertising", "adv", "campagne"], payload: "servizi" },
  { keywords: ["contatt", "preventivo", "preventivi", "richiesta", "scrivere", "scrivervi", "form", "email", "mail"], payload: "contattaci" },
  { keywords: ["chi siete", "chi siamo", "agenzia", "team", "voi"], payload: "chi siamo" },
  { keywords: ["call", "chiamata", "prenota", "prenotare", "appuntamento", "meeting", "incontro"], payload: "prenota call" },
  { keywords: ["email", "mail", "scrivere", "scrivere a"], payload: "email" },
  { keywords: ["menu", "torna", "indietro", "altro", "altra cosa"], payload: "menu" },
];

export function getBotReply(userMessage: string): BotReply {
  const normalized = normalize(userMessage);

  // Risposta diretta per payload esatti
  const exact = REPLIES[normalized];
  if (exact) return exact;

  // Payload tipo blog_article_<slug> → risposta tratta dall'articolo
  if (normalized.startsWith("blog_article_")) {
    const slug = normalized.replace("blog_article_", "");
    const articleReply = buildArticleReply(slug);
    if (articleReply) return articleReply;
  }

  // Match per keyword (può restituire blog_article_xxx)
  for (const { keywords, payload } of KEYWORD_MAP) {
    if (keywords.some((k) => normalized.includes(k))) {
      if (payload.startsWith("blog_article_")) {
        const slug = payload.replace("blog_article_", "");
        const articleReply = buildArticleReply(slug);
        if (articleReply) return articleReply;
      }
      return REPLIES[payload] ?? REPLIES.fallback;
    }
  }

  return REPLIES.fallback;
}

export function getWelcomeReply(): BotReply {
  return REPLIES.welcome;
}
