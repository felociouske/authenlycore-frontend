import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-base flex items-center justify-center text-center px-4">
      <div>
        <div className="font-display font-bold text-8xl text-elevated select-none mb-4">
          404
        </div>
        <h1 className="font-display font-bold text-xl text-text-primary mb-2">
          Page not found
        </h1>
        <p className="text-text-muted text-sm mb-6">
          This page does not exist or has been removed.
        </p>
        <Link to="/" className="btn-primary">Go Home</Link>
      </div>
    </div>
  );
}