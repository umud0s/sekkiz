// Novruz bölməsinin animasiyalı təsvirləri (SVG). Hərəkətlər NovruzStyles.astro-dakı nv-* siniflərindədir.

const f = (n) => +n.toFixed(1);

// Səməni: kasa, göyərti və qırmızı lent
export function semeni(cx, by, s = 1, id = 's') {
  const blades = [];
  const xs = [-44, -36, -28, -20, -12, -4, 4, 12, 20, 28, 36, 44, -40, -24, -8, 8, 24, 40];
  const hs = [62, 74, 82, 90, 96, 100, 98, 94, 88, 80, 70, 58, 50, 66, 72, 70, 64, 48];
  const cols = ['#4A9E32', '#5BB33E', '#7ACB53', '#68BF47'];
  xs.forEach((x, i) => {
    const x0 = cx + x * s, h = hs[i] * s, lean = x * 0.35 * s + (i % 3 - 1) * 3 * s;
    blades.push({ g: i % 3, d: `M${f(x0)} ${f(by)}C${f(x0 + lean * 0.2)} ${f(by - h * 0.45)} ${f(x0 + lean * 0.7)} ${f(by - h * 0.8)} ${f(x0 + lean)} ${f(by - h)}`, c: cols[i % 4], w: f((i > 11 ? 3.2 : 3.6) * s) });
  });
  const grp = [0, 1, 2].map((g) => `<g class="nv-sway" style="animation-delay:${-g * 0.7}s">${blades.filter((b) => b.g === g).map((b) => `<path d="${b.d}" stroke="${b.c}" stroke-width="${b.w}" stroke-linecap="round" fill="none"/>`).join('')}</g>`).join('');
  const ry = 14 * s;
  return `<g>
    <ellipse cx="${cx}" cy="${f(by + 40 * s)}" rx="${f(56 * s)}" ry="${f(8 * s)}" fill="#000" opacity=".12"/>
    <ellipse cx="${cx}" cy="${by}" rx="${f(60 * s)}" ry="${f(ry)}" fill="#5A3A1E"/>
    ${grp}
    <path d="M${f(cx - 44 * s)} ${f(by - 30 * s)}h${f(88 * s)}v${f(9 * s)}h${f(-88 * s)}z" fill="#E0313B"/>
    <path d="M${f(cx - 4 * s)} ${f(by - 26 * s)}c${f(-14 * s)} ${f(-14 * s)} ${f(-26 * s)} ${f(-2 * s)} ${f(-12 * s)} ${f(6 * s)}zM${f(cx + 4 * s)} ${f(by - 26 * s)}c${f(14 * s)} ${f(-14 * s)} ${f(26 * s)} ${f(-2 * s)} ${f(12 * s)} ${f(6 * s)}z" fill="#C42530"/>
    <path class="nv-ribbon" d="M${f(cx - 3 * s)} ${f(by - 23 * s)}l${f(-10 * s)} ${f(24 * s)}M${f(cx + 3 * s)} ${f(by - 23 * s)}l${f(10 * s)} ${f(24 * s)}" stroke="#E0313B" stroke-width="${f(4 * s)}" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${f(by - 25 * s)}" r="${f(4.5 * s)}" fill="#C42530"/>
    <path d="M${f(cx - 60 * s)} ${by}Q${f(cx - 56 * s)} ${f(by + 38 * s)} ${cx} ${f(by + 40 * s)}Q${f(cx + 56 * s)} ${f(by + 38 * s)} ${f(cx + 60 * s)} ${by}A${f(60 * s)} ${f(ry)} 0 0 1 ${f(cx - 60 * s)} ${by}z" fill="#2F78B5"/>
    <path d="M${f(cx - 55 * s)} ${f(by + 14 * s)}Q${cx} ${f(by + 30 * s)} ${f(cx + 55 * s)} ${f(by + 14 * s)}" stroke="#F2C14E" stroke-width="${f(3 * s)}" fill="none"/>
    <path d="M${f(cx - 40 * s)} ${f(by + 8 * s)}q${f(6 * s)} ${f(-4 * s)} ${f(12 * s)} 0t${f(12 * s)} 0t${f(12 * s)} 0t${f(12 * s)} 0t${f(12 * s)} 0t${f(12 * s)} 0t${f(12 * s)} 0" stroke="#FFFFFF" stroke-opacity=".55" stroke-width="${f(1.6 * s)}" fill="none"/>
  </g>`;
}

export function candle(x, by, h = 46, s = 1, d = 0) {
  const w = 12 * s;
  return `<g>
    <circle class="nv-glow" cx="${x}" cy="${f(by - h - 10 * s)}" r="${f(16 * s)}" fill="#FFD27A" style="animation-delay:${d}s"/>
    <rect x="${f(x - w / 2)}" y="${f(by - h)}" width="${f(w)}" height="${h}" rx="${f(2.5 * s)}" fill="#FFF3D6" stroke="#E5C88E" stroke-width="${f(1.2 * s)}"/>
    <path d="M${f(x - w / 2 + 2 * s)} ${f(by - h + 6 * s)}v${f(h * 0.5)}" stroke="#FFFFFF" stroke-width="${f(2 * s)}" stroke-linecap="round" opacity=".8"/>
    <path d="M${x} ${f(by - h)}v${f(-4 * s)}" stroke="#4A3626" stroke-width="${f(1.4 * s)}"/>
    <g class="nv-flick" style="animation-delay:${d}s"><path d="M${x} ${f(by - h - 22 * s)}c${f(5 * s)} ${f(6 * s)} ${f(6.5 * s)} ${f(10 * s)} ${f(6.5 * s)} ${f(13 * s)}a${f(6.5 * s)} ${f(6.5 * s)} 0 0 1 ${f(-13 * s)} 0c0 ${f(-3 * s)} ${f(1.5 * s)} ${f(-7 * s)} ${f(6.5 * s)} ${f(-13 * s)}z" fill="#F2A33A"/><path d="M${x} ${f(by - h - 14 * s)}c${f(2.5 * s)} ${f(3 * s)} ${f(3.4 * s)} ${f(5 * s)} ${f(3.4 * s)} ${f(6.5 * s)}a${f(3.4 * s)} ${f(3.4 * s)} 0 0 1 ${f(-6.8 * s)} 0c0 ${f(-1.5 * s)} ${f(0.9 * s)} ${f(-3.5 * s)} ${f(3.4 * s)} ${f(-6.5 * s)}z" fill="#FFE9A6"/></g>
  </g>`;
}

