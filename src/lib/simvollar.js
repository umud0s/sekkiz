// Azərbaycana aid simvollar: giriş ekranında və profil şəkillərində işlədilir.
// Hər simvol yuxarı baxan vəziyyətdə, (0,0) ətrafında ±17 ölçüsündə çəkilib. Rəng --c dəyişənindədir:
// ".f" elementləri fill, ".s" elementləri stroke kimi boyanır.
import { STAR_POINTS } from './site.js';

export const SIMVOL = {
  alov: ['Alov', '<path class="f" style="--c:#EF3340" d="M0-17C6-10 13-4 11 5 9.5 12 5 16 0 16S-9.5 12-11 5C-12.5-1-8-6-5-10-4.5-5-2-3-1-2 0-7-1-12 0-17Z"/><path class="f" style="--c:#F2B53A" d="M0 2C4 6 6 9 5 12 4 14.6 2 16 0 16S-4 14.6-5 12C-6 9-3 6 0 2Z"/>'],
  buta: ['Buta', '<path class="f" style="--c:#B5213A" d="M3 16C-6 17-12 10-11 2-10-6-3-11 3-14 5-15 7-17 7-17 8-13 12-7 12 1 12 9 9 15 3 16Z"/><path class="f" style="--c:#F2C14E" d="M2 11C-3 11-6 7-5 3-4-1 0-4 4-6 5-2 7 2 6 6 6 9 4 11 2 11Z"/><circle class="f" style="--c:#B5213A" cx="1" cy="5" r="1.8"/>'],
  semeni: ['Səməni', '<g fill="none" stroke-width="2.4" stroke-linecap="round"><path class="s" style="--c:#509E2F" d="M-8 8C-9 0-8-8-6-14M-3 8C-4-1-3-9-1-16M2 8C2-2 3-10 5-16M7 8C8 0 9-6 11-12"/><path class="s" style="--c:#EF3340" stroke-width="3" d="M-10 5H11"/></g><ellipse class="f" style="--c:#C8843C" cx="0" cy="11" rx="13" ry="4.5"/>'],
  nar: ['Nar', '<circle class="f" style="--c:#C8102E" cx="0" cy="3" r="12.5"/><path class="f" style="--c:#8E1520" d="M-4.5-8L-3.5-14-1-10.5 0-15 1-10.5 3.5-14 4.5-8Z"/><ellipse cx="-4.5" cy="-1" rx="2.6" ry="4" fill="#FFFFFF" opacity=".35"/>'],
  xaribulbul: ['Xarıbülbül', '<path class="s" style="--c:#4E7A3A" d="M-2 17C-2 6 0-4 6-10" fill="none" stroke-width="2"/><path class="f" style="--c:#4E7A3A" d="M-2 9C-9 7-12 2-12-3-6-2-3 3-2 9Z"/><g class="f" style="--c:#5A2A67"><path d="M6-10C1-8-1-2 1 4 4 1 5-4 6-10Z"/><path d="M6-10C4-4 5 2 9 6 10 1 9-5 6-10Z"/><path d="M6-10C10-6 13-2 14 3 14-2 11-8 6-10Z"/></g>'],
  sunbul: ['Sünbül', '<path class="s" style="--c:#B98510" d="M0 17V-12" fill="none" stroke-width="1.8"/><g class="f" style="--c:#E0A526"><ellipse cx="0" cy="-14" rx="2.4" ry="4"/><ellipse cx="-3.4" cy="-8" rx="2.4" ry="4.2" transform="rotate(-28 -3.4 -8)"/><ellipse cx="3.4" cy="-8" rx="2.4" ry="4.2" transform="rotate(28 3.4 -8)"/><ellipse cx="-3.4" cy="-1" rx="2.4" ry="4.2" transform="rotate(-28 -3.4 -1)"/><ellipse cx="3.4" cy="-1" rx="2.4" ry="4.2" transform="rotate(28 3.4 -1)"/><ellipse cx="-3.4" cy="6" rx="2.4" ry="4.2" transform="rotate(-28 -3.4 6)"/><ellipse cx="3.4" cy="6" rx="2.4" ry="4.2" transform="rotate(28 3.4 6)"/></g>'],
  bayraq: ['Bayraq', `<rect class="f" style="--c:#00B5E2" x="-16" y="-11" width="32" height="7.4" rx="1.5"/><rect class="f" style="--c:#EF3340" x="-16" y="-3.7" width="32" height="7.4"/><rect class="f" style="--c:#509E2F" x="-16" y="3.6" width="32" height="7.4" rx="1.5"/><circle cx="-1.2" r="2.9" fill="#FFFFFF"/><circle class="f" style="--c:#EF3340" cx="-0.3" r="2.4"/><polygon points="${STAR_POINTS}" transform="translate(2.6 0) scale(.017)" fill="#FFFFFF"/>`],
  xalca: ['Xalça', '<path class="f" style="--c:#8E1520" d="M0-16L14 0 0 16-14 0Z"/><path class="f" style="--c:#F2C14E" d="M0-10.5L9 0 0 10.5-9 0Z"/><path class="f" style="--c:#1B2A5C" d="M0-5L4.5 0 0 5-4.5 0Z"/>'],
  tar: ['Tar', '<path class="f" style="--c:#5B3416" d="M-1.6-17H1.6V-6H-1.6Z"/><path class="f" style="--c:#8B4A22" d="M0 17C-8 17-10.5 11-8.5 6.5-7.5 4.5-5 3.5-5 1.2-5-1-7-2.3-6.2-5-5.4-7.8-2.6-9 0-9S5.4-7.8 6.2-5C7-2.3 5-1 5 1.2 5 3.5 7.5 4.5 8.5 6.5 10.5 11 8 17 0 17Z"/><ellipse class="f" style="--c:#E8C99A" cx="0" cy="11" rx="4.4" ry="4.2"/><path d="M0-15V14" stroke="#F5E6C8" stroke-width=".6"/><path class="f" style="--c:#5B3416" d="M-4-16H4V-14H-4Z"/>'],
  qizqalasi: ['Qız qalası', '<path class="f" style="--c:#B08C55" d="M8 17V1C13.5 2 15 9 14 17Z"/><path class="f" style="--c:#C9A46A" d="M-9 17V-8C-9-12-5.5-15 0-15S9-12 9-8V17Z"/><g class="f" style="--c:#6B4F2A"><rect x="-1.5" y="-9" width="3" height="4.5" rx="1.5"/><rect x="-1.5" y="0" width="3" height="4.5" rx="1.5"/><path d="M-3.5 17V12.5C-3.5 10.5-2 9.5 0 9.5S3.5 10.5 3.5 12.5V17Z"/></g>'],
  stekan: ['Armudu stəkan', '<ellipse class="f" style="--c:#C8A04A" cx="0" cy="15" rx="12" ry="2.8"/><path class="f" style="--c:#B5482A" d="M-6-12H6C6-7 3-4.5 3-2 3 1 7.5 4 7.5 8.5 7.5 12.5 4.5 14.5 0 14.5S-7.5 12.5-7.5 8.5C-7.5 4-3 1-3-2-3-4.5-6-7-6-12Z"/><path class="s" style="--c:#7A2A14" d="M-6.5-12.5H6.5" fill="none" stroke-width="1.6" stroke-linecap="round"/><path d="M-4.5 4C-6 6-6 9-4.5 11" stroke="#FFFFFF" stroke-opacity=".45" stroke-width="1.4" fill="none" stroke-linecap="round"/>'],
  sekkizguse: ['Səkkizguşə', `<polygon class="f" style="--c:#0A6E99" points="${STAR_POINTS}" transform="scale(.17)"/><polygon class="f" style="--c:#F2C14E" points="${STAR_POINTS}" transform="scale(.07)"/>`],
};

// Profil şəklinin fon rəngi
const FON = {
  alov: '#FDE7E3', buta: '#FCEFD6', semeni: '#E6F2DD', nar: '#FBE3E6', xaribulbul: '#EDE4F1', sunbul: '#FBF0D2',
  bayraq: '#E3F3FA', xalca: '#F6E6DA', tar: '#F3E7DA', qizqalasi: '#EEE9DF', stekan: '#F8E8E0', sekkizguse: '#DCEBF4',
};

// Profil şəkli: dairədə simvol
export function avatarSvg(id, size = 40) {
  const s = SIMVOL[id] || SIMVOL.sekkizguse;
  return `<svg class="av" width="${size}" height="${size}" viewBox="-26 -26 52 52" role="img" aria-label="${s[0]}"><circle r="26" fill="${FON[id] || '#DCEBF4'}"/><g transform="scale(1.08)">${s[1]}</g></svg>`;
}
