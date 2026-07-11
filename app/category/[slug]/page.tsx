import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { productService, categoryService } from "@/services/productService";
import { siteConfig } from "@/constants/site";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductGrid from "@/components/product/ProductGrid";

interface CategoryPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return categoryService.getAll().map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const category = categoryService.getBySlug(params.slug);
  if (!category) return { title: "Category Not Found" };

  const title = `${category.name} | ${siteConfig.shortName}`;
  const description = `Shop authentic ${category.name.toLowerCase()} at ${siteConfig.name} — competitive prices, quality-checked, with instant WhatsApp ordering.`;

  return {
    title,
    description,
    alternates: { canonical: `/category/${category.slug}` },
    openGraph: { title, description, type: "website" },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categoryService.getBySlug(params.slug);
  if (!category) notFound();

  const products = productService.getByCategory(category.slug);

  return (
    <div className="pb-20 pt-28 sm:pt-32">
      <div className="container-max">
        <Breadcrumbs items={[{ label: category.name }]} />

        <div className="mt-6 max-w-2xl">
          <p className="eyebrow">Category</p>
          <h1 className="section-title">
            Shop <span className="accent">{category.name}.</span>
          </h1>
          <p className="text-sm text-platinum-400">
            {products.length} product{products.length !== 1 ? "s" : ""} available
          </p>
        </div>

        <div className="mt-10">
          {products.length > 0 ? (
            <ProductGrid products={products} columns={4} />
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
              <p className="text-platinum-400">
                No products in this category right now — check back soon, or browse other
                categories from the menu.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
