import { useEffect, useRef, useState } from "react"
import { CONTACT } from "../../data/contact"
import { useLayout } from "../../hooks/useLayout"

const copyText = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

/** Copies the email address. The button says "copied" for a moment. */
export const CopyEmail = () => {
  const { t } = useLayout()
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const onClick = async () => {
    const ok = await copyText(CONTACT.email)
    if (!ok) return
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 cursor-pointer border-l border-white/20 px-4 text-[10px] tracking-widest text-neutral-400 transition-colors hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black md:text-xs"
    >
      <span aria-live="polite">{copied ? t.contact.cards.copied : t.contact.cards.copy}</span>
    </button>
  )
}
