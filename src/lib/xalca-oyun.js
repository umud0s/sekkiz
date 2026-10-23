// "Xalça yarat" oyunu: seçimlərdən (cfg) xalçanın SVG təsvirini qurur.
// Təsvir özündə hər şeyi saxlayır (kənar fayl yoxdur), ona görə JPG-yə çevirmək olur.

const f = (n) => +n.toFixed(1);

// Təbii boyalara yaxın, canlı rənglər
export const PAL = [
  ['#8E1520', 'Boyaqotu qırmızısı'], ['#B5232B', 'Nar qırmızısı'], ['#D2483A', 'Al'], ['#C97A7E', 'Gülgəz'],
  ['#1B2A5C', 'İndiqo'], ['#2C4C8C', 'Göy'], ['#2F7F86', 'Firuzəyi'], ['#2F5D3A', 'Tünd yaşıl'],
  ['#5E8C3A', 'Yaşıl'], ['#D9A12C', 'Zəfəran sarısı'], ['#E8C46A', 'Qızılı'], ['#EFE2C2', 'Fil sümüyü'],
  ['#E9DFC8', 'Xam yun'], ['#8A5A32', 'Qoz qəhvəyi'], ['#4A2C1C', 'Tünd qəhvəyi'], ['#1E1714', 'Qara'],
];

export const OPT = {
  hasiye: [['yox', 'Yoxdur'], ['romb', 'Romb və ulduz'], ['su', 'Su (dalğa)'], ['buta', 'Buta zənciri'], ['ulduz', 'Ulduzlar']],
  gol: [['yox', 'Yoxdur'], ['romb', 'Romb'], ['pilleli', 'Pilləli romb'], ['ulduz', 'Səkkizguşə'], ['gul', 'Gül']],
  merkez: [['yox', 'Yoxdur'], ['ulduz', 'Ulduz'], ['buta', 'Buta'], ['gul', 'Gül'], ['agac', 'Həyat ağacı']],
  sahe: [['yox', 'Yoxdur'], ['buta', 'Buta'], ['ulduz', 'Ulduz'], ['gul', 'Gül'], ['qoc', 'Qoçbuynuzu'], ['agac', 'Həyat ağacı']],
  kunc: [['yox', 'Yoxdur'], ['kuncbend', 'Küncbənd'], ['buta', 'Buta'], ['qoc', 'Qoçbuynuzu']],
};

// Boş xalça: hələ heç nə toxunmayıb, yalnız xam yun
export const blank = () => ({
  fon: '#E9DFC8',
  hasiye: { nax: 'yox', reng: '#1B2A5C', nr: '#E8C46A' },
  gol: { forma: 'yox', reng: '#1B2A5C', ic: '#EFE2C2' },
  merkez: { nax: 'yox', reng: '#B5232B' },
  sahe: { nax: 'yox', reng: '#E8C46A', cox: false },
  kunc: { nax: 'yox', reng: '#1B2A5C' },
});

const pick = (a) => a[Math.floor(Math.random() * a.length)];
// Təsadüfi, amma bir-birinə yaraşan rənglərlə xalça
export function random() {
  const fon = pick(['#8E1520', '#B5232B', '#1B2A5C', '#2F5D3A', '#EFE2C2', '#2C4C8C']);
  const dark = ['#1B2A5C', '#2F5D3A', '#4A2C1C', '#1E1714'].includes(fon) || fon === '#2C4C8C';
  const light = fon === '#EFE2C2';
  const acc = light ? ['#8E1520', '#1B2A5C', '#2F7F86', '#B5232B'] : dark ? ['#B5232B', '#E8C46A', '#D9A12C', '#EFE2C2', '#2F7F86'] : ['#1B2A5C', '#E8C46A', '#EFE2C2', '#2F5D3A', '#D9A12C'];
  return {
    fon,
    hasiye: { nax: pick(OPT.hasiye.slice(1))[0], reng: pick(light ? ['#1B2A5C', '#8E1520'] : ['#1B2A5C', '#4A2C1C', '#2F5D3A', '#8E1520'].filter((c) => c !== fon)), nr: pick(['#E8C46A', '#EFE2C2', '#D9A12C']) },
    gol: { forma: pick(OPT.gol.slice(1))[0], reng: pick(acc), ic: pick(acc) },
    merkez: { nax: pick(OPT.merkez.slice(1))[0], reng: pick(acc) },
    sahe: { nax: pick(OPT.sahe)[0], reng: pick(acc), cox: Math.random() < 0.5 },
    kunc: { nax: pick(OPT.kunc)[0], reng: pick(acc) },
  };
}

