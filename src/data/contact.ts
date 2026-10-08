import type { Language } from "../types"

export const CONTACT = {
  /** Digits only, used for tel: links. */
  phone: "+393780639622",
  phoneDisplay: "+39 378 0639 622",
  email: "kawe.longon@gmail.com",
  whatsapp: "https://wa.me/393780639622",
} as const

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
