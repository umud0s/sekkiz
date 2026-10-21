// dist qovluğundakı bütün daxili keçidləri yoxlayır: hər keçidin faylı mövcud olmalıdır
import fs from 'node:fs';
import path from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const files = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); fs.statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); } })(dist);

const exists = (u) => {
  const clean = decodeURIComponent(u.split(/[?#]/)[0]);
  if (!clean || clean === '/') return fs.existsSync(path.join(dist, 'index.html'));
  const p = path.join(dist, clean);
  return fs.existsSync(p) && (fs.statSync(p).isFile() || fs.existsSync(path.join(p, 'index.html')));
};
let bad = 0, total = 0;
for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  for (const m of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    total++;
    if (!exists(m[1])) { bad++; if (bad <= 20) console.log('Qırıq keçid:', m[1], 'səhifədə', f.replace(dist, '/')); }
  }
}
console.log(`${files.length} səhifə, ${total} daxili keçid, ${bad} qırıq`);
process.exit(bad ? 1 : 0);
