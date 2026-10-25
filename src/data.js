const BASE = import.meta.env.BASE_URL

// name -> [full width, sm width, aspect ratio w/h as [w,h] of the full file]
const FILES = {
  hero: [1800, 900, 1800, 1350],
  bomely: [1800, 900, 1800, 1350],
  dusk: [1800, 900, 1800, 1350],
  design: [1693, 900, 1693, 2272],
  hardscape: [1800, 900, 1800, 1350],
  turf: [1740, 900, 1740, 1305],
  'gabions-a': [1080, 700, 1080, 638],
  'gabions-b': [1080, 700, 1080, 700],
  planters: [1800, 900, 1800, 1350],
  'lights-a': [1080, 700, 1080, 709],
  'lights-b': [1080, 700, 1080, 629],
  patio: [1800, 900, 1800, 1350],
  design2: [1800, 900, 1800, 1350],
  native: [1800, 900, 1800, 1200],
}

export const img = (name) => {
  const [full, sm, w, h] = FILES[name]
  return {
    src: `${BASE}img/${name}.webp`,
    srcSet: `${BASE}img/${name}-sm.webp ${sm}w, ${BASE}img/${name}.webp ${full}w`,
    width: w,
    height: h,
  }
}

export const logoSrc = `${BASE}img/logo.png`

export const SITE = {
  name: 'Austin Creative Landscaping',
  phone: '(512) 552-5677',
  phoneHref: 'tel:+15125525677',
  email: 'aclscaping@gmail.com',
  address: '11506 Easy St., Austin, TX 78748',
  facebook: 'https://www.facebook.com/austincreativelandscaping',
  instagram: 'https://www.instagram.com/austincreativelandscaping',
}

export const SERVICES = [
  {
    id: 'design',
    title: 'Landscape Design',
    kicker: 'Imagine. Design. Build.',
    text: 'It all starts with a great design built around your land, your life, and your budget.',
    points: ['Initial consultation', 'Digital landscape plans', 'Residential & commercial'],
    image: 'design',
  },
  {
    id: 'hardscape',
    title: 'Hardscaping',
    kicker: 'Patios, pergolas & walls',
    text: 'Patios, pergolas, walkways, retaining walls and outdoor kitchens built from honest materials that age beautifully in the Texas climate.',
    points: ['Patios & decks', 'Pergolas & shade', 'Retaining walls'],
    image: 'hardscape',
  },
  {
    id: 'turf',
    title: 'Artificial Turf',
    kicker: 'Green all year',
    text: 'Low-maintenance, pet-friendly turf that stays green year-round. No mowing, no irrigation, no brown patches through a Texas drought.',
    points: ['Artificial turf install', 'Pet-friendly turf', 'Year-round green'],
    image: 'turf',
  },
  {
    id: 'steel',
    title: 'Steel & Gabions',
    kicker: 'Cor-Ten craftsmanship',
    text: 'Handcrafted Cor-Ten steel fencing, trellises and gabion walls: bold, sculptural structures that define space and add lasting character.',
    points: ['Gabion retaining walls', 'Cor-Ten steel fencing', 'Trellises & screens'],
    image: 'gabions-b',
  },
  {
    id: 'planters',
    title: 'Custom Planters',
    kicker: 'Built to fit',
    text: 'Custom planter boxes in steel, stone and timber, made to suit your space and planted with natives that thrive in Central Texas.',
    points: ['Steel & timber boxes', 'Limestone planters', 'Native plantings'],
    image: 'planters',
  },
  {
    id: 'lighting',
    title: 'Lighting & Water',
    kicker: 'After-dark atmosphere',
    text: 'Landscape lighting and water features that carry your yard into the evening, with drainage solutions that keep it healthy all year.',
    points: ['Landscape lighting', 'Fountains & features', 'Drainage solutions'],
    image: 'lights-b',
  },
]

export const STEPS = [
  {
    n: '01',
    title: 'Listen',
    text: 'A quiet walk on your property and a conversation about how you live. Your first 30-minute consultation is on us.',
  },
  {
    n: '02',
    title: 'Design',
    text: 'A sketch on paper becomes a digital landscape plan, built around your land, your life and your budget.',
  },
  {
    n: '03',
    title: 'Build',
    text: 'Our in-house crew of craftspeople installs every element, from grading to final plantings.',
  },
  {
    n: '04',
    title: 'Grow',
    text: 'We hand you a yard built to mature beautifully, with care guides and support whenever you need it.',
  },
]

export const GALLERY = [
  { image: 'hero', cap: 'Gabion & Cor-Ten planter', tag: 'Steel & gabions', span: 'g-a' },
  { image: 'bomely', cap: 'Bomely Residence: turf, putting green & steel', tag: 'Artificial turf', span: 'g-b' },
  { image: 'dusk', cap: 'Pavers, turf & string lights', tag: 'Hardscape', span: 'g-c' },
  { image: 'hardscape', cap: 'Limestone beds & poolside path', tag: 'Hardscape', span: 'g-d' },
  { image: 'gabions-b', cap: 'Perforated Cor-Ten screen wall', tag: 'Steel & gabions', span: 'g-e' },
  { image: 'planters', cap: 'Timber screens & limestone planters', tag: 'Planters', span: 'g-f' },
  { image: 'lights-b', cap: 'Landscape lighting at dusk', tag: 'Lighting', span: 'g-g' },
  { image: 'patio', cap: 'Dry creek bed & native stone', tag: 'Drainage', span: 'g-h' },
  { image: 'design2', cap: 'Backyard refresh with native plantings', tag: 'Design', span: 'g-i' },
  { image: 'lights-a', cap: 'Stone fountain feature', tag: 'Water', span: 'g-j' },
  { image: 'native', cap: 'Timber planter with limestone pavers', tag: 'Planters', span: 'g-k' },
]

export const TESTIMONIALS = [
  {
    quote:
      'ACL Scaping has done several major projects on our property. All were done with professionalism and care. Several neighbors have complimented us on the additions. We can highly recommend Abey and his crew for any landscaping job.',
    name: 'Bill & Catherine Lundell',
    place: 'SW Austin',
  },
  {
    quote:
      'Working with Austin Creative Landscaping was clear and easy. Abey has a beautiful sense of how to use space and make it beautiful.',
    name: 'Jessica Goulding',
    place: 'South Austin',
  },
  {
    quote:
      'They transformed our backyard into an incredible outdoor living space. The design, execution, and follow-through were all top notch. Truly one of the best landscaping companies in Austin.',
    name: 'A. Rivera',
    place: 'Buda, TX',
  },
]

export const AREAS = ['Austin', 'South Austin', 'Buda', 'Kyle', 'Dripping Springs', 'Wimberley', 'Lakeway']

export const MARQUEE = [
  'Native plants ✦ Hill Country stone ✦ Custom gabion ✦ Cor-Ten steel ✦ Pergolas ✦ Outdoor kitchens',
  'Irrigation ✦ Landscape lighting ✦ Pool-scaping ✦ Artificial turf ✦ Custom planters ✦ Patios & decks',
]
