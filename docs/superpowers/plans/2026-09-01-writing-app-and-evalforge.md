# Writing App and Evalforge Lite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new "Writing" window app hosting one long-form publication and five developer-facing reference guides (rendered from markdown), and add the Evalforge Lite project to the Projects window.

**Architecture:** Markdown source files live under `src/content/writing/`, imported as raw strings via Vite's `?raw` suffix and exposed through a small metadata module. A new `WritingApp.jsx` window component renders a two-section list (Publications / Developer Guides) and, on click, a detail view that renders the raw markdown via `react-markdown` + `remark-gfm` with custom component overrides that reuse the site's existing CSS custom properties. The window is registered exactly like the other 9 windows (`WindowContext.jsx` → `Dock.jsx` → `Desktop.jsx`). Evalforge Lite is added as a fourth `personalProjects`/`projects` entry in the existing Projects components.

**Tech Stack:** React 19, Vite 7 (`?raw` imports), Tailwind CSS 4 (inline utility classes + CSS custom properties, no new stylesheet), `react-markdown` + `remark-gfm` (new deps), Vitest + Testing Library (existing).

## Global Constraints

- Usage note text, verbatim, added under the H1 of all 6 copied markdown files: `*Free to read and share with anyone. Not for commercial use or resale.*`
- Evalforge Lite description, verbatim: `Compares text LLMs across providers via OpenRouter, with automated grading, colorful score charts, and PDF/CSV reports.`
- Evalforge Lite tags, verbatim and in this order: `['Python', 'Evaluation', 'LLM', 'OpenRouter']`
- Evalforge Lite URL: `https://evalforge-lite.onrender.com/`
- No changes to `ResumeApp.jsx`, `AboutApp.jsx`, the boot sequence, theming system, or any window other than `projects` and the new `writing` window.
- Follow existing styling convention throughout: Tailwind utility classes for layout/spacing, inline `style={{ color: 'var(--...)' }}` for anything theme-dependent. No new CSS files.

---

### Task 1: Add markdown rendering dependencies

**Files:**
- Modify: `package.json` (via `npm install`)

**Interfaces:**
- Produces: `react-markdown` default export and `remark-gfm` default export, both importable from `'react-markdown'` and `'remark-gfm'` in Task 5.

- [ ] **Step 1: Install the packages**

```bash
cd /Users/thejaredchapman/coding_stuff/personal_projects/personal_websitee
npm install react-markdown remark-gfm
```

- [ ] **Step 2: Verify the install**

Run: `node -e "require.resolve('react-markdown/package.json'); require.resolve('remark-gfm/package.json'); console.log('ok')"`
Expected: prints `ok` with no errors. Confirm `package.json` now lists `react-markdown` and `remark-gfm` under `dependencies`.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add react-markdown and remark-gfm for the Writing app"
```

---

### Task 2: Copy and annotate the source markdown files

**Files:**
- Create: `src/content/writing/publications/from-vibe-coding-to-agentic-engineering.md`
- Create: `src/content/writing/handouts/01-agent-orchestration.md`
- Create: `src/content/writing/handouts/02-agent-evaluation-and-instrumentation.md`
- Create: `src/content/writing/handouts/03-agentic-rag.md`
- Create: `src/content/writing/handouts/04-rag-evaluation.md`
- Create: `src/content/writing/handouts/05-tool-evaluation.md`

**Interfaces:**
- Produces: 6 markdown files, each starting directly with an `# H1` title (no YAML frontmatter) followed immediately by the usage note, consumed by Task 3's raw imports.

- [ ] **Step 1: Create the directories and copy the 6 source files verbatim**

