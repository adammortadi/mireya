"use client";

import { useCart } from "@/lib/store/useCart";
import { Product } from "@/lib/db/mock-data";
import { useRouter } from "next/navigation";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem, closeCart } = useCart();
  const router = useRouter();
  
  return (
    <div className="mb-8 space-y-3">
      <button 
        onClick={() => addItem(product)}
        className="w-full bg-[#fde4e4] text-[#c46070] py-4 text-[12px] font-bold tracking-[0.25em] uppercase hover:bg-[#f9c6cb] shadow-sm transition-all rounded-full active:scale-[0.98]"
      >
        Add to Cart
      </button>
      <button
        onClick={() => {
          addItem(product);
          closeCart();
          router.push("/checkout");
        }}
        className="w-full bg-black text-white py-4 text-[12px] font-bold tracking-[0.25em] uppercase hover:opacity-90 shadow-sm transition-all rounded-full active:scale-[0.98]"
      >
        Buy Now
      </button>
    </div>
  );
}
