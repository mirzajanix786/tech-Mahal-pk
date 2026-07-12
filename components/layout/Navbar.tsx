"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX, FiHeart, FiShoppingBag } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig, navLinks } from "@/constants/site";
import { useStore } from "@/context/StoreContext";
import CartDrawer from "@/components/product/CartDrawer";
import WishlistDrawer from "@/components/product/WishlistDrawer";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const { cartCount, wishlistCount } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[150] transition-all duration-300 ${scrolled
            ? "bg-onyx-950/80 backdrop-blur-lg border-b border-white/10 py-3"
            : "bg-transparent py-5"
          }`}
      >
        <div className="container-max flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Tech Mahal Logo"
              width={56}
              height={56}
              className="h-10 w-10 rounded-xl object-contain"
              priority
            />
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="font-display text-[15px] font-semibold uppercase tracking-wide text-white">
                {siteConfig.shortName}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-platinum-500">
                Premium Electronics
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium text-platinum-300 transition-colors hover:text-gold-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setWishlistOpen(true)}
              aria-label={`Wishlist, ${wishlistCount} items`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-platinum-300 transition-colors hover:bg-white/5 hover:text-gold-300"
            >
              <FiHeart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[9px] font-bold text-onyx-950">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Cart, ${cartCount} items`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-platinum-300 transition-colors hover:bg-white/5 hover:text-gold-300"
            >
              <FiShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[9px] font-bold text-onyx-950">
                  {cartCount}
                </span>
              )}
            </button>
            <a href="/#featured" className="btn-primary btn-sm hidden sm:inline-flex">
              Shop Now
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full text-white lg:hidden"
            >
              <FiMenu size={20} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[180] flex flex-col bg-onyx-950/98 backdrop-blur-lg lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between px-5 py-5">
              <span className="font-display text-sm font-semibold uppercase tracking-wide text-white">
                {siteConfig.shortName}
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full text-white"
              >
                <FiX size={22} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center gap-7" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-2xl font-semibold uppercase tracking-wide text-white hover:text-gold-300"
                >
                  {link.label}
                </a>
              ))}
              <a href="/#featured" onClick={() => setMobileOpen(false)} className="btn-primary mt-4">
                Shop Now
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <WishlistDrawer open={wishlistOpen} onClose={() => setWishlistOpen(false)} />
    </>
  );
}
