import { legacyHashToPath } from "../routes"

const NAVIGATE_EVENT = "kl:navigate"

/** Moves to another page of the site without reloading it. */
export const navigate = (to: string, { replace = false }: { replace?: boolean } = {}) => {
  if (to === window.location.pathname) return
  window.history[replace ? "replaceState" : "pushState"](null, "", to)
  window.dispatchEvent(new Event(NAVIGATE_EVENT))
}

export const subscribeToLocation = (onChange: () => void) => {
  window.addEventListener("popstate", onChange)
  window.addEventListener(NAVIGATE_EVENT, onChange)
  return () => {
    window.removeEventListener("popstate", onChange)
    window.removeEventListener(NAVIGATE_EVENT, onChange)
  }
}

export const getPathname = () => window.location.pathname

/** Rewrites an old `/#/projects` address to `/projects` before the app starts. */
export const migrateLegacyHash = () => {
  const path = legacyHashToPath(window.location.hash)
  if (path) window.history.replaceState(null, "", path)
}
