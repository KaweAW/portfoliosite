import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { itemVariants } from "../../animations"
import type { ResumeSectionCopy } from "../../types"

interface ResumeSectionProps {
  id: string
  copy: ResumeSectionCopy
  children: ReactNode
}

/** Section of the Resume page: a label column on the left, the content on the right. */
export const ResumeSection = ({ id, copy, children }: ResumeSectionProps) => (
  <motion.section
    variants={itemVariants}
    aria-labelledby={`${id}-title`}
    className="grid grid-cols-1 gap-6 border-t border-white/20 py-8 md:grid-cols-12 md:gap-10 md:py-12"
  >
    <header className="sticky top-0 z-10 -mx-1 -mt-8 border-b border-white/10 bg-black px-1 py-3 md:static md:z-auto md:m-0 md:border-0 md:bg-transparent md:p-0 md:col-span-4">
      <div className="md:sticky md:top-0">
        <p className="mb-2 text-[10px] tracking-widest text-neutral-500 md:text-xs">◆ {copy.eyebrow}</p>
        <h2 id={`${id}-title`} className="text-2xl leading-none font-bold tracking-tighter md:text-4xl">
          {copy.title}
        </h2>
        {copy.sub && (
          <p className="mt-3 hidden text-xs tracking-normal text-neutral-400 normal-case md:block md:text-sm">{copy.sub}</p>
        )}
      </div>
    </header>
    <div className="md:col-span-8">{children}</div>
  </motion.section>
)

/** Row of small bordered tags (technologies). */
export const Tags = ({ items }: { items: readonly string[] }) => (
  <ul className="flex flex-wrap gap-2">
    {items.map((item) => (
      <li key={item} className="border border-white/20 px-2 py-1 text-[10px] tracking-widest text-neutral-300 md:text-xs">
        {item}
      </li>
    ))}
  </ul>
)

export const Bullets = ({ items }: { items: readonly string[] }) => (
  <ul className="flex flex-col gap-2">
    {items.map((item) => (
      <li key={item} className="flex gap-3 text-xs leading-relaxed tracking-normal text-neutral-400 normal-case md:text-sm">
        <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 shrink-0 bg-neutral-500" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
)
