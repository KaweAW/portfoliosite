import { useCallback, useRef, useState, type RefObject } from "react"
import { motion } from "framer-motion"
import { itemVariants } from "../../animations"
import { localeFor } from "../../data/languages"
import { TIMELINE } from "../../data/timeline"
import { useLayout } from "../../hooks/useLayout"
import { usePreviewActions } from "../../hooks/usePreview"
import { formatMonthYear, toDateTime } from "../../lib/formatDate"
import type { TimelineEntry } from "../../types"
import { TimelineAxis } from "../timeline/TimelineAxis"
import { PageHeader, PageShell } from "../ui/PageShell"
import { ParallaxImage } from "../ui/ParallaxImage"
import { ScrambleText } from "../ui/ScrambleText"

interface TimelineRowProps {
  entry: TimelineEntry
  scrollRef: RefObject<HTMLDivElement | null>
  /** Called when the mouse or keyboard focus reaches the row, so the overview axis can follow. */
  onActivate: () => void
}

const TimelineRow = ({ entry, scrollRef, onActivate }: TimelineRowProps) => {
  const { t, language } = useLayout()
  const { show, hide } = usePreviewActions()
  const copy = t.timeline.items[entry.id]

  const start = formatMonthYear(localeFor(language), entry.start)
  const dateLabel = entry.ongoing ? `${start} - ${t.timeline.ongoing}` : start

  return (
    <motion.li
      variants={itemVariants}
      data-entry=""
      onMouseEnter={() => {
        show(entry.image)
        onActivate()
      }}
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
  const [active, setActive] = useState(0)

  const rows = () => Array.from(scrollRef.current?.querySelectorAll<HTMLElement>("[data-entry]") ?? [])

  // The active entry is the last one whose top has passed about a third of the way down the list.
  const onScroll = useCallback(() => {
    const container = scrollRef.current
    if (!container) return
    const line = container.scrollTop + container.clientHeight * 0.35
    const list = rows()
    let index = 0
    list.forEach((row, i) => {
      if (row.offsetTop <= line) index = i
    })
    // At the very bottom the last entries cannot reach the line, so jump to the end.
    if (container.scrollTop + container.clientHeight >= container.scrollHeight - 2) index = list.length - 1
    setActive(index)
  }, [])

  const jumpTo = (index: number) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    rows()[index]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
  }

  return (
    <PageShell className="pt-16 md:pt-24">
      <PageHeader title={t.timeline.title} />
      <TimelineAxis entries={TIMELINE} active={active} onSelect={jumpTo} />

      <div ref={scrollRef} onScroll={onScroll} className="scrollbar-none flex-1 overflow-y-auto pb-4 md:pb-0">
        <ol>
          {TIMELINE.map((entry, index) => (
            <TimelineRow key={entry.id} entry={entry} scrollRef={scrollRef} onActivate={() => setActive(index)} />
          ))}
        </ol>
      </div>
    </PageShell>
  )
}
