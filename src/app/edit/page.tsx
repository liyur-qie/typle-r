"use client"
import { useState } from "react"
import Link from "next/link"
import Button from "@mui/material/Button"
import Page from "@/components/Page/Page"
import PageContainer from "@/components/PageContainer/PageContainer"
import WordListEditor from "@/components/WordListEditor"
import { useWordLists } from "@/lib/useWordLists"
import { SavedWordList, saveList } from "@/lib/wordLists"

export default function Edit() {
  const { lists, ready, error, update } = useWordLists()
  const [editing, setEditing] = useState<SavedWordList | null>(null)
  const [message, setMessage] = useState('')
  return <Page><PageContainer>
    <h1 className="text-2xl mb-6">単語リストの編集</h1>
    {error && <p role="alert" className="text-red-700 mb-4">{error}</p>}
    {message && <p role="status">{message}</p>}
    {!ready ? <p>読み込み中…</p> : editing ? <WordListEditor key={editing.id} initial={editing} onCancel={() => setEditing(null)} onSave={list => {
      const saved = update(current => saveList(current, list, true))
      if (saved) { setEditing(null); setMessage('保存しました。') }
      return saved
    }} /> : <>
      <Link href="/create" className="underline">新しい単語リストを作成</Link>
      {!lists.length && <p className="my-6">単語リストがありません。</p>}
      <div className="overflow-x-auto my-6"><table className="w-full text-left">
        <thead><tr><th className="p-3">単語リスト名</th><th>単語数</th><th>記録数</th><th>操作</th></tr></thead>
        <tbody>{lists.map(list => <tr key={list.id} className="border-t">
          <th className="p-3" scope="row">{list.name}</th><td>{list.words.length}</td><td>{list.records.length}</td>
          <td><Button onClick={() => { setEditing(list); setMessage('') }} aria-label={`${list.name} を編集`}>編集</Button>
            <Button color="error" aria-label={`${list.name} を削除`} onClick={() => {
              if (window.confirm(`「${list.name}」とその練習記録を削除しますか？`)) {
                if (update(current => current.filter(item => item.id !== list.id))) setMessage('削除しました。')
              }
            }}>削除</Button></td>
        </tr>)}</tbody>
      </table></div>
    </>}
  </PageContainer></Page>
}
