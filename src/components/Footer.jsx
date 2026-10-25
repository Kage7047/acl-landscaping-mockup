import { Link } from 'react-router-dom'
import { logoSrc, SITE } from '../data'
import { SERVICE_PAGES } from '../lib/nav'
import { setMotion, useReducedMotionState } from '../lib/motion'

const QUICK = [
  ['Home', '/'],
  ['Gallery', '/project-gallery'],
  ['About us', '/about'],
  ['Blog', '/blog'],
  ['Contact', '/contact'],
  ['Join our team', '/join-the-team'],
]

export default function Footer() {
  const reduced = useReducedMotionState()
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
        <nav aria-label="Quick links">
          <h2 className="foot__h">Quick links</h2>
          <ul>
            {QUICK.map(([l, to]) => (
              <li key={to}>
                <Link to={to}>{l}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Our services">
          <h2 className="foot__h">Our services</h2>
          <ul>
            {SERVICE_PAGES.map((s) => (
              <li key={s.slug}>
                <Link to={`/${s.slug}`}>{s.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="foot__h">Contact us</h2>
          <ul>
            <li>
              <a href={SITE.phoneHref}>{SITE.phone}</a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              {SITE.address}
              <br />
              <small>By appointment only</small>
            </li>
            <li>First consultation is free</li>
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
