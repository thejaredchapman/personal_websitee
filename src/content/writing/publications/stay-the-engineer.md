# Stay the Engineer: Using AI to Get Better, Not Get Replaced

*Five habits, twenty tools, and one honest rule: if you can't explain the change, you don't own it.*

*Disclaimer: The opinions in this article are my own. I wrote it using my own personal Claude account and my own property. They do not represent the beliefs or views of my employer, any organization I'm affiliated with, or anyone else — only mine.*

---

*(Mild spoiler for the newest season of* Reacher.*)*

I was watching the newest season of *Reacher*, and there's a scene that stuck with me. The villains have a blurry photo. They bring in an AI engineer, and he prompts his way, step by step, to a clear image.

When his task is complete, they slit his throat.

It's a TV show. It's dramatic on purpose. But I couldn't stop thinking about it, because it shows two things about working with AI that are uncomfortably real.

**First: his only value was the output.** He wasn't there for his judgment, his creativity, or his understanding. He was a one-trick pony: a prompt operator. Once his task was complete, he was disposable. That's what "replaced by AI" actually looks like: not a robot taking your chair, but your value ending the moment the output shows up.

**Second: he never asked what the output was for.** Who wanted this photo? What were they going to do with it? He got so focused on *can I make this work* that he never stopped to ask *should I* — and what happens after.

And it got me thinking: how do engineers use AI to *accentuate* their work — and not become a one-trick pony?

I know, that's a jump from a TV murder to software engineering. That's just how my improv brain works. But stick with me, because the second question followed right behind it: how do I help other people use AI so it isn't harmful?

This article is my answer.

AI coding tools have gotten good. Really good. Good enough that the most dangerous button in your editor is no longer "Delete." It's **"Accept All."**

---

## AI Is Not the End-All, Be-All

Let me say this plainly, because the hype won't: **AI is not the end-all, be-all.** It's the most powerful tool most of us have ever had — and it's still a tool. Human oversight and human creativity aren't nice-to-haves in this new world. They're the whole job.

Here's the mental model I use: **AI is a multiplier.** It multiplies whatever you bring to it. Bring deep understanding of the problem, and it makes you dramatically faster. Bring zero understanding, and — well, anything times zero is still zero. You just get to zero faster, with more files.

There are two things AI can't supply for you:

- **Creativity.** Framing the problem. Noticing that the ticket asks for the wrong thing. Choosing between three reasonable designs based on where the product is going next year.
- **Context.** What the system is *for*. Who uses it. What broke last time someone touched this module. Which customer will call your CEO if the invoice totals are off by a cent.

### Understand the code — and its ramifications

When you accept AI-generated code, you're not accepting a suggestion. **You're signing your name to it.** You own what it does, including everything it does downstream that nobody asked about.

So before you accept, run through this checklist. It takes thirty seconds, and it works whether you've been coding for twenty years or twenty days:

1. **Can I explain what this code does** — line by line, if someone asked?
2. **What does it touch?** Data, users, money, security, other services?
3. **What happens if it's wrong?** Who gets hurt, and how badly?
4. **Can I roll it back?**
5. **Could I debug it at 2 a.m. without the AI?**

If any answer is "I don't know," you're not done yet. Ask the AI to explain. Read the code. Run it. *Then* decide.

> **If you can't explain the change, you don't own it.**

---

## Words You'll See in This Article

New to some of this? Here's a quick cheat sheet so you don't have to leave the page.

