import sharp from 'sharp'; import fs from 'fs'; import path from 'path'
const LIST = process.env.LIST || '../crawl/imgs.json'
const list = JSON.parse(fs.readFileSync(LIST,'utf8'))
const OUT = 'public/img/p'; fs.mkdirSync(OUT,{recursive:true})
const slug = p => p.replace(/^\//,'').replace(/\.[a-z0-9]+$/i,'').replace(/[^a-zA-Z0-9]+/g,'-').toLowerCase().replace(/^-|-$/g,'')
const manifest = fs.existsSync('../crawl/img-manifest.json') ? JSON.parse(fs.readFileSync('../crawl/img-manifest.json','utf8')) : {}
let i = 0, fail = []
async function one(p){
  const s = slug(p)
  const url = 'https://www.austincreativelandscaping.com' + p.split('/').map(encodeURIComponent).join('/').replace(/%2B/g,'+')
  try {
    let r = await fetch(url)
    if(!r.ok) r = await fetch('https://www.austincreativelandscaping.com'+encodeURI(p))
    if(!r.ok) throw new Error(r.status)
    const buf = Buffer.from(await r.arrayBuffer())
    const im = sharp(buf,{failOn:'none'}).rotate()
    const m = await im.metadata()
    const meta = await sharp(await im.clone().resize({width:1500,withoutEnlargement:true}).webp({quality:72}).toBuffer()).metadata()
    await im.clone().resize({width:1500,withoutEnlargement:true}).webp({quality:72}).toFile(`${OUT}/${s}.webp`)
    await im.clone().resize({width:640,withoutEnlargement:true}).webp({quality:68}).toFile(`${OUT}/${s}-sm.webp`)
    manifest[p] = { s, w: meta.width, h: meta.height }
  } catch(e){ fail.push([p,String(e)]) }
  if(++i % 20 === 0) console.log(i, '/', list.length)
}
const q = [...list]; await Promise.all(Array.from({length:Number(process.env.CONC||6)},async()=>{ while(q.length) await one(q.shift()) }))
fs.writeFileSync('../crawl/img-manifest.json', JSON.stringify(manifest,null,1))
console.log('done', Object.keys(manifest).length, 'failed', fail.length, fail.slice(0,8))
