import { useEffect, useSyncExternalStore } from "react"
import { motion, useSpring } from "framer-motion"
import type { Pointer } from "../../hooks/usePointer"
import { useLayout } from "../../hooks/useLayout"
import { getCursorLabel, setHoverLabel, subscribeCursor } from "../../lib/cursor"

const FOLLOW_SPRING = { stiffness: 700, damping: 45, mass: 0.5 }
const FADE_SPRING = { stiffness: 120, damping: 20 }
const POP_SPRING = { type: "spring", stiffness: 500, damping: 28 } as const

/** Label for the element under the mouse: an explicit `data-cursor`, otherwise "OPEN" on links that leave the site. */
const labelFor = (target: EventTarget | null, openLabel: string): string | null => {
  if (!(target instanceof Element)) return null
  const marked = target.closest<HTMLElement>("[data-cursor]")
  if (marked) return marked.dataset.cursor || null
  const link = target.closest<HTMLAnchorElement>("a[href]")
  if (link && (link.target === "_blank" || /^https?:/.test(link.getAttribute("href") ?? ""))) return openLabel
  return null
}

/**
 * The dot that follows the mouse. Over links and buttons it grows into a pill
 * with a short label. The pill and its text are two separate layers, because
 * blending the text inside the pill would not give readable text on both themes.
 */
export const CustomCursor = ({ pointer }: { pointer: Pointer }) => {
  const x = useSpring(pointer.x, FOLLOW_SPRING)
  const y = useSpring(pointer.y, FOLLOW_SPRING)
  const opacity = useSpring(pointer.seen, FADE_SPRING)
  const label = useSyncExternalStore(subscribeCursor, getCursorLabel, () => null)

  const { t } = useLayout()
  const openLabel = t.cursor.open

  useEffect(() => {
    const onOver = (event: PointerEvent) => {
      if (event.pointerType === "mouse") setHoverLabel(labelFor(event.target, openLabel))
    }
    const onLeave = () => setHoverLabel(null)
    document.addEventListener("pointerover", onOver, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    return () => {
      document.removeEventListener("pointerover", onOver)
      document.documentElement.removeEventListener("pointerleave", onLeave)
    }
  }, [openLabel])

  const layer = "pointer-events-none fixed top-0 left-0 z-9999 hidden rounded-full mix-blend-difference md:flex"
  const textClass = "h-8 min-w-8 items-center justify-center px-3 text-[10px] tracking-widest whitespace-nowrap"

  return (
    <>
      <motion.div
        aria-hidden="true"
        key={`dot-${label ?? ""}`}
        initial={{ scale: label ? 0.6 : 1 }}
        animate={{ scale: 1 }}
        transition={POP_SPRING}
        style={{ x, y, opacity, translateX: "-50%", translateY: "-50%" }}
        className={`${layer} ${textClass} bg-invert text-transparent`}
      >
        {label}
      </motion.div>
      {label && (
        <motion.div
          aria-hidden="true"
          key={`text-${label}`}
          initial={{ scale: 0.6 }}
          animate={{ scale: 1 }}
          transition={POP_SPRING}
          style={{ x, y, opacity, translateX: "-50%", translateY: "-50%" }}
          className={`${layer} ${textClass} text-invert`}
        >
          {label}
        </motion.div>
      )}
    </>
  )
}
