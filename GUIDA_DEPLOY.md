# Guida: da GitHub a Vercel (BULU Agency)

Questa guida ti accompagna passo-passo per **salvare il progetto su GitHub** e **collegarlo a Vercel** per il deploy.

---

## Parte 1: Salvare tutto su GitHub

### 1. Crea un repository su GitHub

1. Vai su [github.com](https://github.com) e accedi al tuo account.
2. Clicca sul pulsante **"New"** (o **"+"** → **"New repository"**).
3. Compila:
   - **Repository name**: ad esempio `bulu-agency` (o come preferisci).
   - **Description**: opzionale, es. "Sito BULU Agency - Next.js".
   - **Visibility**: Public (o Private se vuoi).
   - **Non** spuntare "Add a README" né "Add .gitignore" (il progetto ce l’ha già).
4. Clicca **"Create repository"**.

### 2. Collega il progetto locale a GitHub e fai il push

Dopo aver creato il repo, GitHub ti mostrerà l’URL del repository (es. `https://github.com/TUO-USERNAME/bulu-agency.git`).

Apri il terminale nella cartella del progetto e esegui:

```bash
cd /Users/edoardoavantifiori/Documents/Cursor/bulu-agency

# Aggiungi il remote (sostituisci con il TUO URL del repo)
git remote add origin https://github.com/TUO-USERNAME/bulu-agency.git

# Verifica che il remote sia corretto
git remote -v

# Invia tutto su GitHub (branch main)
git push -u origin main
```

- **Se usi HTTPS**: ti chiederà username e password. Per la password usa un **Personal Access Token** (GitHub → Settings → Developer settings → Personal access tokens).
- **Se usi SSH**: usa l’URL `git@github.com:TUO-USERNAME/bulu-agency.git` al posto di `https://...`.

Dopo il push, il codice sarà su GitHub e potrai collegarlo a Vercel.

---

## Parte 2: Collegare il sito a Vercel

### 1. Accedi a Vercel

1. Vai su [vercel.com](https://vercel.com) e accedi (puoi usare **"Continue with GitHub"**).
2. Se richiesto, autorizza Vercel ad accedere ai tuoi repository GitHub.

### 2. Importa il progetto

1. Dalla dashboard clicca **"Add New..."** → **"Project"**.
2. Nella lista dei repository GitHub seleziona **bulu-agency** (o il nome che hai usato).
3. Clicca **"Import"**.

### 3. Configurazione del progetto (Build & Output Settings)

Vercel riconosce automaticamente Next.js. Controlla che sia così:

- **Framework Preset**: Next.js
- **Root Directory**: lascia vuoto (o `.` se chiede)
- **Build Command**: `npm run build` (default)
- **Output Directory**: lasciato al default (Next.js lo gestisce)
- **Install Command**: `npm install` (default)

Non servono variabili d’ambiente per far funzionare il sito base. Se in futuro aggiungi API key o segreti, potrai inserirli in **Environment Variables** in questa schermata o dopo nel progetto.

### 4. Deploy

1. Clicca **"Deploy"**.
2. Attendi 1–2 minuti: Vercel compilerà il progetto e ti darà un URL tipo `bulu-agency-xxx.vercel.app`.
3. Il sito sarà online su quell’URL.

### 5. Aggiornamenti automatici

Ogni volta che fai **push su GitHub** (sul branch che hai collegato, di solito `main`), Vercel farà un nuovo deploy in automatico. Non devi fare nulla in più.

---

## Parte 3: (Opzionale) Dominio personalizzato

Se vuoi usare un dominio tuo (es. `www.buluagency.it`):

1. In Vercel apri il progetto → **Settings** → **Domains**.
2. Aggiungi il dominio (es. `buluagency.it` o `www.buluagency.it`).
3. Segui le istruzioni per configurare i record DNS presso il tuo provider (CNAME o A record come indicato da Vercel).

---

## Riepilogo comandi utili

```bash
# Dalla cartella del progetto
cd /Users/edoardoavantifiori/Documents/Cursor/bulu-agency

# Controllare stato e remote
git status
git remote -v

# Dopo aver modificato il sito: salvare e inviare su GitHub
git add .
git commit -m "Descrizione delle modifiche"
git push
```

Dopo il primo `git remote add origin ...` e `git push -u origin main`, per i prossimi aggiornamenti ti basterà `git add .`, `git commit -m "..."` e `git push`.

---

## Email: form contatto e prenotazione call

Le richieste dai form (Home, Contattaci, Book a call) vengono inviate a **info@buluagency.it** usando il **tuo account email in SMTP** (nessun servizio esterno tipo Resend).

1. In locale: crea **`.env.local`** nella root con le credenziali del tuo account **info@buluagency.it** (es. da Aruba):
   ```
   SMTP_HOST=smtp.aruba.it
   SMTP_PORT=465
   SMTP_USER=info@buluagency.it
   SMTP_PASS=la_tua_password_email
   ```
2. Sul **VPS**: crea **`.env`** in `/var/www/bulu-agency` con le stesse variabili e riavvia l’app (`pm2 restart bulu-agency`).

Senza `SMTP_PASS` le email non partono (il sito funziona, i form rispondono "success", ma nessuna mail viene inviata). Vedi `.env.example` per un template. Se usi un provider diverso da Aruba, cambia `SMTP_HOST` e `SMTP_PORT` (es. Gmail: smtp.gmail.com, 587).
