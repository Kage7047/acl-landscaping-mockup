import { useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import CtaBand from '../components/CtaBand'
import BeforeAfter from '../components/BeforeAfter'
import Lightbox from '../components/Lightbox'
import { Pic, picItem } from '../lib/pic'
import { useReveal } from '../components/useReveal'
import { useMeta } from '../lib/useMeta'
import projects from '../content/projects.json'

export default function Project() {
  const { slug } = useParams()
  const idx = projects.findIndex((p) => p.slug === slug)
  const p = projects[idx]
  const root = useReveal([slug])
  const [open, setOpen] = useState(null)
  const opener = useRef(null)
  useMeta(p?.title, p?.desc?.replace(/<[^>]+>/g, '').slice(0, 160))
  if (!p) return <Navigate to="/project-gallery" replace />

  const befores = p.imgs.filter((i) => /before/.test(i.s))
  const afters = p.imgs.filter((i) => /after/.test(i.s))
  const rest = p.imgs.filter((i) => !/before|after/.test(i.s))
  const hasPair = befores.length && afters.length
  const gallery = p.imgs
  const more = gallery.slice(5)
  const items = gallery.map((i) => picItem(i.s, i.alt, i.alt || p.title))
  const prev = projects[(idx - 1 + projects.length) % projects.length]
  const next = projects[(idx + 1) % projects.length]
  const hero = afters[0]?.s || p.cover || p.imgs[0]?.s

  return (
    <div ref={root}>
      <PageHero
        eyebrow={p.tags.slice(0, 3).join(' · ')}
        title={p.title}
        lead={p.sub ? [p.sub] : []}
        image={hero}
        crumbs={[['Home', '/'], ['Gallery', '/project-gallery'], [p.title]]}
        actions={
          <Link className="btn btn--primary" to="/contact">
            Schedule your free consultation
          </Link>
        }
      />

      <section className="sec sec--paper sec--tight" aria-label="Project photos">
        <div className="container">
          <div className={`mosaic mosaic--${Math.min(gallery.length, 5)}`}>
            {gallery.slice(0, 5).map((g, i) => (
              <button
                key={g.s}
                type="button"
                className="mosaic__tile"
                onClick={(e) => {
                  opener.current = e.currentTarget
                  setOpen(i)
                }}
                aria-label={`Enlarge photo ${i + 1} of ${gallery.length}${g.alt ? `: ${g.alt}` : ''}`}
              >
                <Pic s={g.s} alt="" eager={i === 0} sizes={i === 0 ? '(min-width: 960px) 50vw, 100vw' : '(min-width: 960px) 25vw, 50vw'} />
              </button>
            ))}
            <button
              type="button"
              className="mosaic__all"
              onClick={(e) => {
                opener.current = e.currentTarget
                setOpen(0)
              }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
              Show all {gallery.length} photos
            </button>
          </div>
        </div>
      </section>

      <section className="sec sec--paper">
        <div className="container pj">
          <div className="pj__main">
            {hasPair ? (
              <div data-reveal>
                <h2 className="sec__title sec__title--sm">Before &amp; after</h2>
                <BeforeAfter before={befores[0].s} after={afters[0].s} label={`${p.title}, before and after`} />
                <p className="pj__hint">Drag the slider, or use the arrow keys, to compare.</p>
              </div>
            ) : null}
            <div data-reveal>
              <h2 className="sec__title sec__title--sm">About this project</h2>
              <div className="prose prose--one">
                {(p.about.length ? p.about : [p.desc]).map((t, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: t }} />
                ))}
              </div>
            </div>
            {p.did.length > 0 && (
              <div data-reveal>
                <h2 className="sec__title sec__title--sm">What we did</h2>
                <ul className="checks">
                  {p.did.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <aside className="pj__side" data-reveal aria-label="Project details">
            <h2>Project details</h2>
            <dl>
              {Object.entries(p.details).map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <p>Love what you see? First consultation is always free.</p>
            <Link className="btn btn--primary btn--block" to="/contact">
              Schedule consultation
            </Link>
          </aside>
        </div>
      </section>

      {more.length > 0 && (
      <section className="sec sec--cream" aria-labelledby="pj-gal">
        <div className="container">
          <header className="sec__head" data-reveal>
            <h2 id="pj-gal" className="sec__title">
              More photos
            </h2>
            <p className="sec__count">{more.length} more</p>
          </header>
          <div className="masonry">
            {more.map((g, j) => { const i = j + 5; return (
              <button
                key={g.s}
                type="button"
                className="masonry__item"
                data-reveal
                onClick={(e) => {
                  opener.current = e.currentTarget
                  setOpen(i)
                }}
                aria-label={`Enlarge photo ${i + 1} of ${gallery.length}${g.alt ? `: ${g.alt}` : ''}`}
              >
                <Pic s={g.s} alt="" sizes="(min-width: 960px) 30vw, 50vw" />
              </button>
            )})}
          </div>
        </div>
      </section>
      )}

      <section className="sec sec--paper" aria-label="More projects">
        <div className="container pnav">
          <Link to={`/projects/${prev.slug}`} className="pnav__a" rel="prev">
            <span>Previous project</span>
            {prev.title}
          </Link>
          <Link to={`/projects/${next.slug}`} className="pnav__a pnav__a--next" rel="next">
            <span>Next project</span>
            {next.title}
          </Link>
        </div>
      </section>
      <CtaBand title="Ready to start your project?" text="First consultation is always free. We’ll walk your land and start sketching." />
      <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} opener={opener} />
    </div>
  )
}
