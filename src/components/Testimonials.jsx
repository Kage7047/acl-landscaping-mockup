import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useReducedMotionState } from '../lib/motion'
import SpotlightCard from './rb/SpotlightCard'
import { TESTIMONIALS } from '../data'

export default function Testimonials() {
  const root = useRef(null)
  const reduced = useReducedMotionState()
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 0px)', () => {
        if (reduced) return
        gsap.from('.quote', {
          y: 50,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.quotes', start: 'top 85%', once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  )

  return (
    <section className="reviews" id="reviews" ref={root} aria-labelledby="reviews-title">
      <div className="container">
        <div className="reviews__head">
          <div>
            <p className="eyebrow">
              <span className="dot" /> In their words
            </p>
            <h2 id="reviews-title" className="h2">
              From our <em>neighbors.</em>
            </h2>
          </div>
          <p className="reviews__score">
            <strong>5.0</strong>
            <span>
              <span className="stars" aria-hidden="true">
                ★★★★★
              </span>
              <span className="sr-only">Rated 5 out of 5 </span>
              from 47 homeowner reviews
            </span>
          </p>
        </div>
        <ul className="quotes">
          {TESTIMONIALS.map((t) => (
            <li className="quote" key={t.name}>
              <SpotlightCard
                theme="dark"
                spotlightColor="#c7d98b"
                intensity={0.2}
                spotlightSize={300}
                softness={0.8}
                borderGlow={0.7}
                className="quote__card"
                style={{ '--spotlight-card-surface': '#1c2f20' }}
              >
                <blockquote>
                  <p>{t.quote}</p>
                  <footer>
                    <span className="quote__avatar" aria-hidden="true">
                      {t.name.replace(/[^A-Z]/g, '').slice(0, 1) || t.name[0]}
                    </span>
                    <cite>
                      {t.name}
                      <small>{t.place}</small>
                    </cite>
                  </footer>
                </blockquote>
              </SpotlightCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
