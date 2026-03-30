import type { IdeaPack } from "../types/idea";

export const packs: IdeaPack[] = [
  {
    slug: "low-cost-starter-pack",
    title: "低コストでまず始める 3点セット",
    summary: "大きな制度改定を待たずに、今ある運用で着手しやすい組み合わせです。",
    audience: "まずは小さく始めたい人事企画",
    whyThisPack: "候補日設定、共有、引継ぎの三点を押さえると、取得の最初の詰まりを解きやすい。",
    ideaSlugs: [
      "reserve-candidate-days-for-low-takers",
      "monthly-leave-share-format",
      "one-page-coverage-memo",
    ],
  },
  {
    slug: "low-taker-recovery-pack",
    title: "低取得者に効かせる 3点セット",
    summary: "未取得の固定化を止め、本人任せから組織対応へ切り替える構成です。",
    audience: "失効見込み者が毎年同じ会社",
    whyThisPack: "見える化、候補日、段階通知をつなぐと、放置が起きにくくなる。",
    ideaSlugs: [
      "expiration-days-first-ui",
      "reserve-candidate-days-for-low-takers",
      "escalation-notice-ladder",
    ],
  },
  {
    slug: "manager-mobilization-pack",
    title: "管理職を動かす 3点セット",
    summary: "休暇取得を文化論で終わらせず、管理職の行動と評価に落とす構成です。",
    audience: "上司の差で取得しやすさが変わる組織",
    whyThisPack: "評価、面談、構造レビューを揃えると、マネジメント起因の阻害要因に手を入れやすい。",
    ideaSlugs: [
      "manager-evaluation-for-time-off",
      "manager-checkin-template",
      "structure-review-meeting",
    ],
  },
  {
    slug: "recommended-days-pack",
    title: "推奨日を本気で機能させる組み合わせ",
    summary: "単発イベントで終わらせず、対象者別に効かせるための設計です。",
    audience: "推奨日運用を刷新したい人事",
    whyThisPack: "全社日、個別日、繁忙前の逆算を合わせると、取得実行率が上がりやすい。",
    ideaSlugs: [
      "two-layer-recommended-days",
      "weekday-sensitive-recommendation",
      "backward-calendar-before-peak",
    ],
  },
  {
    slug: "anti-bottleneck-pack",
    title: "属人化を崩して休みやすくする組み合わせ",
    summary: "休暇の議論をきっかけに、業務継続性そのものを整える構成です。",
    audience: "休むと周囲が苦しくなる感覚が強いチーム",
    whyThisPack: "引継ぎ、代理負荷、チーム健全性を一緒に見ると、ボトルネックが具体化する。",
    ideaSlugs: ["one-page-coverage-memo", "cover-log-visibility", "team-resilience-index"],
  },
];