export function egg(x, y, c, s = 1, p = '#FFFFFF') {
  return `<g><ellipse cx="${x}" cy="${y}" rx="${f(12 * s)}" ry="${f(15.5 * s)}" fill="${c}"/>
    <path d="M${f(x - 11 * s)} ${f(y + 1 * s)}l${f(3.7 * s)} ${f(-4 * s)} ${f(3.7 * s)} ${f(4 * s)} ${f(3.7 * s)} ${f(-4 * s)} ${f(3.7 * s)} ${f(4 * s)} ${f(3.7 * s)} ${f(-4 * s)} ${f(3.6 * s)} ${f(4 * s)}" stroke="${p}" stroke-width="${f(1.8 * s)}" fill="none" stroke-linejoin="round" opacity=".75"/>
    <ellipse cx="${f(x - 4 * s)}" cy="${f(y - 6 * s)}" rx="${f(3 * s)}" ry="${f(5 * s)}" fill="#FFFFFF" opacity=".45"/></g>`;
}

export function fire(x, y, s = 1, sparks = 5) {
  let sp = '';
  for (let i = 0; i < sparks; i++) sp += `<circle class="nv-spark" cx="${f(x + (i % 2 ? 1 : -1) * (6 + i * 5) * s)}" cy="${f(y - 40 * s)}" r="${f(2.2 * s)}" fill="#FFD27A" style="animation-delay:${(-i * 0.37).toFixed(2)}s"/>`;
  return `<g>
    <ellipse class="nv-glow" cx="${x}" cy="${f(y - 20 * s)}" rx="${f(60 * s)}" ry="${f(46 * s)}" fill="#FFB347" style="opacity:.25"/>
    <g fill="#7A4A26"><rect x="${f(x - 34 * s)}" y="${f(y - 6 * s)}" width="${f(68 * s)}" height="${f(11 * s)}" rx="${f(5 * s)}" transform="rotate(-14 ${x} ${y})"/><rect x="${f(x - 34 * s)}" y="${f(y - 6 * s)}" width="${f(68 * s)}" height="${f(11 * s)}" rx="${f(5 * s)}" transform="rotate(14 ${x} ${y})" fill="#8E5A30"/></g>
    <g class="nv-flick"><path d="M${x} ${f(y - 66 * s)}c${f(14 * s)} ${f(16 * s)} ${f(26 * s)} ${f(28 * s)} ${f(24 * s)} ${f(44 * s)}c-1 ${f(14 * s)} ${f(-12 * s)} ${f(22 * s)} ${f(-24 * s)} ${f(22 * s)}s${f(-24 * s)} ${f(-8 * s)} ${f(-24 * s)} ${f(-22 * s)}c0 ${f(-12 * s)} ${f(8 * s)} ${f(-20 * s)} ${f(12 * s)} ${f(-28 * s)}c${f(2 * s)} ${f(8 * s)} ${f(6 * s)} ${f(10 * s)} ${f(8 * s)} ${f(12 * s)}c${f(1 * s)} ${f(-12 * s)} ${f(2 * s)} ${f(-20 * s)} ${f(4 * s)} ${f(-28 * s)}z" fill="#F2662B"/></g>
    <g class="nv-flick2"><path d="M${x} ${f(y - 46 * s)}c${f(9 * s)} ${f(10 * s)} ${f(16 * s)} ${f(18 * s)} ${f(15 * s)} ${f(28 * s)}c-1 ${f(8 * s)} ${f(-7 * s)} ${f(13 * s)} ${f(-15 * s)} ${f(13 * s)}s${f(-15 * s)} ${f(-5 * s)} ${f(-15 * s)} ${f(-13 * s)}c0 ${f(-9 * s)} ${f(7 * s)} ${f(-16 * s)} ${f(15 * s)} ${f(-28 * s)}z" fill="#F9A23B"/></g>
    <g class="nv-flick"><path d="M${x} ${f(y - 28 * s)}c${f(5 * s)} ${f(6 * s)} ${f(8 * s)} ${f(10 * s)} ${f(8 * s)} ${f(15 * s)}a${f(8 * s)} ${f(8 * s)} 0 0 1 ${f(-16 * s)} 0c0 ${f(-5 * s)} ${f(3 * s)} ${f(-9 * s)} ${f(8 * s)} ${f(-15 * s)}z" fill="#FFE07A"/></g>
    ${sp}
  </g>`;
}

const sun = (cx, cy, r, rays = 12) => {
  let g = '';
  for (let i = 0; i < rays; i++) {
    const a = (i / rays) * Math.PI * 2;
    g += `<path d="M${f(cx + Math.cos(a) * (r + 10))} ${f(cy + Math.sin(a) * (r + 10))}L${f(cx + Math.cos(a) * (r + 30))} ${f(cy + Math.sin(a) * (r + 30))}"/>`;
  }
  return `<g class="nv-spin" stroke="#FFC857" stroke-width="5" stroke-linecap="round" opacity=".75">${g}</g><circle cx="${cx}" cy="${cy}" r="${r}" fill="#FFD24D"/><circle cx="${cx}" cy="${cy}" r="${f(r * 0.72)}" fill="#FFE38A"/>`;
};

const petals = (pts, c = '#F7B6C8') => pts.map(([x, y, d]) => `<ellipse class="nv-petal" cx="${x}" cy="${y}" rx="4" ry="2.6" fill="${c}" style="animation-delay:${d}s"/>`).join('');

