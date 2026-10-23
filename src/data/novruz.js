// Novruz bayramı və dörd çərşənbə: mətnlər. Təsvirlər src/lib/novruz-art.js faylındadır.

export const INTRO = [
  'Novruz Azərbaycan xalqının ən əziz bayramıdır. Sözün mənası "yeni gün" deməkdir. Bayram yaz bərabərliyi vaxtı, gecə ilə gündüzün bərabərləşdiyi günlərdə gəlir və təbiətin oyanışını, yeni ilin başlanğıcını bildirir.',
  'Novruza dörd həftə qalmış hazırlıq başlayır. Hər çərşənbə axşamı bir çərşənbə qeyd olunur. Xalq inancına görə, bu çərşənbələrdə növbə ilə su, od, yel və torpaq oyanır, təbiət qış yuxusundan ayılır.',
];

export const FACTS = [
  ['2009', 'Novruz UNESCO-nun Bəşəriyyətin qeyri-maddi mədəni irsinin reprezentativ siyahısına daxil edilib.'],
  ['21 mart', 'BMT Baş Assambleyası 2010-cu ildə bu günü Beynəlxalq Novruz Günü elan edib.'],
  ['5 gün', 'Azərbaycanda Novruz bayramı beş gün qeyd olunur.'],
];

// Dörd çərşənbə, gəldiyi sıra ilə
export const CERSENBE = [
  {
    slug: 'su-cersenbesi',
    k: 'su',
    n: 'Birinci çərşənbə',
    title: 'Su çərşənbəsi',
    short: 'Sular təzələnir, bulaqlar dirçəlir.',
    lead: 'İlk çərşənbə suyun adı ilə bağlıdır. İnanca görə, bu gün sular təzələnir, durulur, buz bağlamış çaylar yenidən axmağa başlayır. Su təmizliyin və həyatın rəmzidir.',
    customs: [
      ['bulaq', 'Bulaq başına getmək', 'Səhər tezdən bulağa, çaya gedib üz-əl yuyur, sudan içirlər. Bu, il boyu sağlam və təmiz qalmaq arzusudur.'],
      ['tullanma-su', 'Axar suyun üstündən tullanmaq', 'Arxın, çayın üstündən tullanırlar ki, ilin ağırlığı su ilə axıb getsin.'],
      ['cilema', 'Su çiləmək', 'Bulaqdan gətirilən su ilə bir-birinin üstünə, evin künc-bucağına su çiləyirlər.'],
    ],
  },
  {
    slug: 'od-cersenbesi',
    k: 'od',
    n: 'İkinci çərşənbə',
    title: 'Od çərşənbəsi',
    short: 'Tonqallar qalanır, od təzələnir.',
    lead: 'İkinci çərşənbədə od oyanır. Od qədimdən işığın, istiliyin və təmizliyin rəmzi sayılıb. Bu axşam həyətlərdə, damlarda tonqallar qalanır.',
    customs: [
      ['tonqal', 'Tonqal qalamaq', 'Axşam hər həyətdə tonqal qalanır, ailə və qonşular onun başına toplaşır.'],
      ['tullanma-od', 'Odun üstündən tullanmaq', 'Tonqalın üstündən tullanarkən deyirlər: "Ağırlığım, uğurluğum odda yansın!"'],
      ['sam', 'Şam yandırmaq', 'Evdə şam yandırılır ki, ocağın işığı il boyu sönməsin.'],
      ['sondurmeme', 'Tonqal su ilə söndürülmür', 'Tonqalı su ilə söndürməzlər, öz-özünə sönməsini gözləyərlər. Külünü isə evdən uzağa, yol ayrıcına aparırlar.'],
    ],
  },
  {
    slug: 'yel-cersenbesi',
    k: 'yel',
    n: 'Üçüncü çərşənbə',
    title: 'Yel çərşənbəsi',
    short: 'Yaz yeli tumurcuqları oyadır.',
    lead: 'Üçüncü çərşənbədə yel oyanır. Yaz yeli ağacların tumurcuqlarını açır, torpağı qurudur, havanı isidir. Bayrama hazırlıq artıq qızışır.',
    customs: [
      ['tumurcuq', 'Tumurcuqlar açılır', 'Yel təbiəti oyadır: ağaclar çiçəkləyir, çəmənlər yaşıllaşır.'],
      ['temizlik', 'Ev-eşik təmizlənir', 'Evlər silinib-süpürülür, xalçalar çırpılır ki, yeni il təmiz evdə qarşılansın.'],
      ['yellencek', 'Yelləncək', 'Uşaqlar üçün yelləncək qurulur, yaz yeli ilə birlikdə yellənirlər.'],
    ],
  },
  {
    slug: 'torpaq-cersenbesi',
    k: 'torpaq',
    n: 'Dördüncü çərşənbə',
    title: 'Torpaq çərşənbəsi',
    alt: 'Axır çərşənbə',
    short: 'Torpaq oyanır, bayram yaxınlaşır.',
    lead: 'Sonuncu çərşənbədə torpaq oyanır və yazın nəfəsi hər yerdə hiss olunur. Bu çərşənbəyə "Axır çərşənbə" də deyilir. O, Novruzdan əvvəlki ən şən və adətlərlə ən zəngin gecədir.',
    customs: [
      ['semeni', 'Səməni göyərtmək', 'Buğda islanıb göyərdilir. Səməni bərəkətin və təbiətin dirçəlişinin rəmzidir, ona qırmızı lent bağlanır.'],
      ['papaq', 'Papaq atmaq', 'Uşaqlar qonşu qapılarına papaq, ya da torba atıb gizlənirlər. Ev sahibi papağı boş qaytarmaz, içinə bayram şirniyyatı qoyar.'],
      ['qulaq', 'Qulaq falı', 'Niyyət tutub qonşunun qapısını pusur, içəridən eşidilən ilk sözə görə arzunun çin olub-olmayacağını yozurlar.'],
      ['yumurta', 'Yumurta döyüşdürmək', 'Boyanmış yumurtalar döyüşdürülür: kimin yumurtası sınmasa, o qalib gəlir.'],
      ['samlar', 'Ailə şamları', 'Süfrəyə ailə üzvlərinin sayı qədər şam qoyulur və hamısı birlikdə yandırılır.'],
    ],
  },
];

