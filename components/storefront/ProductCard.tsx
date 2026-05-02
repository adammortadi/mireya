import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/db/mock-data";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group flex flex-col items-center text-center gap-0">
      <div
        className="relative w-full aspect-square rounded-[22px] overflow-hidden flex items-center justify-center p-4 transition-transform duration-500 ease-out group-hover:scale-[1.015]"
        style={{ backgroundColor: product.bgColor || "#FFF0F5" }}
      >
        <Image
          src={product.images[0] || "/favicon.ico"}
          alt={product.name}
          fill
          className="h-full w-full object-contain drop-shadow-sm transition-transform duration-700 group-hover:scale-105 p-6"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
      </div>

      <div className="pt-3 pb-2 flex flex-col items-center gap-0.5 w-full">
        <p className="text-[11px] md:text-[13px] font-normal text-[#666] tracking-wide leading-snug truncate w-full px-1">
          {product.name}
        </p>
        <p className="text-[10px] md:text-[11px] font-bold text-[#aaa] tracking-[0.1em] uppercase">
          Dh {product.price.toFixed(2)} MAD
        </p>
      </div>
    </Link>
  );
}
