"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import ProductCard from "@/components/storefront/ProductCard";
import { useWishlist } from "@/lib/store/useWishlist";

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();

  return (
    <div className="min-h-screen bg-white px-4 py-16 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#e07a8a]">
            Saved pieces
          </p>
          <h1 className="font-serif text-[32px] text-[#444] md:text-[42px]">Wishlist</h1>
        </div>

        {items.length > 0 ? (
          <>
            <div className="mb-8 flex justify-end">
              <button
                onClick={() => items.forEach((item) => removeItem(item.id))}
                className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#bbb] transition-colors hover:text-[#e07a8a]"
              >
                <Trash2 className="h-4 w-4" />
                Clear
              </button>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#fde4e4]/40">
              <Heart className="h-6 w-6 text-[#e07a8a]" strokeWidth={1.5} />
            </div>
            <p className="mb-2 font-serif text-[22px] text-[#555]">No saved pieces yet</p>
            <p className="mb-8 max-w-sm text-[13px] leading-relaxed text-[#aaa]">
              Tap the heart on any product to keep it here.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-[#fde4e4] px-8 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#c46070] transition hover:bg-[#f9c6cb]"
            >
              <ShoppingBag className="h-4 w-4" />
              Shop
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
