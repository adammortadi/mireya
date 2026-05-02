import { prisma } from './lib/db/prisma';

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  const categories = await prisma.category.findMany();
  for (const cat of categories) {
    const newSlug = slugify(cat.slug || cat.name);
    console.log(`Updating category ${cat.id}: ${cat.slug} -> ${newSlug}`);
    await prisma.category.update({
      where: { id: cat.id },
      data: { slug: newSlug }
    });
  }
  
  const products = await prisma.product.findMany();
  for (const prod of products) {
    const newSlug = slugify(prod.slug || prod.name);
    console.log(`Updating product ${prod.id}: ${prod.slug} -> ${newSlug}`);
    await prisma.product.update({
      where: { id: prod.id },
      data: { slug: newSlug }
    });
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
