import { Link } from "react-router-dom";
import { IdeaCard } from "../components/ideas/IdeaCard";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { libraries, themes } from "../data/libraries";

export function HomePage() {
  const featuredMix = [
    ...libraries["paid-leave"].featuredIdeas.slice(0, 2).map((idea) => ({ idea, themeKey: "paid-leave" as const })),
    ...libraries.sleep.featuredIdeas.slice(0, 2).map((idea) => ({ idea, themeKey: "sleep" as const })),
  ];

  return (
    <main className="page">
      <section className="section hero-section">
        <div className="shell">
          <ScrollReveal as="section" className="hero-card">
            <div className="hero-copy">
              <p className="eyebrow">JKS Knowledge Library</p>
              <h1>JKS の働き方と回復を、2つのテーマで見比べる。</h1>
              <p className="lead">
                このサイトは、JKS 向けに「有休取得促進」と「睡眠改善」を同じ見方で整理した知見ライブラリです。
                制度設計、会議設計、管理職の動きまで、企画担当が会議で使いやすい粒度にまとめています。
              </p>
            </div>
            <div className="hero-metrics">
              <div className="metric-pill">
                <span>テーマ数</span>
                <strong>2テーマ</strong>
              </div>
              <div className="metric-pill">
                <span>収録アイデア</span>
                <strong>{libraries["paid-leave"].ideas.length + libraries.sleep.ideas.length}件</strong>
              </div>
              <div className="metric-pill">
                <span>焦点</span>
                <strong>制度設計 / 運用改善</strong>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section" id="themes">
        <div className="shell">
          <SectionHeading
            eyebrow="Themes"
            title="JKS 向けに整えた2つのテーマ"
            description="導線と見え方はそろえつつ、論点の違いは文言、色、注目施策で分けています。閲覧から始める導線と、診断から始める導線も分けています。"
          />
          <div className="theme-grid">
            {themes.map((theme, index) => {
              const library = libraries[theme.key];
              return (
                <ScrollReveal
                  as="article"
                  className={`theme-entry-card theme-${theme.key}`}
                  delay={index * 80}
                  key={theme.key}
                >
                  <div className="theme-entry-head">
                    <p className="eyebrow">{theme.label}</p>
                  </div>
                  <h2>{theme.entrySummary}</h2>
                  <p className="theme-entry-copy">{theme.description}</p>
                  <ul className="detail-list">
                    {theme.topHighlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="theme-entry-meta">
                    <span>{library.ideas.length}件</span>
                    <span>注目施策 {library.featuredIdeas.length}件</span>
                  </div>
                  <div className="button-row">
                    <Link className="button button-primary" to={theme.basePath}>
                      テーマを見る
                    </Link>
                    <Link className="button button-secondary" to={`${theme.basePath}/ideas`}>
                      一覧へ
                    </Link>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Featured Ideas"
            title="最初に見ておきたい注目施策"
            description="有休と睡眠をまたいで、JKS の会議で話しやすい施策だけを選んで並べています。"
          />
          <div className="idea-grid featured-grid">
            {featuredMix.map(({ idea, themeKey }, index) => (
              <IdeaCard key={`${themeKey}-${idea.slug}`} idea={idea} themeKey={themeKey} featured delay={index * 60} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
