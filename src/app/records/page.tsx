import PageTitle from "@/components/PageTitle/PageTitle"
import PageDescription from "@/components/PageDescription/PageDescription"

export default function Records() {
  return (
    <main className="bg-white p-16 pb-12">
      <PageTitle>記録</PageTitle>
      <PageDescription>各単語リストの記録を確認することができます。</PageDescription>
      <section className="mt-12">
        <h2 className="text-2xl">単語集A</h2>
        <table className="mt-4">
          <thead>
            <tr>
              <th>No.</th>
              <th>所要時間</th>
              <th>単語数</th>
              <th>練習日時</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">
                1
              </td>
              <td>2秒</td>
              <td>N 単語</td>
              <td>2024/09/22 10:00</td>
              <td>
                <button>削除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  )
}