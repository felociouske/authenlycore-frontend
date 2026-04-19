import { useState } from "react";
import { Link } from "react-router-dom";
import VerdictBadge from "../common/VerdictBadge";
import { truncate, formatDate, categoryLabel } from "../../utils";

export default function ReviewCard({ review }) {
  const [votes, setVotes] = useState(Math.floor(Math.random() * 800) + 50);
  const [voted, setVoted] = useState(null);

  const {
    platform, title, slug, published_at,
    meta_description, rating_transparency,
    rating_payout, rating_support,
  } = review;

  const avgRating = (
    (Number(rating_transparency) +
      Number(rating_payout) +
      Number(rating_support)) / 3
  ).toFixed(1);

  const handleVote = (dir) => {
    if (voted === dir) {
      setVoted(null);
      setVotes((v) => (dir === "up" ? v - 1 : v + 1));
    } else {
      const delta = voted ? 2 : 1;
      setVoted(dir);
      setVotes((v) => (dir === "up" ? v + delta : v - delta));
    }
  };

  return (
    <div className="post-card flex mb-2">
      {/* Vote column */}
      <div className="vote-col">
        <button
          onClick={(e) => { e.preventDefault(); handleVote("up"); }}
          className={`vote-btn ${voted === "up" ? "text-accent" : ""}`}
          aria-label="Upvote"
        >
          ▲
        </button>
        <span
          className={`text-xs font-bold ${
            voted === "up"
              ? "text-accent"
              : voted === "down"
              ? "text-blue-400"
              : "text-text-muted"
          }`}
        >
          {votes}
        </span>
        <button
          onClick={(e) => { e.preventDefault(); handleVote("down"); }}
          className={`vote-btn ${voted === "down" ? "text-blue-400" : ""}`}
          aria-label="Downvote"
        >
          ▼
        </button>
      </div>

      {/* Content */}
      <Link to={`/reviews/${slug}`} className="flex-1 p-3 min-w-0">
        {/* Meta row */}
        <div className="flex items-center gap-2 text-xs text-text-muted mb-1.5 flex-wrap">
          <VerdictBadge verdict={platform?.verdict} />
          <span className="text-text-muted">•</span>
          <span>{categoryLabel(platform?.category)}</span>
          <span className="text-text-muted">•</span>
          <span>Posted {formatDate(published_at)}</span>
          <span className="text-text-muted">•</span>
          <span className="text-accent">★ {avgRating}</span>
        </div>

        {/* Title */}
        <h2 className="font-display font-semibold text-text-primary text-base leading-snug mb-2 hover:text-accent transition-colors">
          {title}
        </h2>

        {/* Description */}
        <p className="text-sm text-text-muted leading-relaxed mb-3">
          {truncate(meta_description || "", 160)}
        </p>

        {/* Action bar */}
        <div className="flex items-center gap-1 flex-wrap">
          <button className="btn-ghost">
            💬 Comments
          </button>
          <button className="btn-ghost">
            🔗 Share
          </button>
          <button className="btn-ghost">
            📤 Report
          </button>
          {platform?.verdict === "scam" && (
            <span className="ml-auto text-xs text-danger font-semibold">
              ⚠ Danger: Confirmed Scam
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}