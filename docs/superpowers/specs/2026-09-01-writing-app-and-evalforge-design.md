# Writing app + Evalforge Lite project — design

**Date:** 2026-09-01
**Status:** Approved

## Summary

Add a new "Writing" window app to the JaredOS desktop simulator that hosts one long-form publication and five developer-facing reference guides, rendered from markdown. Also add the Evalforge Lite project to the Projects window.

## 1. Evalforge Lite project

Add to `personalProjects` in `src/components/apps/ProjectsApp.jsx` and the `projects` array in `src/components/ProjectsSection.jsx` (kept in sync per the dual-component convention documented in CLAUDE.md, even though `ProjectsSection.jsx` is not currently rendered by `App.jsx` — it still has its own test file and CLAUDE.md documents it as paired content).

```js
{
  title: 'Evalforge Lite',
  desc: 'Compares text LLMs across providers via OpenRouter, with automated grading, colorful score charts, and PDF/CSV reports.',
  tags: ['Python', 'Evaluation', 'LLM', 'OpenRouter'],
  url: 'https://evalforge-lite.onrender.com/',
}
```

(Field names differ slightly between the two files — `desc`/`description` — match each file's existing convention.)

## 2. New "Writing" dock app

A 10th window, following the exact registration pattern the other 9 windows use:

- `src/context/WindowContext.jsx` — add `writing: { title: 'Writing', defaultPos: {...}, defaultSize: { width: 880, height: 640 } }` to `WINDOW_CONFIGS`.
- `src/components/Dock.jsx` — add a `{ id: 'writing', label: 'Writing', icon: <svg .../> }` entry to `DOCK_APPS` (a book/document icon consistent with the existing stroke-based icon style).
- `src/components/Desktop.jsx` — import `WritingApp` and register it in `APP_COMPONENTS`.
- No `Section` (legacy scrolling) counterpart — confirmed via grep that `ProjectsSection`/`ResumeSection`/`Terminal` are the only components with that dual pattern, and none of the other 6 app-only windows (Gallery, Music, Settings, Contact, CodeComedy, Clippy) have one either.

## 3. Content storage

New directory `src/content/writing/`:

- `publications/from-vibe-coding-to-agentic-engineering.md` — copied from `/Users/thejaredchapman/Downloads/from-vibe-coding-to-agentic-engineering.md`.
- `handouts/01-agent-orchestration.md` through `05-tool-evaluation.md` — copied from `/Users/thejaredchapman/coding_stuff/workplace_improvements/developer_handouts/`.

Each of the 6 copied files gets one line added directly under its H1 title:

> *Free to read and share with anyone. Not for commercial use or resale.*

`src/content/writing/index.js` exports a small metadata array, one entry per file:

```js
import vibeCoding from './publications/from-vibe-coding-to-agentic-engineering.md?raw'
import handout01 from './handouts/01-agent-orchestration.md?raw'
// ...

export const publications = [
  { id: 'vibe-coding', title: 'From Vibe Coding to Agentic Engineering', description: '...', tags: [...], content: vibeCoding },
]

export const handouts = [
  { id: 'agent-orchestration', title: 'Agent Orchestration', description: '...', content: handout01 },
  // ...
]
```

Title/description text is lifted from each file's own frontmatter/intro rather than re-invented, so the card copy matches the source.

## 4. WritingApp component

`src/components/apps/WritingApp.jsx`:

- Local state `const [selectedId, setSelectedId] = useState(null)`.
- **List view** (`selectedId === null`): two sections, "Publications" (1 card) and "Developer Guides" (5 cards), styled like the existing card grids in `ProjectsApp.jsx` (rounded border, top accent gradient bar or hover lift, tag pills) for visual consistency with the rest of the OS. Clicking a card sets `selectedId`.
- **Detail view** (`selectedId` set): a "← Back" button, then the markdown rendered via `react-markdown` with the `remark-gfm` plugin (for tables/strikethrough/task lists), using custom component overrides for `h1`–`h4`, `p`, `table`/`th`/`td`, `blockquote`, `code`/`pre`, `a`, `ul`/`ol` so they pick up the site's existing CSS custom properties (`--text-primary`, `--text-secondary`, `--accent-500`, `--border-light`, `--bg-secondary`) instead of react-markdown's unstyled default output. Content area scrolls independently within the window body.

## 5. Dependencies

Add `react-markdown` and `remark-gfm` to `package.json` dependencies.

## 6. Out of scope

- No changes to `ResumeApp.jsx` or `AboutApp.jsx`.
- No new automated tests (repo has vitest configured but sparse coverage; not extending it here unless requested).
- No changes to the boot sequence, theming system, or other windows beyond the dock/window registration wiring described above.
