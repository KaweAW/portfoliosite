"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { useLayout } from "../context/LayoutContext"
import { ScrambleText } from "./ui/ScrambleText"
import { ParallaxImage } from "./ui/ParallaxImage"
import { TRANSLATIONS } from "../data/translations"
import { pageVariants, itemVariants } from "../animations"

export const DynamicCanvas = () => {
  const { currentView, setCurrentView, language } = useLayout()
  const [hoveredImage, setHoveredImage] = useState<string | null>(null)

  const projectsScrollRef = useRef<HTMLDivElement>(null)
  const timelineScrollRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const t = TRANSLATIONS[language]

  const CONTACTS = [
    { label: t.info.contacts.phone, value: "+39 378 0639 622", href: "tel:+393780639622" },
    { label: t.info.contacts.email, value: "KAWE.LONGON@GMAIL.COM", href: "mailto:kawe.longon@gmail.com" },
    { label: t.info.contacts.whatsapp, value: t.info.contacts.start_chat, href: "https://wa.me/393780639622" },
  ]

  const isItalian = language === "IT"
  const fileName = isItalian ? "cv_kawe_longon.pdf" : "resume-kawe-longon.pdf"

  const handleDownloadCV = () => {
    const link = document.createElement("a")
    link.href = `/${fileName}`
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="w-full h-full overflow-hidden relative bg-black text-[#e0e0e0] font-mono uppercase p-4 md:p-8 flex flex-col justify-between pb-24 md:pb-8">

      <AnimatePresence>
        {hoveredImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 5 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 left-0 w-80 h-48 pointer-events-none z-50 hidden md:block overflow-hidden shadow-2xl border border-white/20"
            style={{
              x: springX,
              y: springY,
              translateX: "-50%",
              translateY: "-50%"
            }}
          >
            <img src={hoveredImage} alt="Preview" className="w-full h-full object-cover grayscale md:hover:grayscale-0 transition-all duration-500" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-24 right-8 text-xs tracking-widest opacity-50 hidden md:block text-right z-20 mix-blend-difference md:bottom-8">
        [ SYSTEM ONLINE ]<br />
        LAT: 45.66 / LON: 11.93
      </div>

      <div className="relative z-10 w-full h-full flex flex-col">
        <AnimatePresence mode="wait">
          
          {/* HOME */}
          {currentView === "HOME" && (
            <motion.div key={`home-${language}`} variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full h-full flex flex-col items-center justify-center relative">

              <motion.img 
                src="/Firma.png" 
                alt="Kawe Longon Signature" 
                initial={{ opacity: 0, scale: 0.95, y: "-50%", x: "-50%" }}
                animate={{ opacity: 0.4, scale: 1, y: "-50%", x: "-50%" }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
                className="absolute top-1/2 left-1/2 w-[80vw] md:w-[45vw] max-w-3xl pointer-events-none select-none -z-10 object-contain"
                style={{
                }}
              />

              <motion.h1 
                variants={itemVariants} 
                className="relative z-10 text-[14vw] md:text-[10vw] leading-none font-bold tracking-tighter text-center cursor-pointer hover:text-white transition-colors whitespace-nowrap text-[#e0e0e0] drop-shadow-2xl" 
                onClick={() => setCurrentView("PROJECTS")}
              >
                <ScrambleText text="KAWE LONGON" />
              </motion.h1>
              
              <motion.div 
                variants={itemVariants} 
                className="relative z-10 mt-4 md:mt-8 text-[10px] md:text-sm tracking-[0.5em] text-neutral-500 text-center uppercase"
              >
                {t.home.subtitle}
              </motion.div>
            </motion.div>
          )}

          {/* PROJECTS */}
          {currentView === "PROJECTS" && (
            <motion.div key={`projects-${language}`} variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full h-full pt-16 md:pt-24 flex flex-col">
              <motion.div variants={itemVariants} className="flex justify-between items-end border-b border-white/20 pb-4 mb-4 md:mb-8">
                <h1 className="text-4xl md:text-8xl font-bold tracking-tighter">{t.headers.work}</h1>
                <div className="text-[10px] md:text-xs tracking-widest text-neutral-500">{t.projects.dir}</div>
              </motion.div>
              
              <div ref={projectsScrollRef} className="flex-1 overflow-y-auto pr-2 md:pr-4 scrollbar-none pb-4 md:pb-0">
                <div className="flex flex-col border-t border-white/10">
                  {t.projects.items.map((p: any) => (
                    <motion.a 
                      variants={itemVariants} key={p.id} href={p.url} target="_blank" rel="noreferrer"
                      onMouseEnter={() => p.img && setHoveredImage(p.img)}
                      onMouseLeave={() => setHoveredImage(null)}
                      className="group flex flex-col justify-between border-b border-white/10 py-6 md:py-10 px-2 md:px-4 active:bg-white active:text-black md:hover:bg-white md:hover:text-black transition-colors duration-300 cursor-pointer relative"
                    >
                      <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center relative z-10">
                      <div className="text-2xl md:text-5xl font-bold tracking-tighter w-full md:w-1/2 mb-2 md:mb-0">
                        {p.title}
                      </div>
                        <div className="flex flex-col items-start md:items-end w-full md:w-1/2">
                          <span className="text-[10px] md:text-xs opacity-50 mb-1">ID: {p.id}</span>
                          <span className="text-[10px] md:text-xs text-left md:text-right w-full md:max-w-sm text-neutral-400 md:group-hover:text-black">{p.desc}</span>
                        </div>
                      </div>

                      {p.img && (
                        <ParallaxImage src={p.img} alt={p.title} containerRef={projectsScrollRef} />
                      )}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* PRESENTATION (TIMELINE) */}
          {currentView === "PRESENTATION" && (
            <motion.div key={`presentation-${language}`} variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full h-full pt-16 md:pt-24 flex flex-col">
              <motion.div variants={itemVariants} className="flex justify-between items-end border-b border-white/20 pb-4 mb-4 md:mb-8">
                <h1 className="text-4xl md:text-8xl font-bold tracking-tighter">{t.timeline.title}</h1>
              </motion.div>

              <div ref={timelineScrollRef} className="flex-1 overflow-y-auto scrollbar-none pb-4 md:pb-0">
                {t.timeline.items.map((item: any, index: number) => (
                  <motion.div 
                    variants={itemVariants} key={index} 
                    onMouseEnter={() => item.img && setHoveredImage(item.img)}
                    onMouseLeave={() => setHoveredImage(null)}
                    className="flex flex-col border-b border-white/10 py-5 active:bg-white/5 md:hover:bg-white/5 transition-colors group px-2 md:px-0"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-2 w-full">
                      <div className="md:col-span-3 text-neutral-300 md:text-neutral-500 text-[10px] md:text-xs group-hover:text-white transition-colors">
                        <span className="bg-white/10 md:bg-transparent px-2 py-1 md:p-0 inline-block mb-1 md:mb-0">[{item.date}]</span>
                      </div>
                      <div className="md:col-span-4 font-bold text-base md:text-xl tracking-tighter leading-tight">
                        <ScrambleText text={item.title} />
                      </div>
                      <div className="md:col-span-5 text-[10px] md:text-xs text-neutral-400 group-hover:text-neutral-200 normal-case mt-1 md:mt-0">
                        {item.desc}
                      </div>
                    </div>
                    
                    {item.img && (
                      <ParallaxImage src={item.img} alt={item.title} containerRef={timelineScrollRef} />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CONTACT & CV */}
          {currentView === "CONTACT" && (
            <motion.div key={`contact-${language}`} variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full h-full pt-16 md:pt-24 flex flex-col">
              <motion.div variants={itemVariants} className="flex justify-between items-end border-b border-white/20 pb-4 mb-4 md:mb-8">
                <h1 className="text-4xl md:text-8xl font-bold tracking-tighter">{t.headers.info}</h1>
              </motion.div>
              
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 mt-4 md:mt-6 overflow-y-auto scrollbar-none pb-4">
                <div className="flex-1 px-2 md:px-0">
                  <motion.h3 variants={itemVariants} className="text-[10px] md:text-xs tracking-widest opacity-50 mb-4 md:mb-6">{t.info.contact_protocols}</motion.h3>
                  <div className="flex flex-col gap-4">
                    {CONTACTS.map((c, i) => (
                      <motion.a variants={itemVariants} key={i} href={c.href} target="_blank" rel="noreferrer" className="flex flex-col md:flex-row md:justify-between items-start md:items-end border-b border-white/20 pb-3 md:pb-2 active:text-white md:hover:text-white transition-all text-neutral-400 group">
                        <span className="text-[10px] md:text-xs mb-1 md:mb-0">[{c.label}]</span>
                        <span className="text-sm md:text-xl md:group-hover:bg-white md:group-hover:text-black md:px-2 transition-colors break-all">{c.value}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-start items-start md:items-end px-2 md:px-0 mt-4 md:mt-0">
                  <motion.h3 variants={itemVariants} className="text-[10px] md:text-xs tracking-widest opacity-50 mb-4 md:mb-6">{t.info.data_extract}</motion.h3>
                  <motion.button variants={itemVariants} onClick={handleDownloadCV} className="group relative border border-white p-4 md:p-6 active:bg-white active:text-black md:hover:bg-white md:hover:text-black transition-colors w-full md:w-auto text-left md:text-right cursor-pointer">
                    <div className="text-[10px] md:text-xs opacity-50 mb-2 md:mb-4 md:group-hover:text-black uppercase">{fileName}</div>
                    <div className="text-2xl md:text-4xl font-bold tracking-tighter flex items-center justify-between gap-4 md:gap-8">
                      <span>{t.info.download}</span>
                      <span className="animate-bounce">↓</span>
                    </div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}