import { Link } from 'react-router-dom'
import { Pic } from '../lib/pic'

export function PostCard({ post, featured = false }) {
  return (
    <article className={`pcard ${featured ? 'pcard--feat' : ''}`} data-reveal>
      <Link to={`/blog/${post.slug}`} className="pcard__media" aria-hidden="true" tabIndex={-1}>
        {post.img && <Pic s={post.img} alt="" sizes={featured ? '(min-width: 960px) 55vw, 100vw' : '(min-width: 960px) 30vw, 100vw'} />}
      </Link>
      <div className="pcard__body">
        <p className="pcard__meta">
          <span>{post.cat}</span>
          <span>{post.date}</span>
          <span>{post.mins} min read</span>
        </p>
        <h3 className="pcard__title">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="pcard__ex">{post.excerpt}</p>
        <Link className="link link--dark" to={`/blog/${post.slug}`} aria-label={`Read: ${post.title}`}>
          Read article
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
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
