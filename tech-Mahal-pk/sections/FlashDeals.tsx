"use client";

import { Product } from "@/types/product";
import ProductGrid from "@/components/product/ProductGrid";
import { useCountdown } from "@/hooks/useCountdown";
import { FiZap } from "react-icons/fi";

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-gold-500/25 bg-onyx-950/60 px-3 py-2 sm:px-4 sm:py-3">
      <span className="font-display text-lg font-bold text-gold-300 sm:text-2xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[9px] uppercase tracking-wider text-platinum-400 sm:text-[10px]">
        {label}
      </span>
    </div>
  );
}

export default function FlashDeals({ products }: { products: Product[] }) {
  const { hours, minutes, seconds } = useCountdown(8);

  if (products.length === 0) return null;

  return (
    <section
      id="flash-deals"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold-500/[0.06] via-transparent to-signal-500/[0.05]"
      />
      <div className="container-max relative">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">
              <FiZap className="text-gold-400" size={13} /> Limited Time Only
            </p>
            <h2 className="section-title">
              Flash <span className="accent">Deals.</span>
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-platinum-400 sm:text-base">
              Our steepest discounts of the week — once the timer hits zero, these prices are gone.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <TimeBlock value={hours} label="Hours" />
            <span className="font-display text-lg font-bold text-platinum-500">:</span>
            <TimeBlock value={minutes} label="Mins" />
            <span className="font-display text-lg font-bold text-platinum-500">:</span>
            <TimeBlock value={seconds} label="Secs" />
          </div>
        </div>

        <div className="mt-10">
          <ProductGrid products={products} columns={4} />
        </div>
      </div>
    </section>
  );
}
