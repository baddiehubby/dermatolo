"use client";

import { useState } from "react";
import { copy } from "@/data/copy";
import { useLanguage } from "@/lib/language";
import {
  buildWhatsAppFallbackUrl,
  buildWhatsAppUrl,
} from "@/lib/whatsapp";

type Props = {
  message: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function WhatsAppButton({
  message,
  children,
  className,
  onClick,
}: Props) {
  const { tx } = useLanguage();
  const [showFallback, setShowFallback] = useState(false);
  const url = buildWhatsAppUrl(message);
  const fallback = buildWhatsAppFallbackUrl(message);

  return (
    <div className="flex flex-col gap-2">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={() => {
          onClick?.();
          window.setTimeout(() => setShowFallback(true), 1200);
        }}
      >
        {children}
      </a>
      {showFallback ? (
        <p className="text-xs leading-5 text-[#f3eee4]/55">
          {tx(copy.product.fallbackLead)}{" "}
          <a
            href={fallback}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#25D366] underline"
          >
            {tx(copy.product.fallbackLink)}
          </a>
          {tx(copy.product.fallbackTail)}
        </p>
      ) : null}
    </div>
  );
}
