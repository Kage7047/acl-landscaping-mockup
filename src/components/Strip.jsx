import { useEffect, useRef } from 'react'
import { Pic } from '../lib/pic'
import { useReducedMotionState } from '../lib/motion'

/**
 * Photo strip that drifts on its own and can also be scrolled by hand (wheel, touch, drag, arrow buttons or keys).
 * The set is rendered twice so it loops without a jump.
 */
export default function Strip({ imgs, label = 'Photos' }) {
  const box = useRef(null)
  const reduced = useReducedMotionState()

  useEffect(() => {
    const el = box.current
    if (!el) return undefined
    let raf = 0
    let pos = 0
    let last = performance.now()
    let holdUntil = 0
    let visible = false
    let drag = null
    const half = () => el.scrollWidth / 2

    const wrap = () => {
      const h = half()
      if (!h) return
      if (el.scrollLeft >= h) el.scrollLeft -= h
      else if (el.scrollLeft <= 0) el.scrollLeft += h
    }
    const onScroll = () => {
      // a scroll we did not cause means the visitor is steering: pause the drift briefly
      if (Math.abs(el.scrollLeft - pos) > 2) {
        holdUntil = performance.now() + 2200
        pos = el.scrollLeft
      }
      wrap()
      pos = el.scrollLeft
    }
    const tick = (t) => {
      const dt = Math.min(250, t - last)
      last = t
      if (visible && !reduced && t >= holdUntil && !drag) {
        pos += dt * 0.05 // keep the fraction here: reading scrollLeft back would round it away
        const h = half()
        if (h && pos >= h) pos -= h
        el.scrollLeft = pos
      }
      raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.05 })
    io.observe(el)
    el.scrollLeft = 1
    pos = el.scrollLeft
    el.addEventListener('scroll', onScroll, { passive: true })

    const down = (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return
      drag = { x: e.clientX, left: el.scrollLeft }
      el.setPointerCapture(e.pointerId)
      el.classList.add('is-drag')
    }
    const move = (e) => {
      if (drag) el.scrollLeft = drag.left - (e.clientX - drag.x)
    }
    const up = () => {
      drag = null
      holdUntil = performance.now() + 2200
      el.classList.remove('is-drag')
    }
    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      el.removeEventListener('scroll', onScroll)
      el.removeEventListener('pointerdown', down)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up)
      el.removeEventListener('pointercancel', up)
    }
  }, [reduced])

  const by = (d) => box.current?.scrollBy({ left: d * Math.min(520, box.current.clientWidth * 0.8), behavior: reduced ? 'auto' : 'smooth' })
  const key = (e) => {
    if (e.key === 'ArrowRight') by(1)
    if (e.key === 'ArrowLeft') by(-1)
  }

  return (
    <div className="strip-wrap" data-reveal>
      <div className="strip" ref={box} role="region" aria-label={`${label}. Scrolls automatically; use the arrow keys or buttons to browse.`} tabIndex={0} onKeyDown={key}>
        {[0, 1].map((k) => (
          <ul className="strip__set" key={k} aria-hidden={k === 1 ? 'true' : undefined}>
            {imgs.map((im) => (
              <li key={im.s}>
                <Pic s={im.s} alt={k === 0 ? im.alt || im.cap || '' : ''} sizes="(min-width: 960px) 30vw, 70vw" />
                {im.cap && <span>{im.cap}</span>}
              </li>
            ))}
          </ul>
        ))}
      </div>
      <button type="button" className="strip__btn strip__btn--prev" onClick={() => by(-1)} aria-label="Scroll photos back">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <button type="button" className="strip__btn strip__btn--next" onClick={() => by(1)} aria-label="Scroll photos forward">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </div>
  )
}
