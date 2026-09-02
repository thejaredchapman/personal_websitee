# From Vibe Coding to Agentic Engineering

*Free to read and share with anyone. Not for commercial use or resale.*

**How AI coding agents actually work, what they cost, and what to check before you use them at work.**

**Who this is for:** two audiences at once. If you're a hobbyist who's been building things by asking an AI and hoping, this shows you the next level up. If you're a professional who needs to bring agents into a company that has a security team, this gives you the architecture and the compliance framework to do it.

**How to read it:** every concept gets two passes. **🧠 ELI5** is the version you could read to your grandmother. **⚙️ Under the hood** is the version you'd say to an engineer. Read one, both, or skip between them. The technical pass never contradicts the simple one, it just adds precision.

**The one-line summary:** the value isn't in the AI writing code. It's in the AI running the code it wrote, and in splitting the work across specialized agents so none of them gets overwhelmed. Everything else in this guide is a consequence of those two ideas.

---

## Part 1: A word about the word

If you've heard the phrase "vibe coding," you've probably heard three different things under one name, and the confusion is worth clearing up before anything else.

Andrej Karpathy coined it in February 2025 to describe something specific: giving in entirely to the AI's output and not engaging with the code at all. Collins Dictionary made it word of the year for 2025. Search volume climbed roughly 2,400% from January 2025 onward.

Then it drifted. By 2026 the term carries **three incompatible meanings**:

| Usage | What people mean by it |
|---|---|
| **Original** | AI writes it, you don't review it. Prototypes only. |
| **Drifted** | Any AI-assisted development, including fully reviewed professional work. |
| **Pejorative** | Unreviewed AI code shipped to production. Associated with slop, incidents, and technical debt. |

That instability is why the same phrase now describes both the most exciting and the most dangerous thing happening in software. Andrew Ng objected publicly that the term misleads people into thinking serious engineers just go with the vibes, and a December 2025 arXiv preprint out of the University of Michigan was titled, pointedly, *Professional Software Developers Don't Vibe, They Control*.

Karpathy himself retired the term in early 2026, calling it passé, and proposed **agentic engineering** instead: *agentic* because you're mostly orchestrating agents rather than writing code directly, and acting as oversight; *engineering* because doing it well is a real discipline with real expertise.

**This guide is about agentic engineering.** Vibe coding is the on-ramp, and it's a legitimate one. It's how a lot of people, roughly 63% of whom aren't professional developers, discovered that this works at all. But the practices that make it safe to do at work are the opposite of vibing, and calling them the same thing is how teams end up with incidents.

So: vibe coding is where most people start. Agentic engineering is where the leverage is. The rest of this guide is the road between them.

---

## Part 2: The four levels

Everything else hangs on this table.

| Level | What it does | Who's driving | Analogy |
|---|---|---|---|
| **1. Autocomplete** | Finishes your line | You | Predictive text |
| **2. Chat** | Answers questions, writes snippets you paste | You | A knowledgeable coworker on Slack |
| **3. Inline execution** | Writes code **and runs it**, sees the error, fixes it | It, with you watching | A cook who tastes the soup |
| **4. Agent architecture** | Multiple specialized agents, each with one job and its own tools | It, with you approving | A kitchen with a head chef and line cooks |

Most people are stuck at level 2 and believe that's what AI coding is. Levels 3 and 4 are where the actual leverage lives, so they get full sections.

---

## Part 3: Inline execution

**🧠 ELI5:** Imagine you ask a friend to bake a cake and they hand you a recipe. That's chat. Now imagine they actually bake it, taste it, notice it's too salty, and bake another one before showing you. That's inline execution. The AI doesn't just suggest code, it runs the code, reads the error, and fixes it. Over and over, until it works or gets stuck.

**⚙️ Under the hood:** The model has tools inside its loop, typically bash, file read/write, and a test runner, and the cycle is `propose → execute → observe → revise` rather than `propose → stop`. The model's output becomes an input to itself through real execution feedback. This is the agentic loop.

**Why it's the unlock:** without execution, the model is guessing whether its code works. With execution, it knows, because it ran the test. Hallucinated APIs get caught in seconds rather than in code review.

**Before and after:**

