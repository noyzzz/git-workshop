import { useState, useEffect, useCallback } from 'react'
import { slides } from '../data/slides'

// ─── Slide renderers ─────────────────────────────────

function ThreeAreasDiagram({ slide }) {
  return (
    <div className="slide-body">
      <div className="three-areas-diagram">
        {slide.areas.map((area, i) => (
          <>
            <div key={area.name} className={`area-box ${area.color}`}>
              <div className="area-box-name">{area.name}</div>
              <div className="area-box-desc">{area.desc}</div>
            </div>
            {i < slide.areas.length - 1 && (
              <div key={`arrow-${i}`} className="area-arrow">
                <div className="area-arrow-cmd">{slide.commands[i]}</div>
                <div className="area-arrow-chevron">→</div>
              </div>
            )}
          </>
        ))}
      </div>
      {slide.note && <div className="diagram-note">💡 {slide.note}</div>}
    </div>
  )
}

function FileStatesDiagram({ slide }) {
  const colors = ['red', 'yellow', 'green']
  return (
    <div className="slide-body">
      <div className="file-states">
        {slide.states.map((state, i) => (
          <>
            <div key={state.name} className="file-state-box">
              <div className="file-state-name">{state.name}</div>
              <div className="file-state-desc">{state.desc}</div>
            </div>
            {i < slide.states.length - 1 && (
              <div key={`arrow-${i}`} className="state-arrow">→</div>
            )}
          </>
        ))}
      </div>
    </div>
  )
}

function BranchDiagram({ slide }) {
  return (
    <div className="slide-body">
      <div className="branch-diagram">
        <div className="commit-chain">
          {slide.chain.map((node, i) => (
            <>
              <div key={node} className="commit-node">{node}</div>
              {i < slide.chain.length - 1 && (
                <div key={`arrow-${i}`} className="commit-arrow">→</div>
              )}
            </>
          ))}
        </div>
        <div className="branch-pointer">
          <span className="branch-tag">{slide.pointer.branch}</span>
          <span className="pointer-arrow">→</span>
          <span className="pointer-target">commit {slide.pointer.target}</span>
        </div>
      </div>
      <ul className="slide-bullets" style={{ marginTop: '20px' }}>
        {slide.points.map((p) => <li key={p}>{p}</li>)}
      </ul>
    </div>
  )
}

