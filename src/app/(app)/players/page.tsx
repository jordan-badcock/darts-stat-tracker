import { getData, parseView } from "@/lib/mock-data";
import { EmptyState } from "@/components/EmptyState";
import { StatsTable } from "@/components/StatsTable";

export default async function StatsPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  const { players } = getData(parseView(view));

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Stats</h1>
        {players.length > 0 ? (
          <span className="text-sm text-ink-3 tnum">
            {players.length} players · ranked by 1-dart avg
          </span>
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
        <StatsTable players={players} />
      )}
    </>
  );
}
