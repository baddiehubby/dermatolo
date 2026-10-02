import type { FeatureIcon } from "@/lib/content";

export function BrandMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="30.25" stroke="currentColor" strokeWidth="0.75" />
      <path
        fill="currentColor"
        d="M32 9.2 33.4 13.6c2.6.2 5.4 1.3 7.2 3.1 3.1-2.6 7.3-3.3 11.1-1.4-1.9 2.6-2.6 5.2-1.9 7.8 2.8.5 5.4 1.9 7.3 3.8-3.8.9-6.6.7-8.7-.3.2 2.1 1.1 4 2.4 5.4-2.8-.2-5.2-1.2-6.8-2.8L41.2 40.6c-.7 2.4-1.9 4.2-3.5 5.6h-1.4c-.2-1.2-.7-2.6-1.6-4l-2.1-8.4-1.9 8.4c-.9 1.4-1.4 2.8-1.6 4h-1.4c-1.6-1.4-2.8-3.2-3.5-5.6l-2.8-10.1c-1.6 1.6-4 2.6-6.8 2.8 1.3-1.4 2.2-3.3 2.4-5.4-2.1 1-4.9 1.2-8.7.3 1.9-1.9 4.5-3.3 7.3-3.8.7-2.6 0-5.2-1.9-7.8 3.8-1.9 8-1.2 11.1 1.4 1.8-1.8 4.6-2.9 7.2-3.1L32 9.2Z"
      />
      <path
        fill="#070708"
        d="M32 18.2c.9 0 1.5.7 1.4 1.4-.1.6-.7 1-1.4 1s-1.3-.4-1.4-1c-.1-.7.5-1.4 1.4-1.4Z"
      />
    </svg>
  );
}

export function FeatureIconMark({ name }: { name: FeatureIcon }) {
  const common = {
    className: "h-5 w-5",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "chat":
      return (
        <svg {...common}>
          <path d="M5 16.5 3.8 20.2 7.6 19A8.5 8.5 0 1 0 5 16.5Z" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M12 21s6-5.1 6-10a6 6 0 1 0-12 0c0 4.9 6 10 6 10Z" />
          <circle cx="12" cy="11" r="1.6" />
        </svg>
      );
    case "list":
      return (
        <svg {...common}>
          <path d="M9 7h10M9 12h10M9 17h10" />
          <path d="M5 7h.01M5 12h.01M5 17h.01" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="5" y="10" width="14" height="10" rx="2" />
          <path d="M8 10V8a4 4 0 0 1 8 0v2" />
        </svg>
      );
    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3" />
          <path d="M5.5 19c1.2-2.6 3.4-4 6.5-4s5.3 1.4 6.5 4" />
        </svg>
      );
    case "label":
      return (
        <svg {...common}>
          <path d="M4 12V5h7l8 8-7 7-8-8Z" />
          <circle cx="8.5" cy="8.5" r="1" />
        </svg>
      );
    case "cash":
      return (
        <svg {...common}>
          <rect x="3" y="6.5" width="18" height="11" rx="2" />
          <circle cx="12" cy="12" r="2.4" />
          <path d="M6.5 9.5v.01M17.5 14.5v.01" />
        </svg>
      );
  }
}

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.5 3.5A11 11 0 0 0 2.1 18.3L1 23l4.8-1.1A11 11 0 1 0 20.5 3.5Zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-2.9.7.8-2.8-.2-.3a9.1 9.1 0 1 1 7.2 3.9Zm5-6.8c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.2-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.5-.8-2s-.4-.5-.6-.5h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.5 4 15 15 0 0 0 1.5.6 3.6 3.6 0 0 0 1.6.1 2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c0-.1-.3-.2-.6-.3Z" />
    </svg>
  );
}
