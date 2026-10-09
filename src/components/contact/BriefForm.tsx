import { useId, useState, type FormEvent, type ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CONTACT } from "../../data/contact"
import { localeFor } from "../../data/languages"
import { formatEuro } from "../../lib/formatNumber"
import { useLayout } from "../../hooks/useLayout"
import { cn } from "../../lib/cn"
import type { BriefFieldId } from "../../types"
import { Select } from "../ui/Select"

const BUDGET_MIN = 500
const BUDGET_MAX = 10000
const BUDGET_STEP = 500

/** Dropdowns of the "More information" part, in the order they are shown. `multiple` ones take several options. */
const DROPDOWNS: readonly { id: BriefFieldId; multiple?: boolean }[] = [
  { id: "projectType" },
  { id: "features", multiple: true },
  { id: "technologies", multiple: true },
  { id: "assets", multiple: true },
  { id: "audience", multiple: true },
  { id: "hosting" },
  { id: "support" },
  { id: "legal", multiple: true },
]

/** What gets sent in the email: always the same format, whatever language the visitor uses. */
const plainEuro = (value: number) => `€ ${value.toLocaleString("en-US")}`

const fieldClass =
  "w-full border border-white/30 bg-transparent px-3 py-2 text-sm normal-case tracking-normal text-white placeholder:text-neutral-500 focus:border-white focus:outline-none"

const Field = ({ label, required, children, htmlFor }: { label: string; required?: boolean; children: ReactNode; htmlFor: string }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={htmlFor} className="text-[10px] tracking-widest text-neutral-400 md:text-xs">
      {label}
      {required && <span aria-hidden="true"> *</span>}
    </label>
    {children}
  </div>
)

type Status = "idle" | "sending" | "sent" | "error"

/**
 * Project brief. It posts to the Netlify form declared in index.html, so it
 * needs no server of our own. If sending fails, the visitor is pointed to the email address.
 */
