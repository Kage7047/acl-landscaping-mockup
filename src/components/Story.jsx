import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useReducedMotionState } from '../lib/motion'
import Img from './Img'
import ScrollReveal from './rb/ScrollReveal'
import CountUp from './rb/CountUp'

const STATS = [
  { to: 16, suffix: '+', label: 'years building in Austin', note: 'Serving Austin since 2008' },
  { to: 500, suffix: '+', label: 'projects completed', note: 'Across Central Texas' },
  { to: 5, decimals: 1, suffix: '', label: 'average rating', note: 'From real homeowners', star: true },
  { to: 100, suffix: '%', label: 'satisfaction promise', note: 'Built to last, guaranteed' },
]

export default function Story() {
  const root = useRef(null)
  const reduced = useReducedMotionState()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 0px)', () => {
        if (reduced) return
        gsap.fromTo(
          '.story__img img',
          { yPercent: -9, scale: 1.12 },
          { yPercent: 9, scale: 1.12, ease: 'none', scrollTrigger: { trigger: '.story__img', start: 'top bottom', end: 'bottom top', scrub: true } },
        )
        gsap.from('.story__img', {
          clipPath: 'inset(14% 14% 14% 14% round 28px)',
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.story__img', start: 'top 85%', once: true },
        })
        gsap.from('.stat', {
          y: 36,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.stats', start: 'top 85%', once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  )

  return (
    <section className="story" id="story" ref={root} aria-label="Our story">
      <div className="container story__grid">
        <div className="story__copy">
          <p className="eyebrow eyebrow--dark">
            <span className="dot" /> Our story
          </p>
          <ScrollReveal
            baseOpacity={0.12}
            enableBlur
            blurStrength={5}
            baseRotation={2}
            containerClassName="story__reveal"
            textClassName="story__reveal-text"
          >
            A design/build firm rooted in the Texas Hill Country. For over 16 years we have crafted outdoor spaces that feel like home. We are designers, gardeners, masons and craftspeople who care deeply about the land we work on.
          </ScrollReveal>
          <p className="story__sub">
            Every project starts the same way: a quiet walk on your property, a conversation about how you live, and a
            sketch on paper. From there we draw, we build, and we plant, always with a deep respect for native Texas
            landscapes.
          </p>
          <p className="story__sign">
            <span>Abéy Bruce</span>
            Founder, owner &amp; lead designer
          </p>
        </div>
        <figure className="story__img">
          <Img name="dusk" alt="Limestone pavers leading across a new turf lawn with string lights and fall colour behind" sizes="(min-width: 900px) 42vw, 100vw" />
          <figcaption>Pavers, turf &amp; lights, South Austin</figcaption>
        </figure>
      </div>

      <div className="container">
        <ul className="stats">
          {STATS.map((s) => (
            <li className="stat" key={s.label}>
              <div className="stat__num">
                <CountUp to={s.to} decimals={s.decimals} duration={2.2} />
                <span>{s.suffix}</span>
                {s.star && <span className="stat__star" aria-hidden="true">★</span>}
              </div>
              <p className="stat__label">{s.label}</p>
              <p className="stat__note">{s.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
