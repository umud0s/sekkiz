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

// Admin panelin faylları: src/data/cms/<qovluq>/*.json
const dir = (p) => fs.readdirSync(root + p).filter((f) => f.endsWith('.json')).sort().map((f) => read(`${p}/${f}`));

// Atalar sözləri: hər hərf ayrıca faylda, ID sırası ilə birləşdirilir
const at = dir('src/data/cms/atalar').flatMap((h) => h.sozler);
// Admin paneldən nömrəsiz əlavə olunan atalar sözünə növbəti boş nömrə verilir
let maxId = Math.max(...at.map((r) => +r.id || 0));
for (const r of at) if (!+r.id) r.id = ++maxId;
at.sort((a, b) => a.id - b.id);
const atSlugs = unique(at, (r) => slugify(r.metn, 70));
const atOut = at.map((r, i) => ({ id: r.id, s: atSlugs[i], t: r.metn, m: r.izah, tp: r.movzular || [] }));
write('src/data/gen/atalar.json', atOut);
write('public/data/atalar.json', atOut);

// Qəhrəmanlar: hər qəhrəman ayrıca faylda, soyad və ada görə sıralanır
const qh = dir('src/data/cms/qehremanlar').sort((a, b) => a.soyad.localeCompare(b.soyad, 'az') || a.ad.localeCompare(b.ad, 'az'));
const qhSlugs = unique(qh, (r) => slugify(`${r.ad} ${r.soyad} ${r.ata_adi || ''}`));
const qhOut = qh.map((r, i) => ({ s: qhSlugs[i], sn: r.soyad, fn: r.ad, pat: r.ata_adi || '', cat: r.dovr, tt: +r.fexri_ad, born: r.dogum || '', died: r.olum || '', dk: r.olum_novu || '', place: r.yer || '', award: r.ferman || '', bio: r.melumat || '' }));
write('src/data/gen/qehremanlar.json', qhOut);
write('public/data/qehremanlar.json', qhOut);

// Admin panelin proqramı npm paketindən sayta köçürülür (kənar CDN-dən asılı olmasın deyə)
const cms = root + 'node_modules/@sveltia/cms/dist/';
fs.mkdirSync(root + 'public/admin/chunks', { recursive: true });
fs.copyFileSync(cms + 'sveltia-cms.js', root + 'public/admin/sveltia-cms.js');
for (const f of fs.readdirSync(cms + 'chunks').filter((f) => f.endsWith('.js'))) fs.copyFileSync(cms + 'chunks/' + f, root + 'public/admin/chunks/' + f);

console.log(`hazırlandı: ${atOut.length} atalar sözü, ${qhOut.length} qəhrəman`);
