const mysql = require('mysql2/promise');
const fs = require('fs/promises');
const path = require('path');
require('dotenv').config();

const scriptsRoot = path.join(__dirname, './');
const folders = ['migrations', 'seeders'];

async function loadSQLFilesFrom(folderPath) {
  const files = await fs.readdir(folderPath);
  const sqlFiles = files
    .filter(file => file.endsWith('.sql'))
    .sort();
  const scripts = [];

  for (const file of sqlFiles) {
    const filePath = path.join(folderPath, file);
    const sql = await fs.readFile(filePath, 'utf-8');
    scripts.push({ name: file, sql });
  }

  return scripts;
}

async function runSQLScripts() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });

  try {
    for (const folder of folders) {
      const folderPath = path.join(scriptsRoot, folder);
      const scripts = await loadSQLFilesFrom(folderPath);

      for (const { name, sql } of scripts) {
        console.log(`🟡 Executando: ${folder}/${name}`);
        try {
          await connection.query(sql);
          console.log(`✅ Sucesso: ${folder}/${name}`);
        } catch (error) {
          console.error(`❌ Erro ao executar ${folder}/${name}:`, error.message);
          throw error;
        }
      }
    }
  } finally {
    await connection.end();
  }
}

runSQLScripts().catch(err => {
  console.error('Erro geral:', err.message);
  process.exit(1);
});