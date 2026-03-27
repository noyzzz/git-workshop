import { useState, useRef } from 'react'
import Slides from './components/Slides'
import Labs from './components/Labs'

const VIEWS = { HOME: 'home', SLIDES: 'slides', LABS: 'labs' }

function GitFlowDiagram() {
  return (
    <div className="git-flow">
      <div className="git-area blue">
        <div className="git-area-name">Working Directory</div>
        <div className="git-area-desc">Your files right now</div>
      </div>
      <div className="git-arrow">
        <div className="git-arrow-label">git add</div>
        <div className="git-arrow-icon">→</div>
      </div>
      <div className="git-area yellow">
        <div className="git-area-name">Staging Area</div>
        <div className="git-area-desc">Your next snapshot</div>
      </div>
      <div className="git-arrow">
        <div className="git-arrow-label">git commit</div>
        <div className="git-arrow-icon">→</div>
      </div>
      <div className="git-area green">
        <div className="git-area-name">Repository</div>
        <div className="git-area-desc">Saved history</div>
      </div>
    </div>
  )
}

function Hero({ onNavigate }) {
  const labCards = [
    { emoji: '🌱', title: 'First Repository', desc: 'init, add, commit — your first Git history' },
    { emoji: '🔍', title: 'Inspect Changes', desc: 'diff, staged diff — see exactly what changed' },
    { emoji: '🌿', title: 'Branching', desc: 'switch, branch — isolate your work safely' },
    { emoji: '🔀', title: 'Merge & Conflicts', desc: 'merge, resolve — combine branches together' },
    { emoji: '↩️', title: 'Undoing Things', desc: 'restore, reset — fix mistakes with confidence' },
    { emoji: '🌐', title: 'GitHub & Remotes', desc: 'push, pull, fetch — connect to the world' },
  ]

  return (
    <main className="hero">
      <div className="hero-badge">⚡ Session 1</div>
      <h1 className="hero-title">
        Learn <span>Git</span> from scratch
      </h1>
      <p className="hero-subtitle">
        Understanding Git deeply — not just memorizing commands. Local Git first, GitHub at the end.
      </p>

      <div className="hero-ctas">
        <button className="btn-primary" onClick={() => onNavigate(VIEWS.SLIDES)}>
          📽️ View Slides
        </button>
        <button className="btn-secondary" onClick={() => onNavigate(VIEWS.LABS)}>
          🧪 Start Labs
        </button>
      </div>

      <GitFlowDiagram />

      <div className="hero-learn">
        <h2>What you'll build today</h2>
        <div className="learn-grid">
          {labCards.map((card, i) => (
            <div
              key={i}
              className="learn-card"
              onClick={() => onNavigate(VIEWS.LABS, i)}
            >
              <div className="learn-card-emoji">{card.emoji}</div>
              <div className="learn-card-content">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default function App() {
  const [view, setView] = useState(VIEWS.HOME)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeLab, setActiveLab] = useState(0)
  const labScrollPositions = useRef({})

  function navigateTo(nextView, labIndex) {
    if (labIndex !== undefined) setActiveLab(labIndex)
    setView(nextView)
  }

  return (
    <>
      <header className="header">
        <div className="header-logo" onClick={() => setView(VIEWS.HOME)}>
          <div className="logo-icon">⎇</div>
          Git Workshop
        </div>
        <nav className="header-nav">
          <button
            className={`nav-btn ${view === VIEWS.HOME ? 'active' : ''}`}
            onClick={() => setView(VIEWS.HOME)}
          >
            Home
          </button>
          <button
            className={`nav-btn ${view === VIEWS.SLIDES ? 'active' : ''}`}
            onClick={() => setView(VIEWS.SLIDES)}
          >
            📽️ Slides
          </button>
          <button
            className={`nav-btn ${view === VIEWS.LABS ? 'active' : ''}`}
            onClick={() => setView(VIEWS.LABS)}
          >
            🧪 Labs
          </button>
        </nav>
      </header>

      {view === VIEWS.HOME   && <Hero onNavigate={navigateTo} />}
      {view === VIEWS.SLIDES && <Slides currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />}
      {view === VIEWS.LABS   && <Labs activeLab={activeLab} setActiveLab={setActiveLab} scrollPositions={labScrollPositions} />}
    </>
  )
}
