import { useEffect, useRef, useState } from "react"
import { CONTACT } from "../../data/contact"
import { useLayout } from "../../hooks/useLayout"
import { flashCursorLabel } from "../../lib/cursor"

const copyText = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

/** Copies the email address. The cursor answers with a short joke (desktop), and the button says "copied" for everyone. */
export const CopyEmail = () => {
  const { t } = useLayout()
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const joke = useRef(0)

  useEffect(() => () => clearTimeout(timer.current), [])

  const onClick = async () => {
    const ok = await copyText(CONTACT.email)
    const jokes = t.contact.cards.copyJokes
    // Cycle through the jokes so two clicks in a row never repeat.
    flashCursorLabel((ok ? jokes[joke.current++ % jokes.length] : CONTACT.email)!.toUpperCase())
    if (!ok) return
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor={t.contact.cards.copy}
      className="shrink-0 cursor-pointer border-l border-white/20 px-4 text-[10px] tracking-widest text-neutral-400 transition-colors hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black md:text-xs md:hover:text-transparent"
    >
      <span aria-live="polite">{copied ? t.contact.cards.copied : t.contact.cards.copy}</span>
    </button>
  )
}
