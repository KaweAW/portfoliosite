import { createContext } from "react"
import type { ViewId } from "../routes"
import type { Language, Project, Translation } from "../types"

export interface LayoutContextValue {
  view: ViewId
  /** The project of the case study page being shown, otherwise null. */
  project: Project | null
  language: Language
  setLanguage: (language: Language) => void
  /** Copy for the current language. */
  t: Translation
}

export const LayoutContext = createContext<LayoutContextValue | null>(null)
