import type { Project } from "../types"

/**
 * Projects shown on the Work page, in display order (the ID shown next to each
 * row is its position). Titles and descriptions live in `translations.ts`,
 * keyed by `id`, so adding a project means: extend `ProjectId` in `types.ts`,
 * add an entry here, add copy for every language. TypeScript fails the build
 * if a language is missing.
 *
 * Images: `image` is the desktop picture (hover preview, 5:3), `mobileImage` the
 * picture shown on small screens (3:2). Both are WebP composites of screenshots.
 */
export const PROJECTS: readonly Project[] = [
  {
    id: "scaletta",
    url: "https://test-scaletta.netlify.app/",
    image: { src: "/scaletta-desktop.webp", width: 1400, height: 840 },
    mobileImage: { src: "/scaletta-mobile.webp", width: 1200, height: 800 },
  },
  {
    id: "templateZero",
    url: "https://template-zero.vercel.app/",
    image: { src: "/template-zero-desktop.webp", width: 1400, height: 840 },
    mobileImage: { src: "/template-zero-mobile.webp", width: 1200, height: 800 },
  },
  {
    id: "medical",
    url: "https://www.dottmaicobattistello.it/",
    image: { src: "/medical-desktop.webp", width: 1400, height: 840 },
    mobileImage: { src: "/medical-mobile.webp", width: 1200, height: 800 },
  },
  {
    id: "portal",
    url: "https://stiga-csp-prod.web.app/",
    image: { src: "/portal-desktop.webp", width: 1400, height: 840 },
    mobileImage: { src: "/portal-mobile.webp", width: 1200, height: 800 },
  },
  {
    id: "storyboard",
    url: "https://www.tommasotamburini.com/",
    image: { src: "/storyboard-desktop.webp", width: 1400, height: 840 },
    mobileImage: { src: "/storyboard-mobile.webp", width: 1200, height: 800 },
  },
]
