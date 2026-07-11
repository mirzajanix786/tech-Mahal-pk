import { Product } from "@/types/product";

/** Convert a raw Supabase row (snake_case) into the app's Product shape. */
export function fromDbRow(row: any): Product {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    price: Number(row.price),
    oldPrice: row.old_price != null ? Number(row.old_price) : undefined,
    category: row.category,
    brand: row.brand,
    rating: row.rating != null ? Number(row.rating) : 0,
    reviewCount: row.review_count ?? 0,
    stock: row.stock ?? 0,
    images: row.images ?? [],
    featured: row.featured ?? false,
    trending: row.trending ?? false,
    newArrival: row.new_arrival ?? false,
    bestSeller: row.best_seller ?? false,
    flashDeal: row.flash_deal ?? false,
    discount: row.discount ?? undefined,
    tags: row.tags ?? [],
    specifications: row.specifications ?? undefined,
    features: row.features ?? undefined,
  };
}

/** Convert a (partial) Product into a DB row ready for insert/update. */
export function toDbRow(p: Partial<Product>): Record<string, any> {
  const row: Record<string, any> = {};
  if (p.id !== undefined) row.id = p.id;
  if (p.slug !== undefined) row.slug = p.slug;
  if (p.title !== undefined) row.title = p.title;
  if (p.description !== undefined) row.description = p.description;
  if (p.price !== undefined) row.price = p.price;
  if (p.oldPrice !== undefined) row.old_price = p.oldPrice || null;
  if (p.category !== undefined) row.category = p.category;
  if (p.brand !== undefined) row.brand = p.brand;
  if (p.rating !== undefined) row.rating = p.rating;
  if (p.reviewCount !== undefined) row.review_count = p.reviewCount;
  if (p.stock !== undefined) row.stock = p.stock;
  if (p.images !== undefined) row.images = p.images;
  if (p.featured !== undefined) row.featured = p.featured;
  if (p.trending !== undefined) row.trending = p.trending;
  if (p.newArrival !== undefined) row.new_arrival = p.newArrival;
  if (p.bestSeller !== undefined) row.best_seller = p.bestSeller;
  if (p.flashDeal !== undefined) row.flash_deal = p.flashDeal;
  if (p.discount !== undefined) row.discount = p.discount || null;
  if (p.tags !== undefined) row.tags = p.tags;
  if (p.specifications !== undefined) row.specifications = p.specifications;
  if (p.features !== undefined) row.features = p.features;
  return row;
}
