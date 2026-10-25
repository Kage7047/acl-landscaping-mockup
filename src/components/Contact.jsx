import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useReducedMotionState } from '../lib/motion'
import SplitText from './rb/SplitText'
import Magnet from './rb/Magnet'
import { AREAS, SITE } from '../data'

const PROJECTS = [
  'Landscape design',
  'Hardscaping & patios',
  'Artificial turf',
  'Steel & gabions',
  'Custom planters',
  'Landscape lighting & water',
  'Drainage solutions',
  'Pool-scaping',
  'Not sure yet',
]

export default function Contact() {
  const root = useRef(null)
  const reduced = useReducedMotionState()
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const status = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 0px)', () => {
        if (reduced) return
        gsap.from('.contact__card', {
          y: 60,
          autoAlpha: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.contact__card', start: 'top 85%', once: true },
        })
        gsap.from('.contact__facts > *', {
          y: 24,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.contact__facts', start: 'top 88%', once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  )

  const submit = (e) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const v = Object.fromEntries(fd.entries())
    const next = {}
    if (!String(v.name || '').trim()) next.name = 'Please tell us your name.'
    const email = String(v.email || '').trim()
    const phone = String(v.phone || '').trim()
    if (!email && !phone) next.email = 'Add an email or a phone number so we can reach you.'
    else if (email && !/^\S+@\S+\.\S+$/.test(email)) next.email = 'That email address does not look right.'
    setErrors(next)
    if (Object.keys(next).length) {
      const first = e.currentTarget.querySelector(`[name="${Object.keys(next)[0]}"]`)
      first?.focus()
      return
    }
    setBusy(true)
    // Concept preview: nothing is sent. In production this posts to the client's inbox / CRM.
    setTimeout(() => {
      setBusy(false)
      setSent(true)
      requestAnimationFrame(() => status.current?.focus())
    }, 900)
  }

  return (
    <section className="contact" id="contact" ref={root} aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div className="contact__intro">
          <p className="eyebrow">
            <span className="dot" /> Free consultation
          </p>
          <SplitText
            tag="h2"
            text="Ready to grow something beautiful?"
            className="h2 contact__title"
            splitType="words"
            mask
            delay={70}
            textAlign="left"
            rootMargin="-80px"
          />
          <span id="contact-title" className="sr-only">
            Ready to grow something beautiful? Request your free consultation
          </span>
          <p className="contact__lede">
            Your first 30-minute consultation is on us. Let&rsquo;s walk your land and start sketching.
          </p>

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

        <div className="contact__card">
          {sent ? (
            <div className="sent" role="status" tabIndex={-1} ref={status}>
              <svg viewBox="0 0 48 48" width="56" height="56" aria-hidden="true">
                <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M14 25l7 7 13-15" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3>Thank you, we&rsquo;ll be in touch.</h3>
              <p>Expect a call or email within one business day to set up your free walk-through.</p>
              <p className="sent__note">Concept preview: this form isn&rsquo;t connected yet, so nothing was sent.</p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate aria-describedby="form-note">
              <h3 className="form__title">Request your free consultation</h3>
              <div className="field">
                <label htmlFor="f-name">Your name</label>
                <input id="f-name" name="name" type="text" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? 'e-name' : undefined} />
                {errors.name && (
                  <p className="field__err" id="e-name">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="f-email">Email</label>
                  <input id="f-email" name="email" type="email" autoComplete="email" inputMode="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'e-email' : undefined} />
                </div>
                <div className="field">
                  <label htmlFor="f-phone">Phone</label>
                  <input id="f-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" />
                </div>
              </div>
              {errors.email && (
                <p className="field__err" id="e-email" role="alert">
                  {errors.email}
                </p>
              )}
              <div className="field">
                <label htmlFor="f-type">What are you dreaming of?</label>
                <select id="f-type" name="project" defaultValue="">
                  <option value="" disabled>
                    Choose a project type
                  </option>
                  {PROJECTS.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-msg">
                  Tell us about your space <span className="opt">(optional)</span>
                </label>
                <textarea id="f-msg" name="message" rows="4" />
              </div>
              <Magnet padding={50} magnetStrength={5} wrapperClassName="form__submit">
                <button className="btn btn--primary btn--block" type="submit" disabled={busy}>
                  {busy ? 'Sending…' : 'Request my free consultation'}
                </button>
              </Magnet>
              <p className="form__note" id="form-note">
                Your first 30-minute consultation is free. We&rsquo;ll only use your details to get back to you.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
