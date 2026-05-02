import { prisma } from './lib/db/prisma';

async function main() {
  const keys = ['bannerTitle'];
  
  for (const key of keys) {
    const value = 'Welcome to your favorite brand';
    await prisma.siteContent.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
    console.log(`Updated ${key} to: ${value}`);
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
