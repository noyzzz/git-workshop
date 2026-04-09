import { useState, useRef } from 'react'
import Slides from './components/Slides'
import Labs from './components/Labs'
import { slides as session1Slides } from './data/slides'
import { labs as session1Labs } from './data/labs'
import { session2Slides } from './data/session2Slides'
import { session2Labs } from './data/session2Labs'

const VIEWS = { HOME: 'home', SLIDES: 'slides', LABS: 'labs' }
const SESSIONS = {
  session1: {
    id: 'session1',
    label: 'Session 1',
    heroBadge: 'Session 1',
    titlePrefix: 'Learn ',
    accent: 'Git',
    titleSuffix: ' from scratch',
    subtitle: 'Understanding Git deeply — not just memorizing commands. Local Git first, GitHub at the end.',
    slides: session1Slides,
    labs: session1Labs,
    storageKey: 'git-workshop-progress-session1',
    labCards: [
      { emoji: '🌱', title: 'First Repository', desc: 'init, add, commit — your first Git history' },
      { emoji: '🔍', title: 'Inspect Changes', desc: 'diff, staged diff — see exactly what changed' },
      { emoji: '🌿', title: 'Branching', desc: 'switch, branch — isolate your work safely' },
      { emoji: '🔀', title: 'Merge & Conflicts', desc: 'merge, resolve — combine branches together' },
      { emoji: '↩️', title: 'Undoing Things', desc: 'restore, reset — fix mistakes with confidence' },
      { emoji: '🌐', title: 'GitHub & Remotes', desc: 'push, pull, fetch — connect to the world' },
    ],
  },
  session2: {
    id: 'session2',
    label: 'Session 2',
    heroBadge: 'Session 2',
    titlePrefix: 'Collaborate ',
    accent: 'safely',
    titleSuffix: ' with Git',
    subtitle: 'Create a shared repo, sync with a partner, use pull requests, resolve conflicts, and practice real team workflow.',
    slides: session2Slides,
    labs: session2Labs,
    storageKey: 'git-workshop-progress-session2',
    labCards: [
      { emoji: '🚀', title: 'Create & Publish', desc: 'init, origin, first push — make the repo shared' },
      { emoji: '🌐', title: 'Remote Basics', desc: 'push, fetch, pull — sync without surprises' },
      { emoji: '🌿', title: 'Branches & PRs', desc: 'feature branches and review before merge' },
      { emoji: '⚔️', title: 'Conflict Round 1', desc: 'rejected push, pull, and a real conflict' },
      { emoji: '🧩', title: 'Conflict Round 2', desc: 'reverse roles so both students resolve one' },
      { emoji: '🕰️', title: 'History & Stash', desc: 'inspect commits and handle interruptions safely' },
      { emoji: '✅', title: 'Bonus CI', desc: 'GitHub Actions as an extra safety layer' },
    ],
  },
}

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

function Hero({ onNavigate, session, activeSession, onSessionChange }) {
  return (
    <main className="hero">
      <div className="session-switcher">
        {Object.values(SESSIONS).map((option) => (
          <button
            key={option.id}
            className={`session-pill ${activeSession === option.id ? 'active' : ''}`}
            onClick={() => onSessionChange(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="hero-badge">⚡ {session.heroBadge}</div>
      <h1 className="hero-title">
        {session.titlePrefix}
        <span>{session.accent}</span>
        {session.titleSuffix}
      </h1>
      <p className="hero-subtitle">
        {session.subtitle}
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
          {session.labCards.map((card, i) => (
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
  const [activeSession, setActiveSession] = useState('session1')
  const [view, setView] = useState(VIEWS.HOME)
  const [currentSlideBySession, setCurrentSlideBySession] = useState({ session1: 0, session2: 0 })
  const [activeLabBySession, setActiveLabBySession] = useState({ session1: 0, session2: 0 })
  const labScrollPositions = useRef({})
  const session = SESSIONS[activeSession]

  function setCurrentSlide(next) {
    setCurrentSlideBySession((prev) => ({
      ...prev,
      [activeSession]: typeof next === 'function' ? next(prev[activeSession]) : next,
    }))
  }

  function setActiveLab(next) {
    setActiveLabBySession((prev) => ({
      ...prev,
      [activeSession]: typeof next === 'function' ? next(prev[activeSession]) : next,
    }))
  }

  function navigateTo(nextView, labIndex) {
    if (labIndex !== undefined) {
      setActiveLabBySession((prev) => ({ ...prev, [activeSession]: labIndex }))
    }
    setView(nextView)
  }

  function handleSessionChange(nextSession) {
    setActiveSession(nextSession)
    setView(VIEWS.HOME)
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
      {view === VIEWS.HOME   && (
        <Hero
          onNavigate={navigateTo}
          session={session}
          activeSession={activeSession}
          onSessionChange={handleSessionChange}
        />
      )}
      {view === VIEWS.SLIDES && (
        <Slides
          slides={session.slides}
          currentSlide={currentSlideBySession[activeSession]}
          setCurrentSlide={setCurrentSlide}
          sessionLabel={session.label}
        />
      )}
      {view === VIEWS.LABS   && (
        <Labs
          labs={session.labs}
          activeLab={activeLabBySession[activeSession]}
          setActiveLab={setActiveLab}
          scrollPositions={labScrollPositions}
          storageKey={session.storageKey}
          sessionLabel={session.label}
        />
      )}
    </>
  )
}
