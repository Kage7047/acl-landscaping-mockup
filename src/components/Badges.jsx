import { SITE } from '../data'

const ICONS = {
  years: <path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.5 6.6 19.5l1.2-6L3.3 9.3l6.1-.7L12 3z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />,
  leaf: <path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14M5 19c2-4 5-7 9-9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  home: <path d="M4 11l8-7 8 7v8a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1v-8z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />,
  award: <path d="M12 3a5 5 0 100 10 5 5 0 000-10zM8.5 12.5L7 21l5-3 5 3-1.5-8.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
}

const BADGES = [
  { icon: 'years', title: '16+ years', text: 'Serving Austin since 2008' },
  { icon: 'leaf', title: 'Grow Green certified', text: 'City of Austin program, completed twice' },
  { icon: 'home', title: 'Family owned', text: 'South Austin design/build' },
  { icon: 'award', title: '2021 Best Landscape Award', text: 'NewHomeSource', href: SITE.award },
]

export default function Badges() {
  return (
    <section className="badges" aria-label="Credentials">
      <ul className="container badges__list">
        {BADGES.map((b) => {
          const inner = (
            <>
              <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
                {ICONS[b.icon]}
              </svg>
              <span>
                <strong>{b.title}</strong>
                <small>{b.text}</small>
              </span>
            </>
          )
          return (
            <li key={b.title}>
              {b.href ? (
                <a href={b.href} target="_blank" rel="noopener noreferrer" className="badge">
                  {inner}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <div className="badge">{inner}</div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
