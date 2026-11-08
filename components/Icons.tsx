export function BrandMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="62" height="62" rx="8" stroke="currentColor" strokeWidth="1.25" />
      <text
        x="32"
        y="40"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="22"
        letterSpacing="1"
      >
        M
      </text>
    </svg>
  );
}

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.5 3.5A11 11 0 0 0 2.1 18.3L1 23l4.8-1.1A11 11 0 1 0 20.5 3.5Zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-2.9.7.8-2.8-.2-.3a9.1 9.1 0 1 1 7.2 3.9Zm5-6.8c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.2-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.5-.8-2s-.4-.5-.6-.5h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.5 4 15 15 0 0 0 1.5.6 3.6 3.6 0 0 0 1.6.1 2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c0-.1-.3-.2-.6-.3Z" />
    </svg>
  );
}
