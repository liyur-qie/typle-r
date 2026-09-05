# Typle

自分の単語リストで練習できるタイピングアプリです。

## v0.2.0

- Auth.jsによるGitHubログイン
- ユーザーごとの単語リスト・練習記録をPostgreSQLに保存
- Neon HTTP接続と通常のPostgreSQL接続に対応
- v0.1.xのlocalStorageデータをホームから明示的に移行（元データは保持）
- 同時更新はrevisionで検出し、他の画面の変更を上書きせず再試行を案内

練習、リスト作成・編集・並べ替え、記録削除、個人ベスト表示を利用できます。保存には接続が必要です。初回はサンプルを表示し、最初の変更時に保存します。

## Dockerでの仮運用

Node.js 22以上、npm、Docker Composeを使用します。

```sh
npm ci
node scripts/setup-local.cjs
docker compose --env-file .env.local up -d --wait
npm run db:migrate
```

`setup-local.cjs` はランダムなDBパスワードとAUTH_SECRETを `.env.local` に生成します。既存ファイルは上書きしません。DBは `127.0.0.1:5433` のみ公開し、名前付きボリューム `typle-r_postgres_data` にデータを保持します。

GitHubの Settings → Developer settings → OAuth Apps でローカル用OAuth Appを作成します。

- Homepage URL: `http://localhost:3000`
- Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

Client IDとClient secretを `.env.local` の `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` に設定します。秘密値はコミットしないでください。

```sh
npm run dev
```

[ローカルアプリ](http://localhost:3000) を開いてGitHubでログインします。通常の停止は `docker compose --env-file .env.local stop`、再開は `up -d --wait` です。`down -v` は保存データを削除するため使用しないでください。

## Neon / Vercelへの切り替え（デプロイ保留中）

Vercel MarketplaceでNeonを接続し、サーバー用の環境変数を設定します。

- `DATABASE_DRIVER=neon`
- `DATABASE_URL`: Neonの接続URL（`POSTGRES_URL`も代替として利用可能）
- `AUTH_SECRET`: 暗号学的にランダムな秘密値
- `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`: 本番用OAuth Appの認証情報
- `AUTH_URL`: 本番URL。本番OAuth callbackは `<本番URL>/api/auth/callback/github`

対象DBの環境変数を使って `npm run db:migrate` を実行してからデプロイします。DockerのDBからNeonへのデータコピーは自動ではありません。必要な場合はバックアップと復元を別途行います。Neon接続とVercelデプロイは今回未検証です。

公式資料: [Auth.js GitHub](https://authjs.dev/getting-started/providers/github)、[Neon driver](https://neon.com/docs/serverless/serverless-driver)、[PostgreSQL Docker image](https://hub.docker.com/_/postgres)。

## 保存とアクセス制御

`typle_workspaces` テーブルにユーザーごとのJSONBスナップショットとrevisionを保持します。所有者はサーバーがAuth.jsセッションのGitHubユーザーIDから決定します。APIは未認証アクセスを拒否し、書き込みでOrigin、アカウント一致、形式、最大1MiBのサイズを検証します。共有ランキングはありません。

旧形式のキーは `typle-r:word-lists:v1`、値は `{ version: 1, lists: [...] }` です。ホームの移行ボタンは現在のアカウントに追加し、同じ内容の再移行を重複させません。同名のリストは名前に移行番号を付けます。壊れた元データは変更しません。リスト削除はその記録も削除します。

## 検証

Dockerを起動してマイグレーションを実行した状態で:

```sh
npm run typecheck
npm test
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

単体テストは入力判定、記録、移行、形式検証とPGlite上のPostgreSQLクエリを検証します。E2Eは本番ビルドをポート3101で起動し、実PostgreSQLとAPIを通して作成・編集・練習・再読み込み・削除、アカウント分離、401/403/409応答を確認します。テスト専用秘密値で署名したセッションを使うため、GitHub OAuth画面の実ログインは別途確認が必要です。テストユーザーの行だけを終了後に削除します。

GitHub ActionsでもPostgreSQLサービスを起動して同じチェックを実行します。開発ビルド `.next` と本番ビルド `.next-production` は分離しています。

## リリース

バージョンを更新し検証後、Git/SSHでコミットとタグをpush、GitHub CLIでリリースを作成します。Vercelへのデプロイは現在保留しています。`vercel.json` の `git.deploymentEnabled=false` でGit連携の自動デプロイも停止しています。再開時にこの設定を戻してください。

## 依存関係の既知の制約

Next.jsを14.2.3から14.2.35に更新し、未使用の `style-components` を削除しました。ただし2026-09-06の `npm audit` はNext.js 14と関連依存にhigh 6件を報告しています。今回はlocalhostでの仮運用とし、公開運用の再開前にサポート中のNext.jsへの移行と監査を行ってください。
