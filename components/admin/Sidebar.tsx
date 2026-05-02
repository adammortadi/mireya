"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Tag, 
  ShoppingCart, 
  LogOut, 
  ExternalLink 
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Tag },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="font-serif text-2xl text-[#c46070]">Mireya</span>
          <span className="bg-[#fde4e4] text-[#c46070] text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                isActive 
                  ? "bg-[#fde4e4] text-[#c46070]" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2 : 1.5} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100 space-y-1">
        <Link 
          href="/" 
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all"
        >
          <ExternalLink className="w-5 h-5" strokeWidth={1.5} />
          View Storefront
        </Link>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all">
          <LogOut className="w-5 h-5" strokeWidth={1.5} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
