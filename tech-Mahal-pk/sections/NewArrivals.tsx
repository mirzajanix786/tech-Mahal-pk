import { Product } from "@/types/product";
import ProductGrid from "@/components/product/ProductGrid";
import SectionHeading from "@/components/ui/SectionHeading";

export default function NewArrivals({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section id="new-arrivals" className="relative py-20 sm:py-28">
      <div className="container-max">
        <SectionHeading
          eyebrow="Just Landed"
          title="New"
          accent="Arrivals."
          description="Fresh stock, added regularly — be the first to grab the latest gadgets before they sell out."
        />
        <div className="mt-10">
          <ProductGrid products={products} columns={4} />
        </div>
      </div>
    </section>
  );
}
