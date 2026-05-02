import { prisma } from "@/lib/db/prisma";
import { readAdminSession } from "@/lib/auth";
import { MOCK_PRODUCTS } from "@/lib/db/mock-data";
import { NextResponse } from "next/server";

async function requireApiAdmin() {
  const session = await readAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    // Parse images JSON
    const parsedProducts = products.map(p => ({
      ...p,
      images: JSON.parse(p.images)
    }));

    return NextResponse.json(parsedProducts.length ? parsedProducts : MOCK_PRODUCTS);
  } catch (error) {
    console.error("GET Products Error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const unauthorized = await requireApiAdmin();
  if (unauthorized) return unauthorized;

  try {
    const data = await request.json();
    
    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug || data.name.toLowerCase().replace(/ /g, '-'),
        description: data.description,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
        isBestSeller: data.isBestSeller || false,
        isPersonalizable: data.isPersonalizable || false,
        emoji: data.emoji,
        handwrittenTitle: data.handwrittenTitle,
        bgColor: data.bgColor,
        images: JSON.stringify(data.images || []),
        categoryId: data.categoryId,
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("POST Product Error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
