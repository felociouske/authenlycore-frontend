export default function RatingStars({ rating, size = "sm" }) {
  const filled = Math.round(Number(rating));
  const sizeClass = size === "lg" ? "text-xl" : "text-sm";

  return (
    <span className={`inline-flex gap-0.5 ${sizeClass}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= filled ? "text-accent" : "text-border"}
        >
          ★
        </span>
      ))}
    </span>
  );
}