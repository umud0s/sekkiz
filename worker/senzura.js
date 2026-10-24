// Ad və istifadəçi adı üçün senzura filtri. Yalnız serverdə işləyir: siyahı brauzerə göndərilmir.
// Yoxlamadan əvvəl mətn "təmizlənir" ki, hiylələr keçməsin:
//   Azərbaycan hərfləri latına (ə→e, ş→s...), kiril hərfləri latına, sh/ch/gh/kh → s/c/g/x,
//   rəqəm və simvollar hərfə (0→o, 1→i, 3→e, 4→a, 5→s, @→a, $→s), nöqtə, alt xətt, boşluq silinir,
//   ardıcıl təkrar hərflər birləşdirilir (saaalam → salam).
// Siyahıdakı sözlər üç növdür:
//   KOK  - mətnin istənilən yerində axtarılır (uzun, başqa sözün içində təsadüfən rast gəlməyən köklər);
//   SOZ  - yalnız ayrıca söz kimi və ya bütün ad bu sözdən ibarət olduqda (qısa, çoxmənalı sözlər);
//   CUT  - "!" ilə: qoşa hərf mühüm olduğu üçün təkrar hərflər birləşdirilmədən axtarılır (yarraq ≠ yaraq).
// Yeni söz əlavə edəndə: scripts/senzura-test.mjs ilə DSK-dakı yaşayış məntəqələri və adlar üzərində yoxlayın.

const KIRIL = { а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'j', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'x', ц: 'ts', ч: 'c', ш: 's', щ: 's', ъ: '', ы: 'i', ь: '', э: 'e', ю: 'yu', я: 'ya', ә: 'e', ғ: 'g', ҹ: 'c', һ: 'h', ө: 'o', ү: 'u', ҝ: 'g', ј: 'y' };
const HERF = { ə: 'e', ı: 'i', ö: 'o', ü: 'u', ş: 's', ç: 'c', ğ: 'g', â: 'a', î: 'i', û: 'u' };
const LEET = { 0: 'o', 1: 'i', 2: 'z', 3: 'e', 4: 'a', 5: 's', 6: 'b', 7: 't', 8: 'b', 9: 'g', '@': 'a', $: 's', '!': 'i', '|': 'i', '€': 'e' };

function esas(s) {
  return String(s ?? '').replace(/İ/g, 'i').replace(/I/g, 'ı').toLowerCase().normalize('NFC')
    .replace(/[Ѐ-ӿ]/g, (c) => KIRIL[c] ?? c)
    .replace(/[əıöüşçğâîû]/g, (c) => HERF[c])
    .replace(/sh/g, 's').replace(/ch/g, 'c').replace(/gh/g, 'g').replace(/kh/g, 'x');
}
const tekle = (s) => s.replace(/(.)\1+/g, '$1');
const qosa = (s) => s.replace(/(.)\1{2,}/g, '$1$1');

// Mətndən yoxlanılacaq formalar: rəqəmsiz və rəqəmləri hərfə çevrilmiş
function formalar(s) {
  const e = esas(s);
  const out = [];
  for (const v of [e.replace(/[^a-z]+/g, ' '), e.replace(/[0-9@$!|€]/g, (c) => LEET[c]).replace(/[^a-z]+/g, ' ')]) {
    const sozler = v.trim().split(/\s+/).filter(Boolean);
    const bitisik = sozler.join('');
    out.push({ sozler: sozler.map(tekle), bitisik: tekle(bitisik), bitisik2: qosa(bitisik) });
  }
  return out;
}

