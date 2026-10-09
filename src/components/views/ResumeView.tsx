import { useState } from "react"
import { CONTACT } from "../../data/contact"
import { localeFor } from "../../data/languages"
import { EDUCATION, EXPERIENCE, RESUME_PROJECTS, SKILLS, SKILL_GROUP_IDS } from "../../data/resume"
import { RESUME_COPY } from "../../data/resumeCopy"
import { PROJECTS } from "../../data/projects"
import { useLayout } from "../../hooks/useLayout"
import { formatMonthYear, toDateTime } from "../../lib/formatDate"
import { cn } from "../../lib/cn"
import { projectHref } from "../../routes"
import type { MonthYear } from "../../types"
import { Bullets, ResumeSection, Tags } from "../resume/ResumeSection"
import { HireButton } from "../resume/HireButton"
import { ResumeHero } from "../resume/ResumeHero"
import { Link } from "../ui/Link"
import { PageShell } from "../ui/PageShell"
import { motion } from "framer-motion"
import { itemVariants } from "../../animations"

const monthsBetween = (from: MonthYear, to: Date) => (to.getFullYear() - from.year) * 12 + (to.getMonth() + 1 - from.month)

const plural = (n: number, [one, many]: readonly [string, string]) => `${n} ${n === 1 ? one : many}`

/** "1 yr 4 mos": how long a job that is still going has lasted. */
const lengthLabel = (start: MonthYear, now: Date, years: readonly [string, string], months: readonly [string, string]) => {
  const total = Math.max(1, monthsBetween(start, now))
  const y = Math.floor(total / 12)
  const m = total % 12
  return [y > 0 && plural(y, years), m > 0 && plural(m, months)].filter(Boolean).join(" ")
}

const linkClass =
  "inline-flex items-center gap-1 border-b border-white/30 pb-0.5 text-[10px] tracking-widest transition-colors hover:border-white md:text-xs"

