import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { getReviews } from "../api/reviews";
import { getBlogPosts } from "../api/blog";
import ReviewCard from "../components/reviews/ReviewCard";
import BlogCard from "../components/blog/BlogCard";
import Spinner from "../components/common/Spinner";

const SORT_TABS = ["Hot", "New", "Top", "Rising"];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("Hot");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { data: reviewsData, isLoading: reviewsLoading } = useQuery({
    queryKey: ["reviews-home"],
    queryFn: () => getReviews({ page_size: 5 }),
  });

  const { data: blogData, isLoading: blogLoading } = useQuery({
    queryKey: ["blog-home"],
    queryFn: () => getBlogPosts({ page_size: 4 }),
  });

  const reviews = reviewsData?.data?.results || [];
  const posts = blogData?.data?.results || [];

  return (
    <div className="flex gap-6">
      {/* Main feed */}
      <div className="flex-1 min-w-0">

        {/* Create post bar */}
        <div className="flex items-center gap-2 bg-surface border border-border rounded-md p-2 mb-4">
          <div className="w-8 h-8 rounded bg-elevated border border-border flex items-center justify-center text-text-muted text-xs shrink-0">
            TW
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && search.trim()) {
                navigate(`/reviews?search=${encodeURIComponent(search.trim())}`);
              }
            }}
            placeholder="Search a platform name..."
            className="input flex-1 rounded py-1.5 text-sm"
          />
          <Link to="/submit" className="btn-secondary text-xs px-3 py-1.5 shrink-0">
            Submit
          </Link>
        </div>

        {/* Sort tabs */}
        <div className="flex items-center gap-1 bg-surface border border-border rounded-md px-2 py-1.5 mb-4">
          {SORT_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-elevated text-text-primary"
                  : "text-text-muted hover:bg-elevated/50 hover:text-text-secondary"
              }`}
            >
              {tab === "Hot" && "🔥"}
              {tab === "New" && "✨"}
              {tab === "Top" && "📈"}
              {tab === "Rising" && "⬆"}
              {tab}
            </button>
          ))}
        </div>

        {/* Alert banner */}
        <div className="bg-danger/5 border border-danger/20 rounded-md px-4 py-3 mb-4 flex items-start gap-3">
          <span className="text-danger text-lg shrink-0">⚠</span>
          <div>
            <p className="text-sm font-semibold text-danger mb-0.5">
              Scam Activity Alert
            </p>
            <p className="text-xs text-text-muted">
              We are tracking a surge in fake investment platforms targeting East Africa.
              Always verify before investing.{" "}
              <Link to="/reviews?verdict=scam" className="text-accent hover:underline">
                See confirmed scams →
              </Link>
            </p>
          </div>
        </div>

        {/* Reviews feed */}
        <div className="mb-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-widest">
              Latest Reviews
            </span>
            <div className="flex-1 h-px bg-border" />
            <Link to="/reviews" className="text-xs text-accent hover:underline">
              See all
            </Link>
          </div>
          {reviewsLoading ? (
            <Spinner />
          ) : (
            reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          )}
        </div>

        {/* Blog feed */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-widest">
              From the Blog
            </span>
            <div className="flex-1 h-px bg-border" />
            <Link to="/blog" className="text-xs text-accent hover:underline">
              See all
            </Link>
          </div>
          {blogLoading ? (
            <Spinner />
          ) : (
            posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))
          )}
        </div>
      </div>

      {/* Right sidebar */}
      <aside className="hidden xl:block w-72 shrink-0 space-y-4">

        {/* About box */}
        <div className="bg-surface border border-border rounded-md overflow-hidden">
          <div className="bg-gradient-to-r from-accent to-orange-400 px-4 py-6">
            <h3 className="font-display font-bold text-white text-base">
              TruthfulWasp
            </h3>
            <p className="text-orange-100 text-xs mt-1">
              The community for exposing online scams
            </p>
          </div>
          <div className="p-4 space-y-3 text-sm">
            <p className="text-text-muted text-xs leading-relaxed">
              We investigate money-making platforms and publish evidence-backed
              reviews to protect people from fraud.
            </p>
            <div className="grid grid-cols-2 gap-2 text-center py-2 border-y border-border">
              <div>
                <div className="font-bold text-text-primary">500+</div>
                <div className="text-xs text-text-muted">Reviews</div>
              </div>
              <div>
                <div className="font-bold text-text-primary">1.2k+</div>
                <div className="text-xs text-text-muted">Reports</div>
              </div>
            </div>
            <Link to="/submit" className="btn-primary w-full justify-center">
              Submit Evidence
            </Link>
            <Link to="/register" className="btn-secondary w-full justify-center">
              Create Account
            </Link>
          </div>
        </div>

        {/* Community rules */}
        <div className="bg-surface border border-border rounded-md p-4">
          <h3 className="font-semibold text-text-primary text-sm mb-3">
            Community Guidelines
          </h3>
          <ol className="space-y-2">
            {[
              "Submit only authentic evidence",
              "No harassment of individuals",
              "Cite your sources",
              "Respect victim privacy",
              "No promotion of any platform",
            ].map((rule, i) => (
              <li key={i} className="flex gap-2 text-xs text-text-muted">
                <span className="text-accent font-bold shrink-0">{i + 1}.</span>
                {rule}
              </li>
            ))}
          </ol>
        </div>

        {/* Top scams */}
        <div className="bg-surface border border-border rounded-md p-4">
          <h3 className="font-semibold text-text-primary text-sm mb-3">
            🔥 Most Reported This Month
          </h3>
          <div className="space-y-2">
            {[
              "Forex Pro Signals",
              "CryptoDoubler.io",
              "EasyMoneyApp",
              "InvestSmart Africa",
              "QuickCash Network",
            ].map((name, i) => (
              <Link
                key={name}
                to={`/reviews?search=${encodeURIComponent(name)}`}
                className="flex items-center gap-2 text-xs text-text-muted hover:text-text-primary transition-colors group"
              >
                <span className="font-bold text-accent w-4">{i + 1}</span>
                <span className="group-hover:text-accent transition-colors">
                  {name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}