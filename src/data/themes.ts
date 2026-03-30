import type { ThemeMeta } from "../types/idea";

export const themes: ThemeMeta[] = [
  {
    key: "paid-leave",
    label: "有給取得促進",
    shortLabel: "有給",
    basePath: "/paid-leave",
    description: "ナレッジスペースの有給取得を、制度・運用・管理職行動まで落として読めるライブラリ",
    heroTitle: "ナレッジスペースの有給取得促進を、制度案の粒度まで読めるテーマ。",
    heroDescription:
      "低取得者対策、管理職施策、推奨日設計、属人化対策まで、ナレッジスペースの会議体や運用設計へ載せやすい粒度で整理しています。",
    focusLabel: "低取得者 / 管理職 / 推奨日設計",
    entrySummary: "ナレッジスペースの制度化に寄せた比較に強い",
    topHighlights: ["低取得者を減らす", "管理職を動かす", "推奨日を機能させる"],
  },
  {
    key: "sleep",
    label: "睡眠調査・睡眠改善",
    shortLabel: "睡眠",
    basePath: "/sleep",
    description: "ナレッジスペースの知識労働に合わせて、会社として睡眠課題へどう介入するかを読むライブラリ",
    heroTitle: "ナレッジスペースの睡眠課題への介入策を、運用改善として読めるテーマ。",
    heroDescription:
      "夜間連絡、遅い会議、繁忙案件後の回復、相談導線、産業保健連携まで、知識労働の回復を守る実務施策として整理しています。",
    focusLabel: "夜間連絡 / 回復時間 / 管理職行動",
    entrySummary: "知識労働の回復設計と構造改善に強い",
    topHighlights: ["夜間侵入を減らす", "回復時間を守る", "相談導線を作る"],
  },
];

export const themeMap = Object.fromEntries(themes.map((theme) => [theme.key, theme])) as Record<
  ThemeMeta["key"],
  ThemeMeta
>;
