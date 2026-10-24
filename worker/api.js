// Hesab sistemi: qeydiyyat, giriş, profil, oyun nəticələri və reytinq (/api/*).
// Məlumatlar Cloudflare D1 bazasında saxlanılır (binding: DB). Cədvəllər ilk sorğuda avtomatik yaradılır.
// Hamıya açıq olan yalnız ad, istifadəçi adı, profil şəkli və oyun nəticəsidir; status, məktəb, universitet gizlidir.
import { STATUSLAR, AVATAR_IDLER, XERITE_ERAZI, AD_RE, USER_RE, SIFRE_MIN, SIFRE_MAX } from '../src/lib/hesab-sabit.js';

const SESS = 'sk_s';
const SESS_GUN = 90;
const QORUNAN_ADLAR = new Set(['admin', 'sekkizguse', 'moderator', 'idare', 'root', 'support']);

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ad TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE COLLATE NOCASE,
    sifre TEXT NOT NULL,
    status TEXT NOT NULL,
    mekteb TEXT,
    universitet TEXT,
    avatar TEXT NOT NULL,
    created INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    expires INTEGER NOT NULL
  )`,
  'CREATE INDEX IF NOT EXISTS sessions_user ON sessions(user_id)',
  `CREATE TABLE IF NOT EXISTS rekord (
    user_id INTEGER NOT NULL,
    oyun TEXT NOT NULL,
    xal INTEGER NOT NULL DEFAULT 0,
    vaxt INTEGER,
    sayi INTEGER NOT NULL DEFAULT 0,
    updated INTEGER NOT NULL,
    PRIMARY KEY (user_id, oyun)
  )`,
  'CREATE INDEX IF NOT EXISTS rekord_oyun ON rekord(oyun, xal)',
  `CREATE TABLE IF NOT EXISTS limitler (
    k TEXT PRIMARY KEY,
    n INTEGER NOT NULL,
    until INTEGER NOT NULL
  )`,
];
let hazir = false;
async function schema(db) {
  if (hazir) return;
  await db.batch(SCHEMA.map((s) => db.prepare(s)));
  hazir = true;
}

const json = (data, status = 200, extra = {}) => new Response(JSON.stringify(data), {
  status,
  headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extra },
});
const xeta = (mesaj, status = 400) => json({ xeta: mesaj }, status);

// ---- Şifrə və sessiya ----
const enc = new TextEncoder();
const b64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)));
const unb64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
const ITER = 100000; // Workers-də PBKDF2 üçün maksimum

async function pbkdf2(sifre, salt, iter) {
  const key = await crypto.subtle.importKey('raw', enc.encode(sifre), 'PBKDF2', false, ['deriveBits']);
  return crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: iter }, key, 256);
}
async function sifreHash(sifre) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return `pbkdf2$${ITER}$${b64(salt)}$${b64(await pbkdf2(sifre, salt, ITER))}`;
}
async function sifreYoxla(sifre, saxlanan) {
  const [, iter, salt, hash] = String(saxlanan).split('$');
  const a = new Uint8Array(await pbkdf2(sifre, unb64(salt), +iter)), b = unb64(hash);
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a[i] ^ b[i];
  return d === 0;
}
async function sha(s) {
  return [...new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(s)))].map((x) => x.toString(16).padStart(2, '0')).join('');
}
async function sessiyaAc(db, userId) {
  const token = b64(crypto.getRandomValues(new Uint8Array(32))).replace(/[+/=]/g, (c) => ({ '+': '-', '/': '_', '=': '' })[c]);
  await db.batch([
    db.prepare('DELETE FROM sessions WHERE expires < ?').bind(Date.now()),
    db.prepare('INSERT INTO sessions (token, user_id, expires) VALUES (?, ?, ?)').bind(await sha(token), userId, Date.now() + SESS_GUN * 864e5),
  ]);
  return `${SESS}=${token}; Path=/; Max-Age=${SESS_GUN * 86400}; HttpOnly; Secure; SameSite=Lax`;
}
const sessiyaSil = `${SESS}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;
function tokenOf(request) {
  const c = (request.headers.get('Cookie') || '').split(/;\s*/).find((x) => x.startsWith(SESS + '='));
  return c ? c.slice(SESS.length + 1) : '';
}
async function kimdir(request, db) {
  const t = tokenOf(request);
  if (!t) return null;
  const row = await db.prepare('SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token = ? AND s.expires > ?').bind(await sha(t), Date.now()).first();
  return row || null;
}

