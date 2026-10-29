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

`main.jsx` wraps `App` in context providers (Theme → Window → Clippy). `App.jsx` renders `BootSequence` first, then `MenuBar` + `Desktop` + `Dock` once booted. `AsteroidsGame` is lazy-loaded via `React.lazy`.

### Context Providers (`src/context/`)

- **ThemeContext** — Two independent choices mirrored to `<html data-os data-theme>`: the OS theme (`xp | win95 | macos | myspace | ubuntu | tandy`, default `xp`, persisted to `localStorage` key `os-theme`; registry in `src/themes/themes.js`) and light/dark (follows the system `prefers-color-scheme` live until the visitor toggles; only that explicit choice is persisted to `theme-preference`). Exposes `{ theme, toggleTheme, os, setOs }`.
- **WindowContext** — Manages all window states (open/minimized/maximized/position/size/zIndex) via `useReducer`. Default positions/sizes defined in `WINDOW_CONFIGS`. Window positions do **not** persist across page loads.

### Window System

Each "page" is a window component in `src/components/apps/` (AboutApp, ProjectsApp, ResumeApp, TerminalApp, ContactApp, SettingsApp, GalleryApp, MusicApp, CodeComedyApp). The `Window` component provides drag/resize/minimize/maximize chrome. `Desktop` renders all windows; `Dock` triggers opening them.

### Dual Component Pattern (Important)

Content is duplicated between "Section" components (legacy scrolling page) and "App" window components:

| Section Component | Window Component | Shared Content |
|---|---|---|
| `ProjectsSection.jsx` | `apps/ProjectsApp.jsx` | Project list (titles, descriptions, URLs, tags) |
| `Terminal.jsx` | `apps/TerminalApp.jsx` | Terminal commands, jokes, ASCII art, project listings |
| `ResumeSection.jsx` | `apps/ResumeApp.jsx` | Resume data, download/view link |

**When updating content (projects, about bio, terminal commands, resume link), both components must be updated.** They share the same data but with different UI density — Section components have richer animations and larger layouts; App components are condensed for window containers.

### Theming

Each OS theme is one stylesheet in `src/themes/` (`xp.css`, `win95.css`, `macos.css`, `myspace.css`, `ubuntu.css`, `tandy.css`) defining a light block `html[data-os="x"]` and a dark block `html[data-os="x"][data-theme="dark"]`. They set the semantic variables (`--bg-primary`, `--text-primary`, `--win-bg`, `--accent-50`…`--accent-900`, etc.) plus `--os-*` chrome tokens (wallpaper, bar, dock, title bar, window buttons, font, radius) that the base `.os-*` rules in `src/index.css` consume. To add an OS: add a CSS file, import it in `index.css`, add it to `OS_THEMES`, and add a boot skin in `src/components/boot/BootSkins.jsx` and `BootSequence.jsx`. There is no accent-color picker; accents come from the OS theme.

### Boot splash

`BootSequence` shows a skin per OS. `vite.config.js` injects the latest git commit (`git log -1`, falling back to Vercel env vars) as `__GIT_COMMIT__`; `utils/buildInfo.js` exposes it and `boot/bootLines.js` renders the "Latest commit" and `[ NEW ]` lines from it, so the splash updates itself on every build.

### Custom Hooks (`src/hooks/`)

- `useTypewriter` — Animated typing effect with cursor blink
- `useScrollAnimation` / `useStaggerAnimation` — Intersection Observer-based scroll triggers

### Content

`content/` directory has markdown files documenting site content and configuration decisions. These are **reference docs only, not dynamically loaded** — all project data, resume content, and terminal commands are hardcoded in components.

### Static Assets

`public/` holds `jared_chapman_resume.html`, `resume.pdf`, `selfie.jpg`, `about-icon.jpg` (square crop used as the About icon in `MobileShell`), `favicon.png`, and `photos/` for the gallery.
