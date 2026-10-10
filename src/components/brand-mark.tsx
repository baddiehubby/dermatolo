export function BrandMark({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1.4" />
      <g transform="rotate(-36 30 28)">
        <rect x="26.2" y="8" width="7.6" height="27" rx="3.8" fill="currentColor" />
        <rect x="27.6" y="34" width="4.8" height="14.5" rx="2.2" fill="currentColor" />
        <path d="M28.2 36.6h5.6M28.2 39.2h5.6M28.2 41.8h5.6" stroke="#070708" strokeWidth="1" />
      </g>
      <circle cx="44.5" cy="43.5" r="8" fill="currentColor" />
      <path
        d="M38.8 40.6c2.6 3.1 7.6 4.6 11.2 2.4"
        stroke="#070708"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M39.4 45.8c2.8 1.6 7.1 1.2 9.6-1"
        stroke="#070708"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2 text-[#c9a227]">
      <BrandMark className={compact ? "h-9 w-9" : "h-11 w-11"} />
      <span className="leading-tight">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.22em]">KAPTAAN 804</span>
        <span className="block text-[10px] uppercase tracking-[0.18em] text-[#f3eee4]/70">
          Eagle Delay Spray
        </span>
      </span>
    </span>
  );
}
