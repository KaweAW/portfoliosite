import { AVAILABLE_FOR_WORK } from "../../data/contact"
import { useLayout } from "../../hooks/useLayout"
import { cn } from "../../lib/cn"

/** Small status pill: green and pulsing when available for work, grey otherwise. Edit `AVAILABLE_FOR_WORK` to change it. */
export const AvailabilityBadge = () => {
  const { t } = useLayout()
  const label = AVAILABLE_FOR_WORK ? t.contact.availability.open : t.contact.availability.closed

  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 border px-3 py-1.5 text-[10px] tracking-widest md:text-xs",
        AVAILABLE_FOR_WORK ? "border-ok/60 text-ok" : "border-white/30 text-neutral-400",
      )}
    >
      <span aria-hidden="true" className="relative flex h-2 w-2">
        {AVAILABLE_FOR_WORK && (
          <span className="absolute inline-flex h-full w-full rounded-full bg-ok opacity-60 motion-safe:animate-ping" />
        )}
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", AVAILABLE_FOR_WORK ? "bg-ok" : "bg-neutral-500")} />
      </span>
      {label}
    </p>
  )
}
