# DESIGN-GUIDE – BULU AGENCY

Questa guida definisce le **linee guida di design** per il sito BULU AGENCY (UI, UX, tipografia, colori, componenti). Qualsiasi modifica al layout o ai componenti deve rispettare queste regole.

---

## 1. Identità e tono generale

- **Mood**: premium, digitale, pulito; dark mode elegante con accenti blu.
- **Obiettivo**: trasmettere competenza (strategia, web, adv) ma restare accessibile e chiaro.
- **Stile**:
  - layout **ordinato**, con tanto respiro verticale;
  - poche decorazioni inutili, focus su contenuto e CTA;
  - micro-animazioni leggere (hover, fade, micro-movimenti) ma mai eccessive.

---

## 2. Tipografia

- **Font**: usare i font già caricati (`Geist`).
- **Gerarchia (desktop)**:
  - **H1 (hero title)**: 40–56px, bold, `text-display`, massimo 2 righe.
  - **H2 (section title)**: 28–36px, bold, `text-section-title`.
  - **H3 (card title / sottosezione)**: 20–24px, semibold.
  - **Body**: 15–16px, line-height comoda (1.5–1.7).
  - **Caption / meta**: 11–13px, uppercase per etichette (es. “Blog”, “Case study”).
- **Regole**:
  - mai più di **3 livelli di heading visibili** nella stessa sezione.
  - usare sempre classi tipografiche coerenti (non inventare stili inline).
  - evitare paragrafi troppo lunghi: spezzare in blocchi da 3–5 righe.

---

## 3. Colori e temi

Palette base (già definita in `globals.css`):

- **Background**:
  - `--bg-primary`: `#020617` (sfondo quasi nero) – usato per body.
  - `--bg-secondary`: `#0a192f` (blu scuro) – card, navbar, footer.
- **Testi**:
  - `--text-primary`: `#ffffff` – testi principali.
  - `--text-secondary`: `#a0a3bd` – testi secondari / descrizioni.
  - `--text-muted`: `#6b6f8a` – meta, label, testo di supporto.
- **Accent / brand**:
  - `--glow-blue`: `#5ca9e9` – primary accent (pulsanti, link importanti).
  - `--glow-indigo`: `#38bdf8` – accent secondario.
  - `--glow-violet-soft`: usato per effetti glow / ombre.

**Regole:**

- Colore di sfondo principale delle pagine: `--bg-primary`.
- Card e sezioni in rilievo: sfondo `--card-bg` o `--bg-secondary` con leggera border subtle.
- Testi importanti sempre in `--text-primary`; descrizioni lunghe in `--text-secondary`.
- Link e CTA principali in accent blu (gradiente tra `--glow-blue` e `--glow-indigo`).

---

## 4. Spaziature e layout

- **Content width**: usare `--content-max` (1200px) come larghezza massima di contenuto.
- **Sezioni verticali**:
  - usare `--section-spacing` per `margin-top` principale tra blocchi verticali.
  - evitare sezioni troppo ravvicinate: minimo 72–96px tra blocchi diversi.
- **Padding interni**:
  - card e blocchi: 24–32px (mobile → 16–20px).
  - navbar e footer: 16–24px.
- **Allineamenti**:
  - mantenere **griglia a 12** mentale (1/2, 1/3, 2/3) per layout desktop.
  - su mobile: layout a singola colonna, elementi centrati o allineati a sinistra con padding costante.

---

## 5. Componenti principali

### 5.1 Pulsanti / CTA

- Stile principale: pill / rounded-full, gradiente blu (`from-[#5CA9E9] to-[#38BDF8]`), testo bianco.
- Hover: leggera variazione di opacità o glow, **mai** cambi di layout.
- Usare la stessa componente (o stesso stile) per:
  - trigger principali in hero (“Inizia un progetto”, “Scopri i servizi”),
  - CTA finali (“Prenota una call”, “Contattaci”),
  - pulsanti primari nei form.

### 5.2 Card (servizi, case study, blog)

- Base: `glass-card` con `border-[var(--border-subtle)]`, `bg-[var(--card-bg)]`, `rounded-[var(--radius-card)]`.
- Ogni card deve avere:
  - label/tema (caption),
  - titolo breve (2 righe max),
  - descrizione 2–3 righe,
  - CTA o interazione chiara (link, freccia, hover).

### 5.3 Form

- Input e text area:
  - bordo `border-[var(--border-subtle)]`,
  - sfondo `--bg-secondary`,
  - placeholder in `--text-muted`.
- Stato focus: bordo + ring in accent blu.
- Label sempre presenti, piccole (`text-xs`), sopra il campo.

### 5.4 Navbar e Footer

- Navbar:
  - sfondo `--bg-secondary` con leggera ombra.
  - logotipo a sinistra, menu centrato/destra, CTA “Prenota una call” evidente.
  - attivo/hover: uso di accent blu o underline sottile.
- Footer:
  - base scura con colonne ben separate (Pagine, Servizi, Legale, Contatti).
  - link chiari, testo secondario per info legali.

---

## 6. Interazioni e animazioni

- Animazioni leggere (fade, slide up, micro-scale) tramite `framer-motion` / classi utility.
- Durata consigliata: 0.2–0.4s.
- Evitare:
  - animazioni che interferiscono con la leggibilità (testi che saltano, layout che cambia in continuazione),
  - eccesso di movimento simultaneo in più sezioni.

---

## 7. Accessibilità minima

- Contrasto sufficiente: testo principale sempre leggibile su sfondo scuro (verificare con rapporto AA dove possibile).
- Dimensione minima font body: 14–15px (evitare testi più piccoli se non per note legali).
- Hit area pulsanti/link: almeno 40x40px (padding adeguato).

---

## 8. Regole per nuove sezioni / pagine

Quando si aggiunge una nuova sezione o pagina:

1. **Verificare gerarchia**: un solo H1 per pagina, H2 per sezioni, H3 per sottosezioni.
2. **Usare variabili** da `globals.css` per colori, radius, max-width, non valori hard-coded diversi.
3. **Allineare CTA** al resto del sito (stesso stile pulsanti).
4. **Evitare duplicazione di pattern**: se serve un nuovo tipo di card o blocco, valutare prima se può essere un’estensione di un pattern esistente.

---

## 9. Come usare questa guida con gli AI assistant

Quando chiedi all’assistente (Claude Code o altri) di modificare il design:

- menziona esplicitamente `DESIGN-GUIDE.md` nel prompt;
- richiedi che **tutte** le proposte:
  - rispettino palette, tipografia e spaziature qui definite,
  - non introducano nuovi colori o font non approvati,
  - mantengano il tono premium, pulito e coerente con BULU AGENCY.

