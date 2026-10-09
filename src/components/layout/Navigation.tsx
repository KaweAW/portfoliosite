import { motion } from "framer-motion"
import { useLayout } from "../../hooks/useLayout"
import { cn } from "../../lib/cn"
import { Link } from "../ui/Link"
import { hrefFor, VIEW_IDS, type ViewId } from "../../routes"

/** The call to action: a soft green pill with a dot that glows brighter on hover. */
const HIRE_VIEW: ViewId = "contact"

export const Navigation = () => {
  const { view, t } = useLayout()

  return (
    <nav
      aria-label={t.a11y.primaryNav}
      className="fixed bottom-0 left-0 z-9999 flex w-full items-center justify-between gap-2 border-t border-white/20 bg-black p-4 font-mono text-[10px] tracking-widest text-white select-none md:top-6 md:right-8 md:bottom-auto md:left-auto md:w-auto md:justify-end md:gap-7 md:border md:border-white/10 md:bg-black/70 md:px-5 md:py-2 md:text-xs md:backdrop-blur-md"
    >
      {VIEW_IDS.map((id) => {
        const isActive = id === view
        const isHire = id === HIRE_VIEW
        return (
          <Link
            key={id}
            href={hrefFor(id)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative flex-1 py-1 text-center whitespace-nowrap transition-colors md:flex-none",
              isHire
                ? "group flex items-center justify-center gap-2 rounded-full border border-ok/40 bg-ok/10 px-3 text-ok hover:border-neon hover:bg-neon/15 hover:text-neon hover:shadow-[0_0_16px_var(--color-neon)] md:flex-none"
                : isActive
                  ? "text-white"
                  : "text-neutral-400 hover:text-white",
              isHire && isActive && "border-neon/70 bg-neon/15 text-neon",
            )}
          >
            {isHire && (
              <span aria-hidden="true" className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-ok opacity-60 motion-safe:animate-ping group-hover:bg-neon" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ok group-hover:bg-neon group-hover:shadow-[0_0_8px_var(--color-neon)]" />
              </span>
            )}
            {isHire ? (
              t.nav[id]
            ) : id === "resume" ? (
              <>
                <span className="md:hidden">{`// ${t.nav.resumeShort}`}</span>
                <span className="hidden md:inline">{`// ${t.nav.resume}`}</span>
              </>
            ) : (
              `// ${t.nav[id]}`
            )}
            {isActive && !isHire && (
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
