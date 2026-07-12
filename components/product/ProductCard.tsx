"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiHeart, FiEye, FiShoppingBag, FiCheck } from "react-icons/fi";
import { Product } from "@/types/product";
import { formatPrice, getDiscountPercent, stockLabel } from "@/lib/utils";
import { useStore } from "@/context/StoreContext";
import StarRating from "@/components/ui/StarRating";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  priority?: boolean;
}

const MotionLink = motion(Link);

export default function ProductCard({ product, onQuickView, priority }: ProductCardProps) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [justAdded, setJustAdded] = useState(false);

  const discount = getDiscountPercent(product);
  const stock = stockLabel(product.stock);
  const wishlisted = isWishlisted(product.id);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  }

  function handleToggleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  }

  function handleQuickView(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  }

  return (
    <MotionLink
      href={`/products/${product.slug}`}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:border-blue-400/40 hover:shadow-[0_0_60px_10px_rgba(59,130,246,0.9)]
    >
      {/* Media */}
      <div className="relative aspect-square w-full flex-shrink-0 overflow-hidden bg-gradient-to-br from-platinum-200 via-white to-platinum-300">
    < Image
  src = { product.images[0] }
  alt = { product.title }
  fill
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
  className = "object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-105"
  priority = { priority }
    />

    {/* Badges */ }
    < div className = "absolute left-3 top-3 flex flex-col gap-1.5" >
      { discount && <span className="chip-sale">-{discount}%</span>
}
{ product.newArrival && <span className="chip-gold">New</span> }
        </div >

{
  stock.tone !== "in" && (
    <div className="absolute right-3 top-3">
      <span
        className={
          stock.tone === "out"
            ? "chip bg-black/60 border-white/20 text-white"
            : "chip bg-amber-500/15 border-amber-500/40 text-amber-300"
        }
      >
        {stock.label}
      </span>
    </div>
  )
}

{/* Hover actions */ }
<div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
  <button
    type="button"
    onClick={handleToggleWishlist}
    aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
    aria-pressed={wishlisted}
    className="flex h-10 w-10 items-center justify-center rounded-full bg-onyx-950/85 text-white backdrop-blur transition-colors hover:text-gold-400"
  >
    <FiHeart size={16} className={wishlisted ? "fill-gold-400 text-gold-400" : ""} />
  </button>
  {onQuickView && (
    <button
      type="button"
      onClick={handleQuickView}
      aria-label={`Quick view ${product.title}`}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-onyx-950/85 text-white backdrop-blur transition-colors hover:text-gold-400"
    >
      <FiEye size={16} />
    </button>
  )}
</div>
      </div >

  {/* Body */ }
  < div className = "flex flex-1 flex-col p-4 sm:p-5" >
        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gold-400">
          {product.brand}
        </p>
        <h3 className="mb-2 line-clamp-2 min-h-[2.6em] font-display text-[15px] font-medium leading-snug text-white">
          {product.title}
        </h3>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} showValue />

        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-lg font-semibold text-white">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-platinum-500 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors duration-300 hover:border-gold-500/50 hover:bg-gold-500/10 hover:text-gold-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {justAdded ? (
            <>
              <FiCheck size={14} /> Added
            </>
          ) : (
            <>
              <FiShoppingBag size={14} />
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </>
          )}
        </button>
      </div >
    </MotionLink >
  );
}
