import { Link } from 'react-router-dom'
import { Pic } from '../lib/pic'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
function splitDate(s) {
  const d = new Date(s)
  if (Number.isNaN(+d)) return { day: '', mon: s, year: '' }
  return { day: String(d.getDate()), mon: MONTHS[d.getMonth()], year: String(d.getFullYear()), iso: d.toISOString().slice(0, 10) }
}

/** Horizontal list row: big date, big title, excerpt, small thumbnail. */
export function PostRow({ post, lead = false }) {
  const d = splitDate(post.date)
  const url = `/blog/${post.slug}`
  return (
    <article className={`prow ${lead ? 'prow--lead' : ''}`} data-reveal>
      <time className="prow__date" dateTime={d.iso}>
        <span className="prow__day">{d.day}</span>
        <span className="prow__mon">
          {d.mon} {d.year}
        </span>
      </time>
      <div className="prow__body">
        <p className="prow__meta">
          <span>{post.cat}</span>
          <span>{post.mins} min read</span>
        </p>
        <h3 className="prow__title">
          <Link to={url}>{post.title}</Link>
        </h3>
        <p className="prow__ex">{post.excerpt}</p>
      </div>
      <Link to={url} className="prow__media" aria-hidden="true" tabIndex={-1}>
        {post.img && <Pic s={post.img} alt="" sizes={lead ? '(min-width: 960px) 28vw, 40vw' : '(min-width: 960px) 16vw, 30vw'} />}
        <span className="prow__go">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </Link>
    </article>
  )
}

export function ProjectCard({ p }) {
  return (
    <article className="prcard" data-reveal>
      <Link to={`/projects/${p.slug}`} className="prcard__link" aria-label={`${p.title}: view project`}>
        <div className="prcard__media">{p.cover && <Pic s={p.cover} alt="" sizes="(min-width: 960px) 33vw, 100vw" />}</div>
        <div className="prcard__body">
          <ul className="prcard__tags" aria-label="Services">
            {p.tags.slice(0, 3).map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <h3>{p.title}</h3>
          <p>{p.desc}</p>
          <span className="prcard__go">
            View project
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  )
}
