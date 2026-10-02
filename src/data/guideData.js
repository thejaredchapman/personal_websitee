// Facts below were checked against Anthropic's model docs and the Claude Code docs.
// Status as of October 2, 2026. Models change; the docs are the source of truth.
export const MODELS_AS_OF = 'October 2, 2026'

// status: current | available | deprecated | retired
export const MODELS = [
  { name: 'Claude Fable 5.1', id: 'claude-fable-5-1', tier: 'Top', status: 'current', context: '1M', price: '$10 / $50', note: 'Hardest reasoning and long-running agent work', until: 'Not before Sep 1, 2027' },
  { name: 'Claude Opus 5.5', id: 'claude-opus-5-5', tier: 'Large', status: 'current', context: '1M', price: '$4 / $20', note: 'Long agentic coding. The default starting point', until: 'Not before Sep 22, 2027' },
  { name: 'Claude Sonnet 5.5', id: 'claude-sonnet-5-5', tier: 'Balanced', status: 'current', context: '1M', price: '$2 / $10', note: 'Best mix of speed and smarts for everyday coding', until: 'Not before Sep 28, 2027' },
  { name: 'Claude Haiku 4.5', id: 'claude-haiku-4-5-20251001', tier: 'Small', status: 'current', context: '200K', price: '$1 / $5', note: 'Fastest and cheapest. Great for small, repeated jobs', until: 'Not before Oct 15, 2026' },

  { name: 'Claude Fable 5', id: 'claude-fable-5', tier: 'Top', status: 'available', until: 'Not before Jun 9, 2027' },
  { name: 'Claude Opus 5', id: 'claude-opus-5', tier: 'Large', status: 'available', until: 'Not before Jul 24, 2027' },
  { name: 'Claude Sonnet 5', id: 'claude-sonnet-5', tier: 'Balanced', status: 'available', until: 'Not before Jun 30, 2027' },
  { name: 'Claude Opus 4.8', id: 'claude-opus-4-8', tier: 'Large', status: 'available', until: 'Not before May 28, 2027' },
  { name: 'Claude Opus 4.7', id: 'claude-opus-4-7', tier: 'Large', status: 'available', until: 'Not before Apr 16, 2027' },
  { name: 'Claude Opus 4.6', id: 'claude-opus-4-6', tier: 'Large', status: 'available', until: 'Not before Feb 5, 2027' },
  { name: 'Claude Sonnet 4.6', id: 'claude-sonnet-4-6', tier: 'Balanced', status: 'available', until: 'Not before Feb 17, 2027' },
  { name: 'Claude Opus 4.5', id: 'claude-opus-4-5-20251101', tier: 'Large', status: 'available', until: 'Not before Nov 24, 2026' },

  { name: 'Claude Sonnet 4.5', id: 'claude-sonnet-4-5-20250929', tier: 'Balanced', status: 'deprecated', until: 'Retires Nov 30, 2026' },

  { name: 'Claude Opus 4.1', id: 'claude-opus-4-1-20250805', tier: 'Large', status: 'retired', until: 'Retired Aug 5, 2026' },
  { name: 'Claude Opus 4', id: 'claude-opus-4-20250514', tier: 'Large', status: 'retired', until: 'Retired Jun 15, 2026' },
  { name: 'Claude Sonnet 4', id: 'claude-sonnet-4-20250514', tier: 'Balanced', status: 'retired', until: 'Retired Jun 15, 2026' },
  { name: 'Claude Haiku 3', id: 'claude-3-haiku-20240307', tier: 'Small', status: 'retired', until: 'Retired Apr 20, 2026' },
  { name: 'Claude Haiku 3.5', id: 'claude-3-5-haiku-20241022', tier: 'Small', status: 'retired', until: 'Retired Feb 19, 2026' },
  { name: 'Claude Sonnet 3.7', id: 'claude-3-7-sonnet-20250219', tier: 'Balanced', status: 'retired', until: 'Retired Feb 19, 2026' },
  { name: 'Claude Opus 3', id: 'claude-3-opus-20240229', tier: 'Large', status: 'retired', until: 'Retired Jan 5, 2026' },
  { name: 'Claude Sonnet 3.5', id: 'claude-3-5-sonnet-20241022', tier: 'Balanced', status: 'retired', until: 'Retired Oct 28, 2025' },
  { name: 'Claude 2 / 2.1 / Sonnet 3', id: 'claude-2.0, claude-2.1, claude-3-sonnet-20240229', tier: 'Mixed', status: 'retired', until: 'Retired Jul 21, 2025' },
  { name: 'Claude 1 and Instant', id: 'claude-1.x, claude-instant-1.x', tier: 'Mixed', status: 'retired', until: 'Retired Nov 6, 2024' },
]

