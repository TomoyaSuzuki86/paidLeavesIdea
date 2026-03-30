import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="page">
      <section className="section">
        <div className="empty-state">
          <p className="eyebrow">Page Not Found</p>
          <h1>指定されたページが見つかりません。</h1>
          <p>
            URL が変更されたか、存在しないアイデアが指定されています。アイデア一覧から目的の施策を探してください。
          </p>
          <div className="button-row">
            <Link className="button button-primary" to="/ideas">
              アイデア一覧へ
            </Link>
            <Link className="button button-secondary" to="/">
              ホームへ戻る
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
