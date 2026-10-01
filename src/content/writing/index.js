import stayTheEngineerContent from './publications/stay-the-engineer.md?raw'
import meetUsersContent from './publications/meet-users-where-they-are.md?raw'
import evalforgeGuideContent from './publications/evalforge-lite-guide.md?raw'
import vibeCodingContent from './publications/from-vibe-coding-to-agentic-engineering.md?raw'
import agentOrchestrationContent from './handouts/01-agent-orchestration.md?raw'
import agentEvalContent from './handouts/02-agent-evaluation-and-instrumentation.md?raw'
import agenticRagContent from './handouts/03-agentic-rag.md?raw'
import ragEvalContent from './handouts/04-rag-evaluation.md?raw'
import toolEvalContent from './handouts/05-tool-evaluation.md?raw'

export const publications = [
  {
    id: 'evalforge-lite-guide',
    title: 'EvalForge Lite: How to Compare AI Models on Your Own Prompts',
    description: 'A plain-English guide to testing AI models on your own prompts: grading, speed and cost, a policy gate, and an MCP server for Claude.',
    tags: ['Model Evaluation', 'MCP', 'Multi-cloud'],
    content: evalforgeGuideContent,
  },
  {
    id: 'does-ai-know-im-not-white',
    title: "Does AI Know I'm Not White?",
    description: 'A five-minute test you can run yourself, the probability math behind why image AI defaults to whiteness, and the prompts that make it listen.',
    tags: ['AI Bias', 'Representation', 'Prompt Engineering'],
    htmlSrc: '/does-ai-know-im-not-white.html',
  },
  {
    id: 'meet-users-where-they-are',
    title: 'Meet Users Where They Are',
    description: 'Twenty-one prompts that let an AI product adapt to language, ability, device, and context instead of assuming every user is the same.',
    tags: ['Accessibility', 'Prompt Engineering', 'Localization'],
    content: meetUsersContent,
  },
  {
    id: 'stay-the-engineer',
    title: 'Stay the Engineer: Using AI to Get Better, Not Get Replaced',
    description: 'Five habits, twenty tools, and one honest rule: if you can\'t explain the change, you don\'t own it.',
    tags: ['AI Tools', 'Developer Habits', 'Responsible AI'],
    content: stayTheEngineerContent,
    embedVideos: true,
  },
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

export const allArticles = [...publications, ...handouts]
