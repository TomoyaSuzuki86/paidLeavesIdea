import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  BellRing,
  Briefcase,
  CalendarDays,
  ClipboardList,
  Eye,
  Flag,
  Layers3,
  Lightbulb,
  MessageSquareMore,
  Search,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const ideas = [
  {
    id: 1,
    title: "未取得者だけ有給候補日を先に仮押さえする",
    summary:
      "申請させるのではなく、先に候補日を入れておき、本人は『そのまま休む・変更する・今月は見送る』を選ぶだけにする。",
    tags: ["低コスト", "低取得者向け", "すぐ実装可"],
    cost: "低",
    impact: "高",
    novelty: "高",
    owner: "人事 / 管理職",
    icon: CalendarDays,
    tone: "未取得者に最も効く",
  },
  {
    id: 2,
    title: "休ませた管理職を評価する",
    summary:
      "取得率ではなく『低取得者を減らしたか』『休んでも回る体制を作れたか』を管理職評価の一部に入れる。",
    tags: ["管理職", "制度設計", "行動変容"],
    cost: "低",
    impact: "高",
    novelty: "高",
    owner: "人事 / 経営",
    icon: BadgeCheck,
    tone: "上司を動かす本丸",
  },
  {
    id: 3,
    title: "有給推奨日を『全社日＋個別日』の二層にする",
    summary:
      "全社で空気を作る日と、未取得者だけに追加で入れる個別推奨日を分けて設計する。",
    tags: ["推奨日", "空気づくり", "未取得対策"],
    cost: "低",
    impact: "高",
    novelty: "中",
    owner: "人事",
    icon: Layers3,
    tone: "空気と実務を両立",
  },
  {
    id: 4,
    title: "休暇前日15時以降は新規依頼を原則止める",
    summary:
      "休む直前に仕事が流れ込む状態を止め、休暇取得の心理的ハードルを下げる。",
    tags: ["業務設計", "属人化対策", "現場向け"],
    cost: "低",
    impact: "高",
    novelty: "中",
    owner: "各部門",
    icon: ShieldCheck,
    tone: "現場の摩擦を消す",
  },
  {
    id: 5,
    title: "『明日休んでも回るメモ』を全員1ページだけ持つ",
    summary:
      "担当業務・連絡先・注意点だけを1ページにし、毎週5分で更新する。長文マニュアル化しないのがポイント。",
    tags: ["引継ぎ", "低コスト", "実務向け"],
    cost: "低",
    impact: "中",
    novelty: "高",
    owner: "各部門",
    icon: ClipboardList,
    tone: "属人化を細く切る",
  },
  {
    id: 6,
    title: "未取得理由を自由記述でなく一問選択式で取る",
    summary:
      "『代わりがいない』『前後に仕事が詰まる』『上司に言いづらい』などを固定選択肢で取得し、部署別の真因を見える化する。",
    tags: ["分析", "運用しやすい", "改善起点"],
    cost: "低",
    impact: "中",
    novelty: "中",
    owner: "人事",
    icon: Eye,
    tone: "改善の入口を作る",
  },
  {
    id: 7,
    title: "休暇日に届く連絡を翌営業日配信に寄せる",
    summary:
      "完全禁止ではなく、休暇者宛ての連絡は翌営業日に届く運用に寄せ、回復を邪魔しにくくする。",
    tags: ["回復", "運用ルール", "IT活用"],
    cost: "低",
    impact: "中",
    novelty: "高",
    owner: "情報システム / 各部門",
    icon: BellRing,
    tone: "休みを本当に休みにする",
  },
  {
    id: 8,
    title: "『1日休んでも回る率』をチームの健全性指標にする",
    summary:
      "有給取得そのものだけでなく、誰かが休んだ日でも納期や問い合わせ対応が崩れないかをチーム評価に入れる。",
    tags: ["組織設計", "再現性", "属人化対策"],
    cost: "低",
    impact: "高",
    novelty: "高",
    owner: "経営 / 各部門",
    icon: Users,
    tone: "文化を仕組みに変える",
  },
  {
    id: 9,
    title: "月1回『昼から解散しやすい日』を固定する",
    summary:
      "午後会議を絞り、半休・早退・静かな回復時間に使いやすい日を作る。丸一日休みに抵抗がある層にも効く。",
    tags: ["回復", "半休", "導入しやすい"],
    cost: "低",
    impact: "中",
    novelty: "中",
    owner: "人事 / 各部門",
    icon: TimerReset,
    tone: "軽く始めて広げる",
  },
  {
    id: 10,
    title: "『予定がないから休まない人』向けに意味づけを変える",
    summary:
      "有給を福利厚生ではなく、属人化を減らす訓練・回復維持・チーム健全性の確認として伝える。",
    tags: ["伝え方", "文化形成", "低取得者向け"],
    cost: "低",
    impact: "中",
    novelty: "高",
    owner: "人事 / 管理職",
    icon: MessageSquareMore,
    tone: "真面目な人に効く",
  },
  {
    id: 11,
    title: "未取得者の通知は『本人→本人＋上司→本人＋上司＋人事』の段階制",
    summary:
      "個人の問題として終わらせず、組織対応に切り替えるための段階的なエスカレーションを設ける。",
    tags: ["通知設計", "管理職", "実務運用"],
    cost: "低",
    impact: "中",
    novelty: "中",
    owner: "人事",
    icon: Flag,
    tone: "放置を防ぐ",
  },
  {
    id: 12,
    title: "推奨日を『休みやすい曜日』へ寄せて設計する",
    summary:
      "祝日前後、繁忙を外した火曜・木曜など、現場が受け入れやすい日取りに推奨日を置く。",
    tags: ["推奨日", "実装しやすい", "地味に効く"],
    cost: "低",
    impact: "中",
    novelty: "中",
    owner: "人事 / 各部門",
    icon: Briefcase,
    tone: "反発が少ない",
  },
];

const sections = ["すべて", "低コスト", "低取得者向け", "管理職", "推奨日", "属人化対策", "文化形成"];
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

export default function PaidLeaveIdeasMock() {
  const [active, setActive] = useState("すべて");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return ideas.filter((idea) => {
      const bySection =
        active === "すべて" ||
        idea.tags.includes(active) ||
        (active === "属人化対策" && (idea.title.includes("回る") || idea.summary.includes("属人化") || idea.summary.includes("引継ぎ")));

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
                    <Lightbulb className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[var(--text)]">有給取得促進アイデア</div>
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
                    シンプルに、でも普通ではない見え方
                  </div>
                  <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-[-0.05em] text-[var(--text)] md:text-7xl">
                    企画担当が、
                    <br />
                    すぐ拾いたくなる
                    <br />
                    アイデアの並べ方。
                  </h1>
                  <p className="mt-6 max-w-2xl text-[16px] leading-8 text-[var(--muted)] md:text-[18px]">
                    条件診断や自動出力は持たせず、まずは閲覧に集中。
                    Appleのプロダクトページのように、余白・透明感・読みやすさで魅せながら、
                    企画の種が自然と目に入る構成へ寄せています。
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
                      気になる切り口から、
                      <br className="hidden md:block" />
                      すっと読める。
                    </h2>
                    <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[var(--muted)]">
                      情報量は落とさず、視線の流れは軽く。検索とカテゴリだけを残し、発想を邪魔する要素を削っています。
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
