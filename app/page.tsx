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

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <FlashDeals />
      <TrendingProducts />
      <FeaturedProducts />
      <NewArrivals />
      <WhyChooseUs />
      <BestSellers />
      <PremiumBrands />
      <Testimonials />
      <FAQSection />
      <Newsletter />
    </>
  );
}
