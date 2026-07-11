"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-onyx-950"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-3">
            <motion.span
              className="font-display text-3xl font-bold tracking-wide text-white"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              TECH MAHAL <span className="text-gold-400">PK</span>
            </motion.span>
            <div className="h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
              <motion.span
                className="block h-full w-1/2 rounded-full bg-gradient-to-r from-gold-300 to-gold-500"
                animate={{ x: ["-100%", "260%"] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
