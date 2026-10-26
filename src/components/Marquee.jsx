import { MARQUEE } from '../data'

/** Two rows that drift at a constant speed (CSS only, not tied to scrolling). */
export default function Marquee() {
  return (
    <section className="marquee" aria-label="What we build">
      <p className="sr-only">{MARQUEE.join(' ').replace(/✦/g, ',')}</p>
      <div className="mq" aria-hidden="true">
        {MARQUEE.map((t, i) => (
          <div className={`mq__row ${i % 2 ? 'mq__row--rev' : ''}`} key={t}>
            <div className="mq__track">
              {[0, 1].map((k) => (
                <span className="mq__set" key={k}>
                  {Array.from({ length: 3 }, (_, n) => (
                    <span key={n}>{t}<b>  ✦  </b></span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
