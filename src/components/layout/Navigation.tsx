import { motion } from "framer-motion"
import { useLayout } from "../../hooks/useLayout"
import { cn } from "../../lib/cn"
import { Link } from "../ui/Link"
import { hrefFor, VIEW_IDS } from "../../routes"

export const Navigation = () => {
  const { view, t } = useLayout()

  return (
    <nav
      aria-label={t.a11y.primaryNav}
      className="fixed bottom-0 left-0 z-9999 flex w-full justify-between gap-2 border-t border-white/20 bg-black p-4 font-mono text-[10px] tracking-widest text-white select-none md:top-8 md:right-8 md:bottom-auto md:left-auto md:w-auto md:justify-end md:gap-8 md:border-none md:bg-transparent md:p-0 md:text-xs md:mix-blend-difference"
    >
      {VIEW_IDS.map((id) => {
        const isActive = id === view
        return (
          <Link
            key={id}
            href={hrefFor(id)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative flex-1 py-1 text-center transition-colors md:flex-none",
              isActive ? "text-white" : "text-neutral-400 hover:text-white",
            )}
          >
            {`// ${t.nav[id]}`}
            {isActive && (
              <motion.span
                layoutId="nav-underline"
                className="absolute bottom-0 left-0 hidden h-px w-full bg-white md:-bottom-1 md:block"
              />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
