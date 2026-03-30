import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/paid-leave", label: "有給" },
  { to: "/sleep", label: "睡眠" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="shell site-header-inner">
        <Link className="brand" to="/">
          <span className="brand-mark">PL</span>
          <span>
            <strong>ナレッジスペース 知見ライブラリ</strong>
            <small>有給と睡眠を同じ設計で読む</small>
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
            Themes
          </a>
        </nav>
      </div>
    </header>
  );
}
