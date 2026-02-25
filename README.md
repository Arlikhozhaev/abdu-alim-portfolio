# macOS Portfolio — Abdu Alim Arlikhozhaev

A fully interactive, macOS-inspired developer portfolio built with React, Tailwind CSS, GSAP, Zustand, and Vite. Features a working desktop environment with draggable, resizable windows, a functional dock, dark mode, animated transitions, and a live photo gallery — all running in the browser.

---

![Portfolio Preview](/public/images/preview.png)

---

## Features

- **macOS Desktop UI** — Navbar, Dock, draggable + resizable windows, window focus/z-index management
- **Dark Mode** — Toggle via navbar icon, persisted in `localStorage`, applied via Tailwind v4 `dark:` variant
- **Finder** — Browse projects and files in a macOS Finder-style window
- **Photos** — Masonry gallery with per-photo titles, hover overlays, and multiple independent windows
- **Safari** — Developer blog viewer with real Medium article links
- **Terminal** — Animated tech stack display styled as a real terminal session
- **Resume** — Inline PDF viewer with download support via `react-pdf`
- **Contact** — Social links with branded cards
- **GSAP Animations** — Window open/close transitions, entrance animations, and smooth dragging
- **Dynamic Window System** — Spawn unlimited independent image windows from the gallery

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite |
| Styling | Tailwind CSS v4 |
| Animation | GSAP + `@gsap/react` |
| State Management | Zustand + Immer |
| PDF Rendering | `react-pdf` + `pdfjs-dist` |
| Date Formatting | Day.js |
| Utilities | clsx, lucide-react |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Arlikhozhaev/abdu-alim-portfolio.git
cd abdu-alim-portfolio

# Install dependencies
npm install

# Install required packages
npm install dayjs
npm install gsap
npm install zustand
npm install immer
npm install react-pdf
npm install clsx
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── components/          # Shared UI components (Navbar, Dock, WindowControls, etc.)
├── constants/           # App-wide data (navLinks, gallery, techStack, locations, etc.)
├── hoc/
│   └── WindowWrapper.jsx  # HOC that adds drag, resize, animation to any window
├── store/
│   ├── window.js        # Zustand store — window open/close/focus + dynamic windows
│   ├── dark.js          # Zustand store — dark mode toggle + localStorage persistence
│   └── location.js      # Zustand store — Finder active location state
└── windows/             # Individual window components
    ├── Finder.jsx
    ├── Safari.jsx
    ├── Terminal.jsx
    ├── Resume.jsx
    ├── Contact.jsx
    ├── Photos.jsx
    ├── Text.jsx
    ├── Image.jsx
    └── DynamicWindows.jsx  # Renders multiple independent photo windows
```

---

## Architecture Highlights

### Window System
Every window is wrapped in `WindowWrapper` — a higher-order component that injects GSAP entrance animations, GSAP `Draggable` for drag behavior, a custom resize handle, and Zustand-powered z-index focus management. Static windows (Finder, Terminal, etc.) are registered in `WINDOW_CONFIG`. Photo windows use a dynamic window system that spawns independent instances at runtime via `openDynamicWindow`.

### Dark Mode
Dark mode is managed by a dedicated Zustand store (`useDarkStore`) that toggles a `.dark` class on `<html>` and persists the preference to `localStorage`. Tailwind v4's `@variant dark` directive enables the `dark:` utility across all components without a config file.

### State Management
Zustand with Immer middleware is used for all global state. Immer enables direct mutation syntax inside `set` callbacks, keeping store actions clean and readable without manual object spreading.

---

## Customization

All content is data-driven via `src/constants/index.js`:

- **Projects** — edit `WORK_LOCATION.children` to add/remove project folders
- **Blog posts** — edit `blogPosts` array with title, date, image, and link
- **Tech stack** — edit `techStack` array with categories and items
- **Gallery** — edit `gallery` array with image paths, titles, and descriptions
- **Socials** — edit `socials` array with links and brand colors

---

## License

MIT — free to use as inspiration. Please don't deploy this as-is with my personal information.

---

*Built by Abdu Alim Arlikhozhaev — [LinkedIn](https://www.linkedin.com/in/arlikhozhaev/) · [GitHub](https://github.com/Arlikhozhaev) · [X](https://x.com/arlikhozhaev)*
