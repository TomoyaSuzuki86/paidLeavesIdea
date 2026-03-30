export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer-inner">
        <div>
          <p className="eyebrow">Paid Leave Ideas</p>
          <p className="footer-copy">
            株式会社ナレッジスペース向けに、有給取得促進と睡眠改善の2テーマを同じデザインシステムで読める構成にしています。
          </p>
        </div>
        <div className="footer-meta">
          <span>Routes: `/paid-leave/*` `/sleep/*`</span>
          <span>Hosting: Firebase SPA</span>
        </div>
      </div>
    </footer>
  );
}
