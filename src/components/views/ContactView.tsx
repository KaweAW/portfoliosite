import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { itemVariants } from "../../animations"
import { AvailabilityBadge } from "../contact/AvailabilityBadge"
import { BriefForm } from "../contact/BriefForm"
import { CopyEmail } from "../contact/CopyEmail"
import { CONTACT } from "../../data/contact"
import { useLayout } from "../../hooks/useLayout"
import { PageShell } from "../ui/PageShell"

interface CardProps {
  icon: string
  title: string
  hint: string
  href: string
  external?: boolean
  action?: ReactNode
}

/** One row of the contact list: an icon, a title, a short hint and an arrow. */
const ContactCard = ({ icon, title, hint, href, external, action }: CardProps) => {
  const { t } = useLayout()
  return (
    <motion.li variants={itemVariants} className="flex items-stretch border border-white/20 transition-colors hover:border-white/50">
      <a
        href={href}
        {...(external && { target: "_blank", rel: "noreferrer" })}
        className="group flex min-w-0 flex-1 items-center gap-4 p-4 transition-colors md:hover:bg-white/5"
      >
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-xs text-neutral-400"
        >
          {icon}
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="text-sm font-bold tracking-tight md:text-base">{title}</span>
          <span className="truncate text-[10px] text-neutral-400 normal-case md:text-xs">{hint}</span>
        </span>
        <span aria-hidden="true" className="text-neutral-400 transition-transform md:group-hover:translate-x-1">
          →
        </span>
        {external && <span className="sr-only">{t.a11y.opensInNewTab}</span>}
      </a>
      {action}
    </motion.li>
  )
}

export const ContactView = () => {
  const { t } = useLayout()
  const copy = t.contact

  return (
    <PageShell className="pt-16 md:pt-24">
      <div className="scrollbar-none grid flex-1 grid-cols-1 gap-8 overflow-y-auto px-1 pb-4 md:grid-cols-2 md:gap-12 md:px-0">
        <div className="flex flex-col gap-6 md:sticky md:top-0 md:gap-8 md:self-start">
          <div>
            <motion.p variants={itemVariants} className="mb-3 text-[10px] tracking-widest text-neutral-500 md:text-xs">
              ◆ {copy.eyebrow}
            </motion.p>
            <motion.h1 variants={itemVariants} className="text-4xl leading-none font-bold tracking-tighter md:text-7xl">
              {copy.headline}
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mt-4 max-w-xl text-sm leading-relaxed tracking-normal text-neutral-400 normal-case md:mt-6 md:text-base"
            >
              {copy.intro}
            </motion.p>
            <motion.div variants={itemVariants} className="mt-5">
              <AvailabilityBadge />
            </motion.div>
          </div>

          <ul className="flex flex-col gap-3">
            <ContactCard
              icon="@"
              title={copy.cards.emailTitle}
              hint={CONTACT.email}
              href={`mailto:${CONTACT.email}`}
              action={<CopyEmail />}
            />
            <ContactCard icon="in" title="LinkedIn" hint={copy.cards.linkedinHint} href={CONTACT.linkedin} external />
            <ContactCard icon="</>" title="GitHub" hint={copy.cards.githubHint} href={CONTACT.github} external />
          </ul>

          <motion.div variants={itemVariants} className="border border-dashed border-white/30 p-4 md:p-5">
            <h2 className="mb-2 text-[10px] tracking-widest text-ok md:text-xs">◆ {copy.include.title}</h2>
            <p className="text-xs leading-relaxed tracking-normal text-neutral-400 normal-case md:text-sm">{copy.include.body}</p>
          </motion.div>
        </div>

        <motion.section
          variants={itemVariants}
          aria-labelledby="brief-title"
          className="h-fit border border-white/20 p-4 md:p-6"
        >
          <h2 id="brief-title" className="mb-5 border-b border-white/20 pb-4 text-xl font-bold tracking-tighter md:text-2xl">
            {copy.form.title}
          </h2>
          <BriefForm />
        </motion.section>
      </div>
    </PageShell>
  )
}
