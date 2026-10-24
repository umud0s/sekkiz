// Hesab sisteminin ortaq qaydaları: həm Worker (server), həm də sayt (brauzer) bunları işlədir.

export const STATUSLAR = {
  mekteb: 'Məktəbli',
  universitet: 'Universitet tələbəsi',
  mezun: 'Məzun',
  isleyen: 'İşləyən',
  teqaudcu: 'Təqaüdçü',
};

// Profil şəkilləri: Azərbaycana aid simvollar (çəkilişi src/lib/simvollar.js-dədir)
export const AVATAR_IDLER = ['alov', 'buta', 'semeni', 'nar', 'xaribulbul', 'sunbul', 'bayraq', 'xalca', 'tar', 'qizqalasi', 'stekan', 'sekkizguse'];

// Reytinqi olan oyunlar
export const OYUNLAR = {
  xerite: { ad: 'Xəritəni tamamla', href: '/xerite/oyun/' },
  diyar: { ad: 'Kim diyarşünas olmaq istəyir?', href: '/xerite/diyarsunas/' },
  sozu: { ad: 'Sözü tap: atalar sözləri', href: '/atalar-sozleri/sozu-tap/' },
};

export const XERITE_ERAZI = 75;
export const DIYAR_SUAL = 15; // Diyarşünas: 5 asan, 5 orta, 5 çətin

// Ad: yalnız Azərbaycan və latın hərfləri (kiril və oxşar görünən hərflərlə filtri aldatmaq olmasın), boşluq, defis, apostrof; 2-30 simvol
export const AD_RE = /^[A-Za-zƏəÇçĞğİıÖöŞşÜüÂâ][A-Za-zƏəÇçĞğİıÖöŞşÜüÂâ '’-]{1,29}$/;
// İstifadəçi adı: kiçik latın hərfi ilə başlayır, sonra hərf, rəqəm, _ və ya nöqtə; 3-20 simvol
export const USER_RE = /^[a-z][a-z0-9_.]{2,19}$/;
export const SIFRE_MIN = 6;
export const SIFRE_MAX = 64;
