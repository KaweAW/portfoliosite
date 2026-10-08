import { motion, useSpring } from "framer-motion"
import type { Pointer } from "../../hooks/usePointer"

const FOLLOW_SPRING = { stiffness: 700, damping: 45, mass: 0.5 }
const FADE_SPRING = { stiffness: 120, damping: 20 }

export const CustomCursor = ({ pointer }: { pointer: Pointer }) => {
  const x = useSpring(pointer.x, FOLLOW_SPRING)
  const y = useSpring(pointer.y, FOLLOW_SPRING)
  const opacity = useSpring(pointer.seen, FADE_SPRING)

  return (
    <motion.div
      aria-hidden="true"
      style={{ x, y, opacity }}
      className="pointer-events-none fixed top-0 left-0 z-9999 -mt-4 -ml-4 hidden h-8 w-8 rounded-full bg-white mix-blend-difference md:block"
    />
  )
}
