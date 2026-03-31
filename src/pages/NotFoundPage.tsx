import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="page">
      <section className="section">
        <div className="empty-state">
          <p className="eyebrow">Page Not Found</p>
          <h1>指定されたページが見つかりませんでした。</h1>
          <p>URL が変わった可能性があります。ホームかテーマ一覧に戻って、目的の施策を探してください。</p>
          <div className="button-row">
            <Link className="button button-primary" to="/">
              ホームへ
            </Link>
            <Link className="button button-secondary" to="/paid-leave/ideas">
              有休一覧へ
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
