import { useId, useState, type FormEvent, type ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CONTACT } from "../../data/contact"
import { useLayout } from "../../hooks/useLayout"
import { cn } from "../../lib/cn"

const BUDGET_MIN = 500
const BUDGET_MAX = 10000
const BUDGET_STEP = 500

const euro = (value: number) => `€ ${value.toLocaleString("en-US")}`

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
  const { t } = useLayout()
  const copy = t.contact.form
  const id = useId()
  const [status, setStatus] = useState<Status>("idle")
  const [budget, setBudget] = useState<number | null>(null)
  const [showMore, setShowMore] = useState(false)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const body = new URLSearchParams({ "form-name": "brief" })
    for (const [key, value] of data) if (typeof value === "string") body.set(key, value)
    body.set("budget", budget === null ? "" : euro(budget))

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
          onClick={() => setShowMore((open) => !open)}
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
              className="overflow-hidden"
            >
              <div className="grid gap-5 pt-5 md:grid-cols-2">
                <Field label={copy.company} htmlFor={`${id}-company`}>
                  <input id={`${id}-company`} name="company" autoComplete="organization" placeholder={copy.companyPlaceholder} className={fieldClass} />
                </Field>
                <Field label={copy.projectType} htmlFor={`${id}-type`}>
                  <select id={`${id}-type`} name="projectType" defaultValue="" className={fieldClass}>
                    <option value="">{copy.projectTypeNone}</option>
                    {copy.projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label={copy.deadline} htmlFor={`${id}-deadline`}>
                  <input id={`${id}-deadline`} name="deadline" type="date" className={cn(fieldClass, "in-data-[theme=light]:scheme-light scheme-dark")} />
                </Field>
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
        data-cursor={copy.send}
        className="flex cursor-pointer items-center justify-between self-end border border-white px-6 py-3 text-sm font-bold tracking-widest transition-colors hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black disabled:opacity-50 md:min-w-48"
      >
        <span>{status === "sending" ? copy.sending : copy.send}</span>
        <span aria-hidden="true" className="ml-6">
          →
        </span>
      </button>
    </form>
  )
}
