import { motion, useReducedMotion, useSpring } from "framer-motion"
import { usePreviewState } from "../../hooks/usePreview"
import type { Pointer } from "../../hooks/usePointer"

const FOLLOW_SPRING = { stiffness: 150, damping: 15 }

const HIDDEN = { opacity: 0, scale: 0.5, rotate: -5 }
const VISIBLE = { opacity: 1, scale: 1, rotate: 0 }

/**
 * Desktop-only image (or short silent loop) that trails the cursor while a project or timeline row is
 * hovered or focused.
 *
 * It stays mounted and only animates in and out. Unmounting it between hovers
 * would leave the springs without a subscriber, and they would miss any mouse
 * jump that happens while the preview is hidden.
 */
export const HoverPreview = ({ pointer }: { pointer: Pointer }) => {
  const { src, video, visible } = usePreviewState()
  const reduceMotion = useReducedMotion()
  const x = useSpring(pointer.x, FOLLOW_SPRING)
  const y = useSpring(pointer.y, FOLLOW_SPRING)

  return (
    <motion.div
      aria-hidden="true"
      initial={false}
      animate={visible ? VISIBLE : HIDDEN}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      className="pointer-events-none fixed top-0 left-0 z-50 hidden h-48 w-80 overflow-hidden border border-white/20 shadow-2xl md:block"
    >
      {src && (
        <img src={src} alt="" decoding="async" className="absolute inset-0 h-full w-full object-cover grayscale" />
      )}
      {/* The loop only starts once the preview is shown, and never for visitors who prefer reduced motion. */}
      {video && visible && !reduceMotion && (
        <video
          key={video}
          src={video}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover grayscale"
        />
      )}
    </motion.div>
  )
}
