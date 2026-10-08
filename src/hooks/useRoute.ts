import { useMemo, useSyncExternalStore } from "react"
import { PROJECTS } from "../data/projects"
import { getPathname, subscribeToLocation } from "../lib/navigation"
import { parseRoute, type ViewId } from "../routes"
import type { Project } from "../types"

export interface Route {
  view: ViewId
  /** The project shown on a case study page, otherwise null. */
  project: Project | null
}

const getServerSnapshot = () => "/"

/** Current page, derived from the URL. Back/forward and deep links just work. */
export const useRoute = (): Route => {
  const pathname = useSyncExternalStore(subscribeToLocation, getPathname, getServerSnapshot)

  return useMemo(() => {
    const { view, projectSlug } = parseRoute(pathname)
    const project = projectSlug ? PROJECTS.find((p) => p.slug === projectSlug) : undefined
    // `/projects/unknown` shows the projects list.
    return { view, project: project ?? null }
  }, [pathname])
}
