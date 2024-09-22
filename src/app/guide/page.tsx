export default function Page() {
  return (
    <>
      <main>
        <section>
          <h1 id="about" className="text-5xl">概要</h1>
          <p className="mt-9">
            Typle(タイプル)はタイピング練習用の無料Webアプリです。
            タイピングを練習する際に入力する単語のリストは自分で自由に追加、編集が可能です。
          </p>
        </section>
        <section className="mt-24">
          <h2 id="how-to-play" className="text-4xl">遊び方</h2>
          <p className="mt-9">
            単語ディスプレイ(画像1)に表示されている文字を入力エリア(画像2)にタイプしましょう。
            タイプの正誤判定は一文字づつ行われ、正しい場合は「緑」でハイライトされ、間違っている場合は「赤」でハイライトされます。
            タイプしたすべての文字が単語ディスプレイの内容と等しい場合、次の単語が表示されるのでこれを最後の単語リストの単語の入力まで繰り返します。
            すべての単語の入力が終わるとタイプにかかった時間、ミスタイプ数、正確性が表示されます。
          </p>
        </section>
        <section className="mt-24">
          <h2 id="how-to-check-records" className="text-4xl">練習記録の確認</h2>
          <p className="mt-9">
            Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
            mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
            fringilla, mattis ligula consectetur, ultrices mauris. Maecenas
            vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor
            ornare leo, non suscipit magna interdum eu. Curabitur pellentesque
            nibh nibh, at maximus ante.
          </p>
        </section>
        <a href="#how-to-play">s</a>
      </main>
      <aside>
        <p className="text-sm font-bold">目次</p>
        <ul className="index mt-8">
          <li v-for="(index, indexKey) in indexes">
            <a href="#" className="block text-sm px-4 py-2">a</a>
          </li>
        </ul>
      </aside>
    </>
  )
}