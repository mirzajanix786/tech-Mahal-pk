import { productService } from "@/services/productService";
import ProductCarousel from "@/components/product/ProductCarousel";
import SectionHeading from "@/components/ui/SectionHeading";

export default function BestSellers() {
  const products = productService.getBestSellers(8);

  return (
    <section id="best-sellers" className="relative bg-onyx-900/50 py-20 sm:py-28">
      <div className="container-max">
        <SectionHeading
          eyebrow="Customer Favorites"
          title="Best"
          accent="Sellers."
          description="Proven favorites with the highest repeat-order rate across our entire catalog."
        />
        <div className="mt-10">
          <ProductCarousel products={products} />
        </div>
      </div>
    </section>
  );
}
