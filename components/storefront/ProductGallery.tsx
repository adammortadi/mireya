"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

// Handles both data: URIs and regular URLs
function GalleryImage({ src, alt, fill, sizes, className, priority }: {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
}) {
  if (!src || src.startsWith("data:")) {
    return (
      <img
        src={src || "/favicon.ico"}
        alt={alt}
        className={className}
        style={fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" } : undefined}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      className={className}
      priority={priority}
    />
  );
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="aspect-[4/5] bg-[#FFF0F5] rounded-[24px] overflow-hidden relative">
        <GalleryImage
          src={images[activeIndex]}
          alt={name}
          fill
          priority
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 gap-4 mt-6">
          {images.map((img, i) => (
            <button 
              key={i} 
              onClick={() => setActiveIndex(i)}
              className={`aspect-square rounded-[18px] overflow-hidden border-2 transition-all p-1.5 bg-[#fde4e4]/10 relative ${
                activeIndex === i ? "border-[#e07a8a]" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <GalleryImage src={img} alt="" fill className="object-contain p-1" sizes="100px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
