"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LayoutProvider, useLayout, type Language } from "./context/LayoutContext"
import { DynamicCanvas } from "./components/DynamicCanvas"
import { TRANSLATIONS } from "./data/translations"

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }
    window.addEventListener("mousemove", updateMousePosition)
    return () => window.removeEventListener("mousemove", updateMousePosition)
  }, [isVisible])

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-9999 mix-blend-difference bg-white hidden md:block"
      animate={{ 
        x: mousePosition.x - 16, 
        y: mousePosition.y - 16,
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
    />
  )
}

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLayout()
  const languages: Language[] = ["EN", "IT", "FR", "DE", "RU"]

  return (
    <div className="fixed top-4 left-4 md:top-8 md:left-8 z-9999 flex gap-3 font-mono text-xs md:text-xs tracking-widest mix-blend-difference text-white bg-black/50 md:bg-transparent p-2 md:p-0 backdrop-blur-sm md:backdrop-blur-none border border-white/10 md:border-transparent">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`cursor-pointer transition-colors ${
            language === lang ? "text-white font-bold" : "text-neutral-500 hover:text-white"
          }`}
        >
          [{lang}]
        </button>
      ))}
    </div>
  )
}

const FloatingNavigation = () => {
  const { currentView, setCurrentView, language } = useLayout()
  const text = TRANSLATIONS[language].nav
  
  const menuItems = [
    { id: "HOME", label: "// INDEX" },
    { id: "PROJECTS", label: text.work },
    { id: "PRESENTATION", label: text.timeline },
    { id: "CONTACT", label: "// INFO" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 w-full md:bottom-auto md:top-8 md:right-8 md:left-auto md:w-auto z-9999 flex justify-between md:justify-end gap-2 md:gap-8 font-mono text-[10px] md:text-xs tracking-widest text-white bg-black md:bg-transparent border-t border-white/20 md:border-none p-4 md:p-0 md:mix-blend-difference">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setCurrentView(item.id)}
          className={`cursor-pointer transition-colors py-1 relative flex-1 md:flex-none text-center ${
            currentView === item.id ? "text-white" : "text-neutral-400 hover:text-white"
          }`}
        >
          {item.label}
          {currentView === item.id && (
            <motion.span layoutId="nav-underline" className="absolute bottom-0 md:-bottom-1 left-0 w-full h-px bg-white hidden md:block" />
          )}
        </button>
      ))}
    </nav>
  )
}

export default function App() {
  return (
    <LayoutProvider>
      <div className="w-full h-dvh overflow-hidden bg-black font-mono selection:bg-white selection:text-black antialiased select-none">
        <CustomCursor />
        <LanguageSwitcher />
        <FloatingNavigation />
        <main className="w-full h-full">
          <DynamicCanvas />
        </main>
      </div>
    </LayoutProvider>
  )
}