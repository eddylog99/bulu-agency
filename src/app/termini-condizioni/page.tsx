import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Termini e condizioni | BULU AGENCY",
  description: "Termini e condizioni d'uso del sito e dei servizi BULU AGENCY.",
};

export default function TerminiCondizioniPage() {
  return (
    <LegalPageLayout
      title="Termini e condizioni"
      lastUpdated="13 marzo 2025"
    >
      <p>
        I presenti Termini e condizioni (“Termini”) regolano l’accesso e
        l’utilizzo del sito web buluagency.it e dei servizi offerti da BULU
        AGENCY, P.IVA 18324971003 (“BULU AGENCY”, “noi”). L’accesso al sito e
        l’uso dei servizi implicano l’accettazione integrale dei presenti Termini.
      </p>

      <h2>1. Oggetto e ambito</h2>
      <p>
        I Termini si applicano a: (a) navigazione e uso del sito buluagency.it;
        (b) invio di richieste tramite form (contatti, prenotazione call); (c)
        rapporti commerciali e contrattuali successivi, salvo diverso accordo
        scritto. Per i contratti di servizio tra te e BULU AGENCY farà fede il
        contratto o il preventivo accettato; in assenza di pattuazioni diverse,
        i presenti Termini si intendono richiamati come quadro di riferimento.
      </p>

      <h2>2. Limitazione della responsabilità</h2>
      <p>
        Il sito e i suoi contenuti sono forniti “così come sono” (as is). BULU
        AGENCY non garantisce in alcun modo l’assenza di errori, interruzioni,
        virus o danni derivanti dall’uso del sito o da link esterni. In nessun
        caso BULU AGENCY potrà essere ritenuta responsabile, verso l’utente o
        terzi, per danni diretti, indiretti, consequenziali, punitivi o
        speciali (inclusi mancati guadagni, perdita di dati, danni reputazionali)
        derivanti dall’accesso o dall’uso del sito o dei servizi, salvo
        ipotesi di dolo o colpa grave accertata in sede giudiziaria. La
        responsabilità complessiva di BULU AGENCY, ove ammessa, non supererà
        in ogni caso l’importo effettivamente corrisposto dal cliente per il
        servizio che ha dato luogo al reclamo, ovvero, per il solo uso del
        sito senza rapporto contrattuale, un importo massimo pari a zero euro.
      </p>

      <h2>3. Esclusione di garanzie</h2>
      <p>
        Sono esclusi, nella massima misura consentita dalla legge applicabile,
        qualsiasi garanzia implicita (inclusa la commerciabilità e l’idoneità
        a uno scopo particolare) e l’assicurazione che il sito o i servizi
        siano privi di errori o adatti alle tue aspettative. I risultati
        professionali (es. campagne, contenuti, strategie) dipendono da molte
        variabili esterne; BULU AGENCY non garantisce risultati specifici né
        performance di mercato.
      </p>

      <h2>4. Contenuti e proprietà intellettuale</h2>
      <p>
        Testi, grafiche, loghi, layout e materiali del sito sono di proprietà
        di BULU AGENCY o concessi in licenza e sono protetti da copyright e
        altre leggi. È vietata la riproduzione, distribuzione o uso
        commerciale non autorizzato. L’utente si impegna a non utilizzare il
        sito per scopi illeciti, diffamatori o in violazione di diritti di
        terzi.
      </p>

      <h2>5. Link e siti terzi</h2>
      <p>
        Il sito può contenere link a siti di terzi. BULU AGENCY non controlla
        né è responsabile del contenuto, della privacy o delle pratiche di
        tali siti. L’accesso ai siti terzi è a tuo rischio.
      </p>

      <h2>6. Indennizzo</h2>
      <p>
        L’utente si impegna a tenere indenne e manlevare BULU AGENCY (e i
        suoi rappresentanti, dipendenti e partner) da qualsiasi richiesta,
        danno, costo o spesa (incluse le spese legali ragionevoli) derivante
        da: (a) uso del sito o dei servizi in violazione dei presenti Termini
        o della legge; (b) contenuti o dati forniti dall’utente; (c) violazione
        di diritti di terzi.
      </p>

      <h2>7. Legge applicabile e foro competente</h2>
      <p>
        Per tutto quanto non regolato dai presenti Termini si applica la legge
        italiana. Per qualsiasi controversia sarà competente in via esclusiva
        il Foro di Roma, salvo diversa
        disposizione inderogabile di legge.
      </p>

      <h2>8. Modifiche e separabilità</h2>
      <p>
        BULU AGENCY si riserva di modificare i presenti Termini in qualsiasi
        momento; le modifiche saranno efficaci dalla pubblicazione su questa
        pagina. La continuazione dell’uso del sito dopo la pubblicazione
        costituisce accettazione delle modifiche. L’invalidità o
        inapplicabilità di una clausola non pregiudica la validità delle
        restanti.
      </p>

      <p>
        Per domande: info@buluagency.it.
      </p>
    </LegalPageLayout>
  );
}
