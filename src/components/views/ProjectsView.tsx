import { useRef, type RefObject } from "react"
import { motion } from "framer-motion"
import { itemVariants } from "../../animations"
import { PROJECTS } from "../../data/projects"
import { useLayout } from "../../hooks/useLayout"
import { usePreviewActions } from "../../hooks/usePreview"
import type { Project } from "../../types"
import { PageHeader, PageShell } from "../ui/PageShell"
import { ScreenshotImage } from "../ui/ScreenshotImage"

interface ProjectRowProps {
  project: Project
  index: number
  scrollRef: RefObject<HTMLDivElement | null>
}

const ProjectRow = ({ project, index, scrollRef }: ProjectRowProps) => {
  const { t } = useLayout()
  const { show, hide } = usePreviewActions()
  const copy = t.projects.items[project.id]

  return (
    <motion.li variants={itemVariants}>
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => show(project.image.src)}
        onMouseLeave={hide}
        onFocus={() => show(project.image.src)}
        onBlur={hide}
        className="group relative flex flex-col justify-between border-b border-white/10 px-2 py-6 transition-colors duration-300 focus-visible:bg-white focus-visible:text-black active:bg-white active:text-black md:px-4 md:py-10 md:hover:bg-white md:hover:text-black"
      >
        <div className="relative z-10 flex w-full flex-col items-start justify-between md:flex-row md:items-center">
          <h2 className="mb-2 w-full text-2xl font-bold tracking-tighter md:mb-0 md:w-1/2 md:text-5xl">
            {copy.title}
          </h2>
          <div className="flex w-full flex-col items-start md:w-1/2 md:items-end">
            <span className="mb-1 text-[10px] opacity-50 md:text-xs">
              ID: {String(index + 1).padStart(2, "0")}
            </span>
            <span className="w-full text-left text-[10px] text-neutral-400 group-focus-visible:text-black group-active:text-black md:max-w-sm md:text-right md:text-xs md:group-hover:text-black">
              {copy.desc}
            </span>
          </div>
        </div>

        <ScreenshotImage image={project.mobileImage ?? project.image} containerRef={scrollRef} />
        <span className="sr-only">{t.a11y.opensInNewTab}</span>
      </a>
    </motion.li>
  )
}

export const ProjectsView = () => {
  const { t } = useLayout()
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <PageShell className="pt-16 md:pt-24">
      <PageHeader title={t.projects.title} aside={t.projects.dir} />

      <div ref={scrollRef} className="scrollbar-none flex-1 overflow-y-auto pr-2 pb-4 md:pr-4 md:pb-0">
        <ul className="flex flex-col border-t border-white/10">
          {PROJECTS.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} scrollRef={scrollRef} />
          ))}
        </ul>
      </div>
    </PageShell>
  )
}