```bash
cd /Users/thejaredchapman/coding_stuff/personal_projects/personal_websitee
mkdir -p src/content/writing/publications src/content/writing/handouts

cp /Users/thejaredchapman/Downloads/from-vibe-coding-to-agentic-engineering.md \
   src/content/writing/publications/from-vibe-coding-to-agentic-engineering.md

cp /Users/thejaredchapman/coding_stuff/workplace_improvements/developer_handouts/01-agent-orchestration.md \
   src/content/writing/handouts/01-agent-orchestration.md
cp /Users/thejaredchapman/coding_stuff/workplace_improvements/developer_handouts/02-agent-evaluation-and-instrumentation.md \
   src/content/writing/handouts/02-agent-evaluation-and-instrumentation.md
cp /Users/thejaredchapman/coding_stuff/workplace_improvements/developer_handouts/03-agentic-rag.md \
   src/content/writing/handouts/03-agentic-rag.md
cp /Users/thejaredchapman/coding_stuff/workplace_improvements/developer_handouts/04-rag-evaluation.md \
   src/content/writing/handouts/04-rag-evaluation.md
cp /Users/thejaredchapman/coding_stuff/workplace_improvements/developer_handouts/05-tool-evaluation.md \
   src/content/writing/handouts/05-tool-evaluation.md
```

- [ ] **Step 2: Strip the YAML frontmatter from the publication file**

The publication file starts with a 7-line YAML frontmatter block (`---` ... `---` then a blank line) before its `# From Vibe Coding to Agentic Engineering` H1. Using the Edit tool on `src/content/writing/publications/from-vibe-coding-to-agentic-engineering.md`:

old_string:
```
---
title: "From Vibe Coding to Agentic Engineering"
description: "How AI coding agents actually work, what they cost, and what to check before you use them at work."
pricing_verified: 2026-08-30
audience: [hobbyist, professional]
---

# From Vibe Coding to Agentic Engineering
```

new_string:
```
# From Vibe Coding to Agentic Engineering
```

- [ ] **Step 3: Add the usage note to the publication file**

Using the Edit tool on `src/content/writing/publications/from-vibe-coding-to-agentic-engineering.md`:

old_string:
```
# From Vibe Coding to Agentic Engineering

**How AI coding agents actually work, what they cost, and what to check before you use them at work.**
```

new_string:
```
# From Vibe Coding to Agentic Engineering

*Free to read and share with anyone. Not for commercial use or resale.*

**How AI coding agents actually work, what they cost, and what to check before you use them at work.**
```

- [ ] **Step 4: Add the usage note to each of the 5 handout files**

Using the Edit tool, once per file, insert the note directly under the H1. Each handout's H1 line and the required edit:

`src/content/writing/handouts/01-agent-orchestration.md`
old_string:
```
# Handout 1: Agent Orchestration

## What It Is
```
new_string:
```
# Handout 1: Agent Orchestration

*Free to read and share with anyone. Not for commercial use or resale.*

## What It Is
```

`src/content/writing/handouts/02-agent-evaluation-and-instrumentation.md`
old_string:
```
# Handout 2: Agent Evaluation & Instrumentation

## What It Is
```
new_string:
```
# Handout 2: Agent Evaluation & Instrumentation

*Free to read and share with anyone. Not for commercial use or resale.*

## What It Is
```

`src/content/writing/handouts/03-agentic-rag.md`
old_string:
```
# Handout 3: Agentic RAG

## What It Is
```
new_string:
```
# Handout 3: Agentic RAG

*Free to read and share with anyone. Not for commercial use or resale.*

## What It Is
```

`src/content/writing/handouts/04-rag-evaluation.md`
old_string:
```
# Handout 4: RAG Evaluation

## What It Is
```
new_string:
```
# Handout 4: RAG Evaluation

*Free to read and share with anyone. Not for commercial use or resale.*

## What It Is
```

`src/content/writing/handouts/05-tool-evaluation.md`
old_string:
```
# Handout 5: Tool Evaluation

## What It Is
```
new_string:
```
# Handout 5: Tool Evaluation

*Free to read and share with anyone. Not for commercial use or resale.*

## What It Is
```

- [ ] **Step 5: Verify**

