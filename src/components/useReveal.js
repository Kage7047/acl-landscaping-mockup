import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useReducedMotionState } from '../lib/motion'

/** Fades/raises every [data-reveal] inside the returned ref as it scrolls into view. */
export function useReveal(deps = []) {
  const root = useRef(null)
  const reduced = useReducedMotionState()
  useGSAP(
    () => {
      if (reduced) return
      const els = gsap.utils.toArray('[data-reveal]', root.current)
      gsap.set(els, { autoAlpha: 0, y: 34 })
      const io = els.length
        ? gsap.context(() => {
            els.forEach((el) => {
              gsap.to(el, {
                autoAlpha: 1,
                y: 0,
                duration: 0.9,
                ease: 'power3.out',
                delay: Number(el.dataset.delay || 0),
                scrollTrigger: { trigger: el, start: 'top 90%', once: true },
              })
            })
          }, root)
        : null
      return () => io?.revert()
    },
    { scope: root, dependencies: [reduced, ...deps], revertOnUpdate: true },
  )
  return root
}
