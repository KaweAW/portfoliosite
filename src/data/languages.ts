import type { Language } from "../types"

export interface LanguageOption {
  code: Language
  /** BCP 47 tag, used for <html lang> and date formatting. */
  locale: string
  /** Name of the language in the language itself, used for accessible labels. */
  nativeName: string
}

export const LANGUAGES: readonly LanguageOption[] = [
  { code: "EN", locale: "en", nativeName: "English" },
  { code: "IT", locale: "it", nativeName: "Italiano" },
  { code: "FR", locale: "fr", nativeName: "Français" },
  { code: "DE", locale: "de", nativeName: "Deutsch" },
  { code: "RU", locale: "ru", nativeName: "Русский" },
]

export const DEFAULT_LANGUAGE: Language = "EN"

export const isLanguage = (value: unknown): value is Language =>
  LANGUAGES.some((l) => l.code === value)

export const localeFor = (language: Language): string =>
  LANGUAGES.find((l) => l.code === language)?.locale ?? "en"