function FastForwardSVG() {
  const y = 78

  return (
    <svg viewBox="0 0 464 158" style={{ width: '100%' }} aria-label="Fast-forward merge — before and after">
      {/* ── BEFORE panel ── */}
      <text x="100" y="13" textAnchor="middle" fill="var(--text-dim)" fontSize="10"
            fontFamily="sans-serif" letterSpacing="1" fontWeight="700">BEFORE</text>

      <line x1="30" y1={y} x2="170" y2={y} stroke="var(--border-2)" strokeWidth="2.5" />

      <circle cx="30"  cy={y} r="14" fill="var(--blue)" />
      <text x="30"  y={y+5} textAnchor="middle" fill="#0d1117" fontSize="12" fontWeight="bold" fontFamily="monospace">A</text>

      <circle cx="100" cy={y} r="14" fill="var(--blue)" />
      <text x="100" y={y+5} textAnchor="middle" fill="#0d1117" fontSize="12" fontWeight="bold" fontFamily="monospace">B</text>

      <circle cx="170" cy={y} r="14" fill="var(--green)" />
      <text x="170" y={y+5} textAnchor="middle" fill="#0d1117" fontSize="12" fontWeight="bold" fontFamily="monospace">C</text>

      {/* main → B (before) */}
      <rect x="73" y="22" width="54" height="20" rx="3" fill="var(--surface-2)" stroke="var(--blue)" strokeWidth="1.5" />
      <text x="100" y="36" textAnchor="middle" fill="var(--blue)" fontSize="10.5" fontFamily="sans-serif">main</text>
      <line x1="100" y1="42" x2="100" y2={y-14} stroke="var(--blue)" strokeWidth="1.5" strokeDasharray="4,3" />

      {/* feature → C (before) */}
      <rect x="137" y="104" width="66" height="20" rx="3" fill="var(--surface-2)" stroke="var(--green)" strokeWidth="1.5" />
      <text x="170" y="118" textAnchor="middle" fill="var(--green)" fontSize="10.5" fontFamily="sans-serif">feature</text>
      <line x1="170" y1="104" x2="170" y2={y+14} stroke="var(--green)" strokeWidth="1.5" strokeDasharray="4,3" />

      {/* ── fast-forward arrow ── */}
      <text x="222" y={y+3} textAnchor="middle" fill="var(--orange)" fontSize="9.5"
            fontFamily="sans-serif" letterSpacing="0.3">fast-forward</text>
      <line x1="192" y1={y+12} x2="244" y2={y+12} stroke="var(--orange)" strokeWidth="2" />
      <polygon points={`240,${y+7} 252,${y+12} 240,${y+17}`} fill="var(--orange)" />

      {/* ── AFTER panel ── */}
      <text x="364" y="13" textAnchor="middle" fill="var(--text-dim)" fontSize="10"
            fontFamily="sans-serif" letterSpacing="1" fontWeight="700">AFTER</text>

      <line x1="264" y1={y} x2="404" y2={y} stroke="var(--border-2)" strokeWidth="2.5" />

      <circle cx="264" cy={y} r="14" fill="var(--blue)" />
      <text x="264" y={y+5} textAnchor="middle" fill="#0d1117" fontSize="12" fontWeight="bold" fontFamily="monospace">A</text>

      <circle cx="334" cy={y} r="14" fill="var(--blue)" />
      <text x="334" y={y+5} textAnchor="middle" fill="#0d1117" fontSize="12" fontWeight="bold" fontFamily="monospace">B</text>

      <circle cx="404" cy={y} r="14" fill="var(--green)" />
      <text x="404" y={y+5} textAnchor="middle" fill="#0d1117" fontSize="12" fontWeight="bold" fontFamily="monospace">C</text>

      {/* main → C (after — both pointers now here) */}
      <rect x="377" y="22" width="54" height="20" rx="3" fill="var(--surface-2)" stroke="var(--blue)" strokeWidth="1.5" />
      <text x="404" y="36" textAnchor="middle" fill="var(--blue)" fontSize="10.5" fontFamily="sans-serif">main</text>
      <line x1="404" y1="42" x2="404" y2={y-14} stroke="var(--blue)" strokeWidth="1.5" strokeDasharray="4,3" />

      {/* feature → C (after) */}
      <rect x="371" y="104" width="66" height="20" rx="3" fill="var(--surface-2)" stroke="var(--green)" strokeWidth="1.5" />
      <text x="404" y="118" textAnchor="middle" fill="var(--green)" fontSize="10.5" fontFamily="sans-serif">feature</text>
      <line x1="404" y1="104" x2="404" y2={y+14} stroke="var(--green)" strokeWidth="1.5" strokeDasharray="4,3" />
    </svg>
  )
}

