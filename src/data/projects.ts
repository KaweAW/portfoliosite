import type { Project } from "../types"

/**
 * Projects shown on the Work page, in display order (the ID shown next to each
 * row is its position). Titles and descriptions live in `translations.ts`,
 * keyed by `id`; the case study text lives in `caseStudies.ts`. Adding a
 * project means: extend `ProjectId` in `types.ts`, add an entry here, add copy
 * for every language and a case study. TypeScript fails the build if
 * something is missing.
 *
 * Images: `image` is the desktop picture (hover preview, 5:3), `mobileImage` the
 * picture shown on small screens (3:2). Both are WebP composites of screenshots.
 */
export const PROJECTS: readonly Project[] = [
  {
    id: "scaletta",
    slug: "scaletta",
    url: "https://test-scaletta.netlify.app/",
    repo: "https://github.com/KaweAW/setlistmaster",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Zustand", "Dexie", "Supabase", "PWA", "Vitest"],
    image: { src: "/scaletta-desktop.webp", width: 1400, height: 840 },
    mobileImage: { src: "/scaletta-mobile.webp", width: 1200, height: 800 },
  },
  {
    id: "templateZero",
    slug: "template-zero",
    url: "https://template-zero.vercel.app/",
    repo: "https://github.com/KaweAW/template-zero",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "next-intl", "React Hook Form", "Zod", "Resend", "Playwright"],
    image: { src: "/template-zero-desktop.webp", width: 1400, height: 840 },
    mobileImage: { src: "/template-zero-mobile.webp", width: 1200, height: 800 },
  },
  {
    id: "medical",
    slug: "medical-studio",
    url: "https://www.dottmaicobattistello.it/",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Radix UI", "Nodemailer", "Vercel"],
    image: { src: "/medical-desktop.webp", width: 1400, height: 840 },
    mobileImage: { src: "/medical-mobile.webp", width: 1200, height: 800 },
  },
  {
    id: "portal",
    slug: "internal-portal",
    url: "https://stiga-csp-prod.web.app/",
    stack: ["React", "TypeScript", "Vite", "Ant Design", "TanStack Query", "React Router", "Zod", "i18next", "Firebase", "Vitest"],
    image: { src: "/portal-desktop.webp", width: 1400, height: 840 },
    mobileImage: { src: "/portal-mobile.webp", width: 1200, height: 800 },
  },
  {
    id: "storyboard",
    slug: "storyboard-artist",
    url: "https://www.tommasotamburini.com/",
    repo: "https://github.com/KaweAW/tommasotamburini",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Vimeo", "Vercel"],
    image: { src: "/storyboard-desktop.webp", width: 1400, height: 840 },
    mobileImage: { src: "/storyboard-mobile.webp", width: 1200, height: 800 },
  },
]
