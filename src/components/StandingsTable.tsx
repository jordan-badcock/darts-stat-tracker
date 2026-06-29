import Link from "next/link";
import type { Team } from "@/lib/types";

function streakLabel(streak: number) {
  if (streak === 0) return <span className="text-ink-3">—</span>;
  const win = streak > 0;
  return (
    <span className={win ? "text-up" : "text-down"}>
      {win ? "W" : "L"}
      {Math.abs(streak)}
    </span>
  );
}

// Desktop: full table. Mobile: condensed card-rows (no horizontal scroll of a
// wide table on a phone — the #4 design rule for stats density).
export function StandingsTable({ rows }: { rows: Team[] }) {
  return (
    <>
      {/* Desktop / tablet */}
      <div className="hidden overflow-hidden rounded-xl border border-line sm:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-2 text-left text-[11px] uppercase tracking-wider text-ink-3">
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Team</th>
              <th className="px-4 py-3 text-right font-medium">W</th>
              <th className="px-4 py-3 text-right font-medium">L</th>
              <th className="px-4 py-3 text-right font-medium">Win %</th>
              <th className="px-4 py-3 text-right font-medium">Legs</th>
              <th className="px-4 py-3 text-right font-medium">3-dart</th>
              <th className="px-4 py-3 text-right font-medium">Streak</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((t, i) => (
              <tr
                key={t.id}
                className="border-t border-line transition-colors hover:bg-surface-2"
              >
                <td className="px-4 py-3 tnum font-semibold text-gold">{i + 1}</td>
                <td className="px-4 py-3">
                  <Link href={`/teams/${t.id}`} className="font-medium hover:text-accent-bright">
                    {t.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-right tnum">{t.gameWins}</td>
                <td className="px-4 py-3 text-right tnum text-ink-2">{t.gameLosses}</td>
                <td className="px-4 py-3 text-right tnum">{t.winPct}%</td>
                <td className="px-4 py-3 text-right tnum text-ink-2">
                  {t.legWins}-{t.legLosses}
                </td>
                <td className="px-4 py-3 text-right tnum text-accent-bright">
                  {t.threeDartAvg.toFixed(1)}
                </td>
                <td className="px-4 py-3 text-right tnum">{streakLabel(t.streak)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <ul className="space-y-2 sm:hidden">
        {rows.map((t, i) => (
          <li key={t.id}>
            <Link
              href={`/teams/${t.id}`}
              className="flex items-center gap-3 rounded-xl border border-line bg-surface-1 px-4 py-3 active:bg-surface-2"
            >
              <span className="tnum w-6 text-center text-lg font-semibold text-gold">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium">{t.name}</span>
                <span className="block text-xs text-ink-3 tnum">
                  {t.gameWins}-{t.gameLosses} · {t.winPct}% · {t.threeDartAvg.toFixed(1)} avg
                </span>
              </span>
              <span className="tnum text-sm">{streakLabel(t.streak)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