// Böyük səhnələr
export const SCENES = {
  hero: () => `<svg viewBox="0 0 800 340" role="img" aria-label="Novruz səhəri: doğan günəş, səməni, şamlar və tonqal">
    <defs><linearGradient id="nvh-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FBE3C2"/><stop offset=".6" stop-color="#FDF4E3"/><stop offset="1" stop-color="#EAF6DD"/></linearGradient></defs>
    <rect width="800" height="340" fill="url(#nvh-sky)"/>
    <g class="nv-rise">${sun(400, 170, 52)}</g>
    <g class="nv-drift" fill="#FFFFFF" opacity=".85"><ellipse cx="150" cy="70" rx="46" ry="13"/><ellipse cx="180" cy="60" rx="28" ry="12"/></g>
    <g class="nv-drift" style="animation-delay:-6s" fill="#FFFFFF" opacity=".8"><ellipse cx="620" cy="90" rx="40" ry="11"/><ellipse cx="646" cy="81" rx="24" ry="10"/></g>
    <path d="M0 240Q180 196 400 226T800 214V340H0z" fill="#A9DA82"/>
    <path d="M0 282Q240 248 520 276T800 268V340H0z" fill="#8CC965"/>
    <g><path d="M704 290c-4-50 2-90 14-120" stroke="#8A5A3A" stroke-width="12" stroke-linecap="round" fill="none"/><path d="M714 200l-36-30M716 182l34-34M712 222l40-12" stroke="#8A5A3A" stroke-width="6" stroke-linecap="round"/>
      <g class="nv-sway2">${[[676, 168, 15], [700, 146, 18], [736, 146, 17], [756, 176, 15], [726, 122, 16], [690, 190, 12], [754, 206, 12]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#F7C6D3"/><circle cx="${x - 4}" cy="${y - 4}" r="${r * 0.45}" fill="#FDE3EA"/>`).join('')}</g>
      ${petals([[690, 170, 0], [730, 150, -1.6], [750, 190, -3.1], [710, 130, -4.4], [680, 200, -2.2]])}</g>
    ${fire(130, 292, 1.05, 6)}
    ${candle(298, 312, 44, 1, 0)}${candle(502, 312, 44, 1, -0.4)}
    ${semeni(400, 290, 1.05)}
    ${egg(340, 318, '#C8452F', 1)}${egg(462, 318, '#F2C14E', 1)}${egg(364, 326, '#4FA3D9', 0.9)}${egg(438, 326, '#6CC24A', 0.9)}
  </svg>`,

  su: () => `<svg viewBox="0 0 800 300" role="img" aria-label="Su çərşənbəsi: bulaq, axar çay və səhəng">
    <defs><linearGradient id="nvsu-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BFE6F7"/><stop offset="1" stop-color="#ECF8FB"/></linearGradient></defs>
    <rect width="800" height="300" fill="url(#nvsu-sky)"/>
    <path d="M0 170l90-60 70 34 90-70 100 70 80-40 110 60 90-50 170 70v40H0z" fill="#B7D6C7"/>
    <path d="M250 74l40 28-24-6-16 10-14-8zM540 104l34 20-20-2-12 8-12-8z" fill="#FFFFFF"/>
    <path d="M0 196Q200 180 400 196T800 190V300H0z" fill="#9ED37A"/>
    <path d="M150 236C300 214 420 264 560 244S760 228 800 238V276C760 268 600 286 470 282S260 262 150 262z" fill="#5DB7E0"/>
    <g class="nv-flow" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none" opacity=".75"><path d="M180 248C300 232 420 272 560 258S740 246 800 254" stroke-dasharray="26 38"/><path d="M200 256C320 244 430 280 570 268S750 258 800 264" stroke-dasharray="18 46" style="animation-delay:-1s"/></g>
    <g fill="#8C9AA3"><path d="M40 238c-6-40 10-74 42-86 30-10 66-4 84 20 14 20 10 50-4 70z"/></g>
    <g fill="#A7B4BC"><path d="M70 200c4-20 20-34 40-34s32 10 34 26c-20 6-48 10-74 8z"/></g>
    <rect x="128" y="168" width="34" height="10" rx="4" fill="#6E7C86"/>
    <path class="nv-pour" d="M160 174q16 2 20 58" stroke="#7CCBEE" stroke-width="7" stroke-linecap="round" fill="none" stroke-dasharray="10 6"/>
    <ellipse cx="180" cy="242" rx="46" ry="11" fill="#4FA8D6"/>
    <ellipse class="nv-ripple" cx="180" cy="240" rx="18" ry="5" fill="none" stroke="#FFFFFF" stroke-width="2"/>
    <ellipse class="nv-ripple" cx="180" cy="240" rx="18" ry="5" fill="none" stroke="#FFFFFF" stroke-width="2" style="animation-delay:-1s"/>
    <circle class="nv-drop" cx="172" cy="232" r="3" fill="#BDE6F7"/><circle class="nv-drop" cx="188" cy="232" r="2.5" fill="#BDE6F7" style="animation-delay:-.5s"/>
    <g><path d="M262 238c-22 0-30-20-24-40 4-14 12-20 12-30h24c0 10 8 16 12 30 6 20-2 40-24 40z" fill="#D08B3E"/><path d="M252 168h20v-8h-20z" fill="#B87430"/><path d="M286 176c16 2 16 32-4 40" stroke="#B87430" stroke-width="5" fill="none"/><path d="M246 200c2-10 6-16 10-20" stroke="#F4C58A" stroke-width="4" stroke-linecap="round" fill="none"/></g>
    <g fill="#A6B2BA"><ellipse cx="500" cy="262" rx="20" ry="7"/><ellipse cx="572" cy="252" rx="18" ry="6"/></g>
    <path class="nv-hop" d="M470 248Q536 170 600 240" stroke="#2F78B5" stroke-width="3" stroke-dasharray="6 10" fill="none" stroke-linecap="round"/>
    <g fill="#5BB33E">${[[330, 214], [372, 206], [640, 214], [700, 206], [760, 214], [60, 278], [110, 286]].map(([x, y]) => `<path d="M${x} ${y}l-6-16M${x} ${y}l2-18M${x} ${y}l8-14" stroke="#5BB33E" stroke-width="3" stroke-linecap="round"/>`).join('')}</g>
  </svg>`,

  od: () => `<svg viewBox="0 0 800 300" role="img" aria-label="Od çərşənbəsi: gecə tonqalı və şamlar">
    <defs><linearGradient id="nvod-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1D2550"/><stop offset=".7" stop-color="#3E3262"/><stop offset="1" stop-color="#6A3E5E"/></linearGradient>
    <radialGradient id="nvod-glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFB347" stop-opacity=".55"/><stop offset="1" stop-color="#FFB347" stop-opacity="0"/></radialGradient></defs>
    <rect width="800" height="300" fill="url(#nvod-sky)"/>
    ${[[60, 40], [140, 80], [230, 30], [310, 70], [520, 40], [600, 90], [690, 50], [760, 100], [420, 24], [180, 120]].map(([x, y], i) => `<circle class="nv-twinkle" cx="${x}" cy="${y}" r="${i % 3 ? 1.6 : 2.4}" fill="#FFFFFF" style="animation-delay:${-i * 0.4}s"/>`).join('')}
    <circle cx="660" cy="64" r="22" fill="#FFF3C4"/><circle cx="671" cy="57" r="20" fill="#2A2C58"/>
    <g fill="#2A2245">${[[0, 170, 90, 60], [100, 180, 70, 50], [180, 160, 100, 70], [560, 170, 90, 60], [660, 156, 80, 74], [740, 176, 60, 54]].map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`).join('')}</g>
    <g fill="#FFD27A">${[[30, 190], [130, 196], [210, 180], [250, 200], [590, 190], [690, 176], [700, 206], [760, 196]].map(([x, y], i) => `<rect class="nv-twinkle2" x="${x}" y="${y}" width="12" height="14" rx="2" style="animation-delay:${-i * 0.6}s"/>`).join('')}</g>
    <path d="M0 226H800V300H0z" fill="#2B2140"/>
    <ellipse cx="400" cy="262" rx="260" ry="70" fill="url(#nvod-glow)"/>
    ${fire(400, 268, 1.9, 9)}
    <g><rect x="560" y="246" width="110" height="10" rx="4" fill="#8E5A30"/>${candle(580, 248, 34, 0.9, 0)}${candle(615, 248, 40, 0.9, -0.3)}${candle(650, 248, 34, 0.9, -0.6)}</g>
  </svg>`,

  yel: () => `<svg viewBox="0 0 800 300" role="img" aria-label="Yel çərşənbəsi: külək, çiçəkləyən ağac və yelləncək">
    <defs><linearGradient id="nvyel-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C6E7F7"/><stop offset="1" stop-color="#F0F9FC"/></linearGradient></defs>
    <rect width="800" height="300" fill="url(#nvyel-sky)"/>
    <g class="nv-drift" fill="#FFFFFF"><ellipse cx="560" cy="60" rx="54" ry="15"/><ellipse cx="596" cy="48" rx="32" ry="14"/></g>
    <g class="nv-drift" style="animation-delay:-5s" fill="#FFFFFF" opacity=".85"><ellipse cx="380" cy="100" rx="40" ry="11"/><ellipse cx="404" cy="91" rx="24" ry="10"/></g>
    <path d="M0 210Q220 186 450 206T800 196V300H0z" fill="#A6D97E"/>
    <path d="M0 250Q260 232 520 248T800 242V300H0z" fill="#8CC965"/>
    <g fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round">
      <path class="nv-wind" d="M330 140h160c30 0 40-30 18-38-16-6-28 8-20 18"/>
      <path class="nv-wind" style="animation-delay:-1.2s" d="M420 180h200c26 0 34-24 16-32-14-6-24 6-16 16"/>
      <path class="nv-wind" style="animation-delay:-2.4s" d="M520 120h170c24 0 30-22 14-28-12-4-20 6-14 14"/>
    </g>
    <g class="nv-sway3">
      <path d="M150 262c-6-60 0-110 16-150" stroke="#7A5236" stroke-width="16" stroke-linecap="round" fill="none"/>
      <path d="M164 124c30-20 70-22 120-20M160 150c-30-14-60-14-90 2M168 108c-6-24 0-46 14-62" stroke="#7A5236" stroke-width="7" stroke-linecap="round" fill="none"/>
      <g fill="#FDE3EA">${[[96, 142, 16], [128, 136, 14], [206, 104, 15], [236, 98, 14], [176, 64, 15], [186, 44, 12], [72, 150, 12], [160, 92, 12]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>
      ${[[90, 148], [120, 140], [200, 110], [240, 104], [274, 104], [176, 70], [182, 50], [70, 152], [104, 132], [214, 96], [168, 84], [192, 36], [136, 146], [228, 112]].map(([x, y], i) => `<g class="nv-bloom" style="animation-delay:${-i * 0.5}s"><circle cx="${x}" cy="${y}" r="9" fill="#FFFFFF"/><circle cx="${x}" cy="${y}" r="3.5" fill="#F7B6C8"/></g>`).join('')}
      <g class="nv-swing"><path d="M246 106v104M290 104v106" stroke="#8A6A4A" stroke-width="3"/><rect x="236" y="208" width="64" height="9" rx="3" fill="#C8843C"/></g>
    </g>
    ${[[420, 262, '#EF3340'], [460, 270, '#F2C14E'], [500, 258, '#EF3340'], [640, 266, '#F2C14E'], [690, 256, '#EF3340'], [560, 272, '#F7B6C8']].map(([x, y, c], i) => `<g class="nv-sway" style="animation-delay:${-i * 0.4}s"><path d="M${x} ${y + 26}v-24" stroke="#4A9E32" stroke-width="3"/><path d="M${x - 7} ${y}c0-8 3-12 7-14 4 2 7 6 7 14q-7 6-14 0z" fill="${c}"/></g>`).join('')}
    ${[[0, 0], [1, -1.4], [2, -2.8], [3, -4.2], [4, -5.6]].map(([i, d]) => `<ellipse class="nv-fly" cx="300" cy="${120 + i * 22}" rx="5" ry="3" fill="${i % 2 ? '#F7B6C8' : '#8CC965'}" style="animation-delay:${d}s"/>`).join('')}
  </svg>`,

  torpaq: () => `<svg viewBox="0 0 800 300" role="img" aria-label="Torpaq çərşənbəsi: oyanan torpaq, cücərən tumlar və səməni">
    <defs><linearGradient id="nvtp-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FCE9CC"/><stop offset="1" stop-color="#F3F8E6"/></linearGradient></defs>
    <rect width="800" height="300" fill="url(#nvtp-sky)"/>
    ${sun(110, 70, 34, 10)}
    <path d="M0 176Q240 156 520 172T800 166V200H0z" fill="#A9DA82"/>
    <path d="M0 196Q260 180 520 194T800 190V300H0z" fill="#9A6B45"/>
    <g fill="none" stroke="#7E5434" stroke-width="3" stroke-linecap="round">${[218, 244, 272].map((y) => `<path d="M0 ${y}Q260 ${y - 14} 520 ${y - 2}T800 ${y - 6}"/>`).join('')}</g>
    ${[[218, 0], [244, 1], [272, 2]].map(([y, r]) => [60, 140, 220, 300, 380, 460].map((x, i) => `<g class="nv-grow" style="animation-delay:${-(i * 0.4 + r * 0.9)}s"><path d="M${x + r * 20} ${y - 9}v-18" stroke="#5BB33E" stroke-width="3" stroke-linecap="round"/><path d="M${x + r * 20} ${y - 22}c-8-2-12-8-12-12 8 0 12 6 12 12zM${x + r * 20} ${y - 22}c8-2 12-8 12-12-8 0-12 6-12 12z" fill="#6CC24A"/></g>`).join('')).join('')}
    <g class="nv-float"><g class="nv-flap"><path d="M560 104c-10-14-26-12-24 0s16 12 24 4zM560 104c10-14 26-12 24 0s-16 12-24 4z" fill="#EF3340"/><path d="M560 106c-8 8-18 14-16 20s12 0 16-14zM560 106c8 8 18 14 16 20s-12 0-16-14z" fill="#00B5E2"/></g><path d="M560 96v20" stroke="#3A2A20" stroke-width="2.4" stroke-linecap="round"/></g>
    ${semeni(680, 236, 0.85)}
  </svg>`,

  kosa: () => `<svg viewBox="0 0 800 340" role="img" aria-label="Kosa və Keçəl meydan tamaşasında">
    <defs><linearGradient id="nvks-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D5EEF8"/><stop offset="1" stop-color="#FBF5E8"/></linearGradient></defs>
    <rect width="800" height="340" fill="url(#nvks-sky)"/>
    <path d="M0 40Q400 110 800 40" stroke="#8A6A4A" stroke-width="2" fill="none"/>
    <g class="nv-garland">${Array.from({ length: 15 }, (_, i) => { const x = 30 + i * 52, t = (x / 800); const y = 40 + 2 * t * (1 - t) * 70; return `<path d="M${f(x - 10)} ${f(y)}h20l-10 18z" fill="${['#00B5E2', '#EF3340', '#509E2F'][i % 3]}"/>`; }).join('')}</g>
    <path d="M0 300H800V340H0z" fill="#E6D2A8"/><path d="M0 296H800v8H0z" fill="#D7BF8D"/>
    <g class="nv-dance">
      <ellipse cx="270" cy="312" rx="62" ry="8" fill="#000" opacity=".1"/>
      <rect x="244" y="270" width="18" height="38" rx="6" fill="#4A3626"/><rect x="278" y="270" width="18" height="38" rx="6" fill="#4A3626"/>
      <path d="M232 150q38-16 76 0l22 132q-60 14-120 0z" fill="#EFE3C8"/>
      <path d="M210 282q8 10 16 0 8 10 16 0 8 10 16 0 8 10 16 0 8 10 16 0 8 10 16 0 8 10 16 0 8 10 16 0" stroke="#D9C79E" stroke-width="5" fill="none" stroke-linecap="round"/>
      <g fill="#DCCBA2">${[[250, 180], [282, 196], [240, 236], [296, 240], [266, 262], [262, 214]].map(([x, y]) => `<path d="M${x} ${y}q6-8 12 0q-6 6-12 0z"/>`).join('')}</g>
      <rect x="226" y="208" width="88" height="9" rx="4" fill="#7A4A26"/>
      <g class="nv-jingle">${[240, 258, 276, 294].map((x) => `<path d="M${x} 217v8" stroke="#7A4A26" stroke-width="1.6"/><circle cx="${x}" cy="229" r="5" fill="#E7B416" stroke="#B88A00" stroke-width="1.4"/>`).join('')}</g>
      <path d="M232 156q-24 30-20 70" stroke="#EFE3C8" stroke-width="18" stroke-linecap="round" fill="none"/>
      <path d="M308 156q22 26 22 60" stroke="#EFE3C8" stroke-width="18" stroke-linecap="round" fill="none"/>
      <path d="M206 214l-10 92" stroke="#7A4A26" stroke-width="5" stroke-linecap="round"/>
      <circle cx="210" cy="224" r="8" fill="#F2C9A0"/><circle cx="330" cy="220" r="8" fill="#F2C9A0"/>
      <ellipse cx="270" cy="126" rx="25" ry="29" fill="#F2C9A0"/>
      <path d="M262 150l-2 12M270 152v14M278 150l2 12" stroke="#6B4A2E" stroke-width="2" stroke-linecap="round"/>
      <circle cx="261" cy="122" r="2.6" fill="#2A2018"/><circle cx="279" cy="122" r="2.6" fill="#2A2018"/>
      <path d="M255 114l10-2M275 112l10 2" stroke="#2A2018" stroke-width="2" stroke-linecap="round"/>
      <path d="M263 138q7 4 14 0" stroke="#9E5A3A" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M244 106q26-10 52 0l-14-62q-10-6-22 2z" fill="#5A4636"/>
      <path d="M244 106q26-10 52 0" stroke="#3E3026" stroke-width="5" fill="none" stroke-linecap="round"/>
      <circle cx="267" cy="42" r="6" fill="#E7B416"/>
    </g>
    <g class="nv-bubble-out"><path d="M150 52h76a14 14 0 0 1 14 14v26a14 14 0 0 1-14 14h-40l-12 14-4-14h-20a14 14 0 0 1-14-14V66a14 14 0 0 1 14-14z" fill="#FFFFFF" stroke="#C7D9E4" stroke-width="2"/>
      <g stroke="#5AA9D6" stroke-width="3" stroke-linecap="round"><path d="M188 64v32M174 72l28 16M174 88l28-16"/><path d="M182 66l6 5 6-5M182 94l6-5 6 5"/></g></g>
    <g class="nv-dance2">
      <ellipse cx="530" cy="312" rx="54" ry="8" fill="#000" opacity=".1"/>
      <path d="M506 230h48l10 78h-26l-8-50-8 50h-26z" fill="#2F3B5C"/>
      <path d="M502 304h28v8h-30zM532 304h30l2 8h-32z" fill="#4A3626"/>
      <path d="M498 160q32-14 64 0l-4 76h-56z" fill="#FFFFFF"/>
      <path d="M498 160q10-4 18-6l2 82h-16zM562 160q-10-4-18-6l-2 82h16z" fill="#D7263D"/>
      <rect x="500" y="226" width="60" height="10" rx="4" fill="#E7B416"/>
      <path d="M500 166q-26 24-30 56" stroke="#FFFFFF" stroke-width="15" stroke-linecap="round" fill="none"/>
      <circle cx="470" cy="228" r="8" fill="#F2C9A0"/>
      <path d="M560 166q28-10 40-40" stroke="#FFFFFF" stroke-width="15" stroke-linecap="round" fill="none"/>
      <g class="nv-shake"><circle cx="606" cy="114" r="22" fill="#F2D49A" stroke="#B5803A" stroke-width="5"/>${[0, 72, 144, 216, 288].map((a) => { const r = a * Math.PI / 180; return `<circle cx="${f(606 + Math.cos(r) * 22)}" cy="${f(114 + Math.sin(r) * 22)}" r="3.6" fill="#E7B416" stroke="#B88A00"/>`; }).join('')}</g>
      <circle cx="600" cy="124" r="8" fill="#F2C9A0"/>
      <circle cx="530" cy="126" r="28" fill="#F2C9A0"/>
      <ellipse cx="520" cy="108" rx="10" ry="6" fill="#FFFFFF" opacity=".7"/>
      <circle cx="520" cy="128" r="2.6" fill="#2A2018"/><circle cx="540" cy="128" r="2.6" fill="#2A2018"/>
      <path d="M516 140q14-8 28 0q-4 6-14 3-10 3-14-3z" fill="#4A2E1A"/>
      <path d="M520 146q10 8 20 0" stroke="#9E3A2A" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <circle cx="501" cy="128" r="5" fill="#E9B98E"/><circle cx="559" cy="128" r="5" fill="#E9B98E"/>
    </g>
    <g class="nv-bubble-in"><path d="M596 30h76a14 14 0 0 1 14 14v26a14 14 0 0 1-14 14h-20l-4 14-12-14h-40a14 14 0 0 1-14-14V44a14 14 0 0 1 14-14z" fill="#FFFFFF" stroke="#C7D9E4" stroke-width="2"/>
      <circle cx="634" cy="57" r="9" fill="#FFD24D"/><g stroke="#FFC857" stroke-width="3" stroke-linecap="round"><path d="M634 40v-4M634 74v4M617 57h-4M651 57h4M622 45l-3-3M646 69l3 3M646 45l3-3M622 69l-3 3"/></g></g>
  </svg>`,
};

