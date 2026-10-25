import { useState } from 'react'
import { Pic } from '../lib/pic'

/** Drag/keyboard compare slider. */
export default function BeforeAfter({ before, after, label = 'Before and after' }) {
  const [pos, setPos] = useState(50)
  return (
    <div className="ba" style={{ '--pos': `${pos}%` }}>
      <Pic s={after} alt="After" sizes="(min-width: 960px) 70vw, 100vw" className="ba__img" />
      <div className="ba__before" aria-hidden="true">
        <Pic s={before} alt="" sizes="(min-width: 960px) 70vw, 100vw" className="ba__img" />
      </div>
      <span className="ba__tag ba__tag--b">Before</span>
      <span className="ba__tag ba__tag--a">After</span>
      <span className="ba__handle" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <input
        className="ba__range"
        type="range"
        min="0"
        max="100"
        step="1"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`${label}: drag to compare`}
      />
    </div>
  )
}
