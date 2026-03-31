export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer-inner">
        <div>
          <p className="eyebrow">JKS</p>
          <p className="footer-copy">
            JKS 向けに、有休取得促進と睡眠改善を同じ見方で並べられる知見ライブラリとしてまとめています。
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
