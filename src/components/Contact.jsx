import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import SplitText from './rb/SplitText'
import ConsultForm from './ConsultForm'
import SpotlightCard from './rb/SpotlightCard'
import { useReducedMotionState } from '../lib/motion'
import { AREAS, SITE } from '../data'

export default function Contact() {
  const root = useRef(null)
  const reduced = useReducedMotionState()
  useGSAP(
    () => {
      if (reduced) return
      gsap.from('.contact__card', { y: 60, autoAlpha: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: '.contact__card', start: 'top 85%', once: true } })
      gsap.from('.contact__facts > *', { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.contact__facts', start: 'top 88%', once: true } })
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  )
  return (
    <section className="contact" id="contact" ref={root} aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div className="contact__intro">
          <p className="eyebrow">
            <span className="dot" /> Free consultation
          </p>
          <SplitText tag="h2" text="Ready to grow something beautiful?" className="h2 contact__title" splitType="words" mask delay={70} textAlign="left" rootMargin="-80px" />
          <span id="contact-title" className="sr-only">
            Ready to grow something beautiful? Request your free consultation
          </span>
          <p className="contact__lede">Your first 30-minute consultation is on us. Let&rsquo;s walk your land and start sketching.</p>
          <ul className="contact__facts">
            <li>
              <span className="fact__k">Call</span>
              <a href={SITE.phoneHref}>{SITE.phone}</a>
            </li>
            <li>
              <span className="fact__k">Email</span>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              <span className="fact__k">Studio</span>
              <span>
                {SITE.address}
                <small>By appointment only</small>
              </span>
            </li>
            <li>
              <span className="fact__k">Hours</span>
              <span>
                Mon&ndash;Fri 8am&ndash;6pm
                <small>Sat 9am&ndash;3pm</small>
              </span>
            </li>
          </ul>
          <div className="areas">
            <p className="fact__k">Where we build</p>
            <ul>
              {AREAS.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <p className="areas__note">Based in South Austin, serving northern Hays County and southern Travis County.</p>
          </div>
        </div>
        <SpotlightCard
          theme="light"
          spotlightColor="#9262ca"
          intensity={0.45}
          spotlightSize={420}
          softness={0.85}
          borderGlow={0.9}
          className="contact__card"
          style={{ '--spotlight-card-surface': '#faf6ef' }}
        >
          <ConsultForm compact kind="consult-home" />
        </SpotlightCard>
      </div>
    </section>
  )
}
