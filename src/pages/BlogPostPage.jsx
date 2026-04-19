import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBlogPost, postBlogComment } from "../api/blog";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/common/Spinner";
import ErrorMessage from "../components/common/ErrorMessage";
import { formatDate, timeAgo } from "../utils";
import toast from "react-hot-toast";

const categoryStyle = {
  investigation: "bg-purple-400/10 text-purple-400 border-purple-400/20",
  scam_alert: "bg-danger/10 text-danger border-danger/20",
  legit_site: "bg-trust/10 text-trust border-trust/20",
  guide: "bg-blue-400/10 text-blue-400 border-blue-400/20",
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => getBlogPost(slug),
  });

  const post = data?.data;

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setSubmitting(true);
    try {
      await postBlogComment(slug, { body: comment });
      setComment("");
      refetch();
      toast.success("Comment submitted for moderation.");
    } catch {
      toast.error("Failed to post.");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return <Spinner />;
  if (isError || !post) return <ErrorMessage message="Post not found." />;

  return (
    <div>
      <div className="text-xs text-text-muted mb-4 flex items-center gap-2">
        <Link to="/blog" className="hover:text-accent transition-colors">Blog</Link>
        <span>/</span>
        <span className="text-text-secondary truncate">{post.title}</span>
      </div>

      <div className="bg-surface border border-border rounded-md p-6 mb-3">
        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-text-muted mb-3 flex-wrap">
          <span className={`badge border ${categoryStyle[post.category] || "bg-white/5 border-border text-text-muted"}`}>
            {post.category?.replace("_", " ")}
          </span>
          <span>•</span>
          <span>by {post.author?.username}</span>
          <span>•</span>
          <span>{formatDate(post.published_at)}</span>
          <span>•</span>
          <span>{post.reading_time_minutes} min read</span>
        </div>

        <h1 className="font-display font-bold text-2xl text-text-primary leading-snug mb-4">
          {post.title}
        </h1>

        {post.cover_image && (
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full rounded mb-5 max-h-72 object-cover"
          />
        )}

        {/* Body with editorial font */}
        <div
          className="editorial text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-border">
            {post.tags.map((tag) => (
              <span
                key={tag.id}
                className="text-xs font-mono text-text-muted bg-elevated border border-border px-2.5 py-1 rounded"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-1 mt-4 pt-3 border-t border-border">
          <button className="btn-ghost">▲ Upvote</button>
          <button className="btn-ghost">▼ Downvote</button>
          <button className="btn-ghost">🔗 Share</button>
        </div>
      </div>

      {/* Comments */}
      <div className="bg-surface border border-border rounded-md p-5">
        <h2 className="text-sm font-semibold text-text-primary mb-4">
          {post.comments?.length || 0} Comments
        </h2>

        {user ? (
          <form onSubmit={handleComment} className="mb-6">
            <div className="bg-elevated border border-border rounded px-3 py-2 mb-2 text-xs text-text-muted">
              Commenting as <span className="text-accent">{user.username}</span>
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="input resize-none text-sm mb-2"
              placeholder="What are your thoughts?"
            />
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setComment("")} className="btn-ghost">Cancel</button>
              <button type="submit" disabled={submitting} className="btn-primary">
                {submitting ? "Posting..." : "Comment"}
              </button>
            </div>
          </form>
        ) : (
          <div className="border border-border rounded p-4 text-center mb-6">
            <p className="text-sm text-text-muted mb-2">
              Log in to join the discussion
            </p>
            <div className="flex gap-2 justify-center">
              <Link to="/login" className="btn-secondary text-xs">Log In</Link>
              <Link to="/register" className="btn-primary text-xs">Sign Up</Link>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {post.comments?.map((c) => (
            <div key={c.id} className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-xs font-bold text-accent shrink-0 mt-0.5">
                {(c.author_name || "A")[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-text-primary">{c.author_name || "Anonymous"}</span>
                  <span className="text-xs text-text-muted">{timeAgo(c.created_at)}</span>
                </div>
                <p className="text-sm text-text-secondary">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}