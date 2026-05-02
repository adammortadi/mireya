"use client";

import Link from "next/link";
import { Search, ShoppingBag, Menu, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCart } from "@/lib/store/useCart";
import { useEffect, useState } from "react";
import type { Product, Category } from "@/lib/db/mock-data";

const announcement = "handmade with love in Morocco ♡";

export default function Header({ categories }: { categories: Category[] }) {
  const { toggleCart, items } = useCart();
  const [mounted, setMounted] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);



  useEffect(() => {
    if (searchOpen && products.length === 0) {
      fetch("/api/products")
        .then((response) => response.ok ? response.json() : [])
        .then((data) => setProducts(Array.isArray(data) ? data : []))
        .catch(() => setProducts([]));
    }
  }, [searchOpen, products.length]);

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const filteredProducts = searchQuery.trim() === "" 
    ? [] 
    : products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4);

  return (
    <>
      {/* Mobile Nav Sidebar */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-[90]">
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-white flex flex-col pt-8 pb-12 shadow-2xl">
            <div className="flex items-center justify-between px-6 mb-10">
              <span className="font-serif text-[20px] text-[#c46070]">Mireya</span>
              <button onClick={() => setMobileNavOpen(false)} className="p-2 text-gray-400">
                <X className="w-5 h-5" strokeWidth={1} />
              </button>
            </div>
            <nav className="flex flex-col px-6 gap-2">
              <Link
                href="/shop"
                onClick={() => setMobileNavOpen(false)}
                className="py-3 text-[14px] font-bold uppercase tracking-[0.2em] text-[#c46070] border-b border-gray-50 hover:text-[#E07A8A] transition-colors"
              >
                Shop All
              </Link>
              <div className="py-6 flex flex-col gap-6">
                <a href="https://www.instagram.com/mireya.thebrand?igsh=bWZxMGFuNTN5ZGFz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500">
                  <img src="/instagram.png" alt="" className="w-5 h-5 object-contain" />
                  Instagram
                </a>
                <a href="https://www.tiktok.com/@mireya.thebrand?_r=1&_t=ZS-961qUNxFRBP" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500">
                  <img src="/tiktok.png" alt="" className="w-5 h-5 object-contain" />
                  TikTok
                </a>
                <a href="https://wa.me/212679956653" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500">
                  <img src="/whatsapp.png" alt="" className="w-5 h-5 object-contain" />
                  WhatsApp
                </a>
              </div>
              <Link
                href="/wishlist"
                onClick={() => setMobileNavOpen(false)}
                className="py-3 text-[14px] font-normal text-gray-400 border-t border-gray-50 hover:text-[#E07A8A] transition-colors tracking-wide"
              >
                Wishlist
              </Link>
            </nav>
            <div className="mt-auto px-6">
              <p className="text-[11px] text-gray-400 tracking-wider">handmade with love in Morocco ♡</p>
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-white/98 backdrop-blur-md z-[80] flex flex-col items-center pt-24 px-6 overflow-y-auto">
          <button
            onClick={() => setSearchOpen(false)}
            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" strokeWidth={1} />
          </button>
          
          <div className="w-full max-w-lg flex flex-col items-center">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#bbb] mb-10">What are you looking for?</p>
            
            <div className="w-full border-b border-[#eee] flex items-center gap-4 px-2 mb-12">
              <Search className="w-5 h-5 text-[#ccc] flex-shrink-0" strokeWidth={1.2} />
              <input
                autoFocus
                type="text"
                placeholder="Search pouches, bags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 py-4 bg-transparent text-[22px] font-serif focus:outline-none placeholder:text-[#eee] text-[#444]"
              />
            </div>

            {/* Results */}
            {searchQuery.trim() !== "" && (
              <div className="w-full grid grid-cols-1 gap-6 pb-20">
                {filteredProducts.length > 0 ? (
                  <>
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#ddd] mb-2">Results</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {filteredProducts.map((p) => (
                        <Link 
                          key={p.id} 
                          href={`/product/${p.slug}`}
                          onClick={() => setSearchOpen(false)}
                          className="group flex flex-col gap-3"
                        >
                          <div className="aspect-square rounded-[18px] bg-[#fde4e4]/30 overflow-hidden">
                            <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-110" />
                          </div>
                          <p className="text-[12px] text-[#888] text-center truncate">{p.name}</p>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-[14px] text-[#ccc] text-center italic mt-10">No products found for "{searchQuery}"</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="sticky top-0 z-50 w-full flex flex-col bg-white shadow-[0_1px_0_0_#f7e8e8] will-change-transform">
        {/* ─── Announcement Bar ─── */}
        <div
          className="w-full h-11 flex items-center justify-center px-3 flex-shrink-0"
          style={{ backgroundColor: '#fde4e4' }}
        >
          <p className="text-[11.5px] font-normal tracking-wide text-[#c9a0a5] text-center px-2">
            {announcement}
          </p>
        </div>

        {/* ─── Main Header ─── */}
        <header className="w-full bg-white">
          <div className="flex items-center justify-between px-4 h-[72px]">

            {/* Left: Hamburger (Mobile) + Nav Links (Desktop) */}
            <div className="flex items-center flex-1">
              <button
                onClick={() => setMobileNavOpen(true)}
                className="p-2 text-gray-400 hover:text-gray-700 transition-colors -ml-1 md:hidden"
                aria-label="Open menu"
              >
                <Menu className="w-[22px] h-[22px]" strokeWidth={1.2} />
              </button>

              <nav className="hidden md:flex items-center gap-8 ml-2">
                <a href="https://www.instagram.com/mireya.thebrand?igsh=bWZxMGFuNTN5ZGFz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500 hover:text-[#E07A8A] transition-colors">
                  <img src="/instagram.png" alt="" className="w-4 h-4 object-contain" />
                  Instagram
                </a>
                <a href="https://www.tiktok.com/@mireya.thebrand?_r=1&_t=ZS-961qUNxFRBP" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500 hover:text-[#E07A8A] transition-colors">
                  <img src="/tiktok.png" alt="" className="w-4 h-4 object-contain" />
                  TikTok
                </a>
                <a href="https://wa.me/212679956653" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500 hover:text-[#E07A8A] transition-colors">
                  <img src="/whatsapp.png" alt="" className="w-4 h-4 object-contain" />
                  WhatsApp
                </a>
              </nav>
            </div>

            {/* Center: gingham logo */}
            <Link
              href="/"
              className="relative flex items-center justify-center w-[80px] h-[80px] rounded-full overflow-hidden"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(255,182,193,0.55) 50%, rgba(255,240,245,0.55) 50%), linear-gradient(rgba(255,182,193,0.55) 50%, rgba(255,240,245,0.55) 50%)",
                backgroundSize: "22px 22px",
              }}
            >
              {/* White frosted label strip */}
              <div
                className="absolute inset-x-0 flex items-center justify-center"
                style={{
                  height: '26px',
                  background: 'rgba(255,255,255,0.62)',
                  backdropFilter: 'blur(2px)',
                }}
              >
                <span
                  className="font-serif tracking-widest"
                  style={{ fontSize: '16px', color: '#c46070', letterSpacing: '0.12em' }}
                >
                  Mireya
                </span>
              </div>
            </Link>

            {/* Right: search + cart */}
            <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end -mr-1">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-400 hover:text-gray-700 transition-colors"
                aria-label="Search"
              >
                <Search className="w-[21px] h-[21px]" strokeWidth={1.2} />
              </button>

              <div className="relative">
                <button
                  onClick={toggleCart}
                  className="p-2 text-gray-400 hover:text-gray-700 transition-colors"
                  aria-label="Cart"
                >
                  <ShoppingBag className="w-[21px] h-[21px]" strokeWidth={1.2} />
                </button>
                {mounted && itemCount > 0 && (
                  <div
                    className="absolute -bottom-0.5 -right-0.5 w-[15px] h-[15px] rounded-full flex items-center justify-center pointer-events-none"
                    style={{
                      backgroundColor: '#fde4e4',
                      fontSize: '9px',
                      fontWeight: 600,
                      color: '#c46070',
                    }}
                  >
                    {itemCount}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
