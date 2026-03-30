import type { SetupQuestion } from "../types/setup";

export const paidLeaveSetupQuestions: SetupQuestion[] = [
  {
    id: "challenge",
    title: "選択肢の中からあなたの抱えている課題を教えてください",
    options: [
      {
        id: "low-takers",
        label: "未取得者が後回しになっている",
        ideaSlugs: [
          "reserve-candidate-days-for-low-takers",
          "single-choice-reason-survey",
          "escalation-notice-ladder",
          "expiration-days-first-ui",
        ],
        signals: ["未取得者対応", "後回し防止"],
      },
      {
        id: "manager-barrier",
        label: "管理職が休暇取得を後押しできていない",
        ideaSlugs: [
          "manager-evaluation-for-time-off",
          "manager-checkin-template",
          "reserve-candidate-days-for-low-takers",
          "structure-review-meeting",
        ],
        signals: ["管理職", "判断基準の更新"],
      },
      {
        id: "recommendation-doesnt-work",
        label: "推奨日を置いても実際の取得につながらない",
        ideaSlugs: [
          "two-layer-recommended-days",
          "weekday-sensitive-recommendation",
          "monthly-leave-share-format",
          "reserve-candidate-days-for-low-takers",
        ],
        signals: ["推奨日", "運用設計"],
      },
      {
        id: "coverage-risk",
        label: "属人化や引継ぎ不安で休ませにくい",
        ideaSlugs: [
          "one-page-coverage-memo",
          "team-resilience-index",
          "meeting-exclusion-rule",
          "cover-log-visibility",
        ],
        signals: ["属人化", "引継ぎ負荷"],
      },
      {
        id: "short-leave-barrier",
        label: "半休や分散取得が広がらない",
        ideaSlugs: [
          "distributed-vacation-design",
          "afternoon-meeting-cut-day",
          "monthly-early-signoff-day",
          "visibility-rule-for-leave-days",
        ],
        signals: ["半休", "分散取得"],
      },
      {
        id: "visibility-issue",
        label: "失効や低取得の見え方が弱い",
        ideaSlugs: [
          "expiration-days-first-ui",
          "single-choice-reason-survey",
          "escalation-notice-ladder",
          "visibility-rule-for-leave-days",
        ],
        signals: ["見える化", "失効予防"],
      },
    ],
  },
  {
    id: "target",
    title: "最初に動かしたい相手を教えてください",
    options: [
      {
        id: "target-employee",
        label: "まずは本人の動きやすさを上げたい",
        ideaSlugs: [
          "reserve-candidate-days-for-low-takers",
          "reframe-leave-for-serious-workers",
          "distributed-vacation-design",
          "expiration-days-first-ui",
        ],
        signals: ["本人向け", "行動開始"],
      },
      {
        id: "target-manager",
        label: "管理職の止め方を変えたい",
        ideaSlugs: [
          "manager-evaluation-for-time-off",
          "manager-checkin-template",
          "reserve-candidate-days-for-low-takers",
          "structure-review-meeting",
        ],
        signals: ["管理職", "面談"],
      },
      {
        id: "target-team",
        label: "チーム全体の前提を変えたい",
        ideaSlugs: [
          "monthly-leave-share-format",
          "visibility-rule-for-leave-days",
          "meeting-exclusion-rule",
          "team-resilience-index",
        ],
        signals: ["チーム運用", "見え方"],
      },
      {
        id: "target-hr",
        label: "人事から制度の見せ方を変えたい",
        ideaSlugs: [
          "two-layer-recommended-days",
          "expiration-days-first-ui",
          "single-choice-reason-survey",
          "escalation-notice-ladder",
        ],
        signals: ["人事企画", "制度見直し"],
      },
      {
        id: "target-executive",
        label: "経営や制度オーナーを巻き込みたい",
        ideaSlugs: [
          "manager-evaluation-for-time-off",
          "structure-review-meeting",
          "team-resilience-index",
          "backward-calendar-before-peak",
        ],
        signals: ["経営巻き込み", "制度オーナー"],
      },
      {
        id: "target-cover",
        label: "代理対応者や周辺部署の負荷を下げたい",
        ideaSlugs: [
          "cover-log-visibility",
          "one-page-coverage-memo",
          "delay-non-urgent-contact",
          "meeting-exclusion-rule",
        ],
        signals: ["代理対応", "周辺部署"],
      },
    ],
  },
  {
    id: "approach",
    title: "今の組織で入れやすい打ち手を選んでください",
    options: [
      {
        id: "messaging",
        label: "文言や意味づけの変更から始めたい",
        ideaSlugs: [
          "reframe-leave-for-serious-workers",
          "manager-checkin-template",
          "visibility-rule-for-leave-days",
          "single-choice-reason-survey",
        ],
        signals: ["低コスト", "メッセージ設計"],
      },
      {
        id: "calendar-rule",
        label: "カレンダーや会議ルールなら変えやすい",
        ideaSlugs: [
          "meeting-exclusion-rule",
          "afternoon-meeting-cut-day",
          "monthly-leave-share-format",
          "backward-calendar-before-peak",
        ],
        signals: ["会議設計", "カレンダー"],
      },
      {
        id: "visualization",
        label: "通知や可視化を先に整えたい",
        ideaSlugs: [
          "expiration-days-first-ui",
          "escalation-notice-ladder",
          "cover-log-visibility",
          "visibility-rule-for-leave-days",
        ],
        signals: ["通知", "可視化"],
      },
      {
        id: "evaluation",
        label: "評価やレビューまで踏み込みたい",
        ideaSlugs: [
          "manager-evaluation-for-time-off",
          "structure-review-meeting",
          "team-resilience-index",
          "manager-checkin-template",
        ],
        signals: ["評価制度", "レビュー"],
      },
      {
        id: "pilot",
        label: "小さな実証実験から始めたい",
        ideaSlugs: [
          "reserve-candidate-days-for-low-takers",
          "two-layer-recommended-days",
          "distributed-vacation-design",
          "monthly-early-signoff-day",
        ],
        signals: ["パイロット", "小さく始める"],
      },
    ],
  },
  {
    id: "outcome",
    title: "最初の変化として近いものを選んでください",
    options: [
      {
        id: "outcome-booking",
        label: "休む予定を先に置ける状態を作りたい",
        ideaSlugs: [
          "reserve-candidate-days-for-low-takers",
          "monthly-leave-share-format",
          "backward-calendar-before-peak",
          "two-layer-recommended-days",
        ],
        signals: ["予定を先に置く", "申請前倒し"],
      },
      {
        id: "outcome-safe",
        label: "休んでも回る安心感を増やしたい",
        ideaSlugs: [
          "one-page-coverage-memo",
          "cover-log-visibility",
          "team-resilience-index",
          "delay-non-urgent-contact",
        ],
        signals: ["安心感", "業務継続"],
      },
      {
        id: "outcome-recommendation",
        label: "推奨日がちゃんと使われる流れを作りたい",
        ideaSlugs: [
          "two-layer-recommended-days",
          "weekday-sensitive-recommendation",
          "reserve-candidate-days-for-low-takers",
          "monthly-leave-share-format",
        ],
        signals: ["推奨日", "取得の流れ"],
      },
      {
        id: "outcome-flexible",
        label: "半休や短い休みをもっと取りやすくしたい",
        ideaSlugs: [
          "afternoon-meeting-cut-day",
          "distributed-vacation-design",
          "monthly-early-signoff-day",
          "meeting-exclusion-rule",
        ],
        signals: ["柔軟取得", "短時間休暇"],
      },
      {
        id: "outcome-structure",
        label: "休ませにくい構造そのものを点検したい",
        ideaSlugs: [
          "structure-review-meeting",
          "manager-evaluation-for-time-off",
          "team-resilience-index",
          "cover-log-visibility",
        ],
        signals: ["構造点検", "仕組みの見直し"],
      },
      {
        id: "outcome-expiration",
        label: "失効前に動ける見え方に変えたい",
        ideaSlugs: [
          "expiration-days-first-ui",
          "escalation-notice-ladder",
          "single-choice-reason-survey",
          "reserve-candidate-days-for-low-takers",
        ],
        signals: ["失効予防", "早期介入"],
      },
    ],
  },
];

export const paidLeaveSetupFallbackSlugs = [
  "reserve-candidate-days-for-low-takers",
  "manager-evaluation-for-time-off",
  "two-layer-recommended-days",
  "team-resilience-index",
  "meeting-exclusion-rule",
];
