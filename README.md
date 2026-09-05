# Typle

自分の単語リストで練習できるタイピングアプリです。

## 機能

- 正誤判定、単語の自動進行、完了表示、リトライ（日本語IME対応）
- 単語リストの作成・編集・並べ替え・削除
- 所要時間・ミス文字数・正確率の記録と削除
- リストごとの個人ベスト記録

データはlocalStorageに保存します。端末間同期はなく、ブラウザーの保存データを消去すると失われます。初回はサンプル単語リストを表示し、ダミーの練習記録は追加しません。

## 開発

Node.js 22とnpmを使用します。

```sh
npm ci
npm run dev
```

http://localhost:3000 を開きます。

## 検証

```sh
npm test
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

テストでは入力判定、練習結果、保存データの検証・復元、重複記録防止を確認します。

E2Eテストは本番ビルドをポート3101で起動し、リストの作成・編集・練習完了・記録保存と削除を検証します。先に `npm run build` を実行してください。開発サーバーの `.next` と本番の `.next-production` は分離しています。

GitHub Actionsはmain/devへのpushとPRで、型チェック・単体テスト・Lint・本番ビルド・E2Eテストを実行します。

## リリース

package.jsonとpackage-lock.jsonのバージョンを揃え、検証後にコミット・タグをGitでpushし、GitHub CLIでリリースを作成します。

```sh
gh release create v0.1.x --verify-tag --title v0.1.x --notes-file release-notes.md
```

## 保存形式

キーは `typle-r:word-lists:v1`、形式は `{ version: 1, lists: [...] }` です。読み込み不能なデータは上書きしません。リスト削除では関連する練習記録も削除します。
