// Xalça bölməsinin təsvirləri: xalçanın özü, toxunma səhnəsi və ip yumaqları

const f = (n) => +n.toFixed(1);
const C = { red: '#A3262E', blue: '#1F3A6B', cream: '#F2E2C0', gold: '#D9A441', green: '#3E7A4A', dark: '#5A1A20' };

export function star8(cx, cy, R, r, fill) {
  const p = [];
  for (let i = 0; i < 16; i++) { const a = (i * Math.PI) / 8 - Math.PI / 2, d = i % 2 ? r : R; p.push(`${f(cx + Math.cos(a) * d)},${f(cy + Math.sin(a) * d)}`); }
  return `<polygon points="${p.join(' ')}" fill="${fill}"/>`;
}

const buta = (x, y, s, rot, fill, inner) => `<g transform="translate(${f(x)} ${f(y)}) rotate(${rot}) scale(${s})"><path d="M0 14C-12 12-14-2-6-10C0-16 10-14 12-20C14-10 12 0 6 6C3 10 2 12 0 14Z" fill="${fill}"/><path d="M0 8C-6 7-7 0-3-4C1-7 5-6 6-9C7-4 6 0 3 3Z" fill="${inner}"/><circle cx="-1" cy="2" r="1.6" fill="${fill}"/></g>`;

const hook = (x, y, s, rot) => `<g transform="translate(${f(x)} ${f(y)}) rotate(${rot}) scale(${s})"><path d="M0 0c0-9 9-13 14-8 4 4 0 10-5 8M0 0c0-9-9-13-14-8-4 4 0 10 5 8" fill="none" stroke="${C.cream}" stroke-width="3.2" stroke-linecap="round"/></g>`;

