import { DEFAULT_LANGUAGE, isLanguage } from "../data/languages"
import type { Language } from "../types"

const STORAGE_KEY = "kl:language"

/** Saved choice first, then the browser language, then English. */
export const getInitialLanguage = (): Language => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (isLanguage(saved)) return saved
  } catch {
    /* storage unavailable (private mode, blocked cookies): fall through */
  }

  const browser = window.navigator.language.slice(0, 2).toUpperCase()
  return isLanguage(browser) ? browser : DEFAULT_LANGUAGE
}

export const saveLanguage = (language: Language): void => {
  try {
    window.localStorage.setItem(STORAGE_KEY, language)
  } catch {
    /* storage unavailable: the choice just won't persist */
  }
}
