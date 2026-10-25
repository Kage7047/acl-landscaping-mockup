import { Link } from 'react-router-dom'
import ContentPage from './ContentPage'
import ConsultForm from '../components/ConsultForm'
import pages from '../content/pages.json'

const BENEFITS = [
  ['Meaningful work', 0],
  ['Grow with us', 1],
  ['Great culture', 2],
]

export function Join() {
  const d = pages['join-the-team']
  const [intro, ...b] = d.lead
  const data = { ...d, lead: [intro] }
  return (
    <ContentPage
      slug="join-the-team"
      data={data}
      eyebrow="Careers"
      heroImage="new-img-4849"
      crumbs={[['Home', '/'], ['Join the team']]}
      extra={
        <section className="sec sec--dark" aria-label="Why join us">
          <div className="container">
            <ul className="benefits">
              {BENEFITS.map(([t, i]) => (
                <li key={t} data-reveal data-delay={i * 0.08}>
                  <h3>{t}</h3>
                  <p dangerouslySetInnerHTML={{ __html: b[i] || '' }} />
                </li>
              ))}
            </ul>
            <p className="center" data-reveal>
              <Link className="btn btn--primary" to="/application">
                Apply now
              </Link>
            </p>
          </div>
        </section>
      }
    />
  )
}

export function Apply() {
  const d = pages.application
  return (
    <ContentPage
      slug="application"
      data={{ ...d, sections: [], lead: d.lead.slice(0, 2) }}
      eyebrow="Careers"
      heroImage="new-img-4849"
      crumbs={[['Home', '/'], ['Join the team', '/join-the-team'], ['Apply']]}
      extra={
        <section className="sec sec--paper" aria-labelledby="app-title">
          <div className="container narrow">
            <h2 id="app-title" className="sec__title" data-reveal>
              Application form
            </h2>
            <p className="prose prose--one" data-reveal>
              Fields marked * are required. We read every application and reach out to the people who look like a good fit.
            </p>
            <div className="apply" data-reveal>
              <ConsultForm kind="apply" title="" />
            </div>
          </div>
        </section>
      }
    />
  )
}
