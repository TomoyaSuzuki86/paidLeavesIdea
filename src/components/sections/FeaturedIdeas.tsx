import type { Idea, ThemeMeta } from "../../types/idea";
import { IdeaCard } from "../ideas/IdeaCard";
import { SectionHeading } from "../ui/SectionHeading";

interface FeaturedIdeasProps {
  theme: ThemeMeta;
  ideas: Idea[];
}

export function FeaturedIdeas({ theme, ideas }: FeaturedIdeasProps) {
  return (
    <section className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="Featured"
          title={`${theme.shortLabel}で最初に見ておきたい施策`}
          description="いずれも単なる発想でなく、会議や運用、管理職行動まで落とし込みやすい案を優先しています。"
        />
        <div className="idea-grid featured-grid">
          {ideas.map((idea) => (
            <IdeaCard key={idea.slug} idea={idea} themeKey={theme.key} featured />
          ))}
        </div>
      </div>
    </section>
  );
}
