import Page from "@/components/Page/Page"
import PageContainer from "@/components/PageContainer/PageContainer"

export default function About() {
  return <Page><PageContainer>
    <h1 className="text-3xl mb-6">Typleについて</h1>
    <p>Typleは、自分で作った単語リストで練習できるタイピングアプリです。Next.jsとReactで開発しています。</p>
    <p className="my-4">単語リストや練習記録はブラウザー内に保存します。入力内容を保存するためのサーバーAPIはありません。</p>
    <a className="underline" href="https://github.com/liyur-qie/typle-r">GitHubでソースコードを見る</a>
  </PageContainer></Page>
}
