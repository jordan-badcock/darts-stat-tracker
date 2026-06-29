"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { Player } from "@/lib/types";
import { RANK_LEVELS } from "@/lib/types";
import { players, teams, teamById } from "@/lib/mock-data";
import { leagueTone } from "@/lib/stats";
import { PowerDelta } from "./PowerDelta";

type Tone = "up" | "down" | "neutral" | "gold" | "default";
type Cell = { label: string; value: React.ReactNode; tone?: Tone };

function toneClass(tone: Tone | undefined) {
  if (tone === "up") return "text-up";
  if (tone === "down") return "text-down";
  if (tone === "gold") return "text-gold";
  return "text-ink";
}

function Band({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-y border-line bg-surface-2/60 px-5 py-1.5 text-[10px] font-medium uppercase tracking-wider text-ink-3">
      {children}
    </div>
  );
}

function Row({ cells }: { cells: Cell[] }) {
  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${cells.length}, minmax(0,1fr))` }}
    >
      {cells.map((c, i) => (
        <div
          key={i}
          className={`px-2 py-5 text-center ${i > 0 ? "border-l border-line" : ""}`}
        >
          <div className={`tnum text-2xl font-semibold leading-none ${toneClass(c.tone)}`}>
            {c.value}
          </div>
          <div className="mt-1.5 text-[11px] uppercase tracking-wider text-ink-3">
            {c.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// A stat overlay shown over the roster — grouped stat bands, dismissable.
export function PlayerStatCard({
  player,
  onClose,
}: {
  player: Player;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const team = teamById(teams, player.teamId ?? "");

  const tone = {
    three: leagueTone(player.threeDartAvg, players.map((p) => p.threeDartAvg)),
    one: leagueTone(player.oneDartAvg, players.map((p) => p.oneDartAvg)),
    checkout: leagueTone(player.checkoutPct, players.map((p) => p.checkoutPct)),
    tonnes: leagueTone(player.tonnes, players.map((p) => p.tonnes)),
    eighties: leagueTone(player.oneEighties, players.map((p) => p.oneEighties)),
    finishes: leagueTone(player.finishes, players.map((p) => p.finishes)),
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${player.name} stats`}
    >
      <button
        className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-line bg-surface-1 shadow-2xl sm:rounded-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-line bg-surface-2/50 px-5 py-4">
          <div>
            <span className="mb-2 inline-flex items-center rounded border border-gold/40 px-2.5 py-1 text-sm font-semibold text-gold">
              Div {player.division}
            </span>
            <h2 className="text-2xl font-semibold leading-tight">{player.name}</h2>
            <div className="mt-1 text-sm text-ink-3">
              {team ? team.name : "Free agent"}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-md border border-line p-1.5 text-ink-3 transition-colors hover:bg-surface-2 hover:text-ink"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Legend — what the stat colours mean */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-b border-line px-5 py-2 text-[10px] uppercase tracking-wider text-ink-3">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-up" /> Top third
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-ink-3" /> Middle
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-down" /> Bottom third
          </span>
          <span className="text-ink-3/70">vs league</span>
        </div>

        {/* Stat groups */}
        <Band>Averages</Band>
        <Row
          cells={[
            { label: "3-dart", value: player.threeDartAvg.toFixed(1), tone: tone.three },
            { label: "1-dart", value: player.oneDartAvg.toFixed(1), tone: tone.one },
            { label: "Checkout", value: `${player.checkoutPct}%`, tone: tone.checkout },
          ]}
        />

        <Band>Scoring</Band>
        <Row
          cells={[
            { label: "GP", value: player.gamesPlayed },
            { label: "Tonnes", value: player.tonnes, tone: tone.tonnes },
            { label: "180s", value: player.oneEighties, tone: tone.eighties },
            { label: "Finishes", value: player.finishes, tone: tone.finishes },
          ]}
        />

        <Band>Ranking</Band>
        <Row
          cells={RANK_LEVELS.map(({ key, label }) => ({
            label,
            value: `#${player.ranks[key]}`,
            tone: leagueTone(
              player.ranks[key],
              players.map((p) => p.ranks[key]),
              false,
            ),
          }))}
        />

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-line px-5 py-3">
          <span className="flex items-center gap-2 text-xs text-ink-3">
            Power ranking
            <PowerDelta value={player.powerDelta} />
          </span>
          <Link
            href={`/players/${player.id}`}
            className="text-xs font-medium text-accent-bright hover:underline"
          >
            Full profile →
          </Link>
        </div>
      </div>
    </div>
  );
}