export const ResumeView = () => {
  const { language } = useLayout()
  const copy = RESUME_COPY[language]
  const locale = localeFor(language)
  // Read once, so the length of the current job does not change between renders.
  const [now] = useState(() => new Date())

  const range = (start: MonthYear, end?: MonthYear, ongoing = true) => (
    <p className="text-[10px] tracking-widest text-neutral-500 md:text-xs">
      <time dateTime={toDateTime(start)}>{formatMonthYear(locale, start)}</time>
      {(end || ongoing) && " – "}
      {end ? <time dateTime={toDateTime(end)}>{formatMonthYear(locale, end)}</time> : ongoing && copy.experience.present}
    </p>
  )

  return (
    <PageShell className="pt-16 md:pt-24">
      <div className="scrollbar-none flex-1 overflow-y-auto px-1 pb-24 md:px-0 md:pb-8">
        <ResumeHero />

        <ResumeSection id="experience" copy={copy.experience}>
          <ol className="flex flex-col gap-10">
            {EXPERIENCE.map((job) => {
              const text = copy.experience.items[job.id]
              return (
                <li key={job.id} className="relative border-l border-white/20 pl-5 md:pl-6">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-1 -left-[5px] h-2.5 w-2.5 rounded-full",
                      job.end ? "bg-neutral-500" : "bg-ok shadow-[0_0_10px_var(--color-ok)]",
                    )}
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-lg font-bold tracking-tighter md:text-xl">{text.role}</h3>
                    {range(job.start, job.end)}
                  </div>
                  <p className="mt-1 text-xs tracking-normal text-neutral-300 normal-case md:text-sm">
                    {text.company} · {text.place}
                    {!job.end && ` · ${lengthLabel(job.start, now, copy.experience.years, copy.experience.months)}`}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed tracking-normal text-neutral-400 normal-case md:text-sm">
                    {text.summary}
                  </p>
                  <div className="mt-4">
                    <Bullets items={text.bullets} />
                  </div>
                  <div className="mt-4">
                    <Tags items={job.stack} />
                  </div>
                </li>
              )
            })}
          </ol>
        </ResumeSection>

        <ResumeSection id="projects" copy={copy.projects}>
          <ul className="flex flex-col gap-4">
            {RESUME_PROJECTS.map((item) => {
              const text = copy.projects.items[item.id]
              const project = PROJECTS.find((p) => p.id === item.projectId)
              const code = item.code ?? project?.repo
              return (
                <li key={item.id} className="border border-white/20 p-4 transition-colors hover:border-white/50 md:p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-lg font-bold tracking-tighter md:text-xl">{text.title}</h3>
                    {range(item.start, item.end, item.ongoing)}
                  </div>
                  <p className="mt-1 text-[10px] tracking-widest text-neutral-400 md:text-xs">{text.kind}</p>
                  <div className="mt-4">
                    <Bullets items={text.bullets} />
                  </div>
                  <div className="mt-4">
                    <Tags items={item.stack} />
                  </div>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                    {project && (
                      <Link href={projectHref(project.slug)} className={linkClass}>
                        {copy.projects.caseStudy} →
                      </Link>
                    )}
                    {project && (
                      <a href={project.url} target="_blank" rel="noreferrer" className={linkClass}>
                        {copy.projects.live} ↗
                      </a>
                    )}
                    {code && (
                      <a href={code} target="_blank" rel="noreferrer" className={linkClass}>
                        {copy.projects.code} ↗
                      </a>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </ResumeSection>

        <ResumeSection id="education" copy={copy.education}>
          <ol className="flex flex-col gap-6">
            {EDUCATION.map((item) => {
              const text = copy.education.items[item.id]
              return (
                <li key={item.id} className="border-l border-white/20 pl-5 md:pl-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-base font-bold tracking-tighter md:text-lg">{text.title}</h3>
                    {range(item.start, item.end)}
                  </div>
                  <p className="mt-1 text-xs tracking-normal text-neutral-300 normal-case md:text-sm">{text.school}</p>
                  <p className="mt-2 text-xs leading-relaxed tracking-normal text-neutral-400 normal-case md:text-sm">
                    {text.desc}
                  </p>
                </li>
              )
            })}
          </ol>
        </ResumeSection>

        <ResumeSection id="tools" copy={copy.tools}>
          <div className="flex flex-col gap-6">
            {SKILL_GROUP_IDS.map((group) => (
              <div key={group}>
                <h3 className="mb-3 text-[10px] tracking-widest text-neutral-500 md:text-xs">{copy.tools.groups[group]}</h3>
                <ul className="flex flex-wrap gap-2">
                  {SKILLS[group].map((skill) => (
                    <li
                      key={skill.name}
                      className={cn(
                        "flex items-center gap-2 border px-2 py-1 text-[10px] tracking-widest md:text-xs",
                        skill.primary ? "border-white/50 text-white" : "border-white/20 text-neutral-400",
                      )}
                    >
                      {skill.primary && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ok" />}
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="mb-3 text-[10px] tracking-widest text-neutral-500 md:text-xs">{copy.tools.methods}</h3>
              <Tags items={copy.tools.methodItems} />
            </div>
          </div>
        </ResumeSection>

        <ResumeSection id="languages" copy={copy.languages}>
          <ul className="grid grid-cols-2 gap-px border border-white/20 bg-white/20 md:grid-cols-3">
            {copy.languages.items.map((item) => (
              <li key={item.name} className="flex flex-col gap-1 bg-black p-4">
                <span className="text-sm font-bold tracking-tighter md:text-base">{item.name}</span>
                <span className="text-[10px] tracking-widest text-neutral-400 md:text-xs">{item.level}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs tracking-normal text-neutral-400 normal-case md:text-sm">{copy.languages.availability}</p>
        </ResumeSection>

        <motion.section variants={itemVariants} className="border-t border-white/20 pt-8 md:pt-12">
          <p className="mb-2 text-[10px] tracking-widest text-neutral-500 md:text-xs">◆ {copy.cta.eyebrow}</p>
          <h2 className="text-3xl leading-none font-bold tracking-tighter md:text-6xl">{copy.cta.title}</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <HireButton>{copy.cta.talk}</HireButton>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-2 border border-white/30 px-4 py-3 text-[10px] font-bold tracking-widest transition-colors hover:border-white md:text-xs"
            >
              {copy.cta.email}
            </a>
          </div>
        </motion.section>
      </div>
    </PageShell>
  )
}
