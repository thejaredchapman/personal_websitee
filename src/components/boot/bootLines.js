import { commit, cleanSubject } from '../../utils/buildInfo'

function formatDate(iso) {
  const d = new Date(iso)
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function buildBootLines() {
  const date = formatDate(commit.date)
  return [
    { text: '', delay: 200 },
    { text: 'JaredOS v2.0', delay: 300, style: 'accent' },
    { text: `Copyright (c) ${new Date().getFullYear()} Jared Chapman. All rights reserved.`, delay: 200, style: 'dim' },
    { text: `Latest commit: ${commit.hash}${date ? ` · ${date}` : ''}`, delay: 150, style: 'dim' },
    { text: '', delay: 300 },
    { text: '[BOOT] Initializing system...', delay: 400 },
    { text: '[  OK  ] personality.py loaded', delay: 250, style: 'ok' },
    { text: '[  OK  ] humor_engine.py loaded', delay: 200, style: 'ok' },
    { text: '[  OK  ] coding_skills.py loaded', delay: 180, style: 'ok' },
    { text: '[ WARN ] coffee_levels.py — CRITICALLY LOW', delay: 350, style: 'warn' },
    { text: '[  OK  ] imposter_syndrome.py — SUPPRESSED', delay: 200, style: 'ok' },
    { text: '[  OK  ] dad_jokes.py loaded (15 jokes cached)', delay: 180, style: 'ok' },
    { text: '[  OK  ] resume.pdf mounted at /career', delay: 150, style: 'ok' },
    { text: '[  OK  ] projects/ mounted (10 repositories)', delay: 150, style: 'ok' },
    { text: '[  OK  ] gallery/ mounted (20 photos)', delay: 120, style: 'ok' },
    { text: `[ NEW  ] ${cleanSubject(commit.subject)}`, delay: 400, style: 'new' },
    { text: '', delay: 200 },
    { text: 'All systems nominal. Loading desktop...', delay: 500, style: 'accent' },
  ]
}
