import { useId, useState } from 'react'
import './guide.css'
import {
  MODELS, MODELS_AS_OF, MODEL_FILTERS, MODEL_TIERS, COMPETITORS, WHY_CLAUDE_CODE,
  PERMISSION_MODES, RISKS, RESPONSIBLE, MD_FILES, SKILL_EXAMPLE, INTENT_EXAMPLE,
  SAVE_MONEY, PLAN_STEPS,
} from '../../data/guideData'

const SECTIONS = [
  { key: 'what', title: 'What is a coding assistant?' },
  { key: 'field', title: 'The field' },
  { key: 'why', title: 'Why Claude Code' },
  { key: 'models', title: 'Claude models, old and new' },
  { key: 'responsible', title: 'Using AI responsibly' },
  { key: 'risks', title: 'What can go wrong, and the permission modes' },
  { key: 'files', title: 'The .md files' },
  { key: 'extend', title: 'Skills, plugins and MCP' },
  { key: 'money', title: 'Spend less' },
  { key: 'plan', title: 'Make a plan first' },
]

const STATUS_LABEL = { current: 'CURRENT', available: 'AVAILABLE', deprecated: 'RETIRING', retired: 'RETIRED' }

function Section({ id, n, title, children }) {
  return (
    <section id={id} className="g-sec" aria-labelledby={`${id}-h`}>
      <div className="g-sec-head">
        <span className="g-num">{String(n).padStart(2, '0')} //</span>
        <h2 id={`${id}-h`} className="g-h2">{title}</h2>
      </div>
      {children}
    </section>
  )
}

function Code({ tab, children }) {
  return (
    <div className="g-code">
      <div className="g-code-tab">{tab}</div>
      <pre><code>{children}</code></pre>
    </div>
  )
}

function Callout({ title, kind = '', children }) {
  return (
    <div className={`g-callout ${kind}`} role="note">
      <span className="g-callout-title">{title}</span>
      {children}
    </div>
  )
}

