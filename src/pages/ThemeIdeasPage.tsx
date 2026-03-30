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

  return (
    <main className={`page theme-page theme-${themeKey}`}>
      <section className="section">
        <div className="shell">
          <IdeaFilterBar
            eyebrow={`${library.theme.label} Library`}
            title={`${library.theme.shortLabel}アイデアを比較しながら選ぶ`}
            description={`${library.theme.shortLabel}に関する施策を、タグと検索で絞り込みながら比較できます。株式会社ナレッジスペースの会議設計、制度設計、管理職運用に接続しやすい切り口へ寄せています。`}
            placeholder={themeKey === "paid-leave" ? "例: 管理職 / 推奨日 / 半休 / 属人化" : "例: 夜間連絡 / 会議設計 / 回復 / 相談"}
            query={query}
            onQueryChange={setQuery}
            activeTag={activeTag}
            onTagChange={setActiveTag}
            tags={tags}
            resultCount={filteredIdeas.length}
          />
          <IdeaGrid ideas={filteredIdeas} themeKey={themeKey} />
        </div>
      </section>
    </main>
  );
}
