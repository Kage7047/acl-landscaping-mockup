import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { logoSrc, SITE } from '../data'
import { SERVICE_PAGES } from '../lib/nav'
import { getLenis } from '../lib/smooth'
import Magnet from './rb/Magnet'

const LINKS = [
  ['About', '/about'],
  ['Gallery', '/project-gallery'],
  ['Blog', '/blog'],
  ['Contact', '/contact'],
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [dd, setDd] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const last = useRef(0)
  const btn = useRef(null)
  const ddRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
    setDd(false)
    setHidden(false)
  }, [pathname])

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
      if (e.key === 'Escape') {
        if (open) {
          setOpen(false)
          btn.current?.focus()
        }
        setDd(false)
      }
    }
    const onDoc = (e) => {
      if (ddRef.current && !ddRef.current.contains(e.target)) setDd(false)
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDoc)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDoc)
    }
  }, [open])

  return (
    <>
      <header className={`nav ${hidden ? 'nav--hidden' : ''} ${scrolled ? 'nav--solid' : ''}`}>
        <div className="nav__bar">
          <Link to="/" className="nav__logo" aria-label={`${SITE.name}, home`}>
            <img src={logoSrc} alt="" width="150" height="42" />
          </Link>
          <nav className="nav__links" aria-label="Primary">
            <NavLink to="/" end>
              Home
            </NavLink>
            <div className="nav__dd" ref={ddRef} onMouseEnter={() => setDd(true)} onMouseLeave={() => setDd(false)}>
              <button type="button" aria-expanded={dd} aria-controls="svc-menu" onClick={() => setDd((v) => !v)}>
                Services
                <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <ul id="svc-menu" className={dd ? 'is-open' : ''}>
                <li>
                  <Link to="/our-services" tabIndex={dd ? 0 : -1}>
                    All services
                  </Link>
                </li>
                {SERVICE_PAGES.map((s) => (
                  <li key={s.slug}>
                    <Link to={`/${s.slug}`} tabIndex={dd ? 0 : -1}>
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {LINKS.map(([label, to]) => (
              <NavLink key={to} to={to}>
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="nav__cta">
            <a className="nav__phone" href={SITE.phoneHref}>
              {SITE.phone}
            </a>
            <Magnet padding={60} magnetStrength={4}>
              <Link className="btn btn--primary btn--sm" to="/contact">
                Free consultation
              </Link>
            </Magnet>
          </div>
          <button ref={btn} className="nav__toggle" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)}>
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <span className="nav__burger" aria-hidden="true" />
          </button>
        </div>
      </header>

      <div id="mobile-menu" className={`menu ${open ? 'menu--open' : ''}`} inert={!open}>
        <nav aria-label="Mobile">
          <Link to="/" style={{ '--i': 0 }}>
            Home
          </Link>
          <Link to="/our-services" style={{ '--i': 1 }}>
            Services
          </Link>
          {LINKS.map(([label, to], i) => (
            <Link key={to} to={to} style={{ '--i': i + 2 }}>
              {label}
            </Link>
          ))}
        </nav>
        <ul className="menu__svc" aria-label="Services">
          {SERVICE_PAGES.map((s) => (
            <li key={s.slug}>
              <Link to={`/${s.slug}`}>{s.label}</Link>
            </li>
          ))}
        </ul>
        <div className="menu__foot">
          <a href={SITE.phoneHref}>{SITE.phone}</a>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </div>
      </div>
    </>
  )
}
