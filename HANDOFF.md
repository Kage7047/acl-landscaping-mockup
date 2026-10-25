# Multi-page build: status (usage limit hit mid-work)

Live site (gh-pages) is still the earlier ONE-PAGE version and is unaffected. Local tree is mid-refactor and does not build yet. Nothing from this stage is committed.

## Done
- 180 site images optimised into public/img/p (tools/getimgs.mjs). Content scraped to src/content/{pages,projects,blog,imgmeta}.json (crawl script: ../crawl/build_content.py).
- react-router-dom installed. Written: lib/{pic,useMeta,nav}, components/{Lightbox,useReveal,PageHero,CtaBand,ConsultForm,ProjectMatch,BeforeAfter,Cards,Badges}, pages/{ContentPage,ServicesIndex,Gallery,Project,Blog,Post,Contact,Careers,Misc,Home,Static}.
- Home components already re-linked to router (Hero, Services, Story, Gallery).

## Left
1. Header (Services dropdown + NavLink), Footer (router links, Join Our Team, award link) rewrite.
2. Home Contact section: swap old form for <ConsultForm compact />.
3. App.jsx: BrowserRouter basename, Routes (/, /about, /our-services, 8 service slugs, /project-gallery, /projects/:slug, /blog, /blog/:slug, /contact, /join-the-team, /application, /thank-you, /author/:who, redirects /our-story->/about, /projects->/project-gallery, * NotFound), scroll-to-top + ScrollTrigger.refresh on route change, preloader once per session. main.jsx wrap.
4. CSS for all new classes (phero, sec, cards, shots, figs, svcgrid, prgrid, pcard, prcard, masonry, ba, art, pj, match, cta, badges, cform, filters, crumbs, tl, benefits, cpage...). Added to styles.css.
5. Post-build step: copy dist/index.html into dist/<route>/index.html for every route (GitHub Pages deep links) + 404.html.
6. Text-overflow / clipping QA at 390, 768, 1368 px on every page template (user request), plus console check, then build, commit, deploy (npx gh-pages -d dist --dotfiles).
