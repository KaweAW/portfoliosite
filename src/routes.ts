export const VIEW_IDS = ["home", "resume", "projects", "contact"] as const

export type ViewId = (typeof VIEW_IDS)[number]

const PATHS: Record<ViewId, string> = {
  home: "/",
  resume: "/resume",
  projects: "/projects",
  contact: "/contact",
}

/** URL path of a view. */
export const hrefFor = (view: ViewId): string => PATHS[view]

/** URL path of a project's case study page. */
export const projectHref = (slug: string): string => `${PATHS.projects}/${slug}`

export interface ParsedRoute {
  view: ViewId
  /** Set on `/projects/<slug>`. Not checked against real projects here. */
  projectSlug: string | null
}

const stripSlashes = (path: string) => path.replace(/^\/+|\/+$/g, "")

/** Turns a URL path into a route. Anything unknown falls back to home. */
export const parseRoute = (pathname: string): ParsedRoute => {
  const [first = "", second, ...rest] = stripSlashes(pathname).split("/")
  // The Resume page replaced the old Timeline page.
  if (first === "timeline" && !second) return { view: "resume", projectSlug: null }
  const view = VIEW_IDS.find((id) => stripSlashes(PATHS[id]) === first)
  if (!view) return { view: "home", projectSlug: null }
  if (view === "projects" && second && rest.length === 0) return { view, projectSlug: second }
  return { view: second ? "home" : view, projectSlug: null }
}

/**
 * Old links used the URL hash (`/#/projects`). Maps one to its path, or null
 * when the hash is not one of those.
 */
export const legacyHashToPath = (hash: string): string | null => {
  if (!hash.startsWith("#/")) return null
  const { view } = parseRoute(hash.slice(1))
  return PATHS[view]
}
