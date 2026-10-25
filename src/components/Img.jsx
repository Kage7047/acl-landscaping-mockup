import { img } from '../data'

export default function Img({ name, alt = '', sizes = '100vw', eager = false, className, style }) {
  const f = img(name)
  return (
    <img
      className={className}
      style={style}
      src={f.src}
      srcSet={f.srcSet}
      sizes={sizes}
      width={f.width}
      height={f.height}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : undefined}
      draggable="false"
    />
  )
}
