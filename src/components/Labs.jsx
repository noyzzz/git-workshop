import { useState, useEffect, useRef } from 'react'
import { labs } from '../data/labs'

// ─── Copy button ──────────────────────────────────────

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  return (
    <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy}>
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  )
}

// ─── Terminal block ───────────────────────────────────

function Terminal({ code, label = 'terminal' }) {
  const lines = code.split('\n')
  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-dots">
          <div className="terminal-dot red" />
          <div className="terminal-dot yellow" />
          <div className="terminal-dot green" />
        </div>
        <span className="terminal-label">{label}</span>
        <CopyButton text={code} />
      </div>
      <div className="terminal-body">
        {lines.map((line, i) => (
          <div key={i}>
            <span className="prompt">$ </span>
            <span className="cmd">{line}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── File creation block ──────────────────────────────

function FileBlock({ filename, content }) {
  return (
    <div className="file-create-block">
      <div className="file-create-header">
        <div className="file-create-label">
          <span className="file-icon">📄</span>
          Create file
          <span className="file-name">{filename}</span>
        </div>
        <CopyButton text={content} />
      </div>
      <div className="file-create-body">{content}</div>
    </div>
  )
}

// ─── Conflict example block ───────────────────────────

function ConflictExample({ head, theirs }) {
  return (
    <div className="conflict-markers">
      <div className="conflict-head">{'<<<<<<< HEAD'}</div>
      <div className="conflict-mine">{head}</div>
      <div className="conflict-sep">{'======='}</div>
      <div className="conflict-their">{theirs}</div>
      <div className="conflict-end">{'>>>>>>> feature/footer'}</div>
    </div>
  )
}

// ─── Legacy callout ───────────────────────────────────

function LegacyCallout({ content }) {
  const parts = content.split('\n\n')
  return (
    <div className="callout legacy">
      <span className="callout-icon">⚗️</span>
      <div className="callout-body">
        <h4>Legacy: git checkout</h4>
        {parts.map((part, i) => {
          if (part.startsWith('`')) {
            const cmd = part.replace(/`/g, '')
            return <Terminal key={i} code={cmd} label="legacy alternative" />
          }
          return <p key={i}>{part.replace(/`([^`]+)`/g, (_, m) => m)}</p>
        })}
      </div>
    </div>
  )
}

// ─── Single step ─────────────────────────────────────

function Step({ step, index, completed, onToggle }) {
  return (
    <div className={`lab-step ${completed ? 'completed' : ''}`}>
      <div className="step-header" onClick={onToggle}>
        <div
          className={`step-checkbox ${completed ? 'checked' : ''}`}
          role="checkbox"
          aria-checked={completed}
        >
          {completed ? '✓' : ''}
        </div>
        <span className="step-number">Step {index + 1}</span>
        <span className="step-title">{step.title}</span>
      </div>

      <div className="step-body">
        {step.note && (
          <div className="callout info">
            <span className="callout-icon">ℹ️</span>
            <div className="callout-body">
              <p>{step.note}</p>
            </div>
          </div>
        )}

        {step.type === 'bash' && <Terminal code={step.code} />}

        {step.type === 'create-file' && (
          <FileBlock filename={step.filename} content={step.content} />
        )}

        {step.type === 'text' && (
          <div className="callout info">
            <span className="callout-icon">📋</span>
            <div className="callout-body">
              {step.content.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        )}

        {step.type === 'conflict-example' && (
          <>
            <p className="step-instruction">
              Open <span className="inline-code">app.py</span>. You will see conflict markers like this:
            </p>
            <ConflictExample head={step.head} theirs={step.theirs} />
          </>
        )}

        {step.observe && (
          <div className="observe-list">
            <div className="observe-label">👀 Look for</div>
            {step.observe.map((o) => (
              <div key={o} className="observe-item">{o}</div>
            ))}
          </div>
        )}

        {step.extras && step.extras.map((extra) => (
          <LegacyCallout key={extra.title} content={extra.content} />
        ))}
      </div>
    </div>
  )
}

// ─── Single lab section ───────────────────────────────

function LabSection({ lab, completedSteps, onToggle }) {
  const allStepIds = lab.parts.flatMap((p) => p.steps.map((s) => s.id))
  const doneCount = allStepIds.filter((id) => completedSteps[id]).length

  return (
    <div className="lab-section">
      <div className="lab-section-header">
        <div className="lab-number-badge">Lab {lab.id} of {labs.length}</div>
        <h2 className="lab-title">
          <span className="lab-title-emoji">{lab.emoji}</span>
          {lab.title}
        </h2>
        <p className="lab-goal">{lab.goal}</p>
        <div className="lab-learning-box">
          <div className="lab-learning-title">What you are learning</div>
          <ul className="lab-learning-list">
            {lab.learning.map((l) => <li key={l}>{l}</li>)}
          </ul>
        </div>
      </div>

      {lab.parts.map((part, pi) => (
        <div key={pi}>
          {part.title && (
            <div className="lab-part-heading">{part.title}</div>
          )}
          <div className="lab-steps">
            {part.steps.map((step, si) => {
              const globalIndex = lab.parts
                .slice(0, pi)
                .reduce((acc, p) => acc + p.steps.length, 0) + si
              return (
                <Step
                  key={step.id}
                  step={step}
                  index={globalIndex}
                  completed={!!completedSteps[step.id]}
                  onToggle={() => onToggle(step.id)}
                />
              )
            })}
          </div>
        </div>
      ))}

      <div className="checkpoint-box">
        <div className="checkpoint-title">
          <span>✅</span> Checkpoint
        </div>
        <p className="checkpoint-desc">{lab.checkpoint.description}</p>
        <ul className="checkpoint-items">
          {lab.checkpoint.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <div className="checkpoint-verify">$ {lab.checkpoint.verify}</div>
      </div>

      <div className="reflection-box">
        <div className="reflection-title">
          <span>💭</span> Reflection questions
        </div>
        <div className="reflection-list">
          {lab.reflection.map((q, i) => (
            <div key={i} className="reflection-item">
              <span className="reflection-q">Q{i + 1}.</span>
              <span>{q}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Main Labs component ──────────────────────────────

const STORAGE_KEY = 'git-workshop-progress'

export default function Labs({ initialLab = 0 }) {
  const [activelab, setActiveLab] = useState(initialLab)
  const [completedSteps, setCompletedSteps] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    } catch {
      return {}
    }
  })
  const contentRef = useRef(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedSteps))
  }, [completedSteps])

  function toggleStep(stepId) {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepId]: !prev[stepId],
    }))
  }

  function handleNavClick(index) {
    setActiveLab(index)
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function getLabProgress(lab) {
    const allIds = lab.parts.flatMap((p) => p.steps.map((s) => s.id))
    const done = allIds.filter((id) => completedSteps[id]).length
    return { done, total: allIds.length }
  }

  return (
    <div className="labs-view">
      {/* Sidebar */}
      <aside className="labs-sidebar">
        <div className="labs-sidebar-title">Lab Sections</div>
        {labs.map((lab, i) => {
          const { done, total } = getLabProgress(lab)
          const isComplete = done === total
          return (
            <div
              key={lab.id}
              className={`lab-nav-item ${i === activelab ? 'active' : ''}`}
              onClick={() => handleNavClick(i)}
            >
              <span className="lab-nav-emoji">{lab.emoji}</span>
              <div className="lab-nav-info">
                <div className="lab-nav-title">{lab.title}</div>
                <div className="lab-nav-progress">
                  {done}/{total} steps
                </div>
              </div>
              <div className={`lab-progress-dot ${isComplete ? 'complete' : ''}`}
                style={isComplete ? { background: 'var(--green)' } : {}} />
            </div>
          )
        })}

        <div style={{ padding: '16px', borderTop: '1px solid var(--border)', marginTop: '8px' }}>
          <button
            style={{
              width: '100%', padding: '8px', background: 'var(--surface-2)',
              border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
              color: 'var(--text-dim)', fontSize: '0.78rem', cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
            }}
            onClick={() => {
              if (confirm('Reset all progress?')) {
                setCompletedSteps({})
              }
            }}
          >
            Reset progress
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="labs-content" ref={contentRef}>
        <LabSection
          key={activelab}
          lab={labs[activelab]}
          completedSteps={completedSteps}
          onToggle={toggleStep}
        />

        {/* Bottom navigation between labs */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          padding: '24px 0 8px', borderTop: '1px solid var(--border)', marginTop: '8px'
        }}>
          <button
            className="slide-nav-button"
            onClick={() => handleNavClick(activelab - 1)}
            disabled={activelab === 0}
          >
            ← Prev Lab
          </button>
          <button
            className="slide-nav-button"
            onClick={() => handleNavClick(activelab + 1)}
            disabled={activelab === labs.length - 1}
          >
            Next Lab →
          </button>
        </div>
      </div>
    </div>
  )
}
