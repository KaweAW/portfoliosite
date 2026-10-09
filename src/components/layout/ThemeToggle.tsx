import { useId } from "react"
import { motion } from "framer-motion"
import { useLayout } from "../../hooks/useLayout"
import { useTheme } from "../../hooks/useTheme"
import { setHoverLabel } from "../../lib/cursor"

const SPRING = { type: "spring", stiffness: 140, damping: 18 } as const

/** Sun-and-moon button. One drawing morphs between the two: the rays fade and spin away while a circle cuts the sun into a crescent. */
export const ThemeToggle = () => {
  const { t } = useLayout()
  const { theme, toggle } = useTheme()
  const maskId = useId()
  const moon = theme === "dark"

  return (
    <button
      type="button"
      onClick={() => {
        toggle()
        // The label describes what the next click does, so it changes with the theme.
        setHoverLabel(moon ? t.cursor.dark : t.cursor.light)
      }}
      aria-label={moon ? t.a11y.themeToLight : t.a11y.themeToDark}
      data-cursor={moon ? t.cursor.light : t.cursor.dark}
      className="flex h-6 w-6 cursor-pointer items-center justify-center text-white transition-colors md:text-invert"
    >
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        animate={{ rotate: moon ? 40 : 90 }}
        transition={SPRING}
      >
        <mask id={maskId}>
          <rect x="0" y="0" width="24" height="24" fill="white" />
          <motion.circle fill="black" r="8" animate={{ cx: moon ? 17 : 30, cy: moon ? 6 : 0 }} transition={SPRING} />
        </mask>
        <motion.circle
          cx="12"
          cy="12"
          fill="currentColor"
          mask={`url(#${maskId})`}
          animate={{ r: moon ? 9 : 5 }}
          transition={SPRING}
        />
        <motion.g
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          style={{ transformOrigin: "12px 12px" }}
          animate={{ opacity: moon ? 0 : 1, scale: moon ? 0.4 : 1 }}
          transition={SPRING}
        >
          <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" />
        </motion.g>
      </motion.svg>
    </button>
  )
}
