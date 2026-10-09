import { motion } from "framer-motion"
import { itemVariants } from "../../animations"
import { caseStudyFor } from "../../data/caseStudies"
import { hrefFor } from "../../routes"
import { useLayout } from "../../hooks/useLayout"
import { Link } from "../ui/Link"
import { PageShell } from "../ui/PageShell"

const SectionTitle = ({ children }: { children: string }) => (
  <motion.h2 variants={itemVariants} className="mb-2 text-[10px] tracking-widest opacity-50 md:mb-3 md:text-xs">
    [{children}]
  </motion.h2>
)

/** Case study page of one project: what it is, the problem, the solution, the stack and the links. */
export const ProjectDetailView = () => {
  const { project, language, t } = useLayout()
  if (!project) return null

  const copy = t.projects.items[project.id]
  const study = caseStudyFor(project.id, language)
  const labels = t.projectPage

  return (
    <PageShell className="pt-16 md:pt-24">
      <motion.div variants={itemVariants} className="mb-4 md:mb-6">
        <Link
          href={hrefFor("projects")}
          className="text-[10px] tracking-widest text-neutral-400 transition-colors hover:text-white md:text-xs"
        >
          ← {labels.back}
        </Link>
      </motion.div>

      <div className="scrollbar-none flex-1 overflow-y-auto pr-2 pb-4 md:pr-4">
        <motion.header variants={itemVariants} className="mb-6 border-b border-white/20 pb-4 md:mb-8">
          <p className="mb-2 text-[10px] tracking-widest text-neutral-500 md:text-xs">{labels.caseStudy}</p>
          <motion.h1 layoutId={`project-title-${project.id}`} className="text-4xl font-bold tracking-tighter md:text-7xl">
            {copy.title}
          </motion.h1>
          <p className="mt-3 max-w-2xl text-xs text-neutral-400 normal-case md:text-sm">{copy.desc}</p>
        </motion.header>

        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          <div className="flex flex-1 flex-col gap-6 normal-case md:gap-8">
            <section>
              <SectionTitle>{labels.challenge}</SectionTitle>
              <motion.p variants={itemVariants} className="text-sm leading-relaxed tracking-normal md:text-base">
                {study.challenge}
              </motion.p>
            </section>

            <section>
              <SectionTitle>{labels.solution}</SectionTitle>
              <motion.p variants={itemVariants} className="text-sm leading-relaxed tracking-normal md:text-base">
                {study.solution}
              </motion.p>
            </section>

            <section>
              <SectionTitle>{labels.highlights}</SectionTitle>
              <ul className="flex flex-col gap-3">
                {study.highlights.map((highlight) => (
                  <motion.li
                    key={highlight}
                    variants={itemVariants}
                    className="border-l border-white/30 pl-3 text-sm leading-relaxed tracking-normal md:text-base"
                  >
                    {highlight}
                  </motion.li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="flex flex-1 flex-col gap-6 md:max-w-sm md:gap-8">
            <section className="normal-case">
              <SectionTitle>{labels.role}</SectionTitle>
              <motion.p variants={itemVariants} className="text-sm tracking-normal md:text-base">
                {study.role}
              </motion.p>
            </section>

            {project.stack.length > 0 && (
              <section>
                <SectionTitle>{labels.stack}</SectionTitle>
                <ul className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <motion.li
                      key={tech}
                      variants={itemVariants}
                      className="border border-white/30 px-2 py-1 text-[10px] tracking-widest md:text-xs"
                    >
                      {tech}
                    </motion.li>
                  ))}
                </ul>
              </section>
            )}

            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between border border-white p-4 text-lg font-bold tracking-tighter transition-colors active:bg-white active:text-black md:text-2xl md:hover:bg-white md:hover:text-black"
              >
                <span>{labels.liveSite}</span>
                <span aria-hidden="true">↗</span>
                <span className="sr-only">{t.a11y.opensInNewTab}</span>
              </a>
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between border border-white/30 p-3 text-xs tracking-widest text-neutral-300 transition-colors active:bg-white active:text-black md:hover:bg-white md:hover:text-black"
                >
                  <span>{labels.repository}</span>
                  <span aria-hidden="true">↗</span>
                  <span className="sr-only">{t.a11y.opensInNewTab}</span>
                </a>
              )}
            </motion.div>
          </aside>
        </div>
      </div>
    </PageShell>
  )
}
