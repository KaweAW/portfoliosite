import type { AnchorHTMLAttributes, MouseEvent } from "react"
import { navigate } from "../../lib/navigation"

/**
 * Anchor for pages of this site. Keeps a real `href` (so it can be opened in a
 * new tab, copied or crawled) but moves between pages without a reload.
 */
export const Link = ({ href, onClick, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    const plainLeftClick =
      event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
    if (event.defaultPrevented || !plainLeftClick || props.target === "_blank") return
    event.preventDefault()
    navigate(href)
  }

  return <a href={href} onClick={handleClick} {...props} />
}
