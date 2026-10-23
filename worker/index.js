// Saytın Worker-i: səhifələri statik fayllardan verir, yalnız /oauth/* ünvanlarında
// idarəetmə paneli üçün GitHub ilə girişi (OAuth) həyata keçirir.
// Lazım olan gizli açarlar Cloudflare-də saxlanılır: GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET.

const COOKIE = 'sekkiz_oauth_state';

const page = (title, body) => new Response(`<!doctype html><html lang="az"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>${title}</title></head><body style="font-family:system-ui,sans-serif;padding:32px;line-height:1.5">${body}</body></html>`, {
  headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
});

// Nəticəni panelə qaytarır: yalnız eyni saytda açılmış pəncərəyə göndərilir
function reply(state, content) {
  const msg = JSON.stringify(`authorization:github:${state}:${JSON.stringify(content)}`);
  return new Response(`<!doctype html><html><head><meta charset="utf-8"><meta name="robots" content="noindex"></head><body><script>
(() => {
  window.addEventListener('message', ({ data, origin }) => {
    if (data === 'authorizing:github' && origin === location.origin) window.opener?.postMessage(${msg}, origin);
  });
  window.opener?.postMessage('authorizing:github', location.origin);
})();
</script></body></html>`, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'Set-Cookie': `${COOKIE}=; Path=/oauth; Max-Age=0; HttpOnly; Secure; SameSite=Lax`,
    },
  });
}

async function authorize(request, env) {
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return page('Giriş qurulmayıb', '<p>GitHub ilə giriş hələ qurulmayıb: Cloudflare-də GITHUB_CLIENT_ID və GITHUB_CLIENT_SECRET açarları yoxdur.</p>');
  }
  const state = crypto.randomUUID().replace(/-/g, '');
  const url = new URL('https://github.com/login/oauth/authorize');
  url.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  url.searchParams.set('scope', 'repo,user');
  url.searchParams.set('state', state);
  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
      'Set-Cookie': `${COOKIE}=${state}; Path=/oauth; Max-Age=600; HttpOnly; Secure; SameSite=Lax`,
      'Cache-Control': 'no-store',
    },
  });
}

async function callback(request, env) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code'), state = url.searchParams.get('state');
  const cookie = (request.headers.get('Cookie') || '').split(/;\s*/).find((c) => c.startsWith(COOKIE + '='));
  const saved = cookie ? cookie.slice(COOKIE.length + 1) : '';
  if (!code || !state || !saved || state !== saved) {
    return reply('error', { provider: 'github', error: 'Giriş sorğusu təsdiqlənmədi. Yenidən cəhd edin.', errorCode: 'CSRF_DETECTED' });
  }
  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'User-Agent': 'sekkizguse-admin' },
    body: JSON.stringify({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code }),
  });
  const data = await res.json().catch(() => ({}));
  if (!data.access_token) {
    return reply('error', { provider: 'github', error: data.error_description || 'GitHub açar vermədi.', errorCode: 'TOKEN_REQUEST_FAILED' });
  }
  return reply('success', { provider: 'github', token: data.access_token });
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (request.method === 'GET' && (pathname === '/oauth/auth' || pathname === '/oauth/authorize')) return authorize(request, env);
    if (request.method === 'GET' && pathname === '/oauth/callback') return callback(request, env);
    return env.ASSETS.fetch(request);
  },
};
