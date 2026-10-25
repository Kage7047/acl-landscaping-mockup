import { Link } from 'react-router-dom'
import ContentPage from './ContentPage'
import { PostCard } from '../components/Cards'
import { SERVICE_PAGES } from '../lib/nav'
import pages from '../content/pages.json'
import posts from '../content/blog.json'

export function About() {
  return <ContentPage slug="about" data={pages.about} eyebrow="Since 2008" heroImage="new-home-page2" crumbs={[['Home', '/'], ['About']]} />
}
export function ServicePage({ slug }) {
  const svc = SERVICE_PAGES.find((s) => s.slug === slug)
  return <ContentPage slug={slug} data={pages[slug]} eyebrow="Our services" heroImage={svc.hero} crumbs={[['Home', '/'], ['Services', '/our-services'], [svc.label]]} />
}
export function Author({ who }) {
  const d = pages[`author/${who}`]
  const mine = who === 'abey-bruce' ? posts : []
  return (
    <ContentPage
      slug={`author-${who}`}
      data={d}
      eyebrow="Author"
      heroImage="new-img-3900"
      crumbs={[['Home', '/'], ['Blog', '/blog'], [d.title]]}
      extra={
        mine.length > 0 && (
          <section className="sec sec--paper" aria-labelledby="by-author">
            <div className="container">
              <header className="sec__head" data-reveal>
                <h2 id="by-author" className="sec__title">
                  Articles by {d.title}
                </h2>
                <Link className="link link--dark" to="/blog">
                  Browse the blog
                </Link>
              </header>
              <div className="pgrid">
                {mine.slice(0, 6).map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            </div>
          </section>
        )
      }
    />
  )
}
