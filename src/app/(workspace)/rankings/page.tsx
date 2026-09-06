"use client"
import { Alert, AlertDescription } from "@/components/ui/alert"
import BestRecordsTable from "@/components/BestRecordsTable"
import Link from "next/link"
import Page from "@/components/Page/Page"
import PageContainer from "@/components/PageContainer/PageContainer"
import { useWordLists } from "@/lib/useWordLists"


export default function Rankings() {
  const { lists, ready, error } = useWordLists()
  return <Page><PageContainer>
    <h1 className="text-2xl mb-4">自分のベスト記録</h1>
    <p>自分のアカウントの記録を、単語リストごとに正確率の高い順、同率なら所要時間の短い順に表示します。リストを編集した前後では内容が異なる場合があります。</p>
    {error && <Alert variant="destructive" className="my-4"><AlertDescription>{error}</AlertDescription></Alert>}
    {!ready ? <p>読み込み中…</p> : !lists.some(list => list.records.length) ? <p className="my-6">まだ記録がありません。<Link href="/play" className="underline">練習する</Link></p> :
      lists.filter(list => list.records.length).map(list => <section key={list.id} className="mt-8">
        <h2 className="text-xl mb-3">{list.name}</h2>
        <BestRecordsTable records={list.records} label={`${list.name} のベスト記録`} showDate />
      </section>)}
  </PageContainer></Page>
}
