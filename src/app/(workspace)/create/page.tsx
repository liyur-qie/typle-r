"use client"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import Page from "@/components/Page/Page"
import PageContainer from "@/components/PageContainer/PageContainer"
import WordListEditor from "@/components/WordListEditor"
import { useWordLists } from "@/lib/useWordLists"
import { saveList } from "@/lib/wordLists"

export default function Create() {
  const router = useRouter()
  const { ready, error, update } = useWordLists()
  return <Page><PageContainer>
    <h1 className="text-2xl mb-6">単語リストを作成</h1>
    {error && <Alert variant="destructive" className="my-4"><AlertDescription>{error}</AlertDescription></Alert>}
    {ready ? <WordListEditor onCancel={() => router.push('/edit')} onSave={async list => {
      const saved = await update(current => saveList(current, list, false))
      if (saved) router.push('/edit')
      return saved
    }} /> : <p>読み込み中…</p>}
  </PageContainer></Page>
}
