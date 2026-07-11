export const siteConfig = {
  name: "Tech Mahal PK",
  shortName: "Tech Mahal",
  tagline: "Premium Electronics, Delivered Across Pakistan.",
  description:
    "Tech Mahal PK is Pakistan's premium destination for AirPods, smart watches, chargers, cables, power banks and everyday tech essentials — authentic products, unbeatable prices, and instant WhatsApp ordering.",
  url: "https://www.techmahalpk.com",
  whatsappNumber: "923451405336",
  whatsappDisplay: "+92 345 1405336",
  currency: "PKR",
  currencySymbol: "Rs.",
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/#categories" },
  { label: "New Arrivals", href: "/#new-arrivals" },
  { label: "Flash Deals", href: "/#flash-deals" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/#contact" },
];

// Social links are placeholders — the client will provide final handles later.
export const socialLinks = {
  facebook: "#",
  instagram: "#",
  tiktok: "#",
  whatsapp: `https://wa.me/${siteConfig.whatsappNumber}`,
};
