import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "framer-motion"
import { useIsMobile } from "../../hooks/useMediaQuery"

const SYMBOLS = "!<>-_\\/[]{}—=+*^?#________"
/** Noise for Russian text, and for the moment a text changes between Latin and Cyrillic: both alphabets mix on screen. */
const CYRILLIC = "ЖЗИЛФЦШЩЭЮЯжзилфцшщэюя"
const FRAME_MS = 30
const REVEAL_PER_FRAME = 1 / 3

const hasCyrillic = (text: string) => /[\u0400-\u04FF]/.test(text)

const scrambleFrame = (text: string, revealed: number, noise: string): string =>
  Array.from(text, (char, index) => {
    if (index < revealed || char === " ") return char
    return noise[Math.floor(Math.random() * noise.length)]
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
 * Decodes `text` letter by letter. When the text changes (the visitor switches
 * language) it decodes again into the new text, without remounting. On desktop it runs on mount and on hover;
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

  // The previous text tells whether the alphabet changes (Latin to Cyrillic or back), so the noise can mix both.
  const previousText = useRef(text)

  useEffect(() => {
    const before = previousText.current
    previousText.current = text
    if (!enabled) return

    const cyrillic = hasCyrillic(text) || hasCyrillic(before)
    const noise = cyrillic ? `${CYRILLIC}${SYMBOLS}` : SYMBOLS

    let revealed = 0
    isScrambling.current = true

    const timer = window.setInterval(() => {
      if (revealed >= text.length) {
        window.clearInterval(timer)
        isScrambling.current = false
        setFrame(null)
        return
      }
      setFrame({ source: text, value: scrambleFrame(text, revealed, noise) })
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
