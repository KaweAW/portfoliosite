import { createContext } from "react"

export interface PreviewState {
  /** Last image shown. Kept after `hide` so it can fade out instead of vanishing. */
  src: string | null
  /** Optional silent loop shown instead of the image. */
  video: string | null
  visible: boolean
}

export interface PreviewActions {
  show: (src: string, video?: string) => void
  hide: () => void
}

/**
 * Two contexts on purpose: rows only need the (stable) actions, so they don't
 * re-render when the previewed image changes. Only `HoverPreview` reads the state.
 */
export const PreviewStateContext = createContext<PreviewState>({ src: null, video: null, visible: false })
export const PreviewActionsContext = createContext<PreviewActions | null>(null)