// ---- Sui-istifadəyə qarşı sadə limitlər ----
async function limit(db, k, max, deqiqe) {
  const now = Date.now();
  const row = await db.prepare('SELECT n, until FROM limitler WHERE k = ?').bind(k).first();
  if (row && row.until > now && row.n >= max) return false;
  if (!row || row.until <= now) await db.prepare('INSERT OR REPLACE INTO limitler (k, n, until) VALUES (?, 1, ?)').bind(k, now + deqiqe * 60000).run();
  else await db.prepare('UPDATE limitler SET n = n + 1 WHERE k = ?').bind(k).run();
  return true;
}

// ---- Yoxlamalar ----
const temiz = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();
function profilYoxla(b, tam) {
  const out = {};
  if (tam || b.ad !== undefined) {
    out.ad = temiz(b.ad);
    if (!AD_RE.test(out.ad)) return 'Ad 2-30 hərfdən ibarət olmalıdır (yalnız hərf, boşluq və defis).';
  }
  if (tam || b.status !== undefined) {
    out.status = String(b.status || '');
    if (!STATUSLAR[out.status]) return 'Statusu seçin.';
    out.mekteb = out.status === 'mekteb' ? temiz(b.mekteb).slice(0, 120) : null;
    out.universitet = out.status === 'universitet' ? temiz(b.universitet).slice(0, 120) : null;
    if (out.status === 'mekteb' && out.mekteb.length < 2) return 'Oxuduğunuz məktəbi yazın.';
    if (out.status === 'universitet' && out.universitet.length < 2) return 'Təhsil aldığınız universiteti yazın.';
  }
  if (tam || b.avatar !== undefined) {
    out.avatar = String(b.avatar || '');
    if (!AVATAR_IDLER.includes(out.avatar)) return 'Profil şəklini seçin.';
  }
  return out;
}
function userYoxla(u) {
  if (!USER_RE.test(u)) return 'İstifadəçi adı 3-20 simvol olmalı, kiçik latın hərfi ilə başlamalı, yalnız hərf, rəqəm, "_" və "." saxlamalıdır.';
  if (/\.\.|\.$/.test(u)) return 'İstifadəçi adında nöqtə ardıcıl və ya sonda ola bilməz.';
  if (QORUNAN_ADLAR.has(u)) return 'Bu istifadəçi adı tutulub.';
  return null;
}
const sifreYoxlama = (s) => (typeof s !== 'string' || s.length < SIFRE_MIN || s.length > SIFRE_MAX ? `Şifrə ${SIFRE_MIN}-${SIFRE_MAX} simvol olmalıdır.` : null);

const ozel = (u) => ({ ad: u.ad, username: u.username, avatar: u.avatar, status: u.status, mekteb: u.mekteb, universitet: u.universitet });

