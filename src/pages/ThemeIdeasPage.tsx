import { useMemo, useState } from "react";
import { IdeaFilterBar } from "../components/ideas/IdeaFilterBar";
import { IdeaGrid } from "../components/ideas/IdeaGrid";
import { getLibrary } from "../data/libraries";
import { ALL_TAG, filterIdeas, getAllTags } from "../lib/filters";
import type { ThemeKey } from "../types/idea";

interface ThemeIdeasPageProps {
  themeKey: ThemeKey;
}

export function ThemeIdeasPage({ themeKey }: ThemeIdeasPageProps) {
  const library = getLibrary(themeKey);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState(ALL_TAG);
  const tags = [ALL_TAG, ...getAllTags(library.ideas)];

  const filteredIdeas = useMemo(() => filterIdeas(library.ideas, query, activeTag), [library.ideas, query, activeTag]);
  const currentSummary = `現在の条件: 検索「${query.trim() || "なし"}」 / タグ「${activeTag}」`;
  const comparisonHint = "一覧ではタグ、コスト感、効果感、新規性、主担当を横並びで比較できます。";

  return (
    <main className={`page theme-page theme-${themeKey}`}>
      <section className="section">
        <div className="shell">
          <IdeaFilterBar
            eyebrow={`${library.theme.label} ライブラリ`}
            title={`${library.theme.shortLabel}アイデアを比較しながら選ぶ`}
            description="検索とタグで絞り込みながら、制度化しやすい粒度まで落ちた施策を比較できます。"
            placeholder={themeKey === "paid-leave" ? "例: 管理職 / 推奨日 / 半休 / 属人化" : "例: 夜間連絡 / 回復 / 会議 / 時差"}
            currentSummary={currentSummary}
            comparisonHint={comparisonHint}
            query={query}
            onQueryChange={setQuery}
            activeTag={activeTag}
            onTagChange={setActiveTag}
            onClearFilters={() => {
              setQuery("");
              setActiveTag(ALL_TAG);
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