> **Chat only (level 2):** "Write a function to parse these log files." You get 40 lines. You paste them in. It crashes on line 3 because the timestamp format differs from what the model assumed. You copy the error back into chat. Repeat four times. Twenty minutes gone.
>
> **Inline execution (level 3):** "Parse these log files, there's a sample at `logs/sample.txt`." The agent reads the actual file, writes the parser, runs it against the sample, sees the timestamp mismatch, fixes it, runs it again, shows you a passing result. Ninety seconds, one message from you.

**What it costs:** the agent burns tokens on every iteration. A task with twelve execution cycles costs roughly twelve times the tokens of a single answer. This is the entire reason Part 7 exists.

**The rule:** inline execution is only safe when the feedback signal is real. With no tests, the agent's "it works" means "it didn't crash." **Tests are not a nice-to-have here. Tests are the steering wheel.**

---

## Part 4: Agent architecture

**🧠 ELI5:** One person doing everything gets confused. So you build a small team. One agent's whole job is writing code. Another's whole job is reviewing it and being picky. Another's is checking that nothing breaks the rules. Each has a short job description and only the tools it needs. A head agent hands out work and collects results.

It works for the reason a kitchen works. The person plating dessert doesn't need to remember the meat order.

**⚙️ Under the hood:** Orchestrator plus subagents with **context isolation**. Each subagent runs in its own context window with its own system prompt and restricted tool set, returns a compact result, and discards its intermediate reasoning.

### The four benefits, ranked by how much they matter

**1. Context isolation (the big one)**

**🧠 ELI5:** A model has limited desk space. Fill the desk with clutter and it starts forgetting things and making mistakes. Giving each helper a clean desk means nobody's desk gets cluttered.

**⚙️ Under the hood:** Model quality degrades as context fills, well before the stated window limit. A monolithic agent that reads 40 files, runs 30 commands, and accumulates 400K tokens of tool output is measurably worse at turn 50 than at turn 5. A subagent that reads six files, answers one question in 15K tokens, and returns a 200-token summary keeps the orchestrator clean. **You are buying back model quality, not just tidiness.**

**2. Specialization.** A prompt that says "you review code for security issues, here is our threat model, be adversarial" produces better security review than the same instruction buried in a 3,000-word general prompt. Narrow role, narrow instructions, better output.

**3. Least privilege.** The reviewer gets read-only access. The writer gets `src/` but not `.env` or `infra/`. The researcher gets web access; nothing else does. This is ordinary security practice applied to a new kind of process, and it's the easiest part of this to explain to a security team.

**4. Cost routing.** Not every subtask needs the expensive model. Cheap models handle file search, log grepping, and test running. Save the expensive one for planning and hard reasoning. This routinely cuts agent workflow costs 2–4x with no quality loss on the work that matters. Math in Part 7f.

### The vocabulary

| Piece | 🧠 ELI5 | ⚙️ Under the hood |
|---|---|---|
| **Orchestrator** | The head chef | Main loop; plans, delegates, assembles |
| **Subagent** | A line cook with one job | Isolated context, scoped system prompt, restricted tools |
| **Tools** | The knives and pans | Functions the model can call (bash, file I/O, HTTP) |
| **MCP** | A universal power outlet | Model Context Protocol: a standard way to expose external systems (a ticket tracker, a database, your docs) as tools any compatible agent can use |
| **Memory / project file** | The recipe binder on the shelf | A persistent file (`CLAUDE.md`, `AGENTS.md`, rules files) auto-loaded so you stop re-explaining conventions |
| **Skills** | A laminated card for a tricky dish | Reusable instruction bundles pulled in only when relevant |
| **Hooks** | The kitchen rule "wash hands before plating" | Deterministic scripts that fire on agent events. Not suggestions. Code. |

**Why hooks matter more than they sound:** a prompt saying "always run the linter" is a suggestion the model can forget. A hook that runs the linter is a guarantee. **When something must happen, put it in a hook, not a prompt.** This is the most common architecture mistake people make.

---

## Part 5: Daily workflows

Copy-pasteable, and free of anything organization-specific.

### Hobbyist track

**A. The Saturday project rescue**

> "Read this repo. It's a personal site I abandoned eight months ago. Get it running locally, tell me what's broken, and fix the build. Don't change any styling."

