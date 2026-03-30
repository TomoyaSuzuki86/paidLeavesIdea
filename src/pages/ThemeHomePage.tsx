import { Link } from "react-router-dom";
import { IdeaGrid } from "../components/ideas/IdeaGrid";
import { FeaturedIdeas } from "../components/sections/FeaturedIdeas";
import { Hero } from "../components/sections/Hero";
import { PacksSection } from "../components/sections/PacksSection";
import { RoadmapSection } from "../components/sections/RoadmapSection";
import { SectionHeading } from "../components/ui/SectionHeading";
import { getLibrary } from "../data/libraries";
import type { ThemeKey } from "../types/idea";

interface ThemeHomePageProps {
  themeKey: ThemeKey;
}

export function ThemeHomePage({ themeKey }: ThemeHomePageProps) {
  const library = getLibrary(themeKey);
  const snapshotIdeas = library.ideas.filter((idea) => !idea.featured).slice(0, 6);

  return (
    <main className={`page theme-page theme-${themeKey}`}>
      <section className="section hero-section">
        <div className="shell">
          <Hero theme={library.theme} ideaCount={library.ideas.length} featuredCount={library.featuredIdeas.length} />
        </div>
      </section>

      <FeaturedIdeas theme={library.theme} ideas={library.featuredIdeas} />

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Idea Snapshot"
            title={`${library.theme.shortLabel}の全体像を先に見る`}
            description="注目施策を見たうえで一覧へ進むか、診断から入口を絞るかを選べる構成にしています。"
          />
          <IdeaGrid ideas={snapshotIdeas} themeKey={themeKey} />
          <div className="section-cta button-row">
            <Link className="button button-secondary" to={`${library.theme.basePath}/ideas`}>
              一覧を見る
            </Link>
            <Link className="button button-primary" to="/diagnostic">
              診断から始める
            </Link>
          </div>
        </div>
      </section>

      <PacksSection theme={library.theme} ideas={library.ideas} packs={library.packs} />
      <RoadmapSection theme={library.theme} roadmap={library.roadmap} />
    </main>
  );
}
