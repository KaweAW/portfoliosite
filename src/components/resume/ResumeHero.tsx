import { motion } from "framer-motion"
import { itemVariants } from "../../animations"
import { AVAILABLE_FOR_WORK, RESUME_FILES } from "../../data/contact"
import { RESUME_COPY } from "../../data/resumeCopy"
import { useLayout } from "../../hooks/useLayout"
import { HireButton } from "./HireButton"

/**
 * Photo, name, summary, the two main actions and a row of key figures.
 * Small screens: photo banner with the name resting on it. Desktop: text on
 * the left, a tall framed portrait on the right.
 */
export const ResumeHero = () => {
  const { language, t } = useLayout()
  const copy = RESUME_COPY[language]
  const file = RESUME_FILES[language]
  const { since, tests, lighthouse, status } = copy.stats
  const stats = [since, tests, lighthouse, { label: status.label, ...(AVAILABLE_FOR_WORK ? status.open : status.closed) }]
  const availability = AVAILABLE_FOR_WORK ? t.contact.availability.open : t.contact.availability.closed

  return (
    <motion.div variants={itemVariants} className="pb-8 md:pb-12">
      <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-12">
        <figure className="relative -mx-1 md:order-last md:col-start-8 md:row-start-1 md:col-span-5 md:row-span-2 md:mx-0 md:h-[58vh] md:min-h-[26rem] md:self-start">
          <img
            src="/kawe.webp"
            alt={copy.photoAlt}
            width={800}
            height={800}
            fetchPriority="high"
            className="aspect-[4/3] w-full object-cover object-[50%_30%] md:aspect-auto md:h-full md:object-[50%_25%]"
          />
          {/* Fades the photo into the page so the name can rest on it. */}
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black via-black/10 to-transparent md:hidden" />
          <div aria-hidden="true" className="absolute inset-0 hidden border border-white/20 md:block" />
          <figcaption className="absolute inset-x-0 bottom-0 hidden items-center justify-between gap-3 border-t border-white/20 bg-black/70 px-4 py-3 text-[10px] tracking-widest backdrop-blur-sm md:flex">
            <span className="flex items-center gap-2 text-ok">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ok" />
              {availability}
            </span>
            <span className="text-neutral-400">{copy.location}</span>
          </figcaption>
        </figure>

        <header className="relative -mt-14 md:col-span-7 md:mt-0 md:self-start">
          <p className="mb-3 text-[10px] tracking-widest text-neutral-400 md:text-xs md:text-neutral-500">◆ {copy.eyebrow}</p>
          <h1 className="text-6xl leading-[0.85] font-bold tracking-tighter md:text-8xl">
            KAWE
            <br />
            LONGON
          </h1>
          <p className="mt-4 text-[10px] tracking-widest text-neutral-400 md:text-xs">
            FRONT END ENGINEER · {copy.location}
          </p>
        </header>

        <div className="md:col-span-7 md:self-start">
          <p className="mt-5 max-w-2xl text-sm leading-relaxed tracking-normal text-neutral-400 normal-case md:mt-6 md:text-base">
            {copy.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`/${file}`}
              download={file}
              data-cursor={t.cursor.save}
              className="inline-flex items-center gap-2 bg-white px-4 py-3 text-[10px] font-bold tracking-widest text-black transition-opacity hover:opacity-80 md:text-xs"
            >
              {copy.download} <span aria-hidden="true">↓</span>
            </a>
            <HireButton>{copy.hire}</HireButton>
          </div>
        </div>
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-px border border-white/20 bg-white/20 md:mt-12 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1 bg-black p-4">
            <dt className="text-[10px] tracking-widest text-neutral-500">{stat.label}</dt>
            <dd className="text-2xl font-bold tracking-tighter md:text-3xl">{stat.value}</dd>
            <dd className="text-[10px] leading-snug tracking-normal text-neutral-400 normal-case">{stat.hint}</dd>
          </div>
        ))}
      </dl>
    </motion.div>
  )
}
