// Hadisələr admin paneldən idarə olunur: hər hadisə src/data/cms/tarix/ qovluğunda ayrıca JSON faylıdır
const FILES = import.meta.glob('../data/cms/tarix/*.json', { eager: true, import: 'default' });
const EVENTS = Object.values(FILES).map((e) => [+e.ay, +e.gun, +e.il, e.nov, e.basliq, e.metn]);
import { esc } from './search.js';

export const MONTHS = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avqust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'];
export const MONTH_TITLES = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];
export const DAYS_IN = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Hər növün öz rəngi və hərəkətli ikonu var (48x48)
export const TYPES = {
  dovlet: { label: 'Dövlətçilik', c: '#0A6E99', bg: '#E2F0F7', svg: '<g class="a-pulse"><polygon points="24.00,6.00 28.40,13.38 36.73,11.27 34.62,19.60 42.00,24.00 34.62,28.40 36.73,36.73 28.40,34.62 24.00,42.00 19.60,34.62 11.27,36.73 13.38,28.40 6.00,24.00 13.38,19.60 11.27,11.27 19.60,13.38"/></g><circle cx="24" cy="24" r="5" fill="#fff"/>' },
  zefer: { label: 'Zəfər', c: '#2F7A1E', bg: '#E5F4E3', svg: '<path d="M12 7v35" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><g class="a-wave"><rect x="13" y="9" width="24" height="6" fill="#00B5E2"/><rect x="13" y="15" width="24" height="6" fill="#EF3340"/><rect x="13" y="21" width="24" height="6" fill="#509E2F"/><circle cx="24" cy="18" r="2.3" fill="#fff"/><circle cx="24.9" cy="18" r="1.9" fill="#EF3340"/></g>' },
  doyus: { label: 'Döyüş', c: '#B11D30', bg: '#FCE9EB', svg: '<g class="a-sw1"><path d="M17 31 33 13" stroke="#93A1AE" stroke-width="3"/><path d="M33 13l3.6-3.6-1.4 5z" fill="#93A1AE"/><path d="M12.5 27.5l8 8" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/><path d="M16 32l-5 5" stroke="currentColor" stroke-width="3.6" stroke-linecap="round"/><circle cx="10" cy="38" r="2.4"/></g><g class="a-sw2"><path d="M31 31 15 13" stroke="#93A1AE" stroke-width="3"/><path d="M15 13l-3.6-3.6 1.4 5z" fill="#93A1AE"/><path d="M35.5 27.5l-8 8" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/><path d="M32 32l5 5" stroke="currentColor" stroke-width="3.6" stroke-linecap="round"/><circle cx="38" cy="38" r="2.4"/></g><path class="a-spark" d="M24 15l1.4 3.2 3.4.4-2.6 2.2.8 3.3-3-1.8-3 1.8.8-3.3-2.6-2.2 3.4-.4z" fill="#F2A33A"/>' },
  anim: { label: 'Anım', c: '#3D4B5A', bg: '#ECEEF2', svg: '<circle class="a-glow" cx="24" cy="15" r="9" fill="#F7C35B" opacity=".25"/><rect x="18.5" y="21" width="11" height="18" rx="2" fill="currentColor"/><path d="M15 40h18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M24 21v-2.5" stroke="#2A2F36" stroke-width="1.4"/><g class="a-flame"><path d="M24 7c3.2 4.2 4.4 6.5 4.4 8.8a4.4 4.4 0 0 1-8.8 0C19.6 13.5 21 11.2 24 7z" fill="#F2A33A"/><path d="M24 11.5c1.6 2.2 2.2 3.4 2.2 4.6a2.2 2.2 0 0 1-4.4 0c0-1.2.7-2.4 2.2-4.6z" fill="#FFE07A"/></g>' },
  medeniyyet: { label: 'Ədəbiyyat və mədəniyyət', c: '#9A6400', bg: '#FFF3DB', svg: '<g stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M24 14c-5-3-11-3-16-1v23c5-2 11-2 16 1z" fill="#fff"/><path d="M24 14c5-3 11-3 16-1v23c-5-2-11-2-16 1z" fill="#fff"/><path class="a-flip" d="M24 14c5-3 11-3 16-1v23c-5-2-11-2-16 1z" fill="#FFE7B0"/></g><path d="M12 19c3-.8 6-.8 9 .4M12 24c3-.8 6-.8 9 .4M12 29c3-.8 6-.8 9 .4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity=".55"/>' },
  musiqi: { label: 'Musiqi', c: '#6A3FB5', bg: '#F0E9FB', svg: '<g class="a-bob"><path d="M19 31V13l15-3v18" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round"/><path d="M19 13l15-3v5l-15 3z" fill="currentColor"/><ellipse cx="15.5" cy="31.5" rx="4.5" ry="3.4" transform="rotate(-20 15.5 31.5)" fill="currentColor"/><ellipse cx="30.5" cy="28.5" rx="4.5" ry="3.4" transform="rotate(-20 30.5 28.5)" fill="currentColor"/></g><g class="a-float"><path d="M39 20v-7l3-.6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="37.6" cy="20.4" r="1.9" fill="currentColor"/></g>' },
  elm: { label: 'Elm və təhsil', c: '#137A7A', bg: '#E2F3F3', svg: '<g class="a-spin2" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="24" cy="24" rx="16" ry="6.2"/><ellipse cx="24" cy="24" rx="16" ry="6.2" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="16" ry="6.2" transform="rotate(120 24 24)"/><circle cx="40" cy="24" r="2" fill="currentColor" stroke="none"/></g><circle cx="24" cy="24" r="3.6" fill="currentColor"/>' },
  neft: { label: 'Neft və sənaye', c: '#5A4632', bg: '#F2ECE3', svg: '<path d="M6 41h36" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M19 41l5-18 5 18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><g class="a-nod"><path d="M9 21h29" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/><path d="M9 15c-4 2-4 10 0 12z" fill="currentColor"/><rect x="34" y="17" width="7" height="8" rx="2" fill="currentColor"/></g><path d="M7 27v13" stroke="currentColor" stroke-width="1.6"/><path class="a-drip" d="M13 31c1.4 2 2 3 2 3.8a2 2 0 0 1-4 0c0-.8.6-1.8 2-3.8z" fill="#2A2018"/>' },
  diplomatiya: { label: 'Diplomatiya', c: '#2756A8', bg: '#E5EDFA', svg: '<circle cx="24" cy="24" r="15" fill="#fff" stroke="currentColor" stroke-width="2.2"/><path d="M9 24h30M11 16.5h26M11 31.5h26" stroke="currentColor" stroke-width="1.5" opacity=".6"/><ellipse class="a-turn" cx="24" cy="24" rx="15" ry="15" fill="none" stroke="currentColor" stroke-width="1.8"/><ellipse class="a-turn2" cx="24" cy="24" rx="15" ry="15" fill="none" stroke="currentColor" stroke-width="1.8"/>' },
  idman: { label: 'İdman', c: '#A87A00', bg: '#FFF5D4', svg: '<g class="a-swing"><path d="M17 5l7 15 7-15" fill="none" stroke="#00B5E2" stroke-width="3.6" stroke-linejoin="round"/><path d="M21 5l3 7 3-7" fill="none" stroke="#EF3340" stroke-width="2"/><circle cx="24" cy="30" r="10" fill="#E7B416" stroke="#B88A00" stroke-width="2"/><path d="M24 24.5l1.7 3.5 3.8.5-2.8 2.6.7 3.8-3.4-1.9-3.4 1.9.7-3.8-2.8-2.6 3.8-.5z" fill="#fff"/></g>' },
  neqliyyat: { label: 'Nəqliyyat', c: '#2D5B78', bg: '#E5EFF5', svg: '<g class="a-bump"><rect x="13" y="6" width="22" height="27" rx="6" fill="currentColor"/><rect x="16.5" y="10" width="15" height="9" rx="2" fill="#fff"/><circle class="a-blink" cx="18.5" cy="26" r="2" fill="#FFE07A"/><circle class="a-blink" cx="29.5" cy="26" r="2" fill="#FFE07A"/></g><path d="M17 33l-5 9M31 33l5 9" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M7 42h34" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path class="a-rail" d="M9 39h30" stroke="currentColor" stroke-width="2.4" stroke-dasharray="2 4"/>' },
};

