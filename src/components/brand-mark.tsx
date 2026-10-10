export function BrandMark({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1.6" />
      <g transform="rotate(-24 22 30)">
        <path
          d="M16.6 7.8c0-1.5 11.2-1.5 11.2 0l2.4 27.4c0 2.6-16 2.6-16 0L16.6 7.8Z"
          fill="currentColor"
        />
        <rect x="19.6" y="34.6" width="6.2" height="18" rx="2.5" fill="currentColor" />
        <path
          d="M20.6 38h4.2M20.6 41h4.2M20.6 44h4.2M20.6 47h4.2"
          stroke="#070708"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </g>
      <circle cx="46.8" cy="44.2" r="10.2" fill="currentColor" />
      <circle cx="46.8" cy="44.2" r="10.2" stroke="#070708" strokeWidth="1.2" />
      <path
        d="M38.8 40.6c3.8 4.2 10.8 6.2 15.6 2.8"
        stroke="#070708"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M39.4 47.2c4 2.2 9.6 1.6 13.4-1.6"
        stroke="#070708"
        strokeWidth="1.7"
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
