# Austin Creative Landscaping: concept homepage

A design concept for Austin Creative Landscaping, built as a free homepage mockup.
Not the live website. Content (copy, reviews, contact details, photos) comes from the client's public site.

**Stack:** Vite, React, GSAP (ScrollTrigger, SplitText), Lenis smooth scroll, and React Bits components
(SplitText, ScrollReveal, ScrollVelocity, CountUp, SpotlightCard, Magnet, ClickSpark).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173/acl-landscaping-mockup/
npm run build
npm run deploy   # publishes dist/ to the gh-pages branch
```

## Notes

- Motion follows the visitor's OS "reduce motion" setting. Override with `?motion=on` / `?motion=off`, or the toggle in the footer.
- The enquiry form is a front-end demo only. In production it would post to the client's inbox or CRM.
- `robots: noindex` is set so the concept never competes with the live site in search.
