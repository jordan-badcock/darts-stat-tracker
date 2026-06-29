import Link from "next/link";
import { teams, players } from "@/lib/mock-data";

const leagueAvg = (
  teams.reduce((s, t) => s + t.threeDartAvg, 0) / teams.length
).toFixed(1);

const features = [
  {
    title: "Personal stats",
    body: "1-dart and 3-dart averages, tonnes, 180s, finishes, division and multi-level rank — with weekly power-ranking movement.",
  },
  {
    title: "Team stats",
    body: "Leg and game wins, win %, win/lose streaks, club-to-world ranking, plus the aggregate dart, tonne, 180 and finish numbers.",
  },
  {
    title: "Team management",
    body: "Team pages with logo, captain and roster. Players are moveable assets — add and drop them between teams across the season.",
  },
];

export default function Landing() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Hero */}
      <section className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div>
          <div className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-gold">
            Darts league platform
          </div>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            League management.
            <br />
            Stats that matter.
          </h1>
          <p className="mt-5 max-w-md text-ink-2">
            Track every leg, average, 180 and checkout for your whole league.
            Players, teams, schedules and standings in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-contrast transition-opacity hover:opacity-90"
            >
              Manage my league
            </Link>
            <Link
              href="/players"
              className="rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface-2"
            >
              Explore the demo
            </Link>
          </div>
        </div>

        {/* Stat preview */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { n: teams.length, l: "teams" },
            { n: leagueAvg, l: "league avg" },
            { n: `Wk 7`, l: "current round" },
            { n: players.length, l: "players" },
            { n: players.reduce((s, p) => s + p.oneEighties, 0), l: "180s this season" },
            { n: "A–D", l: "divisions" },
          ].map((s, i) => (
            <div
              key={i}
              className="rounded-xl border border-line bg-surface-1 p-4"
            >
              <div className="text-2xl font-semibold tnum text-accent-bright">
                {s.n}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-ink-3">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="grid gap-4 border-t border-line py-12 md:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="rounded-xl border border-line bg-surface-1 p-6">
            <h3 className="text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-ink-2">{f.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
