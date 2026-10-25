import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useReducedMotionState } from '../lib/motion'
import Img from './Img'
import { STEPS } from '../data'

export default function Process() {
  const root = useRef(null)
  const reduced = useReducedMotionState()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 0px)', () => {
        if (reduced) return
        gsap.utils.toArray('.step').forEach((el) => {
          ScrollActive(el)
        })
        function ScrollActive(el) {
          gsap.fromTo(
            el,
            { autoAlpha: 0.28 },
            {
              autoAlpha: 1,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top 78%', end: 'top 48%', scrub: true },
            },
          )
          gsap.fromTo(
            el.querySelector('.step__line'),
            { scaleX: 0 },
            { scaleX: 1, ease: 'none', transformOrigin: 'left center', scrollTrigger: { trigger: el, start: 'top 70%', end: 'top 45%', scrub: true } },
          )
        }
        gsap.from('.process__plan', {
          clipPath: 'inset(0 0 100% 0)',
          duration: 1.4,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: '.process__plan', start: 'top 80%', once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  )

  return (
    <section className="process" id="process" ref={root} aria-labelledby="process-title">
      <div className="container process__grid">
        <div className="process__side">
          <p className="eyebrow">
            <span className="dot" /> How it works
          </p>
          <h2 id="process-title" className="h2">
            From a walk on your land to a yard that <em>matures beautifully.</em>
          </h2>
          <figure className="process__plan">
            <Img name="design" alt="A digital landscape plan showing a pool, decking, planters and planting beds" sizes="(min-width: 960px) 34vw, 90vw" />
            <figcaption>A digital landscape plan, drawn for your yard</figcaption>
          </figure>
        </div>
        <ol className="steps">
          {STEPS.map((s) => (
            <li className="step" key={s.n}>
              <span className="step__n" aria-hidden="true">
                {s.n}
              </span>
              <div>
                <h3 className="step__title">
                  <span className="sr-only">Step {s.n}: </span>
                  {s.title}
                </h3>
                <p className="step__text">{s.text}</p>
                <span className="step__line" aria-hidden="true" />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
