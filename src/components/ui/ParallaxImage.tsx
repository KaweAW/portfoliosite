"use client"
import { useRef, type RefObject } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxImageProps {
  src: string
  alt: string
  containerRef: RefObject<HTMLDivElement | null>
}

export const ParallaxImage = ({ src, alt, containerRef }: ParallaxImageProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef, 
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [-60, 60])

  return (
    <div 
      ref={ref} 
      className="block md:hidden w-full h-52 mt-4 overflow-hidden border border-white/20 relative opacity-90 grayscale group-active:grayscale-0 transition-all duration-300"
    >
      <motion.img 
        src={src} 
        alt={alt} 
        style={{ y }} 
        className="w-full h-full object-cover scale-150 origin-center"
      />
    </div>
  )
}