import Link from "next/link";
import {
  getData,
  parseView,
  standings,
  topByThreeDart,
  topMovers,
  teamById,
} from "@/lib/mock-data";
import { Card, SectionTitle } from "@/components/ui";
import { StandingsTable } from "@/components/StandingsTable";
import { PowerDelta } from "@/components/PowerDelta";
import { EmptyState } from "@/components/EmptyState";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  const { league, teams, players } = getData(parseView(view));

  if (teams.length === 0) {
    return (
      <>
        <h1 className="mb-6 text-2xl font-semibold">{league.name}</h1>
        <EmptyState
          title="Your league is ready"
          body="Add your first team to start tracking standings, averages and schedules. Players can be added and moved between teams at any time."
          ctaLabel="Add your first team"
          ctaHref="/teams?view=empty"
          hint={
            <>
              Your league code sheet:{" "}
              <span className="tnum text-ink-2">RC-2025-7F3K</span>
            </>
          }
        />
      </>
    );
  }

  const table = standings(teams);
  const leagueAvg = (
    teams.reduce((s, t) => s + t.threeDartAvg, 0) / teams.length
  ).toFixed(1);

  const kpis = [
    { n: teams.length, l: "teams" },
    { n: players.length, l: "players" },
    { n: leagueAvg, l: "league 3-dart avg" },
    { n: `Wk ${league.currentWeek}`, l: "current round" },
  ];

  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold">Overview</h1>

      <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.l} className="rounded-xl border border-line bg-surface-1 p-4">
            <div className="text-2xl font-semibold tnum text-accent-bright">{k.n}</div>
            <div className="mt-1 text-[11px] uppercase tracking-wider text-ink-3">
              {k.l}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <SectionTitle>Standings</SectionTitle>
            <Link href="/standings" className="text-xs text-ink-3 hover:text-ink-2">
              Full table →
            </Link>
          </div>
          <StandingsTable rows={table} />
        </section>

        <div className="space-y-8">
          <section>
            <SectionTitle>Top performers</SectionTitle>
            <Card className="divide-y divide-line">
              {topByThreeDart(players, 5).map((p) => (
                <Link
                  key={p.id}
                  href={`/players/${p.id}`}
                  className="flex items-center justify-between px-4 py-3 hover:bg-surface-2"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{p.name}</span>
                    <span className="block truncate text-xs text-ink-3">
                      {teamById(teams, p.teamId ?? "")?.name ?? "Free agent"}
                    </span>
                  </span>
                  <span className="tnum font-semibold text-accent-bright">
                    {p.threeDartAvg.toFixed(1)}
                  </span>
                </Link>
              ))}
            </Card>
          </section>

          <section>
            <SectionTitle>Power movers · this week</SectionTitle>
            <Card className="divide-y divide-line">
              {topMovers(players, 5).map((p) => (
                <Link
                  key={p.id}
                  href={`/players/${p.id}`}
                  className="flex items-center justify-between px-4 py-3 hover:bg-surface-2"
                >
                  <span className="truncate text-sm font-medium">{p.name}</span>
                  <PowerDelta value={p.powerDelta} />
                </Link>
              ))}
            </Card>
          </section>
        </div>
      </div>
    </>
  );
}
