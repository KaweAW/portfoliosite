import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react"
import { CONTACT, RESUME_FILES } from "../../data/contact"
import { LANGUAGES } from "../../data/languages"
import { PROJECTS } from "../../data/projects"
import { useLayout } from "../../hooks/useLayout"
import { navigate } from "../../lib/navigation"
import { getTheme, setTheme } from "../../lib/theme"
import { hrefFor, projectHref, VIEW_IDS } from "../../routes"
import { fillTemplate, TERMINAL_COPY } from "../../data/terminalCopy"
import type { Language, TerminalCopy, Translation } from "../../types"

interface Line {
  id: number
  kind: "in" | "out" | "err"
  text: string
}

interface CommandContext {
  args: string[]
  language: Language
  t: Translation
  copy: TerminalCopy
  setLanguage: (language: Language) => void
  close: () => void
  clear: () => void
  history: string[]
}

type Output = string[] | { error: string }

interface Command {
  run: (context: CommandContext) => Output | void
}

const pad = (text: string, length: number) => text.padEnd(length, " ")

/** Names a visitor can type after `open`: view ids, project slugs and project numbers. */
const targets = (): string[] => [...VIEW_IDS, ...PROJECTS.map((project) => project.slug)]

const resolveTarget = (raw: string): string | null => {
  const word = raw.toLowerCase().replace(/^\/+/, "")
  if (/^\d+$/.test(word)) {
    const project = PROJECTS[Number(word) - 1]
    return project ? projectHref(project.slug) : null
  }
  const view = VIEW_IDS.find((id) => id === word)
  if (view) return hrefFor(view)
  const project = PROJECTS.find(
    (p) => p.slug === word || p.id.toLowerCase() === word.replace(/-/g, ""),
  )
  return project ? projectHref(project.slug) : null
}

const projectList = ({ t }: CommandContext): string[] =>
  PROJECTS.map(
    (project, index) =>
      `${String(index + 1).padStart(2, "0")}  ${pad(project.slug, 18)}${t.projects.items[project.id].desc}`,
  )

const open = ({ args, close, copy }: CommandContext): Output => {
  const target = args[0]
  if (!target) return { error: copy.openUsage }
  const path = resolveTarget(target)
  if (!path) return { error: fillTemplate(copy.noSuchPage, { target }) }
  close()
  navigate(path)
  return []
}

const COMMANDS: Record<string, Command> = {
  help: {
    run: ({ copy }) => [
      ...Object.entries(copy.help).map(([name, text]) => `${pad(name, 12)}${text}`),
      "",
      copy.helpFooter,
    ],
  },
  ls: {
    run: (context) =>
      context.args[0] === "projects" ? projectList(context) : [VIEW_IDS.join("   ")],
  },
  projects: { run: projectList },
  open: { run: open },
  cd: { run: open },
  whoami: { run: ({ copy }) => [...copy.whoami] },
  contact: {
    run: () => [
      `${pad("email", 10)}${CONTACT.email}`,
      `${pad("github", 10)}${CONTACT.githubDisplay}`,
      `${pad("linkedin", 10)}${CONTACT.linkedinDisplay}`,
    ],
  },
  email: {
    run: ({ copy }) => {
      window.location.href = `mailto:${CONTACT.email}`
      return [copy.openingMail]
    },
  },
  github: {
    run: ({ copy }) => {
      window.open(CONTACT.github, "_blank", "noopener,noreferrer")
      return [copy.openingGithub]
    },
  },
  linkedin: {
    run: ({ copy }) => {
      window.open(CONTACT.linkedin, "_blank", "noopener,noreferrer")
      return [copy.openingLinkedin]
    },
  },
  resume: {
    run: ({ language, copy }) => {
      const file = RESUME_FILES[language]
      const link = document.createElement("a")
      link.href = `/${file}`
      link.download = file
      link.click()
      return [fillTemplate(copy.downloading, { file })]
    },
  },
  lang: {
    run: ({ args, language, setLanguage, copy }) => {
      const codes = LANGUAGES.map((item) => item.code)
      const list = codes.join(" ")
      const wanted = args[0]?.toUpperCase()
      if (!wanted) return [fillTemplate(copy.langCurrent, { language }), fillTemplate(copy.langAvailable, { codes: list })]
      const match = codes.find((code) => code === wanted)
      if (!match) return { error: fillTemplate(copy.langUnknown, { value: args[0] ?? "", codes: list }) }
      setLanguage(match)
      return [fillTemplate(copy.langSet, { language: match })]
    },
  },
  theme: {
    run: ({ args, copy }) => {
      const wanted = args[0]?.toLowerCase()
      if (!wanted) return [fillTemplate(copy.themeCurrent, { theme: getTheme() }), copy.themeAvailable]
      if (wanted !== "dark" && wanted !== "light") {
        return { error: fillTemplate(copy.themeUnknown, { value: args[0] ?? "" }) }
      }
      setTheme(wanted)
      return [fillTemplate(copy.themeSet, { theme: wanted })]
    },
  },
  history: {
    run: ({ history }) => history.map((entry, index) => `${String(index + 1).padStart(2, " ")}  ${entry}`),
  },
  clear: {
    run: ({ clear }) => {
      clear()
    },
  },
  exit: {
    run: ({ close }) => {
      close()
    },
  },
  sudo: {
    run: ({ args, copy }) =>
      args.join(" ").toLowerCase() === "hire me"
        ? [copy.sudoGranted, fillTemplate(copy.sudoJoke, { email: CONTACT.email })]
        : { error: copy.sudoDenied },
  },
}

