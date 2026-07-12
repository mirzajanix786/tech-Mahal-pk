"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { testimonials } from "@/data/testimonials";
import StarRating from "@/components/ui/StarRating";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  function next() {
    setIndex((i) => (i + 1) % testimonials.length);
  }
  function prev() {
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }

  return (
    <section id="reviews" className="relative py-20 sm:py-28">
      <div className="container-max">
        <SectionHeading
          eyebrow="Recent Happy Customers"
          title="What Our"
          accent="Customers Say."
          align="center"
          className="mx-auto text-center"
        />

        <div className="relative mx-auto mt-12 max-w-2xl">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 font-display text-7xl font-bold text-gold-500/10"
          >
            &ldquo;
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card relative p-8 text-center sm:p-10"
            >
              <div className="flex justify-center">
                <StarRating rating={t.rating} size={16} />
              </div>
              <p className="mt-5 text-balance font-display text-lg font-medium leading-relaxed text-white sm:text-xl">
                &ldquo;{t.review}&rdquo;
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 font-display text-sm font-bold text-onyx-950">
                  {t.name.charAt(0)}
                </span>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-platinum-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous review"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-platinum-300 transition-colors hover:border-gold-500/40 hover:text-gold-300"
            >
              <FiChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-gold-400" : "w-1.5 bg-white/20"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Next review"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-platinum-300 transition-colors hover:border-gold-500/40 hover:text-gold-300"
            >
              <FiChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
