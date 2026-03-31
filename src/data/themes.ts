import type { ThemeMeta } from "../types/idea";

export const themes: ThemeMeta[] = [
  {
    key: "paid-leave",
    label: "有給取得促進",
    shortLabel: "有給",
    basePath: "/paid-leave",
    description: "JKS の有給取得を、制度・運用・管理職の動きまでまとめて見られるライブラリ",
    heroTitle: "JKS の有給取得促進を、制度案として見やすくしたテーマ。",
    heroDescription:
      "低取得者対策、管理職向け施策、推奨日の決め方、属人化への対処まで、会議でそのまま話せる粒度で整理しています。",
    focusLabel: "低取得者 / 管理職 / 推奨日",
    entrySummary: "制度案を比べやすい",
    topHighlights: ["低取得者を減らす", "管理職を動かす", "推奨日を機能させる"],
  },
  {
    key: "sleep",
    label: "睡眠調査・睡眠改善",
    shortLabel: "睡眠",
    basePath: "/sleep",
    description: "JKS のデスクワークから運用・支援業務まで、睡眠課題をどう見直すかをまとめたライブラリ",
    heroTitle: "JKS の睡眠課題を、運用改善として見やすくしたテーマ。",
    heroDescription:
      "勤務時間外の連絡、遅い時間帯の会議、繁忙案件のあとに休めるかどうか、相談の入り口まで、現場で使いやすい形で整理しています。",
    focusLabel: "勤務時間外の連絡 / 回復時間 / 管理職",
    entrySummary: "運用改善の話にしやすい",
    topHighlights: ["勤務時間外の連絡を減らす", "回復時間を守る", "相談の入り口を作る"],
  },
];

export const themeMap = Object.fromEntries(themes.map((theme) => [theme.key, theme])) as Record<
  ThemeMeta["key"],
  ThemeMeta
>;
