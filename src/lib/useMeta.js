import { useEffect } from 'react'

const SUFFIX = ' | Austin Creative Landscaping (concept)'

/** Sets the document title and meta description for the current page. */
export function useMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title}${SUFFIX}` : `Austin Creative Landscaping | Design/build landscaping in South Austin (concept)`
    if (description) {
      let m = document.querySelector('meta[name="description"]')
      if (!m) {
        m = document.createElement('meta')
        m.name = 'description'
        document.head.appendChild(m)
      }
      m.content = description
    }
  }, [title, description])
}
