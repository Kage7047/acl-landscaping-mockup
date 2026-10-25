import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Preloader from './components/Preloader'
import Header from './components/Header'
import Footer from './components/Footer'
import ClickSpark from './components/rb/ClickSpark'
import Home from './pages/Home'
const ServicesIndex = lazy(() => import('./pages/ServicesIndex'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Project = lazy(() => import('./pages/Project'))
const Blog = lazy(() => import('./pages/Blog'))
const Post = lazy(() => import('./pages/Post'))
const Contact = lazy(() => import('./pages/Contact'))
const Join = lazy(() => import('./pages/Careers').then((m) => ({ default: m.Join })))
const Apply = lazy(() => import('./pages/Careers').then((m) => ({ default: m.Apply })))
const ThankYou = lazy(() => import('./pages/Misc').then((m) => ({ default: m.ThankYou })))
const NotFound = lazy(() => import('./pages/Misc').then((m) => ({ default: m.NotFound })))
const About = lazy(() => import('./pages/Static').then((m) => ({ default: m.About })))
const ServicePage = lazy(() => import('./pages/Static').then((m) => ({ default: m.ServicePage })))
const Author = lazy(() => import('./pages/Static').then((m) => ({ default: m.Author })))
import { SITE } from './data'
import { SERVICE_PAGES } from './lib/nav'
import { startSmoothScroll, stopSmoothScroll, getLenis } from './lib/smooth'
import { useReducedMotionState } from './lib/motion'

function RouteEffects() {
  const { pathname } = useLocation()
  useEffect(() => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)
    const t = setTimeout(() => {
      getLenis()?.resize()
      ScrollTrigger.refresh()
    }, 150)
    return () => clearTimeout(t)
  }, [pathname])
  return null
}

const seen = () => {
  try {
    return sessionStorage.getItem('acl-seen') === '1'
  } catch {
    return false
  }
}

export default function App() {
  const [ready, setReady] = useState(seen())
  const [showPre] = useState(!seen())
  const location = useLocation()
  const pathname = location.pathname
  const reduced = useReducedMotionState()
  const [fab, setFab] = useState(false)
  const onDone = useCallback(() => {
    try {
      sessionStorage.setItem('acl-seen', '1')
    } catch {
      /* ignore */
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    const onScroll = () => setFab(window.scrollY > 700)
    window.addEventListener('scroll', onScroll, { passive: true })
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)
    return () => {
      window.removeEventListener('load', refresh)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (reduced) stopSmoothScroll()
    else startSmoothScroll()
    return () => stopSmoothScroll()
  }, [reduced])

  return (
    <ClickSpark sparkColor="#c7d98b" shape="streak" sparkCount={9} sparkRadius={26} sparkSize={12} duration={650} layer="front">
      <a className="skip" href="#main">
        Skip to content
      </a>
      {showPre && <Preloader onDone={onDone} />}
      <RouteEffects />
      <Header />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<div className="route-loading" role="status" aria-label="Loading" />}>
        <div className="route" key={pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home ready={ready} />} />
          <Route path="/about" element={<About />} />
          <Route path="/our-story" element={<Navigate to="/about" replace />} />
          <Route path="/our-services" element={<ServicesIndex />} />
          {SERVICE_PAGES.map((s) => (
            <Route key={s.slug} path={`/${s.slug}`} element={<ServicePage slug={s.slug} />} />
          ))}
          <Route path="/project-gallery" element={<Gallery />} />
          <Route path="/projects" element={<Navigate to="/project-gallery" replace />} />
          <Route path="/projects/:slug" element={<Project />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Post />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/join-the-team" element={<Join />} />
          <Route path="/application" element={<Apply />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/author/abey-bruce" element={<Author who="abey-bruce" />} />
          <Route path="/author/christan-bruce" element={<Author who="christan-bruce" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
        </Suspense>
      </main>
      <Footer />
      <a className={`callfab ${fab ? 'callfab--show' : ''}`} tabIndex={fab ? 0 : -1} href={SITE.phoneHref} aria-label={`Call ${SITE.phone}`}>
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.25c1.1.37 2.3.57 3.6.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z" fill="currentColor" />
        </svg>
        <span>Call</span>
      </a>
    </ClickSpark>
  )
}
