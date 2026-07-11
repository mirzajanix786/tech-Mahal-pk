import { brands } from "@/data/brands";
import Reveal from "@/components/ui/Reveal";

export default function PremiumBrands() {
  return (
    <section className="relative border-y border-white/10 bg-onyx-900/50 py-14 sm:py-16">
      <div className="container-max">
        <Reveal className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-platinum-500">
            Genuine Products From Brands You Trust
          </p>
        </Reveal>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
          {brands.map((brand) => (
            <span
              key={brand.name}
              className="font-display text-lg font-bold uppercase tracking-wide text-platinum-400 opacity-70 transition-opacity duration-300 hover:text-gold-300 hover:opacity-100 sm:text-2xl"
            >
              {brand.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
