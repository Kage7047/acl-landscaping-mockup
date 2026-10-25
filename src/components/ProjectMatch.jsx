import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TIMELINES } from '../lib/nav'

/** "Find your project match" mini quiz. Ends in a pre-filled contact form. */
export default function ProjectMatch({ service, serviceLabel }) {
  const [pick, setPick] = useState(null)
  const t = TIMELINES.find((x) => x.id === pick)
  const to = t ? `/contact?service=${encodeURIComponent(service)}&timeline=${encodeURIComponent(t.value)}` : '/contact'
  return (
    <section className="match" aria-labelledby="match-title">
      <div className="container match__inner" data-reveal>
        <div className="match__head">
          <p className="eyebrow">
            <span className="dot" /> Find your project match
          </p>
          <h2 id="match-title" className="match__title">
            {pick ? 'Great, here’s your next step.' : 'When are you looking to start?'}
          </h2>
          <p className="match__sub">{serviceLabel}</p>
        </div>
        {!pick ? (
          <ul className="match__opts">
            {TIMELINES.map((o) => (
              <li key={o.id}>
                <button type="button" onClick={() => setPick(o.id)}>
                  <strong>{o.label}</strong>
                  <span>{o.note}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="match__done" role="status">
            <p>
              You picked <strong>{t.label}</strong> for {serviceLabel.toLowerCase()}. We&rsquo;ll pre-fill your request so you only need to add your details.
            </p>
            <div className="match__btns">
              <Link className="btn btn--primary" to={to}>
                Book my free consultation
              </Link>
              <button type="button" className="btn btn--ghost" onClick={() => setPick(null)}>
                Change answer
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
