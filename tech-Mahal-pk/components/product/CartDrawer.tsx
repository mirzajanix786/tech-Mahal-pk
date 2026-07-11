"use client";

import Image from "next/image";
import { FiTrash2, FiMessageCircle, FiShoppingBag } from "react-icons/fi";
import { useStore } from "@/context/StoreContext";
import { formatPrice, buildWhatsAppLink } from "@/lib/utils";
import SideDrawer from "@/components/ui/SideDrawer";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cartItems, removeFromCart } = useStore();

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const whatsappMessage = cartItems.length
    ? `Hi Tech Mahal PK! I'd like to order:\n\n${cartItems
        .map((item) => `• ${item.product.title} x${item.quantity} — ${formatPrice(item.product.price * item.quantity)}`)
        .join("\n")}\n\nTotal: ${formatPrice(total)}`
    : "Hi Tech Mahal PK! I'd like to place an order.";

  return (
    <SideDrawer open={open} onClose={onClose} title={`Cart (${cartItems.length})`}>
      {cartItems.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
          <FiShoppingBag size={32} className="text-platinum-500" />
          <p className="text-sm text-platinum-400">Your cart is empty.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <div key={item.product.id} className="flex gap-3 border-b border-white/10 pb-4">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-platinum-200 to-white">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.title}
                  fill
                  sizes="64px"
                  className="object-contain p-2"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-xs font-medium text-white">{item.product.title}</p>
                <p className="mt-1 text-xs text-platinum-400">
                  Qty {item.quantity} · {formatPrice(item.product.price)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeFromCart(item.product.id)}
                aria-label={`Remove ${item.product.title} from cart`}
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-platinum-500 hover:bg-white/5 hover:text-red-400"
              >
                <FiTrash2 size={14} />
              </button>
            </div>
          ))}

          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-wider text-platinum-400">
              Total
            </span>
            <span className="font-display text-lg font-bold text-white">{formatPrice(total)}</span>
          </div>

          <a
            href={buildWhatsAppLink(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-2 w-full"
          >
            <FiMessageCircle size={15} /> Checkout on WhatsApp
          </a>
        </div>
      )}
    </SideDrawer>
  );
}
