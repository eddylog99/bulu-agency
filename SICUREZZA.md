# Sicurezza – BULU Agency

Riepilogo delle misure di sicurezza applicate al sito.

## API (form contatti e prenotazione call)

- **Validazione input**: solo campi ammessi e tipi stringa; lunghezza massima per campo (es. 2000 caratteri, 254 per email); formato email controllato; massimo 25 chiavi e 15 KB per richiesta.
- **Rate limiting**: massimo 10 richieste per minuto per IP (stesso IP non può abusare dei form). In caso di superamento risposta `429` con header `Retry-After`.
- **Content-Type**: accettato solo `application/json`; body troppo grande rifiutato con `400`.
- **XSS nelle email**: tutti i valori inseriti nell’HTML delle email sono escapati (HTML entity) per evitare script injection nei client di posta.

## Header di sicurezza (next.config)

- **X-Frame-Options: DENY** – il sito non può essere incorporato in iframe (mitiga clickjacking).
- **X-Content-Type-Options: nosniff** – il browser non interpreta risorse con MIME type errato.
- **Referrer-Policy: strict-origin-when-cross-origin** – limita le informazioni inviate nel referrer.
- **Permissions-Policy** – disabilita camera, microfono, geolocalizzazione e interest-cohort dove non servono.
- **Content-Security-Policy** – restringe da dove possono essere caricati script, stili, immagini e connessioni; `frame-ancestors 'none'` e `form-action 'self'` per ridurre superficie di attacco.

## Segreti e variabili d’ambiente

- Nessuna chiave o password in codice: SMTP e altri segreti solo in variabili d’ambiente (`.env.local` / `.env`).
- `.env*` è in `.gitignore`: i file con segreti non vengono committati.

## Dipendenze

- Eseguito `npm audit` e applicato `npm audit fix` per risolvere vulnerabilità note (es. flatted). Eseguire periodicamente `npm audit` e aggiornare le dipendenze.

## Raccomandazioni operative

1. **Produzione**: su più istanze (es. più server/replica) il rate limit in-memory è per singola istanza. Per un limite globale valutare un servizio esterno (es. Redis/Upstash).
2. **HTTPS**: assicurarsi che in produzione il sito sia servito solo in HTTPS (di solito gestito da Vercel/hosting).
3. **Aggiornamenti**: tenere aggiornati Next.js e le dipendenze (`npm update`, controllare release notes).
