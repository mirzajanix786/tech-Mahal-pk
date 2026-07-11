import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  reviewCount?: number;
}

export default function StarRating({
  rating,
  size = 13,
  showValue = false,
  reviewCount,
}: StarRatingProps) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5 text-gold-400" aria-hidden="true">
        {Array.from({ length: full }).map((_, i) => (
          <FaStar key={`full-${i}`} size={size} />
        ))}
        {hasHalf && <FaStarHalfAlt size={size} />}
        {Array.from({ length: empty }).map((_, i) => (
          <FaRegStar key={`empty-${i}`} size={size} />
        ))}
      </div>
      {showValue && (
        <span className="text-xs text-platinum-400">
          {rating.toFixed(1)}
          {typeof reviewCount === "number" && ` (${reviewCount})`}
        </span>
      )}
    </div>
  );
}
