export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer-inner">
        <div>
          <p className="eyebrow">JKS</p>
          <p className="footer-copy">
            JKS 向けに、有休取得促進と睡眠改善の2テーマを同じ設計思想で比較できる知見ライブラリとして整理しています。
          </p>
        </div>
        <div className="footer-meta">
          <span>Routes: `/diagnostic` `/paid-leave/*` `/sleep/*`</span>
          <span>Hosting: Firebase SPA</span>
        </div>
      </div>
    </footer>
  );
}
