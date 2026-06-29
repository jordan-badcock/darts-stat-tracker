import Link from "next/link";
import { notFound } from "next/navigation";
import {
  teams,
  players,
  teamById,
  playerById,
  rosterFor,
} from "@/lib/mock-data";
import { Avatar, Card, SectionTitle } from "@/components/ui";
import { RankRow } from "@/components/RankRow";
import { TeamRoster } from "@/components/TeamRoster";

function streak(n: number) {
  if (n === 0) return "—";
  return `${n > 0 ? "W" : "L"}${Math.abs(n)}`;
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const team = teamById(teams, id);
  if (!team) notFound();

  const captain = playerById(players, team.captainId);
  const roster = rosterFor(players, team.id);
  const pool = players.filter((p) => p.teamId !== team.id);

  const aggregates = [
    { l: "Team 3-dart avg", v: team.threeDartAvg.toFixed(1) },
    { l: "Tonnes", v: team.tonnes },
    { l: "180s", v: team.oneEighties },
    { l: "Finishes", v: team.finishes },
  ];

  return (
    <>
      <Link href="/teams" className="mb-4 inline-block text-sm text-ink-3 hover:text-ink-2">
        ← Teams
      </Link>

      {/* Identity + record hero */}
      <Card className="mb-6 p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar initials={team.initials} size={64} />
            <div>
              <h1 className="text-2xl font-semibold">{team.name}</h1>
              <div className="mt-1 text-sm text-ink-2">
                Captain ·{" "}
                {captain ? (
                  <Link href={`/players/${captain.id}`} className="hover:text-accent-bright">
                    {captain.name}
                  </Link>
                ) : (
                  "—"
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5 sm:text-right">
            <div>
              <div className="text-3xl font-semibold tnum text-accent-bright">
                {team.gameWins}-{team.gameLosses}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-ink-3">
                Record
              </div>
            </div>
            <div>
              <div className="text-3xl font-semibold tnum">{team.winPct}%</div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-ink-3">
                Win rate
              </div>
            </div>
            <div>
              <div
                className={`text-3xl font-semibold tnum ${
                  team.streak >= 0 ? "text-up" : "text-down"
                }`}
              >
                {streak(team.streak)}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-ink-3">
                Streak
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <TeamRoster captainId={team.captainId} roster={roster} pool={pool} />
        </section>

        <div className="space-y-8">
          <section>
            <SectionTitle>Leg record</SectionTitle>
            <Card className="p-5">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-semibold tnum">
                    {team.legWins}
                    <span className="text-ink-3">-{team.legLosses}</span>
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-wider text-ink-3">
                    Legs won / lost
                  </div>
                </div>
                <div className="text-right text-sm text-ink-2 tnum">
                  {Math.round((team.legWins / (team.legWins + team.legLosses)) * 100)}% of
                  legs
                </div>
              </div>
            </Card>
          </section>

          <section>
            <SectionTitle>Aggregate stats</SectionTitle>
            <div className="grid grid-cols-2 gap-3">
              {aggregates.map((a) => (
                <div key={a.l} className="rounded-xl border border-line bg-surface-1 p-4">
                  <div className="text-2xl font-semibold tnum text-gold">{a.v}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-wider text-ink-3">
                    {a.l}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionTitle>Ranking</SectionTitle>
            <RankRow ranks={team.ranks} />
          </section>
        </div>
      </div>
    </>
  );
}
