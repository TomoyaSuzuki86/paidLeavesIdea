import { useMemo, useState } from "react";
import { IdeaFilterBar } from "../components/ideas/IdeaFilterBar";
import { IdeaGrid } from "../components/ideas/IdeaGrid";
import { getLibrary } from "../data/libraries";
import { filterIdeas, getAllTags } from "../lib/filters";
import type { ThemeKey } from "../types/idea";

interface ThemeIdeasPageProps {
  themeKey: ThemeKey;
}

export function ThemeIdeasPage({ themeKey }: ThemeIdeasPageProps) {
  const library = getLibrary(themeKey);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("すべて");
  const tags = ["すべて", ...getAllTags(library.ideas)];

  const filteredIdeas = useMemo(() => filterIdeas(library.ideas, query, activeTag), [library.ideas, query, activeTag]);
  const currentSummary = `現在の条件: 検索「${query.trim() || "なし"}」 / タグ「${activeTag}」`;
  const comparisonHint = "比較の見方: 要約 → タグ → コスト感 / 効果感 / 新規性 / 主担当";

  return (
    <main className={`page theme-page theme-${themeKey}`}>
      <section className="section">
        <div className="shell">
          <IdeaFilterBar
            eyebrow={`${library.theme.label} ライブラリ`}
            title={`${library.theme.shortLabel}アイデアを比較しながら選ぶ`}
            description={`${library.theme.shortLabel}に関する施策を、タグと検索で絞り込みながら比較できます。日本ナレッジスペース株式会社の会議設計、制度設計、管理職運用に接続しやすい切り口へ寄せています。`}
            placeholder={themeKey === "paid-leave" ? "例: 管理職 / 推奨日 / 半休 / 属人化" : "例: 勤務時間外の送信 / 会議設計 / 回復 / 相談"}
            currentSummary={currentSummary}
            comparisonHint={comparisonHint}
            query={query}
            onQueryChange={setQuery}
            activeTag={activeTag}
            onTagChange={setActiveTag}
            onClearFilters={() => {
              setQuery("");
              setActiveTag("すべて");
            }}
            tags={tags}
            resultCount={filteredIdeas.length}
          />
          <IdeaGrid ideas={filteredIdeas} themeKey={themeKey} />
        </div>
      </section>
    </main>
  );
}
