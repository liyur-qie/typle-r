export default function Play(){
  return (
    <main className="bg-white pb-12">
      <section id="playArea">
        <div
          id="wordDisplay"
          className="bg-gray-900 text-white flex justify-center items-center text-4xl h-28"
        >
          入力を期待する単語
        </div>
        <input
          id="wordInputField"
          v-model="wordInputField"
          type="text"
          className="bg-gray-800 text-white text-center w-full text-2xl font-light h-28 outline-none"
          placeholder="Type the word above here"
        />
      </section>
      <div className="mx-auto mt-8 px-6">
        <section id="wordList">
          <h1 className="text-xl my-3">選択中: 選択中の単語リスト名</h1>
          <p>チップ表示エリア</p>
        </section>
        <section className="mt-8 flex flex-wrap justify-between">
          <section id="rankings" className="lg:w-6/12 md:w-full">
            <h2 className="text-2xl">
              記録
            </h2>
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>所要時間</th>
                  <th>プレイ日時</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">
                    1
                  </td>
                  <td>
                    N 秒
                  </td>
                  <td>{ new Date().toLocaleString() }</td>
                </tr>
              </tbody>
            </table>
          </section>
          <section
            id="selectWordList"
            className="lg:w-5/12 md:w-full md:mt-6 lg:mt-0"
          >
            <h2 className="text-2xl">
              単語リスト
            </h2>
            <table>
              <thead>
                <tr>
                  <th>単語リスト</th>
                  <th>単語数</th>
                  <th>選択</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    単語リストA
                  </td>
                  <td>N 語</td>
                  <td>
                    <button>
                      選択済み
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>単語リストB</td>
                  <td>N 語</td>
                  <td>
                    <button>
                      プレイ
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </section>
      </div>
    </main>
  )
}