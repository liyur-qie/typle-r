import PageTitle from "@/components/PageTitle/PageTitle"
import PageDescription from "@/components/PageDescription/PageDescription"

export default function Create(){
  return (
    <main className="bg-white p-16 pb-12">
      <section>
        <PageTitle>Create</PageTitle>
        <PageDescription>説明</PageDescription>
      </section>
      <section className="mt-8">
        <input type="text"/>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th className="w-4/12">単語</th>
              <th>文字数</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A</td>
              <td>
                <input type="text" />
              </td>
              <td>N 文字</td>
              <td>
                <button>上へ</button>
                <button>下へ</button>
                <button>削除</button>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>
                <input type="text" />
              </td>
              <td>N 文字</td>
              <td>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="mt-8">
        <button>作成</button>
        <button>キャンセル</button>
      </section>
    </main>
  )
}