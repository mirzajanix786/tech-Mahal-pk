/**
 * One-time migration: pushes every product currently in data/products.ts
 * into your new Supabase "products" table.
 *
 * Run once, after you've created the table (supabase/schema.sql) and set
 * your .env.local:
 *
 *   npx tsx scripts/seed.ts
 *
 * Safe to re-run — it upserts by id, so running it twice won't create
 * duplicates.
 */
import { createClient } from "@supabase/supabase-js";
import { products } from "../data/products";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    "❌ NEXT_PUBLIC_SUPABASE_URL ya SUPABASE_SERVICE_ROLE_KEY .env.local mein nahi mile."
  );
  process.exit(1);
}

const supabase = createClient(url, key);

async function seed() {
  const rows = products.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    description: p.description,
    price: p.price,
    old_price: p.oldPrice ?? null,
    category: p.category,
    brand: p.brand,
    rating: p.rating,
    review_count: p.reviewCount,
    stock: p.stock,
    images: p.images,
    featured: p.featured ?? false,
    trending: p.trending ?? false,
    new_arrival: p.newArrival ?? false,
    best_seller: p.bestSeller ?? false,
    flash_deal: p.flashDeal ?? false,
    discount: p.discount ?? null,
    tags: p.tags ?? [],
    specifications: p.specifications ?? null,
    features: p.features ?? null,
  }));

  console.log(`Uploading ${rows.length} products...`);

  const { error } = await supabase.from("products").upsert(rows, { onConflict: "id" });

  if (error) {
    console.error("❌ Seed failed:", error.message);
    process.exit(1);
  }

  console.log(`✅ ${rows.length} products successfully seeded into Supabase.`);
}

seed();
