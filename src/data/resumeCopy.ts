import type { Language, ResumeCopy } from "../types"

/**
 * Text of the Resume page, one object per language. `ResumeCopy` (types.ts)
 * makes TypeScript report anything missing. Facts and dates are in `resume.ts`.
 */
export const RESUME_COPY: Record<Language, ResumeCopy> = {
  EN: {
    photoAlt: "Portrait of Kawe Longon",
    eyebrow: "RESUMÉ · 2026",
    location: "Treviso (TV), Italy",
    summary:
      "Front end developer who doesn't stop at the browser. I build for web and mobile: websites and PWAs in React and Next.js, native apps in Flutter, and software for smart IoT devices at STIGA. When a project needs it, I go behind the interface too, with Postgres, offline-first sync and server-side validation. Results you can measure: 100/100/100/100 on Lighthouse, about 350 automated tests, and 20% faster load times on a corporate portal.",
    download: "Download Resume",
    hire: "Hire me",
    stats: {
      since: { label: "IN THE INDUSTRY", value: "2025", hint: "Client projects first, then STIGA" },
      tests: { label: "AUTOMATED TESTS", value: "~350", hint: "On one local-first PWA, with CI" },
      lighthouse: { label: "LIGHTHOUSE", value: "4 × 100", hint: "On the deployed Template Zero site" },
      status: {
        label: "STATUS",
        open: { value: "Available", hint: "Full-time roles and freelance projects" },
        closed: { value: "Busy", hint: "Not taking new work right now" },
      },
    },
    experience: {
      eyebrow: "EXPERIENCE",
      title: "Where I work.",
      sub: "Current role.",
      present: "PRESENT",
      years: ["yr", "yrs"],
      months: ["mo", "mos"],
      items: {
        stiga: {
          role: "Front End Engineer",
          company: "STIGA S.p.A.",
          place: "Castelfranco Veneto (TV), Italy",
          summary: "Front end and mobile software engineering for internal corporate portals and smart IoT device management platforms.",
          bullets: [
            "Refactored 12+ legacy web components into modular React and TypeScript interfaces, reducing portal load times by 20% for 100+ daily active employees and dealers.",
            "Developed 5+ performance-oriented cross-platform UI features in Flutter and Dart for smart lawnmower management, expanding capabilities for thousands of active end users.",
            "Work in 2-week Agile sprints inside an international engineering team, delivering 100% of assigned front end tasks on time with Jira and Git.",
            "Integrate REST APIs with backend engineers, adding strict TypeScript data validation to prevent runtime errors across internal tools.",
          ],
        },
      },
    },
    projects: {
      eyebrow: "KEY PROJECTS",
      title: "Things I built.",
      sub: "Personal products and client work.",
      caseStudy: "Case study",
      live: "Live site",
      code: "Source code",
      items: {
        scaletta: {
          title: "Scaletta",
          kind: "Offline-first setlist app (PWA)",
          bullets: [
            "Local-first architecture: every edit is written to IndexedDB first and synced to Supabase through an idempotent, cursor-based outbox, so the app stays fully usable offline on stage.",
            "Band roles (creator, editor, viewer) enforced with Postgres row-level security and tested on a real Postgres (PGlite), including the cases where a stranger must not read or write anything.",
            "Pure domain logic (chord parsing, transposition, undo/redo) with module boundaries enforced by ESLint; about 350 unit, UI, database and end-to-end tests, GitHub Actions CI, installable PWA.",
          ],
        },
        templateZero: {
          title: "Template Zero",
          kind: "Restaurant website and QR menu",
          bullets: [
            "Reusable template customised for each client from one JSON file: 4 languages (DE/EN/IT/FR) with localised URLs, static generation and a QR-code table menu.",
            "100/100/100/100 Lighthouse (mobile) on the deployed site, with LCP 0.5 to 1.5 s, CLS 0 and under 112 KB of gzipped JavaScript on the main pages.",
            "Booking form with Zod validation, a Server Action and rate limiting (Upstash Redis with in-memory fallback); 29 unit tests, 24 end-to-end tests (Playwright) and CI on Node 20 and 22.",
          ],
        },
        medical: {
          title: "Medical practice platform",
          kind: "Client project",
          bullets: [
            "Progressive Web App built with the Next.js App Router, React and Tailwind CSS, deployed on Vercel for a medical practice.",
            "Accessible UI with Radix UI and shadcn/ui primitives that simplifies booking a visit, with a Core Web Vitals score of 95+.",
          ],
        },
        storyboard: {
          title: "Animator and storyboard artist portfolio",
          kind: "Client project",
          bullets: [
            "Media-rich portfolio with 2D animation and Disney/Netflix storyboard showreels, using Vimeo API embeds and custom Radix UI modal players for smooth playback on mobile and desktop.",
          ],
        },
        shoes: {
          title: "Shoes discovery quiz",
          kind: "Personal project",
          bullets: [
            "Modular product discovery app with no third-party UI library (100/100 Lighthouse), built around an isolated state machine (useQuiz.ts) with stack-based history snapshots and weighted recommendations.",
          ],
        },
      },
    },
    education: {
      eyebrow: "EDUCATION",
      title: "Formal training.",
      items: {
        its: {
          title: "Higher Technical Diploma in Front End Development",
          school: "ITS Academy Alto Adriatico · EQF level 5",
          desc: "Intensive 2-year tertiary vocational degree focused on software engineering, Next.js, React, TypeScript and database systems.",
        },
        liceo: {
          title: "High School Diploma (Linguistic) and French General Baccalauréat",
          school: "Liceo Brocchi",
          desc: "Dual-diploma international programme emphasizing linguistic mastery and cross-cultural communication.",
        },
      },
    },
    tools: {
      eyebrow: "TOOLS & TECHNOLOGIES",
      title: "Stack.",
      sub: "A dot marks what I use most.",
      groups: { frontend: "FRONT END", backend: "BACK END & DATA", mobile: "MOBILE", quality: "QUALITY & DELIVERY" },
      methods: "METHODOLOGIES",
      methodItems: ["Agile (Scrum/Kanban)", "Component-driven architecture", "Accessibility", "Cross-functional collaboration", "UI/UX foundations"],
    },
    languages: {
      eyebrow: "LANGUAGES",
      title: "Languages.",
      sub: "Professional working proficiency in six.",
      items: [
        { name: "Italian", level: "Native" },
        { name: "Portuguese", level: "Native" },
        { name: "English", level: "C1 (IELTS)" },
        { name: "French", level: "B2" },
        { name: "German", level: "B1" },
        { name: "Russian", level: "A2" },
      ],
      availability: "Open to full-time roles and freelance projects. Relocation within the Schengen area and remote work are possible.",
    },
    cta: {
      eyebrow: "CONTACT ME",
      title: "Let's discuss your project.",
      talk: "Let's talk",
      email: "Email",
    },
  },

  IT: {
    photoAlt: "Ritratto di Kawe Longon",
    eyebrow: "CURRICULUM · 2026",
    location: "Treviso (TV), Italia",
    summary:
      "Sviluppatore front end che non si ferma al browser. Lavoro su web e mobile: siti e PWA in React e Next.js, app native in Flutter e software per dispositivi IoT smart in STIGA. Quando il progetto lo richiede passo anche dietro l'interfaccia, con Postgres, sincronizzazione offline-first e validazione lato server. Risultati misurabili: Lighthouse 100/100/100/100, circa 350 test automatici e caricamenti più veloci del 20% su un portale aziendale.",
    download: "Scarica il CV",
    hire: "Assumimi",
    stats: {
      since: { label: "NEL SETTORE", value: "2025", hint: "Prima progetti per clienti, poi STIGA" },
      tests: { label: "TEST AUTOMATICI", value: "~350", hint: "Su una PWA local-first, con CI" },
      lighthouse: { label: "LIGHTHOUSE", value: "4 × 100", hint: "Sul sito Template Zero in produzione" },
      status: {
        label: "STATO",
        open: { value: "Disponibile", hint: "Ruoli a tempo pieno e progetti freelance" },
        closed: { value: "Occupato", hint: "Al momento non accetto nuovi lavori" },
      },
    },
    experience: {
      eyebrow: "ESPERIENZA",
      title: "Dove lavoro.",
      sub: "Ruolo attuale.",
      present: "OGGI",
      years: ["anno", "anni"],
      months: ["mese", "mesi"],
      items: {
        stiga: {
          role: "Front End Engineer",
          company: "STIGA S.p.A.",
          place: "Castelfranco Veneto (TV), Italia",
          summary: "Sviluppo software front end e mobile per portali aziendali interni e piattaforme di gestione di dispositivi IoT smart.",
          bullets: [
            "Refactoring di 12+ componenti web legacy in interfacce modulari React e TypeScript, riducendo i tempi di caricamento del portale del 20% per oltre 100 utenti attivi al giorno tra dipendenti e rivenditori.",
            "Sviluppo di 5+ funzionalità UI cross-platform orientate alle performance con Flutter e Dart per la gestione di robot rasaerba smart, ampliando le funzionalità per migliaia di utenti finali attivi.",
            "Sprint Agile di 2 settimane in un team di ingegneria internazionale, con consegna puntuale al 100% dei task front end assegnati tramite Jira e Git.",
            "Integrazione di API REST con gli sviluppatori backend, con validazione dati TypeScript rigorosa per prevenire errori runtime negli strumenti interni.",
          ],
        },
      },
    },
    projects: {
      eyebrow: "PROGETTI CHIAVE",
      title: "Cosa ho costruito.",
      sub: "Prodotti personali e progetti per clienti.",
      caseStudy: "Scheda progetto",
      live: "Vedi il sito",
      code: "Codice sorgente",
      items: {
        scaletta: {
          title: "Scaletta",
          kind: "App offline-first per scalette musicali (PWA)",
          bullets: [
            "Architettura local-first: ogni modifica viene scritta prima in IndexedDB e sincronizzata con Supabase tramite un outbox idempotente basato su cursore, così l'app resta pienamente utilizzabile offline sul palco.",
            "Ruoli della band (creator, editor, viewer) gestiti con row-level security di Postgres e testati su un Postgres reale (PGlite), compresi i casi in cui un estraneo non deve poter leggere né scrivere nulla.",
            "Logica di dominio pura (parsing degli accordi, trasposizione, undo/redo) con confini tra moduli imposti da ESLint; circa 350 test unitari, UI, database ed end-to-end, CI con GitHub Actions, PWA installabile.",
          ],
        },
        templateZero: {
          title: "Template Zero",
          kind: "Sito e menu QR per ristoranti",
          bullets: [
            "Template riutilizzabile, personalizzato per ogni cliente da un unico file JSON: 4 lingue (DE/EN/IT/FR) con URL localizzati, generazione statica e menu al tavolo tramite QR code.",
            "Lighthouse 100/100/100/100 (mobile) sul sito pubblicato, con LCP 0,5 a 1,5 s, CLS 0 e meno di 112 KB di JavaScript compresso nelle pagine principali.",
            "Form di prenotazione con validazione Zod, Server Action e rate limiting (Upstash Redis con fallback in memoria); 29 test unitari, 24 test end-to-end (Playwright) e CI su Node 20 e 22.",
          ],
        },
        medical: {
          title: "Piattaforma per studio medico",
          kind: "Progetto per cliente",
          bullets: [
            "Progressive Web App con Next.js App Router, React e Tailwind CSS, distribuita su Vercel per uno studio medico.",
            "Interfaccia accessibile con primitive Radix UI e shadcn/ui che semplifica la prenotazione delle visite, con punteggio Core Web Vitals di 95+.",
          ],
        },
        storyboard: {
          title: "Portfolio di animatore e storyboard artist",
          kind: "Progetto per cliente",
          bullets: [
            "Portfolio ricco di contenuti multimediali con showreel di animazione 2D e storyboard Disney/Netflix, con embed API Vimeo e player modali Radix UI personalizzati per una riproduzione fluida su mobile e desktop.",
          ],
        },
        shoes: {
          title: "Quiz per scegliere le scarpe",
          kind: "Progetto personale",
          bullets: [
            "Web app modulare per la scoperta di prodotti, senza librerie UI di terze parti (Lighthouse 100/100), costruita attorno a una state machine isolata (useQuiz.ts) con snapshot della cronologia a stack e raccomandazioni pesate.",
          ],
        },
      },
    },
    education: {
      eyebrow: "ISTRUZIONE",
      title: "Formazione.",
      items: {
        its: {
          title: "Diploma Tecnico Superiore in Front End Development",
          school: "ITS Academy Alto Adriatico · EQF livello 5",
          desc: "Percorso intensivo biennale di alta formazione tecnica professionalizzante, focalizzato su ingegneria del software, Next.js, React, TypeScript e sistemi di database.",
        },
        liceo: {
          title: "Diploma di Maturità (Linguistico) e Baccalauréat Générale francese",
          school: "Liceo Brocchi",
          desc: "Programma internazionale a doppio diploma con focus su padronanza linguistica e comunicazione interculturale.",
        },
      },
    },
    tools: {
      eyebrow: "STRUMENTI E TECNOLOGIE",
      title: "Stack.",
      sub: "Il punto segna ciò che uso di più.",
      groups: { frontend: "FRONT END", backend: "BACK END E DATI", mobile: "MOBILE", quality: "QUALITÀ E DELIVERY" },
      methods: "METODOLOGIE",
      methodItems: ["Agile (Scrum/Kanban)", "Architettura component-driven", "Accessibilità", "Collaborazione cross-funzionale", "Fondamenti UI/UX"],
    },
    languages: {
      eyebrow: "LINGUE",
      title: "Lingue.",
      sub: "Competenza professionale in sei lingue.",
      items: [
        { name: "Italiano", level: "Madrelingua" },
        { name: "Portoghese", level: "Madrelingua" },
        { name: "Inglese", level: "C1 (IELTS)" },
        { name: "Francese", level: "B2" },
        { name: "Tedesco", level: "B1" },
        { name: "Russo", level: "A2" },
      ],
      availability: "Aperto a ruoli a tempo pieno e progetti freelance. Possibile il trasferimento nell'area Schengen e il lavoro da remoto.",
    },
    cta: {
      eyebrow: "CONTATTAMI",
      title: "Parliamo del tuo progetto.",
      talk: "Parliamone",
      email: "Email",
    },
  },

  FR: {
    photoAlt: "Portrait de Kawe Longon",
    eyebrow: "CV · 2026",
    location: "Treviso (TV), Italie",
    summary:
      "Développeur front end qui ne s'arrête pas au navigateur. Je travaille sur le web et le mobile : sites et PWA en React et Next.js, applications natives en Flutter et logiciels pour objets connectés IoT chez STIGA. Quand le projet l'exige, je passe aussi derrière l'interface, avec Postgres, synchronisation offline-first et validation côté serveur. Des résultats mesurables : Lighthouse 100/100/100/100, environ 350 tests automatisés et des chargements 20 % plus rapides sur un portail d'entreprise.",
    download: "Télécharger le CV",
    hire: "Embauche-moi",
    stats: {
      since: { label: "DANS LE MÉTIER", value: "2025", hint: "D'abord des projets clients, puis STIGA" },
      tests: { label: "TESTS AUTOMATISÉS", value: "~350", hint: "Sur une PWA local-first, avec CI" },
      lighthouse: { label: "LIGHTHOUSE", value: "4 × 100", hint: "Sur le site Template Zero en production" },
      status: {
        label: "STATUT",
        open: { value: "Disponible", hint: "Postes à temps plein et projets freelance" },
        closed: { value: "Occupé", hint: "Je n'accepte pas de nouveaux projets pour l'instant" },
      },
    },
    experience: {
      eyebrow: "EXPÉRIENCE",
      title: "Là où je travaille.",
      sub: "Poste actuel.",
      present: "AUJOURD'HUI",
      years: ["an", "ans"],
      months: ["mois", "mois"],
      items: {
        stiga: {
          role: "Front End Engineer",
          company: "STIGA S.p.A.",
          place: "Castelfranco Veneto (TV), Italie",
          summary: "Développement logiciel front end et mobile pour des portails d'entreprise internes et des plateformes de gestion d'appareils IoT connectés.",
          bullets: [
            "Refonte de plus de 12 composants web hérités en interfaces modulaires React et TypeScript, réduisant de 20 % le temps de chargement du portail pour plus de 100 employés et revendeurs actifs chaque jour.",
            "Développement de plus de 5 fonctionnalités d'interface multiplateformes axées sur la performance avec Flutter et Dart pour la gestion de robots tondeuses connectés, au profit de milliers d'utilisateurs finaux actifs.",
            "Sprints Agile de 2 semaines au sein d'une équipe d'ingénierie internationale, avec 100 % des tâches front end assignées livrées à temps grâce à Jira et Git.",
            "Intégration d'API REST avec les développeurs backend, avec une validation stricte des données en TypeScript pour éviter les erreurs d'exécution dans les outils internes.",
          ],
        },
      },
    },
    projects: {
      eyebrow: "PROJETS CLÉS",
      title: "Ce que j'ai construit.",
      sub: "Produits personnels et projets clients.",
      caseStudy: "Étude de cas",
      live: "Voir le site",
      code: "Code source",
      items: {
        scaletta: {
          title: "Scaletta",
          kind: "Application offline-first de setlists (PWA)",
          bullets: [
            "Architecture local-first : chaque modification est d'abord écrite dans IndexedDB puis synchronisée avec Supabase via un outbox idempotent à curseur, pour que l'application reste pleinement utilisable hors ligne sur scène.",
            "Rôles du groupe (creator, editor, viewer) gérés avec la row-level security de Postgres et testés sur un vrai Postgres (PGlite), y compris les cas où un inconnu ne doit rien pouvoir lire ni écrire.",
            "Logique métier pure (analyse des accords, transposition, annuler/rétablir) avec des frontières de modules imposées par ESLint ; environ 350 tests unitaires, d'interface, de base de données et de bout en bout, CI GitHub Actions, PWA installable.",
          ],
        },
        templateZero: {
          title: "Template Zero",
          kind: "Site et menu QR pour restaurants",
          bullets: [
            "Template réutilisable, personnalisé pour chaque client à partir d'un seul fichier JSON : 4 langues (DE/EN/IT/FR) avec des URL localisées, génération statique et menu à table par QR code.",
            "Lighthouse 100/100/100/100 (mobile) sur le site publié, avec un LCP de 0,5 à 1,5 s, un CLS de 0 et moins de 112 Ko de JavaScript compressé sur les pages principales.",
            "Formulaire de réservation avec validation Zod, Server Action et rate limiting (Upstash Redis avec repli en mémoire) ; 29 tests unitaires, 24 tests de bout en bout (Playwright) et CI sur Node 20 et 22.",
          ],
        },
        medical: {
          title: "Plateforme pour cabinet médical",
          kind: "Projet client",
          bullets: [
            "Progressive Web App avec Next.js App Router, React et Tailwind CSS, déployée sur Vercel pour un cabinet médical.",
            "Interface accessible avec les primitives Radix UI et shadcn/ui, qui simplifie la prise de rendez-vous, avec un score Core Web Vitals de 95+.",
          ],
        },
        storyboard: {
          title: "Portfolio d'animateur et de storyboardeur",
          kind: "Projet client",
          bullets: [
            "Portfolio riche en médias avec des showreels d'animation 2D et de storyboards Disney/Netflix, avec intégrations de l'API Vimeo et lecteurs modaux Radix UI personnalisés pour une lecture fluide sur mobile et ordinateur.",
          ],
        },
        shoes: {
          title: "Quiz de choix de chaussures",
          kind: "Projet personnel",
          bullets: [
            "Application modulaire de découverte de produits, sans bibliothèque UI tierce (Lighthouse 100/100), construite autour d'une machine à états isolée (useQuiz.ts) avec des instantanés d'historique en pile et des recommandations pondérées.",
          ],
        },
      },
    },
    education: {
      eyebrow: "FORMATION",
      title: "Formation.",
      items: {
        its: {
          title: "Diplôme technique supérieur en développement front end",
          school: "ITS Academy Alto Adriatico · niveau 5 du CEC",
          desc: "Cursus intensif de 2 ans de formation technique supérieure axé sur le génie logiciel, Next.js, React, TypeScript et les systèmes de bases de données.",
        },
        liceo: {
          title: "Diplôme de lycée (linguistique) et Baccalauréat général français",
          school: "Liceo Brocchi",
          desc: "Programme international à double diplôme axé sur la maîtrise des langues et la communication interculturelle.",
        },
      },
    },
    tools: {
      eyebrow: "OUTILS ET TECHNOLOGIES",
      title: "Stack.",
      sub: "Un point marque ce que j'utilise le plus.",
      groups: { frontend: "FRONT END", backend: "BACK END ET DONNÉES", mobile: "MOBILE", quality: "QUALITÉ ET LIVRAISON" },
      methods: "MÉTHODOLOGIES",
      methodItems: ["Agile (Scrum/Kanban)", "Architecture orientée composants", "Accessibilité", "Collaboration transverse", "Bases UI/UX"],
    },
    languages: {
      eyebrow: "LANGUES",
      title: "Langues.",
      sub: "Compétence professionnelle dans six langues.",
      items: [
        { name: "Italien", level: "Langue maternelle" },
        { name: "Portugais", level: "Langue maternelle" },
        { name: "Anglais", level: "C1 (IELTS)" },
        { name: "Français", level: "B2" },
        { name: "Allemand", level: "B1" },
        { name: "Russe", level: "A2" },
      ],
      availability: "Ouvert aux postes à temps plein et aux projets freelance. Déménagement dans l'espace Schengen et télétravail possibles.",
    },
    cta: {
      eyebrow: "ME CONTACTER",
      title: "Parlons de ton projet.",
      talk: "Discutons",
      email: "E-mail",
    },
  },

  DE: {
    photoAlt: "Porträt von Kawe Longon",
    eyebrow: "LEBENSLAUF · 2026",
    location: "Treviso (TV), Italien",
    summary:
      "Front-End-Entwickler, der nicht beim Browser aufhört. Ich arbeite für Web und Mobile: Websites und PWAs mit React und Next.js, native Apps mit Flutter und Software für smarte IoT-Geräte bei STIGA. Wenn ein Projekt es braucht, gehe ich auch hinter die Oberfläche, mit Postgres, Offline-first-Synchronisation und serverseitiger Validierung. Messbare Ergebnisse: Lighthouse 100/100/100/100, rund 350 automatisierte Tests und 20 % kürzere Ladezeiten bei einem Unternehmensportal.",
    download: "Lebenslauf herunterladen",
    hire: "Anheuern",
    stats: {
      since: { label: "IN DER BRANCHE", value: "2025", hint: "Erst Kundenprojekte, dann STIGA" },
      tests: { label: "AUTOMATISIERTE TESTS", value: "~350", hint: "Bei einer Local-first-PWA, mit CI" },
      lighthouse: { label: "LIGHTHOUSE", value: "4 × 100", hint: "Auf der live geschalteten Template-Zero-Seite" },
      status: {
        label: "STATUS",
        open: { value: "Verfügbar", hint: "Vollzeitstellen und Freelance-Projekte" },
        closed: { value: "Ausgelastet", hint: "Derzeit keine neuen Aufträge" },
      },
    },
    experience: {
      eyebrow: "ERFAHRUNG",
      title: "Wo ich arbeite.",
      sub: "Aktuelle Stelle.",
      present: "HEUTE",
      years: ["Jahr", "Jahre"],
      months: ["Monat", "Monate"],
      items: {
        stiga: {
          role: "Front End Engineer",
          company: "STIGA S.p.A.",
          place: "Castelfranco Veneto (TV), Italien",
          summary: "Front-End- und Mobile-Entwicklung für interne Firmenportale und Plattformen zur Verwaltung smarter IoT-Geräte.",
          bullets: [
            "Mehr als 12 veraltete Web-Komponenten in modulare React- und TypeScript-Oberflächen überführt und die Ladezeit des Portals für über 100 täglich aktive Mitarbeitende und Händler um 20 % gesenkt.",
            "Mehr als 5 performanceorientierte plattformübergreifende UI-Funktionen mit Flutter und Dart für die Verwaltung smarter Mähroboter entwickelt, zum Nutzen tausender aktiver Endkunden.",
            "Agile 2-Wochen-Sprints in einem internationalen Entwicklungsteam, 100 % der zugewiesenen Front-End-Aufgaben termingerecht mit Jira und Git geliefert.",
            "REST-APIs gemeinsam mit Backend-Entwicklern integriert, mit strenger TypeScript-Datenvalidierung gegen Laufzeitfehler in den internen Tools.",
          ],
        },
      },
    },
    projects: {
      eyebrow: "WICHTIGE PROJEKTE",
      title: "Was ich gebaut habe.",
      sub: "Eigene Produkte und Kundenprojekte.",
      caseStudy: "Fallstudie",
      live: "Live-Seite",
      code: "Quellcode",
      items: {
        scaletta: {
          title: "Scaletta",
          kind: "Offline-first-App für Setlisten (PWA)",
          bullets: [
            "Local-first-Architektur: Jede Änderung wird zuerst in IndexedDB gespeichert und über einen idempotenten, cursorbasierten Outbox mit Supabase synchronisiert, sodass die App auf der Bühne offline voll nutzbar bleibt.",
            "Bandrollen (creator, editor, viewer) mit Row-Level-Security in Postgres umgesetzt und auf einem echten Postgres (PGlite) getestet, auch für Fälle, in denen Fremde nichts lesen oder schreiben dürfen.",
            "Reine Domänenlogik (Akkorderkennung, Transposition, Rückgängig/Wiederholen) mit durch ESLint erzwungenen Modulgrenzen; rund 350 Unit-, UI-, Datenbank- und End-to-End-Tests, GitHub-Actions-CI, installierbare PWA.",
          ],
        },
        templateZero: {
          title: "Template Zero",
          kind: "Website und QR-Menü für Restaurants",
          bullets: [
            "Wiederverwendbares Template, das für jeden Kunden aus einer einzigen JSON-Datei angepasst wird: 4 Sprachen (DE/EN/IT/FR) mit lokalisierten URLs, statische Generierung und QR-Code-Tischmenü.",
            "Lighthouse 100/100/100/100 (mobil) auf der live geschalteten Seite, mit LCP 0,5 bis 1,5 s, CLS 0 und unter 112 KB komprimiertem JavaScript auf den Hauptseiten.",
            "Buchungsformular mit Zod-Validierung, Server Action und Rate Limiting (Upstash Redis mit In-Memory-Fallback); 29 Unit-Tests, 24 End-to-End-Tests (Playwright) und CI auf Node 20 und 22.",
          ],
        },
        medical: {
          title: "Plattform für eine Arztpraxis",
          kind: "Kundenprojekt",
          bullets: [
            "Progressive Web App mit Next.js App Router, React und Tailwind CSS, für eine Arztpraxis auf Vercel veröffentlicht.",
            "Barrierearme Oberfläche mit Radix-UI- und shadcn/ui-Bausteinen, die die Terminbuchung vereinfacht, mit einem Core-Web-Vitals-Wert von 95+.",
          ],
        },
        storyboard: {
          title: "Portfolio eines Animators und Storyboard-Künstlers",
          kind: "Kundenprojekt",
          bullets: [
            "Medienreiches Portfolio mit 2D-Animations- und Disney/Netflix-Storyboard-Showreels, mit Vimeo-API-Einbettungen und eigenen Radix-UI-Modal-Playern für flüssige Wiedergabe auf Handy und Desktop.",
          ],
        },
        shoes: {
          title: "Quiz zur Schuhwahl",
          kind: "Eigenes Projekt",
          bullets: [
            "Modulare Produktfinder-App ohne UI-Bibliothek von Drittanbietern (Lighthouse 100/100), aufgebaut um eine isolierte Zustandsmaschine (useQuiz.ts) mit stapelbasierten Verlaufs-Snapshots und gewichteten Empfehlungen.",
          ],
        },
      },
    },
    education: {
      eyebrow: "AUSBILDUNG",
      title: "Ausbildung.",
      items: {
        its: {
          title: "Höheres technisches Diplom in Front-End-Entwicklung",
          school: "ITS Academy Alto Adriatico · EQR-Stufe 5",
          desc: "Intensive zweijährige höhere technische Berufsausbildung mit Schwerpunkt auf Softwareentwicklung, Next.js, React, TypeScript und Datenbanksystemen.",
        },
        liceo: {
          title: "Abitur (Sprachzweig) und französisches Baccalauréat général",
          school: "Liceo Brocchi",
          desc: "Internationales Doppelabschluss-Programm mit Schwerpunkt auf Sprachbeherrschung und interkultureller Kommunikation.",
        },
      },
    },
    tools: {
      eyebrow: "WERKZEUGE UND TECHNOLOGIEN",
      title: "Stack.",
      sub: "Ein Punkt markiert, was ich am meisten nutze.",
      groups: { frontend: "FRONT END", backend: "BACK END UND DATEN", mobile: "MOBILE", quality: "QUALITÄT UND AUSLIEFERUNG" },
      methods: "METHODEN",
      methodItems: ["Agile (Scrum/Kanban)", "Komponentenbasierte Architektur", "Barrierefreiheit", "Funktionsübergreifende Zusammenarbeit", "UI/UX-Grundlagen"],
    },
    languages: {
      eyebrow: "SPRACHEN",
      title: "Sprachen.",
      sub: "Berufliche Arbeitssprache in sechs Sprachen.",
      items: [
        { name: "Italienisch", level: "Muttersprache" },
        { name: "Portugiesisch", level: "Muttersprache" },
        { name: "Englisch", level: "C1 (IELTS)" },
        { name: "Französisch", level: "B2" },
        { name: "Deutsch", level: "B1" },
        { name: "Russisch", level: "A2" },
      ],
      availability: "Offen für Vollzeitstellen und Freelance-Projekte. Umzug innerhalb des Schengen-Raums und Remote-Arbeit sind möglich.",
    },
    cta: {
      eyebrow: "KONTAKT",
      title: "Lass uns über dein Projekt sprechen.",
      talk: "Lass uns reden",
      email: "E-Mail",
    },
  },

  RU: {
    photoAlt: "Портрет Kawe Longon",
    eyebrow: "РЕЗЮМЕ · 2026",
    location: "Тревизо (TV), Италия",
    summary:
      "Фронтенд-разработчик, который не останавливается на браузере. Работаю и с вебом, и с мобильной разработкой: сайты и PWA на React и Next.js, нативные приложения на Flutter и ПО для умных IoT-устройств в STIGA. Когда проекту нужно, захожу и за интерфейс: Postgres, offline-first синхронизация, серверная валидация. Измеримые результаты: Lighthouse 100/100/100/100, около 350 автотестов и загрузка корпоративного портала быстрее на 20%.",
    download: "Скачать резюме",
    hire: "Нанять меня",
    stats: {
      since: { label: "В ПРОФЕССИИ", value: "2025", hint: "Сначала проекты для клиентов, потом STIGA" },
      tests: { label: "АВТОТЕСТЫ", value: "~350", hint: "В одном local-first PWA, с CI" },
      lighthouse: { label: "LIGHTHOUSE", value: "4 × 100", hint: "На опубликованном сайте Template Zero" },
      status: {
        label: "СТАТУС",
        open: { value: "Доступен", hint: "Полная занятость и фриланс-проекты" },
        closed: { value: "Занят", hint: "Сейчас новые заказы не беру" },
      },
    },
    experience: {
      eyebrow: "ОПЫТ",
      title: "Где я работаю.",
      sub: "Текущая должность.",
      present: "СЕЙЧАС",
      years: ["г.", "г."],
      months: ["мес.", "мес."],
      items: {
        stiga: {
          role: "Front End Engineer",
          company: "STIGA S.p.A.",
          place: "Кастельфранко-Венето (TV), Италия",
          summary: "Фронтенд- и мобильная разработка для внутренних корпоративных порталов и платформ управления умными IoT-устройствами.",
          bullets: [
            "Переработал более 12 устаревших веб-компонентов в модульные интерфейсы на React и TypeScript, сократив время загрузки портала на 20% для более чем 100 ежедневно активных сотрудников и дилеров.",
            "Разработал более 5 кроссплатформенных UI-функций на Flutter и Dart с упором на производительность для управления умными газонокосилками, расширив возможности для тысяч активных конечных пользователей.",
            "Работаю в 2-недельных Agile-спринтах в международной команде разработки: 100% назначенных фронтенд-задач сдано в срок через Jira и Git.",
            "Интегрирую REST API вместе с бэкенд-разработчиками и добавляю строгую валидацию данных на TypeScript, чтобы избегать ошибок выполнения во внутренних инструментах.",
          ],
        },
      },
    },
    projects: {
      eyebrow: "КЛЮЧЕВЫЕ ПРОЕКТЫ",
      title: "Что я построил.",
      sub: "Личные продукты и проекты для клиентов.",
      caseStudy: "Разбор проекта",
      live: "Открыть сайт",
      code: "Исходный код",
      items: {
        scaletta: {
          title: "Scaletta",
          kind: "Offline-first приложение для сетлистов (PWA)",
          bullets: [
            "Local-first архитектура: каждое изменение сначала записывается в IndexedDB, а затем синхронизируется с Supabase через идемпотентный outbox на курсорах, поэтому приложение полностью работает офлайн на сцене.",
            "Роли в группе (creator, editor, viewer) реализованы через row-level security в Postgres и проверены на настоящем Postgres (PGlite), включая случаи, когда посторонний не должен ничего читать и записывать.",
            "Чистая доменная логика (разбор аккордов, транспозиция, отмена/повтор) с границами модулей, которые контролирует ESLint; около 350 юнит-, UI-, баз данных и end-to-end тестов, CI на GitHub Actions, устанавливаемое PWA.",
          ],
        },
        templateZero: {
          title: "Template Zero",
          kind: "Сайт и QR-меню для ресторанов",
          bullets: [
            "Переиспользуемый шаблон, который настраивается под каждого клиента из одного JSON-файла: 4 языка (DE/EN/IT/FR) с локализованными URL, статическая генерация и QR-меню на столе.",
            "Lighthouse 100/100/100/100 (mobile) на опубликованном сайте, LCP от 0,5 до 1,5 с, CLS 0 и меньше 112 КБ сжатого JavaScript на основных страницах.",
            "Форма бронирования с валидацией Zod, Server Action и rate limiting (Upstash Redis с запасным вариантом в памяти); 29 юнит-тестов, 24 end-to-end теста (Playwright) и CI на Node 20 и 22.",
          ],
        },
        medical: {
          title: "Платформа для медицинского кабинета",
          kind: "Проект для клиента",
          bullets: [
            "Progressive Web App на Next.js App Router, React и Tailwind CSS, опубликованное на Vercel для медицинского кабинета.",
            "Доступный интерфейс на примитивах Radix UI и shadcn/ui, упрощающий запись на приём, с оценкой Core Web Vitals 95+.",
          ],
        },
        storyboard: {
          title: "Портфолио аниматора и художника раскадровок",
          kind: "Проект для клиента",
          bullets: [
            "Портфолио с большим количеством медиа: шоурилы 2D-анимации и раскадровок Disney/Netflix, встраивание через Vimeo API и собственные модальные плееры на Radix UI для плавного воспроизведения на телефоне и компьютере.",
          ],
        },
        shoes: {
          title: "Квиз по подбору кроссовок",
          kind: "Личный проект",
          bullets: [
            "Модульное приложение для подбора товаров без сторонних UI-библиотек (Lighthouse 100/100), построенное вокруг изолированного конечного автомата (useQuiz.ts) со снимками истории в виде стека и взвешенными рекомендациями.",
          ],
        },
      },
    },
    education: {
      eyebrow: "ОБРАЗОВАНИЕ",
      title: "Образование.",
      items: {
        its: {
          title: "Высший технический диплом по фронтенд-разработке",
          school: "ITS Academy Alto Adriatico · 5-й уровень EQF",
          desc: "Интенсивная двухлетняя программа высшего профессионального технического образования: разработка ПО, Next.js, React, TypeScript и системы баз данных.",
        },
        liceo: {
          title: "Аттестат (лингвистический профиль) и французский Baccalauréat général",
          school: "Liceo Brocchi",
          desc: "Международная программа двойного диплома с упором на владение языками и межкультурную коммуникацию.",
        },
      },
    },
    tools: {
      eyebrow: "ИНСТРУМЕНТЫ И ТЕХНОЛОГИИ",
      title: "Стек.",
      sub: "Точка отмечает то, чем я пользуюсь чаще всего.",
      groups: { frontend: "FRONT END", backend: "BACK END И ДАННЫЕ", mobile: "МОБИЛЬНАЯ РАЗРАБОТКА", quality: "КАЧЕСТВО И ДОСТАВКА" },
      methods: "МЕТОДОЛОГИИ",
      methodItems: ["Agile (Scrum/Kanban)", "Компонентная архитектура", "Доступность", "Кросс-функциональная работа", "Основы UI/UX"],
    },
    languages: {
      eyebrow: "ЯЗЫКИ",
      title: "Языки.",
      sub: "Профессиональное владение шестью языками.",
      items: [
        { name: "Итальянский", level: "Родной" },
        { name: "Португальский", level: "Родной" },
        { name: "Английский", level: "C1 (IELTS)" },
        { name: "Французский", level: "B2" },
        { name: "Немецкий", level: "B1" },
        { name: "Русский", level: "A2" },
      ],
      availability: "Открыт для полной занятости и фриланс-проектов. Возможны переезд в страны Шенгена и удалённая работа.",
    },
    cta: {
      eyebrow: "СВЯЗАТЬСЯ",
      title: "Обсудим твой проект.",
      talk: "Давай поговорим",
      email: "Email",
    },
  },
}
