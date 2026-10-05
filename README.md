# KBM Web Clinic

Veterinariya klinikasi sayti. **Astro + TypeScript + SCSS** asosida qurilgan, natijada statik HTML chiqadi.

Mualliflar: Komronbek, Boburbek, Mominjon.

## Ishga tushirish

Node.js 22.12 yoki undan yangi versiya kerak (`.nvmrc`).

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # astro check + production build → dist/
npm run preview   # build natijasini lokal ko'rish
npm run format    # Prettier
```

Formalarni backend'ga ulash uchun `.env.example` faylini `.env` nomi bilan nusxalang va
`PUBLIC_FORM_ENDPOINT` ni to'ldiring. Bu qiymat bo'lmasa, formalar demo rejimda ishlaydi:
ma'lumot brauzer konsoliga chiqadi.

## Arxitektura

```
src/
├── assets/            # Rasm va shriftlar (Astro optimallashtiradi: webp, hash)
│   ├── fonts/
│   └── images/{brand,icons,services,articles,about,contact,faq,backgrounds,decor,social}
├── components/
│   ├── layout/        # SiteHeader, SiteFooter, ContactList, Seo
│   ├── ui/            # Button, PageHero, SectionTitle, Breadcrumbs, Prose, MapEmbed, ...
│   ├── cards/         # ArticleCard, ArticleFeatureCard, ServiceCard, ServiceTile
│   ├── forms/         # QuestionForm, SubscribeForm
│   ├── dialogs/       # Dialog (<dialog>), QuestionDialogs
│   └── sections/      # Sahifa bo'limlari: home/, about/, services/, faq/
├── config/            # site.ts (kontaktlar, ish vaqti, xarita), navigation.ts, dialogs.ts
├── content/           # Kontent: services/*.md, articles/*.md, faq.json
├── content.config.ts  # Kontent kolleksiyalari sxemasi (Zod)
├── layouts/           # BaseLayout: <head>, header, footer, modallar
├── lib/               # content.ts (getServices/getArticles/getFaq), format.ts
├── pages/             # Routing: /, /about, /services, /services/[slug], /blog, /blog/[slug], /faq, /contact, 404
├── scripts/           # Kliyent kodi: dialogs.ts, forms.ts, carousel.ts (Swiper)
└── styles/
    ├── abstracts/     # Tokenlar (rang, shrift, breakpoint) va mixin'lar — har bir komponentga avtomatik ulanadi
    ├── base/          # reset, @font-face, global bazaviy stillar
    └── global.scss
```

### Asosiy qoidalar

- **Ma'lumot bitta joyda.** Telefon, manzil va ish vaqti `src/config/site.ts` da turadi. Menyu
  `src/config/navigation.ts` da. Ular header, footer va kontaktlar sahifasida qayta yozilmaydi.
- **Kontent koddan alohida.** Yangi xizmat yoki maqola qo'shish uchun `src/content/` ga `.md`
  fayl qo'shing. Sahifa, kartochka va karuseldagi element avtomatik yaratiladi. Frontmatter'ni
  Zod sxemasi tekshiradi.
- **Stillar komponent ichida.** Har bir `.astro` faylda o'zining scoped `<style lang="scss">`
  bloki bor. Global stillar faqat `styles/base` da. Ranglar va o'lchamlar `$token` sifatida
  `styles/abstracts/_tokens.scss` dan olinadi, kodda "sehrli" qiymatlar yozilmaydi.
- **Minimal JS.** Modal oynalar nativ `<dialog>` da, FAQ akkordeoni `<details name>` da ishlaydi.
  Swiper faqat karusel bor sahifalarda yuklanadi.
- **Deklarativ xatti-harakat.** `data-dialog-open="<id>"` modalni ochadi. `data-form="<name>"`
  formani `scripts/forms.ts` orqali yuboradi. `data-carousel="<preset>"` karusel yaratadi.

### Eski URL'lar

`/about-campany.html`, `/servies.html` va `/servicas_open.html` yangi sahifalarga redirect
qilinadi (`astro.config.mjs` → `redirects`).
