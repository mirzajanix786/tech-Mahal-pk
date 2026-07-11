import { Product } from "@/types/product";
import ProductGrid from "@/components/product/ProductGrid";
import SectionHeading from "@/components/ui/SectionHeading";

export default function FeaturedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section id="featured" className="relative py-20 sm:py-28">
      <div className="container-max">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Handpicked For You"
            title="Featured"
            accent="Products."
            className="mb-0"
          />
          <a
            href="/#new-arrivals"
            className="mb-1 hidden text-xs font-semibold uppercase tracking-wider text-gold-300 hover:text-gold-200 sm:inline-block"
          >
            View All →
          </a>
        </div>

        <div className="mt-10">
          <ProductGrid products={products} columns={4} />
        </div>
      </div>
    </section>
  );
}
