import { motion } from "framer-motion"
import { itemVariants } from "../../animations"
import { CONTACT, RESUME_FILES } from "../../data/contact"
import { useLayout } from "../../hooks/useLayout"
import { PageHeader, PageShell } from "../ui/PageShell"

export const ContactView = () => {
  const { t, language } = useLayout()
  const resumeFile = RESUME_FILES[language]

  const contacts = [
    { id: "email", label: t.info.contacts.email, value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { id: "github", label: "GitHub", value: CONTACT.githubDisplay, href: CONTACT.github },
    { id: "linkedin", label: "LinkedIn", value: CONTACT.linkedinDisplay, href: CONTACT.linkedin },
  ]

  return (
    <PageShell className="pt-16 md:pt-24">
      <PageHeader title={t.info.title} />

      <div className="scrollbar-none mt-4 flex flex-col gap-8 overflow-y-auto pb-4 md:mt-6 md:flex-row md:gap-12">
        <div className="flex-1 px-2 md:px-0">
          <motion.h2
            variants={itemVariants}
            className="mb-4 text-[10px] tracking-widest opacity-50 md:mb-6 md:text-xs"
          >
            {t.info.contactProtocols}
          </motion.h2>

          <ul className="flex flex-col gap-4">
            {contacts.map((contact) => {
              const isExternal = contact.href.startsWith("http")
              return (
                <motion.li key={contact.id} variants={itemVariants}>
                  <a
                    href={contact.href}
                    {...(isExternal && { target: "_blank", rel: "noreferrer" })}
                    className="group flex flex-col items-start border-b border-white/20 pb-3 text-neutral-400 transition-all active:text-white md:flex-row md:items-end md:justify-between md:pb-2 md:hover:text-white"
                  >
                    <span className="mb-1 text-[10px] md:mb-0 md:text-xs">[{contact.label}]</span>
                    <span className="text-sm break-all transition-colors md:px-2 md:text-xl md:group-hover:bg-white md:group-hover:text-black">
                      {contact.value}
                    </span>
                    {isExternal && <span className="sr-only">{t.a11y.opensInNewTab}</span>}
                  </a>
                </motion.li>
              )
            })}
          </ul>
        </div>

        <div className="mt-4 flex flex-1 flex-col items-start justify-start px-2 md:mt-0 md:items-end md:px-0">
          <motion.h2
            variants={itemVariants}
            className="mb-4 text-[10px] tracking-widest opacity-50 md:mb-6 md:text-xs"
          >
            {t.info.dataExtract}
          </motion.h2>

          <motion.a
            variants={itemVariants}
            href={`/${resumeFile}`}
            download={resumeFile}
            className="group relative block w-full border border-white p-4 text-left transition-colors active:bg-white active:text-black md:w-auto md:p-6 md:text-right md:hover:bg-white md:hover:text-black"
          >
            <div className="mb-2 text-[10px] uppercase opacity-50 md:mb-4 md:text-xs md:group-hover:text-black">
              {resumeFile}
            </div>
            <div className="flex items-center justify-between gap-4 text-2xl font-bold tracking-tighter md:gap-8 md:text-4xl">
              <span>{t.info.download}</span>
              <span aria-hidden="true" className="animate-bounce">
                ↓
              </span>
            </div>
          </motion.a>
        </div>
      </div>
    </PageShell>
  )
}
