import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import Img from './Img'
import { SERVICES } from '../data'
import { Link } from 'react-router-dom'
import { useReducedMotionState } from '../lib/motion'

export default function Services() {
  const root = useRef(null)
  const track = useRef(null)
  const reduced = useReducedMotionState()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      // Desktop: pin the section and scroll the cards sideways. Everything else gets a native, snap-scrolling row.
      mm.add('(min-width: 960px)', () => {
        if (reduced) return
        const el = track.current
        const dist = () => Math.max(0, el.scrollWidth - window.innerWidth + 1)
        const tween = gsap.to(el, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: '.services__pin',
            start: 'top top',
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        gsap.to('.services__bar-fill', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.services__pin', start: 'top top', end: () => `+=${dist()}`, scrub: true },
        })
        gsap.utils.toArray('.svc__media img').forEach((im) => {
          gsap.fromTo(im, { xPercent: -5 }, {
            xPercent: 5,
            ease: 'none',
            scrollTrigger: { trigger: im.closest('.svc'), containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
          })
        })
      })
      mm.add('(min-width: 0px)', () => {
        if (reduced) return
        if (window.matchMedia('(min-width: 960px)').matches) return
        gsap.from('.svc', {
          y: 40,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.services__track', start: 'top 85%', once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  )

  return (
    <section className="services" id="services" ref={root} aria-labelledby="services-title">
      <div className="services__pin">
        <div className="services__head container">
          <div>
            <p className="eyebrow">
              <span className="dot" /> What we do
            </p>
            <h2 id="services-title" className="h2">
              Landscaping, <em>end to end.</em>
            </h2>
          </div>
          <p className="services__intro">
            From the first sketch to the last plant in the ground, one team handles every part of your outdoor build.
            Residential and commercial, across South Austin and the Hill Country.
          </p>
        </div>

        <div className="services__viewport">
          <ul className="services__track" ref={track}>
            {SERVICES.map((s, i) => (
              <li className="svc" key={s.id}>
                <article>
                  <div className="svc__media">
                    <Img name={s.image} alt="" sizes="(min-width: 960px) 34vw, 82vw" />
                    <span className="svc__no" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="svc__body">
                    <p className="svc__kicker">{s.kicker}</p>
                    <h3 className="svc__title">{s.title}</h3>
                    <p className="svc__text">{s.text}</p>
                    <ul className="chips" aria-label={`${s.title} includes`}>
                      {s.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                    <Link className="link" to={`/${s.slug}`}>
                      Explore {s.title.toLowerCase()}
                      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
        <div className="services__bar container" aria-hidden="true">
          <span className="services__bar-fill" />
        </div>
      </div>
    </section>
  )
}
