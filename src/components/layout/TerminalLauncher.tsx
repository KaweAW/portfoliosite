import { lazy, Suspense, useEffect, useState } from "react"
import { useLayout } from "../../hooks/useLayout"

// The terminal is a separate chunk: it is only downloaded when someone opens it.
const loadTerminal = () => import("./Terminal")
const Terminal = lazy(() => loadTerminal().then((module) => ({ default: module.Terminal })))

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))

/** Button that opens the terminal, plus the `/` and backtick shortcuts. */
export const TerminalLauncher = () => {
  const { t } = useLayout()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || isTyping(event.target)) return
      if (event.key !== "/" && event.key !== "`") return
      event.preventDefault()
      setOpen(true)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <>
      <button
        type="button"
        aria-label={t.terminal.open}
        aria-haspopup="dialog"
        aria-keyshortcuts="/"
        onClick={() => setOpen(true)}
        onPointerEnter={loadTerminal}
        onFocus={loadTerminal}
        className="fixed top-4 right-4 z-9999 cursor-pointer border border-white/10 bg-black/50 px-2 py-2 font-mono text-xs tracking-widest text-neutral-300 backdrop-blur-sm transition-colors select-none hover:text-white md:top-auto md:right-auto md:bottom-2 md:left-8 md:border-transparent md:bg-transparent md:p-0 md:text-[10px] md:text-invert/60 md:hover:text-invert md:mix-blend-difference md:backdrop-blur-none"
      >
        <span aria-hidden="true" className="md:hidden">
          &gt;_
        </span>
        <span aria-hidden="true" className="hidden md:inline">
          [ / ] {t.terminal.label}
        </span>
      </button>

      {open && (
        <Suspense fallback={null}>
          <Terminal onClose={() => setOpen(false)} />
        </Suspense>
      )}
    </>
  )
}