function DivergedSVG() {
  const mY = 68
  const fY = 150
  return (
    <svg viewBox="0 0 485 208" style={{ width: '100%' }} aria-label="Diverged merge diagram">
      {/* ── tracks ── */}

      {/* Main branch — straight horizontal */}
      <path
        d={`M 70 ${mY} H 420`}
        stroke="var(--blue)" strokeWidth="3" fill="none" strokeOpacity="0.55"
      />

      {/* Feature branch — diverges down, runs straight with TWO commits, curves back up */}
      <path
        d={`M 70 ${mY} C 108 ${mY}, 118 ${fY}, 156 ${fY} L 318 ${fY} C 356 ${fY}, 406 ${mY}, 420 ${mY}`}
        stroke="var(--green)" strokeWidth="3" fill="none" strokeOpacity="0.55"
      />

      {/* ── commit nodes ── */}

      {/* A — common base (on main track) */}
      <circle cx="70"  cy={mY}  r="16" fill="var(--blue)"   stroke="var(--surface)" strokeWidth="2" />
      <text x="70"  y={mY+5}  textAnchor="middle" fill="#0d1117" fontSize="12" fontWeight="bold" fontFamily="monospace">A</text>

      {/* D — main-only commit */}
      <circle cx="248" cy={mY}  r="16" fill="var(--blue)"   stroke="var(--surface)" strokeWidth="2" />
      <text x="248" y={mY+5}  textAnchor="middle" fill="#0d1117" fontSize="12" fontWeight="bold" fontFamily="monospace">D</text>

      {/* B — first feature commit */}
      <circle cx="200" cy={fY}  r="16" fill="var(--green)"  stroke="var(--surface)" strokeWidth="2" />
      <text x="200" y={fY+5}  textAnchor="middle" fill="#0d1117" fontSize="12" fontWeight="bold" fontFamily="monospace">B</text>

      {/* C — second feature commit (feature tip) */}
      <circle cx="308" cy={fY}  r="16" fill="var(--green)"  stroke="var(--surface)" strokeWidth="2" />
      <text x="308" y={fY+5}  textAnchor="middle" fill="#0d1117" fontSize="12" fontWeight="bold" fontFamily="monospace">C</text>

      {/* M — merge commit */}
      <circle cx="420" cy={mY}  r="16" fill="var(--purple)" stroke="var(--surface)" strokeWidth="2" />
      <text x="420" y={mY+5}  textAnchor="middle" fill="#0d1117" fontSize="12" fontWeight="bold" fontFamily="monospace">M</text>

      {/* ── labels ── */}

      {/* Common base — below A */}
      <line x1="70"  y1={mY+16} x2="70"  y2="186" stroke="var(--border-2)" strokeWidth="1" strokeDasharray="3,3" />
      <rect x="16"  y="186" width="108" height="18" rx="3" fill="var(--surface-2)" stroke="var(--border)"  strokeWidth="1" />
      <text x="70"  y="199" textAnchor="middle" fill="var(--text-muted)" fontSize="10.5" fontFamily="sans-serif">Common base</text>

      {/* Main tip — above D */}
      <line x1="248" y1={mY-16} x2="248" y2="14" stroke="var(--border-2)" strokeWidth="1" strokeDasharray="3,3" />
      <rect x="207" y="4"  width="82"  height="18" rx="3" fill="var(--surface-2)" stroke="var(--blue)"   strokeWidth="1" />
      <text x="248" y="17" textAnchor="middle" fill="var(--blue)"   fontSize="10.5" fontFamily="sans-serif">Main tip</text>

      {/* Feature tip — below C */}
      <line x1="308" y1={fY+16} x2="308" y2="186" stroke="var(--border-2)" strokeWidth="1" strokeDasharray="3,3" />
      <rect x="262" y="186" width="92"  height="18" rx="3" fill="var(--surface-2)" stroke="var(--green)"  strokeWidth="1" />
      <text x="308" y="199" textAnchor="middle" fill="var(--green)"  fontSize="10.5" fontFamily="sans-serif">Feature tip</text>

      {/* Merge commit — above M */}
      <line x1="420" y1={mY-16} x2="420" y2="14" stroke="var(--border-2)" strokeWidth="1" strokeDasharray="3,3" />
      <rect x="365" y="4"  width="110" height="18" rx="3" fill="var(--surface-2)" stroke="var(--purple)" strokeWidth="1" />
      <text x="420" y="17" textAnchor="middle" fill="var(--purple)" fontSize="10.5" fontFamily="sans-serif">Merge commit</text>
    </svg>
  )
}

