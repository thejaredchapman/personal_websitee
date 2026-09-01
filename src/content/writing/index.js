import vibeCodingContent from './publications/from-vibe-coding-to-agentic-engineering.md?raw'
import agentOrchestrationContent from './handouts/01-agent-orchestration.md?raw'
import agentEvalContent from './handouts/02-agent-evaluation-and-instrumentation.md?raw'
import agenticRagContent from './handouts/03-agentic-rag.md?raw'
import ragEvalContent from './handouts/04-rag-evaluation.md?raw'
import toolEvalContent from './handouts/05-tool-evaluation.md?raw'

export const publications = [
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
