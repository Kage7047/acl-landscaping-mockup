// GitHub Pages has no server-side routing, so give every route its own index.html (served with a 200) plus a 404 fallback.
import fs from 'fs'
import path from 'path'
const dist = 'dist'
const html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const read = (f) => JSON.parse(fs.readFileSync(`src/content/${f}.json`, 'utf8'))
const routes = [
  'about', 'our-services', 'project-gallery', 'blog', 'contact', 'join-the-team', 'application', 'thank-you',
  'landscape-design', 'hardscaping', 'artificial-turf', 'all-things-gabion', 'planters', 'landscape-lighting', 'drainage', 'pool-scaping',
  'author/abey-bruce', 'author/christan-bruce',
  ...read('projects').map((p) => `projects/${p.slug}`),
  ...read('blog').map((p) => `blog/${p.slug}`),
]
for (const r of routes) {
  const dir = path.join(dist, r)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), html)
}
fs.writeFileSync(path.join(dist, '404.html'), html)
console.log(`postbuild: ${routes.length} route pages + 404.html`)
