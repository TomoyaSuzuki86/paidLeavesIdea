import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlarmClock,
  BellOff,
  Brain,
  Building2,
  Clock3,
  Coffee,
  Lightbulb,
  MoonStar,
  Search,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Stethoscope,
  Sunrise,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const ideas = [
  {
    id: 1,
    title: "夜間連絡を翌営業日配送に寄せる",
    summary:
      "完全禁止ではなく、夜間の通常連絡は翌営業日朝に届く運用へ寄せる。緊急連絡だけ例外とし、仕事が睡眠へ侵入しにくい状態を作る。",
    tags: ["低コスト", "勤務時間外連絡", "すぐ実装可"],
    cost: "低",
    impact: "高",
    novelty: "高",
    owner: "情報システム / 各部門",
    icon: BellOff,
    tone: "睡眠を守る即効策",
  },
  {
    id: 2,
    title: "睡眠不足者ではなく夜間稼働部署を先に特定する",
    summary:
      "個人の睡眠データを先に集めるのではなく、22時以降の送信や深夜会議など業務ログからリスク部署を特定し、構造要因を先に潰す。",
    tags: ["分析", "低コスト", "プライバシー配慮"],
    cost: "低",
    impact: "高",
    novelty: "高",
    owner: "人事 / 情報システム",
    icon: Building2,
    tone: "構造から直す",
  },
  {
    id: 3,
    title: "月1回の『午後回復枠』を固定する",
    summary:
      "午後会議を絞り、半休・早退・仮眠・通院・早寝準備に使える回復時間を定期的に確保する。丸一日休みに抵抗がある層にも導入しやすい。",
    tags: ["回復", "低コスト", "導入しやすい"],
    cost: "低",
    impact: "高",
    novelty: "中",
    owner: "人事 / 各部門",
    icon: Sunrise,
    tone: "軽く始めて広げる",
  },
  {
    id: 4,
    title: "勤務間インターバルの試行導入を特定部署から始める",
    summary:
      "全社一斉でなく、残業と夜間対応が多い部署から退勤〜翌始業の最低休息時間を試し、睡眠不足と疲労感の変化を確認する。",
    tags: ["制度設計", "回復", "管理職"],
    cost: "中",
    impact: "高",
    novelty: "中",
    owner: "人事 / 各部門長",
    icon: Clock3,
    tone: "制度から守る",
  },
  {
    id: 5,
    title: "就寝前スマホ利用を減らす『最後の15分』施策",
    summary:
      "教育を長くやるのではなく、就寝前15分だけ通知・チャット・動画視聴を減らすシンプルな行動目標を提示し、社内発信と連動させる。",
    tags: ["行動変容", "教育", "低コスト"],
    cost: "低",
    impact: "中",
    novelty: "中",
    owner: "人事",
    icon: Smartphone,
    tone: "続けやすい小さな改善",
  },
  {
    id: 6,
    title: "睡眠改善施策を管理職評価の補助指標にする",
    summary:
      "部下の睡眠時間そのものではなく、夜間連絡削減、会議終了時刻、回復時間確保など、睡眠を阻害しにくいマネジメント行動を評価する。",
    tags: ["管理職", "制度設計", "行動変容"],
    cost: "低",
    impact: "高",
    novelty: "高",
    owner: "人事 / 経営",
    icon: ShieldCheck,
    tone: "上司を動かす本丸",
  },
  {
    id: 7,
    title: "昼寝を福利厚生でなく安全対策として位置づける",
    summary:
      "短時間仮眠を『怠け』ではなく、午後の眠気やミスを減らす安全対策として見せる。許可の言い方を変えることで導入障壁を下げる。",
    tags: ["回復", "文化形成", "現場向け"],
    cost: "低",
    impact: "中",
    novelty: "高",
    owner: "各部門",
    icon: MoonStar,
    tone: "言い方で通しやすくする",
  },
  {
    id: 8,
    title: "『睡眠が足りない人』ではなく『眠気が強い時間帯』を聞く",
    summary:
      "調査票では睡眠不足の有無だけでなく、いつ眠気が強いかを聞き、会議配置やシフト調整に使える実務情報へ変換する。",
    tags: ["分析", "調査設計", "実務向け"],
    cost: "低",
    impact: "中",
    novelty: "高",
    owner: "人事",
    icon: Brain,
    tone: "調査を施策につなぐ",
  },
  {
    id: 9,
    title: "夜更かしを責めず『朝を削っている要因』から見る",
    summary:
      "通勤、家事、深夜連絡、就寝前作業など、睡眠時間を削っている現実要因を分解して可視化し、本人責任論に寄らない設計にする。",
    tags: ["調査設計", "文化形成", "低コスト"],
    cost: "低",
    impact: "中",
    novelty: "高",
    owner: "人事",
    icon: Lightbulb,
    tone: "責めない設計",
  },
  {
    id: 10,
    title: "カフェイン教育を『量』でなく『時刻』で伝える",
    summary:
      "飲み過ぎ注意ではなく、何時以降に摂ると睡眠へ響きやすいかを短く伝える。行動が変わりやすい単位で示す。",
    tags: ["教育", "低コスト", "生活習慣"],
    cost: "低",
    impact: "中",
    novelty: "中",
    owner: "人事 / 産業保健",
    icon: Coffee,
    tone: "すぐ試せる知識",
  },
  {
    id: 11,
    title: "睡眠相談の入口をEAPではなく『仕事の疲れ相談』に寄せる",
    summary:
      "睡眠障害や不眠という言葉に抵抗がある人向けに、入口表現を柔らかくし、産業保健や相談窓口へつなぎやすくする。",
    tags: ["相談導線", "文化形成", "産業保健"],
    cost: "低",
    impact: "中",
    novelty: "中",
    owner: "人事 / 産業保健",
    icon: Stethoscope,
    tone: "相談しやすさを上げる",
  },
  {
    id: 12,
    title: "朝会を『進捗確認の場』から『睡眠を削らない場』へ見直す",
    summary:
      "早朝固定の長い朝会が睡眠を削っていないかを見直し、頻度・長さ・時刻を再設計する。業務習慣の改善として導入しやすい。",
    tags: ["会議設計", "低コスト", "管理職"],
    cost: "低",
    impact: "中",
    novelty: "中",
    owner: "各部門 / 管理職",
    icon: Users,
    tone: "地味に効く見直し",
  },
];

