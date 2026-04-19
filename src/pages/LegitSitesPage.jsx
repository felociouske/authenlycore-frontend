import { useQuery } from "@tanstack/react-query";
import { getPlatforms } from "../api/platforms";
import { Link } from "react-router-dom";
import Spinner from "../components/common/Spinner";
import { categoryLabel } from "../utils";

export default function LegitSitesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["platforms-legit"],
    queryFn: () => getPlatforms({ verdict: "legitimate" }),
  });

  const platforms = data?.data?.results || [];

  return (
    <div>
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 bg-trust/10 border border-trust/20 text-trust text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
          ✓ Verified
        </div>
        <h1 className="font-display font-bold text-2xl text-text-primary mb-1">
          Legitimate Platforms
        </h1>
        <p className="text-text-muted text-sm">
          Verified platforms we have reviewed and confirmed as genuine.
          Always do your own research.
        </p>
      </div>

      {isLoading && <Spinner />}

      {!isLoading && platforms.length === 0 && (
        <div className="bg-surface border border-border rounded-md p-8 text-center text-text-muted text-sm">
          No verified platforms listed yet. Check back soon.
        </div>
      )}

      <div className="space-y-2">
        {platforms.map((platform) => (
          <div key={platform.id} className="post-card flex items-center p-4 gap-4">
            {platform.logo ? (
              <img src={platform.logo} alt={platform.name}
                className="w-10 h-10 rounded object-contain border border-border shrink-0" />
            ) : (
              <div className="w-10 h-10 rounded bg-trust/20 border border-trust/30 flex items-center justify-center font-bold text-trust shrink-0">
                {platform.name[0]}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="font-display font-semibold text-text-primary">{platform.name}</h3>
                <span className="badge-legitimate">LEGIT</span>
                <span className="text-xs text-text-muted">{categoryLabel(platform.category)}</span>
              </div>
              <p className="text-sm text-text-muted line-clamp-2">{platform.description}</p>
            </div>
            <Link
              to={`/reviews?search=${encodeURIComponent(platform.name)}`}
              className="btn-ghost shrink-0 text-xs border border-border"
            >
              Review →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}