# Handout 2: Agent Evaluation & Instrumentation

*Free to read and share with anyone. Not for commercial use or resale.*

## What It Is

Agent evaluation and instrumentation are two halves of the same problem: knowing whether an agentic system is actually working. **Instrumentation** is the plumbing — structured logging and tracing that records what an agent did at every step (which LLM calls it made, which tools it invoked, what each returned, how long each step took, what it cost). **Evaluation** is what you build on top of that plumbing — the process of measuring whether the agent's behavior and outputs are actually good, both before you ship a change (offline) and after it's in front of real users (online).

You can't meaningfully evaluate an agent you can't observe, and instrumentation with no evaluation on top of it is just a pile of logs nobody looks at. The two need to be designed together.

## Why It Matters

Agents are non-deterministic and multi-step. A single-turn classifier either got the label right or wrong; an agent can take a reasonable-looking path and still land on a wrong answer, or take a bizarre path and still get lucky. Without evaluation, you can't tell a genuine improvement from a coincidence, and you can't catch a regression until a user reports it. Without instrumentation, when something does go wrong, you're debugging a black box — you know the final output was bad, but not which step caused it.

Together, they're what let a team iterate on prompts, models, and tools with actual evidence instead of vibes, and what let an on-call engineer actually diagnose a production failure instead of guessing.

## Core Concepts

**Traces and spans.** A trace is the full record of one agent run, structured as a tree of spans — each span being one step (an LLM call, a tool call, a sub-agent invocation) with its inputs, outputs, latency, and cost. This is the unit instrumentation is built around, borrowed from distributed-systems tracing.

**Offline vs. online evaluation.** Offline eval runs against a fixed, curated dataset before you ship a change — it's your regression test suite. Online evaluation monitors real production traffic after shipping — sampling live traces, tracking user feedback signals (thumbs up/down, retries, escalations), and catching things your offline dataset didn't anticipate. You need both: offline eval alone misses real-world drift; online eval alone means you find out about regressions from users.

**Outcome-based vs. process-based metrics.** Outcome-based metrics ask "did it accomplish the goal?" Process-based metrics ask "did it take a reasonable path to get there?" A system that only measures outcomes can't distinguish a robust success from a lucky one, and won't catch an agent that's about to fail on a slightly different input because its underlying approach was already fragile.

**Golden datasets.** A curated set of representative tasks with known-good answers or grading criteria attached. This is what offline evaluation runs against. It needs to be maintained deliberately — it goes stale as real usage patterns shift.

**LLM-as-judge.** Using a separate model call to grade an agent's output against a rubric, useful when correctness isn't a simple string or value match (e.g., "was this response helpful and accurate," not "does this equal 42"). Judges need their own calibration — see Common Pitfalls.

**Regression testing.** Rerunning the same evaluation suite whenever a prompt, model, or tool changes, so you catch a change that improves one case but breaks another before it reaches production.

**Key metrics to track:** task success rate, steps-to-completion (efficiency), tool-call accuracy, cost per task, latency (p50/p95, not just average), error/exception rate, and human-escalation rate.

## Patterns & Approaches

**1. Trace-first instrumentation.** Build structured logging of every agent action before you build evaluation on top of it. Trying to retrofit tracing onto an agent after you already need to debug a production incident is the wrong order.

**2. Rubric-based LLM-judge grading with human calibration.** Define a clear rubric, have an LLM grade outputs against it, and periodically sample a subset for human review to check the judge is actually aligned with what you care about.

**3. Golden set + CI-style regression eval.** Treat your eval suite like a test suite — run it automatically on every prompt/model/tool change, and block or flag changes that regress key metrics.

**4. Shadow/canary evaluation.** Run a new agent version alongside the current one on the same inputs (without exposing the new version's output to users) and compare outcomes before rolling it out.

**5. A/B testing in production.** Once shadow evaluation looks good, split real traffic between versions and compare outcome metrics with actual usage, not just your golden set.

**6. Step-level assertions.** Rather than only checking the final output, assert properties of intermediate steps (e.g., "the tool call in step 2 should have used these arguments") — this catches brittle-but-lucky successes that pure outcome checking misses.

**7. Automated failure clustering.** When you have a batch of failed traces, summarize and cluster them by similarity instead of reading each one individually — this surfaces systemic issues (a bad tool description, a misunderstood instruction) much faster than manual review.

## Common Pitfalls

- **Evaluating only the final output, not the path.** Masks brittle successes and hides why failures happened.
- **No golden dataset.** Shipping prompt/model changes based on a handful of manual spot-checks instead of a repeatable eval suite.
- **Uncalibrated LLM-as-judge.** The judge can be systematically wrong or biased toward certain answer styles; without checking it against human judgment, you're trusting an unverified grader.
- **Gameable metrics.** Optimizing for step count or latency alone can push an agent to skip verification steps that were actually load-bearing.
- **Retrofitted instrumentation.** Adding tracing only after an incident forces you to debug blind the first time it actually mattered.
- **Sampling bias in production monitoring.** Relying only on user-reported failures misses silent ones — users often don't report a wrong-but-plausible answer.
- **No versioning discipline.** If eval results aren't tied to a specific prompt/model/tool version, you can't tell what actually changed between two scores.
- **Cost and latency treated as afterthoughts.** They should be first-class eval metrics from the start, not something you discover matters after a bill or a complaint.

## Example Projects

1. **Structured tracing wrapper.** Wrap an existing agent loop so every LLM/tool call is logged as structured JSON (inputs, outputs, latency, cost), then build a small CLI or dashboard to read traces back — the foundation everything else in this handout builds on.
2. **Golden dataset + baseline.** Build a 20-30 task golden set for an agent you already have, hand-grade its current performance, and use that baseline to detect regressions the next time you change its prompt.
3. **Calibrated LLM judge.** Build an LLM-as-judge grader for open-ended agent outputs, then hand-grade a sample yourself and measure judge/human agreement — report where they disagree and why.
4. **Shadow eval harness.** Run two versions of an agent against the same golden set and produce a side-by-side diff report showing exactly where and how they disagree.
5. **Failure clustering tool.** Take a batch of failed agent traces, summarize each failure, cluster the summaries, and report the top failure categories instead of reviewing every trace individually.

## Checklist

- [ ] Every agent run produces a structured trace (inputs, outputs, tool calls, latency, cost) before you try to evaluate it.
- [ ] A golden/test dataset exists with known-good or graded expected outcomes.
- [ ] Evaluation measures the path taken, not just the final output.
- [ ] Any LLM-as-judge grader is calibrated against human judgment on a sample.
- [ ] Regression eval runs automatically when prompts/models/tools change.
- [ ] Production monitoring doesn't rely solely on user-reported failures.
- [ ] Cost and latency are tracked as first-class eval metrics, not afterthoughts.

## Further Reading

- OpenTelemetry conventions for LLM/agent tracing.
- Industry and academic writing on LLM-as-judge methodology and its known failure modes.
- Anthropic's and OpenAI's published guidance on agent evaluation practices.
- Internal postmortems on agent failures — usually more instructive than any external resource.
