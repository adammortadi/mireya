"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect } from "react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: "/shop", label: "Shop All" },
  { href: "/category/pouches", label: "Pouches" },
  { href: "/category/bags", label: "Bags" },
  { href: "/category/accessories", label: "Accessories" },
  { href: "/category/personalized", label: "Personalized" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[80]"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[300px] bg-white z-[90] shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <span className="font-serif text-xl text-gray-900">Menu</span>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-black transition-colors">
            <X className="w-5 h-5" strokeWidth={1} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto py-8">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block px-8 py-4 text-sm font-medium tracking-wide text-gray-700 hover:text-[#E07A8A] hover:bg-[#FFF0F5] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-8 border-t border-gray-100">
          <p className="text-xs text-gray-400 tracking-wider">handmade with love in Morocco ♡</p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Instagram</a>
            <a href="#" className="text-xs text-gray-500 hover:text-black transition-colors">TikTok</a>
          </div>
        </div>
      </div>
    </>
  );
}
