import type { CaseStudyCopy, Language, ProjectId } from "../types"

type CaseStudies = Record<ProjectId, { EN: CaseStudyCopy } & Partial<Record<Language, CaseStudyCopy>>>

/**
 * Case study text for each project. English is required and is what every
 * language without its own version falls back to (see `caseStudyFor`).
 */
export const CASE_STUDIES: CaseStudies = {
  scaletta: {
    EN: {
      role: "Design and development. Personal project, built for my own cover band.",
      challenge:
        "Paper setlists and shared chat threads fall apart on stage: who sings what, which guitar is in drop D, what comes next without a pause. The band needed one place for the setlist, the chord charts and the stage view that keeps working with no signal.",
      solution:
        "An installable app that stores everything on the device first and works fully offline. Sharing is optional: bandmates can be invited with roles and the setlist syncs live between their devices.",
      highlights: [
        "Local-first: every edit is saved in the browser database first and synced later with a small outbox, so a gig is never interrupted.",
        "Permissions live in the database (row-level security), tested against a real Postgres, including the cases where a stranger must not read or write anything.",
        "Stage mode with a dark screen, large chords, screen kept awake and auto-scroll, plus PDF export of the setlist.",
        "More than 350 tests and a CI that runs typecheck, lint, tests and build on every pull request.",
      ],
    },
    IT: {
      role: "Progettazione e sviluppo. Progetto personale, nato per la mia cover band.",
      challenge:
        "Le scalette su carta e i messaggi nelle chat si perdono sul palco: chi canta cosa, quale chitarra è in drop D, cosa viene dopo senza pausa. Alla band serviva un posto solo per scaletta, accordi e vista da palco, che funzioni anche senza segnale.",
      solution:
        "Un'app installabile che salva tutto prima sul dispositivo e funziona del tutto offline. La condivisione è facoltativa: si invitano i compagni con dei ruoli e la scaletta si sincronizza dal vivo tra i dispositivi.",
      highlights: [
        "Local-first: ogni modifica viene salvata prima nel database del browser e sincronizzata dopo con una piccola coda, così una serata non si interrompe mai.",
        "I permessi sono nel database (row-level security), testati su un vero Postgres, compresi i casi in cui un estraneo non deve né leggere né scrivere nulla.",
        "Modalità palco con schermo scuro, accordi grandi, schermo sempre acceso e scorrimento automatico, più esportazione della scaletta in PDF.",
        "Più di 350 test e una CI che esegue typecheck, lint, test e build a ogni pull request.",
      ],
    },
  },
  templateZero: {
    EN: {
      role: "Design and development. A template for restaurants, bars and cafes, shown with a demo client.",
      challenge:
        "Small venues need a fast website in several languages and a menu guests can open from a QR code on the table, without paying for custom development every time something changes.",
      solution:
        "A website template where everything that differs between clients lives in JSON files and images, so a normal client needs no code changes. The demo client is a trattoria in Munich, in German, English, Italian and French.",
      highlights: [
        "All pages are static, so the site is fast on a phone with a weak connection.",
        "The home page shows the live opening status, and the menu can be filtered by diet and allergens.",
        "A booking form with validation that sends the request by email, plus a QR code generator for the table menu.",
        "A validation script and a delivery checklist check translations, colour contrast and images before launch.",
      ],
    },
    IT: {
      role: "Progettazione e sviluppo. Un template per ristoranti, bar e caffè, mostrato con un cliente demo.",
      challenge:
        "I locali piccoli hanno bisogno di un sito veloce in più lingue e di un menu che gli ospiti aprano da un QR code sul tavolo, senza pagare uno sviluppo su misura a ogni modifica.",
      solution:
        "Un template di sito in cui tutto ciò che cambia da cliente a cliente sta in file JSON e immagini, quindi per un cliente normale non serve toccare il codice. Il cliente demo è una trattoria a Monaco, in tedesco, inglese, italiano e francese.",
      highlights: [
        "Tutte le pagine sono statiche, quindi il sito è veloce anche da telefono con poca connessione.",
        "La home mostra lo stato di apertura in tempo reale e il menu si filtra per dieta e allergeni.",
        "Un modulo di prenotazione con validazione che invia la richiesta via email, più un generatore di QR code per il menu del tavolo.",
        "Uno script di validazione e una checklist di consegna controllano traduzioni, contrasto dei colori e immagini prima del lancio.",
      ],
    },
  },
  medical: {
    EN: {
      role: "Design and development, February to August 2025. Client project.",
      challenge:
        "A doctor with practices in Padova, Vicenza, Schio and Malo, working in ozone therapy, osteopathy and legal medicine, needed a site that explains each treatment clearly and that patients in each town can find on Google.",
      solution:
        "A Next.js website with a page for each service, an about page, a blog and a contact form that sends the request to the doctor's inbox. For local search, every service has its own page for each town where it is offered, with Italian addresses, its own metadata and structured data.",
      highlights: [
        "17 local landing pages built from one configuration file of towns and services, so adding a town is a change to data, not to code.",
        "Technical SEO done page by page: sitemap, robots.txt, canonical and social tags, and structured data for the practice and the doctor.",
        "Contact form with an API route that emails the doctor, plus a cookie banner and analytics.",
        "Security headers (HSTS, content security policy) and forced HTTPS; accessible components built on Radix UI and shadcn/ui; Core Web Vitals above 95.",
      ],
    },
    IT: {
      role: "Progettazione e sviluppo, da febbraio ad agosto 2025. Progetto per un cliente.",
      challenge:
        "Un medico con studi a Padova, Vicenza, Schio e Malo, che si occupa di ozonoterapia, osteopatia e medicina legale, aveva bisogno di un sito che spiegasse chiaramente ogni trattamento e che i pazienti di ogni città potessero trovare su Google.",
      solution:
        "Un sito Next.js con una pagina per ogni servizio, una pagina Chi sono, un blog e un modulo di contatto che invia la richiesta alla casella del medico. Per la ricerca locale, ogni servizio ha una pagina dedicata per ogni città in cui è offerto, con indirizzi in italiano, metadati propri e dati strutturati.",
      highlights: [
        "17 pagine locali generate da un unico file di configurazione di città e servizi: aggiungere una città è una modifica ai dati, non al codice.",
        "SEO tecnica curata pagina per pagina: sitemap, robots.txt, tag canonical e social, e dati strutturati per lo studio e per il medico.",
        "Modulo di contatto con una API route che invia un'email al medico, più banner dei cookie e analytics.",
        "Header di sicurezza (HSTS, content security policy) e HTTPS forzato; componenti accessibili basati su Radix UI e shadcn/ui; Core Web Vitals sopra 95.",
      ],
    },
  },
  portal: {
    EN: {
      role: "Frontend engineer at STIGA, since June 2025, in an international Agile team.",
      challenge:
        "Employees and dealers used an internal portal to manage devices, dealers, marketing campaigns and users, but part of it was built from older web components that were slow to load and hard to change.",
      solution:
        "I rebuilt those parts as modular React and TypeScript components and connected them to the REST APIs with strict data validation, working with the backend engineers in two-week sprints.",
      highlights: [
        "More than 12 legacy components refactored into modular React and TypeScript, cutting load times by about 20% for over 100 people who use the portal every day.",
        "Data from the APIs is validated in TypeScript with Zod, so unexpected responses are caught instead of breaking the interface at runtime.",
        "Interface in several languages with translations synced from a translation service at build time, and separate test and production environments.",
        "Every build runs lint and type checking first; a light and a dark theme, and navigation that follows the user's role.",
      ],
    },
    IT: {
      role: "Frontend engineer in STIGA, da giugno 2025, in un team Agile internazionale.",
      challenge:
        "Dipendenti e rivenditori usavano un portale interno per gestire dispositivi, rivenditori, campagne di marketing e utenti, ma una parte era costruita con componenti web datati, lenti da caricare e difficili da modificare.",
      solution:
        "Ho ricostruito quelle parti come componenti modulari in React e TypeScript e le ho collegate alle API REST con una validazione rigorosa dei dati, lavorando con i backend engineer in sprint di due settimane.",
      highlights: [
        "Più di 12 componenti datati rifattorizzati in React e TypeScript modulari, con tempi di caricamento ridotti di circa il 20% per oltre 100 persone che usano il portale ogni giorno.",
        "I dati delle API sono validati in TypeScript con Zod, così le risposte inattese vengono intercettate invece di rompere l'interfaccia a runtime.",
        "Interfaccia in più lingue con traduzioni sincronizzate da un servizio di traduzione in fase di build, e ambienti di test e produzione separati.",
        "Ogni build esegue prima lint e controllo dei tipi; tema chiaro e scuro, e navigazione che segue il ruolo dell'utente.",
      ],
    },
  },
  storyboard: {
    EN: {
      role: "Design and development. Built for a 2D animator and story artist.",
      challenge:
        "A 2D animator and story artist who has worked with studios such as Disney, Netflix and Fox Animation needed a portfolio that shows his reels and storyboards well and that search engines can index.",
      solution:
        "A website with one page per section (biography, animation, storyboard, personal projects, resume and contacts), each with its own title, description and address. It is available in English and Italian and has a downloadable CV.",
      highlights: [
        "Video showcase with Vimeo players opened from a card.",
        "Storyboard galleries with a viewer that supports next, previous and swipe on a phone.",
        "Search engine basics done properly: sitemap, Open Graph cards and structured data for the person.",
      ],
    },
    IT: {
      role: "Progettazione e sviluppo. Realizzato per un animatore 2D e story artist.",
      challenge:
        "Un animatore 2D e story artist che ha lavorato con studi come Disney, Netflix e Fox Animation aveva bisogno di un portfolio che mostrasse bene reel e storyboard e che i motori di ricerca potessero indicizzare.",
      solution:
        "Un sito con una pagina per sezione (biografia, animazione, storyboard, progetti personali, curriculum e contatti), ognuna con titolo, descrizione e indirizzo propri. È disponibile in inglese e italiano e ha un CV scaricabile.",
      highlights: [
        "Vetrina video con player Vimeo che si aprono da una scheda.",
        "Gallerie di storyboard con un visualizzatore che supporta avanti, indietro e swipe da telefono.",
        "Le basi per i motori di ricerca fatte bene: sitemap, schede Open Graph e dati strutturati per la persona.",
      ],
    },
  },
}

/** Case study text in the given language, falling back to English. */
export const caseStudyFor = (id: ProjectId, language: Language): CaseStudyCopy =>
  CASE_STUDIES[id][language] ?? CASE_STUDIES[id].EN
