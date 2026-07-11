import { siteConfig } from "@/constants/site";
import { Product } from "@/types/product";

/** Format a PKR price with thousands separators, e.g. 2499 -> "Rs. 2,499" */
export function formatPrice(value: number): string {
  return `${siteConfig.currencySymbol} ${value.toLocaleString("en-PK")}`;
}

/** Percentage discount between oldPrice and price, rounded to nearest whole number. */
export function getDiscountPercent(product: Pick<Product, "price" | "oldPrice">): number | null {
  if (!product.oldPrice || product.oldPrice <= product.price) return null;
  return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
}

/** Build a prefilled WhatsApp deep link for a given message. */
export function buildWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}

/** Standard "order this product" WhatsApp message + link. */
export function buildProductWhatsAppLink(product: Product): string {
  const message = `Hi Tech Mahal PK! I'd like to order:\n\n${product.title}\nPrice: ${formatPrice(
    product.price
  )}\n\nLink: ${siteConfig.url}/products/${product.slug}`;
  return buildWhatsAppLink(message);
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function stockLabel(stock: number): { label: string; tone: "in" | "low" | "out" } {
  if (stock <= 0) return { label: "Out of Stock", tone: "out" };
  if (stock <= 5) return { label: `Only ${stock} left`, tone: "low" };
  return { label: "In Stock", tone: "in" };
}

/**
 * Category-aware generic feature bullets, used on product detail pages when
 * a product doesn't carry explicit `features` in data/products.ts. Kept
 * honest and generic (no fabricated model-specific claims).
 */
const CATEGORY_FEATURES: Record<string, string[]> = {
  airpods: [
    "Bluetooth wireless connectivity with quick auto-pairing",
    "Touch/tap controls for playback and calls",
    "Compact charging case for on-the-go top-ups",
  ],
  headphones: [
    "Over-ear cushioned design for extended comfort",
    "Wireless Bluetooth connectivity",
    "Built-in microphone for hands-free calls",
  ],
  "hands-free": [
    "Lightweight in-ear design",
    "Inline microphone and call controls",
    "Tangle-resistant cable",
  ],
  "smart-watches": [
    "Full touchscreen display with multiple watch faces",
    "Call and notification alerts on your wrist",
    "Heart rate and activity tracking",
  ],
  chargers: [
    "Fast-charging output for compatible devices",
    "Built-in protection against overheating and overcurrent",
    "Compact, travel-friendly design",
  ],
  cables: [
    "Reinforced connectors for daily durability",
    "Supports fast data sync and charging speeds",
    "Available length suited for desk or travel use",
  ],
  "power-banks": [
    "High-capacity cell for multiple full charges",
    "Fast-charging input and output ports",
    "Compact form factor for everyday carry",
  ],
  "mobile-covers": [
    "Precise cutouts for ports, camera and buttons",
    "Shock-absorbing edges for drop protection",
    "Slim profile that preserves wireless charging",
  ],
  gadgets: [
    "Plug-and-play setup, no complex configuration",
    "Compact design for desk or travel use",
    "Reliable everyday performance",
  ],
};

export function getProductFeatures(product: Product): string[] {
  if (product.features && product.features.length > 0) return product.features;
  return CATEGORY_FEATURES[product.category] ?? [
    "Genuine product, quality-checked before dispatch",
    "Backed by Tech Mahal PK customer support",
  ];
}

/**
 * Generic spec-sheet rows, used when a product doesn't carry explicit
 * `specifications`. Only surfaces facts we actually know (brand, category,
 * rating, availability) plus standard marketplace terms — no invented
 * technical figures.
 */
export function getProductSpecs(product: Product): { label: string; value: string }[] {
  if (product.specifications && product.specifications.length > 0) {
    return product.specifications;
  }
  const stock = stockLabel(product.stock);
  return [
    { label: "Brand", value: product.brand },
    { label: "Category", value: product.category.replace("-", " ") },
    { label: "Availability", value: stock.label },
    { label: "Warranty", value: "7-Day Replacement Warranty" },
    { label: "What's in the Box", value: `1x ${product.title}` },
  ];
}
