"use client";

import { useEffect, useState } from "react";

const BRANDS = [
  { id: "leaguemaster", label: "LeagueMaster" },
  { id: "dartsleaguehq", label: "DartsLeague HQ" },
  { id: "openleg", label: "Open Leg" },
  { id: "bullpen", label: "Bullpen" },
  { id: "chalkline", label: "Chalk Line" },
];

export function ThemeSwitcher() {
  const [brand, setBrand] = useState("leaguemaster");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current) setBrand(current);
  }, []);

  function change(next: string) {
    setBrand(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("brand", next);
    } catch {}
  }

  return (
    <label className="flex items-center gap-2 text-xs text-ink-3">
      <span className="hidden sm:inline">Brand</span>
      <select
        value={brand}
        onChange={(e) => change(e.target.value)}
        className="rounded-md border border-line bg-surface-2 px-2 py-1 text-xs text-ink focus:outline-none"
        aria-label="Brand theme"
      >
        {BRANDS.map((b) => (
          <option key={b.id} value={b.id}>
            {b.label}
          </option>
        ))}
      </select>
    </label>
  );
}
