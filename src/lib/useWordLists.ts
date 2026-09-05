"use client"
import { useEffect, useState } from "react"
import samples from "@/json/WordListsResponse.json"
import { decodeLists, encodeLists, SavedWordList, STORAGE_KEY } from "./wordLists"

const defaults: SavedWordList[] = samples.map((list, index) => ({ ...list, id: `sample-${index + 1}`, records: [] }))
const changedEvent = "typle-r:lists-changed"

function read(): SavedWordList[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw === null ? defaults : decodeLists(raw)
}

export function useWordLists() {
  const [lists, setLists] = useState<SavedWordList[]>([])
  const [ready, setReady] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    function load() {
      try { setLists(read()); setError("") }
      catch { setError("保存データを読み込めません。ブラウザーの保存設定を確認してください。元のデータは変更していません。") }
      finally { setReady(true) }
    }
    load()
    window.addEventListener("storage", load)
    window.addEventListener(changedEvent, load)
    return () => { window.removeEventListener("storage", load); window.removeEventListener(changedEvent, load) }
  }, [])

  function update(change: (current: SavedWordList[]) => SavedWordList[]) {
    if (!ready) return false
    try {
      const next = change(read())
      localStorage.setItem(STORAGE_KEY, encodeLists(next))
      setLists(next)
      setError("")
      window.dispatchEvent(new Event(changedEvent))
      return true
    } catch (reason) {
      setError(reason instanceof Error && !(reason instanceof DOMException) ? reason.message : "保存できませんでした。ブラウザーの容量や保存設定を確認して、もう一度お試しください。")
      return false
    }
  }
  return { lists, ready, error, update }
}
