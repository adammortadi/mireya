import { getCatalogCategoryBySlug } from './lib/db/catalog';
import { prisma } from './lib/db/prisma';

async function main() {
  const slug = 'category-1';
  console.log(`Checking slug: ${slug}`);
  const category = await getCatalogCategoryBySlug(slug);
  console.log('Result:', JSON.stringify(category, null, 2));
  
  const all = await prisma.category.findMany();
  console.log('All categories:', JSON.stringify(all, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
