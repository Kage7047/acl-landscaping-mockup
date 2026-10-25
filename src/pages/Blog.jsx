import { useMemo, useState } from 'react'
import PageHero from '../components/PageHero'
import CtaBand from '../components/CtaBand'
import { PostCard } from '../components/Cards'
import { useReveal } from '../components/useReveal'
import { useMeta } from '../lib/useMeta'
import posts from '../content/blog.json'

const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))
const CATS = ['All', ...[...new Set(sorted.map((p) => p.cat))]]

export default function Blog() {
  const [cat, setCat] = useState('All')
  const root = useReveal([cat])
  useMeta('Our blog', 'Advice on landscape design, plant selection, drainage, soil and maintenance for Austin yards.')
  const list = useMemo(() => (cat === 'All' ? sorted : sorted.filter((p) => p.cat === cat)), [cat])
  const [first, ...rest] = list
  return (
    <div ref={root}>
      <PageHero
        eyebrow="Austin landscape advice"
        title="Our blog."
        lead={['Whether you’re looking for advice on landscape design, plant selection, or maintenance tips, our blog covers a wide range of topics to inspire your next outdoor project.']}
        image="new-img-3013"
        crumbs={[['Home', '/'], ['Blog']]}
      />
      <section className="sec sec--paper" aria-labelledby="blog-all">
        <div className="container">
          <header className="sec__head">
            <h2 id="blog-all" className="sec__title">
              Latest articles
            </h2>
            <p className="sec__count" role="status">
              {list.length} {list.length === 1 ? 'article' : 'articles'}
            </p>
          </header>
          <div className="filters" role="group" aria-label="Filter articles by topic">
            {CATS.map((c) => (
              <button key={c} type="button" className="fchip" aria-pressed={cat === c} onClick={() => setCat(c)}>
                {c}
              </button>
            ))}
          </div>
          {first && <PostCard post={first} featured />}
          <div className="pgrid">
            {rest.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </div>
  )
}
