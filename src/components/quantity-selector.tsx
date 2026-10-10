"use client";

type Props = {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
};

export function QuantitySelector({
  value,
  min = 1,
  max = 20,
  onChange,
}: Props) {
  return (
    <div className="inline-flex items-center rounded-full border border-white/15 bg-[#111113] text-[#f3eee4]">
      <button
        type="button"
        className="h-10 w-10 text-lg"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        −
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        onChange={(event) => {
          const next = Number.parseInt(event.target.value, 10);
          if (Number.isNaN(next)) return;
          onChange(Math.min(max, Math.max(min, next)));
        }}
        className="h-10 w-12 border-x border-white/15 bg-transparent text-center text-sm font-semibold outline-none"
        aria-label="Quantity"
      />
      <button
        type="button"
        className="h-10 w-10 text-lg"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        +
      </button>
    </div>
  );
}
