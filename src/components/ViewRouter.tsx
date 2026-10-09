import type { ComponentType } from "react"
import { useEffect, useRef } from "react"
import { AnimatePresence, motion, useAnimationControls } from "framer-motion"
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

  // Switching language does not remount the page: scroll position and what is typed in the form stay.
  // Titles decode into the new language (ScrambleText) and the rest of the page fades in with it.
  const controls = useAnimationControls()
  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    void controls.start({ opacity: [0.2, 1], transition: { duration: 0.5, ease: "easeOut" } })
  }, [language, controls])

  return (
    <motion.div animate={controls} className="flex h-full w-full flex-col">
      <AnimatePresence mode="wait">
        <View key={`${view}-${project?.id ?? ""}`} />
      </AnimatePresence>
    </motion.div>
  )
}
