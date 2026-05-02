import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/db/mock-data";

interface WishlistStore {
  items: Product[];
  toggleItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  hasItem: (productId: string) => boolean;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (product) => {
        const exists = get().items.some((item) => item.id === product.id);
        set({
          items: exists
            ? get().items.filter((item) => item.id !== product.id)
            : [...get().items, product],
        });
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.id !== productId) });
      },
      hasItem: (productId) => get().items.some((item) => item.id === productId),
    }),
    {
      name: "mireya-wishlist-storage",
    },
  ),
);
