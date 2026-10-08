import { useRef, type RefObject } from "react"
import { motion } from "framer-motion"
import { itemVariants } from "../../animations"
import { localeFor } from "../../data/languages"
import { TIMELINE } from "../../data/timeline"
import { useLayout } from "../../hooks/useLayout"
import { usePreviewActions } from "../../hooks/usePreview"
import { formatMonthYear, toDateTime } from "../../lib/formatDate"
import type { TimelineEntry } from "../../types"
import { PageHeader, PageShell } from "../ui/PageShell"
import { ParallaxImage } from "../ui/ParallaxImage"
import { ScrambleText } from "../ui/ScrambleText"

interface TimelineRowProps {
  entry: TimelineEntry
  scrollRef: RefObject<HTMLDivElement | null>
}

const TimelineRow = ({ entry, scrollRef }: TimelineRowProps) => {
  const { t, language } = useLayout()
  const { show, hide } = usePreviewActions()
  const copy = t.timeline.items[entry.id]

  const start = formatMonthYear(localeFor(language), entry.start)
  const dateLabel = entry.ongoing ? `${start} - ${t.timeline.ongoing}` : start

  return (
    <motion.li
      variants={itemVariants}
      onMouseEnter={() => show(entry.image)}
      onMouseLeave={hide}
      className="group flex flex-col border-b border-white/10 px-2 py-5 transition-colors active:bg-white/5 md:px-0 md:hover:bg-white/5"
    >
      <div className="grid w-full grid-cols-1 gap-1 md:grid-cols-12 md:gap-2">
        <div className="text-[10px] text-neutral-300 transition-colors group-hover:text-white md:col-span-3 md:text-xs md:text-neutral-500">
          <time
            dateTime={toDateTime(entry.start)}
            className="mb-1 inline-block bg-white/10 px-2 py-1 md:mb-0 md:bg-transparent md:p-0"
          >
            [{dateLabel}]
          </time>
        </div>
        <h2 className="text-base leading-tight font-bold tracking-tighter md:col-span-4 md:text-xl">
          <ScrambleText text={copy.title} />
        </h2>
        <p className="mt-1 text-[10px] text-neutral-400 normal-case group-hover:text-neutral-200 md:col-span-5 md:mt-0 md:text-xs">
          {copy.desc}
        </p>
      </div>

      <ParallaxImage src={entry.image} containerRef={scrollRef} />
    </motion.li>
  )
}

export const TimelineView = () => {
  const { t } = useLayout()
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <PageShell className="pt-16 md:pt-24">
      <PageHeader title={t.timeline.title} />

      <div ref={scrollRef} className="scrollbar-none flex-1 overflow-y-auto pb-4 md:pb-0">
        <ol>
          {TIMELINE.map((entry) => (
            <TimelineRow key={entry.id} entry={entry} scrollRef={scrollRef} />
          ))}
        </ol>
      </div>
    </PageShell>
  )
}
