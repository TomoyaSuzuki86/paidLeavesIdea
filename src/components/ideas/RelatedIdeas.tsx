import type { Idea, ThemeKey } from "../../types/idea";
import { SectionHeading } from "../ui/SectionHeading";
import { IdeaCard } from "./IdeaCard";

interface RelatedIdeasProps {
  ideas: Idea[];
  themeKey: ThemeKey;
}

export function RelatedIdeas({ ideas, themeKey }: RelatedIdeasProps) {
  if (!ideas.length) {
    return null;
  }

  return (
    <section className="detail-subsection">
      <SectionHeading
        eyebrow="Related Ideas"
        title="一緒に読みたい関連施策"
        description="単発で終わらせず、運用のつながりやセット導入の候補として見比べられるようにしています。"
      />
      <div className="idea-grid compact-grid">
        {ideas.map((idea) => (
          <IdeaCard key={idea.slug} idea={idea} themeKey={themeKey} />
        ))}
      </div>
    </section>
  );
}
