import Link from "next/link";

// Empty states are features, not "No items found." Each has context, warmth,
// and a single primary action.
export function EmptyState({
  title,
  body,
  ctaLabel,
  ctaHref,
  hint,
}: {
  title: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
  hint?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-dashed border-line bg-surface-1 px-6 py-14 text-center">
      <div
        className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-line text-accent-bright"
        aria-hidden
      >
        {/* dartboard glyph */}
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-ink-2">{body}</p>
      {ctaLabel && ctaHref ? (
        <Link
          href={ctaHref}
          className="mt-5 inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-contrast transition-opacity hover:opacity-90"
        >
          {ctaLabel}
        </Link>
      ) : null}
      {hint ? <div className="mt-4 text-xs text-ink-3">{hint}</div> : null}
    </div>
  );
}
