import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-gray-400 border-t border-white/5">
      <div className="page-container py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-display font-extrabold text-2xl text-white mb-3">
              Truthful<span className="text-gradient">Wasp</span>
            </h3>
            <p className="text-sm leading-relaxed max-w-xs">
              Exposing online scams and protecting people from fraudulent
              money-making platforms. Evidence-based. Independent. Free.
            </p>
            <div className="flex gap-3 mt-5">
              <span className="badge badge-scam text-xs">200+ Scams Exposed</span>
              <span className="badge badge-legitimate text-xs">50+ Legit Sites</span>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4 uppercase tracking-widest">
              Explore
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                ["/reviews", "All Reviews"],
                ["/blog", "Blog"],
                ["/legitimate", "Legit Sites"],
                ["/submit", "Submit Evidence"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-accent transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4 uppercase tracking-widest">
              Legal
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                ["/about", "About Us"],
                ["/privacy", "Privacy Policy"],
                ["/terms", "Terms of Service"],
                ["/disclaimer", "Disclaimer"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-accent transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-xs">
          <p>
            Reviews are based on publicly available information and user-submitted evidence.
            TruthfulWasp is an independent editorial platform.
          </p>
          <p className="shrink-0">
            © {new Date().getFullYear()} TruthfulWasp
          </p>
        </div>
      </div>
    </footer>
  );
}