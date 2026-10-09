import type { EducationId, ExperienceId, MonthYear, ProjectId, ResumeProjectId, SkillGroupId } from "../types"

/**
 * Facts of the resume that do not change between languages. The words
 * (roles, descriptions, bullet points) live in `resumeCopy.ts`.
 */

export interface ResumeExperience {
  id: ExperienceId
  start: MonthYear
  /** Missing while the job is ongoing. */
  end?: MonthYear
  /** Still in development: shows "– today" instead of only the start date. */
  ongoing?: true
  stack: readonly string[]
}

export const EXPERIENCE: readonly ResumeExperience[] = [
  {
    id: "stiga",
    start: { year: 2025, month: 6 },
    stack: ["React", "TypeScript", "Flutter", "Dart", "REST APIs", "Jira", "Git"],
  },
]

export interface ResumeProject {
  id: ResumeProjectId
  /** The project of the Work section that has a case study page, when there is one. */
  projectId?: ProjectId
  start: MonthYear
  end?: MonthYear
  /** Still in development: shows "– today" instead of only the start date. */
  ongoing?: true
  stack: readonly string[]
  /** Public source code, for the projects that are not in the Work section. */
  code?: string
}

export const RESUME_PROJECTS: readonly ResumeProject[] = [
  { id: "scaletta", projectId: "scaletta", start: { year: 2026, month: 10 }, ongoing: true, stack: ["React", "TypeScript", "Dexie", "Supabase"] },
  { id: "templateZero", projectId: "templateZero", start: { year: 2026, month: 10 }, stack: ["Next.js 15", "TypeScript", "Tailwind 4"] },
  {
    id: "medical",
    projectId: "medical",
    start: { year: 2025, month: 2 },
    end: { year: 2025, month: 8 },
    stack: ["Next.js", "Tailwind CSS", "Radix UI"],
  },
  { id: "storyboard", projectId: "storyboard", start: { year: 2025, month: 9 }, stack: ["Next.js", "Tailwind CSS", "Radix UI"] },
  {
    id: "shoes",
    start: { year: 2026, month: 7 },
    stack: ["React", "TypeScript", "SASS Modules", "Vite"],
    code: "https://github.com/KaweAW/on-running-challenge",
  },
]

export interface ResumeEducation {
  id: EducationId
  start: MonthYear
  end: MonthYear
}

export const EDUCATION: readonly ResumeEducation[] = [
  { id: "its", start: { year: 2024, month: 9 }, end: { year: 2026, month: 7 } },
  { id: "liceo", start: { year: 2018, month: 9 }, end: { year: 2023, month: 7 } },
]

export interface Skill {
  name: string
  /** Marked with a dot: the tools used most. */
  primary?: boolean
}

export const SKILLS: Record<SkillGroupId, readonly Skill[]> = {
  frontend: [
    { name: "React", primary: true },
    { name: "Next.js (App Router)", primary: true },
    { name: "TypeScript", primary: true },
    { name: "Tailwind CSS", primary: true },
    { name: "JavaScript (ES6+)" },
    { name: "Radix UI / shadcn/ui" },
    { name: "Framer Motion" },
    { name: "SASS" },
    { name: "Zustand" },
    { name: "PWA / Workbox" },
    { name: "i18n (next-intl)" },
  ],
  backend: [
    { name: "PostgreSQL (row-level security)", primary: true },
    { name: "Supabase", primary: true },
    { name: "Node.js" },
    { name: "IndexedDB (Dexie)" },
    { name: "Zod" },
    { name: "REST APIs" },
    { name: "Server Actions" },
    { name: "C#" },
  ],
  mobile: [
    { name: "Flutter", primary: true },
    { name: "Dart", primary: true },
  ],
  quality: [
    { name: "Vitest", primary: true },
    { name: "Playwright", primary: true },
    { name: "Git", primary: true },
    { name: "GitHub Actions (CI)" },
    { name: "Lighthouse / Core Web Vitals" },
    { name: "Jira" },
    { name: "Vercel" },
    { name: "Netlify" },
  ],
}

export const SKILL_GROUP_IDS = ["frontend", "backend", "mobile", "quality"] as const satisfies readonly SkillGroupId[]
