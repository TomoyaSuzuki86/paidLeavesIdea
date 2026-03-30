# 有給取得促進アイデアサイト

人事企画担当が有給取得促進施策を比較し、そのまま制度案や運用案のたたき台にできる静的サイトです。  
一覧で比較しやすく、各施策は詳細ページで「なぜ効くか」「どう運用するか」「どこに向くか」まで読める構成にしています。

## セットアップ

```bash
npm install
```

Windows で開発する場合は、ファイル監視や Firebase CLI の扱いやすさを考えて WSL 利用を推奨します。

## 開発コマンド

```bash
npm run dev
```

ローカルの開発サーバーを起動します。

## build

```bash
npm run build
```

`dist` に本番用の静的ファイルを出力します。

## preview

```bash
npm run preview
```

build 後の出力をローカルで確認します。

## Firebase Hosting デプロイ

このリポジトリは `paidleavesidea` プロジェクトへデプロイする前提で `.firebaserc` を設定しています。

```bash
npm run build
firebase deploy --only hosting
```

スクリプト経由でも実行できます。

```bash
npm run deploy:hosting
```

## 主要ディレクトリ

```txt
src/
  app/          ルーター
  components/   レイアウト、セクション、アイデア関連 UI
  data/         アイデア、Packs、Roadmap の静的データ
  lib/          フィルタ関数
  pages/        Home / Ideas / Idea Detail
  types/        Idea, Pack, Roadmap の型定義
```

## 実装メモ

- ルーティングは `/` `/ideas` `/ideas/:slug`
- データは `src/data/ideas.ts` に集約
- Firebase Hosting は SPA rewrite で詳細 URL の直アクセスに対応
- フォントは `Manrope` と `Noto Sans JP` を `index.html` から読み込み
