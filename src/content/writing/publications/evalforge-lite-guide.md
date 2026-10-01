# EvalForge Lite: How to Compare AI Models on Your Own Prompts

*A plain-English guide for developers who are new to LLM tools. No machine-learning background needed.*

---

> **Read this first:** this tool helps you choose a model with evidence. It does not prove a model is "correct." A grade here is one opinion on your prompts. Check anything that matters yourself.

## Start with a picture

Imagine you need to hire for a job and three candidates look equally good on paper. You wouldn't pick one at random. You'd give all three the same small task and compare the results.

EvalForge Lite is that task for AI models. You give each model the same prompt, then compare the answers, how fast they arrived, and what they cost.

## The problem it solves

There are dozens of models, from several companies, at very different prices. People usually pick one by reputation, which means:

- You might pay for a flagship model when a cheaper one does your job just as well.
- You might use a fast model that quietly writes worse answers for your kind of task.
- You can't tell, because nobody tested it.

## The words you'll see

| Word | What it means |
|---|---|
| Model | The AI, such as GPT-5 or Claude. |
| Provider / backend | Where the model runs. This app supports OpenRouter, Amazon Bedrock, Google Vertex AI and Microsoft Foundry. |
| Target | A model plus where it runs. `openai/gpt-5` runs through OpenRouter, while `openai/gpt-5@foundry` runs the same model on Microsoft Foundry. |
| Prompt | What you ask the model. |
| Rubric | Your grading instructions, like "must answer in under 100 words and mention the refund window." |
| Judge | A second AI model that reads each answer and scores it against your rubric. |
| Rule check | A simple, exact test with no AI, like "the answer must contain this word." |

## Your first comparison (about 5 minutes)

1. **Add a key.** Open the credentials panel and paste an API key for one backend. OpenRouter is the easiest start: one key gives you many models.
2. **Write a prompt.** For example: "Explain what an API is to a nine-year-old."
3. **Add a rubric** (optional but powerful). For example: "Uses a simple analogy. No jargon. Under 120 words."
4. **Pick two to four models.** Choose from different companies if you can. There's a hard cap of 4 per run, and the same model on two backends counts as two.
5. **Click Run comparison.** You'll see a leaderboard with a letter grade for each model, plus each model's actual answer.

## How the grading works (no math degree needed)

Each model gets a score from two sources:

- **The judge's score.** It reads the answer and gives 1 to 5 against your rubric. A judge can be wrong or inconsistent, so treat the grade as one opinion. Repeating each prompt 2 or 3 times gives steadier timing numbers.
- **Rule checks.** Exact pass/fail tests. They run locally, so they're free and the same every time. In the web app you won't see boxes for them, but you can use them through the API and the MCP server.

When both exist, the score is blended: 70% judge, 30% rule checks. On top of that, every answer gets a per-response evaluation across six criteria (answered, quality, instruction-following, completeness, helpfulness and safety). That evaluation is blended in at 50% of the final grade. The result is a letter from A+ down to F.

Two honest warnings:

- A judge model can favor answers that sound like itself. If the judge comes from the same company as one of your contestants, the app shows a note that scores may lean in that model's favor.
- That note only triggers when the judge's model name contains the company name, and the default Foundry judge doesn't. Treat the absence of a note as no guarantee.

## Speed and cost, side by side

The comparison shows latency (how long each model took, compared to the fastest) and cost. A single run's total cost is shown at the top.

- OpenRouter prices come from OpenRouter itself.
- Bedrock, Vertex and Foundry costs are estimates from the prices listed in the repo. They are not what your cloud bill says.

A priority selector (Balanced, Best quality, Fastest, Cheapest) moves a "Best for…" badge to the column that wins on what you care about. It doesn't run anything again, and it doesn't reorder the columns.

## A policy gate for teams

Upload a company policy such as "no medical advice." Before a prompt reaches a model, a judge checks it against the policy. If it's flagged, that model never sees the prompt.

It fails closed. If the check errors out or returns something unreadable, the prompt is treated as a violation and blocked. For a compliance tool, that's the safe default.

## Picking models without being overwhelmed

Models are grouped into one dropdown per provider, with a checkbox for each place a model can run. Some models carry a **Reasoning** badge, meaning they support extended reasoning. You can also filter by what you need (coding, long documents, fast and cheap) or by industry. The tags are curated and dated, a starting point and not a benchmark. Test with your own prompts.

## Use it from inside Claude

The same engine ships as an MCP server. MCP (Model Context Protocol) is a standard way for AI assistants to call tools. With it, you can say "compare these three models on this prompt" in Claude, and it does the work and reports back.

```
uvx evalforge-lite
claude mcp add evalforge-lite -- uvx evalforge-lite
```

There are 9 tools, including `run_comparison` and `list_models`.

## Your keys stay yours

- **You bring the key.** It's sent with each request and never stored on disk.
- **It's scrubbed.** If something fails, the error text has your key removed before you see it.
- **Operators can hold keys instead.** If you host the app for a team, it can keep keys on the server, so users never see them. A shared cap (50 runs per 24 hours by default) limits spending. That's off unless the operator turns it on.

## How it's built (for the curious developer)

- **Python and Flask.** A small web app with no database. Everything lives in memory for the length of a session.
- **One job per file.** There's a small file for grading, one for the policy gate, one for rate limiting, and so on. A runner fans work out across every prompt-and-model pair using threads.
- **A gateway.** Every call goes through one function that picks the right backend, so adding a backend means writing one client.
- **568 automated tests, none touching the network.** Every outside call is mocked, so the whole suite runs in seconds.
- **Built with Claude Code.** I used a spec-then-plan-then-implement loop. Separate reviewer agents checked each piece. They caught a piece of code that called itself forever and a case where a private project name could have appeared in an error message. That's why I trust the review step.

## Limits worth knowing

- Three runs per 8 hours per browser session, and the last five runs are kept. They live in memory and disappear when the server restarts.
- At most 4 models per run.
- Grades come from an AI judge. They guide a decision. They don't replace your own testing.

## Try it

- **Live demo:** [evalforge-lite.onrender.com](https://evalforge-lite.onrender.com/)
- **Code, README and full docs:** [github.com/thejaredchapman/evalforge-lite](https://github.com/thejaredchapman/evalforge-lite)
- **Install the MCP server:** `uvx evalforge-lite`
