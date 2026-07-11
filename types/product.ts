/**
 * Core product type. This shape is intentionally "API-ready" — every field
 * here maps 1:1 to what a future admin panel / headless CMS / database table
 * would store, so the data source can later be swapped from a static array
 * (see /data/products.ts) to a real API call without touching any UI code.
 */
export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number; // current selling price, in PKR
  oldPrice?: number; // original price before discount, in PKR
  category: CategorySlug;
  brand: string;
  rating: number; // 0–5
  reviewCount: number;
  stock: number; // 0 = out of stock
  images: string[];
  featured?: boolean;
  trending?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
  flashDeal?: boolean;
  discount?: number; // percentage, derived but stored for fast reads
  tags?: string[];
  /** Optional explicit spec rows. If omitted, the product page derives a
   *  sensible generic set from category/brand via lib/utils.ts. */
  specifications?: { label: string; value: string }[];
  /** Optional explicit feature bullets. Falls back the same way. */
  features?: string[];
}

export type CategorySlug =
  | "airpods"
  | "chargers"
  | "cables"
  | "gadgets"
  | "headphones"
  | "hands-free"
  | "mobile-covers"
  | "power-banks"
  | "smart-watches";

export interface Category {
  slug: CategorySlug;
  name: string;
  image: string;
  productCount: number;
}

export interface Brand {
  name: string;
  productCount: number;
}
