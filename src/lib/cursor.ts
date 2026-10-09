/**
 * Text shown on the custom cursor (desktop only). A label comes from the
 * hovered element (`data-cursor="COPY"`), and `flashCursorLabel` shows a short
 * message for a moment, for example after copying the email address.
 */
let hoverLabel: string | null = null
let flashLabel: string | null = null
let flashTimer: ReturnType<typeof setTimeout> | undefined

const listeners = new Set<() => void>()
const notify = () => listeners.forEach((listener) => listener())

export const getCursorLabel = (): string | null => flashLabel ?? hoverLabel

export const subscribeCursor = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const setHoverLabel = (label: string | null) => {
  if (label === hoverLabel) return
  hoverLabel = label
  notify()
}

export const flashCursorLabel = (text: string, duration = 2400) => {
  clearTimeout(flashTimer)
  flashLabel = text
  notify()
  flashTimer = setTimeout(() => {
    flashLabel = null
    notify()
  }, duration)
}
