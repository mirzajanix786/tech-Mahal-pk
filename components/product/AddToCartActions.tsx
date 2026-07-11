"use client";

import { useState } from "react";
import { FiShoppingBag, FiCheck, FiHeart } from "react-icons/fi";
import { Product } from "@/types/product";
import { useStore } from "@/context/StoreContext";

export default function AddToCartActions({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [justAdded, setJustAdded] = useState(false);
  const wishlisted = isWishlisted(product.id);

  function handleAddToCart() {
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  }

  return (
    <>
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={product.stock === 0}
        className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {justAdded ? (
          <>
            <FiCheck size={15} /> Added to Cart
          </>
        ) : (
          <>
            <FiShoppingBag size={15} />
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </>
        )}
      </button>
      <button
        type="button"
        onClick={() => toggleWishlist(product)}
        aria-pressed={wishlisted}
        className="flex flex-shrink-0 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:border-gold-500/40 hover:text-gold-300"
      >
        <FiHeart size={15} className={wishlisted ? "fill-gold-400 text-gold-400" : ""} />
        <span className="hidden sm:inline">{wishlisted ? "Saved" : "Wishlist"}</span>
      </button>
    </>
  );
}
