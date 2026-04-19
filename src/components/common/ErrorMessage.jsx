export default function ErrorMessage({
  message = "Something went wrong. Please try again.",
}) {
  return (
    <div className="flex items-center gap-3 bg-danger/10 border border-danger/20 text-danger rounded px-4 py-3 text-sm">
      <span>!</span>
      {message}
    </div>
  );
}