import { Link } from "react-router-dom";
import { ideas } from "../../data/ideas";
import { packs } from "../../data/packs";
import { SectionHeading } from "../ui/SectionHeading";

export function PacksSection() {
  return (
    <section className="section" id="packs">
      <div className="shell">
        <SectionHeading
          eyebrow="Packs"
          title="単発でなく、組み合わせで考える"
          description="導入順やセット効果が見えると、制度化の議論が進みやすくなります。まずは3点単位で見る想定です。"
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
                      <Link to={`/ideas/${slug}`}>{idea.title}</Link>
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
