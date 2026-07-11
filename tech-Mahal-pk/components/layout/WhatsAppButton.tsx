"use client";

import { FaWhatsapp } from "react-icons/fa";
import { buildWhatsAppLink } from "@/lib/utils";

export default function WhatsAppButton() {
  return (
    <a
      href={buildWhatsAppLink("Hi Tech Mahal PK! I'd like to know more about your products.")}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-5 right-5 z-[160] flex items-center gap-2 rounded-full bg-[#25D366] py-3 pl-3 pr-3 text-onyx-950 shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] transition-all duration-300 hover:pr-5 sm:bottom-7 sm:right-7"
      aria-label="Order on WhatsApp"
    >
      <FaWhatsapp size={22} />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-xs font-bold uppercase tracking-wide transition-all duration-300 group-hover:max-w-[140px] sm:inline-block">
        Order on WhatsApp
      </span>
    </a>
  );
}
