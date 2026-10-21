// Azərbaycan hərflərinə uyğun axtarış: İ/i, I/ı düzgün, "loose" rejimdə ə→e, ş→s və s.
const LOOSE = { 'ə': 'e', 'ö': 'o', 'ü': 'u', 'ç': 'c', 'ş': 's', 'ğ': 'g', 'ı': 'i' };

export function norm(s, loose = true) {
  let r = '';
  for (const ch of s) {
    let c = ch === 'İ' ? 'i' : ch === 'I' ? 'ı' : ch.toLowerCase();
    if (c.length !== 1) c = c[0];
    if (loose) c = LOOSE[c] || c;
    r += c;
  }
  return r;
}

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// Tapılan hissəni <mark> ilə işarələyir (mətn simvol-simvol norm ilə üst-üstə düşür)
export function highlight(text, q, loose = true) {
  if (!q) return esc(text);
  const n = norm(text, loose);
  let out = '', i = 0, j;
  while ((j = n.indexOf(q, i)) !== -1) {
    out += esc(text.slice(i, j)) + '<mark class="hit">' + esc(text.slice(j, j + q.length)) + '</mark>';
    i = j + q.length;
  }
  return out + esc(text.slice(i));
}

export const ALPHA = ['A','B','C','Ç','D','E','Ə','F','G','Ğ','H','X','I','İ','J','K','Q','L','M','N','O','Ö','P','R','S','Ş','T','U','Ü','V','Y','Z'];

export function firstLetter(t) {
  const m = t.match(/\p{L}/u);
  const c = m ? m[0] : '';
  return c === 'i' ? 'İ' : c === 'ı' ? 'I' : c.toUpperCase();
}

export const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
