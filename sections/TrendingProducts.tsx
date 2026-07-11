import { productService } from "@/services/productService";
import ProductCarousel from "@/components/product/ProductCarousel";
import SectionHeading from "@/components/ui/SectionHeading";

export default function TrendingProducts() {
  const products = productService.getTrending(8);

  return (
    <section id="trending" className="relative bg-onyx-900/50 py-20 sm:py-28">
      <div className="container-max">
        <SectionHeading
          eyebrow="What Everyone's Buying"
          title="Trending"
          accent="Right Now."
          description="The products our customers keep coming back for — scroll to see what's hot this week."
        />
        <div className="mt-10">
          <ProductCarousel products={products} />
        </div>
      </div>
    </section>
  );
}
