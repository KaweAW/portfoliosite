import type { MonthYear } from "../types"

const formatters = new Map<string, Intl.DateTimeFormat>()

const getFormatter = (locale: string): Intl.DateTimeFormat => {
  let formatter = formatters.get(locale)
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(locale, { month: "short", year: "numeric" })
    formatters.set(locale, formatter)
  }
  return formatter
}

/**
 * "Jul 2023" / "lug 2023" / "июл 2023": short month plus year in the given
 * locale, without the extra literals some locales add (trailing dots, "г.").
 */
export const formatMonthYear = (locale: string, { year, month }: MonthYear): string =>
  getFormatter(locale)
    .formatToParts(new Date(year, month - 1, 1))
    .filter((part) => part.type === "month" || part.type === "year")
    .map((part) => part.value.replace(/\.$/, ""))
    .join(" ")

/** Machine-readable value for <time dateTime>, e.g. "2023-07". */
export const toDateTime = ({ year, month }: MonthYear): string =>
  `${year}-${String(month).padStart(2, "0")}`
