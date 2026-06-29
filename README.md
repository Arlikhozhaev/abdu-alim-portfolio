# macOS Portfolio — Abdu Alim

An interactive, macOS-inspired developer portfolio built with React 19, Vite 7, Tailwind CSS v4, GSAP, and Zustand. Desktop visitors get a draggable window environment; mobile visitors get an iOS-style home screen — both fed from the same content source.

**Live:** [arlikhozhaev.dev](https://arlikhozhaev.dev/)

![Portfolio preview](/public/images/preview.png)

---

## Features

### Desktop (≥ 640px)
- **macOS desktop UI** — menu bar, dock with magnification, wallpaper, project folders on the desktop
- **Draggable windows** — drag from the title bar only; inputs and links stay interactive
- **Window focus** — click-to-front z-index management via Zustand
- **Dark mode** — navbar toggle, persisted in `localStorage`, Tailwind `dark:` variant
- **Finder** — browse Projects, About me, Experience, Resume, and Trash as macOS-style folders
- **Safari (Blog)** — searchable Medium article feed
- **Terminal (Skills)** — animated tech stack grouped by category
- **Resume** — inline PDF viewer with zoom, download, and open-in-tab
- **Contact** — profile card, email, and social links
- **Photos (Gallery)** — masonry grid; open multiple independent image windows
- **Dynamic windows** — spawn unlimited image pop-outs from Finder or Gallery
- **LinkedIn recommendation** — toast from the menu bar wifi icon

### Mobile (< 640px)
- **iOS-style home screen** — wallpaper, app grid, frosted dock, swipe-to-close app sheets
- **Always dark** — mobile UI is decoupled from desktop theme toggle
- **Same content** — About, Skills, Resume, Finder, Blog, Gallery, Contact mirror desktop data
- **Visible contact path** — “Get in touch” mailto link on the home screen greeting

### Engineering
- **Code splitting** — lazy-loaded desktop vs mobile shells; manual vendor chunks (PDF, GSAP, React)
- **Single source of truth** — all portfolio copy and structure in `src/constants/profile.js`
- **Shared components** — `ResumeViewer`, `BlogFeed`, `AboutProfile` used on both platforms
- **SEO** — meta tags, Open Graph, Twitter cards, canonical URL in `index.html`
- **Analytics** — Vercel Analytics in `src/main.jsx`

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 + Vite 7 |
| Styling | Tailwind CSS v4 |
| Animation | GSAP + `@gsap/react` + Draggable |
| State | Zustand + Immer |
| PDF | `react-pdf` + `pdfjs-dist` |
| Icons | Lucide React |
| Analytics | `@vercel/analytics` |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install & run

```bash
git clone https://github.com/Arlikhozhaev/abdu-alim-portfolio.git
cd abdu-alim-portfolio
npm install
npm run dev
```

### Production

```bash
npm run build
npm run preview
```

### Required assets

The app expects these under `public/` (included in the repo):

```
public/
├── files/
│   └── resume.pdf
├── icons/          # Menu bar, dock, social SVGs
└── images/         # Wallpaper, app icons, project shots, gallery, avatars
```

If images or the resume are missing after clone, the UI will show broken assets locally.

---

## Project Structure

```
src/
├── App.jsx                 # Routes desktop vs mobile at 640px breakpoint
├── DesktopApp.jsx          # Desktop shell (navbar, dock, all windows)
├── main.jsx                # React root + Vercel Analytics
├── index.css               # Tailwind + macOS window/dock/welcome styles
│
├── components/
│   ├── Navbar.jsx          # Menu bar (Projects, Contact, Resume + icons)
│   ├── Welcome.jsx         # Desktop hero + contact CTA
│   ├── Dock.jsx            # macOS dock with hover magnification
│   ├── Home.jsx            # Desktop project folder shortcuts
│   ├── MobileHome.jsx      # Full mobile iOS UI (app sheets)
│   ├── ContactCta.jsx      # Shared “Get in touch” mailto link
│   ├── AboutProfile.jsx    # About Me content (mobile Notes app)
│   ├── BlogFeed.jsx        # Searchable blog list (desktop Safari + mobile)
│   ├── ResumeViewer.jsx    # PDF viewer (desktop Resume + mobile app)
│   ├── RecommendationToast.jsx
│   └── AppLoadingScreen.jsx
│
├── constants/
│   ├── profile.js          # ★ Edit portfolio content here
│   ├── index.js            # Nav, dock, blog, gallery, locations, window config
│   ├── mobileTheme.js      # Dark theme tokens for mobile sheets
│   ├── recommendation.js   # LinkedIn recommendation data
│   └── breakpoints.js      # DESKTOP_MEDIA_QUERY (640px)
│
├── context/
│   └── MobileThemeContext.jsx   # Mobile always uses dark tokens
│
├── hooks/
│   ├── useMediaQuery.js    # Sync breakpoint detection (no flash)
│   └── useBlogSearch.js    # Client-side blog filtering
│
├── store/
│   ├── window.js           # Open/close/focus static + dynamic windows
│   ├── location.js         # Finder sidebar active location
│   └── dark.js             # Desktop dark mode + localStorage
│
├── hoc/
│   └── WindowWrapper.jsx   # GSAP entrance + header-only drag for windows
│
└── windows/
    ├── Finder.jsx          # Folder browser + experience/projects views
    ├── Safari.jsx          # Blog window with search
    ├── Terminal.jsx        # Tech stack
    ├── Resume.jsx          # Wraps ResumeViewer
    ├── Contact.jsx         # Contact card + socials
    ├── Photos.jsx          # Gallery grid
    ├── Text.jsx            # Rich text viewer (about, project descriptions)
    ├── Image.jsx           # Single image viewer
    └── DynamicWindows.jsx  # Runtime photo pop-out windows
```

---

## Architecture

### Desktop vs mobile routing

`App.jsx` uses `useMediaQuery(DESKTOP_MEDIA_QUERY)` where `DESKTOP_MEDIA_QUERY = "(min-width: 640px)"`. Each shell is `React.lazy()`-loaded with a branded `AppLoadingScreen` fallback. Vite manual chunks split `desktop`, `mobile`, `windows`, and vendor bundles.

### Window system

**Static windows** (`finder`, `contact`, `resume`, `safari`, `photos`, `terminal`, `txtfile`, `imgfile`) are registered in `WINDOW_CONFIG` inside `src/constants/index.js`. `useWindowStore` manages open state, z-index focus, and optional window payload data.

**Dynamic windows** are created at runtime via `openDynamicWindow()` — used when opening gallery or Finder images in separate draggable windows. `DynamicWindows.jsx` renders the list.

**WindowWrapper** (HOC) wraps each window component and provides:
- GSAP scale/fade entrance on open
- Draggable behavior limited to `#window-header` (not the whole window)
- Cancel selectors for inputs, links, and `[data-no-drag]` elements

Windows are **not resizable** — drag and focus only.

### Finder & projects model

Content in `profile.js` is transformed into Finder “locations” by builder functions:

| Builder | Finder sidebar entry | Contents |
|---------|---------------------|----------|
| `buildWorkLocation()` | Projects | One folder per project; each contains `.txt` (description), link file, and screenshot |
| `buildAboutLocation()` | About me | Personal photos + `Abdu-Alim.txt` rich about document |
| `buildTrashLocation()` | Trash | Easter-egg images |
| `EXPERIENCE_LOCATION` | Experience | Renders from `experience[]` array (not folder children) |
| `RESUME_LOCATION` | Resume | Shortcut to `Resume.pdf` |

Desktop also shows project folders directly on the wallpaper via `Home.jsx`. Opening a project folder in Finder lets you read the description (`Text.jsx`), open the live link, or view the screenshot.

### Content flow (single source of truth)

```
profile.js
  ├── aboutContent      → AboutProfile (mobile), Text window (desktop)
  ├── projects[]        → Finder Projects, Home desktop folders
  ├── experience[]      → Finder Experience tab
  ├── trashItems[]      → Finder Trash
  ├── CONTACT_EMAIL     → ContactCta, Contact app, Contact window
  └── RESUME_PATH       → ResumeViewer, Finder Resume folder
```

`src/constants/index.js` re-exports profile data and adds platform-specific config: `navLinks`, `dockApps`, `blogPosts`, `techStack`, `socials`, `gallery`, and `locations`.

### State management

Three Zustand stores with Immer middleware:
- **`window.js`** — window open/close, z-index, dynamic window list
- **`location.js`** — which Finder sidebar location is active
- **`dark.js`** — desktop `.dark` class on `<html>` (mobile ignores this)

### Dark mode

Desktop: toggle in menu bar (sun/moon icon), persisted in `localStorage`.

Mobile: `MobileThemeContext` always serves dark tokens from `mobileTheme.js` — independent of desktop preference.

---

## Customization

### Edit portfolio content

**Primary file:** `src/constants/profile.js`

| Export | What to change |
|--------|----------------|
| `CONTACT_EMAIL` | Email shown in Contact + mailto CTA |
| `RESUME_PATH` | Path to PDF in `public/files/` |
| `aboutContent` | Headline, bio, photos, sections, desktop description |
| `projects[]` | Name, descriptions, live links, tech tags, images, desktop positions |
| `experience[]` | Company, role, dates, bullets, logo |
| `trashItems[]` | Trash folder easter eggs |

After editing `projects`, `buildWorkLocation()` automatically rebuilds Finder folders — no manual folder tree edits needed.

### Other content (in `src/constants/index.js`)

| Array | Purpose |
|-------|---------|
| `blogPosts` | Safari / mobile Blog app articles |
| `techStack` | Terminal / mobile Skills app |
| `socials` | Contact window and mobile Contact app |
| `gallery` | Photos app image grid |
| `navLinks` / `dockApps` | Menu bar and dock labels (icons live in `public/images/`) |

### Adding a project

1. Add an entry to `projects[]` in `profile.js` (unique `finderId`, image in `public/images/`).
2. Optionally set `position` (desktop wallpaper folder) and `windowPosition` (Finder window placement).
3. Rebuild — Finder Projects and desktop folders update automatically.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | ESLint |
| `npm run test:e2e` | Playwright smoke tests (builds preview server automatically) |
| `npm run build:seo` | Production build + inject crawlable HTML shell (optional SEO prerender) |
| `npm run prerender:seo` | Inject SEO shell into an existing `dist/index.html` |
| `npm run images:webp` | Generate `.webp` siblings for `public/images/` |

### SEO & performance (P2)

- `public/robots.txt` and `public/sitemap.xml` for crawlers
- JSON-LD (`Person` + `WebSite`) and Twitter/OG meta in `index.html`
- Google Fonts loaded via `<link>` (non-blocking) instead of CSS `@import`
- `OptimizedImage` — lazy loading + optional WebP via `<picture>` after running `images:webp`
- GitHub Actions CI (`.github/workflows/ci.yml`) — lint, build, and e2e on push/PR
- Optional SEO prerender (`npm run build:seo`) — injects readable project/experience HTML into `dist/index.html` for crawlers; React replaces it on load

### WebP images

Committing both raster originals (`.jpg`/`.png`) and `.webp` siblings is expected. `OptimizedImage` serves WebP via `<picture>` and falls back to the original format when needed.

### Optional SEO prerender

Default `npm run build` is unchanged. For deployments where crawlers may not execute JavaScript:

```bash
npm run build:seo
```

This injects a static HTML summary (from `profile.js`) inside `#root`. When the app hydrates, React replaces that shell with the interactive portfolio — users see no difference.

You can also run `npm run prerender:seo` after a normal build to inject the shell manually.

---

## License

MIT — free to use as inspiration. Please don't deploy this as-is with my personal information.

---

*Built by [Abdu Alim](https://arlikhozhaev.dev/) — [LinkedIn](https://www.linkedin.com/in/arlikhozhaev/) · [GitHub](https://github.com/Arlikhozhaev) · [X](https://x.com/arlikhozhaev)*
