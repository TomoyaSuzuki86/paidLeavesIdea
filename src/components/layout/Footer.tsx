export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer-inner">
        <div>
          <p className="eyebrow">Paid Leave Ideas</p>
          <p className="footer-copy">
            人事企画が制度案のたたき台に使えるよう、一覧比較と詳細設計の両方を静かに読める構成にしています。
          </p>
        </div>
        <div className="footer-meta">
          <span>Routes: `/` `/ideas` `/ideas/:slug`</span>
          <span>Hosting: Firebase SPA</span>
        </div>
      </div>
    </footer>
  );
}
