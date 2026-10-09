import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from "./site"
import { PROJECTS } from "./projects"
import { TRANSLATIONS } from "./translations"
import { hrefFor, projectHref, VIEW_IDS } from "../routes"

export interface PageSeo {
  path: string
  title: string
  description: string
}

const VIEW_DESCRIPTIONS = {
  home: SITE_DESCRIPTION,
  projects:
    "Selected websites and web apps by Kawe Longon, frontend developer: a setlist app for bands, a restaurant website template, a medical practice website and more.",
  resume: "Resume of Kawe Longon, frontend developer: experience at STIGA, key projects, education, skills and a downloadable CV.",
  contact: "Contact Kawe Longon, frontend developer: a project brief form, email, GitHub and LinkedIn.",
} as const

/** Search and social metadata of every page of the site, in English. Used at build time. */
export const allPageSeo = (): PageSeo[] => {
  const en = TRANSLATIONS.EN
  const views = VIEW_IDS.map((view) => ({
    path: hrefFor(view),
    title: view === "home" ? SITE_TITLE : `${en.nav[view]} | ${SITE_NAME}`,
    description: VIEW_DESCRIPTIONS[view],
  }))
  const projects = PROJECTS.map((project) => {
    const copy = en.projects.items[project.id]
    return {
      path: projectHref(project.slug),
      title: `${copy.title} | ${SITE_NAME}`,
      description: copy.desc,
    }
  })
  return [...views, ...projects]
}
