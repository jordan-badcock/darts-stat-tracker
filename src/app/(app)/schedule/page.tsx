import { getData, parseView, teamById } from "@/lib/mock-data";
import { SectionTitle } from "@/components/ui";
import { EmptyState } from "@/components/EmptyState";
import type { ScheduleEntry, Team } from "@/lib/types";

function Row({ g, teams }: { g: ScheduleEntry; teams: Team[] }) {
  const home = teamById(teams, g.homeTeamId);
  const away = teamById(teams, g.awayTeamId);
  const final = g.status === "final";
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <span className="hidden w-24 shrink-0 text-xs text-ink-3 tnum sm:block">
        {g.gameCode}
      </span>
      <span className="min-w-0 flex-1 text-sm">
        <span className={final && (g.homeScore ?? 0) > (g.awayScore ?? 0) ? "font-semibold" : ""}>
          {home?.name}
        </span>
        <span className="px-2 text-ink-3">vs</span>
        <span className={final && (g.awayScore ?? 0) > (g.homeScore ?? 0) ? "font-semibold" : ""}>
          {away?.name}
        </span>
      </span>
      {final ? (
        <span className="tnum text-sm font-semibold text-accent-bright">
          {g.homeScore}–{g.awayScore}
        </span>
      ) : (
        <span className="rounded-full border border-line px-2.5 py-0.5 text-[11px] text-ink-3">
          {g.date}
        </span>
      )}
    </div>
  );
}

export default async function SchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  const { teams, schedule } = getData(parseView(view));

  if (schedule.length === 0) {
    return (
      <>
        <h1 className="mb-6 text-2xl font-semibold">Schedule</h1>
        <EmptyState
          title="No games scheduled"
          body="Once you have teams in the league, generate a schedule and each fixture gets its own game code for score entry."
          ctaLabel="Add teams first"
          ctaHref="/teams?view=empty"
        />
      </>
    );
  }

  const weeks = Array.from(new Set(schedule.map((g) => g.week))).sort((a, b) => a - b);

  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold">Schedule</h1>
      <div className="space-y-8">
        {weeks.map((w) => (
          <section key={w}>
            <SectionTitle>Week {w}</SectionTitle>
            <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface-1">
              {schedule
                .filter((g) => g.week === w)
                .map((g) => (
                  <Row key={g.id} g={g} teams={teams} />
                ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
