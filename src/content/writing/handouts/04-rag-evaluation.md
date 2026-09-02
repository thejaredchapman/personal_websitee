# Handout 4: RAG Evaluation

*Free to read and share with anyone. Not for commercial use or resale.*

## What It Is

RAG evaluation measures the quality of a retrieval-augmented generation system across both halves of its pipeline: **retrieval** (did the system find the right source material) and **generation** (did the model produce a correct, grounded answer from what it found). The two need to be measured separately, because they fail independently and require different fixes — a bad answer can come from a good retriever feeding a weak prompt, or a strong generation step working from irrelevant chunks.

## Why It Matters

If you only measure end-to-end answer quality — "was the final answer right?" — you have no way to tell whether to fix your chunking and indexing or your prompt and generation step when something goes wrong. Component-level evaluation is what turns "the answers are bad" into an actionable diagnosis: "retrieval precision dropped after the last reindex" versus "retrieval is fine, but the model is asserting things the context doesn't support." Without it, every RAG regression becomes a guessing game.

## Core Concepts

**Retrieval metrics.** Precision@k and recall@k (of the chunks retrieved, how many are relevant; of the relevant chunks that exist, how many were retrieved), mean reciprocal rank (MRR, how high the first relevant result ranks), and NDCG (rewards relevant results ranking higher, not just being present). These require a labeled set of which documents/chunks are actually relevant to a given question.

**Generation metrics.** Faithfulness/groundedness (does the answer only assert things supported by the retrieved context), answer relevance (does the answer actually address the question asked), and correctness (is it factually right, independent of whether it's grounded).

**End-to-end metrics.** Overall answer accuracy against a labeled question/answer set — useful as a summary number, but not diagnostic on its own.

**Reference-based vs. reference-free evaluation.** Reference-based compares against a known correct answer (requires labeled ground truth); reference-free uses an LLM judge or heuristics without one (cheaper to set up, needs its own calibration).

**Groundedness / hallucination detection.** Specifically checking whether each claim in the generated answer is traceable to the retrieved source text — a fluent, confident-sounding answer can still fail this check.

**Context precision/recall.** The retrieval-side analog of the metrics above, focused specifically on whether the *context passed to the model* was the right context — distinct from whether the final answer was correct.

**Chunking/indexing as an upstream lever.** Many failures that look like "generation problems" (the model answered incorrectly) are actually retrieval or chunking problems (the right information was never in the context to begin with). Component-level eval is what surfaces this distinction.

**Golden Q&A datasets.** A set of questions with both a known correct answer and, ideally, labeled relevant source chunks/documents — the latter is what makes retrieval metrics computable at all.

## Patterns & Approaches

**1. Component-level evaluation.** Score retrieval (precision/recall/MRR against labeled relevant documents) and generation (faithfulness/relevance given the retrieved context) separately, rather than only end-to-end — the single most important practice in this handout.

**2. Decomposed RAG-specific frameworks.** Approaches like the RAGAS-style metric set — faithfulness, answer relevance, context precision, context recall — that give you a standard vocabulary and set of scores to track over time.

**3. LLM-as-judge for faithfulness.** Given the answer and the retrieved context, ask a judge model whether every claim is supported by that context — practical when you don't have hand-labeled ground truth for every question.

**4. Synthetic Q&A generation.** Generate question/answer pairs directly from your document set to bootstrap an eval dataset before you have real user queries — useful early, but needs validation (see Pitfalls).

**5. Human-labeled relevance sampling.** Periodically have a person label which chunks are actually relevant to a sample of real queries, to calibrate your automated retrieval metrics against ground truth rather than trusting them blindly.

**6. Regression testing across index/embedding changes.** Rerun the full eval set whenever chunk size, overlap, or embedding model changes — this project's own `CLAUDE.md` flags embedding-model changes as requiring a full reindex, which is exactly the moment a regression eval run matters most.

**7. Continuous production sampling.** Log a sample of real production queries and periodically grade them (human or judge), since any synthetic or fixed eval set drifts from how the system is actually being used over time.

## Common Pitfalls

- **Measuring only end-to-end answer quality.** Leaves you unable to diagnose whether a failure originates in retrieval or generation.
- **No labeled relevant-document ground truth.** Without it, retrieval metrics can't be computed at all — evaluation collapses to "does the answer look right," which is exactly the vague judgment component-level eval exists to replace.
- **Never checking faithfulness/groundedness.** A model can produce a fluent, confident, wrong-but-plausible answer that passes a naive relevance check while failing a faithfulness check outright.
- **Stale or too-small eval sets.** An eval set that hasn't kept pace with the document set or real query patterns stops reliably catching regressions.
- **Eval sets built entirely from synthetic questions.** Generated Q&A pairs can systematically differ from how real users actually phrase questions — validate synthetic eval against a small hand-labeled sample.
- **Not re-running eval after chunking/embedding/prompt changes.** Silently ships regressions that only surface later as user complaints.
- **Trusting a high aggregate score without checking the tail.** Rare but severe failures can hide behind a good average; review specific failure cases, not just the summary number.
- **Uncalibrated LLM judges.** Using an LLM-as-judge for faithfulness without checking its judgments against human judgment on a sample means you're trusting an unverified grader.

## Example Projects

1. **Labeled retrieval eval set.** For 20-30 real or realistic questions, manually mark which chunks/documents are actually relevant, then compute precision@k, recall@k, and MRR for your current retriever.
2. **Faithfulness checker.** Given an answer and its retrieved context, use an LLM judge to flag any claim not supported by the context, then validate the judge against a hand-graded sample of your own.
3. **Synthetic Q&A generator with bias check.** Automatically generate question/answer pairs from a document set to bootstrap eval, then compare scores from the generated set against a small hand-labeled set to check for generator bias.
4. **Chunking/embedding regression harness.** Build a harness that reruns your full RAG eval suite whenever chunk size, overlap, or embedding model changes, and reports the score deltas.
5. **Production sampling pipeline.** Log a random sample of real queries/answers, periodically grade them (human or LLM judge), and track faithfulness/relevance trends over time against your offline eval baseline.

## Checklist

- [ ] Retrieval quality (precision/recall/MRR) is measured separately from generation quality.
- [ ] A labeled relevant-document set exists for at least a representative sample of queries.
- [ ] Faithfulness/groundedness is explicitly checked, not assumed from a fluent-sounding answer.
- [ ] The eval set reflects real user query patterns, not only synthetic/generated questions.
- [ ] Eval reruns automatically after chunking, embedding model, or prompt changes.
- [ ] Any LLM-as-judge component is calibrated against human judgment on a sample.
- [ ] Tail/rare failure cases are reviewed, not just aggregate scores.

## Further Reading

- RAGAS and similar RAG evaluation framework documentation (faithfulness, context precision/recall, answer relevance).
- Information retrieval fundamentals: precision@k, recall@k, MRR, NDCG.
- Papers and industry writing on hallucination detection and groundedness checking in RAG systems.
