import type { Language } from "../types"

export const CONTACT = {
  email: "kawe.longon@gmail.com",
  github: "https://github.com/KaweAW",
  githubDisplay: "github.com/KaweAW",
  linkedin: "https://www.linkedin.com/in/kawe-longon-810b94248/",
  linkedinDisplay: "linkedin.com/in/kawe-longon",
} as const

/**
 * Availability shown on the contact page. Set to `false` when you are
 * fully booked: the badge turns grey and says so.
 */
export const AVAILABLE_FOR_WORK = true

const ITALIAN_RESUME = "cv_kawe_longon.pdf"
const ENGLISH_RESUME = "resume-kawe-longon.pdf"

/** Resume PDF offered for each language (files live in `public/`). */
export const RESUME_FILES: Record<Language, string> = {
  IT: ITALIAN_RESUME,
  EN: ENGLISH_RESUME,
  FR: ENGLISH_RESUME,
  DE: ENGLISH_RESUME,
  RU: ENGLISH_RESUME,
}
