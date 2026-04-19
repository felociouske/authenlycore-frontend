export default function Pagination({ count, pageSize = 12, currentPage, onPageChange }) {
  const totalPages = Math.ceil(count / pageSize);
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-3 py-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn-secondary disabled:opacity-30"
      >
        Prev
      </button>
      <span className="text-sm text-text-muted">
        {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn-secondary disabled:opacity-30"
      >
        Next
      </button>
    </div>
  );
}