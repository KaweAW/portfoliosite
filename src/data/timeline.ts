import type { TimelineEntry } from "../types"

/**
 * Timeline entries, oldest first. Dates are stored as numbers and formatted
 * per language at render time (see `lib/formatDate.ts`); titles and
 * descriptions live in `translations.ts`, keyed by `id`.
 */
export const TIMELINE: readonly TimelineEntry[] = [
  { id: "liceo", start: { year: 2023, month: 7 }, image: "/portfoliopic1.webp" },
  { id: "julia", start: { year: 2023, month: 9 }, image: "/portfoliopic2.webp" },
  { id: "indonesia", start: { year: 2024, month: 2 }, image: "/portfoliopic3.webp" },
  { id: "itsStart", start: { year: 2024, month: 10 }, image: "/portfoliopic4.webp" },
  { id: "firstSite", start: { year: 2025, month: 3 }, image: "/portfoliopic6.webp" },
  {
    id: "stiga",
    start: { year: 2025, month: 6 },
    ongoing: true,
    image: "/stiga-experience.webp",
  },
  { id: "itsDiploma", start: { year: 2026, month: 6 }, image: "/ITSfinale.webp" },
]
