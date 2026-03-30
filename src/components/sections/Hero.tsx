import { Link } from "react-router-dom";
import { ideas } from "../../data/ideas";
import { MetricPill } from "../ui/MetricPill";

export function Hero() {
  return (
    <section className="hero-card">
      <div className="hero-copy">
        <p className="eyebrow">Editorial Library</p>
        <h1>有給取得促進の施策を、制度案の粒度まで読めるサイト。</h1>
        <p className="lead">
          条件診断ではなく、一覧で比較しながら発想を広げるための構成です。人事企画が会議に持ち込み、そのまま制度・運用のたたき台にしやすい粒度まで整えています。
        </p>
        <div className="button-row">
          <Link className="button button-primary" to="/ideas">
            アイデア一覧を見る
          </Link>
          <a className="button button-secondary" href="#roadmap">
            30/60/90日を見る
          </a>
        </div>
      </div>
      <div className="hero-metrics">
        <MetricPill label="アイデア数" value={`${ideas.length}件`} />
        <MetricPill label="注目施策" value="3件" />
        <MetricPill label="重点切り口" value="低取得者 / 管理職 / 推奨日" />
      </div>
    </section>
  );
}
