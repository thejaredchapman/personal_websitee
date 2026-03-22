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

- **ThemeContext** — Light/dark toggle, persisted to `localStorage` key `theme-preference`. Defaults to light.
- **ColorContext** — Accent color selection (8 presets + rainbow + custom hex picker). Generates full 50–900 shade palettes at runtime and sets CSS custom properties on `:root`. Persisted to `localStorage` key `accent-color`. Defaults to orange.
- **WindowContext** — Manages all 9 window states (open/minimized/maximized/position/size/zIndex) via `useReducer`. Default positions/sizes defined in `WINDOW_CONFIGS`. Window positions do **not** persist across page loads.

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

Dynamic accent colors use CSS custom properties (`--accent-50` through `--accent-900`) set by `ColorContext`. Semantic variables (`--bg-primary`, `--text-primary`, `--bg-secondary`, `--glass-bg`, `--win-bg`, etc.) switch between light/dark via `[data-theme="dark"]` in `src/index.css`. Tailwind's `@theme` directive sets the mono font to JetBrains Mono.

### Custom Hooks (`src/hooks/`)

- `useTypewriter` — Animated typing effect with cursor blink
- `useScrollAnimation` / `useStaggerAnimation` — Intersection Observer-based scroll triggers

### Content

`content/` directory has markdown files documenting site content and configuration decisions. These are **reference docs only, not dynamically loaded** — all project data, resume content, and terminal commands are hardcoded in components.

### Static Assets

`public/` holds `jared_chapman_resume.html`, `resume.pdf`, `selfie.jpg`, `favicon.png`, and `photos/` for the gallery.
