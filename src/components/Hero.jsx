import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import Img from './Img'
import SplitText from './rb/SplitText'
import Magnet from './rb/Magnet'
import { Link } from 'react-router-dom'
import { scrollToTarget } from '../lib/smooth'
import { useReducedMotionState } from '../lib/motion'

export default function Hero({ ready }) {
  const root = useRef(null)
  const reduced = useReducedMotionState()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 0px)', () => {
          if (reduced) {
            gsap.set('.hero__fade', { autoAlpha: 1 })
            return
          }
          // image opens up from a framed card to full bleed
          gsap.set('.hero__media', { clipPath: 'inset(7% 5% 7% 5% round 36px)' })
          gsap.set('.hero__img', { scale: 1.28 })
          gsap.set('.hero__fade', { autoAlpha: 0, y: 26 })
          if (!ready) return
          const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
          tl.to('.hero__media', { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.7, ease: 'power3.inOut' }, 0)
            .to('.hero__img', { scale: 1.02, duration: 2.2, ease: 'power3.out' }, 0)
            .to('.hero__fade', { autoAlpha: 1, y: 0, duration: 1, stagger: 0.12 }, 0.7)

          // slow parallax + fade as you scroll away
          gsap.to('.hero__img', {
            yPercent: 14,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
          })
          gsap.to('.hero__inner', {
            yPercent: -10,
            autoAlpha: 0.15,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: '35% top', end: 'bottom top', scrub: true },
          })
      })
      return () => mm.revert()
    },
    { scope: root, dependencies: [ready, reduced], revertOnUpdate: true },
  )

  return (
    <section className="hero" id="top" ref={root} aria-labelledby="hero-title">
      <div className="hero__media">
        <Img name="hero" className="hero__img" eager alt="A gabion and Cor-Ten steel planter filled with native plants in front of a brick home in Austin" sizes="100vw" />
        <div className="hero__shade" />
      </div>

      <div className="hero__inner container">
        <p className="eyebrow hero__fade">
          <span className="dot" /> Austin, Texas &middot; Hill Country design/build
        </p>
        {ready ? (
          <SplitText
            tag="h1"
            text="Landscapes that grow with you."
            className="hero__title"
            splitType="words"
            mask
            delay={80}
            duration={1.2}
            effect="rise"
            trigger="load"
            textAlign="left"
            rootMargin="0px"
          />
        ) : (
          <h1 className="hero__title" style={{ visibility: 'hidden' }}>
            Landscapes that grow with you.
          </h1>
        )}
        <p className="hero__lede hero__fade">
          We design and build custom outdoor living spaces, from native gardens and hardscape to artificial turf and
          landscape lighting. Born in Austin. Built for Texas.
        </p>
        <div className="hero__actions hero__fade">
          <Magnet padding={70} magnetStrength={4}>
            <Link className="btn btn--primary" to="/contact">
              Book a free consultation
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </Magnet>
          <a className="btn btn--ghost" href="#work" onClick={(e) => (e.preventDefault(), scrollToTarget('#work', -20))}>
            See our work
          </a>
        </div>
      </div>

      <ul className="hero__trust hero__fade" aria-label="Why homeowners choose us">
        <li>
          <strong>5.0</strong>
          <span>
            <span className="stars" aria-hidden="true">
              ★★★★★
            </span>
            <span className="sr-only">5 out of 5 stars, </span>47 reviews
          </span>
        </li>
        <li>
          <strong>16+</strong>
          <span>years in Austin</span>
        </li>
        <li>
          <strong>30 min</strong>
          <span>free consultation</span>
        </li>
      </ul>

      <a className="hero__scroll hero__fade" href="#story" onClick={(e) => (e.preventDefault(), scrollToTarget('#story'))} aria-label="Scroll to our story">
        <span />
      </a>
    </section>
  )
}
