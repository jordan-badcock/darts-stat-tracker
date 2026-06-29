"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Each brand has its own name. The wordmark updates live when the theme
// changes, so flipping the brand switcher changes the whole identity.
const NAMES: Record<string, { a: string; b: string; tail: string }> = {
  leaguemaster: { a: "League", b: "Master", tail: "DARTS" },
  dartsleaguehq: { a: "Darts", b: "League", tail: "HQ" },
  openleg: { a: "Open ", b: "Leg", tail: "DARTS" },
  bullpen: { a: "Bull", b: "pen", tail: "LEAGUE" },
  chalkline: { a: "Chalk", b: "Line", tail: "DARTS" },
};

export function Wordmark({ href = "/" }: { href?: string }) {
  const [theme, setTheme] = useState("leaguemaster");

  useEffect(() => {
    const el = document.documentElement;
    const read = () => setTheme(el.getAttribute("data-theme") || "leaguemaster");
    read();
    const obs = new MutationObserver(read);
    obs.observe(el, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  const name = NAMES[theme] ?? NAMES.leaguemaster;

  return (
    <Link href={href} className="flex items-center gap-2.5">
      <span className="text-accent-bright" aria-hidden>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="12" cy="12" r="1.6" fill="currentColor" />
        </svg>
      </span>
      <span className="text-[15px] font-semibold leading-none">
        <span className="text-ink">{name.a}</span>
        <span className="text-accent-bright">{name.b}</span>
        <span className="ml-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-gold align-middle">
          {name.tail}
        </span>
      </span>
    </Link>
  );
}
