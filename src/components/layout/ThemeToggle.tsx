import { useLayout } from "../../hooks/useLayout"
import { useTheme } from "../../hooks/useTheme"

/** Switches between the dark and the light theme. */
export const ThemeToggle = () => {
  const { t } = useLayout()
  const { theme, toggle } = useTheme()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? t.a11y.themeToLight : t.a11y.themeToDark}
      data-cursor="THEME"
      className="cursor-pointer text-neutral-500 transition-colors hover:text-white md:text-invert/60 md:hover:text-invert"
    >
      <span aria-hidden="true">[{theme === "dark" ? "◐" : "◑"}]</span>
    </button>
  )
}
