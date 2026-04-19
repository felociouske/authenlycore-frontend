import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBlogPosts } from "../api/blog";
import BlogCard from "../components/blog/BlogCard";
import Spinner from "../components/common/Spinner";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";
import Pagination from "../components/common/Pagination";

const CATEGORIES = [
  { value: "", label: "All" },
  { value: "investigation", label: "Investigations" },
  { value: "scam_alert", label: "Scam Alerts" },
  { value: "legit_site", label: "Legit Sites" },
  { value: "guide", label: "Guides" },
];

export default function BlogPage() {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog", { category, search, page }],
    queryFn: () => getBlogPosts({ category, search, page }),
  });

  const posts = data?.data?.results || [];
  const count = data?.data?.count || 0;

  return (
    <div>
      <div className="mb-4">
        <h1 className="font-display font-bold text-2xl text-text-primary mb-1">
          Blog
        </h1>
        <p className="text-text-muted text-sm">
          Investigations, scam alerts, and honest guides.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => { setCategory(value); setPage(1); }}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                category === value
                  ? "bg-accent text-white"
                  : "bg-elevated border border-border text-text-muted hover:border-text-muted"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="input text-sm py-1.5 sm:w-52 sm:ml-auto"
        />
      </div>

      {isLoading && <Spinner />}
      {isError && <ErrorMessage />}
      {!isLoading && posts.length === 0 && (
        <EmptyState icon="📝" title="No posts yet" description="Check back soon." />
      )}

      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}

      <Pagination count={count} currentPage={page} onPageChange={setPage} />
    </div>
  );
}