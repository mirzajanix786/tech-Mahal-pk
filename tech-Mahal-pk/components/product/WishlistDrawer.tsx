"use client";

import Image from "next/image";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/utils";
import SideDrawer from "@/components/ui/SideDrawer";

interface WishlistDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function WishlistDrawer({ open, onClose }: WishlistDrawerProps) {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  return (
    <SideDrawer open={open} onClose={onClose} title={`Wishlist (${wishlist.length})`}>
      {wishlist.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
          <FiHeart size={32} className="text-platinum-500" />
          <p className="text-sm text-platinum-400">No saved items yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {wishlist.map((product) => (
            <div key={product.id} className="flex gap-3 border-b border-white/10 pb-4">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-platinum-200 to-white">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  sizes="64px"
                  className="object-contain p-2"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-xs font-medium text-white">{product.title}</p>
                <p className="mt-1 text-xs text-gold-300">{formatPrice(product.price)}</p>
                <div className="mt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-platinum-300 hover:text-gold-300"
                  >
                    <FiShoppingBag size={12} /> Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    className="text-[11px] font-semibold uppercase tracking-wider text-platinum-500 hover:text-red-400"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </SideDrawer>
  );
}
