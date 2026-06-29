import Link from "next/link";
import { notFound } from "next/navigation";
import { players, teams, playerById, teamById } from "@/lib/mock-data";
import { Avatar, DivisionBadge, Card, SectionTitle } from "@/components/ui";
import { PowerDelta } from "@/components/PowerDelta";
import { RankRow } from "@/components/RankRow";

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const player = playerById(players, id);
  if (!player) notFound();

  const team = teamById(teams, player.teamId ?? "");

  // Secondary KPI row — medium weight, below the hero number.
  const kpis = [
    { l: "1-dart avg", v: player.oneDartAvg.toFixed(1) },
    { l: "Checkout %", v: `${player.checkoutPct}%` },
    { l: "Division", v: player.division },
  ];
  // Tertiary achievement counters.
  const counters = [
    { l: "180s", v: player.oneEighties },
    { l: "Tonnes", v: player.tonnes },
    { l: "Finishes", v: player.finishes },
  ];

  return (
    <>
      <Link href="/players" className="mb-4 inline-block text-sm text-ink-3 hover:text-ink-2">
        ← Players
      </Link>

      {/* Hero: one headline number (3-dart avg) beside identity. */}
      <Card className="mb-6 p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar initials={player.initials} size={64} />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold">{player.name}</h1>
                <DivisionBadge division={player.division} />
              </div>
              <div className="mt-1 text-sm text-ink-2">
                {team ? (
                  <Link href={`/teams/${team.id}`} className="hover:text-accent-bright">
                    {team.name}
                  </Link>
                ) : (
                  "Free agent"
                )}
              </div>
            </div>
          </div>
          <div className="sm:text-right">
            <div className="text-5xl font-semibold tnum leading-none text-accent-bright">
              {player.threeDartAvg.toFixed(1)}
            </div>
            <div className="mt-1.5 text-[11px] uppercase tracking-wider text-ink-3">
              3-dart average
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {kpis.map((k) => (
          <div key={k.l} className="rounded-xl border border-line bg-surface-1 p-5">
            <div className="text-2xl font-semibold tnum">{k.v}</div>
            <div className="mt-1 text-[11px] uppercase tracking-wider text-ink-3">
              {k.l}
            </div>
          </div>
        ))}
      </div>

      <section className="mt-8">
        <SectionTitle>Achievements</SectionTitle>
        <div className="grid grid-cols-3 gap-3">
          {counters.map((c) => (
            <div key={c.l} className="rounded-xl border border-line bg-surface-1 p-5 text-center">
              <div className="text-3xl font-semibold tnum text-gold">{c.v}</div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-ink-3">
                {c.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <SectionTitle>Ranking</SectionTitle>
          <span className="text-sm">
            <span className="mr-2 text-xs text-ink-3">power ranking</span>
            <PowerDelta value={player.powerDelta} withWord />
          </span>
        </div>
        <RankRow ranks={player.ranks} />
      </section>
    </>
  );
}
