import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { Product, CategorySlug } from "@/types/product";

/**
 * Thin service layer over the product catalog.
 *
 * Every function here is written the way it would be if it were calling a
 * real backend (`await fetch("/api/products")`, etc.). Today they read from
 * the static `data/products.ts` array; later, swapping the body of each
 * function for a real API/database call is a one-file change — no component
 * anywhere in the app needs to know the difference.
 */
export const productService = {
  getAll(): Product[] {
    return products;
  },

  getBySlug(slug: string): Product | undefined {
    return products.find((p) => p.slug === slug);
  },

  getByCategory(category: CategorySlug): Product[] {
    return products.filter((p) => p.category === category);
  },

  getFeatured(limit = 8): Product[] {
    return products.filter((p) => p.featured).slice(0, limit);
  },

  getTrending(limit = 8): Product[] {
    return products.filter((p) => p.trending).slice(0, limit);
  },

  getNewArrivals(limit = 8): Product[] {
    return products.filter((p) => p.newArrival).slice(0, limit);
  },

  getBestSellers(limit = 8): Product[] {
    return products.filter((p) => p.bestSeller).slice(0, limit);
  },

  getFlashDeals(limit = 6): Product[] {
    return products
      .filter((p) => p.flashDeal)
      .sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0))
      .slice(0, limit);
  },

  getRelated(product: Product, limit = 4): Product[] {
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, limit);
  },

  search(query: string): Product[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
    );
  },
};

export const categoryService = {
  getAll() {
    return categories;
  },
  getBySlug(slug: string) {
    return categories.find((c) => c.slug === slug);
  },
};
