const fs = require('fs');
const path = require('path');
const db = require('./connection');

async function runSeeders() {
  const seedersDir = path.join(__dirname, 'seeders');
  const files = fs.readdirSync(seedersDir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const filePath = path.join(seedersDir, file);
    const sql = fs.readFileSync(filePath, 'utf8');
    if (sql.trim()) {
      try {
        await db.query(sql);
        console.log(`Seeder executado: ${file}`);
      } catch (err) {
        console.error(`Erro ao executar ${file}:`, err.message);
      }
    }
  }
  await db.end();
  console.log('Todos os seeders executados.');
}

runSeeders();