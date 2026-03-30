import type { Idea } from "../../types/idea";
import { IdeaCard } from "./IdeaCard";

interface RelatedIdeasProps {
  ideas: Idea[];
}

export function RelatedIdeas({ ideas }: RelatedIdeasProps) {
  if (!ideas.length) {
    return null;
  }

  return (
    <section className="detail-subsection">
      <div className="section-heading">
        <p className="eyebrow">Related Ideas</p>
        <h2>一緒に検討しやすい施策</h2>
        <p>単発で入れるより、前提づくりとセットにすると機能しやすい案です。</p>
      </div>
      <div className="idea-grid compact-grid">
        {ideas.map((idea) => (
          <IdeaCard key={idea.slug} idea={idea} />
        ))}
      </div>
    </section>
  );
}
