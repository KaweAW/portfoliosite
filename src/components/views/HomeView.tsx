import { motion } from "framer-motion"
import { itemVariants } from "../../animations"
import { useLayout } from "../../hooks/useLayout"
import { hrefFor } from "../../routes"
import { PageShell } from "../ui/PageShell"
import { ScrambleText } from "../ui/ScrambleText"

export const HomeView = () => {
  const { t } = useLayout()

  return (
    <PageShell className="relative items-center justify-center">
      <motion.img
        src="/Firma.webp"
        alt=""
        width={454}
        height={252}
        decoding="async"
        initial={{ opacity: 0, scale: 0.95, y: "-50%", x: "-50%" }}
        animate={{ opacity: 0.4, scale: 1, y: "-50%", x: "-50%" }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 w-[80vw] max-w-3xl object-contain select-none md:w-[45vw] in-data-[theme=light]:invert"
      />

      <motion.h1
        variants={itemVariants}
        className="relative z-10 text-center text-[14vw] leading-none font-bold tracking-tighter whitespace-nowrap text-fg drop-shadow-2xl md:text-[10vw]"
      >
        <a href={hrefFor("projects")} className="transition-colors hover:text-white">
          <ScrambleText text="KAWE LONGON" />
        </a>
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="relative z-10 mt-4 text-center text-[10px] tracking-[0.5em] text-neutral-500 md:mt-8 md:text-sm"
      >
        {t.home.subtitle}
      </motion.p>
    </PageShell>
  )
}
