import { useEffect, useRef, useState } from 'react'
import { logoSrc, SITE } from '../data'
import { getLenis, scrollToTarget } from '../lib/smooth'
import Magnet from './rb/Magnet'

const LINKS = [
  ['Services', '#services'],
  ['Process', '#process'],
  ['Work', '#work'],
  ['Reviews', '#reviews'],
  ['Contact', '#contact'],
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const last = useRef(0)
  const btn = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      if (!open) setHidden(y > last.current && y > 360)
      last.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
    const lenis = getLenis()
    if (lenis) open ? lenis.stop() : lenis.start()
    const onKey = (e) => {
      if (e.key === 'Escape' && open) {
        setOpen(false)
        btn.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    // wait a frame so Lenis is running again before it scrolls
    requestAnimationFrame(() => scrollToTarget(href, href === '#top' ? 0 : -20))
  }

  return (
    <>
      <header className={`nav ${hidden ? 'nav--hidden' : ''} ${scrolled ? 'nav--solid' : ''}`}>
        <div className="nav__bar">
          <a href="#top" className="nav__logo" onClick={(e) => go(e, '#top')} aria-label={`${SITE.name}, back to top`}>
            <img src={logoSrc} alt="" width="150" height="42" />
          </a>
          <nav className="nav__links" aria-label="Primary">
            {LINKS.map(([label, href]) => (
              <a key={href} href={href} onClick={(e) => go(e, href)}>
                {label}
              </a>
            ))}
          </nav>
          <div className="nav__cta">
            <a className="nav__phone" href={SITE.phoneHref}>
              {SITE.phone}
            </a>
            <Magnet padding={60} magnetStrength={4}>
              <a className="btn btn--primary btn--sm" href="#contact" onClick={(e) => go(e, '#contact')}>
                Free consultation
              </a>
            </Magnet>
          </div>
          <button
            ref={btn}
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <span className="nav__burger" aria-hidden="true" />
          </button>
        </div>
      </header>

      <div id="mobile-menu" className={`menu ${open ? 'menu--open' : ''}`} inert={!open}>
        <nav aria-label="Mobile">
          {LINKS.map(([label, href], i) => (
            <a key={href} href={href} onClick={(e) => go(e, href)} tabIndex={open ? 0 : -1} style={{ '--i': i }}>
              {label}
            </a>
          ))}
        </nav>
        <div className="menu__foot">
          <a href={SITE.phoneHref} tabIndex={open ? 0 : -1}>
            {SITE.phone}
          </a>
          <a href={`mailto:${SITE.email}`} tabIndex={open ? 0 : -1}>
            {SITE.email}
          </a>
        </div>
      </div>
    </>
  )
}
