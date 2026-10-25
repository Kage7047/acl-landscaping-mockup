import ScrollVelocity from './rb/ScrollVelocity'
import { MARQUEE } from '../data'

export default function Marquee() {
  return (
    <section className="marquee" aria-label="What we build">
      <p className="sr-only">{MARQUEE.join(' ').replace(/✦/g, ',')}</p>
      <div aria-hidden="true">
        <ScrollVelocity
          texts={MARQUEE}
          velocity={55}
          numCopies={4}
          separator="  ✦  "
          outlineAlternate
          fadeEdges
          scrollerClassName="scroller marquee__row"
        />
      </div>
    </section>
  )
}
