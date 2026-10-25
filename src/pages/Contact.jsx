import PageHero from '../components/PageHero'
import ConsultForm from '../components/ConsultForm'
import { useReveal } from '../components/useReveal'
import { useMeta } from '../lib/useMeta'
import { AREAS, SITE } from '../data'

export default function Contact() {
  const root = useReveal()
  useMeta('Contact', 'Book your free 30-minute landscaping consultation with Austin Creative Landscaping in South Austin.')
  return (
    <div ref={root}>
      <PageHero
        eyebrow="Free consultation"
        title="Let’s walk your land."
        lead={['Your first 30-minute consultation is on us. Tell us about your space and we’ll be in touch within one business day.']}
        image="new-img-4983"
        crumbs={[['Home', '/'], ['Contact']]}
        compact
      />
      <section className="sec sec--paper">
        <div className="container cpage">
          <div className="cpage__form" data-reveal>
            <ConsultForm />
          </div>
          <aside className="cpage__info" data-reveal data-delay="0.1" aria-label="Contact details">
            <ul className="finfo">
              <li>
                <span className="fact__k">Call</span>
                <a href={SITE.phoneHref}>{SITE.phone}</a>
              </li>
              <li>
                <span className="fact__k">Email</span>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <span className="fact__k">Studio</span>
                <span>
                  {SITE.address}
                  <small>By appointment only</small>
                </span>
              </li>
              <li>
                <span className="fact__k">Hours</span>
                <span>
                  Mon&ndash;Fri 8am&ndash;6pm
                  <small>Sat 9am&ndash;3pm</small>
                </span>
              </li>
            </ul>
            <div className="areas areas--dark">
              <p className="fact__k">Where we build</p>
              <ul>
                {AREAS.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
              <p className="areas__note">Based in South Austin, serving northern Hays County and southern Travis County. Outside our area? Ask us.</p>
            </div>
            <ol className="next">
              <li>
                <strong>We call or email</strong> within one business day.
              </li>
              <li>
                <strong>We walk your land</strong> together, a 30 to 45 minute conversation about how you live.
              </li>
              <li>
                <strong>You decide.</strong> No obligation to move forward.
              </li>
            </ol>
          </aside>
        </div>
      </section>
    </div>
  )
}
