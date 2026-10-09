import type { ComponentType } from "react"
import { AnimatePresence } from "framer-motion"
import { useLayout } from "../hooks/useLayout"
import type { ViewId } from "../routes"
import { ContactView } from "./views/ContactView"
import { HomeView } from "./views/HomeView"
import { ProjectDetailView } from "./views/ProjectDetailView"
import { ProjectsView } from "./views/ProjectsView"
import { ResumeView } from "./views/ResumeView"

const VIEWS: Record<ViewId, ComponentType> = {
  home: HomeView,
  resume: ResumeView,
  projects: ProjectsView,
  contact: ContactView,
}

export const ViewRouter = () => {
  const { view, project, language } = useLayout()
  const View = project ? ProjectDetailView : VIEWS[view]

  return (
    <AnimatePresence mode="wait">
      {/* Keyed by language too, so switching language replays the transition. */}
      <View key={`${view}-${project?.id ?? ""}-${language}`} />
    </AnimatePresence>
  )
}
