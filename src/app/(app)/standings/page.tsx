import { getData, parseView, standings } from "@/lib/mock-data";
import { StandingsTable } from "@/components/StandingsTable";
import { EmptyState } from "@/components/EmptyState";

export default async function StandingsPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  const { teams } = getData(parseView(view));

  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold">Standings</h1>
      {teams.length === 0 ? (
        <EmptyState
          title="Standings appear after the first games"
          body="As soon as teams are added and scores come in, the league table fills in here — wins, win %, legs and team averages."
          ctaLabel="Add teams"
          ctaHref="/teams?view=empty"
        />
      ) : (
        <StandingsTable rows={standings(teams)} />
      )}
    </>
  );
}
