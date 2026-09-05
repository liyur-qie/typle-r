"use client"
import { Alert, AlertDescription } from "@/components/ui/alert"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useWordLists } from "@/lib/useWordLists"
import type { SavedWordList } from "@/lib/wordLists"
import { usePractice } from "@/lib/usePractice"
import type { WorkspaceUpdate } from "@/lib/workspaceClient"
import Page from "@/components/Page/Page"
import PageContainer from "@/components/PageContainer/PageContainer"

export default function Play() {
  const { lists, ready, error, update } = useWordLists()
  if (!ready) return <Page><PageContainer><p>読み込み中…</p></PageContainer></Page>
  return <Practice wordLists={lists} error={error} update={update} />
}

function Practice({ wordLists, error, update }: {
  wordLists: SavedWordList[]
  error: string
  update: WorkspaceUpdate
}) {
  const { list, selected, session, composition, startComposition, endComposition, changeInput, saved, input, word, finished, result, restart, retrySave } = usePractice(wordLists, update)

  return <Page className="pb-12"><PageContainer>
    <h1 className="text-2xl mb-6">タイピング練習</h1>
    {error && <Alert variant="destructive" className="my-4"><AlertDescription>{error}</AlertDescription></Alert>}
    <div className="flex gap-3 flex-wrap mb-6" aria-label="単語リスト">
      {wordLists.map((item, index) => <Button key={item.id} variant={index === selected ? "default" : "outline"}
        aria-pressed={index === selected} onClick={() => restart(index)}>{item.name}</Button>)}
    </div>
    <h2 className="text-xl">選択中: {list?.name ?? "リストなし"}</h2>
    {!list?.words.length ? <p>単語がありません。単語リストを作成してください。</p> : <>
      <p className="my-4" role="status">{finished ? "練習完了！" : `${session.index + 1} / ${list.words.length} 単語`}</p>
      {!finished && <>
        <div id="wordDisplay" className="bg-gray-900 text-white p-8 text-4xl text-center break-all">{word?.display}</div>
        {word?.annotation && <p className="mt-3">{word.annotation}</p>}
        <p className="my-4 text-2xl break-all" aria-label="入力する文字">
          {Array.from(word?.input ?? "").map((char, index) => {
            const typed = Array.from(session.input)[index]
            return <span key={index} className={typed === undefined ? "" : typed === char ? "text-green-700 underline" : "text-red-700 underline"}>{char}</span>
          })}
        </p>
        <Label htmlFor="wordInputField">表示された文字を入力</Label>
      </>}
      <Input ref={input} id="wordInputField" className={`border rounded-sm p-4 w-full text-2xl ${finished ? "hidden" : ""}`}
        value={composition ?? session.input} disabled={finished} autoComplete="off" autoCapitalize="off" spellCheck={false}
        aria-label="表示された文字を入力" aria-invalid={!!session.input && !word?.input.startsWith(session.input)}
        onPaste={event => event.preventDefault()} onDrop={event => event.preventDefault()}
        onCompositionStart={startComposition}
        onCompositionEnd={event => endComposition(event.currentTarget.value)}
        onChange={event => changeInput(event.target.value, (event.nativeEvent as InputEvent).isComposing)} />
      {!finished && session.input && !word?.input.startsWith(session.input) && <p role="status" className="text-red-700">入力が違います。Backspaceで修正してください。</p>}
      {finished && <Card aria-label="練習結果" className="my-6"><CardContent className="space-y-2">
        <h2 className="text-xl">おつかれさまでした！</h2>
        <p>{list.words.length} 単語を完了しました。</p>
        <p>所要時間: {result.time.toFixed(2)} 秒</p>
        <p>ミス数: {result.mistakes} 文字 ／ 正確率: {result.accuracy}%</p>
        <p role="status">{saved ? "練習記録を保存しました。" : "記録はまだ保存されていません。"}</p>
        {!saved && <Button onClick={retrySave}>記録の保存を再試行</Button>}
      </CardContent></Card>}
      <div className="my-6"><Button variant="outline" onClick={() => restart()}>最初からやり直す</Button></div>
    </>}
  </PageContainer></Page>
}
