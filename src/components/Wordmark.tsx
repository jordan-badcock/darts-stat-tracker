import Link from "next/link";

// Fixed product wordmark. The brand theme switcher still recolors it (the
// colors are CSS tokens), but the name no longer changes per theme.
export function Wordmark({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5">
      <span className="text-accent-bright" aria-hidden>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="12" cy="12" r="1.6" fill="currentColor" />
        </svg>
      </span>
      <span className="text-[15px] font-semibold leading-none">
        <span className="text-ink">Dart</span>
        <span className="text-accent-bright">Manager</span>
      </span>
    </Link>
  );
}
