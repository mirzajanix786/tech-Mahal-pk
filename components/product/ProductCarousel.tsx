"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import QuickView from "./QuickView";

interface ProductCarouselProps {
  products: Product[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <>
      <div className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 pt-1 -mx-5 px-5 sm:mx-0 sm:px-0">
        {products.map((product) => (
          <div key={product.id} className="w-[68vw] flex-shrink-0 snap-start sm:w-[260px]">
            <ProductCard product={product} onQuickView={setQuickViewProduct} />
          </div>
        ))}
      </div>
      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </>
  );
}