function MergeDiagram({ slide }) {
  return (
    <div className="slide-body">
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>{slide.description}</p>
      <div className="merge-cases">
        {slide.cases.map((c) => (
          <div key={c.name} className="merge-case">
            <div className="merge-case-name">{c.name}</div>
            {c.type === 'ff'       ? <FastForwardSVG /> : <DivergedSVG />}
            <div className="merge-note">{c.note}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ConflictSlide({ slide }) {
  return (
    <div className="slide-body">
      <div style={{ color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.7 }}>
        {slide.cause}
      </div>
      <div className="conflict-markers">
        <div className="conflict-head">{slide.markers.head}</div>
        <div className="conflict-mine">{slide.markers.mine}</div>
        <div className="conflict-sep">{slide.markers.sep}</div>
        <div className="conflict-their">{slide.markers.their}</div>
        <div className="conflict-end">{slide.markers.end}</div>
      </div>
      <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '0.9rem' }}>
        → {slide.resolution}
      </p>
    </div>
  )
}

function RemoteSlide({ slide }) {
  return (
    <div className="slide-body">
      <div className="remote-diagram">
        <div className="remote-box local">
          <div className="remote-box-label">{slide.local.label}</div>
          <div className="remote-box-name">🖥️ {slide.local.name}</div>
        </div>
        <div className="remote-connector">
          ↔
          <span>internet</span>
        </div>
        <div className="remote-box github">
          <div className="remote-box-label">{slide.remote.label}</div>
          <div className="remote-box-name">☁️ {slide.remote.name}</div>
        </div>
      </div>
      <div className="remote-branches">
        {slide.names.map((n) => (
          <div key={n.branch} className="remote-branch-item">
            <span className={`branch-name-tag ${n.type}`}>{n.branch}</span>
            <span className="branch-desc">{n.desc}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SlideContent({ slide }) {
  if (slide.type === 'diagram-three-areas') return <ThreeAreasDiagram slide={slide} />
  if (slide.type === 'diagram-file-states') return <FileStatesDiagram slide={slide} />
  if (slide.type === 'diagram-branches') return <BranchDiagram slide={slide} />
  if (slide.type === 'diagram-merge') return <MergeDiagram slide={slide} />
  if (slide.type === 'conflict') return <ConflictSlide slide={slide} />
  if (slide.type === 'diagram-remote') return <RemoteSlide slide={slide} />

  return (
    <div className="slide-body">
      {/* Title slide bullets */}
      {slide.bullets && (
        <ul className="slide-bullets">
          {slide.bullets.map((b) => <li key={b}>{b}</li>)}
        </ul>
      )}

      {/* Story: timeline + question */}
      {slide.timeline && (
        <div className="slide-timeline">
          {slide.timeline.map((item) => (
            <div key={item.label} className={`timeline-item ${item.state}`}>
              <div className="timeline-day">{item.label}</div>
              <div className="timeline-text">{item.text}</div>
            </div>
          ))}
        </div>
      )}

      {/* Problem: list + bad examples */}
      {slide.intro && <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>{slide.intro}</p>}
      {slide.list && (
        <ul className="slide-bullets" style={{ marginBottom: '16px' }}>
          {slide.list.map((i) => <li key={i}>{i}</li>)}
        </ul>
      )}
      {slide.examples && (
        <div className="bad-examples">
          {slide.examples.map((e) => (
            <span key={e} className="bad-example-tag">{e}</span>
          ))}
        </div>
      )}

      {/* Needs list */}
      {slide.type === 'needs' && slide.items && (
        <div className="needs-list">
          {slide.items.map((item) => (
            <div key={item.text} className="need-item">
              <span className="need-icon">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Intro: description + quote */}
      {slide.description && (
        <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontSize: '1rem' }}>
          {slide.description}
        </p>
      )}
      {slide.quote && <blockquote className="slide-quote">"{slide.quote}"</blockquote>}

      {/* Definitions */}
      {slide.definitions && (
        <div className="definitions-grid">
          {slide.definitions.map((d) => (
            <div key={d.term} className="definition-box">
              <div className="definition-term">{d.term}</div>
              <ul className="definition-list">
                {d.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Lab prep */}
      {slide.questions && slide.type === 'labprep' && (
        <div className="labprep-box">
          <p className="labprep-intro">{slide.intro}</p>
          <div className="labprep-questions">
            {slide.questions.map((q) => (
              <div key={q} className="labprep-question">
                <span className="labprep-q-icon">💭</span>
                <span className="labprep-q-text">{q}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Commands table */}
      {slide.type === 'commands' && slide.commands && (
        <>
          <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>{slide.intro}</p>
          <div className="commands-table">
            {slide.commands.map((c) => (
              <div key={c.cmd} className="command-row">
                <span className="command-code">{c.cmd}</span>
                <span className="command-desc">{c.desc}</span>
              </div>
            ))}
          </div>
          {slide.keyIdea && (
            <div className="key-idea-box">
              <span>💡</span>
              <span>{slide.keyIdea}</span>
            </div>
          )}
        </>
      )}

      {/* Concept (HEAD) */}
      {slide.type === 'concept' && (
        <>
          <ul className="slide-bullets" style={{ marginBottom: '20px' }}>
            {slide.points.map((p) => <li key={p}>{p}</li>)}
          </ul>
          <div className="head-box">
            <div className="behavior-trigger">{slide.behavior.trigger}</div>
            <ul className="behavior-effects">
              {slide.behavior.effects.map((e) => <li key={e}>{e}</li>)}
            </ul>
          </div>
        </>
      )}

      {/* Undo table */}
      {slide.type === 'undo-table' && (
        <>
          <div className="undo-sections">
            <div className="undo-section safe">
              <h4>✅ Safer Operations</h4>
              {slide.safer.map((item) => (
                <div key={item.cmd} className="undo-item">
                  <code>{item.cmd}</code>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="undo-section danger">
              <h4>⚠️ More Dangerous</h4>
              {slide.dangerous.map((item) => (
                <div key={item.cmd} className="undo-item">
                  <code>{item.cmd}</code>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="key-idea-box">
            <span>⚠️</span>
            <span>{slide.keyPoint}</span>
          </div>
        </>
      )}

      {/* Encouragement */}
      {slide.type === 'encouragement' && (
        <>
          <div className="slide-quote">{slide.message}</div>
          <div style={{ marginTop: '16px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            📝 Note: {slide.note}
          </div>
        </>
      )}

      {/* Remote commands */}
      {slide.type === 'remote-commands' && (
        <>
          <div className="remote-cmd-list">
            {slide.commands.map((c) => (
              <div key={c.cmd} className="remote-cmd-item">
                <span className="remote-cmd-icon">{c.icon}</span>
                <span className="remote-cmd-code">{c.cmd}</span>
                <span className="remote-cmd-desc">{c.desc}</span>
              </div>
            ))}
          </div>
          <div className="important-box">⚠️ {slide.important}</div>
        </>
      )}

      {/* Summary — must check type to avoid leaking into other slides with .items */}
      {slide.type === 'summary' && (
        <div className="summary-list">
          {slide.items.map((item) => (
            <div key={item.term} className="summary-item">
              <span className="summary-term">{item.term}</span>
              <span className="summary-def">{item.def}</span>
            </div>
          ))}
        </div>
      )}

      {/* Closing */}
      {slide.type === 'closing' && (
        <>
          <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>{slide.instruction}</p>
          {slide.questions.map((q, i) => (
            <div key={q} className="closing-question">
              <span className="closing-q-num">{i + 1}.</span>
              <span className="closing-q-text">{q}</span>
            </div>
          ))}
        </>
      )}

      {/* Shared: question callout */}
      {slide.question && (
        <div className="slide-question">
          <span className="slide-question-icon">🤔</span>
          <span className="slide-question-text">{slide.question}</span>
        </div>
      )}
    </div>
  )
}

// ─── Main Slides component ─────────────────────────

export default function Slides() {
  const [current, setCurrent] = useState(0)

  const prev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), [])
  const next = useCallback(() => setCurrent((c) => Math.min(slides.length - 1, c + 1)), [])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next()
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const slide = slides[current]
  const progress = ((current + 1) / slides.length) * 100

  return (
    <div className="slides-view">
      {/* Sidebar */}
      <aside className="slides-sidebar">
        <div className="slides-sidebar-title">All Slides</div>
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`slide-nav-item ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
          >
            <span className="slide-nav-number">{s.id}</span>
            <span className="slide-nav-label">{s.title}</span>
          </div>
        ))}
      </aside>

      {/* Main area */}
      <div className="slides-main">
        <div className="slides-progress-bar">
          <div className="slides-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="slides-content-area">
          <div className="slide-card" key={slide.id}>
            <span className="slide-badge">{slide.badge}</span>
            <h1 className="slide-title">{slide.title}</h1>
            {slide.subtitle && (
              <p className="slide-subtitle-text">{slide.subtitle}</p>
            )}
            <SlideContent slide={slide} />
          </div>
        </div>

        <div className="slides-bottom-nav">
          <button
            className="slide-nav-button"
            onClick={prev}
            disabled={current === 0}
          >
            ← Prev
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <span className="slide-counter">{current + 1} / {slides.length}</span>
            <span className="keyboard-hint">Use ← → arrow keys</span>
          </div>

          <button
            className="slide-nav-button"
            onClick={next}
            disabled={current === slides.length - 1}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
