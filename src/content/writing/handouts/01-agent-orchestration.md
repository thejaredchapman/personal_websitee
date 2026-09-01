# Handout 1: Agent Orchestration

*Free to read and share with anyone. Not for commercial use or resale.*

## What It Is

Agent orchestration is the discipline of coordinating multiple LLM calls — whether that's one agent looping through several steps, or several distinct agents working together — to accomplish something a single prompt-response call can't. If a single LLM call is a function, orchestration is the program that calls it repeatedly, routes its output, and decides what happens next.

It's useful to separate two things people often conflate:

- **Tool use** — a single agent that can call functions/APIs mid-conversation (search, calculator, database query) but is still one reasoning loop with one context.
- **Orchestration** — coordinating *multiple* reasoning loops (multiple agents, or multiple passes of the same agent) with defined control flow between them: who runs when, what they pass to each other, and how the group knows it's done.

An agent that calls a weather API is doing tool use. A system where a "planner" agent breaks a task into subtasks and hands each to a specialized "worker" agent is orchestration.

## Why It Matters

Most real-world tasks are too large, too ambiguous, or too multi-domain for one model call to handle reliably in one shot. Orchestration matters because it lets you:

- **Decompose complexity.** Break a vague, large task ("audit this codebase for security issues") into smaller, well-defined subtasks a model can execute reliably.
- **Specialize.** A narrowly-scoped agent with a focused prompt and a small toolset outperforms one generalist agent trying to do everything — the same reason a human team has a database person and a security person instead of one person doing both.
- **Parallelize.** Independent subtasks can run concurrently instead of serially, cutting wall-clock time.
- **Improve reliability through redundancy and checking.** A second agent can review, critique, or verify a first agent's output — catching errors a single pass would miss.
- **Bound cost and context.** Each agent only needs the context relevant to its subtask, instead of one enormous prompt trying to hold everything.

The tradeoff is real, though: every additional agent adds latency, cost, and a new place for things to go wrong. Orchestration is a tool for tasks that genuinely need decomposition — not a default architecture.

## Core Concepts

**Control flow.** How work moves between agents/steps:
- *Sequential (pipeline):* Agent A's output feeds Agent B, which feeds Agent C.
- *Parallel (fan-out/fan-in):* One task splits into N independent subtasks run concurrently, then results are merged.
- *Hierarchical (manager/worker):* A top-level agent plans and delegates; worker agents execute and report back.
- *Graph/state machine:* Explicit nodes and edges define which agent runs next based on conditions — more flexible than a fixed pipeline, closer to a real program.

**Planning vs. execution.** Some architectures interleave the two in a tight loop (the agent reasons about the next step, acts, observes the result, reasons again — the "ReAct" pattern). Others separate them: a planner produces a full plan up front, then an executor works through it (plan-and-execute) — cheaper per step, but less adaptive if reality diverges from the plan.

**State and context passing.** What does each agent actually see? Full conversation history, a summarized version, or just a structured handoff object (e.g., `{task, constraints, prior_findings}`)? Passing everything is simple but bloats context and cost; passing too little loses information the next agent needed. This is usually the single biggest design decision in a multi-agent system.

**Memory.** Distinguish *session memory* (state relevant to the current run, discarded after) from *persistent memory* (facts, preferences, or learned corrections that should survive across runs). Most orchestration bugs trace back to conflating the two.

**Termination conditions.** How does the system know it's done? Options: a fixed number of steps/iterations, a success condition checked by a critic agent, a budget (time/cost) ceiling, or explicit human sign-off. Every orchestrated loop needs at least one hard stop condition that doesn't depend on the model "deciding" to stop — otherwise you get runaway loops.

**Delegation and handoff.** When one agent hands work to another, what's the contract? Define the input schema and expected output schema explicitly, the same way you'd define a function signature — this is what makes multi-agent systems debuggable instead of a black box.

## Patterns & Approaches

**1. Single agent + tools (ReAct loop).** One agent, one context, calling tools as needed in a reason→act→observe loop. Simplest architecture; use this until you have a concrete reason not to.

**2. Sequential pipeline.** Fixed stages, each done by a differently-prompted (or differently-modeled) agent: draft → fact-check → edit → format. Easy to reason about and debug (you can inspect output at each stage), but strictly serial — no speedup from parallelism, and an early-stage error propagates downstream unless caught.

**3. Orchestrator/worker (manager pattern).** A coordinating agent breaks a task into subtasks and dispatches them to worker agents (which may run in parallel), then synthesizes the results. Good fit for genuinely decomposable, exploratory tasks (e.g., "research X from multiple angles"). The orchestrator's prompt and its synthesis step are the highest-leverage — and highest-risk — parts of the system.

