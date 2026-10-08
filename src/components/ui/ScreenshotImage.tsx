import { useRef, type RefObject } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useIsMobile } from "../../hooks/useMediaQuery"
import type { ProjectImage } from "../../types"

/** Frames are never taller than a square nor wider than 16:9, so rows keep a sensible height. */
const MIN_ASPECT = 1
const MAX_ASPECT = 16 / 9

interface ScreenshotImageProps {
  image: ProjectImage
  /** The scrollable element the image moves inside. */
  containerRef: RefObject<HTMLDivElement | null>
}

const ScreenshotFrame = ({ image, containerRef }: ScreenshotImageProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const imageAspect = image.width / image.height
  const frameAspect = Math.min(Math.max(imageAspect, MIN_ASPECT), MAX_ASPECT)
  // Share of the image height that does not fit in the frame. Tall (phone) screenshots scroll through it.
  const hidden = imageAspect < frameAspect ? 1 - imageAspect / frameAspect : 0

  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(
    scrollYProgress,
    [0.2, 0.8],
    ["0%", reduceMotion ? "0%" : `${-hidden * 100}%`],
  )

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{ aspectRatio: frameAspect }}
      className="relative mt-4 w-full overflow-hidden border border-white/20 opacity-90 grayscale transition-[filter] duration-300 group-active:grayscale-0"
    >
      <motion.img
        src={image.src}
        alt=""
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
        style={{ y }}
        className={hidden > 0 ? "w-full" : "h-full w-full object-cover object-top"}
      />
    </div>
  )
}

/**
 * Mobile-only screenshot of a project. The frame follows the shape of the
 * image: a tall phone screenshot scrolls through as the row moves up the
 * screen, a wide one is shown whole. Renders nothing on desktop, where the
 * cursor-following preview is used instead.
 */
export const ScreenshotImage = (props: ScreenshotImageProps) => {
  const isMobile = useIsMobile()
  return isMobile ? <ScreenshotFrame {...props} /> : null
}
