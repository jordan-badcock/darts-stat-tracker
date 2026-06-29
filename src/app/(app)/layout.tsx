import { Suspense } from "react";
import { Wordmark } from "@/components/Wordmark";
import { TopNavLinks, BottomTabBar } from "@/components/Nav";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { ViewToggle } from "@/components/ViewToggle";
import { league } from "@/lib/mock-data";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-line bg-surface-1/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
          <Wordmark href="/" />
          <Suspense fallback={null}>
            <TopNavLinks />
          </Suspense>
          <div className="ml-auto flex items-center gap-3">
            <Suspense fallback={null}>
              <ViewToggle />
            </Suspense>
            <ThemeSwitcher />
            <button className="hidden rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-accent-contrast sm:inline-block">
              Sign in
            </button>
          </div>
        </div>
      </header>

      <div className="border-b border-line bg-bg">
        <div className="mx-auto max-w-6xl px-4 py-2 text-xs text-ink-3">
          {league.name} · {league.location} · Season {league.season} · Week{" "}
          {league.currentWeek}
        </div>
      </div>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 pb-24 md:pb-10">
        {children}
      </main>

      <Suspense fallback={null}>
        <BottomTabBar />
      </Suspense>
    </div>
  );
}