// Naxışlar (mərkəzi 0,0; ölçüsü s ilə)
export function star8(cx, cy, R, r, fill) {
  const p = [];
  for (let i = 0; i < 16; i++) { const a = (i * Math.PI) / 8 - Math.PI / 2, d = i % 2 ? r : R; p.push(`${f(cx + Math.cos(a) * d)},${f(cy + Math.sin(a) * d)}`); }
  return `<polygon points="${p.join(' ')}" fill="${fill}"/>`;
}
const motif = {
  ulduz: (x, y, s, c) => star8(x, y, 20 * s, 11 * s, c) + `<circle cx="${f(x)}" cy="${f(y)}" r="${f(4 * s)}" fill="#EFE2C2" opacity=".85"/>`,
  buta: (x, y, s, c, rot = 0) => `<g transform="translate(${f(x)} ${f(y)}) rotate(${rot}) scale(${f(s * 1.35)})"><path d="M0 14C-12 12-14-2-6-10C0-16 10-14 12-20C14-10 12 0 6 6C3 10 2 12 0 14Z" fill="${c}"/><path d="M0 8C-6 7-7 0-3-4C1-7 5-6 6-9C7-4 6 0 3 3Z" fill="#EFE2C2" opacity=".55"/><circle cx="-1" cy="2" r="1.8" fill="${c}"/></g>`,
  gul: (x, y, s, c) => { let g = ''; for (let i = 0; i < 8; i++) { const a = (i * Math.PI) / 4; g += `<ellipse cx="${f(x + Math.cos(a) * 11 * s)}" cy="${f(y + Math.sin(a) * 11 * s)}" rx="${f(7 * s)}" ry="${f(4.5 * s)}" transform="rotate(${i * 45} ${f(x + Math.cos(a) * 11 * s)} ${f(y + Math.sin(a) * 11 * s)})" fill="${c}"/>`; } return g + `<circle cx="${f(x)}" cy="${f(y)}" r="${f(6 * s)}" fill="#E8C46A"/><circle cx="${f(x)}" cy="${f(y)}" r="${f(2.5 * s)}" fill="${c}"/>`; },
  qoc: (x, y, s, c) => `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s)})" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round"><path d="M0 8V-4c0-10 11-15 17-9 5 5 0 12-6 9M0-4c0-10-11-15-17-9-5 5 0 12 6 9"/></g>`,
  agac: (x, y, s, c) => `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s)})"><path d="M0 22V-22" stroke="${c}" stroke-width="3.4"/><path d="M0 12l-12-9M0 12l12-9M0 1l-10-8M0 1l10-8M0-10l-8-7M0-10l8-7" stroke="${c}" stroke-width="3" stroke-linecap="round"/>${[[-12, 3], [12, 3], [-10, -7], [10, -7], [-8, -17], [8, -17], [0, -24]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="3" fill="#E8C46A"/>`).join('')}</g>`,
};

// Xalçanın ölçüləri (SVG koordinatları)
export const W = 600, H = 860;
const X = 50, Y = 60, CW = 500, CH = 740;

export function render(c, { id = 'x', shadow = true } = {}) {
  const has = c.hasiye.nax !== 'yox';
  const B = has ? 62 : 0;
  const fx = X + B, fy = Y + B, fw = CW - 2 * B, fh = CH - 2 * B, cx = X + CW / 2, cy = Y + CH / 2;
  let s = '';
  // Saçaqlar
  let fr = '';
  for (let x = X + 6; x < X + CW - 2; x += 7) fr += `M${x} ${Y - 26 + (x % 3) * 2}V${Y}M${x} ${Y + CH}V${Y + CH + 26 - (x % 3) * 2}`;
  s += `<path d="${fr}" stroke="#E6DAC0" stroke-width="2.6" stroke-linecap="round"/>`;
  if (shadow) s += `<rect x="${X + 6}" y="${Y + 10}" width="${CW}" height="${CH}" rx="4" fill="#000" opacity=".18" filter="url(#${id}-blur)"/>`;
  // Haşiyə
  s += `<rect x="${X}" y="${Y}" width="${CW}" height="${CH}" rx="3" fill="${has ? c.hasiye.reng : c.fon}"/>`;
  if (has) {
    const nr = c.hasiye.nr, m = B / 2;
    s += `<rect x="${X + 7}" y="${Y + 7}" width="${CW - 14}" height="${CH - 14}" fill="none" stroke="${nr}" stroke-width="3"/><rect x="${X + B - 9}" y="${Y + B - 9}" width="${CW - 2 * B + 18}" height="${CH - 2 * B + 18}" fill="none" stroke="${nr}" stroke-width="3"/>`;
    const pts = [];
    const step = 56;
    const nx = Math.floor((CW - 2 * B) / step), ny = Math.floor((CH - 2 * B) / step);
    for (let i = 0; i < nx; i++) { const x = X + B + ((CW - 2 * B) / nx) * (i + 0.5); pts.push([x, Y + m, 90], [x, Y + CH - m, -90]); }
    for (let i = 0; i < ny; i++) { const y = Y + B + ((CH - 2 * B) / ny) * (i + 0.5); pts.push([X + m, y, 0], [X + CW - m, y, 180]); }
    const n = c.hasiye.nax;
    if (n === 'su') {
      const wave = (x1, y1, x2, y2) => { const L = Math.hypot(x2 - x1, y2 - y1), k = Math.round(L / 28), ux = (x2 - x1) / L, uy = (y2 - y1) / L; let d = `M${f(x1)} ${f(y1)}`; for (let i = 0; i < k; i++) { const ax = x1 + ux * (L / k) * (i + 0.5), ay = y1 + uy * (L / k) * (i + 0.5), bx = x1 + ux * (L / k) * (i + 1), by = y1 + uy * (L / k) * (i + 1), sgn = i % 2 ? 1 : -1; d += `Q${f(ax - uy * 14 * sgn)} ${f(ay + ux * 14 * sgn)} ${f(bx)} ${f(by)}`; } return `<path d="${d}" fill="none" stroke="${nr}" stroke-width="5" stroke-linecap="round"/>`; };
      s += wave(X + m, Y + m, X + CW - m, Y + m) + wave(X + CW - m, Y + m, X + CW - m, Y + CH - m) + wave(X + CW - m, Y + CH - m, X + m, Y + CH - m) + wave(X + m, Y + CH - m, X + m, Y + m);
    } else {
      for (const [x, y, r] of pts) {
        const i = Math.round(x + y);
        if (n === 'romb') s += (Math.round((x - X + y - Y) / 56) % 2) ? star8(x, y, 15, 8, nr) : `<path d="M${f(x)} ${f(y - 17)}l13 17-13 17-13-17z" fill="${nr}"/><path d="M${f(x)} ${f(y - 8)}l6 8-6 8-6-8z" fill="${c.hasiye.reng}"/>`;
        else if (n === 'buta') s += motif.buta(x, y, 0.85, nr, r);
        else if (n === 'ulduz') s += motif.ulduz(x, y, 0.75, nr);
        void i;
      }
      for (const [x, y] of [[X + m, Y + m], [X + CW - m, Y + m], [X + m, Y + CH - m], [X + CW - m, Y + CH - m]]) s += star8(x, y, 17, 9, nr);
    }
  }
  // Ara sahə
  if (has) s += `<rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" fill="${c.fon}"/>`;
  // Künclər
  const kn = c.kunc.nax, kc = c.kunc.reng;
  if (kn === 'kuncbend') {
    const k = Math.min(fw, fh) * 0.24;
    s += [[fx, fy, 1, 1], [fx + fw, fy, -1, 1], [fx, fy + fh, 1, -1], [fx + fw, fy + fh, -1, -1]].map(([x, y, a, b]) => `<path d="M${x} ${y}h${a * k}L${x} ${y + b * k}z" fill="${kc}"/><path d="M${x} ${y}h${f(a * k * 0.55)}L${x} ${f(y + b * k * 0.55)}z" fill="${c.fon}" opacity=".45"/>`).join('');
  } else if (kn === 'buta' || kn === 'qoc') {
    s += [[fx + 46, fy + 46, 135], [fx + fw - 46, fy + 46, -135], [fx + 46, fy + fh - 46, 45], [fx + fw - 46, fy + fh - 46, -45]].map(([x, y, r]) => motif[kn](x, y, 1.1, kc, r)).join('');
  }
  // Göl ölçüsü
  const gf = c.gol.forma, R = Math.min(fw * 0.44, fh * 0.3);
  // Ara sahənin naxışları (göldən kənarda)
  const sn = c.sahe.nax;
  if (sn !== 'yox') {
    const cols = c.sahe.cox ? 5 : 3, rows = c.sahe.cox ? 8 : 5;
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
      const x = fx + (fw / cols) * (i + 0.5), y = fy + (fh / rows) * (j + 0.5);
      const inGol = gf !== 'yox' && Math.abs(x - cx) / (R * 0.95) + Math.abs(y - cy) / (R * 1.15) < 1.15;
      const inKunc = kn !== 'yox' && (Math.hypot(x - fx, y - fy) < 95 || Math.hypot(x - fx - fw, y - fy) < 95 || Math.hypot(x - fx, y - fy - fh) < 95 || Math.hypot(x - fx - fw, y - fy - fh) < 95);
      if (inGol || inKunc) continue;
      s += motif[sn](x, y, c.sahe.cox ? 0.75 : 1, c.sahe.reng, (i + j) % 2 ? 20 : -20);
    }
  }
  // Göl
  const g1 = c.gol.reng, g2 = c.gol.ic;
  if (gf === 'romb') {
    s += `<path d="M${cx} ${cy - R * 1.25}L${cx + R} ${cy}L${cx} ${cy + R * 1.25}L${cx - R} ${cy}z" fill="${g1}"/><path d="M${cx} ${f(cy - R * 1.25 + 14)}L${f(cx + R - 11)} ${cy}L${cx} ${f(cy + R * 1.25 - 14)}L${f(cx - R + 11)} ${cy}z" fill="none" stroke="${g2}" stroke-width="4"/><path d="M${cx} ${f(cy - R * 0.72)}L${f(cx + R * 0.58)} ${cy}L${cx} ${f(cy + R * 0.72)}L${f(cx - R * 0.58)} ${cy}z" fill="${g2}"/>`;
    s += [[cx, cy - R * 1.25 - 4, 0], [cx, cy + R * 1.25 + 4, 180], [cx - R - 4, cy, -90], [cx + R + 4, cy, 90]].map(([x, y, r]) => `<g transform="rotate(${r} ${f(x)} ${f(y)})">${motif.qoc(x, y - 6, 1, g1)}</g>`).join('');
  } else if (gf === 'pilleli') {
    // Pilləli romb: dörddəbirlik pillələr güzgü ilə tamamlanır
    const st = 7, Hh = R * 1.25, sx = R / st, sy = Hh / st, q = [];
    for (let i = 1; i <= st; i++) q.push([sx * i, -Hh + sy * (i - 1)], [sx * i, -Hh + sy * i]);
    const all = [[0, -Hh], ...q, ...q.slice().reverse().map(([a, b]) => [a, -b]), [0, Hh], ...q.map(([a, b]) => [-a, -b]), ...q.slice().reverse().map(([a, b]) => [-a, b])];
    s += `<polygon points="${all.map(([a, b]) => `${f(cx + a)},${f(cy + b)}`).join(' ')}" fill="${g1}"/>`;
    s += `<polygon points="${all.map(([a, b]) => `${f(cx + a * 0.8)},${f(cy + b * 0.8)}`).join(' ')}" fill="none" stroke="${g2}" stroke-width="4"/>`;
    s += `<path d="M${cx} ${f(cy - R * 0.62)}L${f(cx + R * 0.5)} ${cy}L${cx} ${f(cy + R * 0.62)}L${f(cx - R * 0.5)} ${cy}z" fill="${g2}"/>`;
  } else if (gf === 'ulduz') {
    s += star8(cx, cy, R * 1.12, R * 0.78, g1) + star8(cx, cy, R * 0.92, R * 0.62, g2) + star8(cx, cy, R * 0.66, R * 0.44, g1);
  } else if (gf === 'gul') {
    for (let i = 0; i < 12; i++) { const a = (i * Math.PI) / 6, px = cx + Math.cos(a) * R * 0.66, py = cy + Math.sin(a) * R * 0.66; s += `<ellipse cx="${f(px)}" cy="${f(py)}" rx="${f(R * 0.42)}" ry="${f(R * 0.2)}" transform="rotate(${i * 30} ${f(px)} ${f(py)})" fill="${g1}"/>`; }
    s += `<circle cx="${cx}" cy="${cy}" r="${f(R * 0.62)}" fill="${g2}"/><circle cx="${cx}" cy="${cy}" r="${f(R * 0.5)}" fill="none" stroke="${g1}" stroke-width="4" stroke-dasharray="8 6"/>`;
  }
  // Mərkəz nişanı
  if (c.merkez.nax !== 'yox') s += motif[c.merkez.nax](cx, cy, gf === 'yox' ? 2.4 : R / 64, c.merkez.reng, 0);
  // Yun toxuması: ilmə şəbəkəsi, dən-dən səth və yumşaq işıq
  s += `<rect x="${X}" y="${Y}" width="${CW}" height="${CH}" fill="url(#${id}-knot)"/><rect x="${X}" y="${Y}" width="${CW}" height="${CH}" filter="url(#${id}-wool)" opacity=".55"/><rect x="${X}" y="${Y}" width="${CW}" height="${CH}" fill="url(#${id}-light)"/>`;
  const defs = `<defs>
    <filter id="${id}-wool" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="7"/><feColorMatrix values="0 0 0 0 .12  0 0 0 0 .08  0 0 0 0 .05  0 0 0 -1.1 .62"/></filter>
    <filter id="${id}-blur" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="9"/></filter>
    <pattern id="${id}-knot" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="none"/><path d="M0 4.5h5M4.5 0v5" stroke="#000" stroke-opacity=".07" stroke-width="1"/></pattern>
    <radialGradient id="${id}-light" cx=".42" cy=".35" r=".8"><stop offset="0" stop-color="#FFFFFF" stop-opacity=".12"/><stop offset="1" stop-color="#000000" stop-opacity=".16"/></radialGradient>
  </defs>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${defs}${s}</svg>`;
}
