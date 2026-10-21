// Dövlət rəmzləri: hər hissə üçün rəsmi mətn və mənası
export const RES = 'Rəsmi mətn', MEAN = 'Mənası';
export const sections = {
  flag: {
    intro: { title: 'Dövlət bayrağı', color: '#0A6E99', factTag: 'Konstitusiya, 23-cü maddə', fact: 'Bayraq bərabər enli üç üfüqi zolaqdan ibarətdir: yuxarıda mavi, ortada qırmızı, aşağıda yaşıl.', meanTag: 'Necə baxmalı', mean: 'Rənglərin, ayparanın və ulduzun üzərinə gəlin və ya aşağıdakı düymələrə toxunun.' },
    parts: [
      { id: 'fblue', short: 'Mavi', color: '#00B5E2', title: 'Mavi zolaq', factTag: RES, fact: 'Bayrağın yuxarı zolağı mavi rəngdədir.', meanTag: MEAN, mean: 'Azərbaycan xalqının türk mənşəyini, türkçülüyü ifadə edir.' },
      { id: 'fred', short: 'Qırmızı', color: '#EF3340', title: 'Qırmızı zolaq', factTag: RES, fact: 'Orta zolaq qırmızı rəngdədir, aypara ilə ulduz onun üzərində yerləşir.', meanTag: MEAN, mean: 'Müasir cəmiyyət qurmaq və demokratiyanı inkişaf etdirmək əzmini ifadə edir.' },
      { id: 'fgreen', short: 'Yaşıl', color: '#509E2F', title: 'Yaşıl zolaq', factTag: RES, fact: 'Bayrağın aşağı zolağı yaşıl rəngdədir.', meanTag: MEAN, mean: 'İslam sivilizasiyasına mənsubluğu ifadə edir.' },
      { id: 'fcres', short: 'Aypara', color: '#FFFFFF', title: 'Aypara', factTag: RES, fact: 'Qırmızı zolağın ortasında, bayrağın hər iki üzündə ağ rəngli aypara təsvir edilir.', meanTag: MEAN, mean: 'Ənənəvi olaraq İslam mədəniyyəti ilə əlaqələndirilir.' },
      { id: 'fstar', short: 'Ulduz', color: '#FFFFFF', title: 'Səkkizguşəli ulduz', factTag: RES, fact: 'Ayparanın yanında ağ rəngli səkkizguşəli ulduz təsvir edilir.', meanTag: MEAN, mean: 'Mənası barədə bir neçə yozum var. Ən geniş yayılanına görə, səkkiz guşə ərəb əlifbası ilə yazılmış “Azərbaycan” sözünün səkkiz hərfini bildirir.' }
    ]
  },
  gerb: {
    intro: { title: 'Dövlət gerbi', color: '#C9962B', factTag: 'Rəsmi təsvir', fact: 'Gerb şərq qalxanı şəklindədir və iki palıd budağı ilə iki sünbüldən ibarət qövsün üzərində yerləşir.', meanTag: 'Necə baxmalı', mean: 'Gerbin hər hissəsinin üzərinə gəlin və ya aşağıdakı düymələrə toxunun.' },
    parts: [
      { id: 'gshield', short: 'Qalxan', color: '#C9962B', title: 'Şərq qalxanı', factTag: RES, fact: 'Gerb şərq qalxanı şəklindədir. Qalxanın haşiyəsi və düymələri qızılı rəngdədir.', meanTag: MEAN, mean: 'Qalxan müdafiənin rəmzidir. Şərq forması Azərbaycanın Şərq sivilizasiyasına mənsubluğunu göstərir.' },
      { id: 'gcolors', short: 'Bayraq rəngləri', color: '#EF3340', title: 'Bayraq rəngləri', factTag: RES, fact: 'Qalxanın fonunda Dövlət bayrağının rəngləri verilib: mavi, qırmızı və yaşıl.', meanTag: MEAN, mean: 'Rənglərin mənası bayraqdakı kimidir: türkçülük, müasirlik və demokratiya, İslam sivilizasiyası.' },
      { id: 'gstar', short: 'Ulduz', color: '#FFFFFF', title: 'Səkkizguşəli ulduz', factTag: RES, fact: 'Qalxanın üzərində ağ rəngli, qızılı haşiyəli səkkizguşəli ulduz təsvir edilib.', meanTag: MEAN, mean: 'Gerbdə ulduz çox vaxt Günəşin rəmzi kimi izah olunur.' },
      { id: 'gflame', short: 'Alov', color: '#EF3340', title: 'Alov', factTag: RES, fact: 'Ulduzun mərkəzində qırmızı alov təsviri var.', meanTag: MEAN, mean: 'Azərbaycanın qədim adı olan “Odlar yurdu”nu təmsil edir.' },
      { id: 'goak', short: 'Palıd budağı', color: '#509E2F', title: 'Palıd budağı', factTag: RES, fact: 'Qalxanın altındakı qövsün bir tərəfi yaşıl palıd budağıdır.', meanTag: MEAN, mean: 'Palıd güc, möhkəmlik və uzunömürlülük rəmzidir.' },
      { id: 'gwheat', short: 'Sünbül', color: '#E9B949', title: 'Sünbül', factTag: RES, fact: 'Qövsün o biri tərəfi sarı rəngli sünbüllərdən ibarətdir.', meanTag: MEAN, mean: 'Sünbül bolluğun, bərəkətin və zəhmətin rəmzidir.' }
    ]
  },
  himn: {
    intro: { title: 'Dövlət himni', color: '#0A6E99', factTag: 'Qanun, 27 may 1992', fact: '“Azərbaycan marşı” Azərbaycan Respublikasının Dövlət himni kimi təsdiq edilib.', meanTag: 'Necə baxmalı', mean: 'Notların, sözlərin və tarixlərin üzərinə gəlin və ya aşağıdakı düymələrə toxunun.' },
    parts: [
      { id: 'hmusic', short: 'Musiqi', color: '#0A6E99', title: 'Musiqi', factTag: RES, fact: 'Himnin musiqisi Üzeyir Hacıbəyovundur.', meanTag: 'Müəllif haqqında', mean: 'Üzeyir Hacıbəyov Azərbaycan bəstəkarlıq məktəbinin banisi, müsəlman Şərqinin ilk operası olan “Leyli və Məcnun”un müəllifidir.' },
      { id: 'hwords', short: 'Sözlər', color: '#14202E', title: 'Sözlər', factTag: RES, fact: 'Himnin sözləri Əhməd Cavadındır.', meanTag: 'Müəllif haqqında', mean: 'Əhməd Cavad Azərbaycan Xalq Cümhuriyyəti dövrünün tanınmış şairidir. Şeir “Azərbaycan marşı” adı ilə yazılıb.' },
      { id: 'h1919', short: '1919', color: '#0A6E99', title: '1919', factTag: 'Tarix', fact: 'Marş Azərbaycan Xalq Cümhuriyyəti dövründə yaranıb və dövlət himni kimi qəbul olunub.', meanTag: 'Sonrakı tale', mean: 'Sovet dövründə himn kimi səslənməyib, müstəqillik bərpa olunandan sonra yenidən dövlət himni olub.' },
      { id: 'h1992', short: '1992', color: '#C9962B', title: '27 may 1992', factTag: RES, fact: '“Azərbaycan Respublikasının Dövlət himni haqqında” Qanunla “Azərbaycan marşı” dövlət himni kimi təsdiq edilib.', meanTag: 'Himnə hörmət', mean: 'Himn səslənəndə ayağa qalxmaq və sükut saxlamaq qəbul olunmuş hörmət qaydasıdır.' }
    ]
  }
};
