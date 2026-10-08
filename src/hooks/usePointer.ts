import { useEffect } from "react"
import { useMotionValue, type MotionValue } from "framer-motion"

export interface Pointer {
  x: MotionValue<number>
  y: MotionValue<number>
  /** 0 until the mouse has moved once, then 1. */
  seen: MotionValue<number>
}

/**
 * Tracks the mouse in motion values. Moving the mouse updates the DOM through
 * Framer Motion directly, so it never triggers a React re-render.
 */
export const usePointer = (): Pointer => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const seen = useMotionValue(0)

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return
      x.set(event.clientX)
      y.set(event.clientY)
      if (seen.get() === 0) seen.set(1)
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [x, y, seen])

  return { x, y, seen }
}
