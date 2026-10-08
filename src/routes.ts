export const VIEW_IDS = ["home", "projects", "timeline", "contact"] as const

export type ViewId = (typeof VIEW_IDS)[number]

const HOME_HASH = "#/"

/** Hash used for each view. The app has no server routing, so views live in the URL hash. */
export const hrefFor = (view: ViewId): string =>
  view === "home" ? HOME_HASH : `#/${view}`

/** Turns `window.location.hash` into a view, falling back to home for anything unknown. */
export const parseView = (hash: string): ViewId => {
  const slug = hash.replace(/^#\/?/, "")
  return VIEW_IDS.find((id) => id === slug) ?? "home"
}
