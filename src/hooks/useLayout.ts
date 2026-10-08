import { useContext } from "react"
import { LayoutContext, type LayoutContextValue } from "../context/layout-context"

export const useLayout = (): LayoutContextValue => {
  const context = useContext(LayoutContext)
  if (!context) throw new Error("useLayout must be used within a LayoutProvider")
  return context
}
