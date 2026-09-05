import { decodeLists, SavedWordList } from './wordLists'

export type Workspace = { lists: SavedWordList[]; revision: number }
export type Query = (sql: string, values: unknown[]) => Promise<Record<string, unknown>[]>

function unpack(row: Record<string, unknown>): Workspace {
  return { lists: decodeLists(JSON.stringify({ version: 1, lists: row.lists })), revision: Number(row.revision) }
}

export function workspaceRepository(query: Query) {
  return {
    async read(owner: string): Promise<Workspace> {
      const rows = await query('SELECT lists, revision FROM typle_workspaces WHERE owner_id = $1', [owner])
      return rows.length ? unpack(rows[0]) : { lists: [], revision: 0 }
    },
    async write(owner: string, lists: SavedWordList[], revision: number): Promise<Workspace | null> {
      const values = [owner, JSON.stringify(lists)]
      const rows = revision === 0
        ? await query('INSERT INTO typle_workspaces (owner_id, lists) VALUES ($1, $2::jsonb) ON CONFLICT (owner_id) DO NOTHING RETURNING lists, revision', values)
        : await query('UPDATE typle_workspaces SET lists = $2::jsonb, revision = revision + 1, updated_at = now() WHERE owner_id = $1 AND revision = $3 RETURNING lists, revision', [...values, revision])
      return rows.length ? unpack(rows[0]) : null
    },
  }
}
