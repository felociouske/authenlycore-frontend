import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getReview, postComment } from "../api/reviews";
import { useAuth } from "../context/AuthContext";
import VerdictBadge from "../components/common/VerdictBadge";
import RatingStars from "../components/common/RatingStars";
import Spinner from "../components/common/Spinner";
import ErrorMessage from "../components/common/ErrorMessage";
import { formatDate, timeAgo, categoryLabel } from "../utils";
import toast from "react-hot-toast";

export default function ReviewDetailPage() {
  const { slug } = useParams();
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["review", slug],
    queryFn: () => getReview(slug),
  });

  const review = data?.data;

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setSubmitting(true);
    try {
      await postComment(slug, { body: comment });
      setComment("");
      refetch();
      toast.success("Comment submitted for moderation.");
    } catch {
      toast.error("Failed to post comment.");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return <Spinner />;
  if (isError || !review) return <ErrorMessage message="Review not found." />;

  const avgRating = (
    (Number(review.rating_transparency) +
      Number(review.rating_payout) +
      Number(review.rating_support)) / 3
  ).toFixed(1);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="text-xs text-text-muted mb-4 flex items-center gap-2">
        <Link to="/reviews" className="hover:text-accent transition-colors">
          Reviews
        </Link>
        <span>/</span>
        <span className="text-text-secondary">{review.platform?.name}</span>
      </div>

      <div className="flex gap-6">
        {/* Main */}
        <div className="flex-1 min-w-0">

          {/* Post header */}
          <div className="bg-surface border border-border rounded-md p-5 mb-3">
            <div className="flex items-center gap-2 text-xs text-text-muted mb-3 flex-wrap">
              <VerdictBadge verdict={review.platform?.verdict} />
              <span>•</span>
              <span>{categoryLabel(review.platform?.category)}</span>
              <span>•</span>
              <span>Posted by {review.author?.username}</span>
              <span>•</span>
              <span>{formatDate(review.published_at)}</span>
            </div>

            <h1 className="font-display font-bold text-2xl text-text-primary leading-tight mb-4">
              {review.title}
            </h1>

            {/* Rating row */}
            <div className="flex items-center gap-6 py-3 border-y border-border mb-4">
              <div className="text-center">
                <div className="font-display font-bold text-3xl text-accent">{avgRating}</div>
                <RatingStars rating={avgRating} />
                <div className="text-xs text-text-muted mt-0.5">Overall</div>
              </div>
              <div className="flex-1 space-y-2">
                {[
                  ["Transparency", review.rating_transparency],
                  ["Payout", review.rating_payout],
                  ["Support", review.rating_support],
                ].map(([label, val]) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className="text-xs text-text-muted w-24 shrink-0">{label}</span>
                    <div className="flex-1 bg-border rounded-full h-1.5">
                      <div
                        className="bg-accent h-1.5 rounded-full transition-all"
                        style={{ width: `${(Number(val) / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-text-primary w-4">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Body */}
            <div
              className="editorial text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: review.body }}
            />

            {/* Action bar */}
            <div className="flex items-center gap-1 mt-4 pt-3 border-t border-border">
              <button className="btn-ghost">▲ Upvote</button>
              <button className="btn-ghost">▼ Downvote</button>
              <button className="btn-ghost">🔗 Share</button>
              <Link to="/submit" className="btn-ghost ml-auto">
                📤 Submit Evidence
              </Link>
            </div>
          </div>

          {/* Comments */}
          <div className="bg-surface border border-border rounded-md p-5">
            <h2 className="text-sm font-semibold text-text-primary mb-4">
              {review.comments?.length || 0} Comments
            </h2>

            {/* Comment form */}
            {user ? (
              <form onSubmit={handleComment} className="mb-6">
                <div className="bg-elevated border border-border rounded px-3 py-2 mb-2 text-xs text-text-muted">
                  Commenting as <span className="text-accent">{user.username}</span>
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="input resize-none text-sm mb-2"
                  placeholder="Share your experience with this platform..."
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setComment("")}
                    className="btn-ghost"
                  >
                    Cancel
                  </button>
                  <button type="submit" disabled={submitting} className="btn-primary">
                    {submitting ? "Posting..." : "Comment"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="border border-border rounded p-4 text-center mb-6">
                <p className="text-sm text-text-muted mb-2">
                  Log in or sign up to leave a comment
                </p>
                <div className="flex gap-2 justify-center">
                  <Link to="/login" className="btn-secondary text-xs">Log In</Link>
                  <Link to="/register" className="btn-primary text-xs">Sign Up</Link>
                </div>
              </div>
            )}

            {/* Comment list */}
            <div className="space-y-4">
              {review.comments?.map((c) => (
                <div key={c.id} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-xs font-bold text-accent shrink-0 mt-0.5">
                    {(c.author_name || "A")[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-text-primary">
                        {c.author_name || "Anonymous"}
                      </span>
                      <span className="text-xs text-text-muted">
                        {timeAgo(c.created_at)}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {c.body}
                    </p>
                    <button className="btn-ghost text-xs mt-1 px-2 py-0.5">
                      ▲ Upvote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-3">
          <div className="bg-surface border border-border rounded-md p-4">
            <h3 className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-3">
              Platform Info
            </h3>
            {[
              ["Name", review.platform?.name],
              ["Category", categoryLabel(review.platform?.category)],
              ["Status", review.platform?.is_active ? "Active" : "Inactive"],
              ["Country", review.platform?.country_of_origin || "Unknown"],
            ].map(([label, value]) => (
              <div key={label} className="py-2 border-b border-border last:border-0">
                <span className="text-xs text-text-muted block">{label}</span>
                <span className="text-sm text-text-primary">{value}</span>
              </div>
            ))}
            {review.platform?.website_url && (
              <div className="pt-2">
                <span className="text-xs text-text-muted block mb-1">Website</span>
                <a
                  href={review.platform.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-accent font-mono break-all hover:underline"
                >
                  {review.platform.website_url}
                </a>
              </div>
            )}
          </div>

          <div className="bg-danger/5 border border-danger/20 rounded-md p-4">
            <h3 className="text-xs font-semibold text-danger uppercase tracking-widest mb-2">
              Scammed by this?
            </h3>
            <p className="text-xs text-text-muted mb-3 leading-relaxed">
              Submit your screenshots and evidence to warn others.
            </p>
            <Link to="/submit" className="btn-primary w-full justify-center text-xs">
              Submit Evidence
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}