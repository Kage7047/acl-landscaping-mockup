import { logoSrc, SITE } from '../data'
import { scrollToTarget } from '../lib/smooth'
import { setMotion, useReducedMotionState } from '../lib/motion'

const cols = [
  {
    h: 'Explore',
    links: [
      ['Our story', '#story'],
      ['Services', '#services'],
      ['Process', '#process'],
      ['Recent work', '#work'],
      ['Reviews', '#reviews'],
    ],
  },
  {
    h: 'Services',
    links: [
      ['Landscape design', '#services'],
      ['Hardscaping & patios', '#services'],
      ['Steel & gabions', '#services'],
      ['Custom planters', '#services'],
      ['Artificial turf', '#services'],
      ['Lighting & drainage', '#services'],
    ],
  },
]

export default function Footer() {
  const reduced = useReducedMotionState()
  const go = (e, h) => (e.preventDefault(), scrollToTarget(h, -20))
  return (
    <footer className="foot">
      <div className="container foot__grid">
        <div className="foot__brand">
          <img src={logoSrc} alt="Austin Creative Landscaping" width="190" height="53" />
          <p>Design/build residential landscaping in South Austin since 2008. Born in Austin. Built for Texas.</p>
          <p className="foot__social">
            <a href={SITE.facebook} rel="noopener noreferrer" target="_blank">
              Facebook<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href={SITE.instagram} rel="noopener noreferrer" target="_blank">
              Instagram<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
        {cols.map((c) => (
          <nav key={c.h} aria-label={c.h}>
            <h2 className="foot__h">{c.h}</h2>
            <ul>
              {c.links.map(([l, h]) => (
                <li key={l}>
                  <a href={h} onClick={(e) => go(e, h)}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div>
          <h2 className="foot__h">Contact</h2>
          <ul>
            <li>
              <a href={SITE.phoneHref}>{SITE.phone}</a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>{SITE.address}</li>
          </ul>
        </div>
      </div>
      <div className="foot__word" aria-hidden="true">
        Austin Creative
      </div>
      <div className="container foot__base">
        <p>&copy; 2026 Austin Creative Landscaping. All rights reserved.</p>
        <button type="button" className="motion-toggle" aria-pressed={!reduced} onClick={() => setMotion(reduced)}>
          <i aria-hidden="true" />
          Animations {reduced ? 'off' : 'on'}
        </button>
        <p>
          Concept homepage by <strong>Ilya Nesterenok</strong>. A design preview, not the live website.
        </p>
      </div>
    </footer>
  )
}
