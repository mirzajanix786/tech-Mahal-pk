"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiHeart, FiShoppingBag, FiMessageCircle } from "react-icons/fi";
import { Product } from "@/types/product";
import { formatPrice, getDiscountPercent, stockLabel, buildProductWhatsAppLink } from "@/lib/utils";
import { useStore } from "@/context/StoreContext";
import StarRating from "@/components/ui/StarRating";

interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickView({ product, onClose }: QuickViewProps) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Quick view: ${product.title}`}
        >
          <motion.button
            type="button"
            aria-label="Close quick view"
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative grid w-full max-w-3xl grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-onyx-900 shadow-premium sm:grid-cols-2 max-h-[88vh] overflow-y-auto"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-onyx-950/80 text-white backdrop-blur hover:text-gold-400"
            >
              <FiX size={18} />
            </button>

            <div className="relative aspect-square bg-gradient-to-br from-platinum-200 via-white to-platinum-300 sm:aspect-auto">
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-contain p-8"
              />
            </div>

            <div className="flex flex-col p-6 sm:p-8">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-gold-400">
                {product.brand} · {product.category.replace("-", " ")}
              </p>
              <h3 className="mb-2 font-display text-xl font-semibold text-white sm:text-2xl">
                {product.title}
              </h3>
              <StarRating rating={product.rating} reviewCount={product.reviewCount} showValue />

              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-display text-2xl font-bold text-white">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-sm text-platinum-500 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
                {getDiscountPercent(product) && (
                  <span className="chip-sale">-{getDiscountPercent(product)}%</span>
                )}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-platinum-400">
                {product.description}
              </p>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-platinum-400">
                {stockLabel(product.stock).label}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                  className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FiShoppingBag size={15} /> Add to Cart
                </button>
                <a
                  href={buildProductWhatsAppLink(product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost flex-1"
                >
                  <FiMessageCircle size={15} /> Order on WhatsApp
                </a>
              </div>

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className="mt-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-platinum-400 transition-colors hover:text-gold-300"
              >
                <FiHeart
                  size={14}
                  className={isWishlisted(product.id) ? "fill-gold-400 text-gold-400" : ""}
                />
                {isWishlisted(product.id) ? "Saved to Wishlist" : "Add to Wishlist"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
