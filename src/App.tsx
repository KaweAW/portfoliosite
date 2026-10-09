import { MotionConfig } from "framer-motion"
import { CustomCursor } from "./components/layout/CustomCursor"
import { HoverPreview } from "./components/layout/HoverPreview"
import { LanguageSwitcher } from "./components/layout/LanguageSwitcher"
import { Navigation } from "./components/layout/Navigation"
import { SkipLink } from "./components/layout/SkipLink"
import { StatusBadge } from "./components/layout/StatusBadge"
import { TerminalLauncher } from "./components/layout/TerminalLauncher"
import { ViewRouter } from "./components/ViewRouter"
import { LayoutProvider } from "./context/LayoutProvider"
import { PreviewProvider } from "./context/PreviewProvider"
import { MAIN_ID } from "./data/site"
import { usePointer } from "./hooks/usePointer"

export default function App() {
  const pointer = usePointer()

  return (
    // Visitors who ask for reduced motion keep fades but lose transforms and layout animations.
    <MotionConfig reducedMotion="user">
      <LayoutProvider>
        <PreviewProvider>
          <div className="h-dvh w-full overflow-hidden bg-black selection:bg-white selection:text-black">
            <SkipLink />
            <CustomCursor pointer={pointer} />
            <LanguageSwitcher />
            <Navigation />
            <TerminalLauncher />

            <main
              id={MAIN_ID}
              tabIndex={-1}
              className="relative h-full w-full overflow-hidden p-4 pb-24 text-fg outline-none md:p-8 md:pb-8"
            >
              <StatusBadge />
              <div className="relative z-10 flex h-full w-full flex-col">
                <ViewRouter />
              </div>
            </main>

            <HoverPreview pointer={pointer} />
          </div>
        </PreviewProvider>
      </LayoutProvider>
    </MotionConfig>
  )
}