Run: `head -n 5 src/content/writing/publications/from-vibe-coding-to-agentic-engineering.md` — expect it to start with `# From Vibe Coding to Agentic Engineering` (no `---`), followed by the usage note.
Run: `for f in src/content/writing/handouts/*.md; do echo "== $f =="; head -n 5 "$f"; done` — expect every file's usage note to appear directly under its `# Handout N: ...` line.

- [ ] **Step 6: Commit**

```bash
git add src/content/writing/
git commit -m "content: add Writing app source markdown (1 publication, 5 developer handouts)"
```

---

### Task 3: Create the content metadata module

**Files:**
- Create: `src/content/writing/index.js`

**Interfaces:**
- Consumes: the 6 `.md` files from Task 2 via `?raw` imports.
- Produces: `export const publications` and `export const handouts`, each an array of `{ id: string, title: string, description: string, tags?: string[], content: string }`, consumed by `WritingApp.jsx` in Task 5.

- [ ] **Step 1: Write the module**

Create `src/content/writing/index.js`:

```js
import vibeCodingContent from './publications/from-vibe-coding-to-agentic-engineering.md?raw'
import agentOrchestrationContent from './handouts/01-agent-orchestration.md?raw'
import agentEvalContent from './handouts/02-agent-evaluation-and-instrumentation.md?raw'
import agenticRagContent from './handouts/03-agentic-rag.md?raw'
import ragEvalContent from './handouts/04-rag-evaluation.md?raw'
import toolEvalContent from './handouts/05-tool-evaluation.md?raw'

export const publications = [
  {
    id: 'vibe-coding-to-agentic-engineering',
    title: 'From Vibe Coding to Agentic Engineering',
    description: 'How AI coding agents actually work, what they cost, and what to check before you use them at work.',
    tags: ['AI Agents', 'Cost & ROI', 'Compliance'],
    content: vibeCodingContent,
  },
]

export const handouts = [
  {
    id: 'agent-orchestration',
    title: 'Agent Orchestration',
    description: 'Coordinating multiple LLM calls — planner and worker agents, tool use vs. orchestration, and why context isolation is the biggest win.',
    content: agentOrchestrationContent,
  },
  {
    id: 'agent-evaluation-and-instrumentation',
    title: 'Agent Evaluation & Instrumentation',
    description: 'The plumbing (structured logging and tracing) and the process (offline and online evaluation) needed to know if an agentic system is actually working.',
    content: agentEvalContent,
  },
  {
    id: 'agentic-rag',
    title: 'Agentic RAG',
    description: 'Why naive single-shot retrieval fails, and how agentic RAG replaces it with an adaptive decision loop that can re-search, rewrite queries, and judge sufficiency.',
    content: agenticRagContent,
  },
  {
    id: 'rag-evaluation',
    title: 'RAG Evaluation',
    description: 'Measuring retrieval and generation quality separately, so a bad answer traces back to a chunking problem or a prompting problem instead of a guess.',
    content: ragEvalContent,
  },
  {
    id: 'tool-evaluation',
    title: 'Tool Evaluation',
    description: 'Separating tool-design flaws from tool-use failures — two problems that look identical from the outside but need entirely different fixes.',
    content: toolEvalContent,
  },
]
```

- [ ] **Step 2: Verify it resolves**

Run: `cd /Users/thejaredchapman/coding_stuff/personal_projects/personal_websitee && node -e "
const vm = require('child_process');
" && npx vite build --mode development 2>&1 | tail -n 30`

Expected: no errors mentioning `src/content/writing/index.js` or unresolved `?raw` imports (the full build may still fail later at this point in the plan if `WritingApp.jsx` doesn't exist yet and nothing imports this module — that's fine; just confirm no error names this file). If you'd rather defer verification, it will be fully exercised by Task 5's build check.

- [ ] **Step 3: Commit**

```bash
git add src/content/writing/index.js
git commit -m "feat: add Writing app content metadata module"
```

