import { useCallback, useEffect, useSyncExternalStore } from "react"
import { followSystemTheme, getTheme, setTheme, subscribeTheme, type Theme } from "../lib/theme"

export const useTheme = (): { theme: Theme; toggle: () => void } => {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => "dark" as Theme)
  useEffect(followSystemTheme, [])
  const toggle = useCallback(() => setTheme(getTheme() === "dark" ? "light" : "dark"), [])
  return { theme, toggle }
}
