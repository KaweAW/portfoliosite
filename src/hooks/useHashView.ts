import { useSyncExternalStore } from "react"
import { parseView, type ViewId } from "../routes"

const subscribe = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange)
  return () => window.removeEventListener("hashchange", onChange)
}

const getSnapshot = () => window.location.hash
const getServerSnapshot = () => ""

/** Current view, derived from the URL hash. Back/forward and deep links just work. */
export const useHashView = (): ViewId =>
  parseView(useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot))
