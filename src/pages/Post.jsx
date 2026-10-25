import { useEffect, useMemo, useRef } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import CtaBand from '../components/CtaBand'
import { PostCard } from '../components/Cards'
import { Pic } from '../lib/pic'
import { useReveal } from '../components/useReveal'
import { useMeta } from '../lib/useMeta'
import { scrollToTarget } from '../lib/smooth'
import posts from '../content/blog.json'

const slugify = (t) => t.toLowerCase().replace(/&[a-z#0-9]+;/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export default function Post() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)
  const nav = useNavigate()
  const root = useReveal([slug])
  const body = useRef(null)
  useMeta(post?.title, post?.excerpt)

  const { html, toc } = useMemo(() => {
    if (!post) return { html: '', toc: [] }
    const toc = []
    const html = post.html.replace(/<h3>([\s\S]*?)<\/h3>/g, (m, inner) => {
      const text = inner.replace(/<[^>]+>/g, '')
      const id = slugify(text)
      toc.push({ id, text: text.replace(/&amp;/g, '&').replace(/&#x27;/g, '’') })
      return `<h3 id="${id}">${inner}</h3>`
    })
    return { html, toc }
  }, [post])

  // internal links inside the article body use the router
  useEffect(() => {
    const el = body.current
    if (!el) return
    const onClick = (e) => {
      const a = e.target.closest('a[data-route]')
      if (a) {
        e.preventDefault()
        nav(a.getAttribute('href'))
      }
    }
    el.addEventListener('click', onClick)
    return () => el.removeEventListener('click', onClick)
  }, [nav, slug])

  if (!post) return <Navigate to="/blog" replace />
  const others = posts.filter((p) => p.slug !== slug)
  const related = [...others.filter((p) => p.cat === post.cat), ...others.filter((p) => p.cat !== post.cat)].slice(0, 3)

  return (
    <div ref={root}>
      <PageHero
        eyebrow={post.cat}
        title={post.title}
        image={post.imgs[1] || post.img}
        crumbs={[['Home', '/'], ['Blog', '/blog'], [post.title]]}
        lead={[`<span class="phero__meta">By Austin Creative Landscaping &middot; ${post.date} &middot; ${post.mins} min read</span>`]}
      />
      <section className="sec sec--paper">
        <div className="container art">
          {toc.length > 2 && (
            <aside className="art__toc" aria-label="In this article">
              <p>In this article</p>
              <ol>
                {toc.map((t, i) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToTarget(`#${t.id}`, -110)
                      }}
                    >
                      <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                      {t.text}
                    </a>
                  </li>
                ))}
              </ol>
            </aside>
          )}
          <article className="art__body" ref={body}>
            {post.img && (
              <figure className="art__cover">
                <Pic s={post.img} alt="" sizes="(min-width: 960px) 760px, 100vw" />
              </figure>
            )}
            <div className="art__text" dangerouslySetInnerHTML={{ __html: html }} />
            <div className="art__end">
              <p>
                Written by the team at <strong>Austin Creative Landscaping</strong>, a design/build landscaping company in South Austin since 2008.
              </p>
              <Link className="link link--dark" to="/author/abey-bruce">
                About the author
              </Link>
            </div>
          </article>
        </div>
      </section>
      <CtaBand title="Get a free Austin landscaping quote" text="Tell us about your yard. Your first 30-minute consultation is on us." />
      <section className="sec sec--cream" aria-labelledby="more-posts">
        <div className="container">
          <header className="sec__head" data-reveal>
            <h2 id="more-posts" className="sec__title">
              Keep reading
            </h2>
            <Link className="link link--dark" to="/blog">
              All articles
            </Link>
          </header>
          <div className="pgrid">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
