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
  url: string
  /** Desktop screenshot: shown in the cursor-following preview on hover. */
  image: ProjectImage
  /** Phone-sized screenshot for small screens. Falls back to `image` when missing. */
  mobileImage?: ProjectImage
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
    items: Record<TimelineId, ItemCopy>
  }
  info: {
    title: string
    contactProtocols: string
    dataExtract: string
    download: string
    contacts: {
      phone: string
      email: string
      whatsapp: string
      startChat: string
    }
  }
  a11y: {
    skipToContent: string
    languageSwitcher: string
    primaryNav: string
    opensInNewTab: string
  }
}
