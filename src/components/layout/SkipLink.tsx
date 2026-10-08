import type { MouseEvent } from "react"
import { MAIN_ID } from "../../data/site"
import { useLayout } from "../../hooks/useLayout"

export const SkipLink = () => {
  const { t } = useLayout()

  // The URL hash is used for routing, so move focus by hand instead of following the anchor.
  const skip = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    document.getElementById(MAIN_ID)?.focus()
  }

  return (
    <a
      href={`#${MAIN_ID}`}
      onClick={skip}
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-10000 focus:bg-white focus:p-2 focus:text-xs focus:text-black"
    >
      {t.a11y.skipToContent}
    </a>
  )
}
