# Handout 3: Agentic RAG

*Free to read and share with anyone. Not for commercial use or resale.*

## What It Is

Retrieval-augmented generation (RAG) grounds an LLM's answer in retrieved source material instead of relying purely on what the model learned during training. "Naive" or classic RAG does this in one fixed pass: embed the question, fetch the top-K most similar chunks, stuff them into the prompt, generate an answer. **Agentic RAG** replaces that fixed pipeline with an adaptive one — the agent can decide to search again, rewrite the query, choose between different sources or tools, check whether what it retrieved is actually sufficient, and only answer once it judges it has enough grounding.

The distinction that matters: naive RAG is a pipeline; agentic RAG is a decision loop with retrieval as one of its available actions.

## Why It Matters

Single-shot retrieval fails in predictable ways: the user's phrasing doesn't match how the source material is worded, the question requires combining facts from two different documents, the first search returns irrelevant results and there's no mechanism to notice or recover, or the question is ambiguous and needs disambiguation before a good search is even possible. Naive RAG has no way to detect or correct any of this — it retrieves once and generates once, regardless of whether the retrieval was any good.

Agentic RAG matters because it turns retrieval from a fixed step into something that can adapt to the actual difficulty of the question — spending more effort (more searches, query rewrites, multiple sources) exactly when a question needs it, while staying cheap and fast on the simple questions that naive RAG already handles fine.

## Core Concepts

**Single-shot vs. iterative retrieval.** The core axis this handout is about: one fixed retrieval pass versus a loop that can retrieve, evaluate, and retrieve again.

**Query rewriting/reformulation.** The agent rephrases the user's question — before the first search (to better match how source material is likely worded) or after a failed search (to try a different angle).

**Query routing.** Deciding *which* source or tool to query based on the question, when multiple knowledge bases or retrieval tools exist (e.g., product docs vs. support tickets vs. a structured database).

**Multi-hop retrieval.** Chaining retrievals where each search's results inform the next search — needed for questions that require combining facts from more than one place.

**Self-critique / reflection.** The agent evaluates whether what it retrieved is actually sufficient to answer the question before generating, and triggers another retrieval round if not — the mechanism that makes the loop adaptive rather than fixed.

**Tool-augmented retrieval.** The agent can choose between multiple retrieval mechanisms — vector search, keyword search, web search, structured/SQL queries, specific APIs — rather than being locked into one.

**Context compression/synthesis.** When iterative retrieval accumulates more material than fits cleanly in context, a distillation step reduces it before generation, rather than just concatenating everything retrieved so far.

**Grounding/citation.** Tying specific claims in the generated answer back to the specific retrieved chunk that supports them — both a user-trust feature and a mechanism for catching unsupported claims.

**Stopping criteria.** The same concern as in orchestration generally: a retrieval loop needs a hard cap (iteration count, cost, or time), not just "the agent decides it's done."

## Patterns & Approaches

**1. Retrieve-then-read (the naive baseline).** Worth naming explicitly because it's the thing agentic RAG is improving on, and it's the right choice when queries are well-formed and single-hop.

**2. Iterative retrieve-read-retrieve.** The agent drafts a partial answer or identifies what's missing, issues a follow-up query, and repeats until it judges it has enough.

**3. Query decomposition.** A complex question is broken into sub-questions up front, each retrieved independently, then synthesized into one answer — useful when the question's structure is knowable in advance rather than only discoverable through iteration.

**4. Corrective RAG.** Retrieved chunks are graded for relevance before use; if local retrieval quality is too low, the agent falls back to a different source (e.g., a web search tool) instead of generating from weak context.

**5. Router-based multi-source RAG.** A classifier or router step picks which index/tool to query per question, useful when you have genuinely distinct knowledge bases rather than one unified corpus.

**6. Re-ranking.** Retrieve a larger, cheap candidate set, then use a stronger model or cross-encoder to re-rank before passing the top results to generation — improves precision without paying the cost of a stronger retriever on every candidate.

**7. Agentic verification.** After generating an answer, a separate pass checks it against the retrieved sources and flags or triggers regeneration if it contains claims the sources don't support.

## Common Pitfalls

- **Adding agentic complexity the query distribution doesn't need.** If naive single-shot RAG already covers most real questions well, the added latency/cost/failure-surface of an agentic loop isn't justified — confirm the gap first.
- **Unbounded retrieval loops.** No cap on re-retrieval attempts leads to runaway cost and latency on hard or malformed questions.
- **Query drift across iterations.** Repeated reformulation can wander away from the user's actual intent if nothing anchors it back to the original question.
- **No relevance grading before use.** Feeding low-relevance chunks into generation regardless drowns the model in noise instead of helping it.
- **Context bloat from stacked retrievals.** Concatenating results across iterations without compression eventually exceeds context limits or dilutes the genuinely relevant material.
- **Conflating retrieval and generation failures.** Without separately measuring retrieval quality, a bad final answer could stem from either — and you can't tell which to fix (see the RAG Evaluation handout).
- **Fabricated grounding.** Citations that don't actually map to the chunk the model used are worse than no citations — they create false confidence.
- **Papering over a bad index with agentic behavior.** If chunking or the underlying index is genuinely poor, more retrieval iterations won't fix that — the fix belongs upstream.

## Example Projects

1. **Corrective RAG pipeline.** Retrieve, grade each chunk's relevance with a cheap classifier or LLM call, and fall back to a web search tool when local relevance is too low.
2. **Multi-hop question answerer.** Given a question requiring two facts from different documents, decompose it into sub-questions, retrieve for each, and synthesize a combined answer.
3. **Self-reflective RAG loop.** Have the agent draft an answer, critique its own draft against the retrieved context for unsupported claims, and re-retrieve/regenerate when it finds gaps.
4. **Multi-source router.** Given three distinct knowledge bases (e.g., product docs, support tickets, code comments), build a router agent that picks the right source(s) per query.
5. **Retrieval-vs-generation eval harness.** Build a small eval that separately scores retrieval precision/recall and final-answer correctness, so a given failure can be traced to its actual origin (pairs well with the RAG Evaluation handout).

## Checklist

- [ ] Retrieval loops have a hard cap on iterations/cost, independent of the agent's own judgment.
- [ ] Retrieved chunks are graded for relevance before being used in generation.
- [ ] Context from multiple retrieval passes is compressed/deduplicated, not just concatenated.
- [ ] Citations/grounding are verified to actually correspond to the chunks used.
- [ ] Retrieval quality and generation quality are measured separately.
- [ ] You've confirmed naive single-shot RAG is actually insufficient before adding agentic complexity.

## Further Reading

- Corrective RAG (CRAG) and Self-RAG papers.
- Query decomposition and multi-hop question-answering literature.
- Vendor documentation on agentic retrieval features (routing, re-ranking) in common RAG frameworks.
