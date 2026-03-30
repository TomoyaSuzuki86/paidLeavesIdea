import type { ThemeMeta } from "../types/idea";

export const themes: ThemeMeta[] = [
  {
    key: "paid-leave",
    label: "有給取得促進",
    shortLabel: "有給",
    basePath: "/paid-leave",
    description: "日本ナレッジスペース株式会社の有給取得を、制度・運用・管理職行動まで落として読めるライブラリ",
    heroTitle: "日本ナレッジスペース株式会社の有給取得促進を、制度案の粒度まで読めるテーマ。",
    heroDescription:
      "低取得者対策、管理職施策、推奨日設計、属人化対策まで、日本ナレッジスペース株式会社の会議体や運用設計へ載せやすい粒度で整理しています。",
    focusLabel: "低取得者 / 管理職 / 推奨日設計",
    entrySummary: "日本ナレッジスペース株式会社の制度化に寄せた比較に強い",
    topHighlights: ["低取得者を減らす", "管理職を動かす", "推奨日を機能させる"],
  },
  {
    key: "sleep",
    label: "睡眠調査・睡眠改善",
    shortLabel: "睡眠",
    basePath: "/sleep",
    description: "日本ナレッジスペース株式会社のデスクワークから運用・支援業務までを見据えて、会社として睡眠課題へどう介入するかを読むライブラリ",
    heroTitle: "日本ナレッジスペース株式会社の睡眠課題への介入策を、運用改善として読めるテーマ。",
    heroDescription:
      "勤務時間外の送信や対応、遅い時間帯の会議、繁忙案件後の回復、相談導線、産業保健連携まで、デスクワークから運用・支援業務までの回復を守る実務施策として整理しています。",
    focusLabel: "勤務時間外の送信 / 回復時間 / 管理職行動",
    entrySummary: "デスクワークから運用・支援業務までの回復設計に強い",
    topHighlights: ["勤務時間外の送信を減らす", "回復時間を守る", "相談導線を作る"],
  },
];

export const themeMap = Object.fromEntries(themes.map((theme) => [theme.key, theme])) as Record<
  ThemeMeta["key"],
  ThemeMeta
>;
