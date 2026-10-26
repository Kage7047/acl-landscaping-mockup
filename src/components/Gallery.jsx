import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useReducedMotionState } from '../lib/motion'
import Img from './Img'
import { GALLERY, img } from '../data'
import { getLenis } from '../lib/smooth'
import { Link } from 'react-router-dom'

export default function Gallery() {
  const root = useRef(null)
  const reduced = useReducedMotionState()
  const dialog = useRef(null)
  const opener = useRef(null)
  const [idx, setIdx] = useState(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 0px)', () => {
        if (reduced) return
        gsap.utils.toArray('.tile').forEach((t) => {
          gsap.from(t, {
            clipPath: 'inset(12% 12% 12% 12% round 24px)',
            autoAlpha: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: t, start: 'top 90%', once: true },
          })
          gsap.fromTo(
            t.querySelector('img'),
            { yPercent: -6, scale: 1.14 },
            { yPercent: 6, scale: 1.14, ease: 'none', scrollTrigger: { trigger: t, start: 'top bottom', end: 'bottom top', scrub: true } },
          )
        })
      })
      return () => mm.revert()
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  )

  const open = (i, el) => {
    opener.current = el
    setIdx(i)
  }
  const close = useCallback(() => setIdx(null), [])
  const step = useCallback((d) => setIdx((i) => (i === null ? i : (i + d + GALLERY.length) % GALLERY.length)), [])

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    const lenis = getLenis()
    if (idx !== null) {
      if (!d.open) d.showModal()
      lenis?.stop()
      document.documentElement.classList.add('lightbox-open')
    } else {
      if (d.open) d.close()
      lenis?.start()
      document.documentElement.classList.remove('lightbox-open')
      opener.current?.focus()
    }
  }, [idx])

  useEffect(() => {
    if (idx === null) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [idx, step])

  const cur = idx === null ? null : GALLERY[idx]
  const f = cur ? img(cur.image) : null

  return (
    <section className="work" id="work" ref={root} aria-labelledby="work-title">
      <div className="container">
        <div className="work__head">
          <div>
            <p className="eyebrow eyebrow--dark">
              <span className="dot" /> Recent work
            </p>
            <h2 id="work-title" className="h2 h2--dark">
              Portfolio of <em>South Austin</em> landscapes.
            </h2>
          </div>
          <button type="button" className="pill" onClick={(e) => open(0, e.currentTarget)}>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            Show all {GALLERY.length} photos
          </button>
        </div>

        <ul className="bento">
          {GALLERY.map((g, i) => (
            <li key={g.image} className={`tile ${g.span}`}>
              <button type="button" onClick={(e) => open(i, e.currentTarget)} aria-label={`Open photo: ${g.cap}`}>
                <Img name={g.image} alt="" sizes="(min-width: 960px) 33vw, 100vw" />
                <span className="tile__cap">
                  <small>{g.tag}</small>
                  {g.cap}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="container work__more">
        <Link className="btn btn--dark" to="/project-gallery">
          View the full portfolio
        </Link>
      </div>

      <dialog
        className="lb"
        ref={dialog}
        aria-label="Project photo viewer"
        onClose={close}
        onClick={(e) => e.target === dialog.current && close()}
      >
        {cur && (
          <figure className="lb__fig">
            <img src={f.src} srcSet={f.srcSet} sizes="92vw" alt={cur.cap} width={f.width} height={f.height} />
            <figcaption>
              <small>{cur.tag}</small>
              {cur.cap}
              <span className="lb__count">
                {idx + 1} / {GALLERY.length}
              </span>
            </figcaption>
          </figure>
        )}
        <button type="button" className="lb__btn lb__close" onClick={close} aria-label="Close viewer" autoFocus>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button type="button" className="lb__btn lb__prev" onClick={() => step(-1)} aria-label="Previous photo">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" className="lb__btn lb__next" onClick={() => step(1)} aria-label="Next photo">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </dialog>
    </section>
  )
}
