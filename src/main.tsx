import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App"
import { migrateLegacyHash } from "./lib/navigation"

// Old links look like /#/projects: turn them into /projects before anything reads the URL.
migrateLegacyHash()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
