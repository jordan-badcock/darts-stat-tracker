// Weekly power-ranking movement relative to club. Meaning is carried by arrow
// AND sign AND color — never color alone — so it survives colorblindness and
// grayscale.
export function PowerDelta({ value, withWord = false }: { value: number; withWord?: boolean }) {
  if (value === 0) {
    return (
      <span className="inline-flex items-center gap-1 text-ink-3 tnum" title="No change this week">
        <span aria-hidden>—</span>
        {withWord ? <span className="text-xs">no change</span> : null}
      </span>
    );
  }
  const up = value > 0;
  const arrow = up ? "▲" : "▼";
  const cls = up ? "text-up" : "text-down";
  return (
    <span
      className={`inline-flex items-center gap-1 font-medium tnum ${cls}`}
      title={`${up ? "Up" : "Down"} ${Math.abs(value)} this week`}
    >
      <span aria-hidden>{arrow}</span>
      <span>
        {up ? "+" : "−"}
        {Math.abs(value)}
      </span>
      {withWord ? <span className="text-xs text-ink-3">this wk</span> : null}
    </span>
  );
}
