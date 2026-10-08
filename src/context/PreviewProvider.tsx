import { useMemo, useState, type ReactNode } from "react"
import {
  PreviewActionsContext,
  PreviewStateContext,
  type PreviewActions,
  type PreviewState,
} from "./preview-context"

export const PreviewProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<PreviewState>({ src: null, visible: false })

  const actions = useMemo<PreviewActions>(
    () => ({
      show: (src) => setState({ src, visible: true }),
      // Returning the same object skips the re-render when nothing was visible.
      hide: () => setState((prev) => (prev.visible ? { ...prev, visible: false } : prev)),
    }),
    [],
  )

  return (
    <PreviewActionsContext.Provider value={actions}>
      <PreviewStateContext.Provider value={state}>{children}</PreviewStateContext.Provider>
    </PreviewActionsContext.Provider>
  )
}
