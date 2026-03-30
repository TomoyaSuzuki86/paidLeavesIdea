import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/ideas", label: "Ideas" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="shell site-header-inner">
        <Link className="brand" to="/">
          <span className="brand-mark">PL</span>
          <span>
            <strong>有給取得促進アイデアサイト</strong>
            <small>制度化のヒントを一覧と詳細で読む</small>
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
          <a className="nav-link nav-ghost" href="/#packs">
            Packs
          </a>
        </nav>
      </div>
    </header>
  );
}
