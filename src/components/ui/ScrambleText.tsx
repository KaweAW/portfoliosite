import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "framer-motion"
import { useIsMobile } from "../../hooks/useMediaQuery"

const CHARS = "!<>-_\\/[]{}—=+*^?#________"
const FRAME_MS = 30
const REVEAL_PER_FRAME = 1 / 3

const scrambleFrame = (text: string, revealed: number): string =>
  Array.from(text, (char, index) => {
    if (index < revealed || char === " ") return char
    return CHARS[Math.floor(Math.random() * CHARS.length)]
  }).join("")

interface Frame {
  /** The text this frame was generated for, so a stale frame is never shown after the text changes. */
  source: string
  value: string
}

interface ScrambleTextProps {
  text: string
}

/**
 * Decodes `text` letter by letter. On desktop it runs on mount and on hover;
 * on mobile it waits until the text scrolls into view. Skipped entirely when
 * the visitor prefers reduced motion.
 */
export const ScrambleText = ({ text }: ScrambleTextProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const isScrambling = useRef(false)
  const [frame, setFrame] = useState<Frame | null>(null)
  const [replays, setReplays] = useState(0)

  const isMobile = useIsMobile()
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const reduceMotion = useReducedMotion()
  const enabled = !reduceMotion && (!isMobile || isInView)

  useEffect(() => {
    if (!enabled) return

    let revealed = 0
    isScrambling.current = true

    const timer = window.setInterval(() => {
      if (revealed >= text.length) {
        window.clearInterval(timer)
        isScrambling.current = false
        setFrame(null)
        return
      }
      setFrame({ source: text, value: scrambleFrame(text, revealed) })
      revealed += REVEAL_PER_FRAME
    }, FRAME_MS)

    // Runs when the text changes or the component unmounts mid-animation.
    return () => {
      window.clearInterval(timer)
      isScrambling.current = false
    }
  }, [text, enabled, replays])

  const replay = () => {
    if (enabled && !isScrambling.current) setReplays((count) => count + 1)
  }

  const shown = frame && frame.source === text ? frame.value : text

  return (
    <span ref={ref} onMouseEnter={replay} className="relative inline-block cursor-crosshair">
      {/* Screen readers get the real text, not the scrambled frames. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{shown}</span>
    </span>
  )
}
