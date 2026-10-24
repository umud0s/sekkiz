// Qeydiyyatda təhsil müəssisəsinin seçimi: əvvəlcə şəhər və ya rayon, sonra onun siyahısı.
// Məktəblər src/data/mektebler.json faylındadır: { "Rayon və ya şəhər": ["Məktəbin adı", ...] }.
// Rayonun siyahısı boşdursa, istifadəçi məktəbin adını özü yazır. Rəsmi siyahı alınanda yalnız bu fayl doldurulur.
import MEKTEBLER from './mektebler.json';
import D from './xerite-data.json';

// Bakıda məktəb çox olduğu üçün şəhər inzibati rayonlara bölünür
export const BAKI_RAYONLARI = ['Binəqədi', 'Nərimanov', 'Nəsimi', 'Nizami', 'Pirallahı', 'Qaradağ', 'Sabunçu', 'Səbail', 'Suraxanı', 'Xətai', 'Xəzər', 'Yasamal'].map((r) => `Bakı, ${r} rayonu`);

const sira = new Intl.Collator('az', { numeric: true, sensitivity: 'base' });
export const sirala = (a) => [...a].sort(sira.compare);

// Şəhər və rayonlar: xəritədəki bütün ərazilər, Bakı isə rayonları ilə
export const ERAZILER = sirala([...D.U.map((u) => u[0]).filter((n) => n !== 'Bakı'), ...BAKI_RAYONLARI]);

export const mektebleri = (erazi) => sirala(MEKTEBLER[erazi] || []);

// Universitetlər yerləşdiyi şəhər üzrə (filiallar öz şəhərindədir)
export const UNIVERSITETLER = {
  'Bakı': [
    'ADA Universiteti', 'Azərbaycan Dillər Universiteti', 'Azərbaycan Dövlət Bədən Tərbiyəsi və İdman Akademiyası', 'Azərbaycan Dövlət Dəniz Akademiyası',
    'Azərbaycan Dövlət İqtisad Universiteti (UNEC)', 'Azərbaycan Dövlət Mədəniyyət və İncəsənət Universiteti', 'Azərbaycan Dövlət Neft və Sənaye Universiteti',
    'Azərbaycan Dövlət Pedaqoji Universiteti', 'Azərbaycan Dövlət Rəssamlıq Akademiyası', 'Azərbaycan İlahiyyat İnstitutu', 'Azərbaycan Kooperasiya Universiteti',
    'Azərbaycan Memarlıq və İnşaat Universiteti', 'Azərbaycan Milli Konservatoriyası', 'Azərbaycan Texniki Universiteti', 'Azərbaycan Tibb Universiteti',
    'Azərbaycan Turizm və Menecment Universiteti', 'Azərbaycan Universiteti', 'Bakı Ali Neft Məktəbi', 'Bakı Avrasiya Universiteti', 'Bakı Biznes Universiteti',
    'Bakı Dövlət Universiteti', 'Bakı Mühəndislik Universiteti', 'Bakı Musiqi Akademiyası', 'Bakı Qızlar Universiteti', 'Bakı Slavyan Universiteti',
    'Bakı Xoreoqrafiya Akademiyası', 'Fransız-Azərbaycan Universiteti (UFAZ)', 'Milli Aviasiya Akademiyası', 'Odlar Yurdu Universiteti', 'Xəzər Universiteti',
  ],
  'Gəncə': ['Azərbaycan Dövlət Aqrar Universiteti', 'Azərbaycan Texnologiya Universiteti', 'Gəncə Dövlət Universiteti'],
  'Naxçıvan şəhəri': ['Naxçıvan Dövlət Universiteti', 'Naxçıvan Müəllimlər İnstitutu', 'Naxçıvan Universiteti'],
  'Sumqayıt': ['Sumqayıt Dövlət Universiteti'],
  'Lənkəran': ['Lənkəran Dövlət Universiteti'],
  'Mingəçevir': ['Mingəçevir Dövlət Universiteti'],
  'Xankəndi': ['Qarabağ Universiteti'],
  'Qazax': ['Bakı Dövlət Universitetinin Qazax filialı'],
  'Zaqatala': ['Azərbaycan Dövlət İqtisad Universitetinin Zaqatala filialı'],
  'Ağcabədi': ['Azərbaycan Dövlət Pedaqoji Universitetinin Ağcabədi filialı'],
  'Quba': ['Azərbaycan Dövlət Pedaqoji Universitetinin Quba filialı'],
  'Şamaxı': ['Azərbaycan Dövlət Pedaqoji Universitetinin Şamaxı filialı'],
};
export const UNI_SEHERLER = sirala(Object.keys(UNIVERSITETLER));
export const XARICDE = 'Xarici ölkədə';
