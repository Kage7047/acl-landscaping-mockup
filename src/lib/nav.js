// One list of services used by the header, footer, services page and quiz.
export const SERVICE_PAGES = [
  { slug: 'landscape-design', label: 'Landscape Design', short: 'From first sketch to digital plan, built around your land, your light and the way you live.', hero: 'driftwood-ranch-after', service: 'Landscape design' },
  { slug: 'hardscaping', label: 'Hardscaping & Patios', short: 'Patios, pergolas, walkways, retaining walls and outdoor kitchens built from honest materials.', hero: 'hardscaping-cover-picture-for-website', service: 'Hardscaping & patios' },
  { slug: 'artificial-turf', label: 'Artificial Turf', short: 'Stay-green, low-maintenance turf designed for the Texas climate. No mowing, no watering.', hero: 'artificial-turf-and-lighting-cover-for-website', service: 'Artificial turf' },
  { slug: 'all-things-gabion', label: 'Steel & Gabions', short: 'Handcrafted Cor-Ten steel, gabion walls, benches and screens that define space.', hero: 'gabion-cover-for-website', service: 'Steel & gabions' },
  { slug: 'planters', label: 'Custom Planters', short: 'Steel, stone and cedar planter boxes, gabion features and raised beds made to fit.', hero: 'planter-boxes-and-gabion-cover-picture-for-website', service: 'Custom planters' },
  { slug: 'landscape-lighting', label: 'Landscape Lighting', short: 'Lighting and water features that carry your yard into the evening.', hero: 'landscape-lighting-leander-patio-night', service: 'Landscape lighting & water' },
  { slug: 'drainage', label: 'Drainage Solutions', short: 'French drains, dry creek beds and regrading, so water goes where you want it.', hero: 'new-img-4772', service: 'Drainage solutions' },
  { slug: 'pool-scaping', label: 'Pool Scaping', short: 'Decking, stone patios, lighting and planting built for Austin’s outdoor lifestyle.', hero: 'bomely-residence', service: 'Pool-scaping' },
]

export const SERVICE_OPTIONS = [...SERVICE_PAGES.map((s) => s.service), 'Not sure yet']
export const TIMELINES = [
  { id: 'asap', label: 'ASAP', note: 'Ready to start now', value: 'ASAP' },
  { id: '1-3', label: '1–3 months', note: 'Planning ahead', value: '1-3 months' },
  { id: '3-6', label: '3–6 months', note: 'Future project', value: '3-6 months' },
  { id: 'explore', label: 'Just exploring', note: 'Getting a feel for cost', value: 'Just exploring' },
]
