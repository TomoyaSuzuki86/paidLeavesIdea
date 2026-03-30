# ナレッジスペース知見ライブラリ

日本ナレッジスペース株式会社向けに、「有給取得促進」と「睡眠調査・睡眠改善」の2テーマを同じ UI と同じ情報設計で読める静的サイトです。  
制度改善、会議設計、管理職行動、回復設計まで、会議に持ち込みやすい粒度で比較できる構成にしています。

## テーマ構成

- `/` : 2テーマの入口
- `/paid-leave` : 有給取得促進テーマのトップ
- `/paid-leave/ideas` : 有給アイデア一覧
- `/paid-leave/ideas/:slug` : 有給アイデア詳細
- `/sleep` : 睡眠調査・睡眠改善テーマのトップ
- `/sleep/ideas` : 睡眠アイデア一覧
- `/sleep/ideas/:slug` : 睡眠アイデア詳細

旧ルート `/ideas` と `/ideas/:slug` は、有給テーマへリダイレクトします。

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

Firebase Hosting は `firebase.json` で `dist` を公開ディレクトリにし、SPA rewrite によって `/paid-leave/ideas/:slug` や `/sleep/ideas/:slug` の直アクセスにも対応しています。

## 主要ディレクトリ

```txt
src/
  app/          ルーター
  components/   レイアウト、セクション、アイデア関連 UI
  data/         テーマ情報、アイデア、Packs、Roadmap の静的データ
  lib/          フィルタ関数
  pages/        Home / Theme Home / Ideas / Idea Detail
  types/        Idea, Theme, Pack, Roadmap の型定義
```

## データ追加ルール

- アイデアはコンポーネントへ直書きせず、`src/data/paidLeaveIdeas.ts` と `src/data/sleepIdeas.ts` に置きます。
- 型は `src/types/idea.ts` を基準にし、一覧表示用と詳細表示用の情報を同じオブジェクトで持たせます。
- 新テーマを追加する場合は、`src/data/themes.ts` と `src/data/libraries.ts` にテーマメタを登録し、UI は共通コンポーネントで吸収します。
- 詳細ページでは「何を解決するか」「なぜ効くのか」「どう運用するか」「想定リスク」「まず何から始めるか」「KPI例」「社内での伝え方例」を最低限そろえます。

## 共通コンポーネント方針

- `Hero`
- `FeaturedIdeas`
- `IdeaFilterBar`
- `IdeaGrid`
- `IdeaCard`
- `IdeaDetailLayout`
- `RelatedIdeas`
- `PacksSection`
- `RoadmapSection`

テーマ差分は文言、色味、データで吸収し、UI 骨格は共通化しています。

## 実装メモ

- ルーティングは React Router で管理しています。
- Firebase Hosting は SPA rewrite でテーマ詳細 URL の直アクセスに対応しています。
- フォントは `Manrope` と `Noto Sans JP` を `index.html` から読み込みます。
- Windows ではファイル監視や Firebase CLI の安定性を考え、WSL 利用を推奨します。