- **AI coding agent** — An AI tool (like Claude Code, Cursor, or Copilot's agent mode) that doesn't just suggest code, but can read files, run commands, and make changes on its own.
- **Diff** — The "before and after" view of a code change: red lines removed, green lines added.
- **MCP server** — MCP stands for *Model Context Protocol*. An MCP server is a plug-in that lets an AI agent talk to another tool — GitHub, a database, a browser, a design file. Think of it as giving the AI a new pair of hands. ([What is MCP?](https://modelcontextprotocol.io/))
- **Skill** — A packaged set of instructions that teaches an AI agent *how* to do a specific kind of task (like "write tests first" or "make a spreadsheet"). ([Skills docs](https://code.claude.com/docs/en/skills))
- **Hook** — A rule that runs automatically at a certain moment (say, before every command). The AI can't skip it.
- **Subagent** — A separate AI helper that your main agent hands a task to. It works in its own fresh workspace and reports back.
- **Auto mode / `--dangerously-skip-permissions`** — Settings that let an AI agent act without asking you first. (Yes, the word "dangerously" is in the actual flag name. That's a hint.)

---

> ### ⚠️ CYA: Get It Approved First
>
> **CYA — Cover Your Ass.** If you're using any of this at work, get it approved before you start.
>
> - **Installing tools:** MCP servers, plugins, skills, and even small command-line tools may need sign-off from your security or IT team before they touch a work machine.
> - **Data leaving the building:** When you connect an AI to Jira, GitHub, Sentry, Figma, or a database, that data flows into the AI's context. Check your company's AI and data policies first.
> - **Autonomy modes:** Auto mode and `--dangerously-skip-permissions` may be flat-out forbidden where you work — no matter what this article says.
> - **Licenses:** Confirm the open-source licenses are OK for your company's use.
>
> Asking first is cheap. Explaining later is not.

> ### 📖 Read the Docs. Know What You're Doing.
>
> Every tool below links to its official docs, and most link to a video so you can see it in action. **Read the docs before you install anything** — so you understand exactly what the tool can see, what it can do, and where your data goes.
>
> - **Token usage (and cost):** Some tools can burn through tokens fast — subagents, browser automation with screenshots, MCP servers that pull large docs, logs, or query results into the conversation, and simply having lots of MCP servers connected at once. Watch your usage. ([Managing costs in Claude Code](https://code.claude.com/docs/en/costs))
> - **Data leakage:** Anything an MCP server reads — tickets, error logs, database rows, design files — goes into the AI's context and to the model provider. Community servers are third-party code running on your machine. And content the AI reads (a ticket, a web page) can contain instructions meant to trick it. ([Claude Code security](https://code.claude.com/docs/en/security) · [MCP in Claude Code](https://code.claude.com/docs/en/mcp))
> - **Know who's teaching you:** Each video lists who made it and a one-line description of who they are. *Official* videos come from the tool's makers. *Community* videos come from independent creators: developers, educators, and conference speakers. Community videos are often the most practical, but they're one person's take, so treat them like advice from a smart stranger.
> - **Videos age fast:** They're great for seeing a tool work, but setup steps change. The docs are the source of truth.
> - **It's on you:** This article is a starting point, not a guarantee. It's up to you to understand what each tool does before you turn it on.
>
> **Know what you're doing.** Same rule as the code: if you can't explain what a tool is doing, don't run it.

---

## Five Habits (and the Tools That Back Them Up)

Tools don't make you a better engineer. Habits do. The right tools just make good habits easier to keep.

So instead of a giant list of tools, here are five habits — and under each one, the tools that support it. Every tool follows the same simple format: what it is in plain English, how it helps, what you *still* have to check yourself, and one small thing you can try today.

---

### Habit 1: Think Before You Prompt

**Sketch your own approach first. Then compare it with the AI's.**

If you go straight to the prompt, the AI's first idea becomes *your* idea by default. You lose the chance to notice it picked a worse approach — because you never had an approach to compare it with.

Junior example: before asking the AI to "add pagination," write down in two sentences how *you'd* do it. Offset or cursor? Where does the page size come from? Now when the AI answers, you're reviewing — not just receiving.

#### Superpowers · *Skills plugin*

- **In plain English:** A collection of skills that makes your AI agent follow a real engineering process instead of jumping straight to code.
- **How it helps:**
  - Starts with *brainstorming* — it asks you questions one at a time, proposes approaches, and writes a design before any code exists.
  - Turns the design into a step-by-step plan, then carries it out with test-driven development.
  - Includes systematic debugging (find the root cause before fixing), code review, and a "verify before you say it's done" rule.
  - Lets you choose to run the plan inline or with subagents (more on that later).
- **Stay-the-engineer check:** It asks you questions for a reason. Actually answer them — don't just click "sounds good."
- **Try this today:** Install it from the Claude Code plugin marketplace (`/plugin`), then start your next feature with: *"Let's brainstorm this before writing code."*
- **Read the docs first:** [Superpowers on GitHub](https://github.com/obra/superpowers) · [Claude Code plugins](https://code.claude.com/docs/en/plugins)
- **Watch it in action:**
  - [Claude Code + Superpowers: full tutorial](https://www.youtube.com/watch?v=TX91PdBn_IA) — **Eric Tech**: a channel teaching professionals and businesses how to use AI to automate their work.
  - [Using the Superpowers brainstorming skill](https://www.youtube.com/watch?v=nxeS5Yzo51U) — **Alex To Go**: a channel breaking down the latest AI tools, models, and workflows, with a no-hype approach.

#### Sequential Thinking · *MCP server*

- **In plain English:** Gives the AI a structured scratchpad to reason through a hard problem step by step — and revise earlier steps when it learns something new.
- **How it helps:**
  - You can *see* the reasoning, not just the answer.
  - Makes it easy to spot exactly which step went wrong.
- **Stay-the-engineer check:** Read the steps. A confident chain of logic built on a wrong first assumption is still wrong.
- **Try this today:** `claude mcp add sequential-thinking -- npx -y @modelcontextprotocol/server-sequential-thinking`, then ask it to think through a tricky bug step by step.
- **Read the docs first:** [Sequential Thinking server](https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking)
- **Watch it in action:**
  - [Sequential Thinking MCP server](https://www.youtube.com/watch?v=R-5ucM-5P5o) — **JeredBlu**: an AI strategist and product veteran (and privacy and accessibility advocate) making hands-on AI tutorials.

#### Jira/Confluence (Atlassian) or Linear · *MCP server*

- **In plain English:** Lets the AI read your team's tickets and specs directly from where they actually live.
- **How it helps:**
  - The AI works from the real acceptance criteria, not your half-remembered summary.
  - Can link work back to the ticket and update its status.
- **Stay-the-engineer check:** Tickets are often wrong or incomplete. Noticing that is *your* job — and it's one of the most valuable things you do.
- **Try this today:** Connect your tracker's official MCP server, then ask: *"Read ticket ABC-123 and list anything ambiguous before we start."*
- **Read the docs first:** [Atlassian MCP server](https://support.atlassian.com/rovo/docs/getting-started-with-the-atlassian-remote-mcp-server/) · [Linear MCP server](https://linear.app/docs/mcp)
- **Watch it in action:**
  - [Connect Claude to Jira in 5 minutes](https://www.youtube.com/watch?v=-nImrNMZVpY) — **Thetips4you**: a DevOps tutorial channel covering Docker, Kubernetes, CI/CD, Terraform, and cloud.
  - [Linear MCP for product management](https://www.youtube.com/watch?v=4E3vqKK4nm0) — **Linear**: *(official)* the company behind Linear, the product development and issue-tracking tool.

#### Figma Dev Mode · *MCP server*

- **In plain English:** Lets the AI read a Figma design directly — real colors, spacing, and components — instead of guessing from a screenshot.
- **How it helps:**
  - Builds with your design system's actual values and components.
  - Fewer "close but not quite" UI rounds with your designer.
- **Stay-the-engineer check:** Designs don't show every state. Loading, errors, empty lists, long names, small screens — still on you.
- **Try this today:** Enable the MCP server in Figma's desktop app, select a frame, and ask the AI to list the components and states it sees *before* it builds anything.
- **Read the docs first:** [Figma MCP server docs](https://developers.figma.com/docs/figma-mcp-server/)
- **Watch it in action:**
  - [How to set up the Dev Mode MCP server](https://www.youtube.com/watch?v=Jxh3G28ApYI) — **Figma**: *(official)* the company behind the Figma design tool.

---

### Habit 2: Read Diffs Like a Reviewer, Not a Spectator

**Don't watch the changes scroll by. Review them — and ask "why?" about anything you don't understand.**

A spectator sees green checkmarks and relaxes. A reviewer asks, *"Why did it change this file? What happens to the old callers?"* The AI will happily explain its own work — you just have to ask.

Junior example: when you see a change you don't get, ask *"Why did you change this line, and what would break if you hadn't?"* You'll learn more from that one question than from a week of accepting everything.

#### difftastic · *CLI tool*

- **In plain English:** A diff tool that understands code structure, not just lines of text.
- **How it helps:**
  - Ignores pure formatting noise, so the *real* changes stand out.
  - Makes large AI-generated changes much easier to read.
- **Stay-the-engineer check:** A cleaner diff is easier to read. You still have to read it.
- **Try this today:** `brew install difftastic` (or `cargo install difftastic`), then run `GIT_EXTERNAL_DIFF=difft git diff`.
- **Read the docs first:** [difftastic manual](https://difftastic.wilfred.me.uk/)
- **Watch it in action:**
  - [Moving to structural diffs: trying out Difftastic](https://www.youtube.com/watch?v=pARy5XnLHKQ) — **Andrew Tropin**: a developer who hacks on operating systems and programming languages (GNU Guix, Emacs, Lisp) and reviews the tools they use.

#### git-absorb · *CLI tool*

- **In plain English:** Automatically folds your small fixes into the right earlier commits.
- **How it helps:**
  - AI sessions tend to produce messy commit histories ("fix," "fix again," "actually fix"). This cleans them into small, reviewable commits.
  - Your reviewers — and future you — can read the history like a story.
- **Stay-the-engineer check:** Look at the result before pushing. Clean history should also be *true* history.
- **Try this today:** `brew install git-absorb`, stage your fixes, then run `git absorb --and-rebase`.
- **Read the docs first:** [git-absorb on GitHub](https://github.com/tummychow/git-absorb)

#### GitHub · *MCP server*

- **In plain English:** Lets the AI read and work with your pull requests, issues, and review comments.
- **How it helps:**
  - Pulls review feedback straight into the conversation, so nothing gets missed.
  - Can summarize a long PR thread or draft replies.
- **Stay-the-engineer check:** Don't let the AI argue with your reviewers for you. If a reviewer's comment is right, understand *why* it's right.
- **Try this today:** Connect GitHub's official MCP server and ask: *"Summarize the unresolved review comments on my PR and explain each one."*
- **Read the docs first:** [GitHub MCP server](https://github.com/github/github-mcp-server)
- **Watch it in action:**
  - [Introducing the GitHub MCP Server](https://www.youtube.com/watch?v=d3QpQO6Paeg) — **GitHub**: *(official)* GitHub's own channel; this episode features members of the team that built the server.

#### Semgrep · *MCP server*

- **In plain English:** A security scanner the AI can run on the code it just wrote.
- **How it helps:**
  - Catches common insecure patterns (injection, hard-coded secrets, unsafe functions) that are easy to miss on a quick read.
  - Runs inside the AI's loop, so problems are fixed before you even see the diff.
- **Stay-the-engineer check:** "No findings" doesn't mean "secure." Scanners catch known patterns, not bad design.
- **Try this today:** Run `semgrep scan --config auto` on your repo once, just to see what it finds.
- **Read the docs first:** [Semgrep MCP server](https://github.com/semgrep/mcp)
- **Watch it in action:**
  - [Semgrep MCP](https://www.youtube.com/watch?v=RfqxbSwbT6Q) — **Semgrep**: *(official)* the company behind Semgrep, the open-source static analysis tool.

#### Document skills (PDF, Word, Excel, PowerPoint) · *Skills*

- **In plain English:** Skills that let the AI read and create real office files — reports, spreadsheets, slide decks.
- **How it helps:**
  - Useful in any industry: finance reports, compliance docs, client decks, data exports.
  - Produces actual files, not text you have to copy and paste.
- **Stay-the-engineer check:** Review the output like a diff. Check that the formulas actually calculate what you think they do, the numbers match the source, and every chart is labeled.
- **Try this today:** Ask your agent to turn a CSV into a formatted spreadsheet with a summary tab — then spot-check three numbers by hand.
- **Read the docs first:** [Anthropic skills repo](https://github.com/anthropics/skills) · [Claude Code skills docs](https://code.claude.com/docs/en/skills)
- **Watch it in action:**
  - [Claude using Excel and Word skills](https://www.youtube.com/watch?v=uQdIL_dSELw) — **TechieTalksAI**: a learning channel for AI, robotics, and automation aimed at real-world use.

---

### Habit 3: Define "Done" With Tests You Wrote or Approved

**If the AI writes the code *and* decides when it's done, nobody's actually checking.**

Tests are how you tell the AI what "correct" means, in a language it can't argue with. Write them yourself — or at least read and approve them before the code gets written.

Junior example: before asking for a function that splits a bill between friends, write three test cases yourself. What if the bill doesn't divide evenly? What if there's one person? Zero people?

#### Playwright MCP / Claude in Chrome · *MCP server / browser extension*

- **In plain English:** Lets the AI open a real browser, click around your app, and check that it actually works.
- **How it helps:**
  - The AI verifies its UI changes instead of just claiming "this should work."
  - Can capture screenshots and read browser console errors.
- **Stay-the-engineer check:** The AI tests the path it expects. Try the weird paths yourself — the back button, a double-click, a slow network.
- **Try this today:** `claude mcp add playwright -- npx @playwright/mcp@latest`, then ask: *"Open the app and test the signup form, including invalid inputs."*
- **Read the docs first:** [Playwright MCP](https://github.com/microsoft/playwright-mcp) · [Claude Code + Chrome](https://code.claude.com/docs/en/chrome)
- **Watch it in action:**
  - [Playwright MCP servers explained](https://www.youtube.com/watch?v=U5Hsa6s2EqE) — **Debbie O'Brien**: a developer sharing real workflows (not just demos) with AI agents, MCP servers, and Playwright.
  - [Claude Code can now automate work in Chrome](https://www.youtube.com/watch?v=Irl90FjzuOc) — **Developers Digest**: a channel covering where AI meets software development.

#### pre-commit · *CLI tool*

- **In plain English:** Runs your checks (formatters, linters, secret scanners) automatically before every commit.
- **How it helps:**
  - AI-written code faces exactly the same gate as yours. No exceptions.
  - Catches problems in seconds, before they reach a reviewer.
- **Stay-the-engineer check:** Never let the AI "fix" a failing check by disabling it. Watch for `--no-verify` and ignore comments sneaking into diffs.
- **Try this today:** `pip install pre-commit`, add a `.pre-commit-config.yaml`, then run `pre-commit install`.
- **Read the docs first:** [pre-commit.com](https://pre-commit.com/)
- **Watch it in action:**
  - [Pre-commit: enforce coding best practices](https://www.youtube.com/watch?v=nX6wOF9aP_g) — **Infralovers**: an IT training and consulting company.

#### Hypothesis (Python) / fast-check (JavaScript) · *Testing libraries*

- **In plain English:** Instead of writing one example per test, you describe a *rule* ("sorting twice equals sorting once"), and the library generates hundreds of test inputs to try to break it.
- **How it helps:**
  - Finds the edge cases AI (and humans) forget: empty lists, huge numbers, weird Unicode.
  - When it finds a failure, it shrinks it down to the smallest example that breaks.
- **Stay-the-engineer check:** The rules are the hard part — and they're yours to think up. That's the creative work.
- **Try this today:** `pip install hypothesis` and write one test with `@given(st.lists(st.integers()))` for a function you already have.
- **Read the docs first:** [Hypothesis docs](https://hypothesis.readthedocs.io/) · [fast-check docs](https://fast-check.dev/)
- **Watch it in action:**
  - [Property-based testing with Hypothesis](https://www.youtube.com/watch?v=6a1RvMKj0ws) — **Swiss Python Summit**: recorded talks from the Swiss Python conference. The speaker, Freya Bruhin, is a pytest maintainer and the creator of the qutebrowser browser.
  - [Property-based testing (NDC Oslo 2023)](https://www.youtube.com/watch?v=i9Q-hUwYmII) — **NDC Conferences**: a long-running international software developer conference series. Speaker: Lucy Mair. The concepts apply to fast-check too.

#### mutmut (Python) / Stryker (JavaScript and more) · *CLI tools*

- **In plain English:** Deliberately introduces small bugs into your code and checks whether your tests catch them.
- **How it helps:**
  - Shows you whether AI-written tests actually *test* anything, or just run without failing.
  - Points to the exact lines your tests don't really protect.
- **Stay-the-engineer check:** A surviving bug is a question, not an automatic to-do. Decide whether that line truly matters.
- **Try this today:** `pip install mutmut`, run `mutmut run` on a small module, then `mutmut results`.
- **Read the docs first:** [mutmut on GitHub](https://github.com/boxed/mutmut) · [Stryker](https://stryker-mutator.io/)
- **Watch it in action:**
  - [Mutation testing: theory and practice](https://www.youtube.com/watch?v=yI8Yje1XDkk) — **Anders Hovmöller**: the creator of mutmut, explaining it firsthand.
  - [Mutation testing in JavaScript with StrykerJS](https://www.youtube.com/watch?v=3FN1r43yJHU) — **Kelvin Omereshone**: a channel for mid-level and senior web developers. The guest, Nico Jansen, is a maintainer of Stryker.

---

### Habit 4: Write the Rules in Your Own Words

**Keep a rules file (like `CLAUDE.md`) that describes *your* project's conventions — in your words.**

If you don't teach the AI how your team works, it'll fall back on generic habits from the internet. Writing the rules yourself also forces you to understand them — which is half the point.

Junior example: start with five lines. How to run the tests. Which folders not to touch. One naming convention. One thing that burned the team before. Add a line every time the AI makes a mistake twice.

#### skill-creator · *Skill*

- **In plain English:** A skill for building your own skills.
- **How it helps:**
  - Turns your team's repeated processes — release checklists, PR templates, migration steps — into reusable instructions the AI follows every time.
  - Your expertise becomes something the whole team can use.
- **Stay-the-engineer check:** A skill encodes *your* judgment. Keep it updated when that judgment changes.
- **Try this today:** Ask your agent: *"Use skill-creator to turn our PR checklist into a skill."*
- **Read the docs first:** [skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) · [Claude Code skills docs](https://code.claude.com/docs/en/skills)
- **Watch it in action:**
  - [How to use Skill Creator to build new skills](https://www.youtube.com/watch?v=rihf3-mpNG4) — **Nick Babich**: a channel about user experience and interface design, which makes it a good non-engineer view of building skills.

#### Memory · *MCP server*

- **In plain English:** Gives the AI a long-term memory across sessions, stored as a simple graph of facts.
- **How it helps:**
  - Remembers project decisions ("we chose Postgres over Mongo because…") so you don't re-explain them every session.
  - Keeps preferences consistent over time.
- **Stay-the-engineer check:** Memories go stale. Review and delete the wrong ones — an AI confidently remembering an old decision is worse than one that forgot.
- **Try this today:** `claude mcp add memory -- npx -y @modelcontextprotocol/server-memory`, then tell it one key decision about your project.
- **Read the docs first:** [Memory server](https://github.com/modelcontextprotocol/servers/tree/main/src/memory)
- **Watch it in action:**
  - [Knowledge graph (Memory) MCP server tutorial](https://www.youtube.com/watch?v=qeru0ZdudD4) — **JeredBlu**: an AI strategist and product veteran making hands-on AI tutorials.

#### Hooks / hookify · *Claude Code feature / plugin*

- **In plain English:** Rules that run automatically at set moments — before a command runs, after a file is edited, before the AI says it's done. The AI can't skip them.
- **How it helps:**
  - Block dangerous commands (like `rm -rf`) before they run.
  - Require tests to pass before the AI is allowed to stop.
  - hookify lets you create these rules by describing them in plain language.
- **Stay-the-engineer check:** Hooks are the guardrail that makes more autonomy *earnable*. Test your hooks, too — a hook that silently fails is worse than no hook.
- **Try this today:** Run `/hookify` and describe one rule, like *"warn me before any command that deletes files."*
- **Read the docs first:** [Claude Code hooks reference](https://code.claude.com/docs/en/hooks) · [hookify plugin](https://github.com/anthropics/claude-code/tree/main/plugins/hookify)
- **Watch it in action:**
  - [Hooks in Claude Code](https://www.youtube.com/watch?v=IkaPHiMDazM) — **Claude**: *(official)* Anthropic's channel for Claude.

---

### Habit 5: Use AI to Learn, Not Just to Finish

**Every AI session is a chance to get better. Don't waste it just getting done.**

The fastest way to be replaceable is to let the AI do everything you don't understand. The fastest way to be *irreplaceable* is to use it as the most patient teacher you've ever had.

Junior example: after the AI solves something, ask: *"What are three other ways to do this, and what are the tradeoffs?"* Then ask why it picked the one it did.

#### Context7 · *MCP server*

- **In plain English:** Pulls up-to-date, version-specific documentation for the libraries you're using, straight into the AI's context.
- **How it helps:**
  - Fewer made-up or outdated functions — a common source of AI bugs.
  - You learn the *real* current API alongside the AI.
- **Stay-the-engineer check:** Check which version of the docs it pulled — it should match what your project actually uses.
- **Try this today:** `claude mcp add context7 -- npx -y @upstash/context7-mcp`, then add *"use context7"* to your next question about a library.
- **Read the docs first:** [Context7 on GitHub](https://github.com/upstash/context7)
- **Watch it in action:**
  - [Claude Code + Context7 MCP server](https://www.youtube.com/watch?v=BJX6uJHIz5U) — **All About AI**: a channel showing how to use generative AI for creative and everyday tasks.

#### Sentry · *MCP server*

- **In plain English:** Lets the AI read real production errors and stack traces from Sentry.
- **How it helps:**
  - Debugging starts from what actually happened, not guesses.
  - A great way to learn how your system *really* fails in the wild.
- **Stay-the-engineer check:** Fix the cause, not the symptom. "Wrap it in a try/catch" is rarely the real answer.
- **Try this today:** Connect Sentry's official MCP server and ask: *"Explain the top error from this week and its most likely root cause."*
- **Read the docs first:** [Sentry MCP docs](https://docs.sentry.io/product/sentry-mcp/) · [Sentry MCP on GitHub](https://github.com/getsentry/sentry-mcp)
- **Watch it in action:**
  - [Configuring and using the Sentry MCP server](https://www.youtube.com/watch?v=-GMmoXbU004) — **Sentry**: *(official)* the company behind the Sentry error-monitoring platform.

#### Postgres (read-only) · *MCP server*

- **In plain English:** Lets the AI look at your database's structure and run queries.
- **How it helps:**
  - Queries match your real tables and columns — no guessing.
  - A safe way to explore and learn an unfamiliar database.
- **Stay-the-engineer check:** Connect with a **read-only database user.** Always. This is least privilege in action: give any tool — AI or not — only the access it truly needs.
- **Try this today:** Create a read-only role on a dev or staging database (never production to start), connect a Postgres MCP server with it, and ask the AI to explain how three tables relate.
- **Read the docs first:** [Postgres MCP Pro](https://github.com/crystaldba/postgres-mcp) (one maintained option) · [Postgres read-only roles](https://www.postgresql.org/docs/current/predefined-roles.html)
- **Watch it in action:**
  - [PostgreSQL MCP server: overview and read-only access (short)](https://www.youtube.com/watch?v=450ZL_wfSqo) — **State Change**: a community focused on the hardest parts of low-code, automation, and AI projects.

#### ffmpeg · *MCP server*

- **In plain English:** Lets the AI run ffmpeg — the Swiss Army knife of audio and video — using plain language instead of memorized flags.
- **How it helps:**
  - Convert formats, trim clips, compress large files, pull out the audio, and grab frames or thumbnails.
  - Make quick GIFs of a new feature for your pull requests and demos.
  - Batch-process a whole folder of media in one request.
- **Stay-the-engineer check:** Read the ffmpeg command it generates — that's how you learn ffmpeg along the way. And confirm the output path before it overwrites your originals.
- **Try this today:** Several community ffmpeg MCP servers exist; pick one that's actively maintained, then ask: *"Turn this screen recording into a 10-second GIF for my PR — and show me the command you ran."*
- **Read the docs first:** [ffmpeg documentation](https://ffmpeg.org/documentation.html) · [MCP Registry](https://registry.modelcontextprotocol.io/) (search for a maintained ffmpeg server)
- **Watch it in action:**
  - [Advanced FFmpeg in plain English using Claude](https://www.youtube.com/watch?v=WPxRYgUi5V4) — **Arnold Biffna**: a personal channel with programming tips and walkthroughs of the creator's own apps.

---

## Earning Autonomy: Auto Mode and `--dangerously-skip-permissions`

At some point you'll be tempted to let the AI run without asking permission for every step. Auto mode, "accept all edits," `--dangerously-skip-permissions` — they're real features, and there are good times to use them.

But here's my stance: **earn it. Don't default to it.** Read exactly what each mode allows before you use it: [Claude Code permission modes](https://code.claude.com/docs/en/permission-modes).

You've earned it when all five habits above are already in place. Before you flip the switch, check every box:

- [ ] **It's isolated.** A container, dev container, or separate git worktree — not your main machine with everything on it. ([Claude Code dev containers](https://code.claude.com/docs/en/devcontainer))
- [ ] **Git is clean**, and you have checkpoints you can roll back to.
- [ ] **Tests and hooks fail loudly** (Habits 3 and 4).
- [ ] **The task is small, bounded, and well understood** (Habit 1).
- [ ] **No production credentials are reachable.** None. Not in a `.env` file, not in your shell.

**Good uses:** scaffolding a new project, mechanical refactors behind a strong test suite, bulk formatting and renames.

**Bad uses:** authentication, data migrations, payments, anything touching production — and anything you can't verify afterwards.

> **At work?** Check the CYA box above. Your company's policy beats this checklist.

And if you're not sure whether you've earned it yet — you haven't. That's completely fine. Nobody gets a medal for autonomy. They get paged for it.

---

## Subagents vs. Inline: How Each Affects Quality

Modern AI agents can work in two ways, and the choice quietly shapes the quality of what you get.

Here's the simplest way to picture it:

- **Inline** is doing the task yourself, at your own desk, with all your notes in front of you.
- **A subagent** is handing the task to a smart colleague who *wasn't in the meeting.*

### Inline execution

The main agent does the work right there in your conversation.

- ✅ It keeps the full context — everything you've explained, every decision you've made together.
- ✅ You see every step and can redirect it mid-course.
- ✅ Best for work that's tightly connected, where one change affects the next.
- ❌ In very long sessions, the conversation fills up with old noise, and quality slowly drops. Starting a fresh session with a clear summary often beats pushing on.

### Subagents

The main agent hands a task to a separate helper with a fresh, empty workspace.

- ✅ **Isolation:** the helper isn't distracted by everything else in your conversation.
- ✅ **Parallelism:** several helpers can work on independent tasks at the same time.
- ✅ **A clean main context:** all the messy searching happens somewhere else.
- ✅ **Fresh eyes:** great for an independent code review.
- ❌ They start cold. The nuance you explained an hour ago? They don't have it unless it's passed along.
- ❌ They use more tokens (which means more cost). Each subagent starts from scratch and re-reads what it needs. ([Subagents docs](https://code.claude.com/docs/en/sub-agents) · [Video: Claude Code sub-agents beginner tutorial](https://www.youtube.com/watch?v=MbKUeufUZIY) from **Thetips4you**, a DevOps tutorial channel)
- ❌ **They report back a summary** — and summaries can hide mistakes. It's easy to trust the report instead of checking the work.

### When to use which

**Use inline when…**
- The work is ambiguous or needs judgment
- Changes are tightly connected
- You need to deeply understand the result
- The conversation is still focused

**Use subagents when…**
- The task is clear and independent
- You need a broad search across a big codebase
- You're fixing several unrelated files in parallel
- You want an independent review with fresh eyes

And one rule for both: **always verify subagent output yourself.** Delegating the work is not delegating the understanding. (That's Habit 2 again.)

Superpowers, from Habit 1, actually lets you choose either mode when it carries out a plan — one of the reasons I like it. It makes this choice visible instead of hidden.

---

## Use It So It Isn't Harmful

Back to *Reacher* for a second. The engineer in that scene was skilled. The AI worked. The output was exactly what was asked for. And it still ended as badly as it possibly could — because nobody in that room asked whether they *should*.

Being a better engineer with AI isn't only about better code. It's about better judgment on what you build, and for whom. Here are the rules I try to live by.

**1. Don't do anything harmful.**
That should be pretty simple. If what you're building or prompting would hurt someone — spying on them, deceiving them, harassing them, stealing from them, or putting them in danger — don't build it. Don't prompt it. "The AI did it" is not an excuse. You typed the request.

**2. Ask what the output is for — and who's asking.**
The question the engineer in *Reacher* never asked. Before you enhance, scrape, generate, or automate something, know who wants it and what they'll do with it. If you can't get a straight answer, that *is* your answer.

**3. Protect other people's data.**
Don't paste customer records, private messages, passwords, or people's photos into tools that aren't approved for them (see the CYA box). Other people's data isn't yours to experiment with.

**4. Don't pass AI output off as something it isn't.**
No fake reviews, no deepfakes, no made-up test results, no "I verified this" when you didn't. Where it matters, be open that AI helped.

**5. Keep a human accountable — you.**
Every AI decision that affects real people needs a real person who owns it. If something goes wrong, "the model decided" is not an acceptable answer to a customer, a manager, or a court.

**6. Be willing to say no.**
If you're asked to build something harmful, you're allowed to push back, ask questions, and escalate. A good engineer's judgment includes knowing when *not* to ship.

**7. Spread the habits.**
You can't control how everyone uses AI. But you can shape the people around you:
- Pair with junior developers and think *out loud*: show them how you question AI output.
- Share your rules files, hooks, and checklists so good defaults spread across the team.
- Review AI-written code kindly but thoroughly. Ask "why?" so they learn to ask it too.
- Write down what you learn and share it (yes, like this article).

Responsible AI use doesn't spread through policy documents alone. It spreads one engineer at a time, by example.

---

## Your Cheat Sheet: All 20 Tools

**Habit 1 — Think before you prompt**
- Superpowers *(skills plugin)*
- Sequential Thinking *(MCP)*
- Jira/Confluence or Linear *(MCP)*
- Figma Dev Mode *(MCP)*

**Habit 2 — Read diffs like a reviewer**
- difftastic *(CLI)*
- git-absorb *(CLI)*
- GitHub *(MCP)*
- Semgrep *(MCP)*
- Document skills — PDF, Word, Excel, PowerPoint *(skills)*

**Habit 3 — Define "done" with tests**
- Playwright MCP / Claude in Chrome *(MCP / extension)*
- pre-commit *(CLI)*
- Hypothesis / fast-check *(testing libraries)*
- mutmut / Stryker *(CLI)*

**Habit 4 — Write the rules in your own words**
- skill-creator *(skill)*
- Memory *(MCP)*
- Hooks / hookify *(Claude Code feature / plugin)*

**Habit 5 — Use AI to learn**
- Context7 *(MCP)*
- Sentry *(MCP)*
- Postgres, read-only *(MCP)*
- ffmpeg *(MCP)*

Before you try any of them: read the docs linked above. Know what you're doing.

---

## Stay the Engineer

The developers who thrive in the next few years won't be the fastest typists. They won't be the ones who generate the most code, either. They'll be the ones whose **judgment** the AI amplifies.

So one more time, plainly: **AI is not the end-all, be-all.** Human oversight and human creativity stay in charge. And every line you accept is yours — including everything it does after it ships.

Here's my challenge for you this week: **pick one habit and one tool from this article.** Use them for seven days. And while you do, turn off "accept all."

Read every diff. Ask "why?" at least once a day. Notice what you learn.

Don't be the engineer in that *Reacher* scene: a one-trick pony, valuable right up until the task was complete, and never asking what it was for. Be the one whose judgment is the reason they keep you in the room. Build things that help people. Refuse to build things that hurt them. And help the people around you do the same.

I think you'll find the AI didn't make you less of an engineer.

It gave you more room to be one.

---

*Disclaimer: The opinions in this article are my own. I wrote it using my own personal Claude account and my own property. They do not represent the beliefs or views of my employer, any organization I'm affiliated with, or anyone else — only mine.*

*If this was useful, follow me for more on building with AI without losing the craft. And tell me in the comments: which habit is hardest for you to keep?*
