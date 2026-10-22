import GROUPS from '../data/luget-yazilis.js';
import CORP, { CATS } from '../data/luget-korporativ.js';
import { norm, esc } from './search.js';

export { GROUPS, CATS };

// Dəqiq müqayisə üçün: kiçik hərf, artıq boşluqlar silinir
const strict = (s) => norm(s, false).trim().replace(/\s+/g, ' ');
// Sərbəst müqayisə üçün: ə→e, ş→s və s., boşluq və defis nəzərə alınmır
const loose = (s) => norm(s, true).replace(/[\s-]+/g, '');

export const SPELL = GROUPS.flatMap((g) => g.items.map(([w, r, note]) => ({ w, r, note: note || '', g })));
export const CORP_LIST = CATS.flatMap(([id, title]) => CORP[id].map(([t, eq, bad, good]) => ({ t, eq, bad, good, c: id, ct: title })));

// Əcnəbi sözün əsas hissəsi: "meet etmək" -> "meet", "cc-yə qoymaq" -> "cc"
const corpKeys = (t) => t.split(/,\s*/).map((x) => loose(x.replace(/\s+(etmək|olmaq|atmaq|qoymaq)$/, '').replace(/-yə$/, '')));
const CORP_KEYS = CORP_LIST.map((c) => corpKeys(c.t));

function lev(a, b) {
  if (Math.abs(a.length - b.length) > 2) return 9;
  const d = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = d[0]; d[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const t = d[j];
      d[j] = Math.min(d[j] + 1, d[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = t;
    }
  }
  return d[b.length];
}

// Yazılışı yoxlayır: düzgündürmü, səhvdirsə düzgün forması nədir
export function checkSpelling(q) {
  const s = strict(q), l = loose(q);
  if (!l) return null;
  const wrong = SPELL.find((x) => strict(x.w) === s);
  if (wrong) return { kind: 'wrong', item: wrong };
  const right = SPELL.find((x) => strict(x.r) === s);
  if (right) return { kind: 'right', item: right };
  const letters = SPELL.find((x) => loose(x.r) === l);
  // Hərflər düzgün olsa da boşluq və ya defis buraxılıbsa, bu da səhvdir
  if (letters) return { kind: /[\s-]/.test(letters.r) && !/[\s-]/.test(s) ? 'wrong' : 'letters', item: letters };
  const lw = SPELL.find((x) => loose(x.w) === l);
  if (lw) return { kind: 'wrong', item: lw };
  const lim = l.length > 6 ? 2 : 1, seen = new Set(), near = [];
  for (const x of SPELL) {
    if (seen.has(x.r)) continue;
    if (lev(l, loose(x.r)) <= lim || lev(l, loose(x.w)) <= lim) { seen.add(x.r); near.push(x); }
  }
  return near.length ? { kind: 'near', items: near.slice(0, 4) } : { kind: 'none' };
}

// Mətndə korporativ dildən gələn əcnəbi sözləri tapır
export function findCorp(q) {
  const raw = norm(q, true).split(/[^\p{L}&]+/u).filter(Boolean);
  const words = [...raw, ...raw.map((w) => w.replace(/^(.{3,}?)(u|un|a|ya|da|dan|i|in)$/u, '$1'))];
  const whole = loose(q);
  return CORP_LIST.filter((c, i) => CORP_KEYS[i].some((k) => k && (k === whole || words.includes(k) || (k.length > 3 && whole.startsWith(k)))));
}

export const spellRow = (x) => `<li class="sp"><span class="sp-w"><s>${esc(x.w)}</s></span><span class="sp-a" aria-hidden="true">→</span><b class="sp-r">${esc(x.r)}</b>${x.note ? `<span class="sp-n">${esc(x.note)}</span>` : ''}</li>`;

export const corpCard = (c) => `<li class="kp"><div class="kp-h"><span class="kp-t" lang="en">${esc(c.t)}</span><span class="kp-eq">${esc(c.eq)}</span></div><p class="kp-bad"><span>Belə yox:</span> ${esc(c.bad)}</p><p class="kp-good"><span>Belə:</span> ${esc(c.good)}</p></li>`;

// Yoxlamanın nəticəsi kart şəklində
export function spellResult(r, q) {
  if (!r) return '';
  if (r.kind === 'wrong') return `<div class="res bad"><span class="res-k">Səhv yazılıb</span><p class="res-m"><s>${esc(q.trim())}</s> → <b>${esc(r.item.r)}</b></p><p class="res-n">${esc(r.item.note || r.item.g.rule)}</p></div>`;
  if (r.kind === 'right') return `<div class="res ok"><span class="res-k">Düzgün yazılıb</span><p class="res-m"><b>${esc(r.item.r)}</b></p><p class="res-n">${esc(r.item.note || r.item.g.rule)} Səhv forma: <s>${esc(r.item.w)}</s>.</p></div>`;
  if (r.kind === 'letters') return `<div class="res warn"><span class="res-k">Azərbaycan hərfləri ilə</span><p class="res-m"><b>${esc(r.item.r)}</b></p><p class="res-n">${esc(r.item.g.rule)}</p></div>`;
  if (r.kind === 'near') return `<div class="res warn"><span class="res-k">Bunu nəzərdə tuturdunuz?</span><p class="res-m">${r.items.map((x) => `<b>${esc(x.r)}</b>`).join(', ')}</p></div>`;
  return `<div class="res none"><span class="res-k">Bazada tapılmadı</span><p class="res-n">Bu söz hələ yoxlama siyahımızda yoxdur. Siyahı mütəmadi olaraq genişlənir.</p></div>`;
}
