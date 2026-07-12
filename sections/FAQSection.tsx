"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { faqs } from "@/data/faqs";
import SectionHeading from "@/components/ui/SectionHeading";
import { buildWhatsAppLink } from "@/lib/utils";

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section id="faq" className="relative bg-onyx-900/50 py-20 sm:py-28">
      <div className="container-max grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Got Questions?"
            title="Frequently"
            accent="Asked."
            description="Quick answers to what customers ask us most. Still unsure? Message us directly on WhatsApp."
          />
          <a
            href={buildWhatsAppLink("Hi Tech Mahal PK! I have a question before ordering.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost mt-2 inline-flex"
          >
            Ask on WhatsApp
          </a>
        </div>

        <div className="divide-y divide-white/10">
          {faqs.map((faq) => {
            const open = openId === faq.id;
            return (
              <div key={faq.id}>
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : faq.id)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-[15px] font-semibold uppercase tracking-wide text-white sm:text-base">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 text-gold-400"
                  >
                    <FiChevronDown size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      {/* text-platinum-300 (not a dim muted tone) so answers stay
                          clearly readable against the dark background */}
                      <p className="pb-5 text-[15px] leading-relaxed text-platinum-300">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
