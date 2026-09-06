"use client"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import Link from "next/link"
import Page from "@/components/Page/Page"
import PageContainer from "@/components/PageContainer/PageContainer"
import { useWordLists } from "@/lib/useWordLists"

import { bestRecords } from "@/lib/records"

export default function Rankings() {
  const { lists, ready, error } = useWordLists()
  return <Page><PageContainer>
    <h1 className="text-2xl mb-4">自分のベスト記録</h1>
    <p>自分のアカウントの記録を、単語リストごとに正確率の高い順、同率なら所要時間の短い順に表示します。リストを編集した前後では内容が異なる場合があります。</p>
    {error && <Alert variant="destructive" className="my-4"><AlertDescription>{error}</AlertDescription></Alert>}
    {!ready ? <p>読み込み中…</p> : !lists.some(list => list.records.length) ? <p className="my-6">まだ記録がありません。<Link href="/play" className="underline">練習する</Link></p> :
      lists.filter(list => list.records.length).map(list => <section key={list.id} className="mt-8">
        <h2 className="text-xl mb-3">{list.name}</h2>
        <Table aria-label={`${list.name} のベスト記録`}>
          <TableHeader><TableRow>
            {['順位', '所要時間', '正確率', '単語数', '日時'].map(title => <TableHead key={title} scope="col">{title}</TableHead>)}
          </TableRow></TableHeader>
          <TableBody>{bestRecords(list.records).map((record, index) =>
            <TableRow key={record.id ?? index}>
              <TableHead scope="row">{index + 1}</TableHead>
              <TableCell>{record.time.toFixed(2)} 秒</TableCell>
              <TableCell>{record.accuracy === undefined ? '未記録' : `${record.accuracy}%`}</TableCell>
              <TableCell>{record.wordCount ?? '—'}</TableCell>
              <TableCell>{new Date(record.date).toLocaleString('ja-JP')}</TableCell>
            </TableRow>)}</TableBody>
        </Table>
      </section>)}
  </PageContainer></Page>
}
