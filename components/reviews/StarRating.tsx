import { toUrduDigits } from "@/lib/reviews";

const STAR_PATH = "m12 2.6 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.2 1.2-6.5L2.5 9.5l6.6-.9L12 2.6Z";

function StarRow({ className }: { className: string }) {
  return (
    <span className={`flex shrink-0 ${className}`} aria-hidden>
      {[0, 1, 2, 3, 4].map((index) => (
        <svg key={index} viewBox="0 0 24 24" className="h-full w-auto shrink-0 aspect-square" fill="currentColor">
          <path d={STAR_PATH} />
        </svg>
      ))}
    </span>
  );
}

type StarRatingProps = {
  /** 0 to 5. Fractions fill part of a star (used for the average of real reviews). */
  value: number;
  className?: string;
};

/** Only render this from real review data. There is deliberately no default value. */
export function StarRating({ value, className = "h-4" }: StarRatingProps) {
  const clamped = Math.min(5, Math.max(0, value));
  const label = `پانچ میں سے ${toUrduDigits(Number(clamped.toFixed(1)))} ستارے`;
  return (
    <span role="img" aria-label={label} className={`relative inline-flex ${className}`}>
      <StarRow className="text-gold/20" />
      <span
        className="absolute inset-y-0 start-0 flex overflow-hidden text-gold drop-shadow-[0_0_6px_rgba(201,162,39,0.45)]"
        style={{ width: `${(clamped / 5) * 100}%` }}
        aria-hidden
      >
        <StarRow className="h-full" />
      </span>
    </span>
  );
}
