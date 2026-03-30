import { useMemo, useState } from "react";
import { IdeaFilterBar } from "../components/ideas/IdeaFilterBar";
import { IdeaGrid } from "../components/ideas/IdeaGrid";
import { ideas } from "../data/ideas";
import { filterIdeas, getAllTags } from "../lib/filters";

const allTags = ["すべて", ...getAllTags(ideas)];

export function IdeasPage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("すべて");

  const filteredIdeas = useMemo(() => filterIdeas(ideas, query, activeTag), [query, activeTag]);

  return (
    <main className="page">
      <section className="section">
        <div className="shell">
          <IdeaFilterBar
            query={query}
            onQueryChange={setQuery}
            activeTag={activeTag}
            onTagChange={setActiveTag}
            tags={allTags}
            resultCount={filteredIdeas.length}
          />
          <IdeaGrid ideas={filteredIdeas} />
        </div>
      </section>
    </main>
  );
}
