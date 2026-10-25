import Hero from '../components/Hero'
import Badges from '../components/Badges'
import Marquee from '../components/Marquee'
import Story from '../components/Story'
import Services from '../components/Services'
import Process from '../components/Process'
import Gallery from '../components/Gallery'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import { useMeta } from '../lib/useMeta'

export default function Home({ ready }) {
  useMeta('', 'Design/build landscaping in South Austin and the Texas Hill Country: landscape design, hardscapes, steel and gabions, artificial turf and lighting.')
  return (
    <>
      <Hero ready={ready} />
      <Badges />
      <Marquee />
      <Story />
      <Services />
      <Process />
      <Gallery />
      <Testimonials />
      <Contact />
    </>
  )
}
