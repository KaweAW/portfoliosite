import { useCallback, useSyncExternalStore } from "react"

/** Matches Tailwind's default `md` breakpoint (768px) from below. */
export const MOBILE_QUERY = "(max-width: 767px)"

export const useMediaQuery = (query: string): boolean => {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query)
      list.addEventListener("change", onChange)
      return () => list.removeEventListener("change", onChange)
    },
    [query],
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export const useIsMobile = (): boolean => useMediaQuery(MOBILE_QUERY)
