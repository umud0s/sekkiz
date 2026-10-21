# Səkkizguşə

Azərbaycan dili, tarixi və milli irsi bir yerdə: dövlət rəmzləri, xəritə, atalar sözləri, nağıllar və milli qəhrəmanlar.

Sayt [Astro](https://astro.build) ilə qurulmuş statik saytdır: server, verilənlər bazası yoxdur. Cloudflare Pages-də yayımlanır.

## Bölmələr və ünvanlar

| Bölmə | Ünvan |
|---|---|
| Ana səhifə | `/` |
| Dövlət rəmzləri | `/dovlet-remzleri/` |
| Xəritə | `/xerite/` |
| Atalar sözləri | `/atalar-sozleri/` və hər biri üçün `/atalar-sozleri/<ad>/` |
| Milli qəhrəmanlar | `/milli-qehremanlar/` və hər biri üçün `/milli-qehremanlar/<ad>/` |
| Nağıllar | `/nagillar/` və hər nağıl üçün `/nagillar/<ad>/` |
| Haqqında | `/haqqinda/` |

## Məlumatların yenilənməsi

Bütün məlumatlar `src/data/` qovluğundadır:

- `atalar.json`: atalar sözləri, sətir formatı `[ID, mətn, izah, mövzu1, mövzu2]`
- `qehremanlar.json`: qəhrəmanlar, sətir formatı `[soyad, ad, ata adı, dövr (q1/q2/diger), fəxri ad (0 Milli, 1 Vətən), doğum, ölüm, ölüm növü, yer, fərman, qısa məlumat, mənbə]`
- `xerite-stats.json`: rayonların ərazisi və əhalisi (DSK, cədvəl 1.15)
- `nagillar.json`: nağılların mətni və şəkilləri
- `remzler.js`: dövlət rəmzlərinin izahları

Faylı dəyişib GitHub-a göndərəndə Cloudflare saytı avtomatik yenidən qurur.

## Komandalar

```
npm install       # bir dəfə
npm run dev       # yerli test: http://localhost:4321
npm run build     # saytı dist/ qovluğuna qurur
npm run check     # bütün daxili keçidləri yoxlayır
```

## Cloudflare Pages ayarları

- Build command: `npm run build`
- Build output directory: `dist`
- Node versiyası: `.nvmrc` faylından (22)
