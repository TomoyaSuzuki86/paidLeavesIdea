# ナレッジサービス アイデアライブラリ

有給取得促進と睡眠改善をテーマにした React + Vite 製の静的サイトです。  
`/paid-leave` は質問を 1 問ずつ進めるセットアップ体験、`/paid-leave/ideas` と `/sleep/*` は既存のライブラリ閲覧導線として構成しています。

## ルート構成

- `/` : テーマ一覧
- `/paid-leave` : 有給取得促進のセットアップ体験
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

ローカル preview を開いた状態で、以下の URL を直接確認してください。

- `http://localhost:4173/paid-leave`
- `http://localhost:4173/paid-leave/ideas`
- `http://localhost:4173/paid-leave/ideas/reserve-candidate-days-for-low-takers`

## 主要ディレクトリ

```txt
src/
  app/          ルーター
  components/   layout / ideas / sections / ui
  data/         アイデア、パック、ロードマップ、質問データ
  lib/          フィルタ・推薦ロジック
  pages/        各ページコンポーネント
  types/        型定義
```

## 今回追加した主な構成

- `src/pages/PaidLeaveSetupPage.tsx`
  - 有給取得促進トップ用のセットアップ体験
- `src/data/paidLeaveSetup.ts`
  - 質問と選択肢の定義
- `src/lib/paidLeaveSetup.ts`
  - 回答から施策候補を絞るロジック
- `src/types/setup.ts`
  - セットアップ画面用の型
