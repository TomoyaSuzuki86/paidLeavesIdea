import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "トップ" },
  { to: "/diagnostic", label: "診断" },
  { to: "/paid-leave", label: "有休" },
  { to: "/sleep", label: "睡眠" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="shell site-header-inner">
        <Link className="brand" to="/">
          <span className="brand-mark">PL</span>
          <span>
            <strong>JKS Idea Library</strong>
            <small>有給取得促進と睡眠改善を比較しながら読める構成</small>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Main">
          {links.map((link) => (
            <NavLink
              key={link.to}
              className={({ isActive }) => `nav-link${isActive ? " is-active" : ""}`}
              to={link.to}
            >
              {link.label}
            </NavLink>
          ))}
          <a className="nav-link nav-ghost" href="/#themes">
            テーマ
          </a>
        </nav>
      </div>
    </header>
  );
}
