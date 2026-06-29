"use client";

import { useMemo, useState } from "react";
import type { Player } from "@/lib/types";
import { Avatar, DivisionBadge } from "@/components/ui";
import { PlayerStatCard } from "@/components/PlayerStatCard";

// Visual-only add/drop to demonstrate that players are moveable assets, not
// fixtures of a team. Local state only — no persistence yet.
export function TeamRoster({
  captainId,
  roster,
  pool,
}: {
  captainId: string;
  roster: Player[];
  pool: Player[]; // players not on this team (addable)
}) {
  const [ids, setIds] = useState<string[]>(roster.map((p) => p.id));
  const [adding, setAdding] = useState(false);
  const [selected, setSelected] = useState<Player | null>(null);

  const byId = useMemo(() => {
    const m = new Map<string, Player>();
    [...roster, ...pool].forEach((p) => m.set(p.id, p));
    return m;
  }, [roster, pool]);

  const current = ids.map((id) => byId.get(id)!).filter(Boolean);
  const addable = pool.filter((p) => !ids.includes(p.id));

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xs font-medium uppercase tracking-wider text-ink-3">
          Roster · {current.length}
        </h2>
        <button
          onClick={() => setAdding((v) => !v)}
          className="rounded-md border border-line px-2.5 py-1 text-xs text-ink-2 hover:bg-surface-2"
        >
          {adding ? "Done" : "+ Add player"}
        </button>
      </div>

      <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface-1">
        {current.map((p) => (
          <li key={p.id} className="flex items-center gap-3 px-4 py-3">
            <Avatar initials={p.initials} size={36} />
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <button
                  onClick={() => setSelected(p)}
                  className="truncate text-left font-medium hover:text-accent-bright"
                >
                  {p.name}
                </button>
                {p.id === captainId ? (
                  <span className="rounded-full border border-gold/40 px-2 py-0.5 text-[10px] font-medium text-gold">
                    Captain
                  </span>
                ) : null}
                <DivisionBadge division={p.division} />
              </span>
              <span className="block text-xs text-ink-3 tnum">
                {p.threeDartAvg.toFixed(1)} avg
              </span>
            </span>
            <button
              onClick={() => setIds((xs) => xs.filter((x) => x !== p.id))}
              className="rounded-md px-2 py-1 text-xs text-ink-3 hover:bg-surface-2 hover:text-down"
            >
              Drop
            </button>
          </li>
        ))}
        {current.length === 0 ? (
          <li className="px-4 py-6 text-center text-sm text-ink-3">
            No players on this team. Add one below.
          </li>
        ) : null}
      </ul>

      {adding ? (
        <div className="mt-3 rounded-xl border border-dashed border-line bg-surface-1 p-3">
          <div className="mb-2 text-xs text-ink-3">
            Add a player to this team (moveable from elsewhere):
          </div>
          <ul className="flex flex-wrap gap-2">
            {addable.map((p) => (
              <li key={p.id}>
                <button
                  onClick={() => setIds((xs) => [...xs, p.id])}
                  className="rounded-full border border-line px-3 py-1 text-xs hover:bg-surface-2"
                >
                  + {p.name}
                </button>
              </li>
            ))}
            {addable.length === 0 ? (
              <li className="text-xs text-ink-3">No other players available.</li>
            ) : null}
          </ul>
        </div>
      ) : null}

      {selected ? (
        <PlayerStatCard player={selected} onClose={() => setSelected(null)} />
      ) : null}
    </div>
  );
}