Bounded, verifiable (it builds or it doesn't), and the styling constraint stops the agent from redecorating.

**B. The recurring chore**

> Weekly: check for dependency updates, run the test suite against each, open a pull request only for the ones that pass.

You wake up to a PR or to nothing. Both are fine.

**C. The learning loop**

> "Explain what this file does line by line. Then delete your explanation and rewrite the file the way you'd have written it. Show me both versions side by side."

The highest-value hobbyist use, and almost nobody does it. You're using the agent as a tutor rather than a vending machine.

**D. Spreadsheet to app**

> "Here's a CSV I track my [hobby] in. Build a tiny local web app that reads it, charts it, and lets me add a row. Single HTML file, no build step, no server."

### Professional track

**E. Morning CI triage**

> The agent reads overnight failures, clusters them by root cause, and posts: "Six failures. Five are the same flaky timeout in `auth_test`. One is a real regression in payments from PR #4412."

Forty minutes of log reading becomes four minutes of decisions.

**F. Policy-based PR review**

> A read-only reviewer subagent whose system prompt is your actual engineering standards document. It comments on the diff and cites which rule was violated.

The critical design choice is **citing the rule**. A review saying "this seems bad" is noise. A review saying "violates §4.2, unparameterized SQL" is actionable and auditable.

**G. Legacy migration, one file at a time**

> "Migrate `src/components/UserTable` to the new framework. Follow the pattern in `src/components/OrderTable`, which is already migrated. Run the tests. Touch nothing else."

Migrations are where agents shine, because there's a reference implementation (a known-good answer) and a test suite (a verifier). Multi-month timelines routinely collapse on this exact shape of work.

**H. The onboarding oracle**

> An agent with read access to the repo and internal docs, answering "how does authentication work here" for new hires.

The best version replaces a senior engineer's interrupt queue, which is a real and measurable cost.

**I. Documentation that can't rot**

> A hook on merge: if a public API signature changed, regenerate the relevant doc section and open a docs PR.

---

## Part 6: What to actually use

Categories matter more than brands, because the brands churn. Windsurf was renamed Devin Desktop in June 2026 after the Cognition acquisition, which is exactly the sort of thing that dates a guide.

**Terminal agents (highest autonomy):** Claude Code, OpenAI Codex CLI, Gemini CLI. Best for multi-file work, long autonomous runs, CI integration.

**IDE agents (best feedback loop):** Cursor, GitHub Copilot, Zed, Augment. Best for iterative work where you want visual diffs.

**Bring-your-own-key open source (max control, max responsibility):** Cline, Roo Code, Aider. Free extensions; you pay raw API rates or run local models. The right answer for anyone who needs inference to stay on their own infrastructure.

**App builders (hobbyist on-ramp):** v0, Lovable, Bolt, Replit. Natural language to a deployed app. Excellent for validating an idea, weak for anything you'll maintain for years.

**Autonomous task agents:** Devin. Assign a ticket, get a PR.

**If you want one sentence:** hobbyists should start with a free tier and one $20 tool, not four. Professionals should pick one terminal agent and one IDE agent, because they serve genuinely different loops, and stop there.

---

## Part 7: Costs, in full

> ⚠️ **This section has an expiry date.** All figures verified against vendor documentation on **August 30, 2026**. This market re-prices roughly monthly, and four Claude models shipped in under two months this summer alone. Treat everything in Part 7 as a worked example of *how to think about the math*, and re-check the numbers before you spend anything. The rest of this guide ages more slowly.

### 7a. Model rate card (per million tokens, USD)

**Anthropic**, per official pricing documentation:

| Model | Input | Cache hit | Output |
|---|---|---|---|
| Fable 5 | $10 | $1 | $50 |
| Mythos 5 *(limited availability)* | $10 | $1 | $50 |
| Opus 5 | $5 | $0.50 | $25 |
| Opus 4.8 *(labeled legacy)* | $5 | $0.50 | $25 |
| Sonnet 5 | $2 | $0.20 | $10 |
| Sonnet 4.6 | $3 | $0.30 | $15 |
| Haiku 4.5 | $1 | $0.10 | $5 |

The $2/$10 Sonnet 5 rate, originally announced as introductory pricing through August 31, 2026, is now the standard price; the scheduled September 1 increase to $3/$15 will not happen. Any guide telling you to budget for that increase is out of date.

Modifiers worth knowing: cache reads cost 10% of base input, 5-minute cache writes 1.25x and 1-hour writes 2x; the Batch API takes 50% off input and output; US-only inference adds a 1.1x multiplier; and Claude 4.7-and-later models use a newer tokenizer producing roughly 30% more tokens for the same text. That last one is a real budgeting trap: same text, more tokens, so identical sticker prices can produce different bills.

Fast mode on Opus 5 and Opus 4.8 runs $10/$50, stacks with caching and residency multipliers, and is unavailable with the Batch API. Web search on the API costs $10 per 1,000 searches; web fetch adds nothing beyond tokens.

**OpenAI** lists the GPT-5.6 family at $5/$30 for Sol, $2/$12 for Terra, and $0.20/$1.20 for Luna, with a separate higher meter for long-context prompts. One tracker reports a cut to $4/$20 on Sol, promotional through at least November 21, 2026. Sources disagree on what's live; check the official page before modeling a budget.

**Google** prices Gemini 3.1 Pro at $2/$12 for prompts up to 200K tokens with a higher meter above that, and the Flash tier well below it. Current Flash rates are introductory and scheduled to double on January 1, 2027. Google also offers a genuinely free API tier, with the tradeoff that free-tier traffic can be used to improve Google's products — fine for prototyping, wrong for anything confidential.

### 7b. Tool subscriptions

| Tool | Free | Individual | Heavy | Team / Enterprise |
|---|---|---|---|---|
| Claude Code | — | Pro $20/mo | Max $100 or $200/mo | Team ~$25/seat, Enterprise ~$20/seat + usage |
| Cursor | Limited | Pro $20 | Pro+ $60, Ultra $200 | Teams $40/seat, Premium seat $120 |
| GitHub Copilot | Yes | Pro $10 | Pro+ $39, Max $100 | Business $19/seat, Enterprise $39/seat |
| OpenAI Codex | Via ChatGPT | Go $8 / Plus $20 | Pro $100 or $200 | Business seats, custom Enterprise |
| Gemini CLI | Yes | — | Ultra tier | Google Cloud billing |
| Cline / Roo / Aider | Yes (BYOK) | API cost only | API cost only | API cost only |
| Devin | — | $20 (beta) | — | $500/seat |
| Lovable / Bolt | Yes | ~$25/mo | — | Custom |

Cursor's individual plans split usage into two pools, one for Cursor's own models and one for third-party models charged at the underlying API rate, with Pro including roughly $20 of agent usage, Pro+ roughly $70, and Ultra roughly $400. Copilot moved to usage-based billing with AI Credits on June 1, 2026: Pro includes $15/month in credits, Pro+ $70, Max $200.

**The trap in that table:** the sticker price is now an entry point, not a budget. Most of these bill usage beyond an included allowance. A $20 plan with $20 of included usage is a $20 plan right up until you have a busy Tuesday.

### 7c. Token math, worked

A single agent turn is cheap. An agent *task* is not, because the whole conversation is re-sent every turn. A 20-turn task doesn't cost 20 messages, it costs the running sum of a growing context.

**One bug fix** (~150K cumulative input, ~15K output):

| Model | Uncached | With 80% cache hits |
|---|---|---|
| Sonnet 5 | $0.45 | $0.23 |
| Opus 5 | $1.13 | $0.53 |
| Haiku 4.5 | $0.23 | $0.12 |

**One feature** (~800K cumulative input, ~60K output): Sonnet 5 ≈ **$2.20**, Opus 5 ≈ **$5.50**.

**A month of daily agent work:** roughly $13 per developer per active day and $150–250 per developer per month on Claude Code per Anthropic's own enterprise figures, with 90% of users under $30 on any active day, while heavy automation reaches $500–2,000 per engineer per month.

### 7d. Seat versus API: the breakeven

**🧠 ELI5:** A subscription is a gym membership. The API is paying per visit. Do the arithmetic on how often you actually go.

**⚙️ Under the hood:** $200/month buys about 100M Sonnet 5 input tokens or 20M output tokens at list rate. Against a ~$13-per-active-day profile, a $200 plan breaks even at roughly **15 active coding days per month**. Below that, metering is cheaper. Above it, the subscription wins and gives you a hard ceiling.

The rule most teams land on:

- **Interactive, human-in-the-loop work → subscription.** Predictable, capped, no mid-task bill anxiety.
- **Automation, CI, batch, anything unattended → API.** You need per-call attribution and no session caps.
- **Both, for most professional teams.** They aren't competing purchases.

### 7e. Total cost of ownership

Sticker price is maybe 60% of it.

1. **Review time.** Every generated line still needs human review. If review capacity doesn't scale, generation speed just grows the queue. This is the biggest hidden cost, and it shows up as slower merge times, not as a line item.
2. **The rework tax.** Code nobody understood that breaks in month four. Budget for it.
3. **Enablement.** Someone writes the project files, subagent definitions, and hooks. Realistically 20–60 hours of a senior person to set a team up properly, plus ongoing maintenance as tooling shifts.
4. **Seat math.** A $20 tool is $2,400/year for a team of ten. Always get a team quote before multiplying.
5. **Tool stacking.** Teams drift into paying for three overlapping products. Audit quarterly.
6. **Model churn and changing defaults.** Your default model will change under you, and defaults carry cost implications. The effort parameter now defaults to `high` on Opus 5 and Sonnet 5 on the API and in Claude Code, and high effort means more reasoning tokens billed at output rates. Set it explicitly.

### 7f. Cost controls that work

Ranked by impact per hour of effort.

1. **Prompt caching.** 90% off repeated input. If you have a stable system prompt or project context, this is the single biggest lever and it's nearly free to turn on.
2. **Model routing.** Expensive orchestrator, cheap workers. Ten subtasks at 50K in / 5K out each: all-Opus 5 ≈ **$3.75**; an Opus 5 planner with Haiku 4.5 workers ≈ **$1.03**. Same quality on the work that matters, about 3.6x cheaper.
3. **Set effort explicitly.** Don't inherit `high` on tasks that don't need it.
4. **Batch API for anything non-interactive.** 50% off, and it stacks with caching.
5. **Context hygiene.** Fresh sessions for new tasks. A long-running session is both more expensive and less capable.
6. **Session spend limits.** Copilot's CLI and SDK support per-session credit caps; use the equivalent wherever it exists.
7. **A gateway with logging.** Route everything through a proxy. You cannot manage what you cannot attribute.
8. **Budget alerts before budget caps.** A hard cap that fires mid-migration is its own kind of expensive.

---

## Part 8: The compliance section

**A necessary disclaimer.** No external guide can tell you whether a given tool is approved at your company. Your policy is a document only your organization has, and vendor compliance postures change without notice. What follows is the framework for doing that verification yourself, which is the part that actually transfers.

### The fact that surprises most teams

**Free and Pro tiers are frequently not the safe tiers.** Since April 24, 2026, GitHub Copilot has used interaction data — prompts, accepted code, surrounding file context — to train its models on Free, Pro, and Pro+ unless the user disables it, while Business and Enterprise are exempt and were never included in that change.

That's one vendor, one date, one tier boundary. Every vendor has a version of it. **Assume a consumer tier trains on your code until you've read otherwise in a contract.**

Also worth internalizing: **training opt-out and zero data retention are different controls.** Opting out of training does not stop a provider from storing your inputs in standard logs, typically for around 30 days. These get conflated constantly in security reviews.

### The nine questions

For each tool, get a written answer. Not a marketing page. The contract.

1. **Where does data go?** Vendor, subprocessors, inference region. Get the subprocessor list.
2. **Is it trained on?** By default or opt-out? Which tiers? Is the opt-out honored at the API layer as well as the UI?
3. **Is it retained?** How long? Is zero data retention available, and at which tier? Contractual ZDR is typically enterprise-agreement-only.
4. **What certifications exist?** SOC 2 Type II at minimum. ISO 27001, a signed DPA for GDPR, a BAA if protected health information is anywhere nearby, FedRAMP for public sector.
5. **What classification is the data you're actually feeding it?** Map each tool tier to your own scheme. This is the step teams skip, and it's the one that turns an approved tool into an incident.
6. **Who owns the output, and is there IP indemnity?** Copilot Business carries indemnity; many tools don't. Ask.
7. **What can the agent touch?** Write access, secrets, network egress, production credentials. An agent holding a production database string is a different risk category than one with read access to a single repo.
8. **Where do the logs live?** If you can't reconstruct what an agent did six weeks ago, you can't answer an audit finding.
9. **Do you actually know your own position?** Can you name the person who approved this? If not, you don't have approval, you have absence of refusal. These are not the same thing, and the difference only matters once.

### Verification workflow

1. **Classify the work first, tool second.** "Can I use tool X?" is unanswerable. "Can I use tool X on an internal-confidential repo with no customer data?" is answerable.
2. **Contract before deployment, not during the security review.** Get the enterprise tier, and get retention terms, no-training terms, SOC 2 Type II, and a named incident contact in writing.
3. **Route through an internal gateway.** Every prompt and completion through one logged chokepoint gives you audit trail, cost attribution, and a kill switch from a single piece of infrastructure.
4. **Put a policy gate in front of the agent, not around it.** A pre-flight check that inspects each request against your classification rules and **fails closed, naming the rule it triggered**. A gate that fails open is decorative.
5. **Re-verify quarterly.** The Copilot example above was a default that flipped mid-year on an existing product. Compliance is a subscription, not a purchase.

### Where to start looking

Anthropic publishes at `trust.anthropic.com`. GitHub's relevant terms are in the Copilot Business and Enterprise plan documentation, not the general plans page. Cursor maintains an enterprise security page. For everyone else: if a vendor has no trust center, that's your answer.

---

## Part 9: The guidelines

### For everyone

1. **Version control from minute one.** Non-negotiable. The agent's undo button is `git`.
2. **Read the diff.** Every time. If you're not reading diffs, you aren't engineering, you're gambling.
3. **Small, bounded tasks beat big ones.** "Fix the login bug" beats "improve the auth system."
4. **Tests are the steering wheel.** No tests means no feedback signal means the agent is guessing.
5. **Never paste secrets.** Not in a prompt, not in a file the agent reads, not just this once.
6. **Plan before execute.** Most tools have a plan mode. Approving a plan costs one message; unwinding a bad execution costs an afternoon.
7. **If you can't evaluate it, don't ship it.** The honest version of the entire guide.

### Additionally, for professionals

8. **Policy gate before tool selection.** Classification first.
9. **Least privilege per agent.** Reviewer read-only. Writer scoped. Nothing touches production.
10. **Deterministic guarantees go in hooks, not prompts.**
11. **Everything through the gateway.** Logs, attribution, kill switch.
12. **You own the output.** "The AI wrote it" is not a defense in an incident review, a code review, or a regulatory audit.
13. **Measure something.** PR cycle time, defect escape rate, review load. If you can't show the delta, your budget line is exposed at the next planning cycle.

---

## Part 10: Copy-pasteable artifacts

**A project file** (`CLAUDE.md`, `AGENTS.md`, or your tool's equivalent):

```markdown
# Project conventions

## Stack
[language, framework, package manager, test runner]

## Commands
- Install: [cmd]
- Test: [cmd]
- Lint: [cmd]
- Run locally: [cmd]

## Rules
- Never edit files in /generated or /vendor
- Never modify .env or anything in /infra
- Every behavior change needs a test in the same PR
- Match existing patterns; if unsure, cite the file you copied from

## Before you finish
Run the tests. Run the linter. If either fails, fix it before reporting done.
```

**A reviewer subagent:**

```markdown
---
name: code-reviewer
tools: [read, grep]   # deliberately no write access
---
You review diffs against the standards in docs/engineering-standards.md.

For each issue:
- Quote the specific line
- Cite the rule number it violates
- Give the concrete fix

Do not comment on style the linter already enforces.
Do not say "consider" or "might want to." State the issue or stay silent.
If the diff is clean, say so in one line.
```

**A pre-flight policy gate (pseudocode):**

```
on request:
  classification = classify(payload)
  tier = approved_tier_for(tool, classification)
  if tier is None:
      DENY, naming the rule and the classification found
  if contains_secrets(payload):
      DENY, naming the detector that fired
  log(user, tool, classification, timestamp)
  ALLOW
```

Fails closed. Names the rule. Logs either way.

**Five questions for non-technical readers, before any prompt:**

> 1. What data am I about to send, and how is it classified?
> 2. Is this tool approved for that classification, in writing?
> 3. Can I tell whether the output is correct?
> 4. What's the worst case if it's wrong and I don't notice?
> 5. Who do I tell if something goes sideways?

---

## What this guide is not

It isn't a claim that agents write good code unsupervised. Independent analyses have been consistently unkind on that point, and the evidence on productivity gains is genuinely mixed rather than uniformly positive. It also isn't a tool endorsement; the products named here will have shifted by the time you read this, which is why the guide is organized around categories and mechanisms rather than brands.

## The honest summary

Inline execution is what makes AI coding useful rather than a fancier autocomplete, because it closes the loop between writing code and knowing whether it works. Agent architecture is what lets inline execution scale without the model degrading as its context fills. Both are cheap enough that money is rarely the real constraint.

The real constraint is review capacity and your ability to evaluate output. No amount of spending fixes that, and any guide implying otherwise is selling something.

That gap — between generating code and being accountable for it — is the whole distance between vibe coding and agentic engineering. It's worth crossing deliberately.
