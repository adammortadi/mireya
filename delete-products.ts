import { prisma } from './lib/db/prisma';

async function main() {
  // First, delete all order items to avoid foreign key constraints
  await prisma.orderItem.deleteMany({});
  
  // Now, delete all products
  const deleted = await prisma.product.deleteMany({});
  console.log(`Deleted ${deleted.count} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