export const key = (m, d) => `${m}-${d}`;
export const slug = (m, d) => `${d}-${MONTHS[m - 1]}`;
export const dateTitle = (m, d) => `${d} ${MONTHS[m - 1]}`;

export const BY_DAY = {};
for (const [m, d, y, t, title, text] of EVENTS) (BY_DAY[key(m, d)] ||= []).push({ m, d, y, t, title, text });
for (const k in BY_DAY) BY_DAY[k].sort((a, b) => a.y - b.y);
export const EVENT_DAYS = Object.keys(BY_DAY).map((k) => k.split('-').map(Number)).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
export const COUNT = EVENTS.length;

export function fromSlug(s) {
  const m = /^(\d{1,2})-([a-z]+)$/.exec(s || '');
  if (!m) return null;
  const mo = MONTHS.indexOf(m[2]) + 1, d = +m[1];
  return mo && d >= 1 && d <= DAYS_IN[mo - 1] ? [mo, d] : null;
}

export const icon = (t, cls = '') => `<span class="ti ${cls}" style="--c:${TYPES[t].c};--bg:${TYPES[t].bg}" aria-hidden="true"><svg viewBox="0 0 48 48" fill="currentColor">${TYPES[t].svg}</svg></span>`;

// Seçilmiş günün xronologiyası
export function dayHTML(m, d) {
  const ev = BY_DAY[key(m, d)];
  if (!ev) {
    const i = EVENT_DAYS.findIndex(([a, b]) => a > m || (a === m && b > d));
    const near = [0, 1, 2].map((k) => EVENT_DAYS[((i < 0 ? 0 : i) + k) % EVENT_DAYS.length]);
    return `<div class="tg-empty"><p>${esc(dateTitle(m, d))} üçün hələ qeyd əlavə olunmayıb. Təqvim tədricən dolur.</p><span class="tg-near-h">Yaxın tarixlər</span><div class="tg-near">${near.map(([a, b]) => `<button type="button" class="chip" data-go="${a}-${b}">${esc(dateTitle(a, b))} <span class="n">${BY_DAY[key(a, b)].length}</span></button>`).join('')}</div></div>`;
  }
  return `<ol class="tl">${ev.map((e) => `<li class="tl-i">${icon(e.t)}<div class="tl-b"><div class="tl-h"><span class="tl-y">${e.y}</span><span class="tl-t" style="color:${TYPES[e.t].c}">${esc(TYPES[e.t].label)}</span></div><h3>${esc(e.title)}</h3><p>${esc(e.text)}</p></div></li>`).join('')}</ol>`;
}

