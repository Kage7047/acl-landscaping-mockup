import { Fragment, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import CtaBand from '../components/CtaBand'
import ProjectMatch from '../components/ProjectMatch'
import Lightbox from '../components/Lightbox'
import Mosaic from '../components/Mosaic'
import { PostCard } from '../components/Cards'
import { Pic, picItem } from '../lib/pic'
import { useReveal } from '../components/useReveal'
import { useMeta } from '../lib/useMeta'
import { SERVICE_PAGES } from '../lib/nav'
import posts from '../content/blog.json'

const html = (h) => ({ __html: h })
const norm = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
const plain = (h) => h.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#x27;/g, '’')

/** Groups consecutive components of the same kind so cards sit in one grid. */
function group(comps) {
  const out = []
  for (const c of comps) {
    const last = out[out.length - 1]
    if ((c.k === 'card' || c.k === 'fig') && last && last.k === c.k + 's') last.items.push(c)
    else if (c.k === 'card') out.push({ k: 'cards', items: [c] })
    else if (c.k === 'fig') out.push({ k: 'figs', items: [c] })
    else out.push(c)
  }
  return out
}

function Comp({ c, open }) {
  if (c.k === 'prose')
    return (
      <div className="prose" data-reveal>
        {c.paras.map((p, i) => (
          <p key={i} dangerouslySetInnerHTML={html(p)} />
        ))}
      </div>
    )
  if (c.k === 'list')
    return (
      <ul className="checks" data-reveal>
        {c.items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    )
  if (c.k === 'imgs')
    return (
      <div className={`shots shots--${Math.min(c.imgs.length, 4)}`}>
        {c.imgs.map((im, i) => (
          <button
            type="button"
            key={im.s}
            data-reveal
            data-delay={i * 0.06}
            className="shot"
            onClick={(e) => open(c.imgs.map((x) => picItem(x.s, x.alt, x.alt)), i, e.currentTarget)}
            aria-label={`Enlarge photo${im.alt ? `: ${im.alt}` : ''}`}
          >
            <Pic s={im.s} alt="" sizes="(min-width: 960px) 30vw, 100vw" />
          </button>
        ))}
      </div>
    )
  if (c.k === 'figs') {
    const items = c.items.map((f) => picItem(f.s, f.alt, f.cap))
    return (
      <div className="figs">
        {c.items.map((f, i) => (
          <figure key={f.s} data-reveal data-delay={i * 0.06}>
            <button type="button" onClick={(e) => open(items, i, e.currentTarget)} aria-label={`Enlarge: ${f.cap || f.alt}`}>
              <Pic s={f.s} alt="" sizes="(min-width: 960px) 46vw, 100vw" />
            </button>
            {(f.cap || f.sub) && (
              <figcaption>
                <strong>{f.cap}</strong>
                {f.sub && <span>{f.sub}</span>}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    )
  }
  if (c.k === 'cards') {
    const photo = c.items.every((x) => x.imgs.length)
    const n = c.items.length
    return (
      <ul className={`cards ${photo ? 'cards--photo' : 'cards--text'} cards--${n >= 6 ? 'six' : n >= 4 ? 'four' : n === 3 ? 'three' : 'two'}`}>
        {c.items.map((x, i) => (
          <li key={x.title} className="card" data-reveal data-delay={(i % 3) * 0.07}>
            {photo && (
              <button
                type="button"
                className="card__media"
                onClick={(e) => open(x.imgs.map((im) => picItem(im.s, im.alt, x.title)), 0, e.currentTarget)}
                aria-label={`Enlarge photo: ${x.title}`}
              >
                <Pic s={x.imgs[0].s} alt="" sizes="(min-width: 960px) 30vw, 100vw" />
                {x.imgs.length > 1 && <span className="card__count">{x.imgs.length} photos</span>}
              </button>
            )}
            <div className="card__body">
              {!photo && <span className="card__n">{String(i + 1).padStart(2, '0')}</span>}
              <h3>{x.title}</h3>
              {x.text.map((t, k) => (
                <p key={k} dangerouslySetInnerHTML={html(t)} />
              ))}
              {x.list.length > 0 && (
                <ul className="checks checks--sm">
                  {x.list.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    )
  }
  return null
}

export default function ContentPage({ slug, data, eyebrow, heroImage, crumbs, metaDesc, extra }) {
  const svc = SERVICE_PAGES.find((s) => s.slug === slug)
  const root = useReveal([slug])
  const [lb, setLb] = useState({ items: [], index: null })
  const opener = useRef(null)
  useMeta(data.title, metaDesc || plain(data.lead.find((l) => plain(l).length > 40) || ''))

  const open = (items, index, el) => {
    opener.current = el
    setLb({ items, index })
  }
  const related = useMemo(() => {
    const out = []
    for (const t of data.related || []) {
      const p = posts.find((x) => norm(x.title) === norm(t) || norm(x.title).startsWith(norm(t).slice(0, 28)))
      if (p && !out.includes(p)) out.push(p)
    }
    return out
  }, [data.related])

  // Every photo on the page, in order, for the lead mosaic
  const photos = useMemo(() => {
    const seen = new Set()
    const out = []
    const add = (im) => {
      if (im?.s && !seen.has(im.s)) {
        seen.add(im.s)
        out.push(im)
      }
    }
    for (const s of data.sections)
      for (const c of s.comps) {
        if (c.k === 'imgs') c.imgs.forEach(add)
        else if (c.k === 'fig') add(c)
        else if (c.k === 'card') c.imgs.forEach(add)
      }
    return out
  }, [data.sections])

  const lead = data.lead.filter((p) => plain(p).length > 0)
  const secs = data.sections
  return (
    <div ref={root}>
      <PageHero
        eyebrow={eyebrow}
        title={data.title}
        lead={lead}
        image={heroImage}
        crumbs={crumbs}
        actions={
          svc && (
            <>
              <Link className="btn btn--primary" to={`/contact?service=${encodeURIComponent(svc.service)}`}>
                Book free consultation
              </Link>
              <Link className="btn btn--ghost" to="/project-gallery">
                View portfolio
              </Link>
            </>
          )
        }
      />
      {svc && photos.length >= 3 && (
        <Mosaic photos={photos} label={`${data.title} photos`} onOpen={(i, el) => open(photos.map((x) => picItem(x.s, x.alt, x.alt || x.cap || data.title)), i, el)} />
      )}
      {svc && <ProjectMatch service={svc.service} serviceLabel={svc.label} />}
      {secs.map((s, i) => (
        <section key={s.title} className={`sec ${i % 2 ? 'sec--cream' : 'sec--paper'}`} aria-labelledby={`h-${slug}-${i}`}>
          <div className="container">
            <header className="sec__head" data-reveal>
              <span className="sec__no" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 id={`h-${slug}-${i}`} className="sec__title">
                {s.title}
              </h2>
            </header>
            <div className="sec__body">
              {group(s.comps).map((c, k) => (
                <Fragment key={k}>
                  <Comp c={c} open={open} />
                </Fragment>
              ))}
            </div>
          </div>
        </section>
      ))}
      {extra}
      {related.length > 0 && (
        <section className="sec sec--paper" aria-labelledby={`rel-${slug}`}>
          <div className="container">
            <header className="sec__head" data-reveal>
              <h2 id={`rel-${slug}`} className="sec__title">
                From our blog
              </h2>
              <Link className="link link--dark" to="/blog">
                All articles
              </Link>
            </header>
            <div className="pgrid">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
      {data.cta && <CtaBand title={data.cta.title} text={data.cta.text} service={svc?.service} />}
      <Lightbox items={lb.items} index={lb.index} onIndex={(f) => setLb((s) => ({ ...s, index: typeof f === 'function' ? f(s.index) : f }))} onClose={() => setLb((s) => ({ ...s, index: null }))} opener={opener} />
    </div>
  )
}
