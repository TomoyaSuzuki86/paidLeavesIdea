import { Link } from "react-router-dom";
import { IdeaCard } from "../components/ideas/IdeaCard";
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
          <section className="hero-card">
            <div className="hero-copy">
              <p className="eyebrow">Knowledge Space Library</p>
              <h1>ナレッジスペースの働き方と回復を、2つのテーマで読む。</h1>
              <p className="lead">
                このサイトは、株式会社ナレッジスペース向けに「有給取得促進」と「睡眠調査・睡眠改善」を同じ世界観で読めるように再設計した知見ライブラリです。制度設計、会議設計、管理職行動まで会議に持ち込みやすい粒度で整理しています。
              </p>
            </div>
            <div className="hero-metrics">
              <div className="metric-pill">
                <span>テーマ数</span>
                <strong>2テーマ</strong>
              </div>
              <div className="metric-pill">
                <span>総アイデア数</span>
                <strong>{libraries["paid-leave"].ideas.length + libraries.sleep.ideas.length}件</strong>
              </div>
              <div className="metric-pill">
                <span>入口</span>
                <strong>制度改善 / 回復設計</strong>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="section" id="themes">
        <div className="shell">
          <SectionHeading
            eyebrow="Themes"
            title="同じプロダクト内の2つの知見ライブラリ"
            description="UI 骨格は揃えつつ、テーマごとの差は文言、色味、注目論点で表現しています。どちらもナレッジスペース前提で読める内容です。"
          />
          <div className="theme-grid">
            {themes.map((theme) => {
              const library = libraries[theme.key];
              return (
                <article className={`theme-entry-card theme-${theme.key}`} key={theme.key}>
                  <div className="theme-entry-head">
                    <span className="theme-entry-mark">{theme.shortLabel}</span>
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
                    <span>{library.featuredIdeas.length}件の注目施策</span>
                  </div>
                  <div className="button-row">
                    <Link className="button button-primary" to={theme.basePath}>
                      テーマを見る
                    </Link>
                    <Link className="button button-secondary" to={`${theme.basePath}/ideas`}>
                      一覧へ
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Featured Mix"
            title="まず見ておきたい注目アイデア"
            description="有給と睡眠を横並びで見ても、同じ設計思想の中で比較できるようにしています。"
          />
          <div className="idea-grid featured-grid">
            {featuredMix.map(({ idea, themeKey }) => (
              <IdeaCard key={`${themeKey}-${idea.slug}`} idea={idea} themeKey={themeKey} featured />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
