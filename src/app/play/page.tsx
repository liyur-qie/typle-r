"use client"

import { useEffect, useRef, useState } from "react"
import Button from "@mui/material/Button"
import WordListsResponse from "@/json/WordListsResponse.json"
import Page from "@/components/Page/Page"
import PageContainer from "@/components/PageContainer/PageContainer"
import { newSession, sessionResult, typeInput } from "@/lib/typing"

export default function Play() {
  const wordLists = WordListsResponse
  const [selected, setSelected] = useState(0)
  const [session, setSession] = useState(newSession)
  const [composition, setComposition] = useState<string | null>(null)
  const composing = useRef(false)
  const committedComposition = useRef<string | null>(null)
  const input = useRef<HTMLInputElement>(null)
  const list = wordLists[selected]
  const word = list?.words[session.index]
  const finished = session.finishedAt !== null
  const result = sessionResult(session)

  useEffect(() => { if (!finished) input.current?.focus() }, [finished, selected])

  function restart(index = selected) {
    setSelected(index)
    setSession(newSession())
    setComposition(null)
    composing.current = false
    committedComposition.current = null
    input.current?.focus()
  }

  function enter(value: string) {
    setSession(current => typeInput(current, list?.words ?? [], value, Date.now()))
  }

  return <Page className="pb-12"><PageContainer>
    <h1 className="text-2xl mb-6">タイピング練習</h1>
    <div className="flex gap-3 flex-wrap mb-6" aria-label="単語リスト">
      {wordLists.map((item, index) => <Button key={item.name} variant={index === selected ? "contained" : "outlined"}
        aria-pressed={index === selected} onClick={() => restart(index)}>{item.name}</Button>)}
    </div>
    <h2 className="text-xl">選択中: {list?.name ?? "リストなし"}</h2>
    {!list?.words.length ? <p>単語がありません。単語リストを作成してください。</p> : <>
      <p className="my-4" role="status">{finished ? "練習完了！" : `${session.index + 1} / ${list.words.length} 単語`}</p>
      {!finished && <>
        <div id="wordDisplay" className="bg-gray-900 text-white p-8 text-4xl text-center break-all">{word?.display}</div>
        <p className="my-4 text-2xl break-all" aria-label="入力する文字">
          {Array.from(word?.input ?? "").map((char, index) => {
            const typed = Array.from(session.input)[index]
            return <span key={index} className={typed === undefined ? "" : typed === char ? "text-green-700 underline" : "text-red-700 underline"}>{char}</span>
          })}
        </p>
        <label htmlFor="wordInputField">表示された文字を入力</label>
      </>}
      <input ref={input} id="wordInputField" className={`border rounded p-4 w-full text-2xl ${finished ? "hidden" : ""}`}
        value={composition ?? session.input} disabled={finished} autoComplete="off" autoCapitalize="off" spellCheck={false}
        aria-label="表示された文字を入力" aria-invalid={!!session.input && !word?.input.startsWith(session.input)}
        onPaste={event => event.preventDefault()} onDrop={event => event.preventDefault()}
        onCompositionStart={() => { composing.current = true; setComposition(session.input) }}
        onCompositionEnd={event => {
          composing.current = false
          committedComposition.current = event.currentTarget.value
          setComposition(null)
          enter(event.currentTarget.value)
        }}
        onChange={event => {
          if (composing.current || (event.nativeEvent as InputEvent).isComposing) setComposition(event.target.value)
          else {
            const duplicate = committedComposition.current === event.target.value
            committedComposition.current = null
            if (!duplicate) enter(event.target.value)
          }
        }} />
      {!finished && session.input && !word?.input.startsWith(session.input) && <p role="status" className="text-red-700">入力が違います。Backspaceで修正してください。</p>}
      {finished && <section aria-label="練習結果" className="my-6 p-6 bg-green-50">
        <h2 className="text-xl">おつかれさまでした！</h2>
        <p>{list.words.length} 単語を完了しました。</p>
        <p>所要時間: {result.time.toFixed(2)} 秒</p>
      </section>}
      <div className="my-6"><Button variant="outlined" onClick={() => restart()}>最初からやり直す</Button></div>
    </>}
  </PageContainer></Page>
}
