import type { ReactNode } from "react"
import { hrefFor } from "../../routes"
import { Link } from "../ui/Link"

/**
 * Call to action that leads to the contact page. On hover a neon fill rises
 * from the bottom, the button glows and the arrow moves forward.
 */
export const HireButton = ({ children }: { children: ReactNode }) => (
  <Link
    href={hrefFor("contact")}
    className="group relative inline-flex items-center gap-2 overflow-hidden border border-ok/60 px-4 py-3 text-[10px] font-bold tracking-widest text-ok transition-[color,border-color,box-shadow,transform] duration-300 hover:border-neon hover:text-black hover:shadow-[0_0_28px_var(--color-neon)] active:scale-[0.97] motion-reduce:transition-none md:text-xs"
  >
    <span
      aria-hidden="true"
      className="absolute inset-0 -z-0 translate-y-full bg-neon transition-transform duration-300 ease-out group-hover:translate-y-0 motion-reduce:transition-none"
    />
    <span className="relative">{children}</span>
    <span aria-hidden="true" className="relative transition-transform duration-300 group-hover:translate-x-1.5">
      →
    </span>
  </Link>
)
