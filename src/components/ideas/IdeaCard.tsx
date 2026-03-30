import { Link } from "react-router-dom";
import type { Idea, ThemeKey } from "../../types/idea";

interface IdeaCardProps {
  idea: Idea;
  themeKey: ThemeKey;
  featured?: boolean;
}

export function IdeaCard({ idea, themeKey, featured = false }: IdeaCardProps) {
  return (
    <article className={`idea-card theme-${themeKey}${featured ? " idea-card-featured" : ""}`}>
      <div className="idea-card-head">
        <span className="idea-tone">{idea.tone}</span>
        <span className="idea-owner">{idea.owner}</span>
      </div>
      <h3>{idea.title}</h3>
      <p className="idea-summary">{idea.summary}</p>
      {idea.featuredReason ? <p className="idea-feature-reason">{idea.featuredReason}</p> : null}

      <div className="tag-list">
        {idea.tags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>

      <dl className="metric-grid">
        <div>
          <dt>コスト感</dt>
          <dd>{idea.cost}</dd>
        </div>
        <div>
          <dt>効果感</dt>
          <dd>{idea.impact}</dd>
        </div>
        <div>
          <dt>新規性</dt>
          <dd>{idea.novelty}</dd>
        </div>
      </dl>

      <Link className="text-link" to={`/${themeKey}/ideas/${idea.slug}`}>
        詳細を見る
      </Link>
    </article>
  );
}