// Ayın bütün hadisələri, gün və il sırası ilə
export function monthHTML(m) {
  const days = EVENT_DAYS.filter(([a]) => a === m);
  if (!days.length) return '<p class="muted">Bu ay üçün hələ qeyd yoxdur.</p>';
  return `<ol class="mo">${days.map(([a, b]) => BY_DAY[key(a, b)].map((e) => `<li><button type="button" class="mo-i" data-go="${a}-${b}">${icon(e.t, 'sm')}<span class="mo-d">${esc(dateTitle(a, b))}, ${e.y}</span><span class="mo-t">${esc(e.title)}</span></button></li>`).join('')).join('')}</ol>`;
}

// Ayın təqvimi: hadisəsi olan günlərin altında nöqtə var
export function calHTML(m, sel, today) {
  let h = '';
  for (let d = 1; d <= DAYS_IN[m - 1]; d++) {
    const k = key(m, d), cls = [BY_DAY[k] ? 'has' : '', k === sel ? 'sel' : '', k === today ? 'today' : ''].filter(Boolean).join(' ');
    h += `<button type="button" data-go="${k}" class="${cls}" aria-label="${esc(dateTitle(m, d))}${BY_DAY[k] ? ', ' + BY_DAY[k].length + ' hadisə' : ''}"${k === sel ? ' aria-current="date"' : ''}>${d}</button>`;
  }
  return h;
}
