import type { SavedWordList } from "./wordLists"
import { sessionResult, TypingSession } from "./typing"

export type PracticeRecord = {
  id: string
  time: number
  date: string
  mistakes: number
  accuracy: number
  wordCount: number
}

export function makeRecord(session: TypingSession, wordCount: number, id: string): PracticeRecord {
  if (session.finishedAt === null || session.startedAt === null) throw new Error("練習が完了していません。")
  return { ...sessionResult(session), id, wordCount, date: new Date(session.finishedAt).toISOString() }
}

export function addRecord(lists: SavedWordList[], listId: string, record: PracticeRecord) {
  if (!lists.some(list => list.id === listId)) throw new Error("単語リストが削除されているため、記録を保存できません。")
  return lists.map(list => list.id !== listId || list.records.some(item => item.id === record.id)
    ? list : { ...list, records: [...list.records, record] })
}
