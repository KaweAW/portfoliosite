import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { itemVariants, pageVariants } from "../../animations"
import { cn } from "../../lib/cn"

interface PageShellProps {
  children: ReactNode
  className?: string
}

/** Animated wrapper shared by every view: enter/exit transition plus staggered children. */
export const PageShell = ({ children, className }: PageShellProps) => (
  <motion.section
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className={cn("flex h-full w-full flex-col", className)}
  >
    {children}
  </motion.section>
)

interface PageHeaderProps {
  title: string
  aside?: string
}

export const PageHeader = ({ title, aside }: PageHeaderProps) => (
  <motion.header
    variants={itemVariants}
    className="mb-4 flex items-end justify-between border-b border-white/20 pb-4 md:mb-8"
  >
    <h1 className="text-4xl font-bold tracking-tighter md:text-8xl">{title}</h1>
    {aside && (
      <div className="text-[10px] tracking-widest text-neutral-500 md:text-xs">{aside}</div>
    )}
  </motion.header>
)
