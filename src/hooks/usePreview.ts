import { useContext } from "react"
import {
  PreviewActionsContext,
  PreviewStateContext,
  type PreviewActions,
  type PreviewState,
} from "../context/preview-context"

export const usePreviewActions = (): PreviewActions => {
  const actions = useContext(PreviewActionsContext)
  if (!actions) throw new Error("usePreviewActions must be used within a PreviewProvider")
  return actions
}

export const usePreviewState = (): PreviewState => useContext(PreviewStateContext)
