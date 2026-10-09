export type Theme = "dark" | "light"

const STORAGE_KEY = "kl-theme"
const THEME_COLOR: Record<Theme, string> = { dark: "#000000", light: "#f3f0e8" }

const listeners = new Set<() => void>()
const notify = () => listeners.forEach((listener) => listener())

const stored = (): Theme | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === "light" || value === "dark" ? value : null
  } catch {
    return null
  }
}

const systemTheme = (): Theme =>
  typeof matchMedia === "function" && matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"

const apply = (theme: Theme) => {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[theme])
  notify()
}

/** Theme currently shown. The script in index.html sets it before the first paint. */
export const getTheme = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark")

/** Saves the choice, so it wins over the system setting from now on. */
export const setTheme = (theme: Theme) => {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Storage can be blocked (private mode): the choice then lasts until the page closes.
  }
  apply(theme)
}

/** Follows the system setting while the visitor has not picked a theme. Returns a cleanup function. */
export const followSystemTheme = (): (() => void) => {
  const query = matchMedia("(prefers-color-scheme: light)")
  const onChange = () => {
    if (!stored()) apply(systemTheme())
  }
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

export const subscribeTheme = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
