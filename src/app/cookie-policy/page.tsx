import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Cookie policy | BULU AGENCY",
  description: "Informazioni sui cookie e tecnologie simili utilizzate su buluagency.it.",
};

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout title="Cookie policy" lastUpdated="13 marzo 2025">
      <p>
        La presente Cookie policy descrive quali cookie e tecnologie simili
        vengono utilizzati sul sito buluagency.it e come puoi gestire le tue
        preferenze. Il titolare del trattamento è BULU AGENCY (P.IVA
        18324971003). Per la privacy e i dati personali si applica
        l’Informativa sulla privacy.
      </p>

      <h2>1. Cosa sono i cookie</h2>
      <p>
        I cookie sono piccoli file di testo che i siti memorizzano sul tuo
        dispositivo (computer, tablet, smartphone) per riconoscere il
        dispositivo, memorizzare preferenze o raccogliere informazioni
        sull’uso del sito. Anche altre tecnologie (storage locale, pixel,
        identificatori) possono avere funzioni simili e sono qui trattate in
        modo unitario dove applicabile.
      </p>

      <h2>2. Tipi di cookie che utilizziamo</h2>
      <ul>
        <li>
          <strong>Cookie tecnici / strettamente necessari:</strong> indispensabili
          per il funzionamento del sito (es. bilanciamento del carico,
          sicurezza, preferenze essenziali). Non richiedono consenso ai sensi
          della normativa vigente.
        </li>
        <li>
          <strong>Cookie di funzionalità:</strong> consentono di ricordare
          scelte (es. lingua, regione) per migliorare l’esperienza. Possono
          essere considerati tecnici o assimilati a essi a seconda della
          configurazione.
        </li>
        <li>
          <strong>Cookie analitici:</strong> raccolgono informazioni in forma
          aggregata su come il sito viene utilizzato (pagine visitate, tempo
          di permanenza). Se utilizziamo strumenti di terze parti (es. Google
          Analytics), questi possono impostare cookie propri; in tal caso il
          consenso è richiesto ove previsto dalla legge.
        </li>
        <li>
          <strong>Cookie di marketing / profilazione:</strong> utilizzati per
          pubblicità mirata o per tracciare l’utente su più siti. Se
          utilizzati, richiedono consenso esplicito.
        </li>
      </ul>

      <h2>3. Durata</h2>
      <p>
        I cookie possono essere di sessione (eliminati alla chiusura del
        browser) o persistenti (restano per un periodo definito fino alla
        scadenza o alla cancellazione manuale).
      </p>

      <h2>4. Come gestire i cookie</h2>
      <p>
        Puoi modificare le preferenze sui cookie tramite le impostazioni del
        tuo browser (di solito in “Privacy”, “Cookie” o “Sicurezza”). La
        disattivazione di cookie tecnici può compromettere alcune
        funzionalità del sito. Per informazioni sui singoli browser: Chrome,
        Firefox, Safari, Edge (sezione “Cookie” o “Privacy” nelle rispettive
        guide).
      </p>

      <h2>5. Aggiornamenti</h2>
      <p>
        Questa Cookie policy può essere aggiornata per riflettere modifiche
        tecniche o normative. La versione vigente è quella pubblicata su
        questa pagina con la data di ultimo aggiornamento indicata in alto.
      </p>

      <p>
        Contatti: info@buluagency.it.
      </p>
    </LegalPageLayout>
  );
}
