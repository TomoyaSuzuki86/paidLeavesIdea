import { ScrollReveal } from "../ui/ScrollReveal";

interface IdeaFilterBarProps {
  eyebrow: string;
  title: string;
  description: string;
  placeholder: string;
  currentSummary: string;
  comparisonHint: string;
  query: string;
  onQueryChange: (value: string) => void;
  activeTag: string;
  onTagChange: (value: string) => void;
  onClearFilters: () => void;
  tags: string[];
  resultCount: number;
}

export function IdeaFilterBar({
  eyebrow,
  title,
  description,
  placeholder,
  currentSummary,
  comparisonHint,
  query,
  onQueryChange,
  activeTag,
  onTagChange,
  onClearFilters,
  tags,
  resultCount,
}: IdeaFilterBarProps) {
  const canClear = Boolean(query.trim()) || activeTag !== "すべて";

  return (
    <ScrollReveal as="section" className="filter-panel" aria-label="アイデアの絞り込み">
      <div className="filter-panel-top">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="filter-copy">{description}</p>
          <div className="filter-meta">
            <p className="filter-hint">{comparisonHint}</p>
            <p className="result-meta">{currentSummary}</p>
          </div>
        </div>
        <div className="search-controls">
          <label className="search-field">
            <span className="sr-only">アイデアを検索</span>
            <input
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder={placeholder}
            />
          </label>
          <button className="button button-secondary filter-clear" type="button" onClick={onClearFilters} disabled={!canClear}>
            条件をクリア
          </button>
        </div>
      </div>

      <div className="filter-chip-row" role="tablist" aria-label="タグ絞り込み">
        {tags.map((tag) => (
          <button
            key={tag}
            className={`filter-chip${activeTag === tag ? " is-active" : ""}`}
            onClick={() => onTagChange(tag)}
            type="button"
          >
            {tag}
          </button>
        ))}
      </div>

      <p className="result-meta">{resultCount}件を表示中</p>
    </ScrollReveal>
  );
}
