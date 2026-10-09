import type { ViewId } from "./routes"

export type Language = "EN" | "IT" | "FR" | "DE" | "RU"

/* ---------- Content that does not change between languages ---------- */

export type ProjectId = "medical" | "portal" | "storyboard" | "scaletta" | "templateZero"

export interface ProjectImage {
  src: string
  /** Natural size in pixels. Used to pick a frame that fits the screenshot. */
  width: number
  height: number
}

export interface Project {
  id: ProjectId
  /** URL segment of the case study page: `/projects/<slug>`. */
  slug: string
  /** The live site. */
  url: string
  /** Public source code, when there is one. */
  repo?: string
  /** Technologies used. Left empty when unknown, and then the list is not shown. */
  stack: readonly string[]
  /** Desktop screenshot: shown in the cursor-following preview on hover. */
  image: ProjectImage
  /** Phone-sized screenshot for small screens. Falls back to `image` when missing. */
  mobileImage?: ProjectImage
}

/** Text of a project's case study page. */
export interface CaseStudyCopy {
  role: string
  challenge: string
  solution: string
  highlights: readonly string[]
}

export type ExperienceId = "stiga"
export type ResumeProjectId = "scaletta" | "templateZero" | "medical" | "storyboard" | "shoes"
export type EducationId = "its" | "liceo"
export type SkillGroupId = "frontend" | "backend" | "mobile" | "quality"

export interface MonthYear {
  year: number
  /** 1-12 */
  month: number
}

/* ---------- Translated copy ---------- */

export interface ItemCopy {
  title: string
  desc: string
}

export type BriefFieldId =
  | "projectType"
  | "features"
  | "technologies"
  | "assets"
  | "audience"
  | "hosting"
  | "support"
  | "legal"
  | "priority"

/** Label, placeholder and choices of one dropdown of the project brief. */
export interface BriefFieldCopy {
  label: string
  placeholder: string
  options: readonly string[]
}

export interface Translation {
  home: { subtitle: string }
  nav: Record<ViewId, string> & {
    /** Shorter label of the Resume link, used on small screens where the menu is tight. */
    resumeShort: string
  }
  projects: {
    title: string
    dir: string
    items: Record<ProjectId, ItemCopy>
  }
  contact: {
    title: string
    eyebrow: string
    headline: string
    intro: string
    availability: { open: string; closed: string }
    cards: {
      emailTitle: string
      copy: string
      copied: string
      linkedinHint: string
      githubHint: string
    }
    include: { title: string; body: string }
    form: {
      title: string
      name: string
      namePlaceholder: string
      email: string
      emailPlaceholder: string
      message: string
      messagePlaceholder: string
      budget: string
      budgetNone: string
      budgetClear: string
      more: string
      company: string
      companyPlaceholder: string
      fields: Record<BriefFieldId, BriefFieldCopy>
      /** Shown after a count when several options are picked: "3 selected". */
      selected: string
      deadline: string
      send: string
      sending: string
      sent: string
      /** Followed by the email address. */
      error: string
      required: string
    }
  }
  projectPage: {
    back: string
    role: string
    stack: string
    challenge: string
    solution: string
    highlights: string
    liveSite: string
    repository: string
    caseStudy: string
  }
  terminal: {
    open: string
    close: string
    label: string
    hint: string
  }
  a11y: {
    skipToContent: string
    languageSwitcher: string
    primaryNav: string
    opensInNewTab: string
    themeToLight: string
    themeToDark: string
  }
}

/* ---------- Resume page copy (see data/resumeCopy.ts) ---------- */

export interface ResumeSectionCopy {
  eyebrow: string
  title: string
  sub?: string
}

export interface ResumeStat {
  label: string
  value: string
  hint: string
}

export interface ResumeCopy {
  photoAlt: string
  eyebrow: string
  location: string
  summary: string
  download: string
  hire: string
  stats: {
    since: ResumeStat
    tests: ResumeStat
    lighthouse: ResumeStat
    status: { label: string; open: Omit<ResumeStat, "label">; closed: Omit<ResumeStat, "label"> }
  }
  experience: ResumeSectionCopy & {
    /** Replaces the end date of a job that is still going. */
    present: string
    /** Singular and plural word for "year" and "month", used for the length of the current job. */
    years: readonly [string, string]
    months: readonly [string, string]
    items: Record<ExperienceId, { role: string; company: string; place: string; summary: string; bullets: readonly string[] }>
  }
  projects: ResumeSectionCopy & {
    caseStudy: string
    live: string
    code: string
    items: Record<ResumeProjectId, { title: string; kind: string; bullets: readonly string[] }>
  }
  education: ResumeSectionCopy & {
    items: Record<EducationId, { title: string; school: string; desc: string }>
  }
  tools: ResumeSectionCopy & {
    groups: Record<SkillGroupId, string>
    methods: string
    methodItems: readonly string[]
  }
  languages: ResumeSectionCopy & {
    items: readonly { name: string; level: string }[]
    availability: string
  }
  cta: { eyebrow: string; title: string; talk: string; email: string }
}

/** Text of the terminal (everything except the command names, which are typed and stay in English). */
export interface TerminalCopy {
  welcome: readonly [string, string]
  /** What each command does, shown by `help`. */
  help: Record<
    "help" | "ls" | "projects" | "open" | "whoami" | "contact" | "email" | "github" | "linkedin" | "resume" | "lang" | "theme" | "history" | "clear" | "exit",
    string
  >
  helpFooter: string
  commandNotFound: string
  openUsage: string
  noSuchPage: string
  whoami: readonly [string, string, string, string]
  openingMail: string
  openingGithub: string
  openingLinkedin: string
  downloading: string
  langCurrent: string
  langAvailable: string
  langUnknown: string
  langSet: string
  themeCurrent: string
  themeAvailable: string
  themeUnknown: string
  themeSet: string
  sudoGranted: string
  sudoJoke: string
  sudoDenied: string
}
