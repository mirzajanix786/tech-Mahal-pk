"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { categories } from "@/data/categories";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Categories() {
  return (
    <section id="categories" className="relative py-20 sm:py-28">
      <div className="container-max">
        <SectionHeading
          eyebrow="Shop By Category"
          title="Everything You Need,"
          accent="One Store."
          description="From AirPods to power banks — browse our full range of authentic mobile accessories and gadgets."
        />

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: Math.min(i, 5) * 0.06 }}
            >
              <Link
                href={`/category/${cat.slug}`}
                className="group relative flex aspect-square flex-col items-center justify-end overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center transition-colors duration-300 hover:border-gold-500/30"
              >
                <div className="absolute inset-0">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
                    className="object-cover opacity-70 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-onyx-950 via-onyx-950/40 to-transparent" />
                </div>
                <span className="relative font-display text-xs font-semibold uppercase tracking-wider text-white sm:text-sm">
                  {cat.name}
                </span>
                <span className="relative mt-1 text-[10px] text-platinum-400">
                  {cat.productCount}+ Products
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
