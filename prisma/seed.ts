import { createClient } from '@libsql/client'
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '../lib/db/mock-data'

const client = createClient({
  url: "libsql://mireya-adammortadi.aws-eu-west-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3Nzc3NTk5OTIsImlkIjoiMDE5ZGVhYmQtMWQwMS03ZTk5LTlhODgtNjIyMDVmMjgxNWM4IiwicmlkIjoiYmIwMzRjMTUtZjRmZi00Mjg3LWEzZGYtM2E2YmJlZThjZjkyIn0.iwfEtPwhiqfQJrANTYJrjl1jhLcob2GFGEY5wxWsfvfo-yS0_zL79wkOiJvr7RLDerQYrWpeeGwab9Jqho4DBw",
});

async function main() {
  console.log('Start seeding directly to Turso...')

  // Ensure all tables exist
  await client.execute("CREATE TABLE IF NOT EXISTS User (id TEXT PRIMARY KEY, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL, name TEXT, role TEXT NOT NULL DEFAULT 'CUSTOMER', createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)");
  await client.execute("CREATE TABLE IF NOT EXISTS Category (id TEXT PRIMARY KEY, name TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, description TEXT, imageUrl TEXT)");
  await client.execute("CREATE TABLE IF NOT EXISTS Product (id TEXT PRIMARY KEY, name TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, description TEXT NOT NULL, price REAL NOT NULL, stock INTEGER NOT NULL DEFAULT 0, isBestSeller INTEGER NOT NULL DEFAULT 0, isPersonalizable INTEGER NOT NULL DEFAULT 0, emoji TEXT, handwrittenTitle TEXT, bgColor TEXT, images TEXT NOT NULL, categoryId TEXT NOT NULL, createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)");
  await client.execute("CREATE TABLE IF NOT EXISTS [Order] (id TEXT PRIMARY KEY, userId TEXT, status TEXT NOT NULL DEFAULT 'PENDING', total REAL NOT NULL, customer TEXT NOT NULL, createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)");
  await client.execute("CREATE TABLE IF NOT EXISTS OrderItem (id TEXT PRIMARY KEY, orderId TEXT NOT NULL, productId TEXT NOT NULL, quantity INTEGER NOT NULL, price REAL NOT NULL)");
  await client.execute("CREATE TABLE IF NOT EXISTS SiteContent (id TEXT PRIMARY KEY, [key] TEXT UNIQUE NOT NULL, value TEXT NOT NULL, updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)");

  for (const c of MOCK_CATEGORIES) {
    await client.execute({
      sql: `INSERT OR REPLACE INTO Category (id, name, slug, description, imageUrl) VALUES (?, ?, ?, ?, ?)`,
      args: [c.id, c.name, c.slug, c.description || null, c.imageUrl || null]
    });
    console.log(`Created/updated category: ${c.name}`)
  }

  for (const p of MOCK_PRODUCTS) {
    await client.execute({
      sql: `INSERT INTO Product (id, name, slug, description, price, stock, isBestSeller, isPersonalizable, emoji, handwrittenTitle, bgColor, images, categoryId, createdAt, updatedAt) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            ON CONFLICT(slug) DO UPDATE SET name=excluded.name, description=excluded.description, price=excluded.price`,
      args: [
        p.id, p.name, p.slug, p.description, p.price, p.stock || 0, 
        p.isBestSeller ? 1 : 0, p.isPersonalizable ? 1 : 0, 
        p.emoji || null, p.handwrittenTitle || null, p.bgColor || null, 
        JSON.stringify(p.images), p.categoryId
      ]
    });
    console.log(`Created/updated product: ${p.name}`)
  }

  console.log('Seeding finished successfully!')
}

main().catch(console.error);
