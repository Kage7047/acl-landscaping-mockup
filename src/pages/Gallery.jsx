import { useMemo, useState } from 'react'
import PageHero from '../components/PageHero'
import CtaBand from '../components/CtaBand'
import { ProjectCard } from '../components/Cards'
import { useReveal } from '../components/useReveal'
import { useMeta } from '../lib/useMeta'
import projects from '../content/projects.json'

const CATS = [
  ['All', () => true],
  ['Landscape design', (p) => /design/i.test(p.tags.join(' '))],
  ['Hardscape', (p) => /hardscape|walkway|stone|patio|driveway|pergola|decking/i.test(p.tags.join(' '))],
  ['Artificial turf', (p) => /turf|grass/i.test(p.tags.join(' '))],
  ['Steel & gabion', (p) => /steel|gabion|planter/i.test(p.tags.join(' '))],
  ['Plants & xeriscape', (p) => /plant|xeriscape|native|softscape|flowering/i.test(p.tags.join(' '))],
  ['Lighting & water', (p) => /light|water/i.test(p.tags.join(' '))],
]

export default function Gallery() {
  const [cat, setCat] = useState('All')
  const root = useReveal([cat])
  useMeta('Project gallery', 'Real projects. Real yards. Browse featured Austin landscaping case studies by category.')
  const list = useMemo(() => projects.filter(CATS.find((c) => c[0] === cat)[1]), [cat])
  return (
    <div ref={root}>
      <PageHero
        eyebrow="Client case studies"
        title="Project gallery."
        lead={['Real projects. Real yards. Browse our featured client case studies and explore the full portfolio by category.']}
        image="new-img-3900"
        crumbs={[['Home', '/'], ['Gallery']]}
      />
      <section className="sec sec--paper" aria-labelledby="gal-title">
        <div className="container">
          <header className="sec__head">
            <h2 id="gal-title" className="sec__title">
              Featured projects
            </h2>
            <p className="sec__count" role="status">
              {list.length} {list.length === 1 ? 'project' : 'projects'}
            </p>
          </header>
          <div className="filters" role="group" aria-label="Filter projects by category">
            {CATS.map(([name]) => (
              <button key={name} type="button" className="fchip" aria-pressed={cat === name} onClick={() => setCat(name)}>
                {name}
              </button>
            ))}
          </div>
          <div className="prgrid">
            {list.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Ready to start your project?" text="First consultation is always free. Let’s walk your land and start sketching." />
    </div>
  )
}
