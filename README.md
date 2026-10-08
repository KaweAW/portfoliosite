# Kawe Longon | Interactive Portfolio

A minimalist, brutalist-inspired interactive portfolio built with **React 19**, **TypeScript**, **Tailwind CSS 4** and **Framer Motion**. Designed to feel like a digital canvas or a high-end terminal, focusing on typography, fluid animations, and a seamless user experience.

![Portfolio Preview](public/preview.webp)

## Features

- **Brutalist & minimalist UI:** dark by default, monospace typography, grid-based layout.
- **Mobile parallax scrolling:** scroll-linked parallax for images on mobile. Rendered only on mobile, so desktop never pays for it.
- **Desktop floating previews:** images follow the cursor on hover (and keyboard focus) with a spring.
- **URL-based views:** Home, Work, Timeline and Info live in the URL hash (`#/projects`, `#/timeline`, `#/contact`), so deep links and the browser back button work.
- **Scramble text effect:** text decoding animation for titles. Screen readers get the real text, and it is skipped for visitors who prefer reduced motion.
- **Five languages (EN, IT, FR, DE, RU):** picked from the browser language on first visit, remembered afterwards. Dates are formatted per language with `Intl`.
- **Resume download:** Italian or English PDF depending on the selected language.
- **Accessible by default:** skip link, `aria-current` navigation, labelled language switcher, visible keyboard focus, `prefers-reduced-motion` support, selectable text.

## Tech stack

- [React](https://react.dev/) 19 with strict [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Framer Motion](https://www.framer.com/motion/)

## Getting started

```bash
npm install
npm run dev        # development server
npm run build      # type-check + production build
npm run lint       # ESLint
npm run typecheck  # TypeScript only
npm run preview    # serve the production build locally
```

## Project structure

```text
├── public/                    # Static assets (images are WebP, max 1400px wide)
└── src/
    ├── animations/            # Framer Motion variants
    ├── components/
    │   ├── layout/            # Cursor, language switcher, navigation, hover preview, skip link
    │   ├── ui/                # PageShell, ParallaxImage, ScrambleText
    │   ├── views/             # HomeView, ProjectsView, TimelineView, ContactView
    │   └── ViewRouter.tsx     # Picks the view for the current URL hash
    ├── context/               # Layout (view + language + copy) and hover-preview state
    ├── data/                  # Content: projects, timeline, contact, translations, languages
    ├── hooks/                 # useLayout, useHashView, usePointer, useMediaQuery, usePreview
    ├── lib/                   # cn, date formatting, language detection/persistence
    ├── routes.ts              # View ids and their URL hashes
    └── types.ts               # Shared types (Translation, Project, TimelineEntry, ...)
```

Content that does not change between languages (URLs, images, dates) lives in `data/projects.ts` and `data/timeline.ts`. Only the text lives in `data/translations.ts`, keyed by id.

## Adding content

**A project**

1. Add its id to `ProjectId` in `src/types.ts`.
2. Add `{ id, url, image }` to `src/data/projects.ts` and put the image in `public/` (WebP, about 1400px wide).
3. Add `title` and `desc` under `projects.items` for every language in `src/data/translations.ts`.

TypeScript reports an error until every language has the new entry. Timeline entries work the same way with `TimelineId`, `data/timeline.ts` and `timeline.items`.

**A language**

1. Add the code to `Language` in `src/types.ts` and an entry to `LANGUAGES` in `src/data/languages.ts`.
2. Add a full `Translation` object to `src/data/translations.ts`, and a resume file in `src/data/contact.ts`.

## Performance notes

- Images in `public/` went from about 11 MB to under 1 MB (WebP, resized to what the layout can display).
- Mouse tracking uses Framer Motion values, so moving the mouse does not re-render React.
- Mobile parallax images are lazy-loaded and only mounted on mobile; the hover preview image loads on first hover.
- Only two runtime dependencies besides React: `framer-motion` and `clsx`.
