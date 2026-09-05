import { Prisma, type PrismaClient } from '@prisma/client'
import { decodeLists, type SavedWordList } from './wordLists'

export type Workspace = { lists: SavedWordList[]; revision: number }

function unpack(row: { lists: Prisma.JsonValue; revision: number }): Workspace {
  return { lists: decodeLists(JSON.stringify({ version: 1, lists: row.lists })), revision: row.revision }
}

export function workspaceRepository(client: PrismaClient) {
  return {
    async read(ownerId: string): Promise<Workspace> {
      const row = await client.workspace.findUnique({ where: { ownerId } })
      return row ? unpack(row) : { lists: [], revision: 0 }
    },
    async write(ownerId: string, lists: SavedWordList[], revision: number): Promise<Workspace | null> {
      const data = { lists: lists as unknown as Prisma.InputJsonValue }
      try {
        if (revision === 0) return unpack(await client.workspace.create({ data: { ownerId, ...data } }))
        // Unique owner + revision makes the comparison and update one atomic operation.
        return unpack(await client.workspace.update({
          where: { ownerId, revision },
          data: { ...data, revision: { increment: 1 }, updatedAt: new Date() },
        }))
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError &&
            ((revision === 0 && error.code === 'P2002') || (revision > 0 && error.code === 'P2025'))) return null
        throw error
      }
    },
  }
}