---

### Task 4: Register the Writing window (context, dock, desktop)

**Files:**
- Modify: `src/context/WindowContext.jsx`
- Modify: `src/components/Dock.jsx`
- Modify: `src/components/Desktop.jsx`

**Interfaces:**
- Produces: a `writing` window id recognized by `useWindows()`, a dock icon that opens/focuses/minimizes it via `dockClick('writing')`, and a slot in `APP_COMPONENTS` for `WritingApp` (created in Task 5).

- [ ] **Step 1: Register the window config**

In `src/context/WindowContext.jsx`, add a `writing` entry to `WINDOW_CONFIGS` (after `clippy`):

old_string:
```
  clippy:     { title: 'Ask Clippy',    defaultPos: { x: 220, y: 55  }, defaultSize: { width: 420, height: 560 } },
}
```

new_string:
```
  clippy:     { title: 'Ask Clippy',    defaultPos: { x: 220, y: 55  }, defaultSize: { width: 420, height: 560 } },
  writing:    { title: 'Writing',       defaultPos: { x: 240, y: 40  }, defaultSize: { width: 880, height: 640 } },
}
```

- [ ] **Step 2: Add the dock icon**

In `src/components/Dock.jsx`, add a `writing` entry to `DOCK_APPS` (after `settings`, before the array closes):

old_string:
```
  { id: 'settings', label: 'Settings', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
  )},
]
```

new_string:
```
  { id: 'settings', label: 'Settings', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
  )},
  { id: 'writing', label: 'Writing', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>
  )},
]
```

- [ ] **Step 3: Register the app component (placeholder import for now)**

In `src/components/Desktop.jsx`, add the import and `APP_COMPONENTS` entry:

old_string:
```
import ClippyApp from './apps/ClippyApp'
import GeometricWallpaper from './GeometricWallpaper'
```

new_string:
```
import ClippyApp from './apps/ClippyApp'
import WritingApp from './apps/WritingApp'
import GeometricWallpaper from './GeometricWallpaper'
```

old_string:
```
  clippy: ClippyApp,
}
```

new_string:
```
  clippy: ClippyApp,
  writing: WritingApp,
}
```

- [ ] **Step 4: Verify (expected to fail until Task 5)**

Run: `npm run dev` and confirm the terminal shows a Vite error that `./apps/WritingApp` cannot be resolved (this is expected — Task 5 creates that file). Stop the dev server (Ctrl+C). This confirms Tasks 1-4 have wired things up correctly and only the component file itself is missing.

- [ ] **Step 5: Commit**

```bash
git add src/context/WindowContext.jsx src/components/Dock.jsx src/components/Desktop.jsx
git commit -m "feat: register the Writing window in dock, context, and desktop"
```

---

### Task 5: Build the WritingApp component

**Files:**
- Create: `src/components/apps/WritingApp.jsx`

**Interfaces:**
- Consumes: `publications`, `handouts` from `../../content/writing` (Task 3); `ReactMarkdown` from `react-markdown` and `remarkGfm` from `remark-gfm` (Task 1).
- Produces: default export `WritingApp`, a window content component with no props (matches every other component in `APP_COMPONENTS`).

- [ ] **Step 1: Write the component**

Create `src/components/apps/WritingApp.jsx`:

