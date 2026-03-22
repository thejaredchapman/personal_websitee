function AboutApp() {
  return (
    <div className="p-6 max-[768px]:p-4">
      {/* Hero card */}
      <div className="rounded-2xl p-6 border relative overflow-hidden" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}>
        {/* Accent gradient strip */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, var(--accent-500), var(--accent-300))' }} />

        <div className="flex gap-6 items-center max-[768px]:flex-col max-[768px]:text-center">
          {/* Photo */}
          <div className="relative shrink-0">
            <div className="w-28 h-28 rounded-full overflow-hidden ring-2 ring-offset-2" style={{ '--tw-ring-color': 'var(--accent-400)', '--tw-ring-offset-color': 'var(--bg-secondary)' }}>
              <img src="/selfie.jpg" alt="Jared Chapman" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] border-2" style={{ background: 'var(--accent-500)', borderColor: 'var(--bg-secondary)', color: 'white' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 max-[768px]:justify-center">
              <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Jared Chapman</h1>
            </div>
            <p className="text-sm font-medium mb-2" style={{ color: 'var(--accent-500)' }}>Generative AI Specialist</p>
            <div className="flex items-center gap-3 text-xs flex-wrap max-[768px]:justify-center" style={{ color: 'var(--text-tertiary)' }}>
              <span className="flex items-center gap-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Los Angeles, CA
              </span>
              <span className="flex items-center gap-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                Atlanta native
              </span>
              <span className="flex items-center gap-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Former Google
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Story */}
      <div className="mt-5 grid grid-cols-2 gap-3 max-[768px]:grid-cols-1">
        <div className="rounded-xl p-4 border" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-100)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5" style={{ color: 'var(--accent-600)' }}><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            </span>
            <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>What I Do</h3>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Generative AI specialist enabling developers to understand and build with AI
            responsibly — all while keeping one foot in the community through education,
            literacy, and the kind of connections that actually move things forward.
          </p>
        </div>

        <div className="rounded-xl p-4 border" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-100)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5" style={{ color: 'var(--accent-600)' }}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
            </span>
            <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>The Vibe</h3>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Extreme extrovert who goes deep on everything that catches his curiosity. Originally
            from Atlanta with a deep love for Chicago, now soaking up everything California has
            to offer alongside his fianc&eacute;e Avery Wine and their son, Dr. Pugsley Bikini.
            If you're even slightly interested in talking — reach out, because that's genuinely
            his favorite thing to do.
          </p>
        </div>
      </div>

      {/* Quick stats row */}
      <div className="mt-4 flex gap-2 max-[768px]:flex-wrap">
        {[
          { emoji: '🍑', label: 'From', value: 'Atlanta' },
          { emoji: '🌴', label: 'Based In', value: 'Los Angeles' },
          { emoji: '🤖', label: 'Focus', value: 'Generative AI' },
          { emoji: '🐶', label: 'Son', value: 'Dr. Pugsley Bikini' },
        ].map((stat) => (
          <div key={stat.label} className="flex-1 min-w-0 rounded-lg py-2.5 px-3 border text-center" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}>
            <div className="text-base mb-0.5">{stat.emoji}</div>
            <div className="text-[11px] font-bold truncate" style={{ color: 'var(--text-primary)' }}>{stat.value}</div>
            <div className="text-[9px] uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* AI & ML Work */}
      <div className="mt-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 rounded-full" style={{ background: 'var(--accent-500)' }} />
          <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>What I Build</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 max-[768px]:grid-cols-1">
          {[
            { title: 'LLM Developer Support', desc: 'Supporting developers on LLM integration, A/B testing models', tags: ['LLMs', 'Vertex AI'], icon: '🧠' },
            { title: 'BigQuery DataFrames', desc: 'Python and DataFrames APIs using Pandas, Ibis, PyArrow', tags: ['Python', 'Pandas'], icon: '📊' },
            { title: 'Ibis Open Source', desc: 'Added microsecond precision method to the Ibis library', tags: ['Open Source', 'SQL'], icon: '🔓' },
            { title: 'Searchmark Tools', desc: 'OOP architecture in Java for Google Search performance tools', tags: ['Java', 'gRPC'], icon: '🔍' },
          ].map((item) => (
            <div key={item.title} className="group rounded-xl p-4 border transition-all duration-200 hover:border-[var(--accent-300)] hover:-translate-y-0.5" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}>
              <div className="flex items-start gap-3">
                <span className="text-lg mt-0.5">{item.icon}</span>
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                  <p className="text-xs mb-2 leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>{item.desc}</p>
                  <div className="flex gap-1 flex-wrap">
                    {item.tags.map((t) => (
                      <span key={t} className="text-[10px] py-0.5 px-2 rounded-full font-medium" style={{ background: 'var(--accent-100)', color: 'var(--accent-700)' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AboutApp
