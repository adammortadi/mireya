"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/storefront/Header";
import Footer from "@/components/storefront/Footer";
import CartDrawer from "@/components/storefront/CartDrawer";
import type { Category } from "@/lib/db/mock-data";

export default function SiteChrome({ children, categories }: { children: React.ReactNode; categories: Category[] }) {
  const pathname = usePathname();
  const isStudio = pathname.startsWith("/mireya-studio") || pathname.startsWith("/admin");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      <CartDrawer />
      <Header categories={categories} />
      <main className="flex-1">{children}</main>
      <Footer categories={categories} />
    </>
  );
}
