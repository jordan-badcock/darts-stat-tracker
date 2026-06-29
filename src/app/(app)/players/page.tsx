import Link from "next/link";
import { getData, parseView, teamById } from "@/lib/mock-data";
import { Avatar, DivisionBadge } from "@/components/ui";
import { PowerDelta } from "@/components/PowerDelta";
import { EmptyState } from "@/components/EmptyState";

export default async function PlayersPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  const { teams, players } = getData(parseView(view));

  const sorted = [...players].sort((a, b) => b.threeDartAvg - a.threeDartAvg);

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Players</h1>
        {players.length > 0 ? (
          <span className="text-sm text-ink-3 tnum">{players.length} registered</span>
        ) : null}
      </div>

      {players.length === 0 ? (
        <EmptyState
          title="No players yet"
          body="Add players to your league, then assign them to teams. Players are moveable — you can drop and add them between teams all season."
          ctaLabel="Add a player"
          ctaHref="/players?view=empty"
        />
      ) : (
        <ul className="grid gap-2 sm:grid-cols-2">
          {sorted.map((p) => (
            <li key={p.id}>
              <Link
                href={`/players/${p.id}`}
                className="flex items-center gap-3 rounded-xl border border-line bg-surface-1 p-3 transition-colors hover:bg-surface-2"
              >
                <Avatar initials={p.initials} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate font-medium">{p.name}</span>
                    <DivisionBadge division={p.division} />
                  </span>
                  <span className="block truncate text-xs text-ink-3">
                    {teamById(teams, p.teamId ?? "")?.name ?? "Free agent"}
                  </span>
                </span>
                <span className="text-right">
                  <span className="block tnum font-semibold text-accent-bright">
                    {p.threeDartAvg.toFixed(1)}
                  </span>
                  <span className="block text-xs">
                    <PowerDelta value={p.powerDelta} />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
