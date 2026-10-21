export const SITE = {
  name: 'Səkkizguşə',
  description: 'Azərbaycan dili, tarixi və milli irsi bir yerdə: dövlət rəmzləri, xəritə, atalar sözləri, nağıllar və milli qəhrəmanlar.',
};

// href boşdursa, ikon görünür, amma keçid deyil (ünvan hələ hazır deyil)
export const SOCIAL = [
  { name: 'Instagram', href: '', icon: 'instagram' },
  { name: 'TikTok', href: '', icon: 'tiktok' },
  { name: 'YouTube', href: '', icon: 'youtube' },
  { name: 'Telegram', href: 'https://t.me/atalarimizinsozu', icon: 'telegram' },
  { name: 'WhatsApp', href: '', icon: 'whatsapp' },
  { name: 'E-poçt', href: '', icon: 'mail' },
];

export const STAR_POINTS = '0,-100 29.29,-70.71 70.71,-70.71 70.71,-29.29 100,0 70.71,29.29 70.71,70.71 29.29,70.71 0,100 -29.29,70.71 -70.71,70.71 -70.71,29.29 -100,0 -70.71,-29.29 -70.71,-70.71 -29.29,-70.71';

const MAP = { 'ə': 'e', 'ö': 'o', 'ü': 'u', 'ç': 'c', 'ş': 's', 'ğ': 'g', 'ı': 'i', 'i̇': 'i' };

// Azərbaycan hərflərini latın hərflərinə çevirib URL üçün qısa ad düzəldir
export function slugify(text, max = 80) {
  let s = '';
  for (const ch of text) {
    const c = ch === 'İ' ? 'i' : ch === 'I' ? 'ı' : ch.toLowerCase();
    s += MAP[c] ?? c;
  }
  s = s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  if (s.length > max) s = s.slice(0, max).replace(/-[^-]*$/, '');
  return s;
}
