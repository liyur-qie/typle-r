const fs = require('node:fs')
const path = require('node:path')
const { loadEnvConfig } = require('@next/env')
const { neon } = require('@neondatabase/serverless')
const { Client } = require('pg')
loadEnvConfig(process.cwd())
async function main() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL
  if (!url) throw new Error('DATABASE_URL is missing')
  const statement = fs.readFileSync(path.join(__dirname, '../migrations/001_workspaces.sql'), 'utf8')
  if (process.env.DATABASE_DRIVER === 'postgres') {
    const client = new Client({ connectionString: url })
    try { await client.connect(); await client.query(statement) } finally { await client.end() }
  } else { await neon(url).query(statement) }
  console.log('Database migration completed.')
}
main().catch(() => { console.error('Database migration failed. Check the server-only connection settings.'); process.exitCode = 1 })
