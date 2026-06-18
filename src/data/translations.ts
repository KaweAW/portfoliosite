import { type Language } from "../context/LayoutContext"

export const TRANSLATIONS: Record<Language, any> = {
  IT: {
    home: { subtitle: "SVILUPPATORE FRONTEND" },
    nav: { work: "// LAVORI", timeline: "// PERCORSO", info: "// INFO" },
    headers: { work: "LAVORI", info: "INFO" },
    projects: {
      dir: "[ DIR: /PROGETTI/INDEX ]",
      items: [
        { id: "01", title: "STUDIO MEDICO", desc: "Sito web con sistema di prenotazione online.", url: "https://www.dottmaicobattistello.it/", img: "/dottmaicobattistello.png" },
        { id: "02", title: "PORTALE INTERNO", desc: "Gestionale per dipendenti e rivenditori aziendali.", url: "https://stiga-csp-prod.web.app/", img: "/portale-ssp.png" },
        { id: "03", title: "STORYBOARD ARTIST", desc: "Sito portfolio per un artista di storyboard 2D.", url: "https://www.tommasotamburini.com/", img: "/storyboardartist.png" },
      ]
    },
    timeline: {
      title: "PERCORSO",
      items: [
        { date: "LUG 2023", title: "DOPPIO DIPLOMA LINGUISTICO", desc: "Conclusione percorso Liceo Brocchi (Bassano del Grappa).", img: "/portfoliopic1.jpeg" },
        { date: "SET 2023", title: "IMPIEGATO JULIA ITALIA", desc: "Azienda di arredamento.", img: "/portfoliopic2.jpg" },
        { date: "FEB 2024", title: "CLINICA INDONESIA", desc: "Esperienza lavorativa internazionale.", img: "/portfoliopic3.jpg" },
        { date: "OTT 2024", title: "ITS ALTO ADRIATICO", desc: "Inizio specializzazione sviluppo web.", img: "/portfoliopic4.jpg" },
        { date: "MAR 2025", title: "PRIMO SITO COMMISSIONATO", desc: "Traguardo professionale freelance.", img: "/portfoliopic6.jpg" },
        { date: "GIU 2025 - IN CORSO", title: "DEV @ STIGA", desc: "Tirocinio e collaborazione continuativa: Flutter app bugfixing & React/TS portal rinnovo.", img: "/stiga-experience.webp" },
        { date: "GIU 2026", title: "DIPLOMA ITS ALTO ADRIATICO", desc: "Conseguimento del diploma di specializzazione in sviluppo web." }
      ]
    },
    info: {
      contact_protocols: "/ PROTOCOLLI_CONTATTO",
      data_extract: "/ ESTRAZIONE_DATI",
      download: "SCARICA CV",
      contacts: { phone: "TELEFONO", email: "EMAIL", whatsapp: "WHATSAPP", start_chat: "INIZIA CHAT" }
    }
  },
  EN: {
    home: { subtitle: "FRONTEND DEVELOPER" },
    nav: { work: "// WORK", timeline: "// TIMELINE", info: "// INFO" },
    headers: { work: "WORK", info: "INFO" },
    projects: {
      dir: "[ DIR: /PROJECTS/INDEX ]",
      items: [
        { id: "01", title: "MEDICAL STUDIO", desc: "Website with an online booking system.", url: "https://www.dottmaicobattistello.it/", img: "/dottmaicobattistello.png" },
        { id: "02", title: "INTERNAL PORTAL", desc: "Management software for employees and corporate dealers.", url: "https://stiga-csp-prod.web.app/", img: "/portale-ssp.png" },
        { id: "03", title: "STORYBOARD ARTIST", desc: "Portfolio website for a 2D storyboard artist.", url: "https://www.tommasotamburini.com/", img: "/storyboardartist.png" },
      ]
    },
    timeline: {
      title: "TIMELINE",
      items: [
        { date: "JUL 2023", title: "DOUBLE LINGUISTIC DIPLOMA", desc: "Graduation from Liceo Brocchi (Bassano del Grappa).", img: "/portfoliopic1.jpeg" },
        { date: "SEP 2023", title: "OFFICE EMPLOYEE AT JULIA ITALIA", desc: "Furniture company.", img: "/portfoliopic2.jpg" },
        { date: "FEB 2024", title: "INDONESIA CLINIC", desc: "International work experience.", img: "/portfoliopic3.jpg" },
        { date: "OCT 2024", title: "ITS ALTO ADRIATICO", desc: "Began web development specialization.", img: "/portfoliopic4.jpg" },
        { date: "MAR 2025", title: "FIRST COMMISSIONED WEBSITE", desc: "Freelance professional milestone.", img: "/portfoliopic6.jpg" },
        { date: "JUN 2025 - ONGOING", title: "DEV @ STIGA", desc: "Ongoing internship and collaboration: Flutter app bugfixing & React/TS portal renewal.", img: "/stiga-experience.webp" },
        { date: "JUN 2026", title: "ITS ALTO ADRIATICO DIPLOMA", desc: "Graduation in web development specialization." }
      ]
    },
    info: {
      contact_protocols: "/ CONTACT_PROTOCOLS",
      data_extract: "/ DATA_EXTRACT",
      download: "DOWNLOAD RESUME",
      contacts: { phone: "PHONE", email: "EMAIL", whatsapp: "WHATSAPP", start_chat: "START CHAT" }
    }
  },
  DE: {
    home: { subtitle: "FRONTEND-ENTWICKLER" },
    nav: { work: "// ARBEITEN", timeline: "// TIMELINE", info: "// INFO" },
    headers: { work: "ARBEITEN", info: "INFO" },
    projects: {
      dir: "[ DIR: /PROJEKTE/INDEX ]",
      items: [
        { id: "01", title: "ARZTPRAXIS", desc: "Website mit einem Online-Buchungssystem.", url: "https://www.dottmaicobattistello.it/", img: "/dottmaicobattistello.png" },
        { id: "02", title: "INTERNES PORTAL", desc: "Managementsystem für Mitarbeiter und Händler.", url: "https://stiga-csp-prod.web.app/", img: "/portale-ssp.png" },
        { id: "03", title: "STORYBOARD-KÜNSTLER", desc: "Portfolio-Website für einen 2D-Storyboard-Künstler.", url: "https://www.tommasotamburini.com/", img: "/storyboardartist.png" },
      ]
    },
    timeline: {
      title: "ZEITLEISTE",
      items: [
        { date: "JUL 2023", title: "DOPPELTES SPRACHDIPLOM", desc: "Abschluss am Liceo Brocchi (Bassano del Grappa).", img: "/portfoliopic1.jpeg" },
        { date: "SEP 2023", title: "ANGESTELLTER BEI JULIA ITALIA", desc: "Möbelunternehmen.", img: "/portfoliopic2.jpg" },
        { date: "FEB 2024", title: "KLINIK IN INDONESIEN", desc: "Internationale Arbeitserfahrung.", img: "/portfoliopic3.jpg" },
        { date: "OKT 2024", title: "ITS ALTO ADRIATICO", desc: "Beginn der Spezialisierung auf Webentwicklung.", img: "/portfoliopic4.jpg" },
        { date: "MÄZ 2025", title: "ERSTE AUFTRAGSWEBSITE", desc: "Meilenstein als freiberuflicher Entwickler.", img: "/portfoliopic6.jpg" },
        { date: "JUN 2025 - LAUFEND", title: "DEV @ STIGA", desc: "Praktikum und laufende Zusammenarbeit: Flutter-App Bugfixing & React/TS Portal-Erneuerung.", img: "/stiga-experience.webp" },
        { date: "JUN 2026", title: "ITS ALTO ADRIATICO DIPLOM", desc: "Abschluss in der Spezialisierung auf Webentwicklung." }
      ]
    },
    info: {
      contact_protocols: "/ KONTAKT_PROTOKOLLE",
      data_extract: "/ DATEN_EXTRAKT",
      download: "RESUME LADEN",
      contacts: { phone: "TELEFON", email: "E-MAIL", whatsapp: "WHATSAPP", start_chat: "CHAT STARTEN" }
    }
  },
  RU: {
    home: { subtitle: "ФРОНТЕНД-РАЗРАБОТЧИК" },
    nav: { work: "// РАБОТЫ", timeline: "// ИСТОРИЯ", info: "// ИНФО" },
    headers: { work: "РАБОТЫ", info: "ИНФО" },
    projects: {
      dir: "[ ДИР: /PROJECTS/INDEX ]",
      items: [
        { id: "01", title: "МЕДИЦИНСКИЙ ЦЕНТР", desc: "Веб-сайт с системой онлайн-бронирования.", url: "https://www.dottmaicobattistello.it/", img: "/dottmaicobattistello.png" },
        { id: "02", title: "ВНУТРЕННИЙ ПОРТАЛ", desc: "Система управления для сотрудников и корпоративных дилеров.", url: "https://stiga-csp-prod.web.app/", img: "/portale-ssp.png" },
        { id: "03", title: "ХУДОЖНИК РАСКАДРОВКИ", desc: "Сайт-портфолио для 2D художника раскадровки.", url: "https://www.tommasotamburini.com/", img: "/storyboardartist.png" },
      ]
    },
    timeline: {
      title: "ХРОНОЛОГИЯ",
      items: [
        { date: "ИЮЛЬ 2023", title: "ДВОЙНОЙ ЯЗЫКОВОЙ ДИПЛОМ", desc: "Окончание лингвистического лицея Brocchi (Бассано-дель-Граппа).", img: "/portfoliopic1.jpeg" },
        { date: "СЕНТ 2023", title: "СЛУЖАЩИЙ В JULIA ITALIA", desc: "Мебельная компания.", img: "/portfoliopic2.jpg" },
        { date: "ФЕВР 2024", title: "КЛИНИКА В ИНДОНЕЗИИ", desc: "Международный рабочий опыт.", img: "/portfoliopic3.jpg" },
        { date: "ОКТ 2024", title: "ITS ALTO ADRIATICO", desc: "Начало специализации в веб-разработке.", img: "/portfoliopic4.jpg" },
        { date: "МАРТ 2025", title: "ПЕРВЫЙ ЗАКАЗНОЙ САЙТ", desc: "Важный профессиональный рубеж во фрилансе.", img: "/portfoliopic6.jpg" },
        { date: "ИЮНЬ 2025 - В ПРОЦЕССЕ", title: "DEV @ STIGA", desc: "Стажировка и долгосрочное сотрудничество: исправление багов во Flutter и обновление внутреннего портала на React/TS.", img: "/stiga-experience.webp" },
        { date: "ИЮНЬ 2026", title: "ДИПЛОМ ITS ALTO ADRIATICO", desc: "Получение диплома по специализации веб-разработки." }
      ]
    },
    info: {
      contact_protocols: "/ ПРОТОКОЛЫ_СВЯЗИ",
      data_extract: "/ ВЫГРУЗКА_ДАННЫХ",
      download: "СКАЧАТЬ РЕЗЮМЕ",
      contacts: { phone: "ТЕЛЕФОН", email: "EMAIL", whatsapp: "WHATSAPP", start_chat: "НАЧАТЬ ЧАТ" }
    }
  }
}