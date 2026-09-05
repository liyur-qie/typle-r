"use client"
import Button from "@/components/ui/Button"
import Link from "next/link"
import Page from "@/components/Page/Page"
import PageContainer from "@/components/PageContainer/PageContainer"
import { useWordLists } from "@/lib/useWordLists"

import { recentRecords, removeRecord } from "@/lib/records"

export default function Records() {
  const { lists, ready, error, update } = useWordLists()
  const rows = recentRecords(lists)
  return <Page><PageContainer>
    <h1 className="text-2xl mb-6">練習記録</h1>
    <p>ログイン中のアカウントに保存した記録です。単語数は練習時点の値です。</p>
    {error && <p role="alert" className="text-red-700">{error}</p>}
    {!ready ? <p>読み込み中…</p> : !rows.length ? <p className="my-6">まだ記録がありません。<Link className="underline" href="/play">練習を始める</Link></p> :
      <div className="overflow-x-auto my-6"><table className="w-full text-left">
        <thead><tr>{['リスト', '所要時間', '単語数', 'ミス数', '正確率', '日時', '操作'].map(title => <th className="p-3" key={title}>{title}</th>)}</tr></thead>
        <tbody>{rows.map(({ list, record, index }) => <tr className="border-t" key={`${list.id}-${record.id ?? index}`}>
          <th className="p-3" scope="row">{list.name}</th><td>{record.time.toFixed(2)} 秒</td><td>{record.wordCount ?? '—'}</td>
          <td>{record.mistakes ?? '—'}</td><td>{record.accuracy === undefined ? '—' : `${record.accuracy}%`}</td>
          <td>{new Date(record.date).toLocaleString('ja-JP')}</td>
          <td><Button color="error" aria-label={`${list.name} の ${new Date(record.date).toLocaleString('ja-JP')} の記録を削除`} onClick={() => {
            if (window.confirm('この練習記録を削除しますか？')) void update(current => removeRecord(current, list.id, record))
          }}>削除</Button></td>
        </tr>)}</tbody>
      </table></div>}
  </PageContainer></Page>
}
