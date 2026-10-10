"use client";

import { useState } from "react";
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
        <p className="text-xs leading-5 text-stone-500">
          WhatsApp should open with your order request. If it did not,{" "}
          <a
            href={fallback}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-green-700 underline"
          >
            tap this backup link
          </a>
          . The message is sent only after you press send in WhatsApp.
        </p>
      ) : null}
    </div>
  );
}
