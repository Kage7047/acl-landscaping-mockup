import { Link, useLocation } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { useMeta } from '../lib/useMeta'
import { SITE } from '../data'

export function ThankYou() {
  const { state } = useLocation()
  useMeta('Thank you')
  return (
    <>
      <PageHero eyebrow="Message ready" title={state?.name ? `Thank you, ${state.name}.` : 'Thank you!'} lead={['Your email app should have opened with your message ready to send. Hit send and we’ll be in touch within one business day.']} image="new-img-4983" compact />
      <section className="sec sec--paper">
        <div className="container narrow">
          <div className="prose prose--one">
            <p>
              Didn&rsquo;t see your email app open? No problem. You can reach us directly at <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call{' '}
              <a href={SITE.phoneHref}>{SITE.phone}</a>.
            </p>
            <p className="center">
              <Link className="btn btn--primary" to="/">
                Back to the homepage
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export function NotFound() {
  useMeta('Page not found')
  return (
    <>
      <PageHero eyebrow="404" title="This page wandered off." lead={['We couldn’t find what you were looking for. Let’s get you back to the garden.']} image="new-img-3013" compact />
      <section className="sec sec--paper">
        <div className="container narrow center">
          <p className="prose prose--one">
            <Link className="btn btn--primary" to="/">
              Go home
            </Link>{' '}
            <Link className="btn btn--outline" to="/project-gallery">
              Browse projects
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
