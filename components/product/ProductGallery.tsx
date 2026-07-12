"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const safeImages = images.length > 0 ? images : [];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-platinum-200 via-white to-platinum-300">
        {safeImages[active] && (
          <Image
            key={safeImages[active]}
            src={safeImages[active]}
            alt={title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-8 sm:p-10"
          />
        )}
      </div>

      {safeImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {safeImages.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1} of ${safeImages.length}`}
              aria-current={active === i}
              className={`relative aspect-square w-16 flex-shrink-0 overflow-hidden rounded-xl border bg-white/[0.03] transition-colors sm:w-20 ${
                active === i ? "border-gold-400" : "border-white/10 hover:border-white/25"
              }`}
            >
              <Image
                src={img}
                alt=""
                aria-hidden
                fill
                sizes="80px"
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
