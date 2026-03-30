import type { Idea } from "../../types/idea";
import { IdeaCard } from "./IdeaCard";

interface IdeaGridProps {
  ideas: Idea[];
}

export function IdeaGrid({ ideas }: IdeaGridProps) {
  if (!ideas.length) {
    return (
      <div className="empty-state">
        <p className="eyebrow">No Match</p>
        <h2>条件に合うアイデアが見つかりません。</h2>
        <p>検索語を短くするか、タグを「すべて」に戻して再度確認してください。</p>
      </div>
    );
  }

  return (
    <div className="idea-grid">
      {ideas.map((idea) => (
        <IdeaCard key={idea.slug} idea={idea} />
      ))}
    </div>
  );
}
