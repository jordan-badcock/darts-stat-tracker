import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-line">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
          <Wordmark href="/" />
          <nav className="ml-auto flex items-center gap-3">
            <ThemeSwitcher />
            <Link
              href="/dashboard"
              className="text-sm text-ink-3 transition-colors hover:text-ink-2"
            >
              Sign in
            </Link>
            <Link
              href="/dashboard"
              className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-accent-contrast transition-opacity hover:opacity-90"
            >
              Manage my league
            </Link>
          </nav>
        </div>
      </header>
      <div className="flex-1">{children}</div>
      <footer className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-ink-3">
          Prototype · darts league stats tracker · brand themes are switchable
          above
        </div>
      </footer>
    </div>
  );
}
