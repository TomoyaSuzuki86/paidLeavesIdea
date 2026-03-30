import { Link } from "react-router-dom";
import { featuredIdeas, ideas } from "../data/ideas";
import { IdeaGrid } from "../components/ideas/IdeaGrid";
import { FeaturedIdeas } from "../components/sections/FeaturedIdeas";
import { Hero } from "../components/sections/Hero";
import { PacksSection } from "../components/sections/PacksSection";
import { RoadmapSection } from "../components/sections/RoadmapSection";
import { SectionHeading } from "../components/ui/SectionHeading";

export function HomePage() {
  return (
    <main className="page">
      <section className="section hero-section">
        <div className="shell">
          <Hero />
        </div>
      </section>

      <FeaturedIdeas />

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Library Snapshot"
            title="一覧で見たときに比較したい要素を先に揃える"
            description="タイトルと要約だけで終わらせず、コスト感、効果感、新規性、主担当、ひとこと評価まで一覧で見えるようにしています。"
          />
          <IdeaGrid ideas={ideas.slice(0, 6).filter((idea) => !featuredIdeas.includes(idea))} />
          <div className="section-cta">
            <Link className="button button-secondary" to="/ideas">
              すべてのアイデアを見る
            </Link>
          </div>
        </div>
      </section>

      <PacksSection />
      <RoadmapSection />
    </main>
  );
}
