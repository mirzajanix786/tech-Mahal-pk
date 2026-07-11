import Hero from "@/sections/Hero";
import Categories from "@/sections/Categories";
import FeaturedProducts from "@/sections/FeaturedProducts";
import TrendingProducts from "@/sections/TrendingProducts";
import FlashDeals from "@/sections/FlashDeals";
import NewArrivals from "@/sections/NewArrivals";
import BestSellers from "@/sections/BestSellers";
import WhyChooseUs from "@/sections/WhyChooseUs";
import PremiumBrands from "@/sections/PremiumBrands";
import Testimonials from "@/sections/Testimonials";
import FAQSection from "@/sections/FAQSection";
import Newsletter from "@/sections/Newsletter";
import { productService } from "@/services/productService";

// Always fetch fresh data from the database — don't cache the homepage,
// otherwise admin panel changes won't show up until a redeploy.
export const revalidate = 0;

export default async function HomePage() {
  const [flashDeals, trending, featured, newArrivals, bestSellers] =
    await Promise.all([
      productService.getFlashDeals(4),
      productService.getTrending(8),
      productService.getFeatured(8),
      productService.getNewArrivals(8),
      productService.getBestSellers(8),
    ]);

  return (
    <>
      <Hero />
      <Categories />
      <FlashDeals products={flashDeals} />
      <TrendingProducts products={trending} />
      <FeaturedProducts products={featured} />
      <NewArrivals products={newArrivals} />
      <WhyChooseUs />
      <BestSellers products={bestSellers} />
      <PremiumBrands />
      <Testimonials />
      <FAQSection />
      <Newsletter />
    </>
  );
}
