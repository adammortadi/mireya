import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "@/lib/db/mock-data";

type CheckoutItem = {
  productId: string;
  quantity: number;
  price: number;
};

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const items = Array.isArray(data.items) ? data.items : [];

    if (!data.customer?.name || !data.customer?.email || !data.customer?.address || items.length === 0) {
      return NextResponse.json({ error: "Missing checkout information." }, { status: 400 });
    }

    const productIds = items.map((item: { productId: string }) => item.productId);
    let products = await prisma.product.findMany({ where: { id: { in: productIds } } });
    const missingIds = productIds.filter((id: string) => !products.some((product) => product.id === id));

    for (const id of missingIds) {
      const fallback = MOCK_PRODUCTS.find((product) => product.id === id);
      const category = fallback ? MOCK_CATEGORIES.find((item) => item.id === fallback.categoryId) : null;

      if (!fallback || !category) {
        return NextResponse.json({ error: "One or more products are unavailable." }, { status: 400 });
      }

      await prisma.category.upsert({
        where: { slug: category.slug },
        update: {},
        create: {
          id: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description,
          imageUrl: category.imageUrl,
        },
      });
      await prisma.product.upsert({
        where: { slug: fallback.slug },
        update: {},
        create: {
          id: fallback.id,
          name: fallback.name,
          slug: fallback.slug,
          description: fallback.description,
          price: fallback.price,
          stock: fallback.stock,
          images: JSON.stringify(fallback.images),
          categoryId: fallback.categoryId,
          isBestSeller: fallback.isBestSeller || false,
          isPersonalizable: fallback.isPersonalizable || false,
          emoji: fallback.emoji,
          handwrittenTitle: fallback.handwrittenTitle,
          bgColor: fallback.bgColor,
        },
      });
    }

    products = await prisma.product.findMany({ where: { id: { in: productIds } } });
    const productMap = new Map(products.map((product) => [product.id, product]));

    const orderItems: CheckoutItem[] = items.map((item: { productId: string; quantity: number; price: number }) => {
      const product = productMap.get(item.productId);
      const quantity = Math.max(1, Number(item.quantity) || 1);
      return {
        productId: item.productId,
        quantity,
        price: product?.price ?? Number(item.price) ?? 0,
      };
    });

    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = await prisma.order.create({
      data: {
        total,
        customer: JSON.stringify(data.customer),
        items: {
          create: orderItems,
        },
      },
    });

    await Promise.all(orderItems.map((item) =>
      prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      }),
    ));

    return NextResponse.json({ id: order.id });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json({ error: "Failed to create order." }, { status: 500 });
  }
}
