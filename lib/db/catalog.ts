import "server-only";

import { prisma } from "@/lib/db/prisma";
import { unstable_cache } from "next/cache";
import {
  MOCK_CATEGORIES,
  MOCK_PRODUCTS,
  type Category,
  type Product,
} from "@/lib/db/mock-data";

function toProduct(product: {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  images: string;
  isBestSeller: boolean;
  isPersonalizable: boolean;
  createdAt: Date;
  emoji: string | null;
  handwrittenTitle: string | null;
  bgColor: string | null;
}): Product {
  let images: string[] = [];
  try {
    const parsed = JSON.parse(product.images);
    images = Array.isArray(parsed) ? parsed : [];
  } catch {
    images = [];
  }

  return {
    id: product.id,
    categoryId: product.categoryId,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    stock: product.stock,
    images,
    isBestSeller: product.isBestSeller,
    isPersonalizable: product.isPersonalizable,
    createdAt: product.createdAt.toISOString(),
    emoji: product.emoji || undefined,
    handwrittenTitle: product.handwrittenTitle || undefined,
    bgColor: product.bgColor || undefined,
  };
}

function toCategory(category: {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
}): Category {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description || "",
    imageUrl: category.imageUrl || "",
  };
}

export const getCatalogProducts = unstable_cache(
  async () => {
    const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
    return products.map(toProduct);
  },
  ["products"],
  { tags: ["products"], revalidate: 3600 }
);

export const getCatalogCategories = unstable_cache(
  async () => {
    const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
    return categories.map(toCategory);
  },
  ["categories"],
  { tags: ["categories"], revalidate: 3600 }
);

export async function getCatalogProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({ where: { slug } });
  return product ? toProduct(product) : null;
}

export async function getCatalogCategoryBySlug(slug: string) {
  const category = await prisma.category.findUnique({ where: { slug } });
  return category ? toCategory(category) : null;
}

export async function getCatalogProductsByCategory(categoryId: string) {
  const products = await prisma.product.findMany({
    where: { categoryId },
    orderBy: { createdAt: "desc" },
  });

  return products.map(toProduct);
}

export const getSiteContent = unstable_cache(
  async () => {
    const content = await prisma.siteContent.findMany();
    return Object.fromEntries(content.map((item) => [item.key, item.value]));
  },
  ["site-content"],
  { tags: ["site-content"], revalidate: 3600 }
);
