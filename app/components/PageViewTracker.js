"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ANALYTICS_URL = "https://ark-websites-ocm.vercel.app/api/analytics/page-view";
const CLIENT_ID = "tabor-painting";

function sessionId() {
  const storageKey = "ark-ocm-session-id";
  const existing = window.sessionStorage.getItem(storageKey);
  if (existing) return existing;

  const created = typeof crypto?.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  window.sessionStorage.setItem(storageKey, created);
  return created;
}

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const dedupeKey = "ark-ocm-last-page-view";
    const now = Date.now();
    const previous = window.sessionStorage.getItem(dedupeKey);

    if (previous) {
      try {
        const parsed = JSON.parse(previous);
        if (parsed.path === pathname && now - Number(parsed.time || 0) < 2000) return;
      } catch {
        // Ignore an unreadable dedupe value and record the current view.
      }
    }

    window.sessionStorage.setItem(dedupeKey, JSON.stringify({ path: pathname, time: now }));

    fetch(ANALYTICS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId: CLIENT_ID,
        path: pathname,
        url: window.location.href,
        referrer: document.referrer,
        sessionId: sessionId(),
      }),
      keepalive: true,
    }).catch(() => {
      // Analytics must never interrupt the customer website experience.
    });
  }, [pathname]);

  return null;
}
