export const dynamic = "force-dynamic";

import { getCatalogProductBySlug } from "@/lib/db/catalog";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCartButton from "@/components/storefront/AddToCartButton";
import ProductGallery from "@/components/storefront/ProductGallery";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = await getCatalogProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 py-12 md:py-24 min-h-screen">
      <div className="max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="text-xs tracking-widest uppercase text-gray-400 mb-12 flex gap-2">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-black">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {/* Left: Image Gallery */}
        <ProductGallery images={product.images} name={product.name} />

        {/* Right: Product Details */}
        <div className="flex flex-col pt-0 md:pt-8">
          {product.isBestSeller && (
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#E07A8A] mb-3">
              ★ Best Seller
            </span>
          )}
          <h1 className="font-serif text-4xl mb-3">{product.name}</h1>
          <p className="text-xl text-gray-900 mb-8 font-light">
            Dh {product.price.toFixed(2)} MAD
          </p>

          <div className="prose prose-sm text-gray-500 mb-10 leading-relaxed">
            <p>{product.description}</p>
          </div>

          {/* Customization Options (if applicable) */}
          {product.isPersonalizable && (
            <div className="mb-8">
              <label className="block text-xs font-semibold tracking-widest uppercase mb-4 text-gray-700">
                Personalization (Optional)
              </label>
              <input
                type="text"
                placeholder="Enter a name or initial"
                className="w-full border-b border-gray-300 bg-transparent px-0 py-3 text-sm focus:outline-none focus:border-black transition-colors"
              />
              <p className="text-xs text-gray-400 mt-2">
                Add your name or initials for free embroidery personalization.
              </p>
            </div>
          )}

          {/* Add to Cart Button */}
          <AddToCartButton product={product} />

          {/* Extra Details */}
          <div className="border-t border-gray-100 pt-6 mt-2 space-y-0 text-sm text-gray-500">
            <details className="group cursor-pointer border-b border-gray-100 py-4">
              <summary className="font-medium text-gray-900 uppercase tracking-wider text-xs list-none flex justify-between items-center">
                Shipping Details
                <span className="text-gray-400 group-open:rotate-180 transition-transform duration-200 text-base">+</span>
              </summary>
              <p className="pt-4 pb-2 leading-relaxed text-gray-500 text-sm">
                Handmade in Morocco. Custom orders are shipped within 2 weeks depending on fabric availability.
                Shipping available all over Morocco.
              </p>
            </details>
            <details className="group cursor-pointer border-b border-gray-100 py-4">
              <summary className="font-medium text-gray-900 uppercase tracking-wider text-xs list-none flex justify-between items-center">
                Material &amp; Care
                <span className="text-gray-400 group-open:rotate-180 transition-transform duration-200 text-base">+</span>
              </summary>
              <p className="pt-4 pb-2 leading-relaxed text-gray-500 text-sm">
                Crafted with high-quality fabrics. Spot clean only with a damp cloth and mild soap. Do not machine wash.
              </p>
            </details>
            <details className="group cursor-pointer py-4">
              <summary className="font-medium text-gray-900 uppercase tracking-wider text-xs list-none flex justify-between items-center">
                Returns &amp; Exchanges
                <span className="text-gray-400 group-open:rotate-180 transition-transform duration-200 text-base">+</span>
              </summary>
              <p className="pt-4 pb-2 leading-relaxed text-gray-500 text-sm">
                Due to the handmade and personalized nature of our products, we do not accept returns or exchanges unless the item arrives damaged.
              </p>
            </details>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
