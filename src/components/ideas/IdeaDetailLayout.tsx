import type { Idea, ThemeKey } from "../../types/idea";
import { RelatedIdeas } from "./RelatedIdeas";

interface IdeaDetailLayoutProps {
  idea: Idea;
  themeKey: ThemeKey;
  relatedIdeas: Idea[];
}

const renderList = (items: string[]) => (
  <ul className="detail-list">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

export function IdeaDetailLayout({ idea, themeKey, relatedIdeas }: IdeaDetailLayoutProps) {
  return (
    <div className="detail-layout">
      <section className="detail-hero card">
        <div className="detail-hero-meta">
          <span className="eyebrow">Idea #{idea.id.toString().padStart(2, "0")}</span>
          <span className="idea-owner">{idea.owner}</span>
        </div>
        <h1>{idea.title}</h1>
        <p className="lead">{idea.summary}</p>
        <div className="tag-list">
          {idea.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <dl className="detail-stats">
          <div>
            <dt>コスト感</dt>
            <dd>{idea.cost}</dd>
          </div>
          <div>
            <dt>効果感</dt>
            <dd>{idea.impact}</dd>
          </div>
          <div>
            <dt>新規性</dt>
            <dd>{idea.novelty}</dd>
          </div>
          <div>
            <dt>主担当</dt>
            <dd>{idea.owner}</dd>
          </div>
        </dl>
      </section>

      <div className="detail-columns">
        <div className="detail-main">
          <section className="detail-section card">
            <h2>このアイデアは何を解決するか</h2>
            {renderList(idea.target_problem)}
          </section>
          <section className="detail-section card">
            <h2>なぜ効くのか</h2>
            {renderList(idea.why_it_works)}
          </section>
          <section className="detail-section card">
            <h2>どう運用するか</h2>
            <h3>導入ステップ</h3>
            {renderList(idea.how_to_implement)}
            <h3>運用フロー</h3>
            {renderList(idea.operation_flow)}
          </section>
          <section className="detail-section card">
            <h2>想定リスク</h2>
            <h3>リスク</h3>
            {renderList(idea.risks)}
            <h3>抑え方</h3>
            {renderList(idea.mitigations)}
          </section>
          <section className="detail-section card">
            <h2>まず何から始めるか</h2>
            {renderList(idea.pilot_plan)}
          </section>
          <section className="detail-section card">
            <h2>KPI例</h2>
            {renderList(idea.kpi_examples)}
          </section>
          <section className="detail-section card">
            <h2>社内での伝え方例</h2>
            {renderList(idea.example_internal_message)}
          </section>
        </div>

        <aside className="detail-side">
          <section className="card detail-side-card">
            <h2>期待できる効果</h2>
            {renderList(idea.expected_effect)}
          </section>
          <section className="card detail-side-card">
            <h2>コストと関係者</h2>
            <h3>コスト詳細</h3>
            {renderList(idea.cost_detail)}
            <h3>必要な関係者</h3>
            {renderList(idea.required_stakeholders)}
          </section>
        </aside>
      </div>

      <RelatedIdeas ideas={relatedIdeas} themeKey={themeKey} />
    </div>
  );
}
