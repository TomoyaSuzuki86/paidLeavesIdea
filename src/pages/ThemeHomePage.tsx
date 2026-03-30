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
            eyebrow="Library Snapshot"
            title={`${library.theme.shortLabel}テーマの全体像を一覧でつかむ`}
            description="タイトルだけでなく、コスト感、効果感、新規性、主担当、ひとこと評価まで一覧で比較できます。ナレッジスペースで運用に落としやすい順に読み進められる構成です。"
          />
          <IdeaGrid ideas={snapshotIdeas} themeKey={themeKey} />
          <div className="section-cta">
            <Link className="button button-secondary" to={`${library.theme.basePath}/ideas`}>
              すべてのアイデアを見る
            </Link>
          </div>
        </div>
      </section>

      <PacksSection theme={library.theme} ideas={library.ideas} packs={library.packs} />
      <RoadmapSection theme={library.theme} roadmap={library.roadmap} />
    </main>
  );
}
