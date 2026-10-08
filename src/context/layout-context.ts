import { createContext } from "react"
import type { ViewId } from "../routes"
import type { Language, Translation } from "../types"

export interface LayoutContextValue {
  view: ViewId
  language: Language
  setLanguage: (language: Language) => void
  /** Copy for the current language. */
  t: Translation
}

export const LayoutContext = createContext<LayoutContextValue | null>(null)
