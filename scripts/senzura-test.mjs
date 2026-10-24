// Senzura filtrinin yoxlanması: normal adlar bloklanmamalı, gizlədilmiş təhqirlər tutulmalıdır.
// İstifadə: node scripts/senzura-test.mjs  (əvvəlcə "npm run build" ki, src/data/gen yaransın)
import fs from 'fs';
import { senzura } from '../worker/senzura.js';

const oxu = (p) => { try { return JSON.parse(fs.readFileSync(new URL('../' + p, import.meta.url))); } catch { return null; } };
const normal = new Set();
const add = (s) => s && String(s).split(/[\s,.;:!?()"«»—–-]+/).forEach((w) => w.length > 1 && normal.add(w));
Object.values(oxu('src/data/kendler.json') || {}).flat().forEach((k) => add(k.replace(/^q:/, '')));
(oxu('src/data/xerite-data.json')?.U || []).forEach((u) => add(u[0]));
(oxu('src/data/gen/qehremanlar.json') || []).forEach((q) => { add(q.fn); add(q.sn); add(q.pat); });
(oxu('src/data/gen/atalar.json') || []).forEach((a) => add(a.t || a[0] || ''));
// Geniş yayılmış adlar və istifadəçi adı nümunələri
`Əli Vəli Ayan Aysel Aytən Ülviyyə Rəsmiyyə Səbinə Nərmin Leyla Günel Lalə Fidan Nazrin Nəzrin Ümüd Umud Orxan Kamran Elvin Tural Zaur Rauf Nicat
Vüsal Rəşad Elnur Elçin Fərid Fərhad Səbuhi Sənan Toğrul Teymur Turan Murad Mübariz Polad Hikmət İlqar İlkin İlham İsgəndər Abbas Abdulla Ağa Akif
Anar Arif Aslan Babək Bəhruz Cavid Cəlal Coşqun Emin Eldar Elşən Elşad Emil Ənvər Fuad Habil Hafiz Həsən Hüseyn Xəyal Xəqani Kənan Mahir Məhəmməd
Mehdi Mirzə Namiq Nihad Nurlan Oqtay Ramil Rasim Rövşən Ruslan Samir Seymur Şahin Şəmil Tərlan Tofiq Vaqif Vüqar Yusif Zəfər Zöhrab Aidə Aynur Aygün
Bahar Cəmilə Dilarə Gülnar Gülay Gülşən Günay Həcər Xədicə İradə Kəmalə Könül Mələk Mətanət Nigar Nurlana Pərvin Röya Sevinc Səadət Sona Şəbnəm
Təranə Ülkər Vüsalə Zəhra Zərifə Zülfiyyə Sitarə Simuzər Nailə Məhsəti Natəvan Qasım Səməd Sabir Hümbət Mikayıl Nizami Füzuli Nəsimi Xaqani
aysel_2010 elvin.m kamran99 sebine_a nicat2009 tural.az ulvi_k badminton_fan mal_dar ilham_m seyid_ali bilal ismayil emil.eko`.split(/\s+/).forEach((w) => normal.add(w));

// Atalar sözlərində işlənən, amma ad kimi təhqir sayılan sözlər: bunların bloklanması düzgündür
const TEHQIR = new Set(['it', 'İt', 'mal', 'Mal', 'eşşək', 'Eşşək', 'axmaq', 'Axmaq', 'donuz', 'Donuz', 'heyvan', 'gic', 'haramzada', 'haramzadadır', 'götün', 'bic', 'biç', 'pıç', 'Pıç', 'mal_dar', 'şit']);
const yanlis = [...normal].filter((w) => !TEHQIR.has(w) && senzura(w));
console.log(`Normal sözlər: ${normal.size}, səhv bloklanan: ${yanlis.length}`);
if (yanlis.length) console.log('  ', yanlis.slice(0, 60).map((w) => `${w} (${senzura(w)})`).join('\n   '));

// Tutulmalı olanlar (gizlətmə üsulları ilə)
const pis = ['Sikdir', 's1kd1r', 'S.i.k.d.i.r', 's_i_k_d_i_r', 'siiikdir', 'SİKDİR', 'qəhbə', 'qehbe', 'q3hb3', 'Qəhbə Oğlu', 'peysər', 'peyserr',
  'dalbayob', 'd0lb4y0b', 'gotveren', 'götveren', 'g0tveren', 'gic', 'Gic Əli', 'axmaq', 'eşşək', 'essek', 'yarraq', 'yarrrraq', 'orospu', '0r0spu', 'blyat',
  'бляд', 'хуй', 'suka', 'fuck', 'fvck_you', 'f.u.c.k', 'shit', 'b1tch', 'hitler', 'admin', 'Adm1n', 'ilham_aliyev', 'İlham Əliyev', 'prezident',
  'sekkizguse', 'it', 'it_oglu', 'mal', 'pox', 'pidor', 'nahuy', 'ananisikim', 'sikim', 'amcıq', 'dıllaq'];
const kecen = pis.filter((w) => !senzura(w));
console.log(`Pis nümunələr: ${pis.length}, keçən: ${kecen.length}`, kecen);
process.exitCode = yanlis.length || kecen.length ? 1 : 0;
