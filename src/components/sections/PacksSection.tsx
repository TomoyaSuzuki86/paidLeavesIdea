import { Link } from "react-router-dom";
import type { Idea, IdeaPack, ThemeMeta } from "../../types/idea";
import { SectionHeading } from "../ui/SectionHeading";

interface PacksSectionProps {
  theme: ThemeMeta;
  ideas: Idea[];
  packs: IdeaPack[];
}

export function PacksSection({ theme, ideas, packs }: PacksSectionProps) {
  return (
    <section className="section" id="packs">
      <div className="shell">
        <SectionHeading
          eyebrow="Packs"
          title={`${theme.shortLabel}を単発でなく、組み合わせで考える`}
          description="導入順やセット効果が見えると、制度化や運用改善の議論が進みやすくなります。まずは3点単位で見られる構成です。"
        />

        <div className="pack-grid">
          {packs.map((pack) => (
            <article className="pack-card" key={pack.slug}>
              <p className="eyebrow">{pack.audience}</p>
              <h3>{pack.title}</h3>
              <p>{pack.summary}</p>
              <p className="pack-why">{pack.whyThisPack}</p>
              <ul className="pack-list">
                {pack.ideaSlugs.map((slug) => {
                  const idea = ideas.find((item) => item.slug === slug);
                  return idea ? (
                    <li key={slug}>
                      <Link to={`${theme.basePath}/ideas/${slug}`}>{idea.title}</Link>
                    </li>
                  ) : null;
                })}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