const sections = ["すべて", "低コスト", "勤務時間外連絡", "管理職", "回復", "調査設計", "文化形成"];
const featured = [1, 2, 3];

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-full border border-[var(--line)] bg-[rgba(255,255,255,.72)] px-4 py-3 shadow-[0_10px_30px_-20px_rgba(0,0,0,.16)] backdrop-blur-sm">
      <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">{label}</div>
      <div className="mt-1 text-lg font-semibold text-[var(--text)]">{value}</div>
    </div>
  );
}

function FilterChip({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
        active
          ? "bg-[var(--accent)] text-white shadow-[0_10px_24px_-12px_rgba(0,113,227,.55)]"
          : "border border-[var(--line)] bg-[rgba(255,255,255,.76)] text-[var(--text)] hover:bg-white"
      }`}
    >
      {children}
    </button>
  );
}

function FeaturedCard({ idea, index }: { idea: (typeof ideas)[number]; index: number }) {
  const Icon = idea.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="h-full"
    >
      <Card className="h-full rounded-[30px] border-[var(--line)] bg-[rgba(255,255,255,.76)] shadow-[0_20px_50px_-30px_rgba(0,0,0,.18)] backdrop-blur-xl">
        <CardContent className="flex h-full flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
              <Icon className="h-5 w-5" />
            </div>
            <Badge className="rounded-full border-0 bg-[var(--accent-soft)] px-3 py-1 text-[11px] font-medium text-[var(--accent)] hover:bg-[var(--accent-soft)]">
              注目アイデア
            </Badge>
          </div>

          <div className="mt-5 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">{idea.tone}</div>
          <h3 className="mt-2 text-[26px] font-semibold leading-[1.25] tracking-[-0.03em] text-[var(--text)]">
            {idea.title}
          </h3>
          <p className="mt-3 text-[15px] leading-7 text-[var(--muted)]">{idea.summary}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {idea.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-[var(--chip)] px-3 py-1 text-xs font-medium text-[var(--subtle)]">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 text-center">
            {[
              ["コスト", idea.cost],
              ["効果", idea.impact],
              ["新しさ", idea.novelty],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-[var(--surface-soft)] px-3 py-3">
                <div className="text-[11px] text-[var(--muted)]">{label}</div>
                <div className="mt-1 text-sm font-semibold text-[var(--text)]">{value}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function IdeaTile({ idea, index }: { idea: (typeof ideas)[number]; index: number }) {
  const Icon = idea.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: index * 0.02 }}
      className="h-full"
    >
      <Card className="group h-full rounded-[28px] border-[var(--line)] bg-[rgba(255,255,255,.82)] shadow-[0_20px_45px_-28px_rgba(0,0,0,.14)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:bg-white">
        <CardContent className="flex h-full flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--surface-soft)] text-[var(--subtle)] transition-colors group-hover:bg-[var(--accent-soft)] group-hover:text-[var(--accent)]">
              <Icon className="h-5 w-5" />
            </div>
            <div className="rounded-full bg-[var(--chip)] px-3 py-1 text-[11px] font-medium text-[var(--muted)]">#{idea.id.toString().padStart(2, "0")}</div>
          </div>

          <div className="mt-5 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">{idea.tone}</div>
          <h4 className="mt-2 text-[22px] font-semibold leading-[1.32] tracking-[-0.03em] text-[var(--text)]">{idea.title}</h4>
          <p className="mt-3 text-[14px] leading-7 text-[var(--muted)]">{idea.summary}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {idea.tags.map((tag) => (
              <Badge key={tag} className="rounded-full border-0 bg-[var(--chip)] px-3 py-1 text-[12px] font-medium text-[var(--subtle)] hover:bg-[var(--chip)]">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2">
            {[
              ["コスト", idea.cost],
              ["効果", idea.impact],
              ["新しさ", idea.novelty],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-[var(--surface-soft)] px-3 py-3 text-center">
                <div className="text-[11px] text-[var(--muted)]">{label}</div>
                <div className="mt-1 text-sm font-semibold text-[var(--text)]">{value}</div>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-5 text-sm text-[var(--muted)]">
            担当主体 <span className="font-semibold text-[var(--text)]">{idea.owner}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function SleepSurveyIdeasMock() {
  const [active, setActive] = useState("すべて");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return ideas.filter((idea) => {
      const bySection =
        active === "すべて" ||
        idea.tags.includes(active) ||
        (active === "回復" && (idea.summary.includes("回復") || idea.title.includes("仮眠") || idea.title.includes("午後")));

      const text = `${idea.title} ${idea.summary} ${idea.tags.join(" ")} ${idea.owner} ${idea.tone}`.toLowerCase();
      const byQuery = text.includes(query.toLowerCase());
      return bySection && byQuery;
    });
  }, [active, query]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=M+PLUS+2:wght@400;500;600;700;800&display=swap');

        :root {
          --bg: #f5f5f7;
          --surface: rgba(255,255,255,.74);
          --surface-soft: #f0f3f7;
          --chip: #eef2f7;
          --text: #1d1d1f;
          --subtle: #3c3c43;
          --muted: #6e6e73;
          --line: rgba(29,29,31,.08);
          --accent: #0071e3;
          --accent-soft: #e8f2ff;
        }

        * {
          font-family: "Plus Jakarta Sans", "M PLUS 2", sans-serif;
        }

        .page-bg {
          position: relative;
          overflow: hidden;
        }

        .page-bg::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(circle at 12% 14%, rgba(0,113,227,.08), transparent 28%),
            radial-gradient(circle at 86% 10%, rgba(255,255,255,.82), transparent 24%),
            radial-gradient(circle at 50% 100%, rgba(0,113,227,.05), transparent 36%),
            linear-gradient(180deg, #fbfbfd 0%, #f5f5f7 100%);
          z-index: 0;
        }

        .hero-mesh {
          background:
            radial-gradient(circle at top left, rgba(255,255,255,.92), transparent 42%),
            radial-gradient(circle at bottom right, rgba(0,113,227,.10), transparent 36%),
            rgba(255,255,255,.56);
        }
      `}</style>

      <div className="page-bg relative">
        <div className="relative z-10 mx-auto max-w-[1320px] px-4 pb-16 pt-5 md:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-[34px] border border-[var(--line)] hero-mesh shadow-[0_30px_80px_-40px_rgba(0,0,0,.16)] backdrop-blur-xl"
          >
            <div className="px-6 py-6 md:px-10 md:py-8">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <AlarmClock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[var(--text)]">睡眠改善アイデア</div>
                    <div className="text-xs text-[var(--muted)]">Inspiration Mock</div>
                  </div>
                </div>
                <div className="hidden rounded-full bg-[rgba(255,255,255,.72)] px-4 py-2 text-sm text-[var(--muted)] shadow-[0_10px_24px_-20px_rgba(0,0,0,.2)] md:block">
                  眺めて発想を広げるためのモック
                </div>
              </div>

              <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
                    <Sparkles className="h-4 w-4" />
                    シンプルに、でも示唆は深く
                  </div>
                  <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-[-0.05em] text-[var(--text)] md:text-7xl">
                    睡眠課題を、
                    <br />
                    制度と運用の
                    <br />
                    アイデアでほどく。
                  </h1>
                  <p className="mt-6 max-w-2xl text-[16px] leading-8 text-[var(--muted)] md:text-[18px]">
                    生活習慣の一般論で終わらせず、勤務時間外連絡、管理職行動、会議設計、回復時間、相談導線など、
                    会社として打てる手に読み替えた睡眠改善アイデアを整理したモックです。
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  <StatPill label="アイデア数" value="12案" />
                  <StatPill label="注目施策" value="3案" />
                  <StatPill label="主な方向" value="低コスト" />
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {ideas
              .filter((idea) => featured.includes(idea.id))
              .map((idea, index) => (
                <FeaturedCard key={idea.id} idea={idea} index={index} />
              ))}
          </div>

          <div className="mt-10 rounded-[34px] border border-[var(--line)] bg-[rgba(255,255,255,.72)] shadow-[0_24px_60px_-36px_rgba(0,0,0,.14)] backdrop-blur-xl">
            <div className="px-6 py-6 md:px-8 md:py-8">
              <div className="flex flex-col gap-5 border-b border-[var(--line)] pb-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <div className="text-sm font-semibold text-[var(--text)]">アイデアライブラリ</div>
                    <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[var(--text)] md:text-5xl">
                      気になる論点から、
                      <br className="hidden md:block" />
                      すっと読める。
                    </h2>
                    <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[var(--muted)]">
                      個人責任論に寄らず、会社としてどこに手を打てるかが自然に見える構成。検索とカテゴリだけを残し、閲覧しやすさを優先しています。
                    </p>
                  </div>

                  <div className="relative w-full lg:w-[320px]">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="キーワードで探す"
                      className="h-12 rounded-full border-[var(--line)] bg-white pl-11 text-[var(--text)] placeholder:text-[var(--muted)]"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {sections.map((section) => (
                    <FilterChip key={section} active={active === section} onClick={() => setActive(section)}>
                      {section}
                    </FilterChip>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((idea, index) => (
                  <IdeaTile key={idea.id} idea={idea} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
