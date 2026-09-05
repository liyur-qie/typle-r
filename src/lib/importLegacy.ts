import type { SavedWordList } from './wordLists'

export async function prepareLegacy(lists: SavedWordList[]): Promise<SavedWordList[]> {
  return Promise.all(lists.map(async list => {
    const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify(list)))
    const hash = Array.from(new Uint8Array(bytes)).map(byte => byte.toString(16).padStart(2, '0')).join('')
    return { ...list, id: `legacy-${hash}` }
  }))
}

export function mergeLegacy(current: SavedWordList[], incoming: SavedWordList[]) {
  const merged = [...current]
  for (const list of incoming) {
    if (merged.some(item => item.id === list.id)) continue
    let name = list.name
    let suffix = 2
    while (merged.some(item => item.name.trim().toLocaleLowerCase() === name.trim().toLocaleLowerCase())) {
      name = `${list.name.slice(0, 180)}（移行 ${suffix++}）`
    }
    merged.push({ ...list, name })
  }
  return merged
}
