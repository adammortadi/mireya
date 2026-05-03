const { createClient } = require('@libsql/client');
const client = createClient({
  url: 'libsql://mireya-adammortadi.aws-eu-west-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3Nzc3NTk5OTIsImlkIjoiMDE5ZGVhYmQtMWQwMS03ZTk5LTlhODgtNjIyMDVmMjgxNWM4IiwicmlkIjoiYmIwMzRjMTUtZjRmZi00Mjg3LWEzZGYtM2E2YmJlZThjZjkyIn0.iwfEtPwhiqfQJrANTYJrjl1jhLcob2GFGEY5wxWsfvfo-yS0_zL79wkOiJvr7RLDerQYrWpeeGwab9Jqho4DBw'
});
async function run() {
  await client.execute({
    sql: 'INSERT INTO User (id, email, password, name, role) VALUES (?, ?, ?, ?, ?) ON CONFLICT(email) DO UPDATE SET password=excluded.password',
    args: ['admin_1', 'pouches', '$2b$12$Yj5kA.hwGX8/uUVHe7bkBeAcLT0cltpcnVhRJVez0s9w.h8xUAdju', 'Mireya Admin', 'ADMIN']
  });
  console.log('Admin user added to Turso successfully!');
}
run();
