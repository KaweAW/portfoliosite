# Kawe Longon | Interactive Portfolio

A minimalist, brutalist-inspired interactive portfolio built with **React**, **Tailwind CSS**, and **Framer Motion**. Designed to feel like a digital canvas or a high-end terminal, focusing on typography, fluid animations, and a seamless user experience.

![Portfolio Preview](./public/preview-image.png) <!-- Add a screenshot of your site here and name it preview-image.png in the public folder -->

## ✨ Features

- ⬛ **Brutalist & Minimalist UI:** Dark mode by default, monospace typography, and a grid-based layout.
- 📱 **Mobile Parallax Scrolling:** Custom scroll-linked parallax effects for images on mobile devices, providing a native-feeling depth without heavy external libraries.
- 🖱️ **Desktop Floating Previews:** Images smoothly follow the cursor on hover using physics-based spring animations.
- 🔀 **Dynamic Canvas Routing:** A Single Page Application (SPA) feel that transitions seamlessly between Home, Projects, Experience, and Contact views without page reloads.
- 🔠 **Scramble Text Effect:** Cyberpunk-style text decoding animations for titles and navigation.
- 🌍 **Bilingual Support (i18n):** Built-in lightweight context for quick switching between English, Italian, German and Russian (`translations.ts`).
- 📄 **Resume Integration:** Dedicated section for quick PDF resume downloads based on the selected language.

## 🛠️ Tech Stack

- **Framework:** [React](https://reactjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)

---

## 📂 Project Architecture & Directory Structure

The repository follows a modular architecture that strictly separates global application state, static multilingual content, and isolated layout components.

├── public/                  # Static assets
│   ├── Firma.png            # Elegant background watermark
│   ├── cv_kawe_longon.pdf   # Italian resume asset
│   └── resume-kawe-longon.pdf # English resume asset
├── src/
│   ├── animations/          # Global animation presets and variants
│   ├── components/
│   │   ├── DynamicCanvas.tsx # The core container / View router
│   │   └── ui/              # Reusable low-level UI components
│   │       ├── ParallaxImage.tsx # Native mobile parallax handler
│   │       └── ScrambleText.tsx  # Generative text decoding matrix
│   ├── context/
│   │   └── LayoutContext.tsx # Central React Context (Global state)
│   └── data/
│       └── translations.ts  # Structured dictionary for EN / IT / DE / RU