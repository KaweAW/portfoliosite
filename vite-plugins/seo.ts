import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import type { Plugin, ResolvedConfig } from "vite"
import { CASE_STUDIES } from "../src/data/caseStudies"
import { CONTACT } from "../src/data/contact"
import { PROJECTS } from "../src/data/projects"
import { allPageSeo, type PageSeo } from "../src/data/seo"
import { OG_IMAGE, SITE_NAME, SITE_URL } from "../src/data/site"
import { TRANSLATIONS } from "../src/data/translations"
import { hrefFor, projectHref, VIEW_IDS } from "../src/routes"

const START = "<!--seo-->"
const END = "<!--/seo-->"

const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

const absolute = (path: string) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`)

/** Title, description, canonical link, Open Graph and Twitter tags, and structured data of one page. */
const headBlock = (page: PageSeo): string => {
  const title = escapeHtml(page.title)
  const description = escapeHtml(page.description)
  const url = absolute(page.path)
  const image = `${SITE_URL}${OG_IMAGE}`
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kawe Longon",
    jobTitle: "Frontend Developer",
    url: `${SITE_URL}/`,
    sameAs: [CONTACT.github, CONTACT.linkedin],
  }

  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="Kawe Longon, frontend developer" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<script type="application/ld+json">${JSON.stringify(person).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ")
}

/**
 * Plain HTML for crawlers and visitors without JavaScript. It is hidden
 * visually (see `main.prerender` in index.html) so nobody sees it flash
 * before the app starts; React replaces it as soon as it loads.
 */
const fallbackBody = (page: PageSeo): string => {
  const en = TRANSLATIONS.EN
  const nav = VIEW_IDS.map(
    (view) => `<li><a href="${hrefFor(view)}">${escapeHtml(en.nav[view])}</a></li>`,
  ).join("")
  const project = PROJECTS.find((p) => projectHref(p.slug) === page.path)

  let content = `<p>${escapeHtml(page.description)}</p>`
  if (project) {
    const study = CASE_STUDIES[project.id].EN
    content =
      `<p>${escapeHtml(en.projects.items[project.id].desc)}</p>` +
      `<h2>${escapeHtml(en.projectPage.challenge)}</h2><p>${escapeHtml(study.challenge)}</p>` +
      `<h2>${escapeHtml(en.projectPage.solution)}</h2><p>${escapeHtml(study.solution)}</p>` +
      `<h2>${escapeHtml(en.projectPage.highlights)}</h2><ul>${study.highlights
        .map((h) => `<li>${escapeHtml(h)}</li>`)
        .join("")}</ul>` +
      `<p><a href="${project.url}">${escapeHtml(en.projectPage.liveSite)}</a></p>`
  } else if (page.path === hrefFor("projects")) {
    content += `<ul>${PROJECTS.map(
      (p) =>
        `<li><a href="${projectHref(p.slug)}">${escapeHtml(en.projects.items[p.id].title)}</a>: ${escapeHtml(
          en.projects.items[p.id].desc,
        )}</li>`,
    ).join("")}</ul>`
  }

  const heading = project ? en.projects.items[project.id].title : page.title.split(" | ")[0]
  return `<main class="prerender"><h1>${escapeHtml(heading ?? SITE_NAME)}</h1>${content}<nav><ul>${nav}</ul></nav></main>`
}

const sitemap = (pages: PageSeo[]) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map((page) => `  <url><loc>${absolute(page.path)}</loc></url>`)
    .join("\n")}\n</urlset>\n`

const robots = () => `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`

/**
 * Gives every page of the site its own HTML file with the right title,
 * description, canonical address and social preview, plus a sitemap and a
 * robots.txt. The app itself is still a single-page app.
 */
export const seoPlugin = (): Plugin => {
  let config: ResolvedConfig
  const pages = allPageSeo()
  const home = pages[0]!

  return {
    name: "kl-seo",
    configResolved(resolved) {
      config = resolved
    },
    transformIndexHtml: {
      order: "pre",
      handler: (html) => html.replace(START, `${START}\n    ${headBlock(home)}\n    ${END}`),
    },
    closeBundle() {
      if (config.command !== "build") return
      const outDir = resolve(config.root, config.build.outDir)
      const template = readFileSync(join(outDir, "index.html"), "utf8")
      const block = new RegExp(`${START}[\\s\\S]*?${END}`)

      for (const page of pages) {
        const html = template
          .replace(block, `${START}\n    ${headBlock(page)}\n    ${END}`)
          .replace('<div id="root"></div>', `<div id="root">${fallbackBody(page)}</div>`)
        const file = page.path === "/" ? "index.html" : join(page.path.slice(1), "index.html")
        mkdirSync(dirname(join(outDir, file)), { recursive: true })
        writeFileSync(join(outDir, file), html)
      }

      writeFileSync(join(outDir, "sitemap.xml"), sitemap(pages))
      writeFileSync(join(outDir, "robots.txt"), robots())
    },
  }
}