function ModelTable() {
  const [filter, setFilter] = useState('current')
  const rows = MODELS.filter((m) => m.status === filter)
  const detailed = filter === 'current'
  return (
    <>
      <div className="g-toc" role="group" aria-label="Filter models by status">
        {MODEL_FILTERS.map((f) => (
          <button key={f.key} className="g-chip" aria-pressed={filter === f.key} onClick={() => setFilter(f.key)}>
            {f.label} ({MODELS.filter((m) => m.status === f.key).length})
          </button>
        ))}
      </div>
      <div className="g-table-scroll">
        <table className="g-table">
          <thead>
            <tr>
              <th>Model</th><th>Tier</th><th>Status</th>
              {detailed && <><th>Context</th><th>$ in / out per M tokens</th></>}
              <th>{detailed ? 'Good for' : 'Dates'}</th>
              <th>API ID</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>{m.tier}</td>
                <td><span className={`g-tag ${m.status}`}>{STATUS_LABEL[m.status]}</span></td>
                {detailed && <><td>{m.context}</td><td>{m.price}</td></>}
                <td>{detailed ? `${m.note}. ${m.until}.` : m.until}</td>
                <td className="g-id">{m.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

function GuideContent() {
  const uid = useId()
  const idFor = (key) => `${uid}-${key}`
  const jump = (key) => document.getElementById(idFor(key))?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <article className="g-root">
      <div className="g-wrap">
        <header className="g-hero">
          <div className="g-hero-bar"><span className="g-dot" /><span className="g-dot" /><span className="g-dot" /><span style={{ marginLeft: 6 }}>~/guide/coding-assistants.md</span></div>
          <div className="g-hero-body">
            <span className="g-prompt">$ man coding-assistant</span>
            <h1 className="g-h1">Coding assistants, explained<span className="g-caret" aria-hidden="true" /></h1>
            <p className="g-lede">
              A plain-English field guide for first-time coders and working developers: what these tools are, how Claude Code stacks up,
              which Claude models exist, and, most important, how to let an AI act on your computer without it costing you your work.
            </p>
          </div>
        </header>

        <nav className="g-toc" aria-label="Guide sections">
          {SECTIONS.map((s, i) => (
            <button key={s.key} className="g-chip" onClick={() => jump(s.key)}><b>{String(i + 1).padStart(2, '0')}</b>{s.title.split(',')[0]}</button>
          ))}
        </nav>

        <Section id={idFor('what')} n={1} title={SECTIONS[0].title}>
          <p className="g-p">
            A coding assistant is software that uses an AI model to help you write, understand, and fix code. They come in three
            levels, and the difference matters because each level can do more, and so can break more.
          </p>
          <div className="g-grid">
            <div className="g-card"><span className="g-kind">Level 1</span><h4>Autocomplete</h4><p>Suggests the next line as you type. You accept or ignore each suggestion.</p></div>
            <div className="g-card"><span className="g-kind">Level 2</span><h4>Chat</h4><p>You ask questions and paste code. It answers, and you copy the results yourself.</p></div>
            <div className="g-card"><span className="g-kind">Level 3</span><h4>Agent</h4><p>You describe a goal. It reads your files, edits them, runs commands, checks the result, and tries again.</p></div>
          </div>
          <h3 className="g-h3">What &ldquo;using&rdquo; one really means</h3>
          <ul className="g-list">
            <li className="g-li"><span><strong>You steer, it drives.</strong> You state the goal (the intent) and the limits. It does the typing, searching, and testing.</span></li>
            <li className="g-li"><span><strong>It works inside your project.</strong> An agent can see your folders and use your terminal, which is why permissions matter so much (see section 6).</span></li>
            <li className="g-li"><span><strong>It is a fast, tireless junior teammate.</strong> It is quick and keen, but can be confidently wrong. You still review the work.</span></li>
          </ul>
        </Section>

        <Section id={idFor('field')} n={2} title={SECTIONS[1].title}>
          <p className="g-p">Plenty of good tools exist, and they move fast. Features change monthly, so check each vendor&rsquo;s current docs before deciding.</p>
          <div className="g-grid">
            {COMPETITORS.map((c) => (
              <div key={c.name} className="g-card"><span className="g-kind">{c.kind}</span><h4>{c.name}</h4><p>{c.blurb}</p></div>
            ))}
          </div>
        </Section>

        <Section id={idFor('why')} n={3} title={SECTIONS[2].title}>
          <p className="g-p">This is my opinion, shaped by how I work, but here is why Claude Code is my pick:</p>
          <div className="g-grid">
            {WHY_CLAUDE_CODE.map((w) => (
              <div key={w.title} className="g-card"><h4>{w.title}</h4><p>{w.body}</p></div>
            ))}
          </div>
          <Callout title="Honest trade-off">
            If all you want is smooth autocomplete while you type, an editor-native tool can feel lighter. Plenty of developers use both: an
            editor assistant for typing, Claude Code for bigger jobs.
          </Callout>
        </Section>

        <Section id={idFor('models')} n={4} title={SECTIONS[3].title}>
          <p className="g-p">
            Claude comes in sizes. Bigger models think harder but cost more and answer slower; smaller ones are quick and cheap. Pick the
            smallest one that does the job.
          </p>
          <div className="g-table-scroll" style={{ marginBottom: 14 }}>
            <table className="g-table">
              <thead><tr><th>Tier</th><th>Family</th><th>Use it for</th></tr></thead>
              <tbody>
                {MODEL_TIERS.map((t) => (<tr key={t.tier}><td>{t.tier}</td><td>{t.models}</td><td>{t.use}</td></tr>))}
              </tbody>
            </table>
          </div>
          <ModelTable />
          <p className="g-foot" style={{ marginTop: 10, paddingTop: 0, border: 'none' }}>
            Status as of {MODELS_AS_OF}, from Anthropic&rsquo;s model and deprecation docs. Prices are USD per million tokens. A token is
            roughly three-quarters of a word. Older models are shown by name and ID only; their retirement dates are the part that matters.
          </p>
        </Section>

        <Section id={idFor('responsible')} n={5} title={SECTIONS[4].title}>
          <p className="g-p">AI can write code faster than you can read it. That is exactly why the responsibility stays with you.</p>
          <ul className="g-list">
            {RESPONSIBLE.map((r) => (<li key={r} className="g-li"><span>{r}</span></li>))}
          </ul>
        </Section>

        <Section id={idFor('risks')} n={6} title={SECTIONS[5].title}>
          <Callout title="Read this if you are new to coding" kind="danger">
            An AI agent is not a chatbot behind glass. When you let it act, it can change and delete files and run commands on your
            computer, with the same power you have. Treat every permission as handing it the keys, and only hand over what you could undo.
          </Callout>
          <h3 className="g-h3">What can go wrong</h3>
          <div className="g-grid">
            {RISKS.map((r) => (<div key={r.title} className="g-card"><h4>{r.title}</h4><p>{r.fix}</p></div>))}
          </div>
          <h3 className="g-h3">The permission modes: a ladder of trust</h3>
          <p className="g-p">
            Claude Code asks before it acts, unless you tell it not to. Press <code className="g-inline">Shift+Tab</code> to cycle modes,
            and always glance at the status bar to see which one you are in, because newer versions can start in auto mode.
          </p>
          <div className="g-table-scroll">
            <table className="g-table">
              <thead><tr><th>Mode</th><th>Risk</th><th>What it does</th><th>Use it when</th></tr></thead>
              <tbody>
                {PERMISSION_MODES.map((m) => (
                  <tr key={m.id}>
                    <td>{m.name}</td>
                    <td>
                      <span className="g-risk" data-level={m.risk} role="img" aria-label={`Risk ${m.risk} of 5`}>
                        {[1, 2, 3, 4, 5].map((i) => (<i key={i} className={i <= m.risk ? 'on' : ''} />))}
                      </span>
                    </td>
                    <td>{m.asks}</td>
                    <td>{m.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Callout title="A safe default for beginners" kind="warn">
            Start in Manual or Plan. Move to Accept edits once you can read a diff. Only try Auto in a project under git, with tests,
            and never on a machine holding things you can&rsquo;t afford to lose. Bypass belongs in a disposable container, not on your laptop.
          </Callout>
        </Section>

        <Section id={idFor('files')} n={7} title={SECTIONS[6].title}>
          <p className="g-p">Several Markdown files steer an AI project. They look alike but have different readers and jobs.</p>
          <div className="g-table-scroll">
            <table className="g-table">
              <thead><tr><th>File</th><th>Read by</th><th>What it is for</th></tr></thead>
              <tbody>
                {MD_FILES.map((f) => (<tr key={f.file}><td>{f.file}</td><td>{f.who}</td><td>{f.what}</td></tr>))}
              </tbody>
            </table>
          </div>
          <h3 className="g-h3">An intent.md you could copy</h3>
          <Code tab="intent.md">{INTENT_EXAMPLE}</Code>
          <p className="g-p">
            Intent is the thing AI is worst at guessing. Writing down the goal, the limits, and what &ldquo;done&rdquo; means is the cheapest way to
            get better results.
          </p>
        </Section>

        <Section id={idFor('extend')} n={8} title={SECTIONS[7].title}>
          <div className="g-grid">
            <div className="g-card"><span className="g-kind">Skill</span><h4>A reusable how-to</h4><p>A folder with a <code className="g-inline">SKILL.md</code>. Claude loads it only when it fits the task.</p></div>
            <div className="g-card"><span className="g-kind">Plugin</span><h4>A bundle</h4><p>Packages skills, agents, hooks, and MCP servers so you can install them in one step.</p></div>
            <div className="g-card"><span className="g-kind">MCP server</span><h4>A connector</h4><p>Lets Claude use outside tools and data, like your calendar, a database, or Spotify.</p></div>
          </div>
          <h3 className="g-h3">How skills get used</h3>
          <Code tab=".claude/skills/explain-error/SKILL.md">{SKILL_EXAMPLE}</Code>
          <ul className="g-list">
            <li className="g-li"><span><strong>Automatically.</strong> Claude reads every skill&rsquo;s <code className="g-inline">description</code> and loads one when your request matches it. A skill that never fires usually has a description missing the words you actually say.</span></li>
            <li className="g-li"><span><strong>Manually.</strong> Type <code className="g-inline">/explain-error</code> to run it yourself. Add <code className="g-inline">disable-model-invocation: true</code> to make a skill manual-only.</span></li>
            <li className="g-li"><span><strong>By file type.</strong> A <code className="g-inline">paths</code> setting can limit a skill to certain files.</span></li>
            <li className="g-li"><span><strong>Where they live.</strong> <code className="g-inline">~/.claude/skills/</code> for you everywhere, or <code className="g-inline">.claude/skills/</code> in a repo to share with a team.</span></li>
          </ul>
          <h3 className="g-h3">Installing a plugin</h3>
          <Code tab="inside Claude Code">{`/plugin                                     # browse and search
/plugin install commit-commands@claude-plugins-official
/plugin marketplace add owner/repo          # add another catalog`}</Code>
          <Callout title="Plugins and MCP servers run code as you" kind="warn">
            A plugin can run hooks and MCP servers, and an MCP server can reach outside data. Read what a plugin adds before installing,
            and install only from sources you trust. Each one also adds to what Claude has to carry, which costs money.
          </Callout>
        </Section>

        <Section id={idFor('money')} n={9} title={SECTIONS[8].title}>
          <p className="g-p">Cost grows with context: the more Claude has to re-read, the more tokens you pay for. These habits help most.</p>
          <div className="g-table-scroll">
            <table className="g-table">
              <thead><tr><th>Habit</th><th>How</th></tr></thead>
              <tbody>
                {SAVE_MONEY.map((s) => (<tr key={s.tip}><td>{s.tip}</td><td>{s.how}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="g-foot" style={{ marginTop: 10, paddingTop: 0, border: 'none' }}>
            For scale: Anthropic reports about $13 per developer per active day on average across enterprise teams. Run <code className="g-inline">/usage</code> to watch your own.
          </p>
        </Section>

        <Section id={idFor('plan')} n={10} title={SECTIONS[9].title}>
          <ol className="g-steps">
            {PLAN_STEPS.map((s) => (
              <li key={s.n} className="g-step"><span className="g-step-n">{s.n}</span><span><strong style={{ color: 'var(--text-primary)' }}>{s.title}.</strong> {s.body}</span></li>
            ))}
          </ol>
          <Callout title="The one rule">
            Never let it do anything you couldn&rsquo;t undo. With git and a plan, almost everything is undoable.
          </Callout>
        </Section>

        <footer className="g-foot">
          Sources: Anthropic&rsquo;s model, deprecation and Claude Code docs, checked {MODELS_AS_OF}. Opinions in section 3 are mine.
        </footer>
      </div>
    </article>
  )
}

export default GuideContent
