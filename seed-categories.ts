import { prisma } from './lib/db/prisma';

async function main() {
  for (let i = 1; i <= 6; i++) {
    await prisma.category.create({
      data: {
        name: `Category ${i}`,
        slug: `category-${i}`,
        description: `Description for Category ${i}`,
        imageUrl: `/uploads/categories/cat${i}.jpeg`,
      },
    });
    console.log(`Created Category ${i}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
