import type { Language, Translation } from "../types"

/**
 * All user-facing copy, one object per language. `Translation` (types.ts)
 * makes TypeScript report any missing key or project/timeline entry.
 */
export const TRANSLATIONS: Record<Language, Translation> = {
  IT: {
    home: { subtitle: "SVILUPPATORE FRONTEND" },
    nav: { home: "INDEX", projects: "LAVORI", timeline: "PERCORSO", contact: "INFO" },
    projects: {
      title: "LAVORI",
      dir: "[ DIR: /PROGETTI/INDEX ]",
      items: {
        scaletta: { title: "SCALETTA", desc: "App per le scalette di una band: accordi, modalità palco e condivisione live, anche offline." },
        templateZero: { title: "TEMPLATE ZERO", desc: "Template di sito multilingua e menu con QR code per ristoranti, bar e caffè." },
        medical: { title: "STUDIO MEDICO", desc: "Sito web con sistema di prenotazione online." },
        portal: { title: "PORTALE INTERNO", desc: "Gestionale per dipendenti e rivenditori aziendali." },
        storyboard: { title: "STORYBOARD ARTIST", desc: "Sito portfolio per un artista di storyboard 2D." },
      },
    },
    timeline: {
      title: "PERCORSO",
      ongoing: "IN CORSO",
      items: {
        liceo: { title: "DOPPIO DIPLOMA LINGUISTICO", desc: "Conclusione percorso Liceo Brocchi (Bassano del Grappa)." },
        julia: { title: "IMPIEGATO JULIA ITALIA", desc: "Azienda di arredamento." },
        indonesia: { title: "CLINICA INDONESIA", desc: "Esperienza lavorativa internazionale." },
        itsStart: { title: "ITS ALTO ADRIATICO", desc: "Inizio specializzazione sviluppo web." },
        firstSite: { title: "PRIMO SITO COMMISSIONATO", desc: "Traguardo professionale freelance." },
        stiga: { title: "DEV @ STIGA", desc: "Tirocinio e collaborazione continuativa: Flutter app bugfixing & React/TS portal rinnovo." },
        itsDiploma: { title: "DIPLOMA ITS ALTO ADRIATICO", desc: "Conseguimento del diploma di specializzazione in sviluppo web." },
      },
    },
    info: {
      title: "INFO",
      contactProtocols: "/ PROTOCOLLI_CONTATTO",
      dataExtract: "/ ESTRAZIONE_DATI",
      download: "SCARICA CV",
      contacts: { phone: "TELEFONO", email: "EMAIL", whatsapp: "WHATSAPP", startChat: "INIZIA CHAT" },
    },
    a11y: {
      skipToContent: "Vai al contenuto",
      languageSwitcher: "Selettore lingua",
      primaryNav: "Navigazione principale",
      opensInNewTab: "(si apre in una nuova scheda)",
    },
  },

  EN: {
    home: { subtitle: "FRONTEND DEVELOPER" },
    nav: { home: "INDEX", projects: "WORK", timeline: "TIMELINE", contact: "INFO" },
    projects: {
      title: "WORK",
      dir: "[ DIR: /PROJECTS/INDEX ]",
      items: {
        scaletta: { title: "SCALETTA", desc: "Setlist app for bands: chord charts, stage mode and live sharing, even offline." },
        templateZero: { title: "TEMPLATE ZERO", desc: "Multilingual website and QR table menu template for restaurants, bars and cafes." },
        medical: { title: "MEDICAL STUDIO", desc: "Website with an online booking system." },
        portal: { title: "INTERNAL PORTAL", desc: "Management software for employees and corporate dealers." },
        storyboard: { title: "STORYBOARD ARTIST", desc: "Portfolio website for a 2D storyboard artist." },
      },
    },
    timeline: {
      title: "TIMELINE",
      ongoing: "ONGOING",
      items: {
        liceo: { title: "DOUBLE LINGUISTIC DIPLOMA", desc: "Graduation from Liceo Brocchi (Bassano del Grappa)." },
        julia: { title: "OFFICE EMPLOYEE AT JULIA ITALIA", desc: "Furniture company." },
        indonesia: { title: "INDONESIA CLINIC", desc: "International work experience." },
        itsStart: { title: "ITS ALTO ADRIATICO", desc: "Began web development specialization." },
        firstSite: { title: "FIRST COMMISSIONED WEBSITE", desc: "Freelance professional milestone." },
        stiga: { title: "DEV @ STIGA", desc: "Ongoing internship and collaboration: Flutter app bugfixing & React/TS portal renewal." },
        itsDiploma: { title: "ITS ALTO ADRIATICO DIPLOMA", desc: "Graduation in web development specialization." },
      },
    },
    info: {
      title: "INFO",
      contactProtocols: "/ CONTACT_PROTOCOLS",
      dataExtract: "/ DATA_EXTRACT",
      download: "DOWNLOAD RESUME",
      contacts: { phone: "PHONE", email: "EMAIL", whatsapp: "WHATSAPP", startChat: "START CHAT" },
    },
    a11y: {
      skipToContent: "Skip to content",
      languageSwitcher: "Language switcher",
      primaryNav: "Main navigation",
      opensInNewTab: "(opens in a new tab)",
    },
  },

  FR: {
    home: { subtitle: "DÉVELOPPEUR FRONTEND" },
    nav: { home: "INDEX", projects: "TRAVAUX", timeline: "PARCOURS", contact: "INFO" },
    projects: {
      title: "TRAVAUX",
      dir: "[ DIR: /PROJETS/INDEX ]",
      items: {
        scaletta: { title: "SCALETTA", desc: "Application de setlists pour groupes : grilles d'accords, mode scène et partage en direct, même hors ligne." },
        templateZero: { title: "TEMPLATE ZERO", desc: "Modèle de site multilingue et de menu QR pour restaurants, bars et cafés." },
        medical: { title: "CABINET MÉDICAL", desc: "Site web avec système de réservation en ligne." },
        portal: { title: "PORTAIL INTERNE", desc: "Logiciel de gestion pour les employés et revendeurs." },
        storyboard: { title: "ARTISTE STORYBOARD", desc: "Site portfolio pour un artiste storyboard 2D." },
      },
    },
    timeline: {
      title: "PARCOURS",
      ongoing: "EN COURS",
      items: {
        liceo: { title: "DOUBLE DIPLÔME LINGUISTIQUE", desc: "Obtention du diplôme du Liceo Brocchi (Bassano del Grappa)." },
        julia: { title: "EMPLOYÉ DE BUREAU CHEZ JULIA ITALIA", desc: "Entreprise d'ameublement." },
        indonesia: { title: "CLINIQUE INDONÉSIE", desc: "Expérience de travail internationale." },
        itsStart: { title: "ITS ALTO ADRIATICO", desc: "Début de la spécialisation en développement web." },
        firstSite: { title: "PREMIER SITE COMMANDÉ", desc: "Étape professionnelle en freelance." },
        stiga: { title: "DEV @ STIGA", desc: "Stage et collaboration continue : correction de bugs Flutter & renouvellement du portail React/TS." },
        itsDiploma: { title: "DIPLÔME ITS ALTO ADRIATICO", desc: "Obtention du diplôme de spécialisation en développement web." },
      },
    },
    info: {
      title: "INFO",
      contactProtocols: "/ PROTOCOLES_DE_CONTACT",
      dataExtract: "/ EXTRACTION_DE_DONNÉES",
      download: "TÉLÉCHARGER CV",
      contacts: { phone: "TÉLÉPHONE", email: "EMAIL", whatsapp: "WHATSAPP", startChat: "DÉMARRER LE CHAT" },
    },
    a11y: {
      skipToContent: "Aller au contenu",
      languageSwitcher: "Sélecteur de langue",
      primaryNav: "Navigation principale",
      opensInNewTab: "(s'ouvre dans un nouvel onglet)",
    },
  },

  DE: {
    home: { subtitle: "FRONTEND-ENTWICKLER" },
    nav: { home: "INDEX", projects: "ARBEITEN", timeline: "TIMELINE", contact: "INFO" },
    projects: {
      title: "ARBEITEN",
      dir: "[ DIR: /PROJEKTE/INDEX ]",
      items: {
        scaletta: { title: "SCALETTA", desc: "Setlist-App für Bands: Akkordblätter, Bühnenmodus und Live-Sharing, auch offline." },
        templateZero: { title: "TEMPLATE ZERO", desc: "Mehrsprachige Website- und QR-Menü-Vorlage für Restaurants, Bars und Cafés." },
        medical: { title: "ARZTPRAXIS", desc: "Website mit einem Online-Buchungssystem." },
        portal: { title: "INTERNES PORTAL", desc: "Managementsystem für Mitarbeiter und Händler." },
        storyboard: { title: "STORYBOARD-KÜNSTLER", desc: "Portfolio-Website für einen 2D-Storyboard-Künstler." },
      },
    },
    timeline: {
      title: "ZEITLEISTE",
      ongoing: "LAUFEND",
      items: {
        liceo: { title: "DOPPELTES SPRACHDIPLOM", desc: "Abschluss am Liceo Brocchi (Bassano del Grappa)." },
        julia: { title: "ANGESTELLTER BEI JULIA ITALIA", desc: "Möbelunternehmen." },
        indonesia: { title: "KLINIK IN INDONESIEN", desc: "Internationale Arbeitserfahrung." },
        itsStart: { title: "ITS ALTO ADRIATICO", desc: "Beginn der Spezialisierung auf Webentwicklung." },
        firstSite: { title: "ERSTE AUFTRAGSWEBSITE", desc: "Meilenstein als freiberuflicher Entwickler." },
        stiga: { title: "DEV @ STIGA", desc: "Praktikum und laufende Zusammenarbeit: Flutter-App Bugfixing & React/TS Portal-Erneuerung." },
        itsDiploma: { title: "ITS ALTO ADRIATICO DIPLOM", desc: "Abschluss in der Spezialisierung auf Webentwicklung." },
      },
    },
    info: {
      title: "INFO",
      contactProtocols: "/ KONTAKT_PROTOKOLLE",
      dataExtract: "/ DATEN_EXTRAKT",
      download: "RESUME LADEN",
      contacts: { phone: "TELEFON", email: "E-MAIL", whatsapp: "WHATSAPP", startChat: "CHAT STARTEN" },
    },
    a11y: {
      skipToContent: "Zum Inhalt springen",
      languageSwitcher: "Sprachauswahl",
      primaryNav: "Hauptnavigation",
      opensInNewTab: "(öffnet in neuem Tab)",
    },
  },

  RU: {
    home: { subtitle: "ФРОНТЕНД-РАЗРАБОТЧИК" },
    nav: { home: "INDEX", projects: "РАБОТЫ", timeline: "ИСТОРИЯ", contact: "ИНФО" },
    projects: {
      title: "РАБОТЫ",
      dir: "[ ДИР: /PROJECTS/INDEX ]",
      items: {
        scaletta: { title: "SCALETTA", desc: "Приложение для сет-листов групп: аккорды, режим сцены и совместный доступ, работает офлайн." },
        templateZero: { title: "TEMPLATE ZERO", desc: "Шаблон многоязычного сайта и QR-меню для ресторанов, баров и кафе." },
        medical: { title: "МЕДИЦИНСКИЙ ЦЕНТР", desc: "Веб-сайт с системой онлайн-бронирования." },
        portal: { title: "ВНУТРЕННИЙ ПОРТАЛ", desc: "Система управления для сотрудников и корпоративных дилеров." },
        storyboard: { title: "ХУДОЖНИК РАСКАДРОВКИ", desc: "Сайт-портфолио для 2D художника раскадровки." },
      },
    },
    timeline: {
      title: "ХРОНОЛОГИЯ",
      ongoing: "В ПРОЦЕССЕ",
      items: {
        liceo: { title: "ДВОЙНОЙ ЯЗЫКОВОЙ ДИПЛОМ", desc: "Окончание лингвистического лицея Brocchi (Бассано-дель-Граппа)." },
        julia: { title: "СЛУЖАЩИЙ В JULIA ITALIA", desc: "Мебельная компания." },
        indonesia: { title: "КЛИНИКА В ИНДОНЕЗИИ", desc: "Международный рабочий опыт." },
        itsStart: { title: "ITS ALTO ADRIATICO", desc: "Начало специализации в веб-разработке." },
        firstSite: { title: "ПЕРВЫЙ ЗАКАЗНОЙ САЙТ", desc: "Важный профессиональный рубеж во фрилансе." },
        stiga: { title: "DEV @ STIGA", desc: "Стажировка и долгосрочное сотрудничество: исправление багов во Flutter и обновление внутреннего портала на React/TS." },
        itsDiploma: { title: "ДИПЛОМ ITS ALTO ADRIATICO", desc: "Получение диплома по специализации веб-разработки." },
      },
    },
    info: {
      title: "ИНФО",
      contactProtocols: "/ ПРОТОКОЛЫ_СВЯЗИ",
      dataExtract: "/ ВЫГРУЗКА_ДАННЫХ",
      download: "СКАЧАТЬ РЕЗЮМЕ",
      contacts: { phone: "ТЕЛЕФОН", email: "EMAIL", whatsapp: "WHATSAPP", startChat: "НАЧАТЬ ЧАТ" },
    },
    a11y: {
      skipToContent: "Перейти к содержимому",
      languageSwitcher: "Выбор языка",
      primaryNav: "Основная навигация",
      opensInNewTab: "(откроется в новой вкладке)",
    },
  },
}
