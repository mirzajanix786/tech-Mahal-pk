"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowRight, FiGrid } from "react-icons/fi";
import { siteConfig } from "@/constants/site";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1585298723682-7115561c51b7?q=80&w=2400&auto=format&fit=crop";

export default function Hero() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {!imgFailed ? (
          <Image
            src={HERO_IMAGE}
            alt="Premium wireless earbuds and electronics accessories in dramatic lighting"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-onyx-800 via-onyx-950 to-black" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-onyx-950/95 via-onyx-950/75 to-onyx-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx-950 via-transparent to-onyx-950/60" />
      </div>

      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-10%] z-0 h-[520px] w-[520px] rounded-full bg-gold-500/15 blur-[110px]"
      />

      {/* Content */}
      <div className="container-max relative z-10 py-28 sm:py-32">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="eyebrow"
          >
            Pakistan&apos;s Trusted Tech Destination
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="font-display text-[2.3rem] font-semibold uppercase leading-[1.08] tracking-wide text-white sm:text-5xl lg:text-[3.6rem]"
          >
            Premium Tech.
            <br />
            <span className="bg-gradient-to-r from-platinum-200 to-gold-300 bg-clip-text text-transparent">
              Honest Prices.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mt-5 max-w-md text-[15px] leading-relaxed text-platinum-300 sm:text-base"
          >
            {siteConfig.name} brings you authentic AirPods, smart watches, chargers
            and everyday tech essentials — quality-checked, competitively priced,
            and just a WhatsApp message away.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <a href="/#featured" className="btn-primary">
              Shop Now <FiArrowRight size={16} />
            </a>
            <a href="/#categories" className="btn-ghost">
              <FiGrid size={15} /> Browse Categories
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3"
          >
            {[
              { n: "200+", l: "Happy Customers" },
              { n: "165+", l: "Products In Stock" },
              { n: "9", l: "Categories" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-display text-xl font-bold text-white sm:text-2xl">{s.n}</p>
                <p className="text-[11px] uppercase tracking-wider text-platinum-400">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