// Novruz xonçası: hər nemətin mənası
export const XONCA = [
  ['semeni', 'Səməni', 'Xonçanın mərkəzi. Göyərmiş buğda təbiətin oyanışını və bərəkəti bildirir. Ona qırmızı lent bağlanır.'],
  ['sam', 'Şam', 'Ailənin hər üzvü üçün bir şam yandırılır. Şam işığın və ocağın istiliyinin rəmzidir.'],
  ['yumurta', 'Boyanmış yumurta', 'Yumurta həyatın başlanğıcıdır. Soğan qabığı və başqa rənglərlə boyanır, sonra döyüşdürülür.'],
  ['sekerbura', 'Şəkərbura', 'Aypara şəklində bişirilir. Xalq arasında Ayın rəmzi sayılır.'],
  ['paxlava', 'Paxlava', 'Romb şəkilli dilimləri ulduzlara bənzədilir.'],
  ['qogal', 'Qoğal', 'Dəyirmi və sarı qoğal Günəşin rəmzi sayılır.'],
  ['quru', 'Qoz, fındıq, badam, kişmiş', 'Quru meyvə və çərəzlər süfrənin bolluğu, evin bərəkəti arzusudur.'],
];

export const KOSA = 'Kosa və Keçəl Novruz meydan tamaşalarının sevimli qəhrəmanlarıdır. Kosa qışı, Keçəl yazı təmsil edir. Kosa tərs geyinilmiş kürkdə, zınqırovlarla gəlir, Keçəl isə hazırcavab və şəndir. Onların zarafatlı deyişməsi Keçəlin qələbəsi ilə bitir: qış gedir, yaz gəlir. Tamaşadan sonra qapı-qapı gəzib bayram payı yığırlar.';

export const BAYRAM_GUNU = [
  ['sufre', 'Bayram süfrəsi', 'Bayram axşamı ailə süfrə başına toplaşır. Süfrəni plov, xonça və bayram şirniyyatı bəzəyir.'],
  ['pay', 'Bayram payı', 'Qohum-qonşuya, kimsəsizlərə bayram payı göndərilir. Heç kəs bayramı əliboş qarşılamamalıdır.'],
  ['barisiq', 'Küsülülər barışır', 'Novruzda küsülülər barışır, böyüklər ziyarət olunur, hamı bir-birini təbrik edir.'],
];