export const BriefForm = () => {
  const { t, language } = useLayout()
  const copy = t.contact.form
  const euro = (value: number) => formatEuro(localeFor(language), value)
  const id = useId()
  const [status, setStatus] = useState<Status>("idle")
  const [budget, setBudget] = useState<number | null>(null)
  const [showMore, setShowMore] = useState(false)
  // The dropdown lists must be able to leave the box, so clipping only lasts while it opens or closes.
  const [settled, setSettled] = useState(false)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const body = new URLSearchParams({ "form-name": "brief" })
    for (const [key, value] of data) if (typeof value === "string") body.set(key, value)
    body.set("budget", budget === null ? "" : plainEuro(budget))

    setStatus("sending")
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      })
      setStatus(response.ok ? "sent" : "error")
    } catch {
      setStatus("error")
    }
  }

  if (status === "sent") {
    return (
      <p role="status" className="py-10 text-sm normal-case tracking-normal md:text-base">
        {copy.sent}
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" aria-busy={status === "sending"}>
      {/* Honeypot: people never see it, spam bots fill it in and Netlify drops those messages. */}
      <p className="sr-only" aria-hidden="true">
        <label>
          Do not fill this in <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label={copy.name} required htmlFor={`${id}-name`}>
          <input id={`${id}-name`} name="name" required autoComplete="name" placeholder={copy.namePlaceholder} className={fieldClass} />
        </Field>
        <Field label={copy.email} required htmlFor={`${id}-email`}>
          <input id={`${id}-email`} name="email" type="email" required autoComplete="email" placeholder={copy.emailPlaceholder} className={fieldClass} />
        </Field>
      </div>

      <Field label={copy.message} required htmlFor={`${id}-message`}>
        <textarea id={`${id}-message`} name="message" required rows={6} placeholder={copy.messagePlaceholder} className={cn(fieldClass, "resize-y")} />
      </Field>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-budget`} className="text-[10px] tracking-widest text-neutral-400 md:text-xs">
          {copy.budget}
        </label>
        <input
          id={`${id}-budget`}
          type="range"
          min={BUDGET_MIN}
          max={BUDGET_MAX}
          step={BUDGET_STEP}
          value={budget ?? BUDGET_MIN}
          onChange={(event) => setBudget(Number(event.target.value))}
          aria-valuetext={budget === null ? copy.budgetNone : euro(budget)}
          className="w-full cursor-pointer accent-white"
        />
        <div className="flex items-center justify-between text-[10px] text-neutral-500 md:text-xs">
          <span>{euro(BUDGET_MIN)}</span>
          <span aria-live="polite" className="text-white">
            {budget === null ? copy.budgetNone : budget === BUDGET_MAX ? `${euro(budget)}+` : euro(budget)}
          </span>
          <span>{euro(BUDGET_MAX)}+</span>
        </div>
        {budget !== null && (
          <button
            type="button"
            onClick={() => setBudget(null)}
            className="cursor-pointer self-start text-[10px] tracking-widest text-neutral-400 underline underline-offset-4 hover:text-white md:text-xs"
          >
            {copy.budgetClear}
          </button>
        )}
      </div>

      <div>
        <button
          type="button"
          aria-expanded={showMore}
          aria-controls={`${id}-more`}
          onClick={() => {
            setSettled(false)
            setShowMore((open) => !open)
          }}
          className="flex w-full cursor-pointer items-center gap-3 text-xs tracking-widest text-neutral-400 hover:text-white"
        >
          <span aria-hidden="true" className={cn("inline-block transition-transform", showMore && "rotate-90")}>
            ›
          </span>
          {copy.more}
          <span aria-hidden="true" className="h-px flex-1 bg-white/20" />
        </button>

        <AnimatePresence initial={false}>
          {showMore && (
            <motion.div
              id={`${id}-more`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onAnimationComplete={(definition) => {
                if (typeof definition === "object" && "opacity" in definition && definition.opacity === 1) setSettled(true)
              }}
              className={settled ? "overflow-visible" : "overflow-hidden"}
            >
              <div className="grid gap-5 pt-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Field label={copy.company} htmlFor={`${id}-company`}>
                    <input id={`${id}-company`} name="company" autoComplete="organization" placeholder={copy.companyPlaceholder} className={fieldClass} />
                  </Field>
                </div>

                {DROPDOWNS.map(({ id: fieldId, multiple }) => (
                  <Select
                    key={fieldId}
                    name={fieldId}
                    multiple={multiple}
                    label={copy.fields[fieldId].label}
                    placeholder={copy.fields[fieldId].placeholder}
                    options={copy.fields[fieldId].options}
                    selectedWord={copy.selected}
                  />
                ))}

                <Field label={copy.deadline} htmlFor={`${id}-deadline`}>
                  <input id={`${id}-deadline`} name="deadline" type="date" className={cn(fieldClass, "in-data-[theme=light]:scheme-light scheme-dark")} />
                </Field>
                <Select
                  name="priority"
                  label={copy.fields.priority.label}
                  placeholder={copy.fields.priority.placeholder}
                  options={copy.fields.priority.options}
                  selectedWord={copy.selected}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {status === "error" && (
        <p role="alert" className="text-xs normal-case tracking-normal text-red-400 md:text-sm">
          {copy.error}{" "}
          <a href={`mailto:${CONTACT.email}`} className="underline underline-offset-4">
            {CONTACT.email}
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group flex cursor-pointer items-stretch self-end text-sm font-bold tracking-widest disabled:opacity-50"
      >
        <span className="flex items-center border border-white px-6 py-3 transition-colors group-hover:bg-white group-hover:text-black group-focus-visible:bg-white group-focus-visible:text-black">
          {status === "sending" ? copy.sending : copy.send}
        </span>
        <span className="flex w-12 items-center justify-center border border-white bg-white text-black">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          >
            <path d="M21 3 3 10.5l7 3 3 7L21 3Z" />
            <path d="m10 13.5 4-4" />
          </svg>
        </span>
      </button>
    </form>
  )
}
