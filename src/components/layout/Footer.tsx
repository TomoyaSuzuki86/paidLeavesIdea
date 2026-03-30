export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer-inner">
        <div>
          <p className="eyebrow">日本ナレッジスペース株式会社</p>
          <p className="footer-copy">
            日本ナレッジスペース株式会社向けに、有給取得促進と睡眠改善の2テーマを同じデザインシステムで読める構成にしています。
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
