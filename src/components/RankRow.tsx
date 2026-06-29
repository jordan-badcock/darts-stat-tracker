import { RANK_LEVELS, type Ranks } from "@/lib/types";

// The five ranking levels as a compact segmented row. Club is emphasized
// because power-ranking movement is measured relative to the club. Wraps to
// two rows on narrow screens.
export function RankRow({ ranks }: { ranks: Ranks }) {
  return (
    <div className="flex flex-wrap gap-px overflow-hidden rounded-lg border border-line bg-line">
      {RANK_LEVELS.map(({ key, label }) => {
        const emphasized = key === "club";
        return (
          <div
            key={key}
            className={`flex-1 min-w-[58px] px-3 py-2 text-center ${
              emphasized ? "bg-surface-2" : "bg-surface-1"
            }`}
          >
            <div className="text-[10px] uppercase tracking-wider text-ink-3">
              {label}
            </div>
            <div
              className={`tnum text-base font-semibold ${
                emphasized ? "text-gold" : "text-ink"
              }`}
            >
              #{ranks[key]}
            </div>
          </div>
        );
      })}
    </div>
  );
}
