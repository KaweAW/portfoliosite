import type { Project } from "../types"

/**
 * Projects shown on the Work page. Titles and descriptions live in
 * `translations.ts`, keyed by `id`, so adding a project means: extend
 * `ProjectId` in `types.ts`, add an entry here, add copy for every language.
 * TypeScript fails the build if a language is missing.
 */
export const PROJECTS: readonly Project[] = [
  {
    id: "medical",
    url: "https://www.dottmaicobattistello.it/",
    image: "/dottmaicobattistello.webp",
  },
  {
    id: "portal",
    url: "https://stiga-csp-prod.web.app/",
    image: "/portale-ssp.webp",
  },
  {
    id: "storyboard",
    url: "https://www.tommasotamburini.com/",
    image: "/storyboardartist.webp",
  },
]
