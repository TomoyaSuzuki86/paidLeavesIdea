import type { SetupQuestion } from "../types/setup";

export const sleepSetupQuestions: SetupQuestion[] = [
  {
    id: "sleep-challenge",
    title: "選択肢の中からあなたの抱えている課題を教えてください",
    options: [
      { id: "late-night-contact", label: "夜間の連絡や会議が睡眠を削っている", ideaSlugs: ["delay-night-contacts", "review-meeting-times-for-sleep", "global-meeting-rotation", "identify-night-work-by-team"], signals: ["夜間連絡", "会議見直し"] },
      { id: "invisible-late-work", label: "遅い時間帯の負荷が見えず改善しづらい", ideaSlugs: ["identify-night-work-by-team", "delay-night-contacts", "manager-sleep-support-score", "trial-rest-interval"], signals: ["可視化", "負荷把握"] },
      { id: "recovery-is-late", label: "回復の時間を先に確保できていない", ideaSlugs: ["monthly-recovery-window", "sleep-safe-morning-meeting", "short-nap-as-safety-measure", "trial-rest-interval"], signals: ["回復設計", "先取り"] },
      { id: "manager-signal", label: "管理職が睡眠課題を扱いにくい", ideaSlugs: ["manager-sleep-support-score", "trial-rest-interval", "identify-night-work-by-team", "sleep-safe-morning-meeting"], signals: ["管理職", "面談導線"] },
      { id: "global-team", label: "時差や多拠点連携で生活リズムが崩れやすい", ideaSlugs: ["global-meeting-rotation", "delay-night-contacts", "identify-night-work-by-team", "monthly-recovery-window"], signals: ["時差対応", "多拠点連携"] },
      { id: "hard-to-start", label: "重い制度ではなく小さく試せる策から始めたい", ideaSlugs: ["delay-night-contacts", "monthly-recovery-window", "short-nap-as-safety-measure", "sleep-safe-morning-meeting"], signals: ["小さく始める", "低コスト"] },
    ],
  },
  {
    id: "sleep-target",
    title: "最初に変えたい相手や場面を選んでください",
    options: [
      { id: "sleep-target-team", label: "チームの日々の運用を変えたい", ideaSlugs: ["delay-night-contacts", "review-meeting-times-for-sleep", "sleep-safe-morning-meeting", "monthly-recovery-window"], signals: ["チーム運用", "日々の習慣"] },
      { id: "sleep-target-manager", label: "管理職の見方や声かけを変えたい", ideaSlugs: ["manager-sleep-support-score", "trial-rest-interval", "identify-night-work-by-team", "monthly-recovery-window"], signals: ["管理職", "観察と対話"] },
      { id: "sleep-target-hr", label: "人事から見える化や制度導線を整えたい", ideaSlugs: ["identify-night-work-by-team", "monthly-recovery-window", "global-meeting-rotation", "trial-rest-interval"], signals: ["人事企画", "制度導線"] },
      { id: "sleep-target-global", label: "時差をまたぐ会議や連携を調整したい", ideaSlugs: ["global-meeting-rotation", "delay-night-contacts", "review-meeting-times-for-sleep", "identify-night-work-by-team"], signals: ["時差", "グローバル運用"] },
      { id: "sleep-target-individual", label: "本人が回復時間を取りやすくしたい", ideaSlugs: ["monthly-recovery-window", "short-nap-as-safety-measure", "sleep-safe-morning-meeting", "trial-rest-interval"], signals: ["本人向け", "回復時間"] },
    ],
  },
  {
    id: "sleep-approach",
    title: "入れやすい打ち手を選んでください",
    options: [
      { id: "sleep-approach-rule", label: "会議や連絡ルールから整えたい", ideaSlugs: ["delay-night-contacts", "review-meeting-times-for-sleep", "global-meeting-rotation", "sleep-safe-morning-meeting"], signals: ["ルール変更", "会議設計"] },
      { id: "sleep-approach-visibility", label: "まずは負荷の見える化から入りたい", ideaSlugs: ["identify-night-work-by-team", "manager-sleep-support-score", "trial-rest-interval", "delay-night-contacts"], signals: ["可視化", "モニタリング"] },
      { id: "sleep-approach-recovery", label: "回復時間を先に置く設計をしたい", ideaSlugs: ["monthly-recovery-window", "sleep-safe-morning-meeting", "short-nap-as-safety-measure", "trial-rest-interval"], signals: ["回復設計", "スケジュール先取り"] },
      { id: "sleep-approach-pilot", label: "短い実証実験として始めたい", ideaSlugs: ["delay-night-contacts", "monthly-recovery-window", "trial-rest-interval", "sleep-safe-morning-meeting"], signals: ["パイロット", "短期間検証"] },
      { id: "sleep-approach-management", label: "管理職の判断材料を増やしたい", ideaSlugs: ["manager-sleep-support-score", "identify-night-work-by-team", "trial-rest-interval", "monthly-recovery-window"], signals: ["管理職", "判断材料"] },
    ],
  },
];

export const sleepSetupFallbackSlugs = ["delay-night-contacts", "identify-night-work-by-team", "monthly-recovery-window", "manager-sleep-support-score", "global-meeting-rotation"];
