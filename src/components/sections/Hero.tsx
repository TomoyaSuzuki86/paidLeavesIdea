import { Link } from "react-router-dom";
import type { ThemeMeta } from "../../types/idea";
import { MetricPill } from "../ui/MetricPill";

interface HeroProps {
  theme: ThemeMeta;
  ideaCount: number;
  featuredCount: number;
}

export function Hero({ theme, ideaCount, featuredCount }: HeroProps) {
  return (
    <section className={`hero-card theme-${theme.key}`}>
      <div className="hero-copy">
        <p className="eyebrow">{theme.label}</p>
        <h1>{theme.heroTitle}</h1>
        <p className="lead">{theme.heroDescription}</p>
        <div className="button-row">
          <Link className="button button-primary" to={`${theme.basePath}/ideas`}>
            アイデア一覧を見る
          </Link>
          <a className="button button-secondary" href="#roadmap">
            30/60/90日を見る
          </a>
        </div>
      </div>
      <div className="hero-metrics">
        <MetricPill label="アイデア数" value={`${ideaCount}件`} />
        <MetricPill label="注目施策" value={`${featuredCount}件`} />
        <MetricPill label="重点切り口" value={theme.focusLabel} />
      </div>
    </section>
  );
}