**4. Parallel fan-out/fan-in.** Split a task into N independent units, run them concurrently, merge. Cuts latency roughly to the slowest single unit instead of the sum. Only works when subtasks are genuinely independent — if they need to share state as they go, you actually need sequential or graph-based flow instead.

**5. Debate/critic-generator.** One agent produces an answer, another critiques it against criteria, and the loop repeats until the critic approves or a step limit is hit. Effective for improving output quality on tasks with checkable criteria (code correctness, adherence to a rubric); less effective on purely subjective tasks where the critic has no more ground truth than the generator.

**6. Graph/state-machine orchestration.** Explicit nodes (agents/steps) and conditional edges, often implemented with a framework (e.g., LangGraph-style graphs) rather than hand-rolled control flow. Worth it once your control flow has enough branches/loops that a fixed pipeline or simple manager loop stops being legible in code.

Across all of these, the general lesson: **start with the simplest pattern that could plausibly work, and add structure only when a concrete failure mode demands it.**

## Common Pitfalls

- **Orchestrating a task that didn't need it.** If a well-crafted single prompt with tool access solves the problem, multi-agent decomposition just adds latency, cost, and failure surface for no benefit.
- **No hard termination condition.** Loops that rely on the model "deciding" it's done can run away — always have a step/cost/time ceiling as a backstop.
- **Context loss across handoffs.** Passing a lossy summary between agents can drop the one constraint that mattered. Be deliberate about what's in the handoff payload.
- **Silent failure propagation.** If Agent A quietly produces a wrong or malformed result, and Agent B trusts it uncritically, the error compounds invisibly. Validate outputs at handoff boundaries, don't just pass them through.
- **Ignoring cost/latency multiplication.** Five agents each making one call is at minimum 5x the cost and often more than 5x the latency (coordination overhead, retries). Budget for this explicitly rather than discovering it in production.
- **Treating agent calls like reliable function calls.** Unlike a deterministic function, an agent step can fail in ways a schema check won't catch (subtly wrong instead of clearly broken). Build in verification, not just error handling for exceptions.
- **No observability.** Without structured logging of what each agent saw and produced at each step, debugging a multi-agent system after the fact is close to impossible. Instrument before you need to (see the Agent Evaluation & Instrumentation handout).
- **No human escalation path.** For anything consequential, the orchestration should have a defined point where it can hand off to a human rather than forcing a decision autonomously.

## Example Projects

Hands-on ways to build real intuition for these patterns, roughly ordered from simplest to most involved:

1. **Sequential content pipeline.** Build a 3-stage pipeline — outline agent → draft agent → editor agent — for writing short articles from a topic prompt. Log each stage's input/output so you can see exactly what got passed forward. Good first project for understanding handoff design.
2. **Parallel research synthesizer.** Given a question, fan it out to N agents that each research a different angle or source type, then a synthesis agent merges the findings into one answer with citations back to which sub-agent contributed what. Teaches fan-out/fan-in and result merging.
3. **Support ticket router.** A classifier agent reads an incoming request and routes it to one of several specialist agents (billing, technical, general inquiry), each with its own narrow prompt and tools. Teaches hierarchical delegation and the tradeoffs of narrow vs. broad agent scope.
4. **Generator/critic code fixer.** A generator agent writes a function against a spec; a critic agent runs it against test cases and returns pass/fail plus reasoning; the generator revises until tests pass or a retry limit is hit. Teaches termination conditions and using an objective checker instead of a subjective one.
5. **Graph-based multi-step assistant.** Build an assistant with real branching logic (e.g., a travel planner that loops back to ask clarifying questions, branches on budget constraints, and only proceeds to booking-simulation once constraints are resolved) using an explicit state graph rather than a fixed pipeline. Teaches when a graph earns its complexity over a simpler pattern.

## Checklist

Before shipping a multi-agent/orchestrated system, confirm:

- [ ] Could a single agent with tools solve this instead? (If yes, prefer that.)
- [ ] Every loop has a hard termination condition independent of model judgment.
- [ ] Handoff payloads between agents are explicitly defined (not "pass the whole conversation").
- [ ] Outputs are validated at each handoff boundary, not just passed through.
- [ ] You've estimated worst-case cost and latency (not just the happy path).
- [ ] There's a logging/tracing layer showing what each agent saw and produced at each step.
- [ ] There's a defined escalation path to a human for high-stakes or ambiguous cases.

## Further Reading

- Anthropic's published guidance on building effective agents (workflows vs. agents, when to add complexity).
- The ReAct paper (Yao et al., 2022) for the reason-act-observe loop foundation.
- Documentation for graph-based agent orchestration frameworks (e.g., LangGraph) for how explicit state machines are implemented in practice.
- Any internal postmortems your team has on multi-agent systems that failed in production — these are usually more instructive than any paper.
