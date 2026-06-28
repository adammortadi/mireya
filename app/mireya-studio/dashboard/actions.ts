"use server";

import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import sharp from "sharp";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";

function text(formData: FormData, key: string, maxLength = 1000) {
  const val = String(formData.get(key) || "").trim();
  return val.slice(0, maxLength); // Prevent overflow/buffer attacks
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function storedImageUrl(file: File, folder: "products" | "categories") {
  const input = Buffer.from(await file.arrayBuffer());
  const optimized = await sharp(input)
    .rotate()
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 78 })
    .toBuffer();

  const fileName = `${Date.now()}-${randomUUID()}.webp`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);

  try {
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, fileName), optimized);
    return `/uploads/${folder}/${fileName}`;
  } catch (error) {
    console.error("[ImageUpload]", error);
    return `data:image/webp;base64,${optimized.toString("base64")}`;
  }
}

async function imagesValue(formData: FormData, field = "image") {
  const files = formData.getAll(field).filter((f) => f instanceof File && f.size > 0) as File[];
  if (files.length === 0) return [];

  return Promise.all(files.map((file) => storedImageUrl(file, "products")));
}

async function imageValue(formData: FormData, field = "image") {
  const imageUrl = text(formData, "imageUrl");
  if (imageUrl) return imageUrl;

  const file = formData.get(field);
  if (!(file instanceof File) || file.size === 0) return "";

  return storedImageUrl(file, "categories");
}

function refreshStudio() {
  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/mireya-studio/dashboard");
}

export async function createCategory(formData: FormData) {
  await requireAdmin();
  const name = text(formData, "name");
  if (!name) throw new Error("Le nom de la catégorie est requis.");

  const category = await prisma.category.create({
    data: {
      name,
      slug: text(formData, "slug") || slugify(name),
      description: text(formData, "description"),
      imageUrl: await imageValue(formData),
    },
  });
  refreshStudio();
  return category;
}

export async function updateCategory(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id");
  const name = text(formData, "name");
  if (!id || !name) return;

  const nextImage = await imageValue(formData);
  await prisma.category.update({
    where: { id },
    data: {
      name,
      slug: text(formData, "slug") || slugify(name),
      description: text(formData, "description"),
      ...(nextImage ? { imageUrl: nextImage } : {}),
    },
  });
  refreshStudio();
}

export async function deleteCategory(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id");
  
  // Find all products in this category
  const products = await prisma.product.findMany({ where: { categoryId: id } });
  const productIds = products.map(p => p.id);
  
  if (productIds.length > 0) {
    // Delete order items for these products first
    await prisma.orderItem.deleteMany({ where: { productId: { in: productIds } } });
    // Delete the products
    await prisma.product.deleteMany({ where: { categoryId: id } });
  }

  await prisma.category.delete({ where: { id } });
  refreshStudio();
}

export async function createProduct(formData: FormData) {
  await requireAdmin();
  const name = text(formData, "name", 200);
  const categoryId = text(formData, "categoryId", 100);
  const price = Number(text(formData, "price", 20) || 0);
  const stock = Number(text(formData, "stock", 20) || 0);

  if (!name || isNaN(price) || price < 0 || isNaN(stock) || stock < 0 || !categoryId) {
    throw new Error("Données de produit invalides.");
  }

  const images = await imagesValue(formData);
  
  try {
    await prisma.product.create({
      data: {
        name,
        slug: text(formData, "slug", 200) || slugify(name),
        description: text(formData, "description", 5000),
        price,
        stock,
        categoryId,
        images: JSON.stringify(images),
        handwrittenTitle: text(formData, "handwrittenTitle", 200),
        emoji: text(formData, "emoji", 50),
        bgColor: text(formData, "bgColor", 7) || "#fff7f0",
        isBestSeller: formData.get("isBestSeller") === "on",
        isPersonalizable: formData.get("isPersonalizable") === "on",
      },
    });
  } catch (error) {
    console.error("[CreateProduct]", error);
    throw new Error("Échec de la création du produit.");
  }
  refreshStudio();
}

export async function updateProduct(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id");
  const name = text(formData, "name");
  if (!id || !name) return;

  const current = await prisma.product.findUnique({ where: { id } });
  const images = await imagesValue(formData);
  await prisma.product.update({
    where: { id },
    data: {
      name,
      slug: text(formData, "slug") || slugify(name),
      description: text(formData, "description"),
      price: Number(text(formData, "price") || 0),
      stock: Number(text(formData, "stock") || 0),
      categoryId: text(formData, "categoryId"),
      images: images.length > 0 ? JSON.stringify(images) : current?.images,
      handwrittenTitle: text(formData, "handwrittenTitle"),
      emoji: text(formData, "emoji"),
      bgColor: text(formData, "bgColor") || "#fff7f0",
      isBestSeller: formData.get("isBestSeller") === "on",
      isPersonalizable: formData.get("isPersonalizable") === "on",
    },
  });
  refreshStudio();
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id");
  
  // Remove related OrderItems first to avoid Foreign Key constraint errors
  await prisma.orderItem.deleteMany({ where: { productId: id } });
  
  await prisma.product.delete({ where: { id } });
  refreshStudio();
}

export async function updateOrderStatus(formData: FormData) {
  await requireAdmin();
  await prisma.order.update({
    where: { id: text(formData, "id") },
    data: { status: text(formData, "status") },
  });
  refreshStudio();
}

export async function deleteOrder(formData: FormData) {
  await requireAdmin();
  const id = text(formData, "id");
  
  // Clean up order items first to avoid foreign key constraints
  await prisma.orderItem.deleteMany({ where: { orderId: id } });
  
  // Delete the order
  await prisma.order.delete({ where: { id } });
  refreshStudio();
}

export async function updateSiteContent(formData: FormData) {
  await requireAdmin();
  const entries = ["bannerTitle", "bannerSubtitle", "homeIntro", "announcement"];
  await Promise.all(entries.map((key) =>
    prisma.siteContent.upsert({
      where: { key },
      update: { value: text(formData, key) },
      create: { key, value: text(formData, key) },
    }),
  ));
  refreshStudio();
}
