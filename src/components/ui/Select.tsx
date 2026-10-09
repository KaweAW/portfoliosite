import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react"
import { cn } from "../../lib/cn"

interface SelectProps {
  label: string
  placeholder: string
  options: readonly string[]
  /** Name of the form field. Chosen options are sent as one text, separated by commas. */
  name: string
  /** Allows several options, shown with check boxes. */
  multiple?: boolean
  /** Word shown after a count when more than two options are chosen: "3 selected". */
  selectedWord: string
}

/**
 * Dropdown that follows the combobox pattern: the button keeps the focus,
 * arrow keys move through the options, Enter or Space picks, Escape closes.
 * Native selects cannot show check boxes or match the site, so this is custom.
 */
export const Select = ({ label, placeholder, options, name, multiple, selectedWord }: SelectProps) => {
  const id = useId()
  const root = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const [chosen, setChosen] = useState<readonly number[]>([])

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [open])

  // Opening a list near the bottom of the page scrolls it into view.
  useEffect(() => {
    if (open) listRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" })
  }, [open])

  const pick = (index: number) => {
    if (multiple) {
      setChosen((current) => (current.includes(index) ? current.filter((i) => i !== index) : [...current, index]))
    } else {
      setChosen((current) => (current[0] === index ? [] : [index]))
      setOpen(false)
    }
  }

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = options.length - 1
    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp": {
        event.preventDefault()
        if (!open) return setOpen(true)
        setActive((current) => (event.key === "ArrowDown" ? Math.min(last, current + 1) : Math.max(0, current - 1)))
        break
      }
      case "Home":
      case "End":
        if (open) {
          event.preventDefault()
          setActive(event.key === "Home" ? 0 : last)
        }
        break
      case "Enter":
      case " ":
        event.preventDefault()
        if (open) pick(active)
        else setOpen(true)
        break
      case "Escape":
        if (open) {
          event.preventDefault()
          event.stopPropagation()
          setOpen(false)
        }
        break
      case "Tab":
        setOpen(false)
        break
    }
  }

  const labels = chosen.map((index) => options[index]!)
  const summary = labels.length === 0 ? null : labels.length <= 2 ? labels.join(", ") : `${labels.length} ${selectedWord}`

  return (
    <div ref={root} className="relative flex flex-col gap-1.5">
      <span id={`${id}-label`} className="text-[10px] tracking-widest text-neutral-400 md:text-xs">
        {label}
      </span>

      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-labelledby={`${id}-label`}
        aria-activedescendant={open ? `${id}-option-${active}` : undefined}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={onKeyDown}
        className="flex w-full cursor-pointer items-center justify-between gap-3 border border-white/30 px-3 py-2 text-left text-sm tracking-normal normal-case transition-colors hover:border-white/60 focus-visible:border-white aria-expanded:border-white"
      >
        <span className={cn("truncate", summary ? "text-white" : "text-neutral-500")}>{summary ?? placeholder}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 12 12"
          className={cn("h-3 w-3 shrink-0 text-neutral-400 transition-transform duration-200", open && "rotate-180")}
        >
          <path d="M2 4.5 6 8.5l4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      {/* Sent with the form as plain text. */}
      <input type="hidden" name={name} value={labels.join(", ")} />

      {open && (
        <ul
          ref={listRef}
          id={`${id}-list`}
          role="listbox"
          aria-labelledby={`${id}-label`}
          aria-multiselectable={multiple || undefined}
          className="scrollbar-none absolute top-full right-0 left-0 z-30 mt-1 max-h-64 overflow-y-auto border border-white bg-black py-1 shadow-2xl"
        >
          {options.map((option, index) => {
            const selected = chosen.includes(index)
            return (
              <li
                key={option}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={selected}
                onPointerEnter={() => setActive(index)}
                onPointerDown={(event) => event.preventDefault()}
                onClick={() => pick(index)}
                className={cn(
                  "flex cursor-pointer items-center gap-3 px-3 py-2.5 text-sm tracking-normal normal-case transition-colors",
                  index === active ? "bg-white/10" : "bg-transparent",
                )}
              >
                {multiple && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center border",
                      selected ? "border-white bg-white text-black" : "border-white/40",
                    )}
                  >
                    {selected && (
                      <svg viewBox="0 0 12 12" className="h-3 w-3">
                        <path d="M2.5 6.5 5 9l4.5-5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                      </svg>
                    )}
                  </span>
                )}
                <span className={cn("flex-1", !multiple && selected && "font-bold")}>{option}</span>
                {!multiple && selected && (
                  <svg aria-hidden="true" viewBox="0 0 12 12" className="h-3 w-3 shrink-0">
                    <path d="M2.5 6.5 5 9l4.5-5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
