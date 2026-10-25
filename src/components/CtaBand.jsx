import { Link } from 'react-router-dom'
import Magnet from './rb/Magnet'

export default function CtaBand({ title = 'Ready to grow something beautiful?', text = 'Your first 30-minute consultation is on us. Let’s walk your land and start sketching.', service }) {
  const to = service ? `/contact?service=${encodeURIComponent(service)}` : '/contact'
  return (
    <section className="cta" aria-label="Book a consultation">
      <div className="container cta__inner" data-reveal>
        <div>
          <h2 className="cta__title">{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta__btns">
          <Magnet padding={60} magnetStrength={4}>
            <Link className="btn btn--primary" to={to}>
              Schedule free consultation
            </Link>
          </Magnet>
          <Link className="btn btn--ghost" to="/project-gallery">
            See our portfolio
          </Link>
        </div>
      </div>
    </section>
  )
}
