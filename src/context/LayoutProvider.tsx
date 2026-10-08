import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react"
import { SITE_NAME, SITE_TITLE } from "../data/site"
import { localeFor } from "../data/languages"
import { TRANSLATIONS } from "../data/translations"
import { useHashView } from "../hooks/useHashView"
import { getInitialLanguage, saveLanguage } from "../lib/language"
import type { Language } from "../types"
import { LayoutContext, type LayoutContextValue } from "./layout-context"

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const view = useHashView()
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next)
    saveLanguage(next)
  }, [])

  const t = TRANSLATIONS[language]

  // Keep the document in sync so screen readers pick the right voice and the tab title matches the page.
  useEffect(() => {
    document.documentElement.lang = localeFor(language)
  }, [language])

  useEffect(() => {
    document.title = view === "home" ? SITE_TITLE : `${t.nav[view]} | ${SITE_NAME}`
  }, [view, t])

  const value = useMemo<LayoutContextValue>(
    () => ({ view, language, setLanguage, t }),
    [view, language, setLanguage, t],
  )

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
}