// ---- Oyun nəticələri ----
// Hər oyun üçün: gələn nəticəni yoxlayır və köhnə rekordla birləşdirir
const QAYDA = {
  xerite: {
    oxu(b) {
      const tapilan = Math.trunc(+b.tapilan), vaxt = b.vaxt == null ? null : Math.round(+b.vaxt);
      if (!(tapilan >= 0 && tapilan <= XERITE_ERAZI)) return null;
      if (tapilan === XERITE_ERAZI && !(vaxt >= 60000 && vaxt < 36e5)) return null; // 75 ərazini 1 dəqiqədən tez tapmaq mümkün deyil
      return { xal: tapilan, vaxt: tapilan === XERITE_ERAZI ? vaxt : null };
    },
    birlesdir: (k, y) => (!k || y.xal > k.xal || (y.xal === k.xal && y.vaxt != null && (k.vaxt == null || y.vaxt < k.vaxt)) ? y : null),
    sira: 'r.xal DESC, (r.vaxt IS NULL), r.vaxt ASC, r.updated ASC',
  },
  diyar: {
    oxu(b) {
      const p = Math.trunc(+b.pille), vaxt = b.vaxt == null ? null : Math.round(+b.vaxt);
      if (!(p >= 0 && p <= 12)) return null;
      // 12 sualın vaxt limitlərinin cəmi 330 saniyədir; 12 sualı 12 saniyədən tez cavablamaq mümkün deyil
      if (p === 12 && vaxt != null && !(vaxt >= 12000 && vaxt <= 335000)) return null;
      return { xal: p, vaxt: p === 12 ? vaxt : null };
    },
    birlesdir: (k, y) => (!k || y.xal > k.xal || (y.xal === k.xal && y.vaxt != null && (k.vaxt == null || y.vaxt < k.vaxt)) ? y : null),
    sira: 'r.xal DESC, (r.vaxt IS NULL), r.vaxt ASC, r.updated ASC',
  },
  sozu: {
    oxu(b) { const x = Math.trunc(+b.xal); return x === 5 || x === 10 ? { xal: x, vaxt: null } : null; },
    birlesdir: (k, y) => ({ xal: (k ? k.xal : 0) + y.xal, vaxt: null }), // xallar toplanır
    sira: 'r.xal DESC, r.updated ASC',
    araliq: 1500, // iki cavab arasında ən az 1,5 saniyə
  },
};

async function netice(request, db, user) {
  const b = await request.json().catch(() => ({}));
  const q = QAYDA[b.oyun];
  if (!q) return xeta('Belə oyun yoxdur.');
  const y = q.oxu(b);
  if (!y) return xeta('Nəticə qəbul olunmadı.');
  const now = Date.now();
  const k = await db.prepare('SELECT xal, vaxt, updated FROM rekord WHERE user_id = ? AND oyun = ?').bind(user.id, b.oyun).first();
  if (q.araliq && k && now - k.updated < q.araliq) return xeta('Çox tez-tez göndərilir.', 429);
  const yeni = q.birlesdir(k, y);
  if (!k) await db.prepare('INSERT INTO rekord (user_id, oyun, xal, vaxt, sayi, updated) VALUES (?, ?, ?, ?, 1, ?)').bind(user.id, b.oyun, yeni.xal, yeni.vaxt, now).run();
  else if (yeni) await db.prepare('UPDATE rekord SET xal = ?, vaxt = ?, sayi = sayi + 1, updated = ? WHERE user_id = ? AND oyun = ?').bind(yeni.xal, yeni.vaxt, now, user.id, b.oyun).run();
  else await db.prepare('UPDATE rekord SET sayi = sayi + 1 WHERE user_id = ? AND oyun = ?').bind(user.id, b.oyun).run();
  return json({ ok: true, yeni: !!yeni });
}

async function reytinq(url, db, user) {
  const oyun = url.searchParams.get('oyun');
  const q = QAYDA[oyun];
  if (!q) return xeta('Belə oyun yoxdur.');
  const { results } = await db.prepare(`SELECT * FROM (
      SELECT r.user_id, r.xal, r.vaxt, u.ad, u.username, u.avatar, ROW_NUMBER() OVER (ORDER BY ${q.sira}) AS yer
      FROM rekord r JOIN users u ON u.id = r.user_id WHERE r.oyun = ? AND r.xal > 0
    ) WHERE yer <= 50 OR user_id = ? ORDER BY yer`).bind(oyun, user ? user.id : -1).all();
  const say = await db.prepare('SELECT COUNT(*) AS n FROM rekord WHERE oyun = ? AND xal > 0').bind(oyun).first();
  const pub = (r) => ({ yer: r.yer, ad: r.ad, username: r.username, avatar: r.avatar, xal: r.xal, vaxt: r.vaxt });
  const men = user ? results.find((r) => r.user_id === user.id) : null;
  return json({ cedvel: results.filter((r) => r.yer <= 50).map(pub), men: men ? pub(men) : null, cem: say ? say.n : 0 });
}

