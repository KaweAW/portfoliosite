import { useRef, type RefObject } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useIsMobile } from "../../hooks/useMediaQuery"

interface ParallaxImageProps {
  src: string
  /** The scrollable element the image moves inside. */
  containerRef: RefObject<HTMLDivElement | null>
}

const ParallaxFrame = ({ src, containerRef }: ParallaxImageProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-60, 60])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative mt-4 h-52 w-full overflow-hidden border border-white/20 opacity-90 grayscale transition-[filter] duration-300 group-active:grayscale-0"
    >
      <motion.img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        style={{ y }}
        className="h-full w-full origin-center scale-150 object-cover"
      />
    </div>
  )
}

/**
 * Mobile-only decorative image with scroll parallax. On desktop nothing is
 * rendered, so no scroll listeners are set up and the file is never downloaded
 * (desktop shows the cursor-following preview instead).
 */
export const ParallaxImage = (props: ParallaxImageProps) => {
  const isMobile = useIsMobile()
  return isMobile ? <ParallaxFrame {...props} /> : null
}
