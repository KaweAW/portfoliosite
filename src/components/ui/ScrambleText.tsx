"use client"
import { useState, useEffect, useCallback, useRef } from "react"
import { useInView } from "framer-motion"

const CHARS = "!<>-_\\/[]{}—=+*^?#________"

export const ScrambleText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text)
  const [isScrambling, setIsScrambling] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const scramble = useCallback(() => {
    if (isScrambling) return
    setIsScrambling(true)
    let iteration = 0
    
    const interval = setInterval(() => {
      setDisplayText(() =>
        text.split("").map((_letter, index) => {
          if (index < iteration) return text[index]
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join("")
      )
      
      if (iteration >= text.length) {
        clearInterval(interval)
        setIsScrambling(false)
      }
      iteration += 1 / 3
    }, 30)
  }, [text, isScrambling])

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768
    if (isMobile) {
      if (isInView) {
        scramble()
      }
    } else {
      scramble()
    }
  }, [text, isInView])

  return (
    <span 
      ref={ref}
      onMouseEnter={scramble} 
      className="inline-block cursor-crosshair"
    >
      {displayText}
    </span>
  )
}