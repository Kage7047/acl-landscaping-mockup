import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import CtaBand from '../components/CtaBand'
import { Pic } from '../lib/pic'
import { SERVICE_PAGES } from '../lib/nav'
import { useReveal } from '../components/useReveal'
import { useMeta } from '../lib/useMeta'
import { STEPS } from '../data'

export default function ServicesIndex() {
  const root = useReveal()
  useMeta('Our services', 'Landscape design, hardscaping, artificial turf, steel and gabions, custom planters, lighting, drainage and pool scaping in South Austin.')
  return (
    <div ref={root}>
      <PageHero
        eyebrow="What we do"
        title="Austin landscaping services, end to end."
        lead={['From the first sketch to the last plant in the ground, one team handles every part of your outdoor build. Residential and commercial, across South Austin and the Hill Country.']}
        image="new-home-page2"
        crumbs={[['Home', '/'], ['Services']]}
      />
      <section className="sec sec--paper">
        <div className="container">
          <ul className="svcgrid">
            {SERVICE_PAGES.map((s, i) => (
              <li key={s.slug} className="svccard" data-reveal data-delay={(i % 2) * 0.08}>
                <Link to={`/${s.slug}`} className="svccard__link">
                  <div className="svccard__media">
                    <Pic s={s.hero} alt="" sizes="(min-width: 960px) 40vw, 100vw" />
                    <span className="svccard__no" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="svccard__body">
                    <h2>{s.label}</h2>
                    <p>{s.short}</p>
                    <span className="prcard__go">
                      Explore {s.label.toLowerCase()}
                      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="sec sec--cream">
        <div className="container">
          <header className="sec__head" data-reveal>
            <h2 className="sec__title">From first sketch to final plant.</h2>
          </header>
          <ol className="tl">
            {STEPS.map((s) => (
              <li key={s.n} data-reveal>
                <span aria-hidden="true">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <CtaBand />
    </div>
  )
}
