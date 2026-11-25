# MI99 – Mliječna industrija 99 · website redesign

A commercial redesign proposal for [mi99.ba](https://mi99.ba): a premium, trilingual (BS / EN / DE) website for the Gradačac dairy and its brands **Natura** and **Milkland**.

> Concept: **„Prirodno dobro. Od prvog gutljaja.“**

## Stack

- **Next.js 16** (App Router, Turbopack), TypeScript, React 19
- **Tailwind CSS 4** with design tokens in `src/app/globals.css`
- **next-intl 4**: locale-prefixed routes (`/bs`, `/en`, `/de`); Bosnian is the default and `/` redirects to `/bs`
- **Motion** for animations (all of them respect `prefers-reduced-motion`)
- **lucide-react** icons, `next/image` (AVIF/WebP)
- No database and no authentication. All pages (183) are pre-rendered statically.

## Getting started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build and serve the production version:

```bash
npm run build && npm start
```

Run the end-to-end QA against the production server (5 breakpoints, link crawl, menus, filters, language switch, forms):

```bash
BASE_URL=http://localhost:3000 npm run qa
```

### Environment variables

| Name | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap and JSON-LD. Default: `https://mi99.ba`. |
| `INQUIRY_WEBHOOK_URL` | Optional. Enquiries are POSTed here as JSON. Without it, forms run in a labelled demonstration mode. |

## Deploying to Vercel

1. Import the repository in Vercel. The framework preset is detected automatically and no build settings are needed.
2. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
3. Optionally set `INQUIRY_WEBHOOK_URL`.

## Pages

| Route (`/[locale]/…`) | Page |
|---|---|
| `/` | Homepage: hero, highlights, product showcase, brands, *Od prirode do vašeg stola*, production, lifestyle, recipes, B2B, news |
| `/o-nama` | About MI99 |
| `/proizvodi` | All products (category and brand filters, synced with the URL) |
| `/proizvodi/kategorija/[category]` | Product category pages (6) |
| `/proizvodi/[slug]` | Product detail pages (31): nutrition, verified ingredients/storage, logistics and EAN, spec PDF |
| `/brendovi`, `/brendovi/natura`, `/brendovi/milkland` | Brands |
| `/proizvodnja-i-kvalitet` | Production & quality, certificate archive |
| `/recepti`, `/recepti/[slug]` | Recipes (proposed content) |
| `/poslovna-saradnja` | Business partnerships and enquiry form |
| `/novosti`, `/novosti/[slug]` | News with category filter |
| `/kontakt` | Contact, map, contact form |
| `/politika-privatnosti` | Privacy policy (draft) |

The site also generates `sitemap.xml` (with hreflang alternates) and `robots.txt`, plus Organization, Product, Recipe, NewsArticle and BreadcrumbList JSON-LD.

## Project structure

```
src/
  app/[locale]/        pages (static, generateStaticParams)
  app/api/inquiry/     form endpoint (validation + optional webhook)
  components/          layout, home sections, product, cards, forms, ui
  data/                centralised, CMS-ready content
    products.raw.json  product data scraped from mi99.ba
    catalog.ts         typed catalogue, categories, brands, verified spec data, sanitising
    company.ts         company facts, equipment, certificates
    news.ts, recipes.ts
  i18n/                next-intl routing, request config, navigation
  messages/            bs.json, en.json, de.json (UI copy)
public/
  images/products/     transparent packshots (upscaled from MI99 originals)
  images/company/      MI99 plant photos
  images/photos/       illustrative stock photography (Unsplash licence)
  downloads/           product specification PDFs and certificate PDFs from mi99.ba
scripts/qa.cjs         Playwright QA
```

### Connecting a CMS later

Each data module exports plain serialisable objects with localised fields (`{ bs, en, de }`). Replace the module exports with CMS queries (for example Sanity, Strapi or Payload) and keep the same types. Components never import raw data directly.

## Content sources & verification

See **[docs/CONTENT-NOTES.md](docs/CONTENT-NOTES.md)**. It lists what is verified, what was suppressed because the source data was inconsistent, which certificates have expired, and what MI99 needs to confirm or supply before launch.
