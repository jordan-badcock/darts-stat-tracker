// Shared league-comparison coloring used by the stats table and the player
// stat card, so both stay consistent.

export type StatTone = "up" | "down" | "neutral";

// Where a value sits across the whole league. Performance stats are
// higher-is-better; ranks are lower-is-better (#1 beats #50) so pass
// higherBetter=false. Top third → up, bottom third → down.
export function leagueTone(
  value: number,
  all: number[],
  higherBetter = true,
): StatTone {
  if (all.length <= 1) return "neutral";
  const below = all.filter((x) => x < value).length;
  const equal = all.filter((x) => x === value).length;
  let pct = (below + equal / 2) / all.length;
  if (!higherBetter) pct = 1 - pct;
  if (pct >= 0.66) return "up";
  if (pct < 0.34) return "down";
  return "neutral";
}

export function toneText(tone: StatTone): string {
  if (tone === "up") return "text-up";
  if (tone === "down") return "text-down";
  return "text-ink";
}