export const MODEL_FILTERS = [
  { key: 'current', label: 'Current' },
  { key: 'available', label: 'Still available' },
  { key: 'deprecated', label: 'Retiring' },
  { key: 'retired', label: 'Retired' },
]

// What each tier is for, small to large
export const MODEL_TIERS = [
  { tier: 'Small', models: 'Haiku', use: 'Quick lookups, renames, boilerplate, and helper agents. Cheapest and fastest.' },
  { tier: 'Balanced', models: 'Sonnet', use: 'Most day-to-day coding: features, bug fixes, tests, refactors.' },
  { tier: 'Large', models: 'Opus', use: 'Tricky multi-file work, architecture, long autonomous runs.' },
  { tier: 'Top', models: 'Fable', use: 'The hardest reasoning. Slowest and the most expensive. Reach for it last.' },
]

export const COMPETITORS = [
  { name: 'GitHub Copilot', kind: 'In your editor', blurb: 'Autocomplete, chat, and agent modes inside VS Code, JetBrains and more, plus tight GitHub integration.' },
  { name: 'Cursor', kind: 'AI-first editor', blurb: 'A VS Code–based editor built around AI edits. You switch editors to get it.' },
  { name: 'Windsurf', kind: 'AI-first editor', blurb: 'Another AI-native editor with an agent built in. Same trade: adopt their editor.' },
  { name: 'OpenAI Codex', kind: 'Agent + CLI', blurb: "OpenAI's coding agent, available as a command-line tool and for background tasks." },
  { name: 'Gemini CLI / Code Assist', kind: 'Terminal agent', blurb: "Google's command-line agent and editor assistant, tied to Gemini models." },
  { name: 'Amazon Q Developer / Kiro', kind: 'Cloud-vendor tools', blurb: "AWS's assistants. Strongest if your whole stack already lives on AWS." },
  { name: 'Aider / Cline', kind: 'Open source', blurb: 'Free tools where you bring your own model and API key. Flexible, more DIY.' },
]

export const WHY_CLAUDE_CODE = [
  { title: 'It works where you already work', body: 'Terminal, VS Code, JetBrains, the desktop app, and the web. No new editor to adopt, and it takes on tasks across your whole project, not only the file you have open.' },
  { title: 'It does the whole loop', body: 'It reads the code, makes a plan, edits several files, runs your tests, reads the failures, and fixes them. You steer; it does the legwork.' },
  { title: 'It is built to be extended', body: 'Skills, plugins, MCP servers, hooks, and subagents let you teach it your team’s way of working instead of re-explaining it every day. MCP, the open standard for connecting tools, was created by Anthropic.' },
  { title: 'Safety is part of the design', body: 'Permission modes, plan mode, and checks on risky actions mean you choose how much trust to hand over, and can take it back at any moment.' },
  { title: 'Strong models underneath', body: 'Claude models are tuned for long, multi-step coding work, and you can pick a model per task to balance quality, speed, and cost.' },
]

export const PERMISSION_MODES = [
  { id: 'default', name: 'Manual', risk: 1, asks: 'Asks before it edits files or runs commands. Reads are free.', use: 'Learning, sensitive code, anything you can’t undo.' },
  { id: 'plan', name: 'Plan', risk: 1, asks: 'Read-only. It explores and proposes a plan; nothing is edited until you approve.', use: 'Before any big or unfamiliar change.' },
  { id: 'acceptEdits', name: 'Accept edits', risk: 2, asks: 'Edits files and makes folders without asking. Still asks before other commands.', use: 'You are watching the diff and iterating quickly.' },
  { id: 'auto', name: 'Auto', risk: 3, asks: 'Runs without asking, while a second AI model reviews each action and blocks risky ones (like force-pushing). It is a safety net, not a guarantee.', use: 'Long tasks in a project with git and good tests.' },
  { id: 'dontAsk', name: 'Don’t ask', risk: 2, asks: 'Only runs tools you pre-approved. Everything else is denied.', use: 'Locked-down scripts and CI.' },
  { id: 'bypassPermissions', name: 'Bypass', risk: 5, asks: 'Does everything with no prompts at all.', use: 'Throwaway containers or VMs only. Never your real machine.' },
]

