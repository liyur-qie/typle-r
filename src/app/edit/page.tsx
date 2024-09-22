import PageTitle from "@/components/PageTitle/PageTitle"
import PageDescription from "@/components/PageDescription/PageDescription"

export default function Edit(){
  return (
      <main className="bg-white p-16 pb-12">
      <PageTitle>編集</PageTitle>
      <PageDescription>説明</PageDescription>
      <section className="mt-12">
        <table className="mt-4">
          <thead>
            <tr>
              <th>単語リスト名</th>
              <th>単語数</th>
              <th>プレイ日時</th>
              <th>操作</th>

            </tr>
          </thead>
          <tbody>
            <tr>
              <td>単語集A</td>
              <td>N 語</td>
              <td>2024/09/22 10:00</td>
              <td>
                <button>上へ</button>
                <button>下へ</button>
                <button>削除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  )
}