const { createClient } = require('@libsql/client');
const path = require('path');

async function main() {
  const client = createClient({
    url: 'file:' + path.join(process.cwd(), 'dev.db'),
  });

  const res = await client.execute('SELECT id, name, slug FROM Category');
  console.log('Categories in DB:', JSON.stringify(res.rows, null, 2));
}

main().catch(console.error);
