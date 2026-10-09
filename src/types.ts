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

export type TimelineId =
  | "liceo"
  | "julia"
  | "indonesia"
  | "itsStart"
  | "firstSite"
  | "stiga"
  | "itsDiploma"

export interface MonthYear {
  year: number
  /** 1-12 */
  month: number
}

export interface TimelineEntry {
  id: TimelineId
  start: MonthYear
  /** When true the entry is shown as "<start> - ONGOING". */
  ongoing?: boolean
  image: string
}

/* ---------- Translated copy ---------- */

export interface ItemCopy {
  title: string
  desc: string
}

export interface Translation {
  home: { subtitle: string }
  nav: Record<ViewId, string>
  projects: {
    title: string
    dir: string
    items: Record<ProjectId, ItemCopy>
  }
  timeline: {
    title: string
    ongoing: string
    /** Accessible name of the overview axis above the list. */
    axis: string
    items: Record<TimelineId, ItemCopy>
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
      /** Short jokes shown on the cursor after copying the email. */
      copyJokes: readonly string[]
      linkedinHint: string
      githubHint: string
      resumeTitle: string
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
      projectType: string
      projectTypeNone: string
      projectTypes: readonly string[]
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
