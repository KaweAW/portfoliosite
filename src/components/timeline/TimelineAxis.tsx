import { motion } from "framer-motion"
import { localeFor } from "../../data/languages"
import { useLayout } from "../../hooks/useLayout"
import { formatMonthYear } from "../../lib/formatDate"
import { cn } from "../../lib/cn"
import type { MonthYear, TimelineEntry } from "../../types"

const monthIndex = ({ year, month }: MonthYear) => year * 12 + (month - 1)

interface TimelineAxisProps {
  entries: readonly TimelineEntry[]
  /** Entry currently at the top of the list. */
  active: number
  onSelect: (index: number) => void
}

/**
 * Overview of the whole timeline: entries sit on a line at their real date,
 * so long and short gaps are visible. The filled part and the marker follow
 * the list as it scrolls, and each dot jumps to its entry.
 */
export const TimelineAxis = ({ entries, active, onSelect }: TimelineAxisProps) => {
  const { t, language } = useLayout()
  const first = monthIndex(entries[0]!.start)
  const last = monthIndex(entries[entries.length - 1]!.start)
  const span = Math.max(1, last - first)
  const position = (value: MonthYear) => ((monthIndex(value) - first) / span) * 100

  const years: number[] = []
  for (let year = entries[0]!.start.year + 1; year <= entries[entries.length - 1]!.start.year; year++) years.push(year)

  const current = entries[active]!
  const currentPosition = position(current.start)
  const activeCopy = t.timeline.items[current.id]
  const label = `${formatMonthYear(localeFor(language), current.start)} · ${activeCopy.title}`

  return (
    <div role="group" aria-label={t.timeline.axis} className="mb-4 px-2 md:mb-6 md:px-0">
      {/* Title of the entry at the top of the list. It follows the marker but never leaves the line. */}
      <div className="relative h-4 text-[10px] tracking-widest text-neutral-300 md:text-xs" aria-hidden="true">
        <motion.span
          animate={{ left: `${currentPosition}%` }}
          transition={{ type: "spring", stiffness: 260, damping: 32 }}
          className={cn(
            "absolute top-0 whitespace-nowrap",
            currentPosition > 55 ? "-translate-x-full" : "-translate-x-0",
          )}
        >
          {label}
        </motion.span>
      </div>

      <div className="relative mx-1.5 mt-2 h-6">
        <div className="absolute top-1/2 right-0 left-0 h-px -translate-y-1/2 bg-white/20" />
        <motion.div
          aria-hidden="true"
          animate={{ width: `${currentPosition}%` }}
          transition={{ type: "spring", stiffness: 260, damping: 32 }}
          className="absolute top-1/2 left-0 h-px -translate-y-1/2 bg-white"
        />

        {years.map((year) => (
          <span
            key={year}
            aria-hidden="true"
            style={{ left: `${position({ year, month: 1 })}%` }}
            className="absolute top-full mt-0.5 -translate-x-1/2 text-[9px] tracking-widest text-neutral-500"
          >
            {year}
          </span>
        ))}

        {entries.map((entry, index) => {
          const reached = index <= active
          return (
            <button
              key={entry.id}
              type="button"
              onClick={() => onSelect(index)}
              aria-label={`${formatMonthYear(localeFor(language), entry.start)}: ${t.timeline.items[entry.id].title}`}
              aria-current={index === active ? "true" : undefined}
              style={{ left: `${position(entry.start)}%` }}
              data-cursor="JUMP"
              className="absolute top-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "block h-2 w-2 border transition-all duration-300",
                  reached ? "border-white bg-white" : "border-white/40 bg-black",
                  index === active && "scale-150",
                  entry.ongoing && index !== active && "motion-safe:animate-pulse",
                )}
              />
            </button>
          )
        })}
      </div>
      <div className="h-3" />
    </div>
  )
}
