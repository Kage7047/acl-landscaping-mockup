import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Magnet from './rb/Magnet'
import { SERVICE_OPTIONS, TIMELINES } from '../lib/nav'
import { SITE } from '../data'

/**
 * Free-consultation form. Nothing is stored on a server: on submit the visitor's email app opens with the
 * message ready to send to the business, then they land on the thank-you page. (In production this would post to a
 * form service or CRM.)
 */
export default function ConsultForm({ kind = 'consult', title = 'Request your free consultation', compact = false }) {
  const isConsult = kind.startsWith('consult') // 'consult' or 'consult-home'; anything else is the job application
  const [params] = useSearchParams()
  const nav = useNavigate()
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const preService = SERVICE_OPTIONS.includes(params.get('service')) ? params.get('service') : ''
  const preTime = TIMELINES.some((t) => t.value === params.get('timeline')) ? params.get('timeline') : ''

  const submit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const v = Object.fromEntries(new FormData(form).entries())
    const next = {}
    if (!String(v.name || '').trim()) next.name = 'Please tell us your name.'
    const email = String(v.email || '').trim()
    const phone = String(v.phone || '').trim()
    if (!email && !phone) next.email = 'Add an email or a phone number so we can reach you.'
    else if (email && !/^\S+@\S+\.\S+$/.test(email)) next.email = 'That email address does not look right.'
    setErrors(next)
    if (Object.keys(next).length) {
      form.querySelector(`[name="${Object.keys(next)[0]}"]`)?.focus()
      return
    }
    setBusy(true)
    const lines = [
      `Name: ${v.name}`,
      email && `Email: ${email}`,
      phone && `Phone: ${phone}`,
      v.project && `Project: ${v.project}`,
      v.timeline && `Timeline: ${v.timeline}`,
      v.area && `Neighborhood: ${v.area}`,
      '',
      v.message || '',
    ].filter((l) => l !== false && l !== undefined)
    const subject = isConsult ? `Free consultation request${v.project ? `: ${v.project}` : ''}` : 'Job application'
    const href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
    setTimeout(() => {
      window.location.href = href
      nav('/thank-you', { state: { name: String(v.name).split(' ')[0] } })
    }, 450)
  }

  return (
    <form className="cform" onSubmit={submit} noValidate>
      {title && <h3 className="form__title">{title}</h3>}
      <div className="field">
        <label htmlFor={`f-name-${kind}`}>Your name</label>
        <input id={`f-name-${kind}`} name="name" type="text" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? `e-name-${kind}` : undefined} />
        {errors.name && (
          <p className="field__err" id={`e-name-${kind}`} role="alert">
            {errors.name}
          </p>
        )}
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor={`f-email-${kind}`}>Email</label>
          <input id={`f-email-${kind}`} name="email" type="email" autoComplete="email" inputMode="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? `e-email-${kind}` : undefined} />
        </div>
        <div className="field">
          <label htmlFor={`f-phone-${kind}`}>Phone</label>
          <input id={`f-phone-${kind}`} name="phone" type="tel" autoComplete="tel" inputMode="tel" />
        </div>
      </div>
      {errors.email && (
        <p className="field__err field__err--row" id={`e-email-${kind}`} role="alert">
          {errors.email}
        </p>
      )}
      {isConsult ? (
        <>
          <div className="field-row">
            <div className="field">
              <label htmlFor={`f-type-${kind}`}>What are you dreaming of?</label>
              <select id={`f-type-${kind}`} name="project" defaultValue={preService}>
                <option value="">Select a service</option>
                {SERVICE_OPTIONS.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor={`f-time-${kind}`}>When would you like to start?</label>
              <select id={`f-time-${kind}`} name="timeline" defaultValue={preTime}>
                <option value="">Select timing</option>
                {TIMELINES.map((t) => (
                  <option key={t.id} value={t.value}>
                    {t.label} ({t.note.toLowerCase()})
                  </option>
                ))}
              </select>
            </div>
          </div>
          {!compact && (
            <div className="field">
              <label htmlFor={`f-area-${kind}`}>
                Neighborhood or city <span className="opt">(optional)</span>
              </label>
              <input id={`f-area-${kind}`} name="area" type="text" autoComplete="address-level2" />
            </div>
          )}
        </>
      ) : (
        <div className="field">
          <label htmlFor={`f-role-${kind}`}>Position</label>
          <select id={`f-role-${kind}`} name="project" defaultValue="">
            <option value="">Choose a position</option>
            {['Landscape Crew Member', 'Hardscape Installer', 'Landscape Foreman', 'Irrigation Technician', 'Something else'].map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
      )}
      <div className="field">
        <label htmlFor={`f-msg-${kind}`}>
          {isConsult ? 'Tell us about your space' : 'Tell us about your experience'} <span className="opt">(optional)</span>
        </label>
        <textarea id={`f-msg-${kind}`} name="message" rows={compact ? 3 : 4} />
      </div>
      <Magnet padding={50} magnetStrength={5} wrapperClassName="form__submit">
        <button className="btn btn--primary btn--block" type="submit" disabled={busy}>
          {busy ? 'Opening your email app…' : isConsult ? 'Request my free consultation' : 'Send my application'}
        </button>
      </Magnet>
      <p className="form__note">
        Submitting opens your email app with this message ready to send to {SITE.email}. Prefer to talk? Call{' '}
        <a href={SITE.phoneHref}>{SITE.phone}</a>.
      </p>
    </form>
  )
}
