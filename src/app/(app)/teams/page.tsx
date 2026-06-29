import Link from "next/link";
import { getData, parseView, standings, playerById } from "@/lib/mock-data";
import { Avatar } from "@/components/ui";
import { EmptyState } from "@/components/EmptyState";

export default async function TeamsPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  const { teams, players } = getData(parseView(view));

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Teams</h1>
        {teams.length > 0 ? (
          <button className="rounded-md border border-line px-3 py-1.5 text-sm text-ink-2 hover:bg-surface-2">
            + Add team
          </button>
        ) : null}
      </div>

      {teams.length === 0 ? (
        <EmptyState
          title="No teams yet"
          body="Create your first team — give it a name, a captain and a roster. You can move players between teams whenever you need to."
          ctaLabel="Add your first team"
          ctaHref="/teams?view=empty"
        />
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {standings(teams).map((t) => {
            const captain = playerById(players, t.captainId);
            return (
              <li key={t.id}>
                <Link
                  href={`/teams/${t.id}`}
                  className="flex items-center gap-4 rounded-xl border border-line bg-surface-1 p-4 transition-colors hover:bg-surface-2"
                >
                  <Avatar initials={t.initials} size={48} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{t.name}</div>
                    <div className="truncate text-xs text-ink-3">
                      Captain · {captain?.name ?? "—"}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="tnum font-semibold">
                      {t.gameWins}-{t.gameLosses}
                    </div>
                    <div className="text-xs text-ink-3 tnum">{t.winPct}% wins</div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
