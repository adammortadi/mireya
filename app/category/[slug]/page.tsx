export const dynamic = "force-dynamic";

import { getCatalogCategoryBySlug, getCatalogProductsByCategory } from "@/lib/db/catalog";
import ProductCard from "@/components/storefront/ProductCard";
import { notFound } from "next/navigation";
import Link from "next/link";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const category = await getCatalogCategoryBySlug(resolvedParams.slug);

  if (!category) {
    notFound();
  }

  const products = await getCatalogProductsByCategory(category.id);

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 py-12 md:py-24 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Category Header */}
        <div className="text-center mb-16 md:mb-24">
          <h1 className="font-serif text-4xl md:text-6xl text-[#444] mb-6">{category.name}</h1>
          <p className="text-gray-500 text-[14px] md:text-[16px] max-w-xl mx-auto leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Toolbar / Filters */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-12 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400">
          <div>{products.length} Products</div>
          <Link href="/shop" className="hover:text-[#E07A8A] transition-colors">View all</Link>
        </div>

        {/* Product Grid: 2 per row on mobile, 3 on tablet, 4 on desktop */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12 md:gap-y-16">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
        <div className="text-center py-24 text-gray-500">
          <p>No products found in this category yet.</p>
        </div>
      )}
      </div>
    </div>
  );
}
