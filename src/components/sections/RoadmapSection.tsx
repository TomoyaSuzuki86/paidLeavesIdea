import { roadmap } from "../../data/roadmap";
import { SectionHeading } from "../ui/SectionHeading";

export function RoadmapSection() {
  return (
    <section className="section" id="roadmap">
      <div className="shell">
        <SectionHeading
          eyebrow="Roadmap"
          title="30 / 60 / 90日でどこまで入れるか"
          description="重い資料ではなく、どの順で着手すると効果が出やすいかが分かる最低限のロードマップです。"
        />

        <div className="roadmap-grid">
          {roadmap.map((phase) => (
            <article className="roadmap-card" key={phase.phase}>
              <p className="eyebrow">{phase.phase}</p>
              <h3>{phase.title}</h3>
              <p>{phase.summary}</p>
              <ul className="detail-list">
                {phase.actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
