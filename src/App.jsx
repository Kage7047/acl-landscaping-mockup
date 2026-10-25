import { useCallback, useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Preloader from './components/Preloader'
import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Story from './components/Story'
import Services from './components/Services'
import Process from './components/Process'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ClickSpark from './components/rb/ClickSpark'
import { SITE } from './data'
import { startSmoothScroll, stopSmoothScroll, getLenis } from './lib/smooth'
import { useReducedMotionState } from './lib/motion'

export default function App() {
  const [ready, setReady] = useState(false)
  const onDone = useCallback(() => setReady(true), [])
  const reduced = useReducedMotionState()
  const [fab, setFab] = useState(false)

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
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

  useEffect(() => {
    getLenis()?.resize()
  }, [ready])

  return (
    <ClickSpark sparkColor="#c7d98b" shape="streak" sparkCount={9} sparkRadius={26} sparkSize={12} duration={650} layer="front">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Preloader onDone={onDone} />
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero ready={ready} />
        <Marquee />
        <Story />
        <Services />
        <Process />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <a className={`callfab ${fab ? 'callfab--show' : ''}`} tabIndex={fab ? 0 : -1} href={SITE.phoneHref} aria-label={`Call ${SITE.phone}`}>
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.25c1.1.37 2.3.57 3.6.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z"
            fill="currentColor"
          />
        </svg>
        <span>Call</span>
      </a>
    </ClickSpark>
  )
}
