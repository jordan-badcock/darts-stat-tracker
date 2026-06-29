"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type Item = { href: string; label: string; icon: React.ReactNode };

const I = (path: React.ReactNode) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

const ITEMS: Item[] = [
  { href: "/dashboard", label: "Overview", icon: I(<><path d="M3 12l9-8 9 8" /><path d="M5 10v10h14V10" /></>) },
  { href: "/players", label: "Players", icon: I(<><circle cx="12" cy="8" r="3.2" /><path d="M5 20a7 7 0 0 1 14 0" /></>) },
  { href: "/teams", label: "Teams", icon: I(<><circle cx="9" cy="9" r="2.6" /><circle cx="17" cy="10" r="2.2" /><path d="M3 19a6 6 0 0 1 12 0" /><path d="M15 19a5 5 0 0 1 6-1.5" /></>) },
  { href: "/schedule", label: "Schedule", icon: I(<><rect x="3.5" y="4.5" width="17" height="16" rx="2" /><path d="M3.5 9h17M8 3v3M16 3v3" /></>) },
  { href: "/standings", label: "Standings", icon: I(<><path d="M6 21V9M12 21V4M18 21v-7" /></>) },
];

function useHref() {
  const params = useSearchParams();
  const suffix = params.get("view") === "empty" ? "?view=empty" : "";
  return (href: string) => `${href}${suffix}`;
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

export function TopNavLinks() {
  const pathname = usePathname();
  const href = useHref();
  return (
    <nav className="hidden items-center gap-1 md:flex">
      {ITEMS.map((it) => (
        <Link
          key={it.href}
          href={href(it.href)}
          className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
            isActive(pathname, it.href)
              ? "bg-surface-2 text-ink"
              : "text-ink-3 hover:text-ink-2"
          }`}
        >
          {it.label}
        </Link>
      ))}
    </nav>
  );
}

export function BottomTabBar() {
  const pathname = usePathname();
  const href = useHref();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface-1/95 backdrop-blur md:hidden">
      <ul className="flex">
        {ITEMS.map((it) => {
          const active = isActive(pathname, it.href);
          return (
            <li key={it.href} className="flex-1">
              <Link
                href={href(it.href)}
                className={`flex min-h-[56px] flex-col items-center justify-center gap-0.5 py-2 text-[10px] ${
                  active ? "text-accent-bright" : "text-ink-3"
                }`}
              >
                {it.icon}
                <span>{it.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
