# Tech Mahal PK — Premium Electronics Storefront

A production-grade eCommerce storefront built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion**. Product catalog, pricing, categories and photography are sourced (with permission) from [themobilehub.store](https://themobilehub.store/) — reimagined into an entirely original, premium dark-theme design.

---

## ✨ Highlights

- Full-viewport cinematic hero (`100svh`, never overflows) with a real premium electronics lifestyle photograph, dark overlay, and floating WhatsApp CTA
- 12 storefront sections: Hero, Categories, Featured, Trending, Flash Deals (live countdown), New Arrivals, Best Sellers, Why Choose Us, Premium Brands, Testimonials, FAQ, Newsletter
- Premium product cards: Quick View modal, Wishlist, Add to Cart, sale/discount badges, live stock status — every interaction wired to real state (`context/StoreContext.tsx`), not just visual mockups
- **WhatsApp-first ordering** — the whole store is built around WhatsApp checkout: a floating global button, a per-product "Order on WhatsApp" link in Quick View, and a pre-filled cart summary link in the Cart drawer
- Dark premium theme — onyx/graphite base, platinum text, soft gold accent — deliberately distinct from Cimple Tech's other dark-theme builds (car dealership, restaurant)
- Fully responsive, tested from 1920px down to 320px, with no fixed heights that could overflow on laptops at 100% zoom
- SEO: full metadata, Open Graph + Twitter cards, `Store` JSON-LD schema, dynamic `sitemap.xml` + `robots.txt`
- Real production build verified (see "QA Verified" below) — not just written and assumed to work

---

## 📁 Project Structure

```
tech-mahal-pk/
├── app/
│   ├── layout.tsx        # Root layout: fonts, full metadata, JSON-LD, providers
│   ├── page.tsx           # Home — assembles every section
│   ├── globals.css        # Tailwind layers + design-token component classes
│   ├── sitemap.ts / robots.ts
├── sections/               # One component per storefront section (Hero, FAQ, etc.)
├── components/
│   ├── layout/             # Navbar, Footer, WhatsAppButton, Preloader, ScrollProgress
│   ├── product/             # ProductCard, ProductGrid, ProductCarousel, QuickView,
│   │                          CartDrawer, WishlistDrawer
│   └── ui/                  # Reveal, SectionHeading, StarRating, SideDrawer
├── context/
│   └── StoreContext.tsx    # Cart + wishlist state (React Context, no external lib)
├── hooks/
│   └── useCountdown.ts     # Rolling flash-deal countdown
├── services/
│   └── productService.ts   # ALL product data access goes through here (see below)
├── data/                    # products.ts, categories.ts, brands.ts, testimonials.ts, faqs.ts
├── types/                   # Product, Category, Testimonial, FAQ types
├── constants/site.ts        # Brand name, WhatsApp number, nav links, social placeholders
├── lib/utils.ts              # formatPrice, WhatsApp link builders, discount math
└── public/favicon/           # Full favicon set
```

---

## 🔌 Built To Connect To An Admin Panel Later

No admin panel exists yet (as requested) — but the frontend is already shaped so one can be added **without touching a single UI component**:

- Every product is a plain object matching the `Product` type in `types/product.ts` (`id`, `title`, `description`, `price`, `oldPrice`, `category`, `brand`, `rating`, `stock`, `images`, `featured`, `discount`, `slug`, plus a few extra flags used for the Trending/New/Best-Seller sections).
- **No component ever imports `data/products.ts` directly.** Every section and every product component reads through `services/productService.ts` (`getFeatured()`, `getTrending()`, `getBySlug()`, etc.).
- To connect a real backend later: replace the body of each function in `productService.ts` with a real `fetch("/api/products")` call. Nothing in `sections/` or `components/` needs to change.

---

## 🎨 Design System

| Token | Usage |
|---|---|
| `onyx-950 / 900` | Page background |
| `platinum-300/400/500` | Body text, secondary text |
| `gold-300/400/500` | Primary accent — CTAs, prices, highlights |
| `signal-500` | Secondary accent (stock/success states) |

Fonts: **Outfit** (display/headings) + **Plus Jakarta Sans** (body), loaded via `next/font/google`.

---

## ✅ QA Verified

This project was verified with a real production build before delivery:

```
✓ Compiled successfully
✓ Linting and checking validity of types  — 0 errors
✓ Generating static pages (6/6)
```

Also fixed during QA: a broken relative import (`./StarRating`) in `ProductCard.tsx` and `QuickView.tsx` that pointed at the wrong folder — caught by the real build, not left for the client to discover.

## 🚀 Getting Started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start
```

## 🌍 Deploying

Zero-config on **Vercel** — push to GitHub, import the repo, deploy. Also works on Netlify or any Node.js host with Next.js support.

---

## 📌 Fast Follows (Not In This Version)

- Individual `/product/[slug]` pages (Quick View currently covers product detail viewing)
- Real newsletter backend (the form is wired up client-side, ready for an API route)
- Real social media links (placeholders `#` in `constants/site.ts` until accounts exist)

---

## 🏢 Contact

- WhatsApp: +92 312 9217754
- Content & product data used with permission from [themobilehub.store](https://themobilehub.store/)

---

Designed & developed by **Cimple Tech**.
