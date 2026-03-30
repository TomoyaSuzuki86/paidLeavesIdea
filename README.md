# ナレッジサービス アイデアライブラリ

有給取得促進と睡眠改善をテーマにした React + Vite 製の静的サイトです。  
通常のテーマ閲覧は `/paid-leave` と `/sleep`、質問導線は `/diagnostic` に分離しています。

## ルート構成

- `/` : テーマ一覧
- `/diagnostic` : テーマ分岐つき診断導線
- `/paid-leave` : 有給取得促進テーマトップ
- `/paid-leave/ideas` : 有給取得促進アイデア一覧
- `/paid-leave/ideas/:slug` : 有給取得促進アイデア詳細
- `/sleep` : 睡眠改善テーマトップ
- `/sleep/ideas` : 睡眠改善アイデア一覧
- `/sleep/ideas/:slug` : 睡眠改善アイデア詳細

## セットアップ

```bash
npm install
```

Windows で Firebase CLI やフォント周りの挙動を安定させたい場合は WSL 利用を推奨します。

## 開発コマンド

```bash
npm run dev
```

## build

```bash
npm run build
```

Vite の成果物は `dist` に出力されます。

## preview

```bash
npm run preview
```

## Firebase Hosting

このリポジトリは既存の Firebase Hosting 設定を利用します。

- `firebase.json`
  - `public` は `dist`
  - SPA rewrite で `** -> /index.html`
  - `index.html` は `no-cache`
  - JS/CSS/画像/woff2 は長期キャッシュ
- `.firebaserc`
  - デフォルトプロジェクトは `paidleavesidea`

### デプロイ

```bash
npm run build
firebase deploy --only hosting
```

または

```bash
npm run deploy:hosting
```

### プレビュー確認

```bash
npm run build
npm run preview
```

ローカル preview では以下を直接確認してください。

- `http://localhost:4173/diagnostic`
- `http://localhost:4173/paid-leave`
- `http://localhost:4173/paid-leave/ideas`
- `http://localhost:4173/sleep`

## 主要ディレクトリ

```txt
src/
  app/          ルーター
  components/   layout / ideas / sections / ui
  data/         アイデア、パック、ロードマップ、診断データ
  lib/          フィルタ・推薦ロジック
  pages/        各ページコンポーネント
  types/        型定義
```
