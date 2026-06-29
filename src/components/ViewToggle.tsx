"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

// Flip the whole app between seeded demo data and a freshly-created (empty)
// league, so the real first-run onboarding experience is demoable too.
export function ViewToggle() {
  const pathname = usePathname();
  const params = useSearchParams();
  const view = params.get("view") === "empty" ? "empty" : "demo";

  const link = (v: "demo" | "empty") =>
    v === "demo" ? pathname : `${pathname}?view=empty`;

  return (
    <div className="flex items-center rounded-md border border-line bg-surface-2 p-0.5 text-xs">
      {(["demo", "empty"] as const).map((v) => (
        <Link
          key={v}
          href={link(v)}
          className={`rounded px-2 py-1 capitalize transition-colors ${
            view === v ? "bg-accent text-accent-contrast" : "text-ink-3 hover:text-ink-2"
          }`}
        >
          {v === "demo" ? "Demo data" : "Empty league"}
        </Link>
      ))}
    </div>
  );
}
