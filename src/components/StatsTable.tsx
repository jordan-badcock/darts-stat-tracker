"use client";

import { useState } from "react";
import type { Player } from "@/lib/types";
import { teams, teamById } from "@/lib/mock-data";
import { Avatar } from "@/components/ui";
import { PowerDelta } from "@/components/PowerDelta";
import { PlayerStatCard } from "@/components/PlayerStatCard";
import { leagueTone, toneText } from "@/lib/stats";

type SortKey =
  | "player"
  | "team"
  | "div"
  | "gp"
  | "threeDart"
  | "oneDart"
  | "checkout"
  | "tonnes"
  | "eighties"
  | "finishes"
  | "power"
  | "club";

type Align = "left" | "center" | "right";

const HEADERS: { key: SortKey; label: string; align: Align }[] = [
  { key: "player", label: "Player", align: "left" },
  { key: "team", label: "Team", align: "left" },
  { key: "div", label: "Div", align: "center" },
  { key: "gp", label: "GP", align: "right" },
  { key: "threeDart", label: "3DA", align: "right" },
  { key: "oneDart", label: "1DA", align: "right" },
  { key: "checkout", label: "CO%", align: "right" },
  { key: "tonnes", label: "Ton", align: "right" },
  { key: "eighties", label: "180s", align: "right" },
  { key: "finishes", label: "Fin", align: "right" },
  { key: "power", label: "Pwr", align: "right" },
  { key: "club", label: "Club", align: "right" },
];

// Lower-is-better / alphabetical columns sort ascending by default; everything
// else (performance stats) sorts highest-first.
const ASC_DEFAULT = new Set<SortKey>(["player", "team", "div", "club"]);

const teamName = (p: Player) =>
  teamById(teams, p.teamId ?? "")?.name ?? "Free agent";

function valueOf(p: Player, key: SortKey): string | number {
  switch (key) {
    case "player": return p.name;
    case "team": return teamName(p);
    case "div": return p.division;
    case "gp": return p.gamesPlayed;
    case "threeDart": return p.threeDartAvg;
    case "oneDart": return p.oneDartAvg;
    case "checkout": return p.checkoutPct;
    case "tonnes": return p.tonnes;
    case "eighties": return p.oneEighties;
    case "finishes": return p.finishes;
    case "power": return p.powerDelta;
    case "club": return p.ranks.club;
  }
}

export function StatsTable({ players }: { players: Player[] }) {
  const [selected, setSelected] = useState<Player | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("oneDart");
  const [dir, setDir] = useState<"asc" | "desc">("desc");

  function onSort(key: SortKey) {
    if (key === sortKey) {
      setDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setDir(ASC_DEFAULT.has(key) ? "asc" : "desc");
    }
  }

  const clubVals = players.map((pl) => pl.ranks.club);

  const ranked = [...players].sort((a, b) => {
    const va = valueOf(a, sortKey);
    const vb = valueOf(b, sortKey);
    const cmp =
      typeof va === "number" && typeof vb === "number"
        ? va - vb
        : String(va).localeCompare(String(vb));
    return dir === "asc" ? cmp : -cmp;
  });

  const justify = (a: Align) =>
    a === "right" ? "justify-end" : a === "center" ? "justify-center" : "justify-start";

  // Performance-stat cell: highlighted when it's the active sort column.
  const perfCell = (key: SortKey, content: React.ReactNode) => (
    <td
      className={`px-3 py-2.5 text-right tnum ${
        sortKey === key ? "font-semibold text-accent-bright" : "text-ink"
      }`}
    >
      {content}
    </td>
  );

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[860px] text-sm">
          <thead>
            <tr className="bg-surface-2 text-left text-[11px] uppercase tracking-wider text-ink-3">
              <th className="px-3 py-3 font-medium">#</th>
              {HEADERS.map((h) => {
                const active = sortKey === h.key;
                return (
                  <th
                    key={h.key}
                    aria-sort={active ? (dir === "asc" ? "ascending" : "descending") : "none"}
                    className="px-3 py-3 font-medium"
                  >
                    <button
                      onClick={() => onSort(h.key)}
                      className={`flex w-full items-center gap-1 ${justify(h.align)} uppercase transition-colors hover:text-ink ${
                        active ? "text-ink" : ""
                      }`}
                    >
                      {h.label}
                      <span className={active ? "" : "text-ink-3/30"}>
                        {active ? (dir === "asc" ? "▲" : "▼") : "↕"}
                      </span>
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {ranked.map((p, i) => (
              <tr
                key={p.id}
                onClick={() => setSelected(p)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(p);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`${p.name} stats`}
                className="cursor-pointer border-t border-line transition-colors hover:bg-surface-2"
              >
                <td className="px-3 py-2.5 tnum font-semibold text-gold">{i + 1}</td>
                <td className="px-3 py-2.5">
                  <span className="flex items-center gap-2.5">
                    <Avatar initials={p.initials} size={28} />
                    <span className="whitespace-nowrap font-medium">{p.name}</span>
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-2.5 text-ink-2">{teamName(p)}</td>
                <td className="px-3 py-2.5 text-center text-ink-2">{p.division}</td>
                {perfCell("gp", p.gamesPlayed)}
                {perfCell("threeDart", p.threeDartAvg.toFixed(1))}
                {perfCell("oneDart", p.oneDartAvg.toFixed(1))}
                {perfCell("checkout", `${p.checkoutPct}%`)}
                {perfCell("tonnes", p.tonnes)}
                {perfCell("eighties", p.oneEighties)}
                {perfCell("finishes", p.finishes)}
                <td className="px-3 py-2.5 text-right tnum">
                  <span className="flex justify-end">
                    <PowerDelta value={p.powerDelta} />
                  </span>
                </td>
                <td
                  className={`px-3 py-2.5 text-right tnum ${toneText(
                    leagueTone(p.ranks.club, clubVals, false),
                  )}`}
                >
                  #{p.ranks.club}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected ? (
        <PlayerStatCard player={selected} onClose={() => setSelected(null)} />
      ) : null}
    </>
  );
}
