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
    FR: {
      role: "Conception et développement. Projet personnel, créé pour mon propre groupe de reprises.",
      challenge:
        "Les setlists sur papier et les fils de discussion s'effondrent sur scène : qui chante quoi, quelle guitare est accordée en drop D, ce qui vient ensuite sans pause. Le groupe avait besoin d'un seul endroit pour la setlist, les grilles d'accords et la vue de scène, qui continue de fonctionner sans réseau.",
      solution:
        "Une application installable qui enregistre tout d'abord sur l'appareil et fonctionne entièrement hors ligne. Le partage est facultatif : on invite les musiciens avec des rôles et la setlist se synchronise en direct entre leurs appareils.",
      highlights: [
        "Local-first : chaque modification est d'abord enregistrée dans la base de données du navigateur, puis synchronisée plus tard par une petite file d'attente, si bien qu'un concert n'est jamais interrompu.",
        "Les permissions sont dans la base de données (row-level security), testées sur un vrai Postgres, y compris les cas où un inconnu ne doit rien pouvoir lire ni écrire.",
        "Mode scène avec écran sombre, grands accords, écran toujours allumé et défilement automatique, plus export PDF de la setlist.",
        "Plus de 350 tests et une CI qui exécute typecheck, lint, tests et build à chaque pull request.",
      ],
    },
    DE: {
      role: "Konzept und Entwicklung. Persönliches Projekt, entstanden für meine eigene Coverband.",
      challenge:
        "Setlists auf Papier und geteilte Chat-Verläufe zerfallen auf der Bühne: wer was singt, welche Gitarre in Drop D gestimmt ist, was ohne Pause als Nächstes kommt. Die Band brauchte einen einzigen Ort für Setlist, Akkordblätter und Bühnenansicht, der auch ohne Empfang weiterläuft.",
      solution:
        "Eine installierbare App, die alles zuerst auf dem Gerät speichert und vollständig offline funktioniert. Teilen ist optional: Bandkollegen werden mit Rollen eingeladen, und die Setlist synchronisiert sich live zwischen ihren Geräten.",
      highlights: [
        "Local-first: Jede Änderung wird zuerst in der Datenbank des Browsers gespeichert und später über eine kleine Warteschlange synchronisiert, sodass ein Auftritt nie unterbrochen wird.",
        "Die Berechtigungen liegen in der Datenbank (Row-Level Security) und sind gegen ein echtes Postgres getestet, auch für die Fälle, in denen ein Fremder nichts lesen oder schreiben darf.",
        "Bühnenmodus mit dunklem Bildschirm, großen Akkorden, Bildschirm immer an und automatischem Scrollen, dazu PDF-Export der Setlist.",
        "Mehr als 350 Tests und eine CI, die bei jedem Pull Request Typecheck, Lint, Tests und Build ausführt.",
      ],
    },
    RU: {
      role: "Дизайн и разработка. Личный проект, созданный для моей собственной кавер-группы.",
      challenge:
        "Бумажные сетлисты и общие чаты рассыпаются на сцене: кто что поёт, какая гитара настроена в drop D, что идёт дальше без паузы. Группе нужно было одно место для сетлиста, аккордов и сценического режима, которое работает даже без сигнала.",
      solution:
        "Устанавливаемое приложение, которое сначала сохраняет всё на устройстве и полностью работает офлайн. Совместный доступ необязателен: участников группы приглашают с ролями, и сетлист синхронизируется между их устройствами в реальном времени.",
      highlights: [
        "Local-first: каждая правка сначала сохраняется в базе данных браузера, а затем синхронизируется через небольшую очередь, поэтому концерт никогда не прерывается.",
        "Права доступа заданы в базе данных (row-level security) и проверены на настоящем Postgres, включая случаи, когда посторонний не должен ничего читать и записывать.",
        "Сценический режим с тёмным экраном, крупными аккордами, экраном, который не гаснет, и автопрокруткой, плюс экспорт сетлиста в PDF.",
        "Более 350 тестов и CI, который при каждом pull request запускает проверку типов, lint, тесты и сборку.",
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
    FR: {
      role: "Conception et développement. Un modèle pour restaurants, bars et cafés, présenté avec un client de démonstration.",
      challenge:
        "Les petits établissements ont besoin d'un site rapide en plusieurs langues et d'un menu que les clients ouvrent depuis un QR code posé sur la table, sans payer un développement sur mesure à chaque modification.",
      solution:
        "Un modèle de site où tout ce qui change d'un client à l'autre se trouve dans des fichiers JSON et des images, de sorte qu'un client ordinaire n'exige aucune modification du code. Le client de démonstration est une trattoria à Munich, en allemand, anglais, italien et français.",
      highlights: [
        "Toutes les pages sont statiques, le site est donc rapide sur un téléphone avec une mauvaise connexion.",
        "La page d'accueil affiche l'état d'ouverture en direct, et le menu se filtre par régime et allergènes.",
        "Un formulaire de réservation avec validation qui envoie la demande par e-mail, plus un générateur de QR code pour le menu de table.",
        "Un script de validation et une liste de contrôle de livraison vérifient les traductions, le contraste des couleurs et les images avant la mise en ligne.",
      ],
    },
    DE: {
      role: "Konzept und Entwicklung. Eine Vorlage für Restaurants, Bars und Cafés, gezeigt mit einem Demokunden.",
      challenge:
        "Kleine Lokale brauchen eine schnelle, mehrsprachige Website und eine Speisekarte, die Gäste über einen QR-Code auf dem Tisch öffnen, ohne bei jeder Änderung für individuelle Entwicklung zu zahlen.",
      solution:
        "Eine Website-Vorlage, bei der alles, was sich von Kunde zu Kunde unterscheidet, in JSON-Dateien und Bildern liegt, sodass ein normaler Kunde keine Codeänderungen braucht. Der Demokunde ist eine Trattoria in München, auf Deutsch, Englisch, Italienisch und Französisch.",
      highlights: [
        "Alle Seiten sind statisch, die Website ist also auch auf einem Handy mit schwacher Verbindung schnell.",
        "Die Startseite zeigt den aktuellen Öffnungsstatus, und die Speisekarte lässt sich nach Ernährungsweise und Allergenen filtern.",
        "Ein Reservierungsformular mit Validierung, das die Anfrage per E-Mail verschickt, dazu ein QR-Code-Generator für die Tischkarte.",
        "Ein Validierungsskript und eine Checkliste für die Übergabe prüfen vor dem Start Übersetzungen, Farbkontrast und Bilder.",
      ],
    },
    RU: {
      role: "Дизайн и разработка. Шаблон для ресторанов, баров и кафе, показанный на демонстрационном клиенте.",
      challenge:
        "Небольшим заведениям нужен быстрый сайт на нескольких языках и меню, которое гости открывают по QR-коду на столе, без оплаты индивидуальной разработки при каждом изменении.",
      solution:
        "Шаблон сайта, где всё, что отличается у разных клиентов, хранится в JSON-файлах и изображениях, поэтому обычному клиенту не нужно менять код. Демонстрационный клиент — траттория в Мюнхене, на немецком, английском, итальянском и французском.",
      highlights: [
        "Все страницы статические, поэтому сайт быстро работает на телефоне даже при слабом соединении.",
        "Главная страница показывает текущий статус работы заведения, а меню можно фильтровать по диете и аллергенам.",
        "Форма бронирования с проверкой данных, которая отправляет заявку по электронной почте, и генератор QR-кода для меню на столе.",
        "Скрипт проверки и контрольный список сдачи проверяют переводы, контраст цветов и изображения перед запуском.",
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
    FR: {
      role: "Conception et développement, de février à août 2025. Projet client.",
      challenge:
        "Un médecin ayant des cabinets à Padoue, Vicence, Schio et Malo, qui pratique l'ozonothérapie, l'ostéopathie et la médecine légale, avait besoin d'un site qui explique clairement chaque traitement et que les patients de chaque ville puissent trouver sur Google.",
      solution:
        "Un site Next.js avec une page par service, une page de présentation, un blog et un formulaire de contact qui envoie la demande dans la boîte du médecin. Pour la recherche locale, chaque service a sa propre page pour chaque ville où il est proposé, avec des adresses en italien, ses propres métadonnées et des données structurées.",
      highlights: [
        "17 pages locales générées à partir d'un seul fichier de configuration des villes et des services : ajouter une ville est une modification des données, pas du code.",
        "SEO technique soigné page par page : sitemap, robots.txt, balises canonical et sociales, et données structurées pour le cabinet et le médecin.",
        "Formulaire de contact avec une route d'API qui envoie un e-mail au médecin, plus un bandeau de cookies et des statistiques.",
        "En-têtes de sécurité (HSTS, politique de sécurité du contenu) et HTTPS forcé ; composants accessibles basés sur Radix UI et shadcn/ui ; Core Web Vitals au-dessus de 95.",
      ],
    },
    DE: {
      role: "Konzept und Entwicklung, von Februar bis August 2025. Kundenprojekt.",
      challenge:
        "Ein Arzt mit Praxen in Padua, Vicenza, Schio und Malo, der Ozontherapie, Osteopathie und Rechtsmedizin anbietet, brauchte eine Website, die jede Behandlung klar erklärt und die Patienten in jeder Stadt über Google finden können.",
      solution:
        "Eine Next.js-Website mit einer Seite pro Leistung, einer Über-mich-Seite, einem Blog und einem Kontaktformular, das die Anfrage an das Postfach des Arztes schickt. Für die lokale Suche hat jede Leistung eine eigene Seite für jede Stadt, in der sie angeboten wird, mit italienischen Adressen, eigenen Metadaten und strukturierten Daten.",
      highlights: [
        "17 lokale Landingpages aus einer einzigen Konfigurationsdatei für Städte und Leistungen: Eine neue Stadt hinzuzufügen ist eine Änderung an Daten, nicht am Code.",
        "Technische SEO Seite für Seite: Sitemap, robots.txt, Canonical- und Social-Tags sowie strukturierte Daten für die Praxis und den Arzt.",
        "Kontaktformular mit einer API-Route, die dem Arzt eine E-Mail schickt, dazu ein Cookie-Banner und Analytics.",
        "Sicherheits-Header (HSTS, Content Security Policy) und erzwungenes HTTPS; zugängliche Komponenten auf Basis von Radix UI und shadcn/ui; Core Web Vitals über 95.",
      ],
    },
    RU: {
      role: "Дизайн и разработка, с февраля по август 2025 года. Клиентский проект.",
      challenge:
        "Врачу с кабинетами в Падуе, Виченце, Скио и Мало, который занимается озонотерапией, остеопатией и судебной медициной, нужен был сайт, ясно объясняющий каждое лечение, который пациенты из каждого города могли бы найти в Google.",
      solution:
        "Сайт на Next.js со страницей для каждой услуги, страницей «Обо мне», блогом и формой обратной связи, которая отправляет запрос на почту врача. Для локального поиска у каждой услуги есть отдельная страница для каждого города, где она доступна, с адресами на итальянском, собственными метаданными и структурированными данными.",
      highlights: [
        "17 локальных страниц, созданных из одного конфигурационного файла городов и услуг: добавить город — значит изменить данные, а не код.",
        "Техническое SEO, проработанное постранично: карта сайта, robots.txt, canonical- и социальные теги, структурированные данные для практики и врача.",
        "Форма обратной связи с API-маршрутом, который отправляет письмо врачу, а также баннер cookie и аналитика.",
        "Заголовки безопасности (HSTS, политика безопасности контента) и принудительный HTTPS; доступные компоненты на основе Radix UI и shadcn/ui; Core Web Vitals выше 95.",
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
    FR: {
      role: "Ingénieur frontend chez STIGA, depuis juin 2025, dans une équipe Agile internationale.",
      challenge:
        "Employés et revendeurs utilisaient un portail interne pour gérer les appareils, les revendeurs, les campagnes marketing et les utilisateurs, mais une partie reposait sur d'anciens composants web lents à charger et difficiles à modifier.",
      solution:
        "J'ai reconstruit ces parties sous forme de composants React et TypeScript modulaires et je les ai reliées aux API REST avec une validation stricte des données, en travaillant avec les ingénieurs backend par sprints de deux semaines.",
      highlights: [
        "Plus de 12 anciens composants refactorisés en React et TypeScript modulaires, avec des temps de chargement réduits d'environ 20 % pour plus de 100 personnes qui utilisent le portail chaque jour.",
        "Les données des API sont validées en TypeScript avec Zod : les réponses inattendues sont interceptées au lieu de casser l'interface à l'exécution.",
        "Interface en plusieurs langues, avec des traductions synchronisées depuis un service de traduction lors du build, et des environnements de test et de production séparés.",
        "Chaque build commence par le lint et la vérification des types ; thème clair et sombre, et navigation selon le rôle de l'utilisateur.",
      ],
    },
    DE: {
      role: "Frontend-Engineer bei STIGA, seit Juni 2025, in einem internationalen agilen Team.",
      challenge:
        "Mitarbeitende und Händler nutzten ein internes Portal, um Geräte, Händler, Marketingkampagnen und Benutzer zu verwalten, aber ein Teil bestand aus älteren Web-Komponenten, die langsam luden und schwer zu ändern waren.",
      solution:
        "Ich habe diese Teile als modulare React- und TypeScript-Komponenten neu gebaut und mit strikter Datenvalidierung an die REST-APIs angebunden, gemeinsam mit den Backend-Entwicklern in Zwei-Wochen-Sprints.",
      highlights: [
        "Mehr als 12 Legacy-Komponenten in modulares React und TypeScript überführt, wodurch die Ladezeit für über 100 Personen, die das Portal täglich nutzen, um etwa 20 % sank.",
        "Daten aus den APIs werden in TypeScript mit Zod validiert, sodass unerwartete Antworten abgefangen werden, statt zur Laufzeit die Oberfläche zu zerstören.",
        "Oberfläche in mehreren Sprachen mit Übersetzungen, die beim Build aus einem Übersetzungsdienst synchronisiert werden, sowie getrennte Test- und Produktionsumgebungen.",
        "Jeder Build beginnt mit Lint und Typprüfung; helles und dunkles Theme sowie eine Navigation, die der Rolle des Benutzers folgt.",
      ],
    },
    RU: {
      role: "Frontend-инженер в STIGA с июня 2025 года, в международной команде Agile.",
      challenge:
        "Сотрудники и дилеры пользовались внутренним порталом для управления устройствами, дилерами, маркетинговыми кампаниями и пользователями, но часть портала была построена на устаревших веб-компонентах, которые медленно загружались и с трудом поддавались изменениям.",
      solution:
        "Я переписал эти части в виде модульных компонентов на React и TypeScript и подключил их к REST API со строгой проверкой данных, работая с backend-инженерами в двухнедельных спринтах.",
      highlights: [
        "Более 12 устаревших компонентов переработано в модульные React и TypeScript, время загрузки сократилось примерно на 20 % для более чем 100 человек, которые пользуются порталом каждый день.",
        "Данные из API проверяются в TypeScript с помощью Zod, поэтому неожиданные ответы перехватываются, а не ломают интерфейс во время работы.",
        "Интерфейс на нескольких языках, переводы синхронизируются из сервиса переводов при сборке; тестовая и боевая среды разделены.",
        "Каждая сборка начинается с lint и проверки типов; светлая и тёмная темы, навигация зависит от роли пользователя.",
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
    FR: {
      role: "Conception et développement. Réalisé pour un animateur 2D et story artist.",
      challenge:
        "Un animateur 2D et story artist qui a travaillé avec des studios comme Disney, Netflix et Fox Animation avait besoin d'un portfolio qui présente bien ses reels et ses storyboards et que les moteurs de recherche puissent indexer.",
      solution:
        "Un site avec une page par section (biographie, animation, storyboard, projets personnels, CV et contacts), chacune avec son propre titre, sa description et son adresse. Il est disponible en anglais et en italien et propose un CV à télécharger.",
      highlights: [
        "Vitrine vidéo avec des lecteurs Vimeo ouverts depuis une carte.",
        "Galeries de storyboards avec une visionneuse qui gère suivant, précédent et le balayage sur téléphone.",
        "Les bases pour les moteurs de recherche bien faites : sitemap, cartes Open Graph et données structurées pour la personne.",
      ],
    },
    DE: {
      role: "Konzept und Entwicklung. Entstanden für einen 2D-Animator und Story Artist.",
      challenge:
        "Ein 2D-Animator und Story Artist, der mit Studios wie Disney, Netflix und Fox Animation gearbeitet hat, brauchte ein Portfolio, das seine Reels und Storyboards gut zeigt und das Suchmaschinen indexieren können.",
      solution:
        "Eine Website mit einer Seite pro Bereich (Biografie, Animation, Storyboard, persönliche Projekte, Lebenslauf und Kontakt), jeweils mit eigenem Titel, eigener Beschreibung und eigener Adresse. Sie ist auf Englisch und Italienisch verfügbar und bietet einen Lebenslauf zum Download.",
      highlights: [
        "Video-Showcase mit Vimeo-Playern, die aus einer Karte heraus geöffnet werden.",
        "Storyboard-Galerien mit einem Viewer, der Weiter, Zurück und Wischen auf dem Handy unterstützt.",
        "Suchmaschinen-Grundlagen sauber umgesetzt: Sitemap, Open-Graph-Karten und strukturierte Daten für die Person.",
      ],
    },
    RU: {
      role: "Дизайн и разработка. Создано для 2D-аниматора и сторибордера.",
      challenge:
        "2D-аниматору и сторибордеру, работавшему со студиями вроде Disney, Netflix и Fox Animation, нужно было портфолио, которое хорошо показывает его ролики и сториборды и которое могут индексировать поисковые системы.",
      solution:
        "Сайт с отдельной страницей для каждого раздела (биография, анимация, сториборд, личные проекты, резюме и контакты), у каждой — свои заголовок, описание и адрес. Он доступен на английском и итальянском, есть резюме для скачивания.",
      highlights: [
        "Видеовитрина с плеерами Vimeo, которые открываются из карточки.",
        "Галереи сторибордов с просмотрщиком, поддерживающим «вперёд», «назад» и свайп на телефоне.",
        "Основы для поисковых систем сделаны как надо: карта сайта, карточки Open Graph и структурированные данные о человеке.",
      ],
    },
  },
}

/** Case study text in the given language, falling back to English. */
export const caseStudyFor = (id: ProjectId, language: Language): CaseStudyCopy =>
  CASE_STUDIES[id][language] ?? CASE_STUDIES[id].EN
