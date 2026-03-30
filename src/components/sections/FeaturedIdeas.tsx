import { featuredIdeas } from "../../data/ideas";
import { IdeaCard } from "../ideas/IdeaCard";
import { SectionHeading } from "../ui/SectionHeading";

export function FeaturedIdeas() {
  return (
    <section className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="Featured"
          title="最初に見ておきたい3施策"
          description="いずれも単なるアイデアではなく、管理職運用や日程設計まで落とし込みやすい案を優先しています。"
        />
        <div className="idea-grid featured-grid">
          {featuredIdeas.map((idea) => (
            <IdeaCard key={idea.slug} idea={idea} featured />
          ))}
        </div>
      </div>
    </section>
  );
}
