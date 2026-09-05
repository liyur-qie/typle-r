"use client"
import LegacyImport from "@/components/LegacyImport"
import Link from "next/link"
import Page from "@/components/Page/Page"
import PageContainer from "@/components/PageContainer/PageContainer"
import { useWordLists } from "@/lib/useWordLists"

export default function Home() {
  const { lists, ready, error, saving, update } = useWordLists()
  const count = lists.reduce((total, list) => total + list.records.length, 0)
  return <Page><PageContainer>
    <h1 className="text-3xl mb-4">自分の単語で、タイピング練習。</h1>
    <p className="mb-6">サンプルで練習を始めるか、覚えたい単語のリストを作成しましょう。</p>
    {error && <p role="alert" className="text-red-700">{error}</p>}
    {ready && <p className="mb-6">単語リスト {lists.length} 件 ／ 完了した練習 {count} 回</p>}
    <nav aria-label="はじめる" className="flex gap-4 flex-wrap">
      <Link href="/play" className="bg-blue-700 text-white rounded-sm px-5 py-3">練習する</Link>
      <Link href="/create" className="border rounded-sm px-5 py-3">リストを作成</Link>
      <Link href="/records" className="border rounded-sm px-5 py-3">記録を見る</Link>
    </nav>
    <p className="mt-8">GitHubでログインすると、単語リストと練習記録をアカウントごとに保存できます。同じアカウントで別の端末から利用できます。</p>
    <LegacyImport update={update} disabled={!ready || saving} />
    <p className="mt-4"><Link className="underline" href="/guide">使い方</Link> ／ <Link className="underline" href="/about">Typleについて</Link></p>
  </PageContainer></Page>
}
