import { useLayout } from "../../hooks/useLayout"

/** Purely decorative "terminal" detail, hidden from assistive tech and on mobile. Left out of the contact and resume pages, which need the space. */
export const StatusBadge = () => {
  const { view } = useLayout()
  if (view === "contact" || view === "resume") return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-8 bottom-24 z-20 hidden text-right text-xs tracking-widest text-invert opacity-50 mix-blend-difference md:bottom-8 md:block"
    >
      [ SYSTEM ONLINE ]
      <br />
      LAT: 45.66 / LON: 11.93
    </div>
  )
}
