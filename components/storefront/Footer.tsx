import Link from "next/link";
import type { Category } from "@/lib/db/mock-data";

export default function Footer({ categories }: { categories: Category[] }) {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-gray-100 py-12">
      <div className="mx-auto max-w-7xl px-4 flex flex-col items-center">
        <span className="font-serif text-[24px] text-[#444] mb-4">Mireya</span>
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">
          © {year} MIREYA. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