export const RISKS = [
  { title: 'It can delete or overwrite your work', fix: 'Commit to git first and work on a branch, so you can always roll back.' },
  { title: 'Running commands is real power', fix: 'It runs the same terminal commands you could: installs, deletes, network calls. Read commands before approving.' },
  { title: 'Secrets can leak', fix: 'Keep passwords, API keys, and .env files out of the conversation, and never hand it production credentials.' },
  { title: 'Text can trick it (prompt injection)', fix: 'A webpage, file, or issue can hide instructions aimed at the AI. Be wary when it reads things you didn’t write.' },
  { title: 'It can be confidently wrong', fix: 'It may invent functions or packages that don’t exist. Run the tests, and check any new dependency is real.' },
  { title: 'Loops can burn money', fix: 'Long autonomous runs use many tokens. Watch usage and set limits.' },
  { title: 'You can ship what you don’t understand', fix: 'If you can’t explain a change, don’t merge it. Ask it to explain, then verify.' },
]

export const RESPONSIBLE = [
  'You are accountable for every line you ship, whoever (or whatever) wrote it. Read the diff.',
  'Verify before you trust: run the tests, try the feature, check that new packages and APIs exist.',
  'Protect other people’s data. Never paste customer data, secrets, or private code you aren’t allowed to share.',
  'Follow your school or employer’s AI policy, including licensing and what may leave your machine.',
  'Be honest about AI help when it matters, such as in code review, coursework, or published work.',
  'Keep a human in the loop for anything high-stakes: security, money, health, safety, and people’s livelihoods.',
]

export const MD_FILES = [
  { file: 'README.md', who: 'People', what: 'What the project is and how to run it. Written for humans, and Claude reads it too.' },
  { file: 'CLAUDE.md', who: 'Claude, every session', what: 'Your project’s standing rules: commands, conventions, architecture. Loaded into every session, so keep it short (under about 200 lines).' },
  { file: 'AGENTS.md', who: 'Many AI tools', what: 'A shared convention other coding assistants read. Claude Code reads it when there is no CLAUDE.md, or you can import it from one.' },
  { file: 'SKILL.md', who: 'Claude, on demand', what: 'A packaged how-to with a description. Loaded only when the task matches, so long instructions cost nothing until used.' },
  { file: 'intent.md', who: 'You + Claude', what: 'A convention, not a built-in feature: one page saying what you want, why, the limits, and how you will know it is done. Point Claude at it at the start of a task.' },
]

export const SKILL_EXAMPLE = `---
name: explain-error
description: Explains an error message in plain English and
  suggests a fix. Use when the user pastes a stack trace or
  asks "what does this error mean".
---

1. Quote the key line of the error.
2. Explain it in one plain sentence.
3. Suggest the smallest fix, and say how to verify it.`

export const INTENT_EXAMPLE = `# intent.md
Goal:    Add a dark-mode toggle to the settings page.
Why:     Users keep asking; many work at night.
Limits:  No new dependencies. Don't touch the login flow.
Done =   Toggle works, choice persists, existing tests pass.`

export const SAVE_MONEY = [
  { tip: 'Match the model to the job', how: 'Use Sonnet for most work and save Opus or Fable for hard problems. Switch any time with /model.' },
  { tip: 'Start fresh between tasks', how: 'Type /clear when you switch topics. Old conversation is re-sent with every message and you pay for it.' },
  { tip: 'Plan before you build', how: 'Plan mode catches a wrong direction while it is cheap, before it edits ten files.' },
  { tip: 'Be specific', how: '"Add validation to the login function in auth.ts" beats "improve this codebase", which triggers wide, costly searching.' },
  { tip: 'Keep CLAUDE.md lean', how: 'It loads every session. Move specialist how-tos into skills, which only load when needed.' },
  { tip: 'Turn off unused MCP servers', how: 'Run /context to see what is eating space and /mcp to disable what you don’t need.' },
  { tip: 'Use cheaper helpers for chores', how: 'Subagents can run on Haiku for tests and log-digging, keeping noisy output out of your main chat.' },
  { tip: 'Lower the effort on easy tasks', how: 'Use /effort to dial down deep thinking when the task is simple.' },
]

export const PLAN_STEPS = [
  { n: 1, title: 'Write the intent', body: 'Goal, why, limits, and how you will know it is done. Two minutes of writing saves an hour of re-work.' },
  { n: 2, title: 'Enter plan mode', body: 'Press Shift+Tab until the status bar says plan mode, or start your prompt with /plan. Claude can read but not edit.' },
  { n: 3, title: 'Review the plan', body: 'Check the files it will touch and the order. Push back on anything surprising. Ask "what could go wrong?"' },
  { n: 4, title: 'Approve, then choose how to proceed', body: 'Approving switches modes so it can start. Start in Manual or Accept edits, so you can watch the first changes.' },
  { n: 5, title: 'Verify and commit', body: 'Run the tests, read the diff, then commit. If it drifts, press Esc to stop and /rewind to go back.' },
]