/** Commands that exist but are not worth listing in `help`. */
const HIDDEN = new Set(["cd", "sudo"])

const complete = (input: string): string => {
  const [first = "", ...rest] = input.split(/\s+/)
  if (rest.length === 0) {
    const matches = Object.keys(COMMANDS).filter((name) => name.startsWith(first) && !HIDDEN.has(name))
    return matches.length === 1 ? `${matches[0]} ` : input
  }
  if (first === "open" || first === "cd") {
    const part = rest.join(" ").toLowerCase()
    const matches = targets().filter((name) => name.startsWith(part))
    return matches.length === 1 ? `${first} ${matches[0]}` : input
  }
  return input
}

export const Terminal = ({ onClose }: { onClose: () => void }) => {
  const { language, setLanguage, t } = useLayout()
  const copy = TERMINAL_COPY[language]
  const [lines, setLines] = useState<Line[]>(() =>
    copy.welcome.map((text, index) => ({ id: index, kind: "out", text })),
  )
  const [value, setValue] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [cursor, setCursor] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const logRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(copy.welcome.length)

  // Take focus on open and give it back on close.
  useEffect(() => {
    const previous = document.activeElement
    inputRef.current?.focus()
    return () => {
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [])

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight })
  }, [lines])

  const append = (kind: Line["kind"], texts: string[]) =>
    setLines((previous) => [
      ...previous,
      ...texts.map((text) => ({ id: nextId.current++, kind, text })),
    ])

  const run = (raw: string) => {
    const input = raw.trim()
    if (!input) return
    const [name = "", ...args] = input.split(/\s+/)
    setHistory((previous) => [...previous, input])
    setCursor(null)
    append("in", [input])

    const command = COMMANDS[name.toLowerCase()]
    if (!command) {
      append("err", [fillTemplate(copy.commandNotFound, { name })])
      return
    }
    const output = command.run({
      args,
      language,
      t,
      copy,
      setLanguage,
      close: onClose,
      clear: () => setLines([]),
      history: [...history, input],
    })
    if (!output) return
    if (Array.isArray(output)) append("out", output)
    else append("err", [output.error])
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    run(value)
    setValue("")
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault()
      onClose()
    } else if (event.key === "Tab") {
      event.preventDefault()
      setValue(complete(value))
    } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault()
      if (history.length === 0) return
      const delta = event.key === "ArrowUp" ? -1 : 1
      const from = cursor ?? history.length
      const next = Math.min(history.length, Math.max(0, from + delta))
      setCursor(next === history.length ? null : next)
      setValue(next === history.length ? "" : (history[next] ?? ""))
    } else if (event.key === "l" && event.ctrlKey) {
      event.preventDefault()
      setLines([])
    }
  }

  return (
    <div
      className="fixed inset-0 z-10000 flex items-end justify-center bg-black/85 p-3 backdrop-blur-sm md:items-center md:p-8"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t.terminal.label}
        className="flex h-[70dvh] w-full max-w-3xl flex-col border border-white/30 bg-black font-mono text-xs normal-case shadow-2xl md:h-[28rem] md:text-sm"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex items-center justify-between border-b border-white/20 px-3 py-2 text-[10px] tracking-widest text-neutral-500 uppercase md:text-xs">
          <span>
            {t.terminal.label} - {t.terminal.hint}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.terminal.close}
            className="cursor-pointer px-2 text-neutral-300 hover:text-white"
          >
            [x]
          </button>
        </div>

        <div ref={logRef} role="log" aria-live="polite" className="scrollbar-none flex-1 overflow-y-auto px-3 py-2">
          {lines.map((line) => (
            <div
              key={line.id}
              className={
                line.kind === "in"
                  ? "text-white"
                  : line.kind === "err"
                    ? "whitespace-pre-wrap text-red-400"
                    : "whitespace-pre-wrap text-neutral-300"
              }
            >
              {line.kind === "in" ? `$ ${line.text}` : line.text}
            </div>
          ))}
        </div>

        <div className="flex gap-2 overflow-x-auto border-t border-white/10 px-3 py-2 text-[10px] md:hidden">
          {["help", "projects", "contact", "resume"].map((command) => (
            <button
              key={command}
              type="button"
              onClick={() => run(command)}
              className="shrink-0 cursor-pointer border border-white/30 px-2 py-1 text-neutral-300 active:bg-white active:text-black"
            >
              {command}
            </button>
          ))}
        </div>

        <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-white/20 px-3 py-3">
          <span aria-hidden="true" className="text-neutral-500">
            $
          </span>
          <input
            ref={inputRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={onKeyDown}
            aria-label={t.terminal.label}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="go"
            className="min-w-0 flex-1 bg-transparent text-white caret-white outline-none"
          />
        </form>
      </div>
    </div>
  )
}