const tree = (x, y, s, flip) => `<g transform="translate(${f(x)} ${f(y)}) scale(${s} ${flip ? -s : s})"><path d="M0 18V-18" stroke="${C.green}" stroke-width="3"/><path d="M0 10l-10-8M0 10l10-8M0 0l-9-7M0 0l9-7M0-9l-7-6M0-9l7-6" stroke="${C.green}" stroke-width="2.6" stroke-linecap="round"/>${[[-10, 2], [10, 2], [-9, -7], [9, -7], [-7, -15], [7, -15], [0, -20]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="2.6" fill="${C.gold}"/>`).join('')}</g>`;

// Xalça: interactive=true olanda naxışlar ayrıca qruplara bölünür (data-k)
export function carpet(x, y, w, h, interactive = false) {
  const g = (k, label, inner) => interactive ? `<g class="nx" data-k="${k}" tabindex="0" role="button" aria-label="${label}">${inner}</g>` : `<g>${inner}</g>`;
  const B = Math.min(w, h) * 0.11, cx = x + w / 2, cy = y + h / 2;
  const fx = x + B + 5, fy = y + B + 5, fw = w - 2 * B - 10, fh = h - 2 * B - 10;
  // Haşiyə: mavi zolaq, üstündə növbə ilə romb və ulduzcuqlar
  let pat = '';
  const step = B * 1.1, mid = B / 2;
  for (let px = x + step / 2; px < x + w - step / 3; px += step) {
    const i = Math.round((px - x) / step);
    pat += i % 2 ? star8(px, y + mid, B * 0.3, B * 0.17, C.cream) + star8(px, y + h - mid, B * 0.3, B * 0.17, C.cream)
      : `<path d="M${f(px)} ${f(y + mid - B * 0.3)}l${f(B * 0.25)} ${f(B * 0.3)}-${f(B * 0.25)} ${f(B * 0.3)}-${f(B * 0.25)}-${f(B * 0.3)}z" fill="${C.gold}"/><path d="M${f(px)} ${f(y + h - mid - B * 0.3)}l${f(B * 0.25)} ${f(B * 0.3)}-${f(B * 0.25)} ${f(B * 0.3)}-${f(B * 0.25)}-${f(B * 0.3)}z" fill="${C.gold}"/>`;
  }
  for (let py = y + B + step / 2; py < y + h - B - step / 3; py += step) {
    const i = Math.round((py - y) / step);
    pat += i % 2 ? star8(x + mid, py, B * 0.3, B * 0.17, C.cream) + star8(x + w - mid, py, B * 0.3, B * 0.17, C.cream)
      : `<path d="M${f(x + mid - B * 0.3)} ${f(py)}l${f(B * 0.3)}-${f(B * 0.25)} ${f(B * 0.3)} ${f(B * 0.25)}-${f(B * 0.3)} ${f(B * 0.25)}z" fill="${C.gold}"/><path d="M${f(x + w - mid - B * 0.3)} ${f(py)}l${f(B * 0.3)}-${f(B * 0.25)} ${f(B * 0.3)} ${f(B * 0.25)}-${f(B * 0.3)} ${f(B * 0.25)}z" fill="${C.gold}"/>`;
  }
  const hasiye = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${C.blue}"/><rect x="${f(x + 3)}" y="${f(y + 3)}" width="${f(w - 6)}" height="${f(h - 6)}" fill="none" stroke="${C.cream}" stroke-width="1.4"/>${pat}<rect x="${f(x + B)}" y="${f(y + B)}" width="${f(w - 2 * B)}" height="${f(h - 2 * B)}" fill="${C.gold}"/>`;
  const field = `<rect x="${f(fx)}" y="${f(fy)}" width="${f(fw)}" height="${f(fh)}" fill="${C.red}"/>`;
  // Göl: mərkəzdə iri romb
  const R = Math.min(fw * 0.42, fh * 0.3), Rx = R * 0.85;
  const gol = `<path d="M${f(cx)} ${f(cy - R)}L${f(cx + Rx)} ${f(cy)}L${f(cx)} ${f(cy + R)}L${f(cx - Rx)} ${f(cy)}z" fill="${C.cream}"/><path d="M${f(cx)} ${f(cy - R + 6)}L${f(cx + Rx - 5)} ${f(cy)}L${f(cx)} ${f(cy + R - 6)}L${f(cx - Rx + 5)} ${f(cy)}z" fill="${C.blue}"/><path d="M${f(cx)} ${f(cy - R * 0.55)}L${f(cx + Rx * 0.55)} ${f(cy)}L${f(cx)} ${f(cy + R * 0.55)}L${f(cx - Rx * 0.55)} ${f(cy)}z" fill="${C.red}" stroke="${C.gold}" stroke-width="2"/>`;
  const qoc = hook(cx, cy - R - 2, R / 48, 0) + hook(cx, cy + R + 2, R / 48, 180) + hook(cx - Rx - 2, cy, R / 48, -90) + hook(cx + Rx + 2, cy, R / 48, 90);
  const ty = (cy - R + fy) / 2, by = (cy + R + fy + fh) / 2, ts = Math.min(1.4, (cy - R - fy) / 46);
  const agac = tree(cx, ty, ts, false) + tree(cx, by, ts, true);
  const bs = Math.min(fw, fh) / 120;
  const bt = buta(fx + fw * 0.17, fy + fh * 0.13, bs, -20, C.gold, C.blue) + buta(fx + fw * 0.83, fy + fh * 0.13, bs, 20, C.gold, C.blue) + buta(fx + fw * 0.17, fy + fh * 0.87, bs, 200, C.gold, C.blue) + buta(fx + fw * 0.83, fy + fh * 0.87, bs, 160, C.gold, C.blue);
  const sm = [[0.2, 0.5], [0.8, 0.5], [0.35, 0.3], [0.65, 0.3], [0.35, 0.7], [0.65, 0.7]].map(([a, b]) => star8(fx + fw * a, fy + fh * b, Math.min(fw, fh) * 0.035, Math.min(fw, fh) * 0.018, C.cream)).join('');
  const ulduz = sm + star8(cx, cy, R * 0.32, R * 0.2, C.gold) + `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(R * 0.08)}" fill="${C.red}"/>`;
  return g('hasiye', 'Haşiyə', hasiye) + field + g('buta', 'Buta', bt) + g('agac', 'Həyat ağacı', agac) + g('gol', 'Göl', gol) + g('qoc', 'Qoçbuynuzu', qoc) + g('ulduz', 'Səkkizguşəli ulduz', ulduz);
}

