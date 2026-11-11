"use client";

import { useState } from "react";
import { WHATSAPP_DISPLAY } from "@/lib/site";
import { navigateToWhatsApp } from "@/lib/whatsapp";

type WhatsAppFallbackProps = {
  href: string;
  message: string;
  onClose: () => void;
};

/** Shown when wa.me navigation does not leave the page (common in in-app browsers). */
export function WhatsAppFallback({ href, message, onClose }: WhatsAppFallbackProps) {
  const [copied, setCopied] = useState(false);

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older WebViews without clipboard API
      const area = document.createElement("textarea");
      area.value = message;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wa-fallback-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md border border-gold/25 bg-ink px-5 py-6 shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-xs tracking-[0.28em] text-gold uppercase">WhatsApp checkout</p>
        <h3 id="wa-fallback-title" className="font-display mt-2 text-2xl text-ivory">
          WhatsApp didn&apos;t open?
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-mist">
          Copy your order message, then open WhatsApp and paste it. Or message{" "}
          <span className="tabular-nums text-gold-light">{WHATSAPP_DISPLAY}</span> directly.
        </p>

        <div className="mt-5 flex flex-col gap-3">
          <button type="button" className="wa-btn w-full" onClick={copyMessage}>
            {copied ? "Copied order message" : "Copy order message"}
          </button>
          <button
            type="button"
            className="ghost-btn w-full"
            onClick={() => navigateToWhatsApp(href)}
          >
            Open wa.me again
          </button>
          <a
            href={href}
            className="ghost-btn w-full text-center"
            rel="noopener noreferrer"
          >
            Open link in this tab
          </a>
        </div>

        <p className="mt-4 text-center text-sm tabular-nums text-mist">
          WhatsApp {WHATSAPP_DISPLAY}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full text-sm text-mist/70 underline-offset-2 hover:text-gold-light hover:underline"
        >
          Close
        </button>
      </div>
    </div>
  );
}
