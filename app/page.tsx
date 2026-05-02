export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { getCatalogCategories, getCatalogProducts, getSiteContent } from "@/lib/db/catalog";
import { MIREYA_HERO_IMAGE } from "@/lib/db/mock-data";
import ProductCard from "@/components/storefront/ProductCard";
import Newsletter from "@/components/storefront/Newsletter";



export default async function Home() {
  const [categories, products, content] = await Promise.all([
    getCatalogCategories(),
    getCatalogProducts(),
    getSiteContent(),
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <section className="w-full bg-white px-4 pt-6 pb-0 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="relative w-full overflow-hidden rounded-[28px] bg-[#fde4e4]/20 shadow-sm md:rounded-[34px]">
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[2.5/1]">
              <Image
                src="/hero-banner.png.jpg"
                alt="Mireya banner"
                fill
                priority
                quality={85}
                className="object-cover"
              />
            </div>
          </div>


        </div>
      </section>



      <section className="w-full bg-[#FFFBFB] px-4 pt-24 pb-12 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-[11px] font-bold uppercase tracking-[0.35em] text-[#bbb]">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="group flex flex-col items-center gap-5 text-center"
              >
                <div className="relative w-full overflow-hidden rounded-[28px] bg-[#fde4e4]/10 shadow-sm transition-all duration-500 hover:shadow-md md:rounded-[32px]" style={{ aspectRatio: "1 / 1.1" }}>
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <span className="text-[13px] font-bold uppercase tracking-widest text-[#888] transition-colors group-hover:text-[#e07a8a] md:text-[14px]">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 flex w-full flex-col items-center bg-[#FFFBFB] px-8 py-20 text-center">
        <span className="mb-2 font-handwriting text-[36px]" style={{ color: "#e07a8a" }}>
          Made just for you
        </span>
        <h2 className="mb-4 font-serif text-[20px] text-[#555]">Personalize your pouch</h2>
        <p className="mb-8 max-w-xs text-[13px] leading-relaxed text-[#888]">
          Choose your fabric, add your name in embroidery, and pick your trim. handmade with love in Morocco ♡
        </p>
        <a
          href="https://wa.me/212679956653"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border bg-white px-8 py-3 text-[11px] font-semibold uppercase tracking-widest transition-all"
          style={{ borderColor: "#fde4e4", color: "#c46070" }}
        >
          Start customizing
        </a>
      </section>

      <section className="w-full bg-white py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 flex flex-col items-center">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.35em] text-[#bbb]">
              Follow our journey
            </p>
            <h2 className="font-serif text-[28px] text-[#444]">@mireya.thebrand</h2>
          </div>
          <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row gap-6">
            <a
              href="https://www.instagram.com/mireya.thebrand?igsh=bWZxMGFuNTN5ZGFz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex flex-col items-center justify-center py-12 px-6 rounded-[28px] bg-[#fffcfc] hover:bg-[#fff7f7] transition-colors border border-[#f7e8e8]"
            >
              <span className="font-serif text-[26px] text-[#444] mb-3">Instagram</span>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#c46070]">@mireya.thebrand</span>
            </a>

            <a
              href="https://www.tiktok.com/@mireya.thebrand?_r=1&_t=ZS-961qUNxFRBP"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex flex-col items-center justify-center py-12 px-6 rounded-[28px] bg-[#fafafc] hover:bg-[#f2f2f7] transition-colors border border-[#f0f0f5]"
            >
              <span className="font-serif text-[26px] text-[#444] mb-3">TikTok</span>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#c46070]">@mireya.thebrand</span>
            </a>

            <a
              href="https://wa.me/212679956653"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex flex-col items-center justify-center py-12 px-6 rounded-[28px] bg-[#fff7f7] hover:bg-[#fde4e4] transition-colors border border-[#fde4e4]"
            >
              <span className="font-serif text-[26px] text-[#444] mb-3">WhatsApp</span>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#c46070]">+212 679956653</span>
            </a>
            </div>
          </div>
        </div>
      </section>

      </div>
  );
}
