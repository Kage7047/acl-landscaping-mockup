import { Pic } from '../lib/pic'

/** One lead photo, up to four tiles, and a "show all" button (layout pattern from Kombai Gallery). */
export default function Mosaic({ photos, onOpen, label = 'Project photos' }) {
  const shown = photos.slice(0, 5)
  return (
    <section className="sec sec--paper sec--tight" aria-label={label}>
      <div className="container">
        <div className={`mosaic mosaic--${shown.length}`}>
          {shown.map((g, i) => (
            <button
              key={g.s}
              type="button"
              className="mosaic__tile"
              onClick={(e) => onOpen(i, e.currentTarget)}
              aria-label={`Enlarge photo ${i + 1} of ${photos.length}${g.alt ? `: ${g.alt}` : ''}`}
            >
              <Pic s={g.s} alt="" eager={i === 0} sizes={i === 0 ? '(min-width: 960px) 50vw, 100vw' : '(min-width: 960px) 25vw, 50vw'} />
            </button>
          ))}
          <button type="button" className="mosaic__all" onClick={(e) => onOpen(0, e.currentTarget)}>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            Show all {photos.length} photos
          </button>
        </div>
      </div>
    </section>
  )
}
