interface IdeaFilterBarProps {
  eyebrow: string;
  title: string;
  description: string;
  placeholder: string;
  query: string;
  onQueryChange: (value: string) => void;
  activeTag: string;
  onTagChange: (value: string) => void;
  tags: string[];
  resultCount: number;
}

export function IdeaFilterBar({
  eyebrow,
  title,
  description,
  placeholder,
  query,
  onQueryChange,
  activeTag,
  onTagChange,
  tags,
  resultCount,
}: IdeaFilterBarProps) {
  return (
    <section className="filter-panel" aria-label="アイデア絞り込み">
      <div className="filter-panel-top">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="filter-copy">{description}</p>
        </div>
        <label className="search-field">
          <span className="sr-only">アイデアを検索</span>
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={placeholder}
          />
        </label>
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
    </section>
  );
}
