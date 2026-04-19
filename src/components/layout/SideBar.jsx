import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const NAV = [
  { to: "/", icon: "⬛", label: "Home" },
  { to: "/reviews", icon: "🔍", label: "Reviews" },
  { to: "/blog", icon: "📰", label: "Blog" },
  { to: "/legitimate", icon: "✅", label: "Legit Sites" },
  { to: "/submit", icon: "📤", label: "Submit Evidence" },
  { to: "/about", icon: "ℹ", label: "About" },
];

const CATEGORIES = [
  { to: "/reviews?verdict=scam", label: "Confirmed Scams" },
  { to: "/reviews?verdict=suspicious", label: "Suspicious" },
  { to: "/reviews?category=crypto", label: "Crypto / Investment" },
  { to: "/reviews?category=mlm", label: "MLM / Network Marketing" },
  { to: "/reviews?category=forex", label: "Forex / Trading" },
  { to: "/reviews?category=survey", label: "Survey Sites" },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `sidebar-link${isActive ? " active" : ""}`;

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-border">
        <Link to="/" className="block">
          <div className="flex  items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded bg-accent flex items-center justify-center text-white font-bold text-sm">
              TW
            </div>
            <span className="font-display font-bold text-text-primary text-base">
              AuthenlyCore
            </span>
          </div>
          <p className="text-xs text-text-muted ml-10">
            Serving to expose all Scam sites
          </p>
        </Link>
      </div>

      {/* Main nav */}
      <nav className="py-3 border-b border-border">
        {NAV.map(({ to, icon, label }) => (
          <NavLink key={to} to={to} end={to === "/"} className={linkClass}>
            <span className="sidebar-icon w-5 text-center text-base">
              {icon}
            </span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Categories */}
      <div className="py-3 border-b border-border">
        <p className="px-4 py-1 text-xs font-semibold text-text-muted uppercase tracking-widest mb-1">
          Browse by Type
        </p>
        {CATEGORIES.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-2 px-4 py-2 text-xs text-text-muted hover:text-text-primary hover:bg-elevated mx-2 rounded-lg transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent/50 shrink-0" />
            {label}
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="py-4 px-4 border-b border-border">
        <div className="grid grid-cols-2 gap-2">
          {[
            ["500+", "Reviewed"],
            ["200+", "Exposed"],
            ["50+", "Legit"],
            ["1.2k+", "Reports"],
          ].map(([val, label]) => (
            <div
              key={label}
              className="bg-elevated rounded p-2 text-center border border-border"
            >
              <div className="font-display font-bold text-accent text-sm">
                {val}
              </div>
              <div className="text-xs text-text-muted">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Auth */}
      <div className="mt-auto p-4 border-t border-border">
        {user ? (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-xs font-bold text-accent">
                {user.username[0].toUpperCase()}
              </div>
              <div>
                <p className="text-xs font-semibold text-text-primary">
                  {user.username}
                </p>
                <p className="text-xs text-text-muted capitalize">
                  {user.role}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="btn-ghost w-full justify-center border border-border"
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <Link to="/login" className="btn-secondary w-full justify-center">
              Log In
            </Link>
            <Link to="/register" className="btn-primary w-full justify-center">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}