import { getCatalogProducts } from "@/lib/db/catalog";
import ProductCard from "@/components/storefront/ProductCard";
import Link from "next/link";

export const metadata = {
  title: "Ready for Delivery | Mireya",
  description: "Browse all handmade pouches and bags by Mireya, made with love in Morocco.",
};

export default async function ShopPage() {
  const products = await getCatalogProducts();

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <div className="pt-20 pb-16 px-6 text-center border-b border-[#f7e8e8]">
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#e07a8a] mb-4">
          The Collection
        </p>
        <h1 className="text-[32px] md:text-[42px] font-serif text-[#444] mb-4 tracking-tight">
          Ready for delivery & New Additions
        </h1>
        <p className="text-[13px] text-[#888] tracking-wide max-w-lg mx-auto leading-relaxed">
          handmade with love in Morocco ♡
        </p>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-12 px-2 text-[#aaa]">
          <p className="text-[12px] tracking-widest uppercase font-semibold">
            {products.length} Products
          </p>
          <Link href="/category/pouches" className="text-[11px] font-bold tracking-[0.25em] uppercase hover:text-[#e07a8a] transition-colors">
            Pouches
          </Link>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12 md:gap-y-16">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <span className="font-handwriting text-[32px] text-[#e07a8a] block mb-2">Coming Soon</span>
            <p className="text-[14px] text-[#bbb]">No products available yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
