import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { logoSrc } from '../data'
import { prefersReducedMotion } from '../lib/smooth'

export default function Preloader({ onDone }) {
  const root = useRef(null)
  const count = useRef(null)
  const bar = useRef(null)

  useEffect(() => {
    const reduce = prefersReducedMotion()
    const state = { v: 0 }
    document.documentElement.classList.add('is-loading')
    const finish = () => {
      document.documentElement.classList.remove('is-loading')
      onDone()
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: finish })
      if (reduce) {
        tl.to(root.current, { autoAlpha: 0, duration: 0.3 })
        return
      }
      tl.fromTo('.pre__logo', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' })
        .to(
          state,
          {
            v: 100,
            duration: 1.1,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (count.current) count.current.textContent = String(Math.round(state.v)).padStart(2, '0')
              if (bar.current) bar.current.style.transform = `scaleX(${state.v / 100})`
            },
          },
          0.1,
        )
        .to('.pre__inner', { autoAlpha: 0, y: -16, duration: 0.35, ease: 'power2.in' }, '>0.1')
        .to(root.current, { yPercent: -100, duration: 0.95, ease: 'power4.inOut' }, '>-0.05')
    }, root)
    return () => {
      ctx.revert()
      document.documentElement.classList.remove('is-loading')
    }
  }, [onDone])

  return (
    <div className="pre" ref={root} aria-hidden="true">
      <div className="pre__inner">
        <img className="pre__logo" src={logoSrc} alt="" width="300" height="83" />
        <div className="pre__meter">
          <span className="pre__bar" ref={bar} />
        </div>
        <span className="pre__count" ref={count}>
          00
        </span>
      </div>
    </div>
  )
}
