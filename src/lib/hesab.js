// Brauzer tərəfi: hesab API-si, daxil olmuş istifadəçi və reytinq cədvəli.
import { avatarSvg } from './simvollar.js';
import { OYUNLAR, XERITE_ERAZI, DIYAR_SUAL } from './hesab-sabit.js';

export { avatarSvg };
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export async function api(path, body) {
  const opt = body === undefined ? {} : { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) };
  let r;
  try { r = await fetch(path, { ...opt, credentials: 'same-origin' }); } catch { throw Object.assign(new Error('İnternet bağlantısını yoxlayın.'), { status: 0 }); }
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw Object.assign(new Error(d.xeta || 'Serverlə əlaqə alınmadı. Bir az sonra yenidən cəhd edin.'), { status: r.status });
  return d;
}

// Daxil olmuş istifadəçinin hamıya açıq məlumatı brauzerdə saxlanır ki, menyu dərhal göstərilsin
const KEY = 'sk-men';
export function cached() { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { return null; } }
export function setCached(u) {
  try {
    if (u) localStorage.setItem(KEY, JSON.stringify({ ad: u.ad, username: u.username, avatar: u.avatar }));
    else localStorage.removeItem(KEY);
  } catch { /* yaddaş bağlıdır */ }
  dispatchEvent(new CustomEvent('sk-men', { detail: u || null }));
}
let menP = null;
// Serverdən təzə məlumat; bağlantı olmasa yaddaşdakı qaytarılır
export function men(force) {
  if (!menP || force) {
    menP = api('/api/men').then((d) => { setCached(d.user); return d; }).catch(() => ({ user: cached(), oflayn: true }));
  }
  return menP;
}

// Oyun nəticəsi: yalnız daxil olmuş istifadəçi üçün göndərilir
export function gonder(oyun, data) {
  if (!cached()) return Promise.resolve(null);
  return api('/api/netice', { oyun, ...data })
    .then((d) => { dispatchEvent(new CustomEvent('sk-reytinq', { detail: oyun })); return d; })
    .catch((e) => { if (e.status === 401) setCached(null); return null; });
}

export const adHtml = (u) => `<span class="nm">${esc(u.ad)}</span> <span class="un">#${esc(u.username)}</span>`;

const saat = (ms) => { const s = Math.round(ms / 1000); return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; };
// Nəticənin yazılışı hər oyun üçün
export const NETICE = {
  xerite: (r) => (r.vaxt ? `${r.xal} ərazi · ${saat(r.vaxt)}` : `${r.xal} ərazi`),
  diyar: (r) => (r.vaxt ? `${r.xal} düz cavab · ${saat(r.vaxt)}` : `${r.xal} düz cavab`),
  sozu: (r) => `${r.xal} xal`,
};
// Reytinq cədvəlinin nəticə sütunları: [başlıq, dəyər]
const SUTUN = {
  // Bərabər nəticədə oyunda daha az vaxt keçirən öndədir, vaxt ayrıca sütunda göstərilir
  xerite: [['Tapılan', (r) => `${r.xal} / ${XERITE_ERAZI}`], ['Vaxt', (r) => (r.vaxt ? saat(r.vaxt) : '—')]],
  diyar: [['Düz cavab', (r) => `${r.xal} / ${DIYAR_SUAL}`], ['Vaxt', (r) => (r.vaxt ? saat(r.vaxt) : '—')]],
  sozu: [['Xal', NETICE.sozu]],
};

// Reytinq cədvəlini el-in içinə çəkir
export async function reytinq(el, oyun) {
  el.innerHTML = '<p class="muted rt-msg">Reytinq yüklənir...</p>';
  let d;
  try { d = await api('/api/reytinq?oyun=' + oyun); } catch (e) {
    el.innerHTML = `<p class="muted rt-msg">${esc(e.status === 503 ? 'Reytinq tezliklə açılacaq.' : e.message)}</p>`;
    return;
  }
  const u = cached();
  const row = (r, me) => `<tr${me ? ' class="me"' : ''}><td class="rt-yer">${r.yer <= 3 ? `<span class="md m${r.yer}">${r.yer}</span>` : r.yer}</td><td><span class="rt-o">${avatarSvg(r.avatar, 34)}<span class="rt-who">${adHtml(r)}</span></span></td>${SUTUN[oyun].map(([, f]) => `<td class="rt-n">${esc(f(r))}</td>`).join('')}</tr>`;
  const mine = (r) => u && r.username === u.username;
  let body = d.cedvel.map((r) => row(r, mine(r))).join('');
  if (d.men && d.men.yer > d.cedvel.length) body += `<tr class="gap"><td colspan="${2 + SUTUN[oyun].length}">…</td></tr>${row(d.men, true)}`;
  const say = d.cem ? `<p class="muted rt-say">Reytinqdə ${d.cem} oyunçu var${d.cem > 50 ? ', ilk 50-si göstərilir' : ''}.</p>` : '';
  const cagir = u
    ? (d.men ? '' : '<p class="rt-cta">Hələ nəticən yoxdur. Oyna, adın cədvələ düşsün.</p>')
    : '<p class="rt-cta">Adının cədvələ düşməsi üçün <a href="/hesab/qeydiyyat/">qeydiyyatdan keç</a> və ya <a href="/hesab/giris/">daxil ol</a>.</p>';
  el.innerHTML = (d.cedvel.length
    ? `<table class="rt-tbl"><thead><tr><th>Yer</th><th>Oyunçu</th>${SUTUN[oyun].map(([h]) => `<th class="rt-h">${h}</th>`).join('')}</tr></thead><tbody>${body}</tbody></table>`
    : '<p class="muted rt-msg">Cədvəl hələ boşdur. İlk yeri sən tut!</p>') + say + cagir;
}

export { OYUNLAR };
