"use client"
import Link from "next/link"
import Page from "@/components/Page/Page"
import PageContainer from "@/components/PageContainer/PageContainer"
import { useWordLists } from "@/lib/useWordLists"

export default function Rankings() {
  const { lists, ready, error } = useWordLists()
  return <Page><PageContainer>
    <h1 className="text-2xl mb-4">自分のベスト記録</h1>
    <p>このブラウザー内の記録を、単語リストごとに正確率の高い順、同率なら所要時間の短い順に表示します。リストを編集した前後では内容が異なる場合があります。</p>
    {error && <p role="alert" className="text-red-700">{error}</p>}
    {!ready ? <p>読み込み中…</p> : !lists.some(list => list.records.length) ? <p className="my-6">まだ記録がありません。<Link href="/play" className="underline">練習する</Link></p> :
      lists.filter(list => list.records.length).map(list => <section key={list.id} className="mt-8">
        <h2 className="text-xl mb-3">{list.name}</h2>
        <ol className="list-decimal pl-6 space-y-3">{[...list.records].sort((a, b) => (b.accuracy ?? -1) - (a.accuracy ?? -1) || a.time - b.time).slice(0, 5).map((record, index) =>
          <li key={record.id ?? index}>{record.time.toFixed(2)} 秒 ／ 正確率 {record.accuracy === undefined ? '未記録' : `${record.accuracy}%`} ／ {record.wordCount ?? '—'} 単語 ／ {new Date(record.date).toLocaleString('ja-JP')}</li>)}</ol>
      </section>)}
  </PageContainer></Page>
}
