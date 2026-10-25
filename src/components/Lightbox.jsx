import { useCallback, useEffect, useRef } from 'react'
import { getLenis } from '../lib/smooth'

/** Accessible full-screen viewer. items: [{ src, srcSet, width, height, alt, cap, tag }] */
export default function Lightbox({ items, index, onIndex, onClose, opener }) {
  const dialog = useRef(null)
  const open = index !== null && index !== undefined
  const step = useCallback((d) => onIndex((i) => (i + d + items.length) % items.length), [items.length, onIndex])

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    const lenis = getLenis()
    if (open) {
      if (!d.open) d.showModal()
      lenis?.stop()
      document.documentElement.classList.add('lightbox-open')
    } else {
      if (d.open) d.close()
      lenis?.start()
      document.documentElement.classList.remove('lightbox-open')
      opener?.current?.focus?.()
    }
    return () => {
      document.documentElement.classList.remove('lightbox-open')
      getLenis()?.start()
    }
  }, [open, opener])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, step])

  const cur = open ? items[index] : null
  return (
    <dialog className="lb" ref={dialog} aria-label="Photo viewer" onClose={onClose} onClick={(e) => e.target === dialog.current && onClose()}>
      {cur && (
        <figure className="lb__fig">
          <img src={cur.src} srcSet={cur.srcSet} sizes="92vw" alt={cur.alt || cur.cap || ''} width={cur.width} height={cur.height} />
          {(cur.cap || cur.tag) && (
            <figcaption>
              {cur.tag && <small>{cur.tag}</small>}
              {cur.cap}
              <span className="lb__count">
                {index + 1} / {items.length}
              </span>
            </figcaption>
          )}
        </figure>
      )}
      <button type="button" className="lb__btn lb__close" onClick={onClose} aria-label="Close viewer" autoFocus>
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      {items.length > 1 && (
        <>
          <button type="button" className="lb__btn lb__prev" onClick={() => step(-1)} aria-label="Previous photo">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" className="lb__btn lb__next" onClick={() => step(1)} aria-label="Next photo">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}
    </dialog>
  )
}
