import type { ComponentType } from "react"
import { AnimatePresence } from "framer-motion"
import { useLayout } from "../hooks/useLayout"
import type { ViewId } from "../routes"
import { ContactView } from "./views/ContactView"
import { HomeView } from "./views/HomeView"
import { ProjectsView } from "./views/ProjectsView"
import { TimelineView } from "./views/TimelineView"

const VIEWS: Record<ViewId, ComponentType> = {
  home: HomeView,
  projects: ProjectsView,
  timeline: TimelineView,
  contact: ContactView,
}

export const ViewRouter = () => {
  const { view, language } = useLayout()
  const View = VIEWS[view]

  return (
    <AnimatePresence mode="wait">
      {/* Keyed by language too, so switching language replays the transition. */}
      <View key={`${view}-${language}`} />
    </AnimatePresence>
  )
}
