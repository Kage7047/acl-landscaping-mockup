import { Link } from 'react-router-dom'
import ContentPage from './ContentPage'
import { PostRow } from '../components/Cards'
import { SERVICE_PAGES } from '../lib/nav'
import pages from '../content/pages.json'
import posts from '../content/blog.json'

const STRIP = [
  ['jackson-015', 'The 3D design, before any ground is broken'],
  ['hardscapes-patios-ave-h-outdoor-living', 'Pergola, seating and fire pit for the whole family'],
  ['artificial-turf-and-lighting-leander-patio-night', 'The same patio after dark, with landscape lighting'],
  ['hardscaping-pool-scaping', 'Pool, turf and a clean edge to match'],
  ['ig-fountain-detail', 'The finer details: a limestone fountain'],
  ['new-home-page2', 'Gabion and Cor-Ten planter with native plants'],
  ['hardscapes-patios-cover-picture-for-website', 'Limestone terraces beside the pool'],
  ['hardscapes-patios-limestone-outdoor-kitchen', 'Outdoor kitchen in Hill Country limestone'],
  ['hardscaping-custom-deck', 'Custom deck with a built-in fire pit'],
  ['planter-boxes-and-gabion-cover-picture-for-website', 'Steel, timber and gabion planters'],
  ['hardscaping-dan-dankert-backyard', 'A shaded backyard with a covered pergola'],
  ['hardscapes-patios-paver-patio-with-steel-planter-and-bench', 'Paver patio with a steel planter and bench'],
  ['artificial-turf-and-lighting-cover-for-website', 'Artificial turf that stays green all year'],
  ['planters-steel-with-trellises', 'Steel planters and trellis beside the pool'],
  ['bomely-residence', 'Turf, a putting green and Cor-Ten steel'],
].map(([s, cap]) => ({ s, alt: cap, cap }))
// a photo for each core value, chosen to match the idea
const VALUE_PHOTO = {
  Integrity: ['hardscaping-limestone-outdoor-kitchen', 'Honest local limestone, nothing hidden behind it'],
  Professionalism: ['dscf8612', 'A clean, precise finish down to the edging'],
  Commitment: ['hardscaping-custom-deck', 'Seen through to the last detail'],
  Passion: ['ashleyyyreyyy1', 'Water, light and stone for the joy of it'],
}
const aboutData = {
  ...pages.about,
  sections: pages.about.sections.map((sec) => ({
    ...sec,
    comps: sec.comps
      .filter((c) => !(sec.title === 'Our Core Values' && c.k === 'imgs'))
      .map((c) => {
        if (sec.title === 'Creating Unique Spaces' && c.k === 'imgs') return { k: 'strip', imgs: STRIP, label: 'Projects from design to finished yard' }
        if (c.k === 'card' && VALUE_PHOTO[c.title]) return { ...c, imgs: [{ s: VALUE_PHOTO[c.title][0], alt: VALUE_PHOTO[c.title][1] }] }
        return c
      }),
  })),
}

export function About() {
  return <ContentPage slug="about" data={aboutData} eyebrow="Since 2008" heroImage="hardscapes-patios-cover-picture-for-website" crumbs={[['Home', '/'], ['About']]} violet={['About the Team']} />
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
              <div className="plist">
                {mine.slice(0, 6).map((p) => (
                  <PostRow key={p.slug} post={p} />
                ))}
              </div>
            </div>
          </section>
        )
      }
    />
  )
}
