import { clsx, type ClassValue } from "clsx"

/**
 * Joins class names, skipping falsy values. Callers must not pass conflicting
 * Tailwind utilities (e.g. two paddings): there is no merge step on purpose,
 * to keep tailwind-merge out of the bundle.
 */
export const cn = (...inputs: ClassValue[]): string => clsx(inputs)
