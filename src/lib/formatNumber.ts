/** Whole euros in the visitor's language: "€2,000" in English, "2.000 €" in Italian and German. */
export const formatEuro = (locale: string, value: number): string =>
  new Intl.NumberFormat(locale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value)
