import { productService } from "@/services/productService";
import ProductGrid from "@/components/product/ProductGrid";
import SectionHeading from "@/components/ui/SectionHeading";

export default function NewArrivals() {
  const products = productService.getNewArrivals(8);

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
