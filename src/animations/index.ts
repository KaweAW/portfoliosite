import type { Variants } from "framer-motion"

export const pageVariants: Variants = {
  initial: { 
    opacity: 0, 
    scale: 0.98,
    filter: "blur(15px) contrast(160%) grayscale(100%)",
    skewX: -3 
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    filter: "blur(0px) contrast(100%) grayscale(0%)",
    skewX: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.06
    } 
  },
  exit: { 
    opacity: 0, 
    scale: 1.01,
    filter: "blur(10px) contrast(120%)",
    skewX: 3,
    transition: { duration: 0.35, ease: [0.7, 0, 0.84, 0] as const } 
  }
}

export const itemVariants: Variants = {
  initial: { opacity: 0, y: 25, skewY: 0.5 },
  animate: { 
    opacity: 1, 
    y: 0, 
    skewY: 0, 
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } 
  }
}

export const imageOverlayVariants: Variants = {
  initial: { opacity: 0, scale: 1.08, filter: "blur(8px) brightness(0.3)" },
  animate: { 
    opacity: 0.25, 
    scale: 1, 
    filter: "blur(0px) brightness(0.6)", 
    transition: { duration: 0.5, ease: "easeOut" } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.96, 
    filter: "blur(10px) brightness(0)", 
    transition: { duration: 0.3 } 
  }
}