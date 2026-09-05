import { neon } from '@neondatabase/serverless'
import { Pool } from 'pg'
import { workspaceRepository } from './workspaceRepository'

const globalDb = globalThis as typeof globalThis & { typlePool?: Pool }

export function database() {
  const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL
  if (!url) throw new Error('Database is not configured')
  if (process.env.DATABASE_DRIVER === 'postgres') {
    if (!globalDb.typlePool) {
      globalDb.typlePool = new Pool({ connectionString: url, max: 5, connectionTimeoutMillis: 5000, idleTimeoutMillis: 30000 })
      globalDb.typlePool.on('error', () => console.error('An idle PostgreSQL connection was interrupted.'))
    }
    const pool = globalDb.typlePool
    return workspaceRepository(async (statement, values) => (await pool.query(statement, values)).rows)
  }
  const sql = neon(url)
  return workspaceRepository(async (statement, values) => await sql.query(statement, values) as Record<string, unknown>[])
}
