"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import QuickView from "./QuickView";
import Reveal from "@/components/ui/Reveal";

interface ProductGridProps {
  products: Product[];
  columns?: 3 | 4;
}

export default function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const gridCols =
    columns === 3
      ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
      : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";

  return (
    <>
      <div className={`grid grid-cols-2 gap-3 sm:gap-5 ${gridCols}`}>
        {products.map((product, i) => (
          <Reveal key={product.id} delay={Math.min(i, 4) * 0.06} y={20}>
            <ProductCard product={product} onQuickView={setQuickViewProduct} />
          </Reveal>
        ))}
      </div>
      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </>
  );
}
