import { prisma } from "@/lib/db/prisma";
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "@/lib/db/mock-data";
import { readAdminSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await readAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    console.log('Start seeding via API...');

    for (const c of MOCK_CATEGORIES) {
      await prisma.category.upsert({
        where: { slug: c.slug },
        update: {
          name: c.name,
          description: c.description,
          imageUrl: c.imageUrl,
        },
        create: {
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description,
          imageUrl: c.imageUrl,
        },
      });
    }

    for (const p of MOCK_PRODUCTS) {
      await prisma.product.upsert({
        where: { slug: p.slug },
        update: {
          name: p.name,
          description: p.description,
          price: p.price,
          stock: p.stock,
          isBestSeller: p.isBestSeller || false,
          isPersonalizable: p.isPersonalizable || false,
          emoji: p.emoji,
          handwrittenTitle: p.handwrittenTitle,
          bgColor: p.bgColor,
          images: JSON.stringify(p.images),
          categoryId: p.categoryId,
        },
        create: {
          id: p.id,
          name: p.name,
          slug: p.slug,
          description: p.description,
          price: p.price,
          stock: p.stock,
          isBestSeller: p.isBestSeller || false,
          isPersonalizable: p.isPersonalizable || false,
          emoji: p.emoji,
          handwrittenTitle: p.handwrittenTitle,
          bgColor: p.bgColor,
          images: JSON.stringify(p.images),
          categoryId: p.categoryId,
        },
      });
    }

    return NextResponse.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error("Seed Error:", error);
    return NextResponse.json({ error: "Failed to seed database", details: error }, { status: 500 });
  }
}
