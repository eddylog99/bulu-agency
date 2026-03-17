export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  tema: string;
  body: string;
  /** Data di pubblicazione (YYYY-MM-DD) per citazioni e chat */
  publishedAt?: string;
  /** Override manuale del tempo di lettura (minuti), se specificato */
  readingMinutes?: number;
};

export function getReadingTimeMinutes(article: Article): number {
  if (article.readingMinutes != null) {
    return article.readingMinutes;
  }
  const words = article.body.trim().split(/\s+/).length;
  const wordsPerMinute = 200;
  const rawMinutes = words / wordsPerMinute;
  // Arrotonda al minuto più vicino, con minimo 4 minuti per coerenza con la strategia
  return Math.max(4, Math.round(rawMinutes));
}

export const articles: Article[] = [
  {
    slug: "strategia-brand-pmi",
    title: "Come definire una strategia di brand efficace per la PMI",
    excerpt:
      "Passi pratici per posizionare il tuo brand e comunicarlo in modo coerente su tutti i canali, dal sito ai social.",
    tema: "Brand strategy",
    publishedAt: "2025-01-10",
    readingMinutes: 5,
    body: `Per una PMI, avere una strategia di brand chiara non è un optional: è la base da cui partono comunicazione, marketing e percezione del mercato. Senza posizionamento definito, il rischio è disperdere messaggi e budget su canali e iniziative che non rafforzano un’identità riconoscibile.

In questo articolo vediamo i passi concreti per costruire (o rivedere) una strategia di brand allineata ai servizi che offriamo: audit, valori, tone of voice e linee guida operative.

Il primo passo è l’audit: dove si posiziona oggi il tuo brand rispetto ai competitor? Quali sono i punti di forza e le aree da rafforzare? Un’analisi onesta del mercato e della percezione attuale è il fondamento. Da qui si definiscono valori, promessa di marca e tone of voice, da declinare in modo coerente su sito, social e materiali. Il posizionamento non è uno slogan da appendere in ufficio: è la bussola per ogni scelta di comunicazione.

Una volta fissate le fondamenta, la strategia si traduce in linee guida operative: come parli, come ti presenti, quali priorità comunichi. Così ogni touchpoint con clienti e prospect rinforza la stessa identità e il brand diventa riconoscibile e credibile. Per una PMI che vuole crescere, investire in strategia di brand significa dare direzione al resto: web, contenuti e advertising possono così lavorare in modo coordinato.

Se vuoi rivedere o costruire da zero la strategia del tuo brand, possiamo accompagnarti con audit, posizionamento e roadmap digitale su misura.`,
  },
  {
    slug: "seo-e-contenuti",
    title: "SEO e contenuti: perché servono entrambi per crescere online",
    excerpt:
      "Come combinare ottimizzazione tecnica e contenuti di valore per attirare il pubblico giusto e far crescere visibilità e lead.",
    tema: "Digital marketing",
    publishedAt: "2025-01-18",
    readingMinutes: 6,
    body: `SEO e contenuti sono due facce della stessa medaglia: la prima fa in modo che i motori di ricerca capiscano e valorizzino le tue pagine, i secondi offrono valore reale a chi le legge. Senza contenuti utili, la SEO resta un esercizio vuoto; senza SEO, anche i migliori contenuti faticano a essere scoperti.

In ambito Web Development e Content & Social lavoriamo ogni giorno su questa integrazione. Ecco perché ha senso trattarli insieme e come impostare un approccio efficace.

L’approccio parte dagli intenti di ricerca del tuo pubblico: quali domande ha? Quali problemi vuole risolvere? Su quelle keyword e topic si costruiscono pagine e articoli chiari, ben strutturati e ottimizzati (titoli, meta, intestazioni, link interni). I contenuti devono rispondere davvero alla domanda, non solo "riempire" la pagina. Da un lato la SEO tecnica (velocità, struttura, indicizzazione) crea le condizioni perché Google possa leggere e valutare il sito; dall’altro i contenuti danno motivo di restare e di tornare.

Nel tempo, questo lavoro genera traffico qualificato, autorità di dominio e opportunità di conversione. SEO e contenuti insieme creano un volano: più visibilità, più lettori, più segnali positivi per i motori, più visibilità. Per brand e PMI che vogliono farsi trovare dalla propria nicchia, è l’investimento più solido sul lungo periodo.

Se vuoi impostare o rivedere la tua presenza con una strategia SEO e contenuti integrata, possiamo partire da un’analisi del tuo sito e degli intenti del tuo pubblico.`,
  },
  {
    slug: "dati-e-decisioni-campagne",
    title: "Dati e decisioni: usare i numeri per ottimizzare le campagne",
    excerpt:
      "KPI, report e metriche che contano per prendere decisioni informate sul marketing e aumentare il ROI delle campagne ADV.",
    tema: "Performance",
    publishedAt: "2025-02-01",
    readingMinutes: 5,
    body: `Le campagne di advertising e marketing possono essere migliorate in modo continuo solo se si guardano i dati giusti e si agisce di conseguenza. Non tutti i numeri sono uguali: ciò che conta è allineare le metriche agli obiettivi di business (lead, vendite, awareness) e leggere i report con una logica di ottimizzazione.

Nel nostro lavoro su Digital Advertising partiamo proprio da qui: definire cosa misurare, come leggerlo e come tradurlo in azioni. In questo articolo sintetizziamo un approccio che riduce gli sprechi e aumenta il ritorno.

I KPI da monitorare dipendono dalla fase del funnel: dalla reach e dalle impression in alto, al costo per lead e al tasso di conversione in basso. Dashboard sintetiche e report periodici aiutano a capire cosa funziona e cosa no, senza perdersi in decine di grafici inutili. È importante distinguere tra metriche di attività (quanto spendi, quante impression) e metriche di risultato (lead, vendite, valore generato).

La chiave è usare i dati per decidere: dove aumentare il budget, dove fermare un canale, quali creatività o audience testare. Decisioni guidate dai numeri trasformano il marketing da spesa a investimento misurabile. A livello operativo questo significa tracciamenti affidabili, conversioni ben definite e una cadenza di review che permetta di correggere il tiro in tempo utile.

Se vuoi impostare o rivedere le tue campagne con un focus su dati e ottimizzazione, possiamo aiutarti a definire KPI, report e processi su misura.`,
  },
  {
    slug: "pmi-roma-nord-seo-geo",
    title: "Come abbiamo aiutato una PMI italiana a scalare con una strategia efficace",
    excerpt:
      "Un'azienda a Roma Nord: sito sviluppato a modo, SEO e Geo locali. Risultato: posizionata tra i primi tre nel Centro Italia per la sua nicchia.",
    tema: "Case study",
    publishedAt: "2025-02-15",
    readingMinutes: 4,
    body: `In questo caso studio raccontiamo come abbiamo accompagnato una PMI italiana con sede a Roma Nord a crescere online grazie a un sito pensato per convertire e a una strategia SEO e Geo mirata.

L’azienda operava in una nicchia di mercato ben definita ma faticava a farsi trovare da clienti nella propria zona e nel Centro Italia. Obiettivo: aumentare visibilità e lead qualificati senza disperdere budget in audience troppo ampie.

Abbiamo sviluppato un sito vetrina chiaro, veloce e ottimizzato per i dispositivi mobili, con pagine dedicate alle aree geografiche di interesse e contenuti che rispondono alle ricerche reali della nicchia. In parallelo, abbiamo lavorato su SEO tecnica (indicizzazione, core web vitals, struttura) e su una strategia Geo locale coerente con le keyword e con la presenza su Google Business Profile.

Nel giro di alcuni mesi il sito è emerso tra i primi tre risultati nella serp per le ricerche più rilevanti nel Centro Italia nella sua nicchia. I contatti qualificati sono aumentati e il cliente ha potuto scalare le attività commerciali con una base digitale solida.

Se hai un’azienda o un brand e vuoi risultati concreti in termini di visibilità e lead, possiamo costruire insieme un percorso su misura: sito, SEO e strategia che si adattano ai tuoi obiettivi.`,
  },
  {
    slug: "core-web-vitals-2025",
    title: "Core Web Vitals e LCP: perché la velocità del sito conta ancora nel 2025",
    excerpt:
      "Google continua a premiare siti veloci e usabili. Come interpretare LCP, INP e CLS e cosa fare in concreto sul tuo sito.",
    tema: "Web Development",
    publishedAt: "2025-02-20",
    readingMinutes: 6,
    body: `I Core Web Vitals (LCP, INP, CLS) restano un fattore di ranking e di esperienza utente: un sito lento perde visitatori e posizioni. Nel 2025 le aspettative degli utenti e gli standard di Google non sono calati. In questo articolo vediamo perché la velocità conta e come affrontarla in modo pratico nel contesto del Web Development.

Il Largest Contentful Paint (LCP) misura quanto velocemente viene mostrato il contenuto principale della pagina; l’INP (Interaction to Next Paint) sostituisce l’FID e riflette la reattività alle interazioni; il Cumulative Layout Shift (CLS) indica la stabilità visiva, cioè se elementi si spostano mentre l’utente sta leggendo o cliccando. Questi segnali influenzano sia il posizionamento sia la conversione: utenti che abbandonano pagine lente o che “ballano” non diventano clienti.

Cosa fare in concreto? Ottimizzare hosting e delivery, ridurre il peso di immagini e script, usare tecniche moderne (lazy loading, font ottimizzati, caching). Per siti vetrina e landing è spesso possibile ottenere ottimi punteggi con un’architettura pulita e scelte tecniche coerenti. Un sito veloce non è un optional: è la base su cui costruire SEO e campagne che portano traffico qualificato.

Se vuoi verificare le performance del tuo sito e pianificare interventi su Core Web Vitals, possiamo partire da un’analisi e da una roadmap di ottimizzazione.`,
  },
  {
    slug: "piano-editoriale-converte",
    title: "Piano editoriale che converte: dalla strategia ai contenuti sui social",
    excerpt:
      "Come passare da «postiamo qualcosa» a un piano editoriale strutturato che supporta il brand e genera engagement e lead.",
    tema: "Content & Social",
    publishedAt: "2025-02-28",
    readingMinutes: 5,
    body: `Molti brand sui social pubblicano in modo discontinuo o reattivo: un post qui, una storia lì, senza una regia chiara. Il risultato è spesso rumore invece che presenza strategica. Un piano editoriale ben pensato, invece, allinea i contenuti al posizionamento del brand e agli obiettivi (awareness, engagement, lead) e dà continuità alla voce del brand.

In ambito Content & Social lavoriamo proprio su questo: definire temi, formati e cadenza in linea con la strategia, poi produrre copy e visual coerenti e misurare cosa funziona.

Il piano parte dagli obiettivi: vuoi far conoscere un servizio, nutrire la community, portare traffico al sito o generare contatti? In base a questo si scelgono i temi ricorrenti, il tone of voice e il mix di formati (post, storie, reels, articoli). La cadenza deve essere sostenibile: meglio meno contenuti ma costanti e di qualità. I contenuti devono offrire valore (informazione, intrattenimento, utilità) e non solo promozione diretta; il branding e la CTA possono essere presenti senza invadere.

Nel tempo i dati (reach, engagement, click, conversioni) indicano cosa ripetere e cosa cambiare. Un piano editoriale non è rigido: si aggiorna in base ai risultati e al feedback del pubblico. Per PMI e brand in crescita, avere una regia chiara sui social fa la differenza tra “esserci” e “contare”.

Se vuoi strutturare o rivedere il tuo piano editoriale e la gestione dei canali social, possiamo definire insieme strategia, temi e supporto operativo.`,
  },
  {
    slug: "lead-generation-linkedin-b2b",
    title: "Lead generation B2B su LinkedIn: campagne e contenuti che portano contatti qualificati",
    excerpt:
      "Come usare LinkedIn per generare lead B2B: targeting, formati e integrazione tra paid e organico nel 2025.",
    tema: "Digital Advertising",
    publishedAt: "2025-03-05",
    readingMinutes: 7,
    body: `LinkedIn resta il canale principe per il B2B quando l’obiettivo è generare lead qualificati: decision maker, professionisti e aziende sono raggiungibili con targeting preciso. Ma non basta attivare una campagna a caso: servono strategia, creatività adatta al contesto e integrazione tra paid e contenuti organici.

In questo articolo sintetizziamo un approccio che usiamo nelle campagne Digital Advertising per clienti B2B: obiettivi chiari, audience definita, messaggi e landing page allineati.

Le campagne Lead Gen Forms e le campagne per traffico/conversioni verso landing dedicate permettono di catturare contatti senza uscire dalla piattaforma o con un solo click verso il sito. Il targeting per ruolo, settore, dimensione azienda e (se disponibile) intento consente di ridurre gli sprechi. I contenuti devono parlare ai pain point e ai desideri del target: whitepaper, webinar, checklist, demo. Il tono professionale non significa noioso: testi chiari, headline che catturano e CTA esplicite funzionano meglio di messaggi generici.

L’organico (post aziendali, thought leadership, commenti e condivisioni) supporta la paid: chi ha già visto il brand ha più probabilità di convertire. Tracciare lead e costi per lead permette di ottimizzare nel tempo. Per aziende che vendono servizi o soluzioni B2B, LinkedIn è un investimento che può dare risultati molto mirati se gestito con criterio.

Se vuoi lanciare o ottimizzare campagne LinkedIn per lead generation, possiamo definire insieme audience, messaggi e piano di test.`,
  },
  {
    slug: "valori-marca-storytelling",
    title: "Valori di marca e storytelling: come farli emergere nella comunicazione",
    excerpt:
      "I valori del brand non restano nel sito «Chi siamo»: come tradurli in narrazione e messaggi coerenti su tutti i touchpoint.",
    tema: "Brand strategy",
    publishedAt: "2025-03-10",
    readingMinutes: 5,
    body: `Molte aziende definiscono valori e mission ma poi non li fanno vivere nella comunicazione quotidiana. Il risultato è un’identità di facciata che non convince né il mercato né i dipendenti. I valori devono tradursi in storytelling e in scelte di messaggio concrete: sul sito, nei social, nelle campagne e nei materiali.

In ambito Brand Strategy lavoriamo proprio su questo passaggio: da “cosa siamo” a “come lo diciamo e lo mostriamo”.

Lo storytelling non è inventare storie false: è dare forma e ordine a ciò che il brand fa e crede. Casi d’uso, testimonianze, dietro le quinte, spiegazione del perché si fanno certe scelte: tutto può veicolare i valori senza essere didascalico. Il tone of voice (formale o informale, tecnico o accessibile, serio o ironico) deve essere coerente con i valori: se “trasparenza” è un valore, il linguaggio eviterà giri di parole; se “innovazione”, i contenuti possono osare di più.

Sul sito, nella pagina Chi siamo ma anche nelle landing e nelle descrizioni servizi, i valori possono emergere attraverso esempi e racconti brevi. Sui social e nelle ADV, ogni post e ogni annuncio è un’occasione per rinforzare (o indebolire) la percezione del brand. Una PMI che vuole distinguersi deve fare di valori e storytelling un filo conduttore, non un box da compilare una volta.

Se vuoi rivedere come i tuoi valori emergono nella comunicazione, possiamo mappare touchpoint e messaggi e proporti una linea narrativa coerente.`,
  },
  {
    slug: "siti-vetrina-che-vendono",
    title: "Siti vetrina che vendono: web development e SEO per convertire i visitatori",
    excerpt:
      "Un sito vetrina non è solo un biglietto da visita: con struttura, contenuti e CTA giuste può diventare un vero canale di lead e vendite.",
    tema: "Web Development",
    publishedAt: "2025-03-12",
    readingMinutes: 6,
    body: `Il sito vetrina è spesso considerato un “must” statico: ci deve essere, ma non ci si aspetta che generi risultati concreti. In realtà, con Web Development e SEO pensati per l’utente e per la conversione, un sito vetrina può attirare traffico qualificato e trasformare visitatori in contatti e opportunità.

In questo articolo vediamo come progettare e ottimizzare un sito vetrina perché lavori per il business: struttura, contenuti, call to action e metriche.

La struttura deve essere chiara: pochi livelli, navigazione intuitiva, pagine che rispondono alle domande reali del pubblico (e alle ricerche che fanno su Google). Ogni pagina dovrebbe avere un obiettivo: far conoscere un servizio, raccontare un caso, invitare al contatto o alla prenotazione. Le CTA (pulsanti, form, link) devono essere visibili e testate: “Contattaci”, “Prenota una call”, “Scarica la guida”. Senza una proposta chiara, il visitatore se ne va.

La SEO tecnica (velocità, mobile, schema) e i contenuti (testi ottimizzati, keyword naturali) fanno sì che il sito sia trovato dalle persone giuste. Una volta in pagina, l’esperienza deve essere fluida: niente caricamenti lenti, niente layout che “saltano”, form semplici. Per PMI e professionisti, un sito vetrina ben fatto non è un costo: è il primo venditore sempre disponibile.

Se vuoi rinnovare il tuo sito vetrina o lanciarne uno nuovo con un focus su conversione e SEO, possiamo progettare insieme struttura, contenuti e integrazioni.`,
  },
  {
    slug: "integrazione-brand-web-adv",
    title: "Integrare brand, web e ADV: un unico percorso per risultati coerenti",
    excerpt:
      "Brand strategy, sito e campagne advertising funzionano meglio quando sono progettati insieme. Perché e come allinearli.",
    tema: "Digital marketing",
    publishedAt: "2025-03-15",
    readingMinutes: 8,
    body: `Brand strategy, Web Development e Digital Advertising sono spesso gestiti a compartimenti stagni: il brand lo fa un’agenzia, il sito un’altra, le campagne un’altra ancora. Il risultato può essere incoerenza di messaggi, esperienze discontinue e budget sprecati. Quando invece posizionamento, sito e ADV sono allineati, ogni touchpoint rinforza l’altro e il ritorno sull’investimento cresce.

In questo articolo spieghiamo perché l’integrazione conta e come la affrontiamo nei progetti che seguiamo da strategia a esecuzione.

Il brand definisce chi sei, cosa prometti e come parli: è la base. Il sito è il luogo dove chi arriva (da ricerca organica o da una campagna) trova conferma di quel messaggio e può compiere un’azione (contatto, prenotazione, acquisto). Le campagne ADV portano traffico mirato verso pagine e offerte coerenti con il posizionamento. Se il sito non riflette il tono e i valori del brand, o se le campagne puntano a messaggi diversi da quelli del sito, l’utente si confonde e la conversione cala.

In pratica: stesso tone of voice su tutti i canali, stesse priorità (quali servizi o prodotti spingere), stesse CTA dove ha senso. I dati di sito e campagne vanno letti insieme per capire dove si perde il visitatore e dove ottimizzare. Per PMI e brand in crescita, investire in un percorso integrato (brand + web + ADV) significa evitare il “rumore” e far crescere riconoscibilità e lead in modo coerente.

Se vuoi rivedere l’allineamento tra brand, sito e campagne o costruire un percorso integrato da zero, possiamo partire da un audit e da una roadmap su misura.`,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
