/**
 * Site mark: a sky tile carrying the three QR finder squares and a few data dots.
 * Self-contained (gradient + shapes) so it works at 16px favicon size and 28px header size.
 * Keep in sync with src/app/icon.svg.
 */
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="brand-sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#0369a1" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#brand-sky)" />
      {/* finder patterns */}
      <rect x="6" y="6" width="9" height="9" rx="2.5" fill="#fff" />
      <rect x="9" y="9" width="3" height="3" rx="0.75" fill="#0369a1" />
      <rect x="17" y="6" width="9" height="9" rx="2.5" fill="#fff" />
      <rect x="20" y="9" width="3" height="3" rx="0.75" fill="#0369a1" />
      <rect x="6" y="17" width="9" height="9" rx="2.5" fill="#fff" />
      <rect x="9" y="20" width="3" height="3" rx="0.75" fill="#0369a1" />
      {/* data modules */}
      <rect x="17" y="17" width="3" height="3" rx="0.75" fill="#fff" />
      <rect x="23" y="17" width="3" height="3" rx="0.75" fill="#fff" />
      <rect x="17" y="23" width="3" height="3" rx="0.75" fill="#fff" />
      <rect x="21" y="21" width="5" height="5" rx="1.25" fill="#fde68a" />
    </svg>
  );
}
