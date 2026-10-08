import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react"
import { CONTACT, RESUME_FILES } from "../../data/contact"
import { LANGUAGES } from "../../data/languages"
import { PROJECTS } from "../../data/projects"
import { useLayout } from "../../hooks/useLayout"
import { navigate } from "../../lib/navigation"
import { hrefFor, projectHref, VIEW_IDS } from "../../routes"
import type { Language, Translation } from "../../types"

interface Line {
  id: number
  kind: "in" | "out" | "err"
  text: string
}

interface CommandContext {
  args: string[]
  language: Language
  t: Translation
  setLanguage: (language: Language) => void
  close: () => void
  clear: () => void
  history: string[]
}

type Output = string[] | { error: string }

interface Command {
  help: string
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

const open = ({ args, close }: CommandContext): Output => {
  const target = args[0]
  if (!target) return { error: "usage: open <number | project | page>   (try: ls projects)" }
  const path = resolveTarget(target)
  if (!path) return { error: `no such page: ${target}` }
  close()
  navigate(path)
  return []
}

const COMMANDS: Record<string, Command> = {
  help: {
    help: "show this list",
    run: () => [
      ...Object.entries(COMMANDS)
        .filter(([name]) => !HIDDEN.has(name))
        .map(([name, command]) => `${pad(name, 12)}${command.help}`),
      "",
      "tab completes, arrow up/down browse history, esc closes",
    ],
  },
  ls: {
    help: "list pages, or `ls projects`",
    run: (context) =>
      context.args[0] === "projects" ? projectList(context) : [VIEW_IDS.join("   ")],
  },
  projects: { help: "list projects", run: projectList },
  open: { help: "open a project or page: open 1, open scaletta, open contact", run: open },
  cd: { help: "same as open", run: open },
  whoami: {
    help: "who is this",
    run: () => [
      "kawe longon",
      "frontend developer",
      "react, typescript, next.js, tailwind css",
      "type `projects` to see what i built",
    ],
  },
  contact: {
    help: "how to reach me",
    run: () => [
      `${pad("email", 10)}${CONTACT.email}`,
      `${pad("github", 10)}${CONTACT.githubDisplay}`,
      `${pad("linkedin", 10)}${CONTACT.linkedinDisplay}`,
    ],
  },
  email: {
    help: "write me an email",
    run: () => {
      window.location.href = `mailto:${CONTACT.email}`
      return ["opening your mail app..."]
    },
  },
  github: {
    help: "open my GitHub",
    run: () => {
      window.open(CONTACT.github, "_blank", "noopener,noreferrer")
      return ["opening github..."]
    },
  },
  linkedin: {
    help: "open my LinkedIn",
    run: () => {
      window.open(CONTACT.linkedin, "_blank", "noopener,noreferrer")
      return ["opening linkedin..."]
    },
  },
  resume: {
    help: "download my resume (in the current language)",
    run: ({ language }) => {
      const file = RESUME_FILES[language]
      const link = document.createElement("a")
      link.href = `/${file}`
      link.download = file
      link.click()
      return [`downloading ${file}...`]
    },
  },
  lang: {
    help: "show or change the language: lang it",
    run: ({ args, language, setLanguage }) => {
      const codes = LANGUAGES.map((item) => item.code)
      const wanted = args[0]?.toUpperCase()
      if (!wanted) return [`current: ${language}`, `available: ${codes.join(" ")}`]
      const match = codes.find((code) => code === wanted)
      if (!match) return { error: `unknown language: ${args[0]} (available: ${codes.join(" ")})` }
      setLanguage(match)
      return [`language set to ${match}`]
    },
  },
  history: {
    help: "commands typed so far",
    run: ({ history }) => history.map((entry, index) => `${String(index + 1).padStart(2, " ")}  ${entry}`),
  },
  clear: {
    help: "clear the screen",
    run: ({ clear }) => {
      clear()
    },
  },
  exit: {
    help: "close the terminal",
    run: ({ close }) => {
      close()
    },
  },
  sudo: {
    help: "",
    run: ({ args }) =>
      args.join(" ").toLowerCase() === "hire me"
        ? [
            "[sudo] permission granted.",
            `sending your offer to ${CONTACT.email} ... just kidding, write me an email: type \`email\``,
          ]
        : { error: "kawe is not in the sudoers file. This incident will be reported." },
  },
}

/** Commands that exist but are not worth listing in `help`. */
const HIDDEN = new Set(["cd", "sudo"])

const WELCOME = ["KwLngn terminal", "type `help` to see the commands"]

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
  const [lines, setLines] = useState<Line[]>(() =>
    WELCOME.map((text, index) => ({ id: index, kind: "out", text })),
  )
  const [value, setValue] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [cursor, setCursor] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const logRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(WELCOME.length)

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
      append("err", [`command not found: ${name}. Type \`help\`.`])
      return
    }
    const output = command.run({
      args,
      language,
      t,
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