```jsx
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { publications, handouts } from '../../content/writing'

const markdownComponents = {
  h1: ({ children }) => <h1 className="text-xl font-bold mt-6 mb-3 first:mt-0" style={{ color: 'var(--text-primary)' }}>{children}</h1>,
  h2: ({ children }) => <h2 className="text-lg font-bold mt-6 mb-2" style={{ color: 'var(--text-primary)' }}>{children}</h2>,
  h3: ({ children }) => <h3 className="text-base font-semibold mt-5 mb-2" style={{ color: 'var(--text-primary)' }}>{children}</h3>,
  h4: ({ children }) => <h4 className="text-sm font-semibold mt-4 mb-1.5" style={{ color: 'var(--text-primary)' }}>{children}</h4>,
  p: ({ children }) => <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>{children}</p>,
  a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--accent-500)' }}>{children}</a>,
  ul: ({ children }) => <ul className="list-disc pl-5 mb-3 flex flex-col gap-1">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-5 mb-3 flex flex-col gap-1">{children}</ol>,
  li: ({ children }) => <li className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{children}</li>,
  blockquote: ({ children }) => <blockquote className="border-l-2 pl-3 my-3 italic text-sm" style={{ borderColor: 'var(--accent-400)', color: 'var(--text-tertiary)' }}>{children}</blockquote>,
  code: ({ children }) => <code className="text-[11px] font-mono px-1 rounded" style={{ background: 'var(--bg-primary)', color: 'var(--accent-500)' }}>{children}</code>,
  pre: ({ children }) => <pre className="text-[11px] font-mono p-3 rounded-lg overflow-x-auto mb-3 border" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-light)' }}>{children}</pre>,
  table: ({ children }) => <div className="overflow-x-auto mb-4"><table className="w-full text-xs border-collapse">{children}</table></div>,
  th: ({ children }) => <th className="text-left py-1.5 px-2 font-semibold border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-light)' }}>{children}</th>,
  td: ({ children }) => <td className="py-1.5 px-2 border-b align-top" style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-light)' }}>{children}</td>,
  hr: () => <hr className="my-5" style={{ borderColor: 'var(--border-light)' }} />,
  strong: ({ children }) => <strong style={{ color: 'var(--text-primary)' }}>{children}</strong>,
}

function ArticleCard({ item, onOpen }) {
  return (
    <button
      onClick={() => onOpen(item.id)}
      className="group text-left rounded-xl p-4 border transition-all duration-200 hover:border-[var(--accent-300)] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_var(--shadow-accent)] w-full cursor-pointer"
      style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)', color: 'inherit' }}
    >
      <div className="flex items-start justify-between mb-2 gap-2">
        <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 shrink-0 opacity-30 group-hover:opacity-80 transition-all group-hover:translate-x-0.5" style={{ color: 'var(--accent-500)' }}>
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-tertiary)' }}>{item.description}</p>
      {item.tags && (
        <div className="flex gap-1 flex-wrap">
          {item.tags.map((t) => (
            <span key={t} className="text-[10px] py-0.5 px-2 rounded-full font-medium" style={{ background: 'var(--accent-100)', color: 'var(--accent-700)' }}>{t}</span>
          ))}
        </div>
      )}
    </button>
  )
}

function WritingApp() {
  const [selectedId, setSelectedId] = useState(null)
  const all = [...publications, ...handouts]
  const selected = all.find((item) => item.id === selectedId)

  if (selected) {
    return (
      <div className="p-6 max-[768px]:p-4">
        <button
          onClick={() => setSelectedId(null)}
          className="flex items-center gap-1.5 text-xs font-medium mb-4 transition-opacity hover:opacity-70 cursor-pointer"
          style={{ color: 'var(--accent-500)' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Back to Writing
        </button>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {selected.content}
        </ReactMarkdown>
      </div>
    )
  }

  return (
    <div className="p-6 max-[768px]:p-4">
      <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Writing</h2>
      <p className="text-sm mb-5" style={{ color: 'var(--text-tertiary)' }}>Articles and developer guides</p>

      <p className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>Publications</p>
      <div className="flex flex-col gap-3 mb-7">
        {publications.map((item) => <ArticleCard key={item.id} item={item} onOpen={setSelectedId} />)}
      </div>

      <div className="pt-6 border-t" style={{ borderColor: 'var(--border-light)' }}>
        <h3 className="text-base font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>Developer Guides</h3>
        <p className="text-xs mb-4" style={{ color: 'var(--text-tertiary)' }}>Reference handouts for understanding agentic systems, from orchestration to evaluation</p>
        <div className="grid grid-cols-2 gap-3 max-[768px]:grid-cols-1">
          {handouts.map((item) => <ArticleCard key={item.id} item={item} onOpen={setSelectedId} />)}
        </div>
      </div>
    </div>
  )
}

export default WritingApp
```

