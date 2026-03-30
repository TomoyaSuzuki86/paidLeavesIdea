interface IdeaFilterBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  activeTag: string;
  onTagChange: (value: string) => void;
  tags: string[];
  resultCount: number;
}

export function IdeaFilterBar({
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
          <p className="eyebrow">Idea Library</p>
          <h1>比較しながら選べる一覧</h1>
          <p className="filter-copy">
            タイトルや課題語で検索し、タグで切り口を絞れます。カード上でコスト、効果感、新規性、主担当まで比較できます。
          </p>
        </div>
        <label className="search-field">
          <span className="sr-only">アイデアを検索</span>
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="例: 管理職 / 推奨日 / 半休 / 属人化"
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
