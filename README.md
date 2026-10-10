# KAPTAAN 804

WhatsApp-first storefront for KAPTAAN 804 in Karachi.

- Domain: https://www.kaptaan804.com
- Orders: https://wa.me/923102201180
- Catalog: `src/data/products.ts`
- Categories: `src/data/categories.ts`
- Videos: `src/data/productVideos.ts`
- Reviews: `src/data/reviews.ts`

Only publish a product when its name, price, images, and description are verified. Hair care, skin care, and further personal-care items can be added in the same catalog file. Empty categories stay hidden until a product uses them.

## Add a product

1. Put photographs in `public/images/product/`.
2. Copy the Eagle Delay Spray record in `src/data/products.ts`.
3. Set a unique `id` and `slug`, bilingual `name`, `category`, verified `price` in PKR, and `images`.
4. Leave `compareAtPrice` as `null` unless a genuine reference price exists.
5. Do not invent ingredients, strengths, medical results, or stock claims.
6. Run `npm run build`. The product page is `/products/{slug}`.

## Add a TikTok video

1. Open the video in TikTok.
2. Use Share → Copy link. The URL must contain `/video/` and a numeric id. A profile URL is ignored.
3. Add an entry to `src/data/productVideos.ts` with `productSlug` set to a slug from the catalog, for example `eagle-delay-spray`.
4. Cards appear on the homepage, the videos page, and the matching product page. Nothing is shown until a real video URL is saved.

## Add a review

Put only a verified review in `src/data/reviews.ts`. Keep the original wording and star rating. The homepage shows the section after at least one review is saved. Do not invent names, dates, or ratings.

```bash
npm install
npm run dev
npm run build
```
