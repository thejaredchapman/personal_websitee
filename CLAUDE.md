# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — Production build to `/dist`
- `npm run lint` — ESLint (flat config, JS/JSX)
- `npm run preview` — Preview production build locally

No test framework is configured. There are no tests to run.

## Tech Stack

React 19 SPA built with Vite 7, styled with Tailwind CSS 4 (via `@tailwindcss/vite` plugin — no `tailwind.config.js`). All components are JSX (no TypeScript). Deployed on Vercel with default detection (no `vercel.json`).

## Architecture

The site is a **macOS desktop simulator** — not a traditional scrolling website. After a boot sequence animation, users see a desktop with a menu bar, draggable/resizable windows, and a dock.

### Entry Flow

`main.jsx` wraps `App` in three context providers (Theme → Color → Window). `App.jsx` renders `BootSequence` first, then `MenuBar` + `Desktop` + `Dock` once booted. `AsteroidsGame` is lazy-loaded via `React.lazy`.

### Context Providers (`src/context/`)

- **ThemeContext** — Light/dark toggle. Follows the system `prefers-color-scheme` (live) until the visitor toggles; only that explicit choice is persisted to `localStorage` key `theme-preference`.
- **ColorContext** — Accent color selection (8 presets + rainbow + custom hex picker). Generates full 50–900 shade palettes at runtime and sets CSS custom properties on `:root`. Persisted to `localStorage` key `accent-color`. Defaults to orange.
- **WindowContext** — Manages all window states (open/minimized/maximized/position/size/zIndex) via `useReducer`. Default positions/sizes defined in `WINDOW_CONFIGS`. Window positions do **not** persist across page loads.

### Window System

Each "page" is a window component in `src/components/apps/` (AboutApp, GuideApp, ProjectsApp, ResumeApp, TerminalApp, ContactApp, SettingsApp, GalleryApp, MusicApp, CodeComedyApp, WritingApp, ClippyApp). The app list and component map live in `components/appRegistry.jsx`, shared by `Dock`, `Desktop` and the mobile shell. The `Window` component provides drag/resize/minimize/maximize chrome. `Desktop` renders all windows; `Dock` triggers opening them.

### Dual Component Pattern (Important)

Content is duplicated between "Section" components (legacy scrolling page) and "App" window components:

| Section Component | Window Component | Shared Content |
|---|---|---|
| `ProjectsSection.jsx` | `apps/ProjectsApp.jsx` | Project list (titles, descriptions, URLs, tags) |
| `Terminal.jsx` | `apps/TerminalApp.jsx` | Terminal commands, jokes, ASCII art, project listings |
| `ResumeSection.jsx` | `apps/ResumeApp.jsx` | Resume data, download/view link |

**When updating content (projects, about bio, terminal commands, resume link), both components must be updated.** They share the same data but with different UI density — Section components have richer animations and larger layouts; App components are condensed for window containers.

### Theming

Dynamic accent colors use CSS custom properties (`--accent-50` through `--accent-900`) set by `ColorContext`. Semantic variables (`--bg-primary`, `--text-primary`, `--bg-secondary`, `--glass-bg`, `--win-bg`, etc.) switch between light/dark via `[data-theme="dark"]` in `src/index.css`. Tailwind's `@theme` directive sets the font to Courier Prime (Courier New fallback) and sharpens the corner radii. The look is a developer manual: ruled-grid wallpaper, flat chrome, light/dark from the system setting.

### Custom Hooks (`src/hooks/`)

- `useTypewriter` — Animated typing effect with cursor blink
- `useScrollAnimation` / `useStaggerAnimation` — Intersection Observer-based scroll triggers

### Content

`content/` directory has markdown files documenting site content and configuration decisions. These are **reference docs only, not dynamically loaded** — all project data, resume content, and terminal commands are hardcoded in components.

#### Mobile and the AI guide

Under 768px (`useIsMobile`), `App.jsx` renders `MobileShell` (home-screen grid, full-screen apps, bottom bar) instead of MenuBar/Desktop/Dock. After boot, `SplashGuide` shows once per session (`sessionStorage` key `jaredos-guide-seen`; skipped for `?read=` links). Its content, `guide/GuideContent.jsx`, is also the `guide` window app. Model and permission-mode facts live in `src/data/guideData.js` with an as-of date; re-check them against Anthropic's docs when they change.

## Static Assets

`public/` holds `jared_chapman_resume.html`, `resume.pdf`, `selfie.jpg`, `favicon.png`, and `photos/` for the gallery.
