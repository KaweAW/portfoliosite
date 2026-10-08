import { LANGUAGES } from "../../data/languages"
import { useLayout } from "../../hooks/useLayout"
import { cn } from "../../lib/cn"

export const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLayout()

  return (
    <div
      role="group"
      aria-label={t.a11y.languageSwitcher}
      className="fixed top-4 left-4 z-9999 flex gap-3 border border-white/10 bg-black/50 p-2 font-mono text-xs tracking-widest text-white mix-blend-difference backdrop-blur-sm select-none md:top-8 md:left-8 md:border-transparent md:bg-transparent md:p-0 md:backdrop-blur-none"
    >
      {LANGUAGES.map(({ code, locale, nativeName }) => {
        const isActive = code === language
        return (
          <button
            key={code}
            type="button"
            lang={locale}
            aria-label={nativeName}
            aria-pressed={isActive}
            onClick={() => setLanguage(code)}
            className={cn(
              "cursor-pointer transition-colors",
              isActive ? "font-bold text-white" : "text-neutral-500 hover:text-white",
            )}
          >
            [{code}]
          </button>
        )
      })}
    </div>
  )
}
