import type { RoadmapPhase, ThemeMeta } from "../../types/idea";
import { SectionHeading } from "../ui/SectionHeading";
import { ScrollReveal } from "../ui/ScrollReveal";

interface RoadmapSectionProps {
  theme: ThemeMeta;
  roadmap: RoadmapPhase[];
}

export function RoadmapSection({ theme, roadmap }: RoadmapSectionProps) {
  return (
    <section className="section" id="roadmap">
      <div className="shell">
        <SectionHeading
          eyebrow="Roadmap"
          title={`${theme.shortLabel}を30 / 60 / 90日でどう入れるか`}
          description="重い資料にしすぎず、どこから着手すると運用に乗せやすいかが分かる粒度に絞っています。"
        />

        <div className="roadmap-grid">
          {roadmap.map((phase) => (
            <ScrollReveal as="article" className="roadmap-card" key={phase.phase}>
              <p className="eyebrow">{phase.phase}</p>
              <h3>{phase.title}</h3>
              <p>{phase.summary}</p>
              <ul className="detail-list">
                {phase.actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
