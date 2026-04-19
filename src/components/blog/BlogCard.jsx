import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDate, truncate } from "../../utils";

const categoryStyle = {
  investigation: { color: "text-purple-400", bg: "bg-purple-400/10 border-purple-400/20", label: "Investigation" },
  scam_alert:    { color: "text-danger",      bg: "bg-danger/10 border-danger/20",         label: "Scam Alert" },
  legit_site:    { color: "text-trust",       bg: "bg-trust/10 border-trust/20",           label: "Legit Site" },
  guide:         { color: "text-blue-400",    bg: "bg-blue-400/10 border-blue-400/20",     label: "Guide" },
};

export default function BlogCard({ post }) {
  const [votes, setVotes] = useState(Math.floor(Math.random() * 500) + 20);
  const [voted, setVoted] = useState(null);

  const {
    title, slug, category,
    published_at, reading_time_minutes,
    meta_description, author,
  } = post;

  const style = categoryStyle[category] || {
    color: "text-text-muted",
    bg: "bg-white/5 border-border",
    label: category,
  };

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
        >
          ▲
        </button>
        <span className={`text-xs font-bold ${voted ? (voted === "up" ? "text-accent" : "text-blue-400") : "text-text-muted"}`}>
          {votes}
        </span>
        <button
          onClick={(e) => { e.preventDefault(); handleVote("down"); }}
          className={`vote-btn ${voted === "down" ? "text-blue-400" : ""}`}
        >
          ▼
        </button>
      </div>

      {/* Content */}
      <Link to={`/blog/${slug}`} className="flex-1 p-3 min-w-0">
        <div className="flex items-center gap-2 text-xs text-text-muted mb-1.5 flex-wrap">
          <span className={`badge border ${style.bg} ${style.color}`}>
            {style.label}
          </span>
          <span>•</span>
          <span>by {author?.username}</span>
          <span>•</span>
          <span>{formatDate(published_at)}</span>
          <span>•</span>
          <span>{reading_time_minutes} min read</span>
        </div>

        <h2 className="font-display font-semibold text-text-primary text-base leading-snug mb-2 hover:text-accent transition-colors">
          {title}
        </h2>

        <p className="text-sm text-text-muted leading-relaxed mb-3">
          {truncate(meta_description || "", 160)}
        </p>

        <div className="flex items-center gap-1">
          <button className="btn-ghost">💬 Comments</button>
          <button className="btn-ghost">🔗 Share</button>
        </div>
      </Link>
    </div>
  );
}