- [ ] **Step 2: Run the dev server and manually verify**

```bash
npm run dev
```

Open the printed local URL in a browser. Wait for the boot sequence, then click the new book-icon dock item labeled "Writing". Confirm:
- The window opens showing "Publications" (1 card: "From Vibe Coding to Agentic Engineering") and "Developer Guides" (5 cards).
- Clicking any card swaps to a "← Back to Writing" detail view with the article rendered — headings, the italic usage-note line, tables (handouts 2-5 and the publication both have tables), and bold text all visibly styled, not raw markdown syntax.
- Clicking "Back to Writing" returns to the list.
- Toggle dark mode (Settings window or theme toggle) and confirm the article text stays readable (light text on dark background, not the reverse).

Stop the dev server (Ctrl+C) once confirmed.

- [ ] **Step 3: Run lint**

Run: `npm run lint`
Expected: no errors in `src/components/apps/WritingApp.jsx`, `src/content/writing/index.js`, `src/context/WindowContext.jsx`, `src/components/Dock.jsx`, or `src/components/Desktop.jsx`.

- [ ] **Step 4: Run the production build**

Run: `npm run build`
Expected: build succeeds with no errors (this exercises the `?raw` imports through Vite's production pipeline, not just dev).

- [ ] **Step 5: Commit**

```bash
git add src/components/apps/WritingApp.jsx
git commit -m "feat: build the Writing app list and article detail views"
```

---

### Task 6: Add Evalforge Lite to the Projects window (app component)

**Files:**
- Modify: `src/components/apps/ProjectsApp.jsx`

**Interfaces:**
- No new exports; adds one entry to the existing `personalProjects` array (consumed by the existing render loop at line ~105).

- [ ] **Step 1: Add the project entry**

In `src/components/apps/ProjectsApp.jsx`, add Evalforge Lite as the first entry in `personalProjects` (so it's the most prominent):

old_string:
```
const personalProjects = [
  { title: 'AI Explorer', desc: 'Foundational vocabulary for understanding how modern AI is built, customized, and deployed.', tags: ['AI', 'Explanation', 'Concepts'], url: 'https://app-dun-phi.vercel.app/' },
```

new_string:
```
const personalProjects = [
  { title: 'Evalforge Lite', desc: 'Compares text LLMs across providers via OpenRouter, with automated grading, colorful score charts, and PDF/CSV reports.', tags: ['Python', 'Evaluation', 'LLM', 'OpenRouter'], url: 'https://evalforge-lite.onrender.com/' },
  { title: 'AI Explorer', desc: 'Foundational vocabulary for understanding how modern AI is built, customized, and deployed.', tags: ['AI', 'Explanation', 'Concepts'], url: 'https://app-dun-phi.vercel.app/' },
```

- [ ] **Step 2: Verify manually**

```bash
npm run dev
```

Open the site, click the "Projects" dock icon, confirm "Evalforge Lite" appears as the first card under "Personal Projects" with the 4 tags and correct URL (hover to confirm the preview iframe loads `https://evalforge-lite.onrender.com/`). Stop the dev server.

- [ ] **Step 3: Run lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/apps/ProjectsApp.jsx
git commit -m "feat: add Evalforge Lite to the Projects window"
```

---

### Task 7: Add Evalforge Lite to ProjectsSection (kept in sync per CLAUDE.md's dual-component convention)

**Files:**
- Modify: `src/components/ProjectsSection.jsx`
- Modify: `src/__tests__/components/ProjectsSection.test.jsx`

**Interfaces:**
- No new exports; adds one entry to the existing `projects` array in `ProjectsSection.jsx` (the array defined inside the component, around line 147).

- [ ] **Step 1: Update the test first (TDD — this will fail until Step 3)**

In `src/__tests__/components/ProjectsSection.test.jsx`, add `'Evalforge Lite'` to the `titles` array and bump the CTA count from 11 to 12:

old_string:
```
  const titles = [
    'AI Explorer',
    'LLM Frameworks',
```

new_string:
```
  const titles = [
    'Evalforge Lite',
    'AI Explorer',
    'LLM Frameworks',
```

old_string:
```
  it('renders 11 "Visit Project" CTAs', () => {
    render(<ProjectsSection />)
    const ctaLinks = screen.getAllByText('Visit Project')
    expect(ctaLinks.length).toBe(11)
  })
```

new_string:
```
  it('renders 12 "Visit Project" CTAs', () => {
    render(<ProjectsSection />)
    const ctaLinks = screen.getAllByText('Visit Project')
    expect(ctaLinks.length).toBe(12)
  })

  it('renders the Evalforge Lite tags', () => {
    render(<ProjectsSection />)
    expect(screen.getByText('Evaluation')).toBeInTheDocument()
    expect(screen.getByText('OpenRouter')).toBeInTheDocument()
  })
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm run test -- ProjectsSection`
Expected: FAIL — `renders "Evalforge Lite"` (heading not found), `renders 12 "Visit Project" CTAs` (expected 12, got 11), and `renders the Evalforge Lite tags` (text not found).

- [ ] **Step 3: Add the project entry to the component**

In `src/components/ProjectsSection.jsx`, add Evalforge Lite as the first entry in the `projects` array (inside `ProjectsSection`, right after `const projects = [`):

old_string:
```
  const projects = [
    {
      title: 'AI Explorer',
      description: 'The core AI concepts outlined on the AI Explorer site provide a foundational vocabulary for understanding how modern artificial intelligence is built, customized, and deployed.',
```

new_string:
```
  const projects = [
    {
      title: 'Evalforge Lite',
      description: 'Compares text LLMs across providers via OpenRouter, with automated grading, colorful score charts, and PDF/CSV reports.',
      tags: ['Python', 'Evaluation', 'LLM', 'OpenRouter'],
      url: 'https://evalforge-lite.onrender.com/',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 14l3-4 3 3 5-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: 'AI Explorer',
      description: 'The core AI concepts outlined on the AI Explorer site provide a foundational vocabulary for understanding how modern artificial intelligence is built, customized, and deployed.',
```

Also update the stagger-animation hook count so all 12 cards animate in (currently hardcoded to 14, which already covers 12 — verify, don't change, since 14 ≥ 12):

Run: `grep -n "useStaggerAnimation(14" src/components/ProjectsSection.jsx`
Expected: one match — confirms no change needed here since the count was already sized above the actual project count.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm run test -- ProjectsSection`
Expected: PASS, all tests green.

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectsSection.jsx src/__tests__/components/ProjectsSection.test.jsx
git commit -m "feat: add Evalforge Lite to ProjectsSection and its tests"
```

---

### Task 8: Full verification pass

**Files:** none (verification only)

- [ ] **Step 1: Run the full test suite**

Run: `npm run test`
Expected: all tests pass, including the untouched `ResumeSection.test.jsx` and the updated `ProjectsSection.test.jsx`.

- [ ] **Step 2: Run lint across the whole repo**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Run the production build**

Run: `npm run build`
Expected: succeeds with no errors or warnings about unresolved modules.

- [ ] **Step 4: Manual smoke test**

Run: `npm run preview`, open the printed URL, and confirm: the site boots normally, the Writing dock icon opens the new window with both sections and working article detail views in both light and dark theme, and the Projects window shows Evalforge Lite. Stop the preview server.

No commit for this task — it's verification only. If any step fails, fix the issue in the relevant earlier task's files and re-run this task from Step 1.
