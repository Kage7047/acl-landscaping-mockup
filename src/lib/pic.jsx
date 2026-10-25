import meta from '../content/imgmeta.json'

const BASE = import.meta.env.BASE_URL

export const picSrc = (s) => `${BASE}img/p/${s}.webp`

/** Image from the crawled/optimised library (public/img/p). */
export function Pic({ s, alt = '', sizes = '100vw', eager = false, className, style }) {
  const m = meta[s] || [1500, 1000]
  return (
    <img
      className={className}
      style={style}
      src={picSrc(s)}
      srcSet={`${BASE}img/p/${s}-sm.webp 640w, ${BASE}img/p/${s}.webp ${m[0]}w`}
      sizes={sizes}
      width={m[0]}
      height={m[1]}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : undefined}
      draggable="false"
    />
  )
}

export const picItem = (s, alt = '', cap = '', tag = '') => {
  const m = meta[s] || [1500, 1000]
  return { src: picSrc(s), srcSet: `${BASE}img/p/${s}-sm.webp 640w, ${BASE}img/p/${s}.webp ${m[0]}w`, width: m[0], height: m[1], alt, cap, tag }
}