// ---- Əsas yönləndirmə ----
export async function api(request, env) {
  const url = new URL(request.url);
  const db = env.DB;
  if (!db) return xeta('Qeydiyyat sistemi hələ qoşulmayıb.', 503);
  const post = request.method === 'POST';
  if (post) {
    // Başqa saytdan göndərilən sorğular qəbul olunmur
    const origin = request.headers.get('Origin');
    if (origin && origin !== url.origin) return xeta('İcazə yoxdur.', 403);
    if (!(request.headers.get('Content-Type') || '').includes('application/json')) return xeta('Yanlış sorğu.', 415);
  }
  await schema(db);
  const ip = request.headers.get('CF-Connecting-IP') || 'yerli';
  const p = url.pathname.replace(/\/+$/, '');

  if (p === '/api/men' && request.method === 'GET') {
    const u = await kimdir(request, db);
    if (!u) return json({ user: null });
    const { results } = await db.prepare('SELECT oyun, xal, vaxt, sayi FROM rekord WHERE user_id = ?').bind(u.id).all();
    return json({ user: ozel(u), rekord: results });
  }

  if (p === '/api/ad-yoxla' && request.method === 'GET') {
    const u = String(url.searchParams.get('u') || '').toLowerCase();
    const x = userYoxla(u);
    if (x) return json({ bos: false, xeta: x });
    const row = await db.prepare('SELECT 1 FROM users WHERE username = ?').bind(u).first();
    return json({ bos: !row, xeta: row ? 'Bu istifadəçi adı artıq tutulub.' : null });
  }

  if (p === '/api/qeydiyyat' && post) {
    if (!(await limit(db, 'reg:' + ip, 20, 60 * 24))) return xeta('Bu gün üçün qeydiyyat limiti dolub. Sabah yenidən cəhd edin.', 429);
    const b = await request.json().catch(() => ({}));
    const username = String(b.username || '').trim().toLowerCase();
    const x = userYoxla(username) || sifreYoxlama(b.sifre);
    if (x) return xeta(x);
    const pr = profilYoxla(b, true);
    if (typeof pr === 'string') return xeta(pr);
    if (await db.prepare('SELECT 1 FROM users WHERE username = ?').bind(username).first()) return xeta('Bu istifadəçi adı artıq tutulub.', 409);
    const r = await db.prepare('INSERT INTO users (ad, username, sifre, status, mekteb, universitet, avatar, created) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
      .bind(pr.ad, username, await sifreHash(b.sifre), pr.status, pr.mekteb, pr.universitet, pr.avatar, Date.now()).run();
    const cookie = await sessiyaAc(db, r.meta.last_row_id);
    return json({ user: { ad: pr.ad, username, avatar: pr.avatar, status: pr.status, mekteb: pr.mekteb, universitet: pr.universitet } }, 201, { 'Set-Cookie': cookie });
  }

  if (p === '/api/giris' && post) {
    const b = await request.json().catch(() => ({}));
    const username = String(b.username || '').trim().toLowerCase();
    if (!(await limit(db, 'ip:' + ip, 40, 15)) || !(await limit(db, 'u:' + username, 10, 15))) return xeta('Çox sayda uğursuz cəhd oldu. 15 dəqiqə sonra yenidən yoxlayın.', 429);
    const u = username && await db.prepare('SELECT * FROM users WHERE username = ?').bind(username).first();
    if (!u || !(await sifreYoxla(String(b.sifre || ''), u.sifre))) return xeta('İstifadəçi adı və ya şifrə səhvdir.', 401);
    await db.prepare('DELETE FROM limitler WHERE k = ?').bind('u:' + username).run();
    return json({ user: ozel(u) }, 200, { 'Set-Cookie': await sessiyaAc(db, u.id) });
  }

  if (p === '/api/cixis' && post) {
    const t = tokenOf(request);
    if (t) await db.prepare('DELETE FROM sessions WHERE token = ?').bind(await sha(t)).run();
    return json({ ok: true }, 200, { 'Set-Cookie': sessiyaSil });
  }

  if (p === '/api/reytinq' && request.method === 'GET') return reytinq(url, db, await kimdir(request, db));

  // Aşağıdakılar üçün giriş lazımdır
  if (post && ['/api/profil', '/api/sifre', '/api/netice'].includes(p)) {
    const u = await kimdir(request, db);
    if (!u) return xeta('Əvvəlcə daxil olun.', 401);
    if (p === '/api/netice') return netice(request, db, u);
    const b = await request.json().catch(() => ({}));
    if (p === '/api/profil') {
      const pr = profilYoxla(b, false);
      if (typeof pr === 'string') return xeta(pr);
      const k = Object.keys(pr);
      if (!k.length) return xeta('Dəyişiklik yoxdur.');
      await db.prepare(`UPDATE users SET ${k.map((x) => `${x} = ?`).join(', ')} WHERE id = ?`).bind(...k.map((x) => pr[x]), u.id).run();
      return json({ user: ozel({ ...u, ...pr }) });
    }
    if (p === '/api/sifre') {
      if (!(await sifreYoxla(String(b.kohne || ''), u.sifre))) return xeta('Köhnə şifrə səhvdir.', 401);
      const x = sifreYoxlama(b.yeni);
      if (x) return xeta(x);
      await db.prepare('UPDATE users SET sifre = ? WHERE id = ?').bind(await sifreHash(b.yeni), u.id).run();
      return json({ ok: true });
    }
  }

  // İdarəetmə: şifrəni unudanlar üçün yeni şifrə, hesabın silinməsi. Açar Cloudflare-də ADMIN_KEY kimi saxlanılır.
  if (post && (p === '/api/admin/sifre' || p === '/api/admin/sil')) {
    if (!env.ADMIN_KEY) return xeta('İdarəetmə açarı qurulmayıb.', 503);
    if (!(await limit(db, 'adm:' + ip, 20, 15))) return xeta('Çox sayda cəhd.', 429);
    const key = request.headers.get('X-Admin-Key') || '';
    if (key.length !== env.ADMIN_KEY.length || (await sha(key)) !== (await sha(env.ADMIN_KEY))) return xeta('Açar səhvdir.', 403);
    const b = await request.json().catch(() => ({}));
    const u = await db.prepare('SELECT id FROM users WHERE username = ?').bind(String(b.username || '').trim().toLowerCase()).first();
    if (!u) return xeta('Belə istifadəçi yoxdur.', 404);
    if (p === '/api/admin/sifre') {
      const x = sifreYoxlama(b.yeni);
      if (x) return xeta(x);
      await db.batch([
        db.prepare('UPDATE users SET sifre = ? WHERE id = ?').bind(await sifreHash(b.yeni), u.id),
        db.prepare('DELETE FROM sessions WHERE user_id = ?').bind(u.id),
      ]);
    } else {
      await db.batch(['sessions', 'rekord'].map((t) => db.prepare(`DELETE FROM ${t} WHERE user_id = ?`).bind(u.id)).concat(db.prepare('DELETE FROM users WHERE id = ?').bind(u.id)));
    }
    return json({ ok: true });
  }

  return xeta('Tapılmadı.', 404);
}