const KOK = [
  // azərbaycanca
  'sikdir', 'siktir', 'sikim', 'sikeyim', 'sikerem', 'sikib', 'sikis', 'sikmek', 'sikiram', 'sikdim', 'gotveren', 'gotvern', 'gotun', 'gotunu', 'gotuve',
  'qehbe', 'qahbe', 'gehbe', 'qexbe', 'peyser', 'peysar', 'dalbayob', 'dalbayop', 'dolbayob', 'dolboyob', 'dolbaeb', 'dolboeb', 'qanciq', 'amciq', 'amcik',
  'fahise', 'qurumsaq', 'haramzada', 'eclaf', 'namussuz', 'anvisik', 'ananisik', 'bacivisik', 'bacinisik',
  // türkcə
  'orospu', 'orosbu', 'sikerim', 'aminako', 'aminakoy', 'pezevenk', 'kahpe', 'surtuk', 'kaltak', 'yavsak', 'gerizekali',
  // rusca (latınla)
  'blyat', 'blyad', 'pizdets', 'pizdec', 'xuev', 'huev', 'xuil', 'huil', 'naxuy', 'nahuy', 'nahui', 'naxui', 'yebat', 'yebal', 'yobany', 'pidor', 'pidar', 'mudak', 'mudil', 'gandon', 'zalupa', 'slyuxa', 'sluxa', 'sliuxa',
  // ingiliscə
  'fuck', 'fvck', 'bitch', 'cunt', 'whore', 'slut', 'faggot', 'porn', 'asshole', 'bastard', 'penis', 'vagina', 'wank',
  // nifrət və zorakılıq
  'hitler', 'nazist', 'terrorist',
  // qoşa hərf mühüm olanlar
  '!yarraq', '!yarrak', '!dassaq', '!dasaqq', '!dillaq', '!dillag', '!pussy', '!nigger', '!nigga',
];
const SOZ = [
  'sik', 'got', 'gic', 'axmaq', 'esek', 'debil', 'mal', 'bic', 'it', 'pox', 'heyvan', 'donuz', 'qodux', 'qanmaz',
  'amk', 'aq', 'amq', 'ibne', 'pic', 'salak', 'aptal', 'gavat',
  'suka', 'xuy', 'huy', 'xui', 'hui', 'pidr', 'cmo', 'blet', 'blat',
  'fuk', 'dick', 'cock', 'sex', 'sexy', 'seks', 'anal', 'rape', 'isis', 'shit', 'nazi', 'pizda', 'ganciq', 'ogras', 'ograsi', 'lecer',
];
// Saxtakarlıq: rəsmi və ya tanınmış şəxs kimi görünmək
// Uzun adlar mətnin istənilən yerində, qısalar yalnız sözün əvvəlində axtarılır (badminton ≠ admin)
const QORUNAN = ['admin', 'moderator', 'sekkizguse', 'sekkizgusa', 'prezident', 'president', 'ilhamaliyev', 'ilhameliyev', 'heyderaliyev', 'heydereliyev', 'mehribanaliyeva', 'mehribaneliyeva', 'idareheyeti', 'official', 'support', 'destek'];

const KOK_N = KOK.map((k) => (k[0] === '!' ? { s: qosa(esas(k.slice(1))), qosa: true } : { s: tekle(esas(k)), qosa: false }));
const SOZ_N = new Set(SOZ.map((k) => tekle(esas(k))));
const QORUNAN_N = QORUNAN.map((k) => tekle(esas(k)));

// null - qaydasındadır; əks halda istifadəçiyə göstəriləcək mesaj
export function senzura(metn) {
  for (const f of formalar(metn)) {
    if (QORUNAN_N.some((k) => (k.length >= 8 ? f.bitisik.includes(k) : f.bitisik.startsWith(k) || f.sozler.some((w) => w.startsWith(k))))) return 'Bu ad istifadə oluna bilməz. Başqa ad seç.';
    if (KOK_N.some((k) => (k.qosa ? f.bitisik2 : f.bitisik).includes(k.s))) return 'Bu ad uyğun deyil. Başqa ad seç.';
    if (SOZ_N.has(f.bitisik) || f.sozler.some((w) => SOZ_N.has(w))) return 'Bu ad uyğun deyil. Başqa ad seç.';
  }
  return null;
}
