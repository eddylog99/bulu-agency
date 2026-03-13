import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Disclaimer | BULU AGENCY",
  description: "Disclaimer e limitazione di responsabilità per il sito e i servizi BULU AGENCY.",
};

export default function DisclaimerPage() {
  return (
    <LegalPageLayout title="Disclaimer" lastUpdated="13 marzo 2025">
      <p>
        Il presente Disclaimer integra i Termini e condizioni e l’Informativa
        sulla privacy di BULU AGENCY (P.IVA 18324971003) e si applica al sito
        buluagency.it e alle comunicazioni e ai servizi ad esso collegati.
      </p>

      <h2>1. Natura informativa dei contenuti</h2>
      <p>
        I contenuti del sito (testi, grafiche, esempi, casi, dati e
        informazioni) hanno scopo esclusivamente informativo e generale. Non
        costituiscono consulenza legale, fiscale, finanziaria né
        raccomandazioni di investimento o impegni contrattuali, salvo
        espressa stipula di un contratto scritto. Ogni decisione presa sulla
        base di tali contenuti è sotto la tua esclusiva responsabilità.
      </p>

      <h2>2. Nessuna garanzia su risultati</h2>
      <p>
        I risultati di strategie, campagne, contenuti o servizi digitali
        dipendono da molteplici fattori (mercato, settore, budget, tempistiche,
        azioni del cliente, terze parti). BULU AGENCY non garantisce in alcun
        modo il conseguimento di risultati specifici (es. vendite, lead, KPI).
        Eventuali riferimenti a risultati passati o a casi studio hanno valore
        illustrativo e non costituiscono promessa di risultati futuri.
      </p>

      <h2>3. Limitazione della responsabilità</h2>
      <p>
        Nella massima misura consentita dalla legge applicabile, BULU AGENCY
        declina ogni responsabilità per danni diretti, indiretti,
        consequenziali, punitivi, speciali o da mancato guadagno (inclusi
        perdita di dati, danni reputazionali o d’immagine) derivanti
        dall’accesso o dall’uso del sito, dai contenuti, dai link esterni o
        dai servizi, ivi compresi errori, omissioni, interruzioni, virus o
        comportamenti di terzi. La responsabilità di BULU AGENCY è in ogni
        caso limitata come da Termini e condizioni (anche in misura pari a
        zero per il solo uso del sito senza rapporto contrattuale).
      </p>

      <h2>4. Contenuti e link di terzi</h2>
      <p>
        Il sito può contenere link o riferimenti a siti, strumenti o risorse
        di terzi. BULU AGENCY non controlla né approva tali contenuti e non è
        responsabile della loro accuratezza, completezza o legittimità. L’uso
        di siti o servizi di terzi è a tuo rischio; si applicano i termini e
        le policy dei rispettivi fornitori.
      </p>

      <h2>5. Esclusione di responsabilità per azioni di terzi</h2>
      <p>
        BULU AGENCY non è responsabile per azioni, omissioni, contenuti o
        condotte di utenti, clienti, partner o terzi (inclusi fornitori di
        hosting, piattaforme, social network o servizi di pagamento), né per
        controversie sorte tra te e terzi in relazione all’uso del sito o dei
        servizi. Ogni reclamo verso terzi dovrà essere diretto agli stessi.
      </p>

      <h2>6. Forza maggiore</h2>
      <p>
        BULU AGENCY non è responsabile per inadempimenti o ritardi dovuti a
        cause di forza maggiore (catastrofi naturali, guerre, atti di
        autorità, blackout, malfunzionamenti di reti o piattaforme terze,
        pandemie, ecc.) oltre ogni ragionevole controllo.
      </p>

      <h2>7. Contatti</h2>
      <p>
        Per chiarimenti: info@buluagency.it. Per controversie si applicano i
        Termini e condizioni e la legge italiana con foro competente ivi
        indicato.
      </p>
    </LegalPageLayout>
  );
}
