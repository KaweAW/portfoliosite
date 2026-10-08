/** Purely decorative "terminal" detail, hidden from assistive tech and on mobile. */
export const StatusBadge = () => (
  <div
    aria-hidden="true"
    className="absolute right-8 bottom-24 z-20 hidden text-right text-xs tracking-widest opacity-50 mix-blend-difference md:bottom-8 md:block"
  >
    [ SYSTEM ONLINE ]
    <br />
    LAT: 45.66 / LON: 11.93
  </div>
)
