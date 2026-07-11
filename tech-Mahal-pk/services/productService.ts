import { supabase } from "@/lib/supabase/client";
import { categories } from "@/data/categories";
import { Product, CategorySlug } from "@/types/product";
import { fromDbRow } from "@/lib/product-mapper";

/**
 * Thin service layer over the product catalog — now backed by Supabase
 * instead of the static data/products.ts array. Every section/page in the
 * app calls these functions the exact same way; only this file talks to
 * the database.
 */
export const productService = {
  async getAll(): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return data.map(fromDbRow);
  },

  async getBySlug(slug: string): Promise<Product | undefined> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error || !data) return undefined;
    return fromDbRow(data);
  },

  async getByCategory(category: CategorySlug): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return data.map(fromDbRow);
  },

  async getFeatured(limit = 8): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error || !data) return [];
    return data.map(fromDbRow);
  },

  async getTrending(limit = 8): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("trending", true)
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error || !data) return [];
    return data.map(fromDbRow);
  },

  async getNewArrivals(limit = 8): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("new_arrival", true)
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error || !data) return [];
    return data.map(fromDbRow);
  },

  async getBestSellers(limit = 8): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("best_seller", true)
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error || !data) return [];
    return data.map(fromDbRow);
  },

  async getFlashDeals(limit = 6): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("flash_deal", true)
      .order("discount", { ascending: false })
      .limit(limit);
    if (error || !data) return [];
    return data.map(fromDbRow);
  },

  async getRelated(product: Product, limit = 4): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", product.category)
      .neq("id", product.id)
      .limit(limit);
    if (error || !data) return [];
    return data.map(fromDbRow);
  },

  async search(query: string): Promise<Product[]> {
    const q = query.trim();
    if (!q) return [];
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .or(`title.ilike.%${q}%,brand.ilike.%${q}%`)
      .limit(20);
    if (error || !data) return [];
    return data.map(fromDbRow);
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