// Kiçik adət təsvirləri (120x100)
const I = (inner, label) => `<svg viewBox="0 0 120 100" role="img" aria-label="${label}">${inner}</svg>`;
export const ICONS = {
  bulaq: (l) => I(`<path d="M10 90c-4-30 8-56 30-62 20-6 40 2 46 20 4 14 0 30-8 42z" fill="#A7B4BC"/><rect x="58" y="44" width="22" height="8" rx="3" fill="#6E7C86"/><path class="nv-pour" d="M78 48q10 2 12 30" stroke="#7CCBEE" stroke-width="5" stroke-linecap="round" fill="none" stroke-dasharray="10 6"/><ellipse cx="90" cy="84" rx="24" ry="7" fill="#4FA8D6"/><ellipse class="nv-ripple" cx="90" cy="83" rx="10" ry="3" fill="none" stroke="#FFFFFF" stroke-width="1.6"/>`, l),
  'tullanma-su': (l) => I(`<path d="M0 74C30 66 60 86 120 74V96H0z" fill="#5DB7E0"/><path class="nv-flow" d="M6 82C40 76 70 92 116 82" stroke="#FFFFFF" stroke-width="2.4" stroke-dasharray="12 20" fill="none" stroke-linecap="round"/><path d="M0 74V60h22v12zM120 72V58H98v14z" fill="#9ED37A"/><path class="nv-hop" d="M14 58Q60 4 106 56" stroke="#2F78B5" stroke-width="2.6" stroke-dasharray="6 10" fill="none" stroke-linecap="round"/><circle r="6" fill="#EF3340"><animateMotion dur="1.8s" repeatCount="indefinite" path="M14 58Q60 4 106 56"/></circle>`, l),
  cilema: (l) => I(`<g transform="rotate(-28 50 50)"><path d="M50 76c-18 0-24-16-20-32 3-11 10-16 10-24h20c0 8 7 13 10 24 4 16-2 32-20 32z" fill="#D08B3E"/><path d="M42 20h16v-6H42z" fill="#B87430"/></g>${[[78, 30, 0], [86, 44, -0.4], [80, 58, -0.8], [92, 64, -1.2]].map(([x, y, d]) => `<path class="nv-drop2" d="M${x} ${y}c2 4 4 6 4 8a4 4 0 0 1-8 0c0-2 2-4 4-8z" fill="#7CCBEE" style="animation-delay:${d}s"/>`).join('')}`, l),
  tonqal: (l) => I(fire(60, 84, 0.95, 4), l),
  'tullanma-od': (l) => I(`${fire(60, 90, 0.6, 2)}<path class="nv-hop" d="M10 80Q60 -6 110 80" stroke="#EF3340" stroke-width="2.6" stroke-dasharray="6 10" fill="none" stroke-linecap="round"/>`, l),
  sam: (l) => I(candle(60, 92, 44, 1.3, 0), l),
  sondurmeme: (l) => I(`${fire(46, 90, 0.75, 3)}<g transform="translate(86 46)"><path d="M0 -20c7 9 12 15 12 21a12 12 0 0 1-24 0c0-6 5-12 12-21z" fill="#7CCBEE"/><circle r="20" fill="none" stroke="#EF3340" stroke-width="4"/><path d="M-14 -14l28 28" stroke="#EF3340" stroke-width="4" stroke-linecap="round"/></g>`, l),
  tumurcuq: (l) => I(`<path d="M10 86C40 70 70 50 110 20" stroke="#7A5236" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M50 62l-8-18M80 42l4-20" stroke="#7A5236" stroke-width="3" stroke-linecap="round"/>${[[42, 42], [84, 20], [102, 26], [62, 54], [28, 72]].map(([x, y], i) => `<g class="nv-bloom" style="animation-delay:${-i * 0.5}s"><circle cx="${x}" cy="${y}" r="9" fill="#FFFFFF" stroke="#F7B6C8" stroke-width="1.5"/><circle cx="${x}" cy="${y}" r="3.4" fill="#F2C14E"/></g>`).join('')}`, l),
  temizlik: (l) => I(`<g class="nv-sweep"><path d="M70 6L52 66" stroke="#8A5A3A" stroke-width="5" stroke-linecap="round"/><path d="M40 62h28l10 26H30z" fill="#E7B416"/><path d="M38 70h34M36 78h40" stroke="#B88A00" stroke-width="2"/></g>${[[90, 86, 0], [100, 80, -0.6], [86, 76, -1.2]].map(([x, y, d]) => `<circle class="nv-dust" cx="${x}" cy="${y}" r="5" fill="#D9CDB8" style="animation-delay:${d}s"/>`).join('')}<path d="M0 94h120" stroke="#C8B79A" stroke-width="3"/>`, l),
  yellencek: (l) => I(`<path d="M10 8h100" stroke="#7A5236" stroke-width="6" stroke-linecap="round"/><g class="nv-swing2"><path d="M42 8v62M78 8v62" stroke="#8A6A4A" stroke-width="2.6"/><rect x="34" y="68" width="52" height="8" rx="3" fill="#C8843C"/></g>`, l),
  semeni: (l) => I(`<g class="nv-grow2">${semeni(60, 70, 0.6)}</g>`, l),
  papaq: (l) => I(`<rect x="14" y="6" width="56" height="88" rx="4" fill="#A0673A"/><rect x="20" y="12" width="44" height="76" rx="3" fill="#B87A48"/><circle cx="58" cy="52" r="3" fill="#E7B416"/><path d="M0 94h120" stroke="#C8B79A" stroke-width="3"/><path d="M72 92c-2-16 6-26 20-26s22 10 20 26z" fill="#4A3B33"/><path d="M70 92h44" stroke="#2E2420" stroke-width="4" stroke-linecap="round"/>${[[86, 0, '#EF3340'], [96, -0.7, '#F2C14E'], [92, -1.4, '#509E2F']].map(([x, d, c]) => `<rect class="nv-candy" x="${x}" y="30" width="8" height="6" rx="2" fill="${c}" style="animation-delay:${d}s"/>`).join('')}`, l),
  qulaq: (l) => I(`<rect x="10" y="6" width="58" height="88" rx="4" fill="#A0673A"/><path d="M68 6l18 8v74l-18 6z" fill="#7A4A26"/><circle cx="76" cy="52" r="3" fill="#E7B416"/><path d="M0 94h120" stroke="#C8B79A" stroke-width="3"/>${[0, 1, 2].map((i) => `<path class="nv-wave" d="M${94 + i * 8} ${40 - i * 4}q${8 + i * 2} ${12 + i * 4} 0 ${24 + i * 8}" stroke="#2F78B5" stroke-width="3" fill="none" stroke-linecap="round" style="animation-delay:${-i * 0.35}s"/>`).join('')}`, l),
  yumurta: (l) => I(`<g class="nv-clash1">${egg(38, 58, '#C8452F', 1.5)}</g><g class="nv-clash2">${egg(82, 58, '#F2C14E', 1.5, '#C8452F')}</g><path class="nv-spark2" d="M60 30l2 6 6 1-5 4 2 6-5-4-5 4 2-6-5-4 6-1z" fill="#F2A33A"/>`, l),
  samlar: (l) => I(`<rect x="12" y="88" width="96" height="8" rx="3" fill="#8E5A30"/>${candle(30, 90, 36, 0.9, 0)}${candle(60, 90, 46, 0.9, -0.35)}${candle(90, 90, 36, 0.9, -0.7)}`, l),
  sufre: (l) => I(`<ellipse cx="60" cy="82" rx="50" ry="12" fill="#2F78B5"/><ellipse cx="60" cy="78" rx="44" ry="9" fill="#FFFFFF"/><path d="M24 78c4-24 20-34 36-34s32 10 36 34z" fill="#F2D49A"/><g fill="#E7B416">${[[40, 64], [58, 56], [76, 66], [50, 72], [70, 74]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3"/>`).join('')}</g><g fill="#C8452F">${[[46, 58], [66, 62], [60, 70]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.4"/>`).join('')}</g>${[44, 60, 76].map((x, i) => `<path class="nv-steam" d="M${x} 38c-6-6 6-12 0-18s6-12 0-18" stroke="#B9C7D1" stroke-width="3" fill="none" stroke-linecap="round" style="animation-delay:${-i * 0.6}s"/>`).join('')}`, l),
  pay: (l) => I(`<g class="nv-bob"><ellipse cx="60" cy="78" rx="46" ry="12" fill="#C8843C"/><ellipse cx="60" cy="74" rx="40" ry="9" fill="#E3A15B"/><path d="M30 72c4-26 18-36 30-36s26 10 30 36z" fill="#EF3340"/><path d="M60 36c-6-10-18-8-16 0 2 6 12 4 16 0zM60 36c6-10 18-8 16 0-2 6-12 4-16 0z" fill="#509E2F"/><path d="M36 60q24 8 48 0" stroke="#F2C14E" stroke-width="3" fill="none"/></g>`, l),
  barisiq: (l) => I(`<g class="nv-merge1"><path d="M44 74C20 58 14 44 22 34s20-6 22 4c2-10 14-14 22-4s2 24-22 40z" fill="#EF3340"/></g><g class="nv-merge2"><path d="M76 74C52 58 46 44 54 34s20-6 22 4c2-10 14-14 22-4s2 24-22 40z" fill="#00B5E2" opacity=".9"/></g>`, l),
  // Çərşənbə kartları üçün böyük ikonlar
  'el-su': (l) => I(`<path d="M60 8c18 24 30 40 30 56a30 30 0 0 1-60 0c0-16 12-32 30-56z" fill="#5DB7E0"/><path class="nv-flow" d="M36 66c8-6 16 6 24 0s16 6 24 0" stroke="#FFFFFF" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-dasharray="10 6"/><path class="nv-flow" d="M40 78c8-6 14 4 20 0s14 4 20 0" stroke="#FFFFFF" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="10 6" style="animation-delay:-.8s"/><ellipse cx="48" cy="40" rx="5" ry="9" fill="#FFFFFF" opacity=".5"/>`, l),
  'el-od': (l) => I(fire(60, 92, 1.15, 4), l),
  'el-yel': (l) => I(`<g fill="none" stroke="#5AA9D6" stroke-width="5" stroke-linecap="round"><path class="nv-wind2" d="M10 36h62c16 0 22-18 10-24-10-4-18 4-12 12"/><path class="nv-wind2" style="animation-delay:-.6s" d="M10 56h84c14 0 20-16 8-22-8-4-16 4-10 10"/><path class="nv-wind2" style="animation-delay:-1.2s" d="M10 76h56c14 0 18 16 8 20-8 4-16-4-10-10"/></g>`, l),
  'el-torpaq': (l) => I(`<path d="M8 92c8-24 30-34 52-34s44 10 52 34z" fill="#9A6B45"/><path d="M26 84q34-12 68 0" stroke="#7E5434" stroke-width="3" fill="none" stroke-linecap="round"/><g class="nv-grow"><path d="M60 60V28" stroke="#5BB33E" stroke-width="4" stroke-linecap="round"/><path d="M60 40c-14-2-20-12-20-20 12 0 20 10 20 20zM60 34c12-2 18-12 18-20-12 0-18 10-18 20z" fill="#6CC24A"/></g>`, l),
};

// İnteraktiv xonça: hər nemət ayrıca qrupdur (data-k), üzərinə gələndə önə çıxır
const sekerbura = (x, y) => `<path d="M${x - 24} ${y}Q${x} ${y + 24} ${x + 24} ${y}Q${x} ${y - 12} ${x - 24} ${y}z" fill="#F0C987" stroke="#D9A65A" stroke-width="2"/>${[-15, -9, -3, 3, 9, 15].map((i) => `<path d="M${x + i - 2} ${y + 3}l2 4 2-4" stroke="#C98A3E" stroke-width="1.6" fill="none"/>`).join('')}`;
const paxlava = (x, y) => `<path d="M${x} ${y - 18}L${x + 15} ${y}L${x} ${y + 18}L${x - 15} ${y}z" fill="#D99A3E" stroke="#B57422" stroke-width="2"/><path d="M${x} ${y - 10}L${x + 8} ${y}L${x} ${y + 10}L${x - 8} ${y}z" fill="none" stroke="#F2C98A" stroke-width="1.4"/><circle cx="${x}" cy="${y}" r="3.6" fill="#7A4A26"/>`;
const qogal = (x, y, r = 24) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#E8B04A" stroke="#C98A3E" stroke-width="2"/><path d="M${x} ${y}m-2 0a2 2 0 1 1 4 0a6 6 0 1 1-12 0a10 10 0 1 1 20 0a14 14 0 1 1-28 0" stroke="#B7782A" stroke-width="2" fill="none"/><ellipse cx="${x - 8}" cy="${y - 10}" rx="7" ry="4" fill="#FFF3C4" opacity=".55"/>`;
const nuts = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="7.5" fill="#A97B4F"/><path d="M${x} ${y - 7}v14" stroke="#7A5434" stroke-width="1.4"/><circle cx="${x + 16}" cy="${y + 4}" r="5.5" fill="#8B5A2B"/><path d="M${x + 12} ${y}h8" stroke="#6A4020" stroke-width="2"/><circle cx="${x - 15}" cy="${y + 5}" r="5" fill="#8B5A2B"/><ellipse cx="${x + 4}" cy="${y + 12}" rx="7" ry="3.6" fill="#D9B48A" transform="rotate(-20 ${x + 4} ${y + 12})"/><ellipse cx="${x - 8}" cy="${y + 13}" rx="6" ry="3.2" fill="#D9B48A" transform="rotate(25 ${x - 8} ${y + 13})"/>${[[x + 24, y + 12], [x + 28, y + 6], [x - 22, y + 14], [x + 18, y + 16]].map(([a, b]) => `<ellipse cx="${a}" cy="${b}" rx="2.6" ry="2" fill="#5A2E2E"/>`).join('')}`;

export function xonca() {
  const g = (k, label, inner) => `<g class="xi" data-k="${k}" tabindex="0" role="button" aria-label="${label}">${inner}</g>`;
  return `<svg viewBox="0 0 600 380" class="xonca-svg" role="group" aria-label="Novruz xonçası">
    <defs><radialGradient id="nvx-tray" cx=".45" cy=".35" r=".7"><stop offset="0" stop-color="#F4C27F"/><stop offset="1" stop-color="#D98E43"/></radialGradient></defs>
    <ellipse cx="300" cy="268" rx="268" ry="104" fill="#000" opacity=".1"/>
    <ellipse cx="300" cy="252" rx="262" ry="100" fill="#B8742F"/>
    <ellipse cx="300" cy="246" rx="248" ry="92" fill="url(#nvx-tray)"/>
    <ellipse cx="300" cy="246" rx="214" ry="78" fill="none" stroke="#C8843C" stroke-width="2" stroke-dasharray="2 6"/>
    <ellipse cx="300" cy="246" rx="232" ry="85" fill="none" stroke="#FCE0B0" stroke-width="1.4" opacity=".7"/>
    ${g('sam', 'Şam', candle(150, 214, 46, 1, 0) + candle(450, 214, 46, 1, -0.5) + candle(88, 262, 40, 1, -0.25) + candle(512, 262, 40, 1, -0.75))}
    ${g('semeni', 'Səməni', semeni(300, 232, 1))}
    ${g('qogal', 'Qoğal', qogal(176, 284) + qogal(138, 236, 18))}
    ${g('paxlava', 'Paxlava', paxlava(432, 292) + paxlava(466, 268) + paxlava(400, 270))}
    ${g('yumurta', 'Boyanmış yumurta', egg(232, 312, '#C8452F', 1.15) + egg(262, 324, '#4FA3D9', 1.1) + egg(204, 324, '#F2C14E', 1.05) + egg(232, 334, '#6CC24A', 1))}
    ${g('sekerbura', 'Şəkərbura', sekerbura(346, 320) + sekerbura(386, 306))}
    ${g('quru', 'Qoz, fındıq, badam, kişmiş', nuts(478, 312) + nuts(300, 326))}
  </svg>`;
}
