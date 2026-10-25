import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Link } from 'react-router-dom'
import { Pic } from '../lib/pic'
import SplitText from './rb/SplitText'
import { useReducedMotionState } from '../lib/motion'

/** Dark intro band used by every inner page. */
export default function PageHero({ eyebrow, title, lead = [], image, imageAlt = '', actions, crumbs, compact = false, children }) {
  const root = useRef(null)
  const reduced = useReducedMotionState()
  useGSAP(
    () => {
      if (reduced) return
      gsap.fromTo('.phero__img img', { scale: 1.2 }, { scale: 1.02, duration: 2, ease: 'power3.out' })
      gsap.from('.phero__fade', { y: 26, autoAlpha: 0, duration: 1, stagger: 0.12, delay: 0.35, ease: 'power3.out' })
      gsap.to('.phero__img img', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  )
  return (
    <section className={`phero ${compact ? 'phero--compact' : ''}`} ref={root}>
      {image && (
        <div className="phero__img" aria-hidden="true">
          <Pic s={image} alt={imageAlt} eager sizes="100vw" />
        </div>
      )}
      <div className="phero__shade" aria-hidden="true" />
      <div className="container phero__inner">
        {crumbs && (
          <nav className="crumbs phero__fade" aria-label="Breadcrumb">
            <ol>
              {crumbs.map(([label, to], i) => (
                <li key={label}>{to && i < crumbs.length - 1 ? <Link to={to}>{label}</Link> : <span aria-current="page">{label}</span>}</li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && (
          <p className="eyebrow phero__fade">
            <span className="dot" /> {eyebrow}
          </p>
        )}
        <SplitText tag="h1" text={title} className="phero__title" splitType="words" mask delay={70} duration={1.1} effect="rise" trigger="load" textAlign="left" rootMargin="0px" />
        {lead.map((p, i) => (
          <p key={i} className={`phero__lead phero__fade ${i === 0 && lead.length > 1 ? 'phero__lead--tag' : ''}`} dangerouslySetInnerHTML={{ __html: p }} />
        ))}
        {actions && <div className="phero__actions phero__fade">{actions}</div>}
        {children}
      </div>
    </section>
  )
}
