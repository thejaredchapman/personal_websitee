# Handout 5: Tool Evaluation

*Free to read and share with anyone. Not for commercial use or resale.*

## What It Is

Tool evaluation assesses two distinct but related things: whether the tools an agent has access to (functions, APIs, retrieval systems, code execution, etc.) are well-designed, and whether the agent actually uses those tools correctly. Those are separate questions — "is the tool good" and "is the agent's usage of the tool good" — and conflating them is one of the most common mistakes in agent development.

## Why It Matters

A capable model given badly-designed tools will consistently underperform a modest model given well-designed ones. Tool evaluation exists to separate two failure classes that look identical from the outside (the agent did the wrong thing) but have entirely different fixes: a **tool design flaw** (ambiguous parameters, poor error messages, a missing capability, a confusing description) versus a **tool-use failure** (the agent picked the wrong tool from a perfectly good set, malformed valid arguments, or misread a correct result). Fixing the wrong one wastes effort and leaves the actual problem in place.

## Core Concepts

**Tool design quality.** Clear naming, unambiguous parameter schemas, informative error messages/return values, and appropriate scope (not so broad it's ambiguous, not so narrow it's useless). A tool's description string functions as a prompt to the model — it directly shapes tool selection, independent of the underlying model's capability.

**Tool selection accuracy.** Given a task and a set of available tools, does the agent pick the right one (or right sequence)?

**Argument/parameter correctness.** Does the agent call the tool with valid, well-formed, and semantically correct arguments — not just *a* tool call, but the *right* call?

**Result interpretation.** Does the agent correctly understand and act on what a tool returns, including when the tool returns an error or an empty result?

**Tool call efficiency.** Redundant calls, unnecessary retries, or a wrong-tool-then-right-tool sequence all indicate inefficiency worth measuring, even when the task eventually succeeds.

**Error handling and recovery.** How the agent behaves when a tool call fails or returns something unexpected — does it retry sensibly, fall back, or ask for help, or does it silently proceed with bad information?

**Sandboxing and safety boundaries.** What a tool is actually permitted to do, and whether evaluation includes adversarial or edge-case inputs designed to probe those boundaries, not just well-formed happy-path cases.

## Patterns & Approaches

**1. Tool-level unit testing.** Test each tool function/API integration in isolation from any agent — the same way you'd unit test any function: correct results for valid input, sane errors for invalid input. This is necessary but not sufficient (see Pitfalls).

**2. Tool-selection evaluation.** Given a set of tasks and available tools, measure how often the agent selects the correct tool (or correct set/sequence) — this is where tool description quality gets tested in practice, not just in theory.

**3. Argument-correctness evaluation.** For tasks with a known-correct tool call, compare the agent's actual call (tool name + arguments) against the expected one, rather than only checking whether *some* call was made.

**4. Trajectory/sequence evaluation.** For multi-tool-call tasks, evaluate the full sequence of calls, not just whether the final outcome was correct — a lucky success via a wrong path should still be flagged, since it's evidence of a fragile approach.

**5. Tool description A/B testing.** Iterate on a tool's name, description, or parameter documentation and measure the effect on selection accuracy in isolation from any other change — a cheap, high-leverage lever most teams under-use.

**6. Simulated/mocked tool environments.** Replace real APIs with deterministic fakes for fast, repeatable evaluation without hitting live services — the same principle this repo applies by mocking every LLM call in its own test suite (`tests/conftest.py`).

**7. Adversarial/edge-case testing.** Malformed inputs, empty results, rate limits, timeouts — does the agent degrade gracefully or fail badly? Happy-path-only testing systematically misses this.

## Common Pitfalls

- **Blaming the model for a tool design problem.** An ambiguous or poorly-described tool can cause "the model" to look incompetent when the actual fix is rewriting the tool's description or schema.
- **Testing tools only in isolation.** Unit tests confirm a tool works correctly when called correctly — they say nothing about whether the agent actually invokes it correctly in context.
- **Tool set bloat.** Too many overlapping or similar tools available at once causes selection confusion that grows worse as the set grows, even if each individual tool is well-designed.
- **Vague, generic tool descriptions.** A description like "search the database" fails to disambiguate from similar tools and pushes selection errors onto the model that better documentation would have prevented.
- **Happy-path-only testing.** Tools evaluated only on well-formed inputs mean failure handling gets discovered live in production instead of in evaluation.
- **No sequence-level evaluation.** Checking only the final result on multi-step tool use misses fragile, lucky successes that will fail on a slightly different input.
- **One-time, pre-launch-only evaluation.** Tool evaluation needs to be rerun as tools, prompts, or models change — a tool that worked well with one model or prompt version isn't guaranteed to keep working after either changes.
- **Overly broad, high-privilege tools "just in case."** Granting more capability than a task needs, without evaluating whether a narrower, safer tool would perform just as well, trades safety for convenience that's rarely actually used.

## Example Projects

1. **Tool-selection eval set.** Build 20+ tasks, each requiring a specific tool from a set of 5+ available tools, measure how often the agent picks correctly, then iterate on tool descriptions and re-measure to see the effect.
2. **Mocked tool environment.** Replace an existing agent's real API calls with deterministic fakes and write a fast, offline eval suite against it — mirroring how this repo mocks every LLM call in `tests/`.
3. **Argument-correctness checker.** For a set of tasks with known-correct tool calls, compare the agent's actual tool name and arguments against the expected call and report the diff.
4. **Adversarial tool-testing harness.** Feed a tool malformed inputs, empty responses, and simulated timeouts/errors, and evaluate whether the agent recovers gracefully or fails badly.
5. **Trajectory evaluation.** For a multi-tool-call task, score the full sequence of tool calls against an expected trajectory (or acceptable set of trajectories), flagging lucky-but-wrong-path successes rather than just checking the final answer.

## Checklist

- [ ] Each tool has been unit-tested independently of any agent (valid inputs, invalid inputs, error paths).
- [ ] Tool names/descriptions/parameter docs are specific enough to disambiguate from similar tools.
- [ ] Tool-selection accuracy is measured, not assumed.
- [ ] Argument correctness is checked, not just whether a tool was called at all.
- [ ] Multi-step tool use is evaluated as a full sequence/trajectory, not only the final outcome.
- [ ] Error/edge-case behavior (malformed input, timeouts, empty results) is tested, not just the happy path.
- [ ] The tool set is periodically reviewed for overlap/bloat that could cause selection confusion.

## Further Reading

- Function-calling / tool-use documentation from major model providers, particularly guidance on schema and description design.
- Papers and benchmarks on tool-use and function-calling accuracy in LLM agents.
- This repo's own `tests/conftest.py` mocking approach as a working example of deterministic, offline tool/LLM testing.
