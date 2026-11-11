"use client";

import { useEffect, useRef, useState } from "react";
import {
  buildOrderMessage,
  decodeWaMessage,
  navigateToWhatsApp,
} from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Icons";
import { WhatsAppFallback } from "./WhatsAppFallback";

type WhatsAppButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Plain message for clipboard fallback; decoded from href when omitted. */
  message?: string;
  showIcon?: boolean;
  /** Visual style — wa (green) or ghost (outline). */
  variant?: "wa" | "ghost";
  "aria-label"?: string;
};

/**
 * ORDER NOW / WhatsApp CTA.
 * Same-tab location.assign from the click gesture — target=_blank and window.open
 * are unreliable in TikTok / Instagram in-app browsers and get popup-blocked.
 */
export function WhatsAppButton({
  href,
  children,
  className = "",
  message,
  showIcon = true,
  variant = "wa",
  "aria-label": ariaLabel,
}: WhatsAppButtonProps) {
  const [fallbackOpen, setFallbackOpen] = useState(false);
  const fallbackTimer = useRef<number | null>(null);

  const plainMessage =
    message ?? decodeWaMessage(href) ?? buildOrderMessage({ quantity: 1 });

  useEffect(() => {
    return () => {
      if (fallbackTimer.current) window.clearTimeout(fallbackTimer.current);
    };
  }, []);

  function clearFallbackTimer() {
    if (fallbackTimer.current) {
      window.clearTimeout(fallbackTimer.current);
      fallbackTimer.current = null;
    }
  }

  function scheduleFallback() {
    clearFallbackTimer();
    fallbackTimer.current = window.setTimeout(() => {
      if (document.visibilityState === "visible") {
        setFallbackOpen(true);
      }
    }, 1600);
  }

  function onClick(event: React.MouseEvent<HTMLAnchorElement>) {
    // Allow browser-native open-in-new-tab shortcuts.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }

    event.preventDefault();
    scheduleFallback();
    // Same-tab assign from a direct user gesture — primary path for Android Chrome,
    // iPhone Safari, and TikTok / Instagram in-app browsers.
    navigateToWhatsApp(href);
  }

  const baseClass = variant === "ghost" ? "ghost-btn" : "wa-btn";

  return (
    <>
      <a
        href={href}
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={`${baseClass} ${className}`}
        onClick={onClick}
      >
        {showIcon ? <WhatsAppIcon /> : null}
        {children}
      </a>
      {fallbackOpen ? (
        <WhatsAppFallback
          href={href}
          message={plainMessage}
          onClose={() => {
            clearFallbackTimer();
            setFallbackOpen(false);
          }}
        />
      ) : null}
    </>
  );
}