export const yarn = (x, y, r, c, d = 0) => `<g class="xl-bob" style="animation-delay:${d}s"><circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/><path d="M${f(x - r * 0.8)} ${f(y - r * 0.3)}q${f(r * 0.8)} ${f(-r * 0.6)} ${f(r * 1.6)} 0M${f(x - r * 0.9)} ${f(y + r * 0.1)}q${f(r * 0.9)} ${f(-r * 0.6)} ${f(r * 1.8)} 0M${f(x - r * 0.7)} ${f(y + r * 0.5)}q${f(r * 0.7)} ${f(-r * 0.5)} ${f(r * 1.4)} 0" stroke="#FFFFFF" stroke-opacity=".35" stroke-width="2" fill="none"/></g>`;

// Hana: xalça aşağıdan yuxarıya sətir-sətir toxunur
export function loom() {
  const X = 246, Y = 60, W = 308, H = 300;
  return `<svg viewBox="0 0 800 420" role="img" aria-label="Hanada xalça toxunur">
    <defs>
      <pattern id="xl-warp" width="6" height="10" patternUnits="userSpaceOnUse"><rect width="6" height="10" fill="#F7EEDF"/><path d="M3 0v10" stroke="#E2D3B6" stroke-width="1.3"/></pattern>
      <clipPath id="xl-clip"><rect x="${X}" y="${Y}" width="${W}" height="${H}"/></clipPath>
    </defs>
    <rect width="800" height="420" fill="#F7EEDF"/>
    <path d="M0 384H800V420H0z" fill="#E4D2B0"/>
    <rect x="212" y="18" width="18" height="384" rx="4" fill="#8A5A30"/><rect x="570" y="18" width="18" height="384" rx="4" fill="#8A5A30"/>
    <rect x="198" y="22" width="404" height="24" rx="8" fill="#9E6A3B"/><rect x="198" y="364" width="404" height="24" rx="8" fill="#9E6A3B"/>
    <rect x="${X}" y="46" width="${W}" height="${H + 18}" fill="url(#xl-warp)"/>
    <g clip-path="url(#xl-clip)">${carpet(X, Y, W, H)}</g>
    <g class="xl-cover"><rect x="${X}" y="${Y}" width="${W}" height="${H}" fill="url(#xl-warp)"/></g>
    <g class="xl-front">
      <path d="M${X - 4} ${Y}H${X + W + 4}" stroke="${C.red}" stroke-width="3"/>
      <g class="xl-shuttle"><ellipse cx="${X + 20}" cy="${Y}" rx="12" ry="7" fill="${C.gold}"/><path d="M${X + 10} ${Y - 2}q10-5 20 0" stroke="#FFFFFF" stroke-opacity=".5" stroke-width="1.6" fill="none"/></g>
      <g class="xl-beat"><rect x="${X + W - 64}" y="${Y - 30}" width="46" height="14" rx="5" fill="#6B4426"/>${[0, 1, 2, 3, 4, 5, 6].map((i) => `<rect x="${X + W - 62 + i * 6}" y="${Y - 17}" width="3" height="12" fill="#6B4426"/>`).join('')}<rect x="${X + W - 48}" y="${Y - 50}" width="12" height="22" rx="4" fill="#8A5A30"/></g>
    </g>
    ${yarn(650, 362, 22, C.red, 0)}${yarn(700, 370, 16, C.gold, -0.4)}${yarn(740, 360, 20, C.blue, -0.8)}${yarn(684, 336, 14, C.green, -1.2)}${yarn(110, 364, 20, C.cream, -0.6)}${yarn(150, 372, 14, '#6B4426', -1)}
    <path d="M640 342C620 300 600 260 588 210M732 342C700 290 640 250 590 230" stroke="${C.red}" stroke-width="1.6" fill="none" opacity=".6"/>
  </svg>`;
}
