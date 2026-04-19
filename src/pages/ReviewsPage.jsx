import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getReviews } from "../api/reviews";
import ReviewCard from "../components/reviews/ReviewCard";
import Spinner from "../components/common/Spinner";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";
import Pagination from "../components/common/Pagination";

const VERDICTS = [
  { value: "", label: "All" },
  { value: "scam", label: "Scam" },
  { value: "legitimate", label: "Legitimate" },
  { value: "suspicious", label: "Suspicious" },
  { value: "unverified", label: "Unverified" },
];

const CATEGORIES = [
  { value: "", label: "All Categories" },
  { value: "mlm", label: "MLM" },
  { value: "crypto", label: "Crypto" },
  { value: "survey", label: "Survey / GPT" },
  { value: "freelance", label: "Freelance" },
  { value: "forex", label: "Forex" },
  { value: "dropship", label: "Dropshipping" },
  { value: "app", label: "App / Mobile" },
];

export default function ReviewsPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [verdict, setVerdict] = useState(searchParams.get("verdict") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["reviews", { search, verdict, category, page }],
    queryFn: () => getReviews({ search, verdict, category, page }),
  });

  const reviews = data?.data?.results || [];
  const count = data?.data?.count || 0;

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <h1 className="font-display font-bold text-2xl text-text-primary mb-1">
          Platform Reviews
        </h1>
        <p className="text-text-muted text-sm">
          Evidence-backed reviews. Read before you invest.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-surface border border-border rounded-md p-3 mb-4 flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Search platforms..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="input flex-1 text-sm py-2"
        />
        <div className="flex gap-2">
          <select
            value={verdict}
            onChange={(e) => { setVerdict(e.target.value); setPage(1); }}
            className="input text-sm py-2 w-36"
          >
            {VERDICTS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            className="input text-sm py-2 w-40"
          >
            {CATEGORIES.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Verdict pills */}
      <div className="flex gap-2 flex-wrap mb-4">
        {VERDICTS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => { setVerdict(value); setPage(1); }}
            className={`text-xs px-3 py-1 rounded-full font-medium transition-all ${
              verdict === value
                ? "bg-accent text-white"
                : "bg-elevated border border-border text-text-muted hover:border-text-muted"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {!isLoading && (
        <p className="text-xs text-text-muted mb-3">
          {count} result{count !== 1 ? "s" : ""}
        </p>
      )}

      {isLoading && <Spinner />}
      {isError && <ErrorMessage />}
      {!isLoading && reviews.length === 0 && (
        <EmptyState
          title="No reviews found"
          description="Try different filters."
        />
      )}

      <div>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      <Pagination count={count} currentPage={page} onPageChange={setPage} />
    </div>
  );
}