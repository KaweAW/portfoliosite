"use client"
import React, { createContext, useContext, useState } from "react"

export type Language = "EN" | "IT" | "FR" | "DE" | "RU"

interface LayoutContextType {
  currentView: string
  setCurrentView: (view: string) => void
  language: Language
  setLanguage: (lang: Language) => void
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentView, setCurrentView] = useState("HOME")
  const [language, setLanguage] = useState<Language>("EN") 

  return (
    <LayoutContext.Provider value={{ currentView, setCurrentView, language, setLanguage }}>
      {children}
    </LayoutContext.Provider>
  )
}

export const useLayout = () => {
  const context = useContext(LayoutContext)
  if (!context) throw new Error("useLayout must be used within a LayoutProvider")
  return context
}