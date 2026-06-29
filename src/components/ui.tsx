import Link from "next/link";
import type { Division } from "@/lib/types";

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-line bg-surface-1 ${className}`}>
      {children}
    </div>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-medium uppercase tracking-wider text-ink-3 mb-3">
      {children}
    </h2>
  );
}

export function Avatar({
  initials,
  size = 40,
}: {
  initials: string;
  size?: number;
}) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full bg-surface-2 text-ink-2 font-semibold shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      aria-hidden
    >
      {initials}
    </span>
  );
}

export function DivisionBadge({ division }: { division: Division }) {
  const isTop = division === "A";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${
        isTop
          ? "border-gold/40 text-gold"
          : "border-line text-ink-2"
      }`}
    >
      Div {division}
    </span>
  );
}

export function StatCard({
  label,
  value,
  sub,
  href,
}: {
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
  href?: string;
}) {
  const inner = (
    <>
      <div className="text-3xl font-semibold tnum text-accent-bright leading-none">
        {value}
      </div>
      <div className="mt-2 text-[11px] uppercase tracking-wider text-ink-3">
        {label}
      </div>
      {sub ? <div className="mt-1 text-sm text-ink-2">{sub}</div> : null}
    </>
  );
  if (href) {
    return (
      <Link
        href={href}
        className="block rounded-xl border border-line bg-surface-1 p-5 transition-colors hover:bg-surface-2"
      >
        {inner}
      </Link>
    );
  }
  return (
    <div className="rounded-xl border border-line bg-surface-1 p-5">{inner}</div>
  );
}
