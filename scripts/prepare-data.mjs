// Build-dən əvvəl işləyir: atalar sözlərinə və qəhrəmanlara URL adları (slug) əlavə edir
import fs from 'node:fs';
import { slugify } from '../src/lib/site.js';

const root = new URL('..', import.meta.url).pathname;
const read = (p) => JSON.parse(fs.readFileSync(root + p, 'utf8'));
const write = (p, d) => { fs.mkdirSync(root + p.replace(/\/[^/]+$/, ''), { recursive: true }); fs.writeFileSync(root + p, JSON.stringify(d)); };

function unique(items, make) {
  const seen = new Map();
  return items.map((it) => {
    let s = make(it) || 'x';
    const n = (seen.get(s) || 0) + 1;
    seen.set(s, n);
    return n > 1 ? `${s}-${n}` : s;
  });
}

// Atalar sözləri: [ID, mətn, izah, mövzu1, mövzu2?]
const at = read('src/data/atalar.json');
const atSlugs = unique(at, (r) => slugify(r[1], 70));
const atOut = at.map((r, i) => ({ id: r[0], s: atSlugs[i], t: r[1], m: r[2], tp: r.slice(3) }));
write('src/data/gen/atalar.json', atOut);
write('public/data/atalar.json', atOut);

// Qəhrəmanlar: [soyad, ad, ata adı, dövr, fəxri ad, doğum, ölüm, ölüm növü, yer, fərman, qısa məlumat, mənbə]
const qh = read('src/data/qehremanlar.json');
const qhSlugs = unique(qh, (r) => slugify(`${r[1]} ${r[0]} ${r[2]}`));
const qhOut = qh.map((r, i) => ({ s: qhSlugs[i], sn: r[0], fn: r[1], pat: r[2], cat: r[3], tt: r[4], born: r[5], died: r[6], dk: r[7], place: r[8], award: r[9], bio: r[10] }));
write('src/data/gen/qehremanlar.json', qhOut);
write('public/data/qehremanlar.json', qhOut);

console.log(`hazırlandı: ${atOut.length} atalar sözü, ${qhOut.length} qəhrəman`);
