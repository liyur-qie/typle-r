"use client"
import { useRef, useState } from "react"
import Button from "@/components/ui/Button"
import TextField from "@/components/ui/TextField"
import type { SavedWordList } from "@/lib/wordLists"

export default function WordListEditor({ initial, onSave, onCancel }: {
  initial?: SavedWordList
  onSave: (list: SavedWordList) => Promise<boolean>
  onCancel: () => void
}) {
  const [name, setName] = useState(initial?.name ?? "")
  const [words, setWords] = useState(() => (initial?.words ?? [{ display: "", input: "", annotation: "" }]).map((word, index) => ({ ...word, key: `initial-${index}` })))

  const draftId = useRef<string>()
  const [saving, setSaving] = useState(false)

  function move(index: number, offset: number) {
    setWords(current => {
      const next = [...current]
      const target = index + offset
      if (target < 0 || target >= next.length) return current
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
  }

  return <form onSubmit={async event => {
    event.preventDefault()
    if (saving) return
    draftId.current ??= initial?.id ?? crypto.randomUUID()
    setSaving(true)
    try { await onSave({ id: draftId.current, name, words: words.map(({ key, ...word }) => word),
      records: initial?.records ?? [], createdAt: initial?.createdAt ?? new Date().toISOString() }) } finally { setSaving(false) }
  }} className="space-y-6">
    <TextField label="単語リスト名" required value={name} onChange={event => setName(event.target.value)} />
    <p>表示する単語と、正解として入力する文字を指定します。ログイン中のアカウントに保存されます。</p>
    {words.map((word, index) => <fieldset key={word.key} className="border rounded p-4 space-y-4">
      <legend>単語 {index + 1}</legend>
      {([['display', '表示する単語'], ['input', '入力する文字'], ['annotation', '補足']] as const).map(([field, label]) =>
        <TextField key={field} label={`${label} ${index + 1}`} required={field !== 'annotation'} value={word[field]}
          onChange={event => setWords(current => current.map(item => item.key === word.key ? { ...item, [field]: event.target.value } : item))} />)}
      <div className="flex flex-wrap gap-2">
        <Button disabled={index === 0} onClick={() => move(index, -1)} aria-label={`単語 ${index + 1} を上へ`}>上へ</Button>
        <Button disabled={index === words.length - 1} onClick={() => move(index, 1)} aria-label={`単語 ${index + 1} を下へ`}>下へ</Button>
        <Button disabled={words.length === 1} onClick={() => setWords(current => current.filter(item => item.key !== word.key))} aria-label={`単語 ${index + 1} を削除`}>削除</Button>
      </div>
    </fieldset>)}
    <Button onClick={() => setWords(current => [...current, { key: crypto.randomUUID(), display: "", input: "", annotation: "" }])}>単語を追加</Button>
    <div className="flex gap-3">
      <Button type="submit" disabled={saving} variant="contained">{saving ? "保存中…" : "保存"}</Button>
      <Button onClick={onCancel}>キャンセル</Button>
    </div>
  </form>
}
