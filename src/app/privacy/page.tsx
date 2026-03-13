import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | BULU AGENCY",
  description:
    "Informativa sulla privacy e trattamento dei dati personali di BULU AGENCY.",
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Informativa sulla privacy"
      lastUpdated="13 marzo 2025"
    >
      <p>
        La presente Informativa descrive come BULU AGENCY (“noi”, “nostro”), con
        sede in Italia, P.IVA 18324971003, tratta i dati personali degli utenti
        (“tu”, “utente”) in relazione al sito web buluagency.it e ai servizi
        offerti (consulenza, strategia, sviluppo web, content, advertising).
      </p>

      <h2>1. Titolare e responsabile del trattamento</h2>
      <p>
        Il titolare del trattamento è BULU AGENCY. Per esercitare i tuoi diritti
        o per domande sulla privacy puoi scriverci a: info@buluagency.it.
      </p>

      <h2>2. Dati che raccogliamo e finalità</h2>
      <p>
        Raccogliamo solo i dati strettamente necessari per erogare i servizi e
        gestire il rapporto con te: nome, cognome, email, eventuale numero di
        telefono, messaggio o richiesta (form contatti, prenotazione call,
        newsletter se attiva). Tali dati sono trattati per: rispondere alle
        richieste, erogare consulenza e servizi concordati, adempiere obblighi
        di legge e, ove applicabile, inviare comunicazioni di servizio o
        commerciali (solo con consenso esplicito o in base a legittimo
        interesse).
      </p>

      <h2>3. Base giuridica</h2>
      <p>
        Il trattamento si fonda su: esecuzione di un contratto o misure
        precontrattuali (richieste di contatto, preventivi, call); consenso
        (newsletter, marketing); legittimo interesse (miglioramento del sito,
        sicurezza, difesa in giudizio); obblighi di legge (contabilità, fiscale).
      </p>

      <h2>4. Conservazione e sicurezza</h2>
      <p>
        I dati sono conservati per il tempo necessario alle finalità indicate e
        comunque nei limiti previsti dalla legge (es. 10 anni per documenti
        fiscali). Adottiamo misure tecniche e organizzative adeguate per
        proteggere i dati da accessi non autorizzati, perdita o alterazione.
      </p>

      <h2>5. Comunicazione e trasferimento</h2>
      <p>
        I dati possono essere conosciuti da incaricati e da fornitori che
        agiscono come responsabili (es. hosting, email). Non vendiamo né
        cediamo dati a terzi per loro finalità di marketing. In caso di
        servizi con sede fuori dall’UE, garantiamo adeguatezze o clausole
        tipo Commissione europea o altre basi previste dal GDPR.
      </p>

      <h2>6. Diritti dell’interessato (GDPR)</h2>
      <p>
        Hai diritto ad: accesso, rettifica, cancellazione, limitazione del
        trattamento, portabilità, opposizione e revoca del consenso ove applicabile.
        Puoi proporre reclamo all’Autorità Garante per la Protezione dei Dati
        Personali (garanteprivacy.it).
      </p>

      <h2>7. Modifiche</h2>
      <p>
        Questa informativa può essere aggiornata. La versione vigente è sempre
        quella pubblicata su questa pagina con indicazione della data di
        ultimo aggiornamento.
      </p>
    </LegalPageLayout>
  );
}
